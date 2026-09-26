'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Check, Heart, ShoppingBag } from 'lucide-react';
import { IProduct } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface QuickViewModalProps {
  product: IProduct | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || '');
  const [isAdding, setIsAdding] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const inWishlist = isInWishlist(product._id);

  const handleAdd = async () => {
    setIsAdding(true);
    await addToCart(product._id, undefined, 1);
    setIsAdding(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="relative bg-white max-w-3xl w-full shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2 overflow-hidden animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#575757] hover:text-[#121212] bg-white/80 rounded-full"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* Left Image View */}
        <div className="relative aspect-[3/4] bg-[#f5f4f0] overflow-hidden">
          {product.images && product.images.length > 0 && (
            <Image
              src={product.images[activeImageIndex]?.secure_url || product.images[0].secure_url}
              alt={product.name}
              fill
              className="object-cover"
            />
          )}

          {/* Mini thumbnails if multiple */}
          {product.images && product.images.length > 1 && (
            <div className="absolute bottom-3 left-3 right-3 flex gap-2 overflow-x-auto">
              {product.images.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-14 relative flex-shrink-0 border ${
                    activeImageIndex === idx ? 'border-[#121212]' : 'border-transparent opacity-70'
                  }`}
                >
                  <Image src={img.secure_url} alt="Thumb" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Product Details */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-luxury text-[#8c8c8c] font-medium mb-1">
              {typeof product.brand === 'object' ? product.brand.name : 'OPHMNART'}
            </p>
            <h3 className="font-serif-luxury text-2xl text-[#121212] leading-tight mb-3">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-lg font-medium text-[#121212]">
                ₹{product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-sm text-[#8c8c8c] line-through">
                  ₹{product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs text-[#575757] font-light leading-relaxed line-clamp-3 mb-6">
              {product.shortDescription || product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <span className="text-[11px] uppercase tracking-luxury text-[#575757] block mb-2">
                  Color: {selectedColor}
                </span>
                <div className="flex gap-2">
                  {product.colors.map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`text-xs border px-3 py-1.5 transition-all ${
                        selectedColor === c
                          ? 'border-[#121212] bg-[#121212] text-white'
                          : 'border-[#e5e5e5] text-[#121212] hover:border-black'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <span className="text-[11px] uppercase tracking-luxury text-[#575757] block mb-2">
                  Size: {selectedSize}
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-10 h-10 text-xs border flex items-center justify-center transition-all ${
                        selectedSize === s
                          ? 'border-[#121212] bg-[#121212] text-white font-medium'
                          : 'border-[#e5e5e5] text-[#121212] hover:border-black'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#f0ede6] space-y-3">
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                disabled={isAdding || product.inventory <= 0}
                className="flex-1 bg-[#121212] text-white text-xs uppercase tracking-luxury py-3.5 flex items-center justify-center gap-2 hover:bg-[#333] transition-colors disabled:bg-[#ccc]"
              >
                <ShoppingBag className="w-4 h-4" />
                {product.inventory <= 0 ? 'Out of Stock' : isAdding ? 'Adding...' : 'Add to Bag'}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 border border-[#e5e5e5] hover:border-[#121212] transition-colors ${
                  inWishlist ? 'text-red-600 border-red-200' : 'text-[#121212]'
                }`}
                title={inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="block text-center text-xs uppercase tracking-luxury text-[#575757] hover:text-[#121212] transition-colors"
            >
              View Full Product Details &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
