'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, Check } from 'lucide-react';

interface FilterPanelProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ isOpenMobile, onCloseMobile }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || '';
  const currentBrand = searchParams.get('brand') || '';
  const currentMinPrice = searchParams.get('minPrice') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '';
  const currentSize = searchParams.get('size')?.split(',') || [];
  const currentColor = searchParams.get('color')?.split(',') || [];
  const currentMaterial = searchParams.get('material')?.split(',') || [];
  const currentRating = searchParams.get('rating') || '';
  const currentAvailability = searchParams.get('availability') || '';
  const currentDiscount = searchParams.get('discount') || '';

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set('page', '1'); // Reset to page 1 on filter
    router.push(`/products?${params.toString()}`);
  };

  const toggleArrayParam = (key: string, item: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentList = params.get(key)?.split(',').filter(Boolean) || [];
    let updated: string[];

    if (currentList.includes(item)) {
      updated = currentList.filter(i => i !== item);
    } else {
      updated = [...currentList, item];
    }

    if (updated.length === 0) {
      params.delete(key);
    } else {
      params.set(key, updated.join(','));
    }
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push('/products');
  };

  const categories = [
    { name: 'All Categories', slug: '' },
    { name: 'Women', slug: 'women' },
    { name: 'Men', slug: 'men' },
    { name: 'Shoes', slug: 'shoes' },
    { name: 'Bags', slug: 'bags' },
    { name: 'Jewellery & Watches', slug: 'jewellery' },
    { name: 'Home & Living', slug: 'home' },
    { name: 'Electronics & Audio', slug: 'electronics' },
    { name: 'Beauty & Fragrance', slug: 'beauty' }
  ];

  const brands = [
    { name: 'Aurelius', slug: 'aurelius' },
    { name: 'Maison Noir', slug: 'maison-noir' },
    { name: 'Veloura', slug: 'veloura' },
    { name: 'Monarque', slug: 'monarque' },
    { name: 'Atelier One', slug: 'atelier-one' },
    { name: 'Urban Form', slug: 'urban-form' },
    { name: 'Élan', slug: 'elan' },
    { name: 'Vanta', slug: 'vanta' },
    { name: 'Nova Luxe', slug: 'nova-luxe' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '38', '40', '42', '44'];
  const materials = ['Cashmere', 'Italian Wool', '100% Cotton', 'Silk', 'Linen', 'Full Grain Leather'];
  const colors = [
    { name: 'Black', hex: '#111111' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Beige', hex: '#e8e2d5' },
    { name: 'Navy', hex: '#1b2a4a' },
    { name: 'Charcoal', hex: '#373737' },
    { name: 'Gold', hex: '#d4af37' }
  ];

  const activeFilterCount =
    (currentCategory ? 1 : 0) +
    (currentBrand ? 1 : 0) +
    (currentMinPrice || currentMaxPrice ? 1 : 0) +
    currentSize.length +
    currentColor.length +
    currentMaterial.length +
    (currentRating ? 1 : 0) +
    (currentAvailability ? 1 : 0) +
    (currentDiscount ? 1 : 0);

  const content = (
    <div className="space-y-8 pr-4">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-[#e5e5e5]">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-luxury font-medium text-[#121212]">
            Filters
          </span>
          {activeFilterCount > 0 && (
            <span className="text-[10px] bg-[#121212] text-white px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-[11px] text-[#8c8c8c] hover:text-[#121212] underline uppercase tracking-wider"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs uppercase tracking-luxury text-[#121212] font-medium mb-3">
          Category
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {categories.map(cat => (
            <button
              key={cat.slug}
              onClick={() => updateParam('category', cat.slug || null)}
              className={`text-xs block w-full text-left py-1 transition-colors ${
                currentCategory === cat.slug
                  ? 'text-[#121212] font-medium pl-2 border-l border-[#121212]'
                  : 'text-[#575757] hover:text-[#121212]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h4 className="text-xs uppercase tracking-luxury text-[#121212] font-medium mb-3">
          Maison / Brand
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {brands.map(b => (
            <button
              key={b.slug}
              onClick={() => updateParam('brand', currentBrand === b.slug ? null : b.slug)}
              className={`text-xs block w-full text-left py-1 transition-colors ${
                currentBrand === b.slug
                  ? 'text-[#121212] font-medium pl-2 border-l border-[#121212]'
                  : 'text-[#575757] hover:text-[#121212]'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-xs uppercase tracking-luxury text-[#121212] font-medium mb-3">
          Price Range (₹)
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min ₹"
            defaultValue={currentMinPrice}
            onBlur={e => updateParam('minPrice', e.target.value || null)}
            className="border border-[#e5e5e5] px-2.5 py-1.5 text-xs text-[#121212] focus:outline-none focus:border-black"
          />
          <input
            type="number"
            placeholder="Max ₹"
            defaultValue={currentMaxPrice}
            onBlur={e => updateParam('maxPrice', e.target.value || null)}
            className="border border-[#e5e5e5] px-2.5 py-1.5 text-xs text-[#121212] focus:outline-none focus:border-black"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className="text-xs uppercase tracking-luxury text-[#121212] font-medium mb-3">
          Size
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {sizes.map(s => {
            const isSelected = currentSize.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleArrayParam('size', s)}
                className={`w-9 h-9 text-xs border flex items-center justify-center transition-all ${
                  isSelected
                    ? 'border-[#121212] bg-[#121212] text-white font-medium'
                    : 'border-[#e5e5e5] text-[#121212] hover:border-black'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h4 className="text-xs uppercase tracking-luxury text-[#121212] font-medium mb-3">
          Color
        </h4>
        <div className="flex flex-wrap gap-2">
          {colors.map(col => {
            const isSelected = currentColor.includes(col.name);
            return (
              <button
                key={col.name}
                onClick={() => toggleArrayParam('color', col.name)}
                title={col.name}
                className={`w-6 h-6 rounded-full border relative flex items-center justify-center transition-transform ${
                  isSelected ? 'scale-110 ring-2 ring-black' : 'border-[#d4d4d4] hover:scale-105'
                }`}
                style={{ backgroundColor: col.hex }}
              >
                {isSelected && (
                  <Check
                    className={`w-3 h-3 ${col.name === 'White' ? 'text-black' : 'text-white'}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Materials */}
      <div>
        <h4 className="text-xs uppercase tracking-luxury text-[#121212] font-medium mb-3">
          Material
        </h4>
        <div className="space-y-1.5">
          {materials.map(mat => {
            const isSelected = currentMaterial.includes(mat);
            return (
              <button
                key={mat}
                onClick={() => toggleArrayParam('material', mat)}
                className={`text-xs block w-full text-left py-1 transition-colors ${
                  isSelected
                    ? 'text-[#121212] font-medium pl-2 border-l border-[#121212]'
                    : 'text-[#575757] hover:text-[#121212]'
                }`}
              >
                {mat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Discount */}
      <div>
        <h4 className="text-xs uppercase tracking-luxury text-[#121212] font-medium mb-3">
          Discount
        </h4>
        <div className="space-y-1">
          {['10', '20', '30', '50'].map(disc => (
            <button
              key={disc}
              onClick={() => updateParam('discount', currentDiscount === disc ? null : disc)}
              className={`text-xs block w-full text-left py-1 transition-colors ${
                currentDiscount === disc
                  ? 'text-[#c5a880] font-medium'
                  : 'text-[#575757] hover:text-[#121212]'
              }`}
            >
              {disc}% or more
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">{content}</div>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-[80] lg:hidden flex">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full p-6 overflow-y-auto shadow-2xl z-10">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#e5e5e5]">
              <span className="text-xs uppercase tracking-luxury font-medium">Refine Catalog</span>
              <button onClick={onCloseMobile} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
};
