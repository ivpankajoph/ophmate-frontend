'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Trash2, ArrowRight, ShieldCheck, Gift, Tag, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    totals,
    updateQuantity,
    removeItem,
    applyCoupon,
    toggleGiftWrap,
    couponCode,
    giftWrap
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError?: boolean } | null>(null);
  const [giftMsg, setGiftMsg] = useState('');

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const res = await applyCoupon(promoInput.trim());
    if (res.success) {
      setPromoMessage({ text: res.message, isError: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: res.message, isError: true });
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-28 text-center">
        <ShoppingBag className="w-16 h-16 stroke-[1] text-[#8c8c8c] mx-auto mb-4" />
        <h1 className="font-serif-luxury text-3xl md:text-4xl text-[#121212] mb-3">
          YOUR SHOPPING BAG IS EMPTY
        </h1>
        <p className="text-xs text-[#575757] font-light max-w-md mx-auto mb-8 leading-relaxed">
          Discover our new season arrivals sculpted in pure Italian wool, mulberry silk, and handcrafted Florentine leather.
        </p>
        <Link
          href="/products"
          className="inline-block bg-[#121212] text-white text-xs uppercase tracking-luxury px-8 py-4 hover:bg-[#333] transition-colors"
        >
          Explore Haute Édition
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="border-b border-[#f0ede6] pb-6 mb-10">
        <h1 className="font-serif-luxury text-3xl md:text-5xl text-[#121212] font-normal">
          Shopping Bag
        </h1>
        <p className="text-xs text-[#8c8c8c] mt-1 font-light">
          {items.length} curated {items.length === 1 ? 'creation' : 'creations'} awaiting client packaging
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Items list */}
        <div className="lg:col-span-8 divide-y divide-[#f0ede6]">
          {items.map(item => (
            <div key={item._id} className="py-6 flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative w-28 aspect-[3/4] bg-[#f4f3ee] overflow-hidden flex-shrink-0">
                {item.image && (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                )}
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-1">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-sm font-medium text-[#121212] leading-snug">
                      {item.name}
                    </h3>
                    <span className="text-sm font-medium text-[#121212]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-xs text-[#8c8c8c] mt-1">
                    Color: {item.color} | Size: {item.size}
                  </p>
                  <p className="text-xs text-[#8c8c8c]">SKU: {item.sku}</p>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#faf9f6]">
                  <div className="flex items-center border border-[#e5e5e5]">
                    <button
                      onClick={() => updateQuantity(item._id!, item.quantity - 1)}
                      className="px-3 py-1 text-xs text-[#575757] hover:text-black"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-mono">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id!, item.quantity + 1)}
                      className="px-3 py-1 text-xs text-[#575757] hover:text-black"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item._id!)}
                    className="text-xs text-[#8c8c8c] hover:text-red-600 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Luxury Gift Packaging option */}
          <div className="pt-6">
            <div className="bg-[#faf9f6] border border-[#f0ede6] p-5 flex items-start gap-4">
              <Gift className="w-5 h-5 text-[#c5a880] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-luxury font-medium text-[#121212]">
                    Signature Haute Édition Gift Wrap (+₹250)
                  </span>
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={e => toggleGiftWrap(e.target.checked, giftMsg)}
                    className="accent-[#121212] w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-[#8c8c8c] font-light mt-1">
                  Presented in our structured black lacquer box with ivory grosgrain ribbon and wax seal.
                </p>
                {giftWrap && (
                  <input
                    type="text"
                    value={giftMsg}
                    onChange={e => {
                      setGiftMsg(e.target.value);
                      toggleGiftWrap(true, e.target.value);
                    }}
                    placeholder="Inscribe a personalized gift card message..."
                    className="mt-3 w-full border border-[#e5e5e5] p-2 text-xs bg-white focus:outline-none"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 bg-[#faf9f6] border border-[#f0ede6] p-6 md:p-8 space-y-6">
          <h2 className="text-xs uppercase tracking-luxury font-medium text-[#121212] pb-4 border-b border-[#e5e5e5]">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs">
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
              <span>Estimated Shipping</span>
              <span className="font-mono text-[#121212]">
                {totals.shipping === 0 ? 'Complimentary' : `₹${totals.shipping.toLocaleString()}`}
              </span>
            </div>

            {totals.giftWrapCost > 0 && (
              <div className="flex justify-between text-[#575757]">
                <span>Bespoke Gift Wrapping</span>
                <span className="font-mono text-[#121212]">₹{totals.giftWrapCost}</span>
              </div>
            )}

            <div className="flex justify-between text-[#575757]">
              <span>Estimated Luxury Tax (GST 18%)</span>
              <span className="font-mono text-[#121212]">₹{totals.tax.toLocaleString()}</span>
            </div>

            <div className="border-t border-[#e5e5e5] pt-4 flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-luxury font-medium text-[#121212]">
                Total
              </span>
              <span className="font-serif-luxury text-2xl text-[#121212]">
                ₹{totals.total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Promo code form */}
          <form onSubmit={handleApplyPromo} className="pt-2">
            <span className="text-[11px] uppercase tracking-luxury text-[#8c8c8c] block mb-1.5 font-medium">
              Promotional Invitation Code
            </span>
            <div className="flex border border-[#e5e5e5] bg-white">
              <input
                type="text"
                value={promoInput}
                onChange={e => setPromoInput(e.target.value)}
                placeholder="e.g. WELCOME10, LUXE20"
                className="w-full p-2.5 text-xs text-[#121212] uppercase focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#121212] text-white px-4 text-[11px] uppercase tracking-luxury hover:bg-[#333] transition-colors"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p
                className={`text-[11px] mt-1.5 ${
                  promoMessage.isError ? 'text-red-600' : 'text-[#c5a880]'
                }`}
              >
                {promoMessage.text}
              </p>
            )}
          </form>

          {/* Checkout CTA */}
          <div className="pt-4 border-t border-[#e5e5e5] space-y-3">
            <button
              onClick={() => router.push('/checkout')}
              className="w-full bg-[#121212] text-white text-xs uppercase tracking-luxury py-4 flex items-center justify-center gap-2 hover:bg-[#333] transition-colors"
            >
              Proceed to Checkout <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#8c8c8c] pt-2">
              <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
              <span>Encrypted 256-Bit SSL Checkout Protection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
