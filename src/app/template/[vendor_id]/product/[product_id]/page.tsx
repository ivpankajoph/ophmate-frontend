"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Minus, Plus, Search } from "lucide-react";
import { NEXT_PUBLIC_API_URL } from "@/config/variables";
import { getTemplateAuth, templateApiFetch } from "@/app/template/components/templateAuth";


type Product = {
  _id: string;
  productName?: string;
  shortDescription?: string;
  description?: string;
  defaultImages?: Array<{ url: string }>;
  variants?: Array<{ _id: string; finalPrice?: number }>;
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.product_id as string;
  const vendorId = params.vendor_id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!productId) return;
    let active = true;

    const load = async () => {
      try {
        const response = await fetch(
          `${NEXT_PUBLIC_API_URL}/products/${productId}`
        );
        const data = await response.json();
        if (active) setProduct(data?.product || null);
      } catch {
        if (active) setProduct(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [productId]);

  const price = useMemo(() => {
    const variantPrice = product?.variants?.[0]?.finalPrice;
    if (typeof variantPrice === "number") return variantPrice;
    return undefined;
  }, [product]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500">Product not found.</div>
      </div>
    );
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleAddToCart = async () => {
    setMessage("");
    const auth = getTemplateAuth(vendorId);
    if (!auth) {
      window.location.href = `/template/${vendorId}/login?next=/template/${vendorId}/product/${productId}`;
      return;
    }
    const variantId = product?.variants?.[0]?._id;
    if (!variantId) {
      setMessage("Variant not available");
      return;
    }
    setAdding(true);
    try {
      await templateApiFetch(vendorId, "/cart", {
        method: "POST",
        body: JSON.stringify({
          product_id: productId,
          variant_id: variantId,
          quantity,
        }),
      });
      setMessage("Added to cart");
    } catch (error: any) {
      setMessage(error.message || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative bg-white rounded-lg overflow-hidden">
            <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10">
              <Search size={20} />
            </button>
            {product.defaultImages?.[0]?.url ? (
              <img
                src={product.defaultImages[0].url}
                alt={product.productName || "Product"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex h-[420px] w-full items-center justify-center text-xs uppercase tracking-[0.3em] text-gray-400">
                No Image
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {product.productName || "Untitled Product"}
            </h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {price ? `₹${price}` : "Price on request"}
              </span>
              <span className="font-medium template-accent">
                + Free Shipping
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.shortDescription ||
                "Add a short description to highlight this product."}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-16 h-12 text-center border-x border-gray-300 focus:outline-none"
                />
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="flex-1 text-white px-8 h-12 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 template-accent-bg template-accent-bg-hover disabled:opacity-60"
              >
                {adding ? "Adding..." : "Add to cart"}
              </button>
            </div>
            {message && (
              <div className="text-sm text-slate-500">{message}</div>
            )}

            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-600">
                <span className="font-semibold">Product ID:</span> {product._id}
              </p>
            </div>

            <div className="mt-8 border border-gray-200 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-3 font-medium">
                Guaranteed Safe Checkout
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                  alt="Visa"
                  className="h-8 object-contain"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
                  alt="Mastercard"
                  className="h-8 object-contain"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
                  alt="American Express"
                  className="h-8 object-contain"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                  alt="PayPal"
                  className="h-8 object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="border-b border-gray-200">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-4 font-semibold transition-colors ${
                  activeTab === "description"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 font-semibold transition-colors ${
                  activeTab === "reviews"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Reviews (0)
              </button>
            </div>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {product.description ||
                    "Add a detailed description to help customers decide."}
                </p>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="text-center py-12">
                <p className="text-gray-500">No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
