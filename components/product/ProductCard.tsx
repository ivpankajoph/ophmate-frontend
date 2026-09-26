'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { IProduct } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: IProduct;
  onQuickView?: (product: IProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const inWishlist = isInWishlist(product._id);

  // Compute discount percentage if compareAtPrice is higher
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  // Primary image & hover image
  const primaryImg = product.images?.[0]?.secure_url || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800';
  const secondaryImg = product.images?.[1]?.secure_url || primaryImg;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    await addToCart(product._id, undefined, 1);
    setIsAdding(false);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 4:5 Aspect Ratio Image Container */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-luxury-card w-full bg-[#f4f3ee] overflow-hidden block"
      >
        {/* Main Image */}
        <Image
          src={isHovered && secondaryImg ? secondaryImg : primaryImg}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.newArrival && (
            <span className="bg-white/90 backdrop-blur-xs text-[#121212] text-[9px] uppercase tracking-luxury font-medium px-2 py-0.5">
              New
            </span>
          )}
          {product.bestSeller && (
            <span className="bg-[#121212] text-white text-[9px] uppercase tracking-luxury font-medium px-2 py-0.5">
              Bestseller
            </span>
          )}
          {hasDiscount && (
            <span className="bg-[#c5a880] text-white text-[9px] uppercase tracking-luxury font-medium px-2 py-0.5">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 z-20 p-2 bg-white/80 hover:bg-white rounded-full transition-transform active:scale-90 ${
            inWishlist ? 'text-red-600' : 'text-[#121212]'
          }`}
          aria-label={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            className={`w-4 h-4 stroke-[1.5] ${inWishlist ? 'fill-current' : ''}`}
          />
        </button>

        {/* Action Overlay Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 via-black/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2 z-20">
          <button
            onClick={handleQuickAdd}
            disabled={isAdding || product.inventory <= 0}
            className="flex-1 bg-white text-[#121212] hover:bg-[#121212] hover:text-white text-[11px] uppercase tracking-luxury py-2 flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {product.inventory <= 0 ? 'Out of Stock' : isAdding ? 'Adding...' : 'Quick Add'}
          </button>

          {onQuickView && (
            <button
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="bg-white/90 hover:bg-white text-[#121212] p-2 transition-colors"
              title="Quick Preview"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </Link>

      {/* Product Meta Info */}
      <div className="pt-3 pb-2 flex flex-col justify-between flex-1">
        <div>
          <span className="text-[10px] uppercase tracking-luxury text-[#8c8c8c] block mb-1 font-medium">
            {typeof product.brand === 'object' ? product.brand.name : 'OPHMNART'}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="text-xs font-light text-[#121212] hover:text-[#c5a880] transition-colors block line-clamp-1 mb-1.5"
          >
            {product.name}
          </Link>
        </div>

        {/* Pricing and Color Dots */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#121212]">
              ₹{product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-[11px] text-[#8c8c8c] line-through">
                ₹{product.compareAtPrice?.toLocaleString()}
              </span>
            )}
          </div>

          {/* Color Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((col, idx) => (
                <span
                  key={idx}
                  title={col}
                  className="w-2 h-2 rounded-full border border-gray-300"
                  style={{
                    backgroundColor:
                      col.toLowerCase() === 'white'
                        ? '#ffffff'
                        : col.toLowerCase() === 'black' || col.toLowerCase().includes('noir') || col.toLowerCase().includes('onyx')
                        ? '#121212'
                        : col.toLowerCase().includes('navy')
                        ? '#1b2a4a'
                        : col.toLowerCase().includes('beige') || col.toLowerCase().includes('sand')
                        ? '#e6dfd5'
                        : col.toLowerCase().includes('green') || col.toLowerCase().includes('emerald')
                        ? '#2d5a27'
                        : '#c5a880'
                  }}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[9px] text-[#8c8c8c]">+{product.colors.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
