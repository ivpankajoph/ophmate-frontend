'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-28 text-center">
        <Heart className="w-16 h-16 stroke-[1] text-[#8c8c8c] mx-auto mb-4" />
        <h1 className="font-serif-luxury text-3xl md:text-4xl text-[#121212] mb-3">
          YOUR WISHLIST IS EMPTY
        </h1>
        <p className="text-xs text-[#575757] font-light max-w-sm mx-auto mb-8 leading-relaxed">
          Save pieces you love to build your personal capsule edit and return to them anytime.
        </p>
        <Link
          href="/products"
          className="inline-block bg-[#121212] text-white text-xs uppercase tracking-luxury px-8 py-4 hover:bg-[#333] transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      <div className="border-b border-[#f0ede6] pb-6 mb-10 flex items-end justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-luxury text-[#c5a880] block mb-1">
            CLIENT ARCHIVE
          </span>
          <h1 className="font-serif-luxury text-3xl md:text-5xl text-[#121212]">
            Curated Wishlist
          </h1>
        </div>
        <span className="text-xs text-[#8c8c8c]">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'saved piece' : 'saved pieces'}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map(prod => (
          <div key={prod._id} className="group flex flex-col border border-[#f0ede6] p-4 bg-white">
            <Link
              href={`/products/${prod.slug}`}
              className="relative aspect-[3/4] bg-[#f5f4f0] overflow-hidden mb-3 block"
            >
              {prod.images?.[0]?.secure_url && (
                <Image
                  src={prod.images[0].secure_url}
                  alt={prod.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
            </Link>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-luxury text-[#8c8c8c] block mb-1">
                  {typeof prod.brand === 'object' ? prod.brand.name : 'OPHMNART'}
                </span>
                <Link
                  href={`/products/${prod.slug}`}
                  className="text-xs font-medium text-[#121212] hover:text-[#c5a880] line-clamp-1 block mb-2"
                >
                  {prod.name}
                </Link>
                <p className="text-xs font-medium text-[#121212]">
                  ₹{prod.price.toLocaleString()}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#f0ede6] flex items-center gap-2">
                <button
                  onClick={() => addToCart(prod._id, undefined, 1)}
                  className="flex-1 bg-[#121212] text-white text-[11px] uppercase tracking-luxury py-2.5 flex items-center justify-center gap-1.5 hover:bg-[#333] transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Move to Bag
                </button>
                <button
                  onClick={() => toggleWishlist(prod)}
                  className="p-2.5 border border-[#e5e5e5] text-[#8c8c8c] hover:text-red-600 transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
