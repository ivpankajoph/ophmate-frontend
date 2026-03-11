"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, X, Plus, Minus } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store"
import {
  fetchCart,
  removeCartItem,
  updateCartItem,
} from "@/store/slices/customerCartSlice"
import Link from "next/link"
import { toastError, toastSuccess } from "@/lib/toast"

export default function CartDrawer() {
  const dispatch = useDispatch<AppDispatch>()
  const cart = useSelector((state: RootState) => state.customerCart.cart)
  const loading = useSelector((state: RootState) => state.customerCart.loading)
  const token = useSelector((state: RootState) => state.customerAuth.token)

  const cartItems = token ? cart?.items || [] : []

  useEffect(() => {
    if (token) {
      dispatch(fetchCart())
    }
  }, [dispatch, token])

  const updateQuantity = async (id: string, amount: number, current: number) => {
    const nextQty = Math.max(1, current + amount)
    try {
      await dispatch(updateCartItem({ itemId: id, quantity: nextQty })).unwrap()
      toastSuccess("Cart updated")
    } catch (error: any) {
      toastError(error || "Failed to update cart")
    }
  }

  const removeItem = async (id: string) => {
    try {
      await dispatch(removeCartItem({ itemId: id })).unwrap()
      toastSuccess("Item removed")
    } catch (error: any) {
      toastError(error || "Failed to remove item")
    }
  }

  const subtotal = cart?.subtotal || 0

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <ShoppingCart className="h-5 w-5" />
          {token && cartItems.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b p-4">
          <SheetTitle className="text-lg font-semibold">My Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
          {!token ? (
            <div className="mt-10 text-center text-muted-foreground">
              <p className="mb-4">Please login to view your cart.</p>
              <Button asChild>
                <Link href="/login">Go to Login</Link>
              </Button>
            </div>
          ) : cartItems.length === 0 ? (
            <p className="mt-10 text-center text-muted-foreground">
              {loading ? "Loading cart..." : "Your cart is empty."}
            </p>
          ) : (
            cartItems.map((item: any) => (
              <div
                key={item._id}
                className="flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/30"
              >
                <div className="relative h-16 w-16 flex-shrink-0">
                  <Image
                    src={item.image_url || "/placeholder.png"}
                    alt={item.product_name}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between">
                    <h4 className="line-clamp-1 text-sm font-medium">
                      {item.product_name}
                    </h4>
                    <button onClick={() => removeItem(item._id)}>
                      <X className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                    </button>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {Object.values(item.variant_attributes || {}).join(" / ")}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-md border">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          updateQuantity(item._id, -1, item.quantity)
                        }
                        className="h-6 w-6"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => updateQuantity(item._id, 1, item.quantity)}
                        className="h-6 w-6"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="whitespace-nowrap text-sm font-medium">
                      Rs. {(item.total_price || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {token && (
          <div className="space-y-3 border-t bg-background px-4 py-4">
            <Separator />
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>Rs. {subtotal.toFixed(2)}</span>
            </div>

            <Button
              className="mt-4 w-full rounded-full py-6 text-base font-semibold"
              asChild
              disabled={cartItems.length === 0}
            >
              <Link href="/checkout/bag">Proceed to Checkout</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
