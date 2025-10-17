"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, X, Plus, Minus } from "lucide-react"

interface CartItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  color?: string
  size?: string
}

export default function CartDrawer() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Acme Drawstring Bag",
      image: "/bag.png", // Replace with your actual image
      price: 6,
      quantity: 1,
      color: "White",
      size: "6 x 8 inch",
    },
  ])

  const updateQuantity = (id: string, amount: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-lg font-semibold">My Cart</SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-muted-foreground mt-10">
              Your cart is empty 🛒
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border rounded-lg p-3 hover:bg-muted/30 transition-colors"
              >
                {/* Image */}
                <div className="relative h-16 w-16 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm line-clamp-1">
                      {item.name}
                    </h4>
                    <button onClick={() => removeItem(item.id)}>
                      <X className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.color} / {item.size}
                  </p>

                  {/* Quantity + Price */}
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center border rounded-md">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="h-6 w-6"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="h-6 w-6"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="text-sm font-medium whitespace-nowrap">
                      ${(item.price * item.quantity).toFixed(2)} USD
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-4 py-4 space-y-3 bg-background">
          <div className="flex justify-between text-sm">
            <span>Taxes</span>
            <span>$0.00 USD</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>${subtotal.toFixed(2)} USD</span>
          </div>

          <Button className="mt-4 w-full py-6 text-base font-semibold rounded-full">
            Proceed to Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
