'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Check, ArrowRight, Lock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { fetchApi } from '../../lib/api';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totals, couponCode, giftWrap } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [submitting, setSubmitting] = useState(false);

  // Guest checkout state
  const [guestEmail, setGuestEmail] = useState('');

  // Delivery Address State
  const [address, setAddress] = useState({
    fullName: user ? `${user.firstName} ${user.lastName}` : '',
    phone: user?.phone || '',
    addressLine1: user?.addresses?.[0]?.addressLine1 || '',
    addressLine2: user?.addresses?.[0]?.addressLine2 || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || '',
    postalCode: user?.addresses?.[0]?.postalCode || '',
    country: 'India'
  });

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'STANDARD' | 'EXPRESS'>('EXPRESS');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'STRIPE' | 'RAZORPAY'>('COD');

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    try {
      const orderPayload = {
        guestEmail: !user ? guestEmail : undefined,
        items: items.map(item => ({
          productId: typeof item.product === 'object' ? item.product._id : item.product,
          variantId: typeof item.variant === 'object' ? item.variant?._id : item.variant,
          quantity: item.quantity,
          color: item.color,
          size: item.size
        })),
        shippingAddress: address,
        billingAddress: address,
        paymentMethod,
        couponCode,
        giftWrap
      };

      const res = await fetchApi<{ order: any; paymentIntent: any }>('/orders', {
        method: 'POST',
        body: JSON.stringify(orderPayload)
      });

      if (res.success && res.data) {
        router.push(`/order-success?orderNumber=${res.data.order.orderNumber}`);
      } else {
        alert(res.message || 'Order placement failed. Please verify your details.');
      }
    } catch (err) {
      console.error('Order checkout error:', err);
      alert('An error occurred during checkout.');
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h2 className="font-serif-luxury text-2xl text-[#121212] mb-3">YOUR BAG IS EMPTY</h2>
        <Link
          href="/products"
          className="inline-block border border-[#121212] text-xs uppercase tracking-luxury px-6 py-3"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      {/* Header */}
      <div className="border-b border-[#f0ede6] pb-6 mb-10 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] block mb-1">
            CONCIERGE CHECKOUT
          </span>
          <h1 className="font-serif-luxury text-3xl md:text-4xl text-[#121212] font-normal">
            Bespoke Checkout
          </h1>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#575757]">
          <Lock className="w-3.5 h-3.5 text-[#c5a880]" />
          <span>Encrypted Session</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Step Form Flow */}
        <div className="lg:col-span-8 space-y-8">
          {/* Step Indicators */}
          <div className="flex items-center justify-between pb-6 border-b border-[#e5e5e5] text-xs uppercase tracking-luxury">
            <span className={step >= 1 ? 'text-[#121212] font-medium' : 'text-[#8c8c8c]'}>
              1. Customer
            </span>
            <span className="text-[#8c8c8c]">/</span>
            <span className={step >= 2 ? 'text-[#121212] font-medium' : 'text-[#8c8c8c]'}>
              2. Delivery
            </span>
            <span className="text-[#8c8c8c]">/</span>
            <span className={step >= 3 ? 'text-[#121212] font-medium' : 'text-[#8c8c8c]'}>
              3. Dispatch
            </span>
            <span className="text-[#8c8c8c]">/</span>
            <span className={step >= 4 ? 'text-[#121212] font-medium' : 'text-[#8c8c8c]'}>
              4. Payment
            </span>
          </div>

          {/* STEP 1: Identification / Guest */}
          <div className="bg-[#faf9f6] p-6 border border-[#f0ede6]">
            <h3 className="text-xs uppercase tracking-luxury font-medium text-[#121212] mb-4">
              Step 1: Client Account
            </h3>
            {user ? (
              <div className="flex justify-between items-center text-xs">
                <div>
                  <p className="font-medium text-[#121212]">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-[#8c8c8c]">{user.email}</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#2e7d32] bg-white border border-[#e5e5e5] px-2.5 py-1 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Authenticated
                </span>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-[#575757]">
                  You are checking out as a guest. Already have an account?{' '}
                  <Link href="/login" className="underline text-black font-medium">
                    Log in here
                  </Link>
                </p>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address for order notifications"
                  value={guestEmail}
                  onChange={e => setGuestEmail(e.target.value)}
                  className="w-full border border-[#e5e5e5] p-2.5 text-xs bg-white focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* STEP 2: Delivery Address */}
          <div className="bg-[#faf9f6] p-6 border border-[#f0ede6] space-y-4">
            <h3 className="text-xs uppercase tracking-luxury font-medium text-[#121212]">
              Step 2: Shipping Destination
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase tracking-luxury text-[#575757] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={e => setAddress({ ...address, fullName: e.target.value })}
                  placeholder="Recipient full name"
                  className="w-full border border-[#e5e5e5] p-2.5 text-xs bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-luxury text-[#575757] block mb-1">
                  Telephone
                </label>
                <input
                  type="tel"
                  required
                  value={address.phone}
                  onChange={e => setAddress({ ...address, phone: e.target.value })}
                  placeholder="+91 9876543210"
                  className="w-full border border-[#e5e5e5] p-2.5 text-xs bg-white focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-[11px] uppercase tracking-luxury text-[#575757] block mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={address.addressLine1}
                  onChange={e => setAddress({ ...address, addressLine1: e.target.value })}
                  placeholder="Apartment, suite, unit, building, street"
                  className="w-full border border-[#e5e5e5] p-2.5 text-xs bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-luxury text-[#575757] block mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={e => setAddress({ ...address, city: e.target.value })}
                  placeholder="Mumbai, Delhi, Bangalore..."
                  className="w-full border border-[#e5e5e5] p-2.5 text-xs bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-luxury text-[#575757] block mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  required
                  value={address.postalCode}
                  onChange={e => setAddress({ ...address, postalCode: e.target.value })}
                  placeholder="PIN code"
                  className="w-full border border-[#e5e5e5] p-2.5 text-xs bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* STEP 3: Dispatch & Shipping Carrier */}
          <div className="bg-[#faf9f6] p-6 border border-[#f0ede6] space-y-3">
            <h3 className="text-xs uppercase tracking-luxury font-medium text-[#121212]">
              Step 3: Shipping Method
            </h3>
            <div className="space-y-2">
              <label
                className={`flex items-center justify-between p-3 border cursor-pointer transition-colors ${
                  shippingMethod === 'EXPRESS'
                    ? 'border-[#121212] bg-white'
                    : 'border-[#e5e5e5] bg-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'EXPRESS'}
                    onChange={() => setShippingMethod('EXPRESS')}
                    className="accent-[#121212]"
                  />
                  <div>
                    <span className="text-xs font-medium text-[#121212] block">
                      BlueDart Haute Express Luxury Delivery
                    </span>
                    <span className="text-[11px] text-[#8c8c8c]">
                      Estimated transit: 2–3 business days with insured signature tracking
                    </span>
                  </div>
                </div>
                <span className="text-xs font-medium text-[#121212]">
                  {totals.shipping === 0 ? 'Complimentary' : `₹${totals.shipping}`}
                </span>
              </label>
            </div>
          </div>

          {/* STEP 4: Payment Method */}
          <div className="bg-[#faf9f6] p-6 border border-[#f0ede6] space-y-3">
            <h3 className="text-xs uppercase tracking-luxury font-medium text-[#121212]">
              Step 4: Payment Provider Selection
            </h3>
            <div className="space-y-2">
              <label
                className={`flex items-center justify-between p-3 border cursor-pointer transition-colors ${
                  paymentMethod === 'COD'
                    ? 'border-[#121212] bg-white'
                    : 'border-[#e5e5e5] bg-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="accent-[#121212]"
                  />
                  <div>
                    <span className="text-xs font-medium text-[#121212] block">
                      Cash on Delivery (COD) / Pay on Arrival
                    </span>
                    <span className="text-[11px] text-[#8c8c8c]">
                      Pay at doorstep upon private courier inspection
                    </span>
                  </div>
                </div>
              </label>

              <label
                className={`flex items-center justify-between p-3 border cursor-pointer transition-colors ${
                  paymentMethod === 'RAZORPAY'
                    ? 'border-[#121212] bg-white'
                    : 'border-[#e5e5e5] bg-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'RAZORPAY'}
                    onChange={() => setPaymentMethod('RAZORPAY')}
                    className="accent-[#121212]"
                  />
                  <div>
                    <span className="text-xs font-medium text-[#121212] block">
                      Razorpay Online (UPI, Netbanking, Luxury Cards)
                    </span>
                    <span className="text-[11px] text-[#8c8c8c]">
                      Seamless zero-redirect instant payment
                    </span>
                  </div>
                </div>
              </label>

              <label
                className={`flex items-center justify-between p-3 border cursor-pointer transition-colors ${
                  paymentMethod === 'STRIPE'
                    ? 'border-[#121212] bg-white'
                    : 'border-[#e5e5e5] bg-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'STRIPE'}
                    onChange={() => setPaymentMethod('STRIPE')}
                    className="accent-[#121212]"
                  />
                  <div>
                    <span className="text-xs font-medium text-[#121212] block">
                      Stripe Global Cards (Visa, Mastercard, Amex)
                    </span>
                    <span className="text-[11px] text-[#8c8c8c]">
                      Direct tokenized international payment gateway
                    </span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Complete Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={submitting}
            className="w-full bg-purple-600 text-white text-xs uppercase tracking-luxury py-4 flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors cursor-pointer"
          >
            {submitting ? 'Confirming Client Order...' : 'Complete & Authorize Purchase'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Persistent Order Summary */}
        <div className="lg:col-span-4 bg-[#faf9f6] border border-[#f0ede6] p-6 space-y-6">
          <h2 className="text-xs uppercase tracking-luxury font-medium text-[#121212] pb-4 border-b border-[#e5e5e5]">
            Review Creations ({items.length})
          </h2>

          <div className="divide-y divide-[#f0ede6] max-h-80 overflow-y-auto pr-1">
            {items.map(item => (
              <div key={item._id} className="py-3 flex gap-3 items-center">
                <div className="relative w-14 aspect-[3/4] bg-[#f4f3ee] flex-shrink-0">
                  {item.image && (
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-medium text-[#121212] truncate">{item.name}</h4>
                  <p className="text-[10px] text-[#8c8c8c]">
                    Qty {item.quantity} · {item.color} · {item.size}
                  </p>
                  <p className="text-xs font-light text-[#121212] mt-0.5">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 text-xs border-t border-[#e5e5e5] pt-4">
            <div className="flex justify-between text-[#575757]">
              <span>Subtotal</span>
              <span className="font-mono text-[#121212]">₹{totals.subtotal.toLocaleString()}</span>
            </div>

            {totals.discount > 0 && (
              <div className="flex justify-between text-[#c5a880]">
                <span>Privilege Discount ({couponCode})</span>
                <span className="font-mono">-₹{totals.discount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between text-[#575757]">
              <span>Shipping</span>
              <span className="font-mono text-[#121212]">
                {totals.shipping === 0 ? 'Complimentary' : `₹${totals.shipping}`}
              </span>
            </div>

            {totals.giftWrapCost > 0 && (
              <div className="flex justify-between text-[#575757]">
                <span>Signature Gift Wrap</span>
                <span className="font-mono text-[#121212]">₹{totals.giftWrapCost}</span>
              </div>
            )}

            <div className="flex justify-between text-[#575757]">
              <span>GST 18%</span>
              <span className="font-mono text-[#121212]">₹{totals.tax.toLocaleString()}</span>
            </div>

            <div className="border-t border-[#e5e5e5] pt-3 flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-luxury font-medium text-[#121212]">
                Total Payable
              </span>
              <span className="font-serif-luxury text-2xl text-[#121212]">
                ₹{totals.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
