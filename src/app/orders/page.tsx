"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store"
import { cancelOrder, fetchOrders } from "@/store/slices/customerOrderSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { toastError, toastSuccess } from "@/lib/toast"
import PromotionalBanner from "@/components/promotional-banner"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

export default function OrdersPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const token = useSelector((state: RootState) => state.customerAuth.token)
  const orders = useSelector((state: RootState) => state.customerOrder.orders)
  const loading = useSelector((state: RootState) => state.customerOrder.loading)
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

  useEffect(() => {
    if (!token) {
      router.push("/login")
      return
    }
    dispatch(fetchOrders())
  }, [dispatch, token, router])

  if (!token) return null

  return (
    <>
    <PromotionalBanner/>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>My Orders</CardTitle>
          </CardHeader>
        </Card>
        {loading && <p>Loading orders...</p>}
        {!loading && orders.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p>No orders yet.</p>
            </CardContent>
          </Card>
        )}
        {orders.map((order: any) => (
          <Card key={order._id}>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Order #{order.order_number}</span>
                <span>Status: {order.status}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Items ({order.items?.length || 0})</span>
                <span>Click any item to view details</span>
              </div>
              <div className="max-h-72 space-y-3 overflow-y-auto pr-2">
                {order.items.map((item: any) => {
                  const productId = getItemId(item)
                  const productCategory = getItemCategory(item)
                  const productUrl = `/product/${productCategory}/${productId}`
                  return (
                    <Link
                      key={item._id || item.variant_id}
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
              <div className="flex justify-between font-semibold border-t pt-3">
                <span>Total</span>
                <span>₹{(order.total || 0).toFixed(2)}</span>
              </div>
              {order.status === "pending" && (
                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      await dispatch(cancelOrder({ id: order._id })).unwrap()
                      toastSuccess("Order cancelled")
                    } catch (error: any) {
                      toastError(error || "Failed to cancel order")
                    }
                  }}
                >
                  Cancel Order
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    <Footer/></>
  )
}

