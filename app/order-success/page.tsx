'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowRight, Package, Truck, ShieldCheck } from 'lucide-react';
import { fetchApi } from '../../lib/api';
import { IOrder } from '../../types';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const [order, setOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    if (orderNumber) {
      fetchApi<IOrder>(`/orders/${orderNumber}`).then(res => {
        if (res.success && res.data) {
          setOrder(res.data);
        }
      });
    }
  }, [orderNumber]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <div className="w-16 h-16 bg-[#faf9f6] border border-[#f0ede6] rounded-full flex items-center justify-center mx-auto mb-6 text-[#c5a880]">
        <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
      </div>

      <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] block mb-2 font-medium">
        ORDER AUTHORIZATION CONFIRMED
      </span>

      <h1 className="font-serif-luxury text-4xl md:text-5xl text-[#121212] mb-3">
        Thank You For Your Purchase
      </h1>

      <p className="text-xs text-[#575757] font-light max-w-md mx-auto mb-8 leading-relaxed">
        Your order <strong className="font-mono text-[#121212]">#{orderNumber}</strong> has been received by our atelier concierge. A confirmation dispatch dossier has been sent to your email.
      </p>

      {/* Order Info Card */}
      <div className="bg-[#faf9f6] border border-[#f0ede6] p-8 text-left mb-10 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between pb-6 border-b border-[#e5e5e5] gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-luxury text-[#8c8c8c] block">Order Identifier</span>
            <span className="text-sm font-mono font-medium text-[#121212]">{orderNumber}</span>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-luxury text-[#8c8c8c] block">Estimated Arrival</span>
            <span className="text-sm font-medium text-[#121212]">2–4 Business Days</span>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-luxury text-[#8c8c8c] block">Carrier Tracking</span>
            <span className="text-sm font-mono text-[#121212]">{order?.trackingNumber || 'TRK-88291045'}</span>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div>
          <span className="text-[10px] uppercase tracking-luxury text-[#8c8c8c] block mb-4">
            Concierge Lifecycle Status
          </span>
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="p-3 bg-white border border-[#121212]">
              <span className="block font-medium text-[#121212]">1. Confirmed</span>
              <span className="text-[10px] text-[#2e7d32]">Completed</span>
            </div>
            <div className="p-3 bg-white border border-gray-200 text-[#8c8c8c]">
              <span className="block font-medium">2. Hand-Packed</span>
              <span className="text-[10px]">Pending</span>
            </div>
            <div className="p-3 bg-white border border-gray-200 text-[#8c8c8c]">
              <span className="block font-medium">3. Dispatched</span>
              <span className="text-[10px]">Pending</span>
            </div>
            <div className="p-3 bg-white border border-gray-200 text-[#8c8c8c]">
              <span className="block font-medium">4. Delivered</span>
              <span className="text-[10px]">Pending</span>
            </div>
          </div>
        </div>

        {order && (
          <div className="border-t border-[#e5e5e5] pt-4 flex justify-between text-xs">
            <span className="text-[#575757]">Total Charged</span>
            <span className="font-serif-luxury text-lg text-[#121212]">
              ₹{order.total?.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href={`/orders/${orderNumber}`}
          className="bg-[#121212] text-white text-xs uppercase tracking-luxury px-8 py-3.5 hover:bg-[#333] transition-colors"
        >
          Track Consignment
        </Link>
        <Link
          href="/products"
          className="border border-[#121212] text-[#121212] text-xs uppercase tracking-luxury px-8 py-3.5 hover:bg-[#121212] hover:text-white transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs">Verifying Order Placement...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
