"use client"

import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store"
import { fetchCart } from "@/store/slices/customerCartSlice"
import { createOrder } from "@/store/slices/customerOrderSlice"
import { createAddress, fetchAddresses } from "@/store/slices/customerAddressSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toastError, toastSuccess } from "@/lib/toast"
import userApi from "@/lib/userApi"
import PromotionalBanner from "@/components/promotional-banner"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer"
import { trackCheckout, trackPurchase } from "@/lib/analytics-events"
import Image from "next/image"

declare global {
  interface Window {
    Razorpay: any
  }
}

const loadRazorpayScript = () =>
  new Promise<boolean>((resolve) => {
    if (typeof window === "undefined") return resolve(false)
    if (window.Razorpay) return resolve(true)
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })

export default function CheckoutPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const token = useSelector((state: RootState) => state.customerAuth.token)
  const user = useSelector((state: RootState) => state.customerAuth.user)
  const cart = useSelector((state: RootState) => state.customerCart.cart)
  const addresses = useSelector((state: RootState) => state.customerAddress.addresses)
  const loading = useSelector((state: RootState) => state.customerOrder.loading)

  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay")
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<string>("")
  const [shippingFee, setShippingFee] = useState(0)
  const [shippingLoading, setShippingLoading] = useState(false)
  const [shippingError, setShippingError] = useState("")
  const [form, setForm] = useState({
    label: "Home",
    full_name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    is_default: true,
  })

  useEffect(() => {
    if (!token) {
      router.push("/login")
      return
    }
    dispatch(fetchCart())
    dispatch(fetchAddresses())
  }, [dispatch, token, router])

  useEffect(() => {
    if (!token || !cart) return
    trackCheckout({
      userId: user?._id || user?.id || "",
      cartTotal: cart.subtotal,
      metadata: {
        items: cart.items?.map((item: any) => ({
          name: item.product_name,
          quantity: item.quantity,
          total_price: item.total_price,
        })),
      },
    })
  }, [token, cart, user])

  useEffect(() => {
    if (!selectedAddress && addresses.length > 0) {
      const defaultAddress = addresses.find((addr) => addr.is_default)
      setSelectedAddress(defaultAddress?._id || addresses[0]._id)
    }
  }, [addresses, selectedAddress])

  const fetchShippingQuote = async (addressId: string) => {
    try {
      setShippingLoading(true)
      setShippingError("")
      const res = await userApi.post("/orders/borzo/calculate", {
        address_id: addressId,
        payment_method: paymentMethod,
      })
      const amount = Number(res?.data?.response?.order?.payment_amount || 0)
      setShippingFee(Number.isFinite(amount) ? amount : 0)
    } catch (error: any) {
      setShippingFee(0)
      setShippingError(error?.response?.data?.message || "Failed to calculate delivery fee")
    } finally {
      setShippingLoading(false)
    }
  }

  useEffect(() => {
    if (!selectedAddress) return
    fetchShippingQuote(selectedAddress)
  }, [selectedAddress, paymentMethod])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddAddress = async () => {
    try {
      await dispatch(createAddress(form)).unwrap()
      toastSuccess("Address saved")
      setForm((prev) => ({ ...prev, line1: "", line2: "", city: "", state: "", pincode: "" }))
    } catch (error: any) {
      toastError(error || "Failed to save address")
    }
  }

  const handleRazorpayPayment = async (order: any, payment: any) => {
    const loaded = await loadRazorpayScript()
    if (!loaded) {
      throw new Error("Failed to load payment gateway")
    }

    return new Promise<void>((resolve, reject) => {
      const options = {
        key: payment.keyId,
        order_id: payment.orderId,
        amount: payment.amount,
        currency: payment.currency,
        name: "Ophmate",
        description: `Order ${order?.order_number || ""}`,
        prefill: {
          name: user?.name || user?.full_name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        handler: async (response: any) => {
          try {
            await userApi.post(`/orders/${order._id}/razorpay/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
            resolve()
          } catch (err) {
            reject(err)
          }
        },
        modal: {
          ondismiss: async () => {
            try {
              await userApi.post(`/orders/${order._id}/razorpay/failed`, {
                reason: "dismissed",
              })
            } catch {
              // ignore
            }
            reject(new Error("Payment cancelled"))
          },
        },
        theme: {
          color: "#1f2937",
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on("payment.failed", async (response: any) => {
        try {
          await userApi.post(`/orders/${order._id}/razorpay/failed`, {
            reason: response?.error?.description || "payment_failed",
          })
        } catch {
          // ignore
        }
        reject(new Error(response?.error?.description || "Payment failed"))
      })
      razorpay.open()
    })
  }

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return
    try {
      setPaymentProcessing(true)
      const orderRes = await dispatch(
        createOrder({
          address_id: selectedAddress,
          payment_method: paymentMethod,
          shipping_fee: shippingFee,
          discount: 0,
          notes: "",
          delivery_provider: "borzo",
        }),
      ).unwrap()

      if (paymentMethod === "razorpay") {
        if (!orderRes?.payment?.orderId) {
          throw new Error("Payment initialization failed")
        }
        await handleRazorpayPayment(orderRes.order, orderRes.payment)
        toastSuccess("Payment successful")
      } else {
        toastSuccess("Order placed")
      }

      trackPurchase({
        userId: user?._id || user?.id || "",
        cartTotal: cart?.subtotal,
        orderId: orderRes?.order?._id || orderRes?.order?.order_number,
        metadata: {
          items: cart?.items?.map((item: any) => ({
            name: item.product_name,
            quantity: item.quantity,
            total_price: item.total_price,
          })),
        },
      })
      await dispatch(fetchCart())
      router.push("/orders")
    } catch (error: any) {
      toastError(error?.message || error || "Failed to place order")
    } finally {
      setPaymentProcessing(false)
    }
  }

  const subtotal = useMemo(() => cart?.subtotal || 0, [cart])
  const totalWithShipping = useMemo(() => subtotal + shippingFee, [subtotal, shippingFee])
  const orderItems = cart?.items || []
  const getItemCategory = (item: any) =>
    item?.product_category ||
    item?.productCategory ||
    item?.product?.productCategory ||
    "unknown"
  const getItemId = (item: any) =>
    item?.product_id || item?.productId || item?.product?._id || item?._id
  const getItemImage = (item: any) =>
    item?.image_url ||
    item?.image ||
    item?.product?.image_url ||
    "/placeholder.png"

  if (!token) {
    return null
  }

  if (!cart || cart.items?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center space-y-4">
            <p>Your cart is empty.</p>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
  <>
  <PromotionalBanner/>
  <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Shipping Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Select Address</Label>
              <div className="grid gap-3">
                {addresses.map((addr) => (
                  <label
                    key={addr._id}
                    className={`border rounded-lg p-3 cursor-pointer ${
                      selectedAddress === addr._id ? "border-primary" : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      className="mr-2"
                      checked={selectedAddress === addr._id}
                      onChange={() => setSelectedAddress(addr._id)}
                    />
                    {addr.full_name} • {addr.phone}
                    <div className="text-sm text-muted-foreground">
                      {addr.line1}, {addr.line2} {addr.city}, {addr.state} {addr.pincode}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Add New Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input name="full_name" value={form.full_name} onChange={handleFormChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input name="phone" value={form.phone} onChange={handleFormChange} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="line1">Address Line 1</Label>
                  <Input name="line1" value={form.line1} onChange={handleFormChange} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="line2">Address Line 2</Label>
                  <Input name="line2" value={form.line2} onChange={handleFormChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input name="city" value={form.city} onChange={handleFormChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input name="state" value={form.state} onChange={handleFormChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input name="pincode" value={form.pincode} onChange={handleFormChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input name="country" value={form.country} onChange={handleFormChange} />
                </div>
              </div>
              <Button className="mt-4" onClick={handleAddAddress}>
                Save Address
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Items ({orderItems.length})</span>
              <span>Click any item to view details</span>
            </div>
            <div className="max-h-80 space-y-3 overflow-y-auto pr-2">
              {orderItems.map((item: any) => {
                const productId = getItemId(item)
                const productCategory = getItemCategory(item)
                const productUrl = `/product/${productCategory}/${productId}`
                return (
                  <Link
                    key={item._id}
                    href={productUrl}
                    className="flex gap-3 rounded-lg border border-slate-100 bg-white p-3 transition-shadow hover:shadow-sm"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
                      <Image
                        src={getItemImage(item)}
                        alt={item.product_name || "Product"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 line-clamp-2">
                          {item.product_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {Object.values(item.variant_attributes || {}).join(" / ")}
                        </p>
                        <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-semibold whitespace-nowrap text-slate-900">
                        ₹{(item.total_price || 0).toFixed(2)}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
            <div className="space-y-2 border-t pt-3">
              <Label>Payment Method</Label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="payment_method"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => setPaymentMethod("razorpay")}
                />
                Pay online (Razorpay)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="payment_method"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground border-t pt-3">
              <span>Delivery (Borzo)</span>
              <span>
                {shippingLoading ? "Calculating..." : `₹${shippingFee.toFixed(2)}`}
              </span>
            </div>
            {shippingError && (
              <p className="text-xs text-rose-600">{shippingError}</p>
            )}
            <div className="flex justify-between font-semibold border-t pt-3">
              <span>Total</span>
              <span>₹{totalWithShipping.toFixed(2)}</span>
            </div>
            <Button onClick={handlePlaceOrder} disabled={!selectedAddress || loading || paymentProcessing}>
              {loading || paymentProcessing
                ? "Processing..."
                : paymentMethod === "razorpay"
                  ? "Pay & Place Order"
                  : "Place Order (COD)"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
    <Footer/></>
  )
}





