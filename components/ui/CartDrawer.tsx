'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, items, totals, updateQuantity, removeItem, itemCount } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#e5e5e5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-luxury font-medium text-[#121212]">
                Shopping Bag
              </span>
              <span className="text-xs text-[#8c8c8c]">({itemCount})</span>
            </div>
            <button
              onClick={closeCart}
              className="p-1 text-[#575757] hover:text-[#121212] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#f0ede6]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <ShoppingBag className="w-12 h-12 stroke-[1] text-[#8c8c8c] mb-4" />
                <h3 className="font-serif-luxury text-xl text-[#121212] mb-2">
                  YOUR BAG IS EMPTY
                </h3>
                <p className="text-xs text-[#575757] font-light max-w-xs mb-6">
                  Discover timeless pieces from the new season edit.
                </p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="bg-[#121212] text-white text-xs uppercase tracking-luxury px-6 py-3 hover:bg-[#333] transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              items.map(item => (
                <div key={item._id} className="py-4 flex gap-4 items-start">
                  <div className="relative w-20 aspect-[3/4] bg-[#f5f4f0] overflow-hidden flex-shrink-0">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium text-[#121212] leading-snug line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#8c8c8c] mt-0.5">
                      {item.color} / {item.size}
                    </p>
                    <p className="text-xs font-light text-[#121212] mt-1.5">
                      ₹{item.price.toLocaleString()}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-[#e5e5e5]">
                        <button
                          onClick={() => updateQuantity(item._id!, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#575757] hover:text-[#121212]"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-light text-[#121212]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id!, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#575757] hover:text-[#121212]"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item._id!)}
                        className="text-[#8c8c8c] hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="border-t border-[#e5e5e5] px-6 py-5 bg-[#faf9f6]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs uppercase tracking-luxury text-[#575757]">
                  Subtotal
                </span>
                <span className="text-sm font-medium text-[#121212]">
                  ₹{totals.subtotal.toLocaleString()}
                </span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between items-center text-xs text-[#c5a880] mb-1">
                  <span>Discount</span>
                  <span>-₹{totals.discount.toLocaleString()}</span>
                </div>
              )}
              <p className="text-[11px] text-[#8c8c8c] mb-4">
                Taxes and complimentary shipping calculated at checkout.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full border border-[#121212] text-[#121212] text-xs uppercase tracking-luxury py-3 text-center hover:bg-[#f0ede6] transition-colors"
                >
                  View Bag
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full bg-purple-600 text-white text-xs uppercase tracking-luxury py-3 text-center flex items-center justify-center gap-1.5 hover:bg-purple-700 transition-colors"
                >
                  Checkout <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
