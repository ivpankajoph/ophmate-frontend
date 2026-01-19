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

export default function OrdersPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const token = useSelector((state: RootState) => state.customerAuth.token)
  const orders = useSelector((state: RootState) => state.customerOrder.orders)
  const loading = useSelector((state: RootState) => state.customerOrder.loading)

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
            <CardContent className="p-6 space-y-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Order #{order.order_number}</span>
                <span>Status: {order.status}</span>
              </div>
              <div className="space-y-2">
                {order.items.map((item: any) => (
                  <div key={item._id || item.variant_id} className="flex justify-between text-sm">
                    <span>
                      {item.product_name} × {item.quantity}
                    </span>
                    <span>₹{(item.total_price || 0).toFixed(2)}</span>
                  </div>
                ))}
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
