'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Check, Package, Truck, Clock, ShieldAlert } from 'lucide-react';
import { fetchApi } from '../../../lib/api';
import { IOrder } from '../../../types';

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnProduct, setReturnProduct] = useState<any>(null);
  const [returnReason, setReturnReason] = useState('Wrong size');
  const [returnDesc, setReturnDesc] = useState('');
  const [returnSubmitting, setReturnSubmitting] = useState(false);
  const [returnSuccessMsg, setReturnSuccessMsg] = useState('');

  useEffect(() => {
    fetchApi<IOrder>(`/orders/${resolvedParams.id}`)
      .then(res => {
        if (res.success && res.data) setOrder(res.data);
      })
      .finally(() => setLoading(false));
  }, [resolvedParams.id]);

  const handleReturnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order || !returnProduct) return;
    setReturnSubmitting(true);
    try {
      const res = await fetchApi('/orders/returns', {
        method: 'POST',
        body: JSON.stringify({
          orderId: order._id,
          productId: returnProduct.product?._id || returnProduct.product,
          variantId: returnProduct.variant?._id || returnProduct.variant,
          reason: returnReason,
          description: returnDesc
        })
      });
      if (res.success) {
        setReturnSuccessMsg('Your return dossier has been registered with client concierge.');
        setTimeout(() => setIsReturnModalOpen(false), 2000);
      } else {
        alert(res.message || 'Failed to submit return request');
      }
    } finally {
      setReturnSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-xs uppercase tracking-luxury text-[#8c8c8c]">
        Accessing Order Dossier...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h2 className="font-serif-luxury text-3xl mb-3">ORDER NOT FOUND</h2>
        <p className="text-xs text-[#8c8c8c] mb-6">
          We could not locate this order in the archives.
        </p>
        <Link
          href="/account"
          className="border border-[#121212] text-xs uppercase tracking-luxury px-6 py-3"
        >
          Return to Account
        </Link>
      </div>
    );
  }

  const steps = [
    { label: 'Confirmed', desc: 'Order verified' },
    { label: 'Processing', desc: 'Handcrafted packing' },
    { label: 'Shipped', desc: 'Courier transit' },
    { label: 'Delivered', desc: 'Signed receipt' }
  ];

  const currentStepIndex =
    order.orderStatus === 'DELIVERED'
      ? 3
      : order.orderStatus === 'SHIPPED' || order.orderStatus === 'OUT_FOR_DELIVERY'
      ? 2
      : order.orderStatus === 'PROCESSING'
      ? 1
      : 0;

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-10 space-y-10">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#f0ede6] pb-6">
        <Link
          href="/account"
          className="text-xs uppercase tracking-luxury text-[#575757] hover:text-black flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Orders
        </Link>

        <span className="text-xs uppercase tracking-luxury px-3 py-1 bg-[#121212] text-white">
          Status: {order.orderStatus}
        </span>
      </div>

      <div>
        <span className="text-[10px] uppercase tracking-luxury text-[#c5a880] block mb-1">
          CONSIGNMENT DOSSIER
        </span>
        <h1 className="font-serif-luxury text-3xl md:text-4xl text-[#121212]">
          Order #{order.orderNumber}
        </h1>
        <p className="text-xs text-[#8c8c8c] mt-1">
          Placed on {new Date(order.createdAt).toLocaleDateString()} · Carrier:{' '}
          {order.carrier || 'BlueDart Luxury Express'} ({order.trackingNumber})
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="bg-[#faf9f6] border border-[#f0ede6] p-8">
        <h3 className="text-xs uppercase tracking-luxury font-medium text-[#121212] mb-6">
          Transit Timeline
        </h3>
        <div className="grid grid-cols-4 gap-4 relative">
          {steps.map((st, idx) => (
            <div key={st.label} className="text-center relative">
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs mb-2 transition-colors ${
                  idx <= currentStepIndex
                    ? 'bg-[#121212] text-white font-medium'
                    : 'bg-white border border-[#e5e5e5] text-[#8c8c8c]'
                }`}
              >
                {idx < currentStepIndex ? <Check className="w-4 h-4" /> : idx + 1}
              </div>
              <span className="block text-xs font-medium text-[#121212]">{st.label}</span>
              <span className="text-[10px] text-[#8c8c8c]">{st.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Items Breakdown */}
      <div className="border border-[#f0ede6] divide-y divide-[#f0ede6]">
        <div className="p-4 bg-[#faf9f6] text-xs uppercase tracking-luxury font-medium text-[#121212]">
          Ordered Creations
        </div>
        {order.items?.map((item: any, i: number) => (
          <div key={i} className="p-6 flex flex-col sm:flex-row items-start justify-between gap-6">
            <div className="flex gap-4 items-start">
              <div className="relative w-20 aspect-[3/4] bg-[#f4f3ee] flex-shrink-0">
                {item.image && (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-[#121212]">{item.name}</h4>
                <p className="text-xs text-[#8c8c8c] mt-0.5">
                  Color: {item.color} | Size: {item.size}
                </p>
                <p className="text-xs text-[#8c8c8c]">SKU: {item.sku}</p>
                <p className="text-xs font-medium text-[#121212] mt-2">
                  ₹{item.price.toLocaleString()} × {item.quantity}
                </p>
              </div>
            </div>

            <div className="text-right flex flex-col justify-between sm:items-end w-full sm:w-auto">
              <span className="text-sm font-medium text-[#121212] mb-3">
                ₹{item.total.toLocaleString()}
              </span>
              <button
                onClick={() => {
                  setReturnProduct(item);
                  setIsReturnModalOpen(true);
                }}
                className="text-xs text-[#8c8c8c] hover:text-[#121212] underline uppercase tracking-wider"
              >
                Request Return / Exchange
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Shipping Address and Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-[#faf9f6] border border-[#f0ede6]">
          <h4 className="text-xs uppercase tracking-luxury font-medium text-[#121212] mb-3">
            Shipping Destination
          </h4>
          <p className="text-xs text-[#575757] leading-relaxed">
            {order.shippingAddress?.fullName}
            <br />
            {order.shippingAddress?.addressLine1}
            <br />
            {order.shippingAddress?.city}, {order.shippingAddress?.state}{' '}
            {order.shippingAddress?.postalCode}
            <br />
            Phone: {order.shippingAddress?.phone}
          </p>
        </div>

        <div className="p-6 bg-[#faf9f6] border border-[#f0ede6] space-y-2 text-xs">
          <h4 className="text-xs uppercase tracking-luxury font-medium text-[#121212] mb-3">
            Payment & Total
          </h4>
          <div className="flex justify-between text-[#575757]">
            <span>Method:</span>
            <span className="font-mono">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between text-[#575757]">
            <span>Payment Status:</span>
            <span className="font-mono text-[#2e7d32]">{order.paymentStatus}</span>
          </div>
          <div className="flex justify-between text-[#575757]">
            <span>Subtotal:</span>
            <span className="font-mono">₹{order.subtotal?.toLocaleString()}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-[#c5a880]">
              <span>Discount ({order.couponCode}):</span>
              <span className="font-mono">-₹{order.discount?.toLocaleString()}</span>
            </div>
          )}
          <div className="border-t border-[#e5e5e5] pt-2 flex justify-between font-medium text-sm text-[#121212]">
            <span>Grand Total:</span>
            <span>₹{order.total?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Return Modal */}
      {isReturnModalOpen && returnProduct && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full p-8 shadow-2xl relative">
            <h3 className="font-serif-luxury text-2xl mb-1">Return / Exchange Request</h3>
            <p className="text-xs text-gray-500 mb-6 font-light">
              Item: {returnProduct.name} ({returnProduct.size})
            </p>

            {returnSuccessMsg ? (
              <div className="text-xs text-[#2e7d32] p-4 bg-green-50 border border-green-200">
                {returnSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleReturnSubmit} className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-luxury block mb-1">
                    Select Reason
                  </label>
                  <select
                    value={returnReason}
                    onChange={e => setReturnReason(e.target.value)}
                    className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none"
                  >
                    <option value="Wrong size">Wrong size / Fit adjustment</option>
                    <option value="Damaged">Damaged in transit</option>
                    <option value="Wrong product">Wrong product received</option>
                    <option value="Changed mind">Changed mind</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-luxury block mb-1">
                    Details for Atelier Concierge
                  </label>
                  <textarea
                    rows={3}
                    value={returnDesc}
                    onChange={e => setReturnDesc(e.target.value)}
                    placeholder="Provide additional details regarding your exchange..."
                    className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={returnSubmitting}
                    className="flex-1 bg-[#121212] text-white text-xs uppercase tracking-luxury py-3"
                  >
                    {returnSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsReturnModalOpen(false)}
                    className="border border-gray-300 px-4 text-xs uppercase tracking-luxury"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
