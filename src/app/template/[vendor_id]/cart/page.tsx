"use client";
import React, { useEffect, useMemo, useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  getTemplateAuth,
  templateApiFetch,
} from "../../components/templateAuth";
import { useTemplateVariant } from "@/app/template/components/useTemplateVariant";

type CartItem = {
  _id: string;
  product_id: string;
  product_name: string;
  image_url?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  variant_attributes?: Record<string, any>;
};

type Cart = {
  items: CartItem[];
  subtotal: number;
  total_quantity: number;
};

export default function ShoppingCartPage() {
  const variant = useTemplateVariant();
  const params = useParams();
  const vendorId = params.vendor_id as string;
  const router = useRouter();
  const auth = getTemplateAuth(vendorId);

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const isStudio = variant.key === "studio";
  const isMinimal = variant.key === "minimal";
  const pageClass = isStudio
    ? "min-h-screen bg-slate-950 text-slate-100"
    : isMinimal
      ? "min-h-screen bg-[#f5f5f7] text-slate-900"
      : "min-h-screen bg-gray-50";
  const formatAttrs = (attrs?: Record<string, any>) => {
    if (!attrs) return "";
    return Object.values(attrs)
      .filter((value) => value)
      .join(" / ");
  };

  const loadCart = async () => {
    try {
      const data = await templateApiFetch(vendorId, "/cart");
      setCart(data.cart || null);
    } catch (error) {
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    loadCart();
  }, [vendorId]);

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    const data = await templateApiFetch(vendorId, `/cart/item/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
    setCart(data.cart || null);
  };

  const removeItem = async (itemId: string) => {
    const data = await templateApiFetch(vendorId, `/cart/item/${itemId}`, {
      method: "DELETE",
    });
    setCart(data.cart || null);
  };

  const subtotal = useMemo(() => cart?.subtotal || 0, [cart]);

  if (!auth) {
    return (
      <div className={pageClass}>
        <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">
              Login required
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to view your cart for this store.
            </p>
            <button
              onClick={() =>
                router.push(`/template/${vendorId}/login?next=/template/${vendorId}/cart`)
              }
              className="mt-6 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
            >
              Go to login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={pageClass}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Cart</h1>
        <div className="h-1 mb-6 template-accent-bg"></div>

        {showNotification && (
          <div className="bg-gray-100 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="template-accent" size={20} />
              <p className="text-gray-700">Cart updated successfully.</p>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {loading ? (
          <div className="rounded-lg bg-white p-6 text-center text-gray-500">
            Loading cart...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="grid grid-cols-12 gap-4 bg-gray-50 p-4 font-semibold text-gray-700 border-b">
                  <div className="col-span-1"></div>
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>

                {cart?.items?.length ? (
                  cart.items.map((item) => (
                    <div
                      key={item._id}
                      className="grid grid-cols-12 gap-4 p-4 items-center border-b"
                    >
                      <div className="col-span-1">
                        <button
                          onClick={() => removeItem(item._id)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <X size={16} className="text-gray-600" />
                        </button>
                      </div>

                      <div className="col-span-5 flex items-center gap-4">
                        <Link
                          href={`/template/${vendorId}/product/${item.product_id}`}
                          className="flex items-center gap-4"
                        >
                          <img
                            src={
                              item.image_url ||
                              "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=200&q=80"
                            }
                            alt={item.product_name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="space-y-1">
                            <span className="block font-medium template-accent">
                              {item.product_name}
                            </span>
                            <span className="block text-xs text-gray-500">
                              {formatAttrs(item.variant_attributes) || "Default variant"}
                            </span>
                          </div>
                        </Link>
                      </div>

                      <div className="col-span-2 text-center text-gray-700">
                        ₹{item.unit_price.toFixed(2)}
                      </div>

                      <div className="col-span-2 flex justify-center">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(event) =>
                            updateQuantity(
                              item._id,
                              Number(event.target.value)
                            )
                          }
                          min="1"
                          className="w-16 px-3 py-2 border border-gray-300 rounded text-center template-focus-accent"
                        />
                        <span className="sr-only">{item.quantity} quantity</span>
                      </div>

                      <div className="col-span-2 text-right font-semibold text-gray-900">
                        ₹{item.total_price.toFixed(2)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    Your cart is empty.
                  </div>
                )}

                <div className="p-4 flex items-center gap-4">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg template-focus-accent"
                  />
                  <button className="text-white px-8 py-3 rounded-lg font-semibold transition-colors template-accent-bg template-accent-bg-hover">
                    Apply coupon
                  </button>
                  <button
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors"
                    onClick={() => {
                      loadCart().then(() => setShowNotification(true));
                    }}
                  >
                    Update cart
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b">
                  Cart totals
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-900 font-semibold text-lg pt-4 border-t">
                    <span>Total</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push(`/template/${vendorId}/checkout`)}
                  className="w-full text-white py-4 rounded-full font-semibold transition-colors text-lg template-accent-bg template-accent-bg-hover"
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
