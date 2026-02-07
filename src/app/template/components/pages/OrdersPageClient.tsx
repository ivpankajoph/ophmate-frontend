"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getTemplateAuth,
  templateApiFetch,
} from "@/app/template/components/templateAuth";
import { NEXT_PUBLIC_API_URL } from "@/config/variables";
import { useTemplateVariant } from "@/app/template/components/useTemplateVariant";

type Order = {
  _id: string;
  order_number: string;
  status: string;
  total: number;
  payment_method?: string;
  createdAt: string;
  items: Array<{
    _id?: string;
    product_id?: string;
    product_name: string;
    image_url?: string;
    variant_attributes?: Record<string, string>;
    quantity: number;
    total_price?: number;
  }>;
};

const API_BASE =
  NEXT_PUBLIC_API_URL && NEXT_PUBLIC_API_URL.endsWith("/v1")
    ? NEXT_PUBLIC_API_URL
    : `${NEXT_PUBLIC_API_URL}/v1`;

const formatMoney = (value: number) => `Rs. ${Number(value || 0).toFixed(2)}`;

export default function TemplateOrdersPage() {
  const variant = useTemplateVariant();
  const params = useParams();
  const vendorId = params.vendor_id as string;
  const router = useRouter();
  const auth = getTemplateAuth(vendorId);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingOrderId, setDownloadingOrderId] = useState("");

  const isStudio = variant.key === "studio";
  const isMinimal = variant.key === "minimal";
  const pageClass = isStudio
    ? "min-h-screen bg-slate-950 text-slate-100"
    : isMinimal
      ? "min-h-screen bg-[#f5f5f7] text-slate-900"
      : "min-h-screen bg-gray-50";

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const load = async () => {
      try {
        const data = await templateApiFetch(vendorId, "/orders");
        setOrders(data.orders || []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [vendorId]);

  const formatAttrs = (attrs?: Record<string, string>) => {
    if (!attrs) return "";
    return Object.values(attrs)
      .filter((value) => value)
      .join(" / ");
  };

  const downloadInvoice = async (orderId: string, orderNumber?: string) => {
    if (!auth?.token) return;
    try {
      setDownloadingOrderId(orderId);
      const response = await fetch(`${API_BASE}/template-users/orders/${orderId}/invoice`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to download invoice");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `invoice-${orderNumber || orderId}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      // users can retry
    } finally {
      setDownloadingOrderId("");
    }
  };

  if (!auth) {
    return (
      <div className={pageClass}>
        <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">Login required</h1>
            <p className="mt-2 text-sm text-slate-500">Sign in to view your orders.</p>
            <button
              onClick={() =>
                router.push(`/template/${vendorId}/login?next=/template/${vendorId}/orders`)
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
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">My Orders</h1>
        <div className="h-1 mb-6 template-accent-bg"></div>

        {loading ? (
          <div className="rounded-lg bg-white p-6 text-center text-gray-500">Loading orders...</div>
        ) : orders.length ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">Order</p>
                    <p className="text-lg font-semibold text-slate-900">{order.order_number}</p>
                  </div>
                  <div className="text-sm text-slate-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-600">
                    {order.status}
                  </div>
                  <div className="text-lg font-semibold text-slate-900">{formatMoney(order.total)}</div>
                </div>

                <div className="mt-4 grid gap-3 text-sm text-slate-600">
                  {order.items.map((item, index) => (
                    <a
                      key={`${order._id}-${item._id || index}`}
                      href={item.product_id ? `/template/${vendorId}/product/${item.product_id}` : "#"}
                      className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3 transition hover:border-slate-300"
                    >
                      <div className="flex items-start gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={
                            item.image_url ||
                            "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=200&q=80"
                          }
                          alt={item.product_name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900">{item.product_name}</p>
                          <p className="text-xs text-slate-500">
                            {formatAttrs(item.variant_attributes) || "Default variant"}
                          </p>
                          <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">
                        {formatMoney(item.total_price || 0)}
                      </span>
                    </a>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-sm">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {order.items?.length || 0} items
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`/template/${vendorId}/orders/${order._id}`}
                      className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-slate-300"
                    >
                      View details
                    </a>
                    <button
                      type="button"
                      onClick={() => downloadInvoice(order._id, order.order_number)}
                      disabled={downloadingOrderId === order._id}
                      className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
                    >
                      {downloadingOrderId === order._id ? "Downloading..." : "Download invoice"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-white p-6 text-center text-gray-500">No orders yet.</div>
        )}
      </div>
    </div>
  );
}
