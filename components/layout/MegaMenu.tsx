'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MegaMenuCategory {
  title: string;
  slug: string;
  subcategories: { name: string; href: string }[];
  promoImage: string;
  promoTitle: string;
  promoSubtitle: string;
}

const MENU_DATA: Record<string, MegaMenuCategory> = {
  Women: {
    title: 'Women',
    slug: 'women',
    subcategories: [
      { name: 'Dresses & Eveningwear', href: '/products?category=women&subCategory=dresses' },
      { name: 'Tailored Blazers & Coats', href: '/products?category=women&subCategory=women-jackets' },
      { name: 'Silk Tops & Blouses', href: '/products?category=women&subCategory=women-tops' },
      { name: 'High-Waist Trousers', href: '/products?category=women' },
      { name: 'Knitwear & Cashmere', href: '/products?category=women' },
      { name: 'Fine Jewellery & Watches', href: '/products?category=jewellery' }
    ],
    promoImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800',
    promoTitle: 'THE AUTUMN EDIT',
    promoSubtitle: 'Fluid silhouettes in pure Mulberry silk and virgin wool.'
  },
  Men: {
    title: 'Men',
    slug: 'men',
    subcategories: [
      { name: 'Tailored Suits & Blazers', href: '/products?category=men&subCategory=men-blazers' },
      { name: 'Poplin & Linen Shirts', href: '/products?category=men&subCategory=shirts' },
      { name: 'Pleated Trousers & Chinos', href: '/products?category=men&subCategory=men-trousers' },
      { name: 'Mongolian Cashmere', href: '/products?category=men' },
      { name: 'Outerwear & Trench Coats', href: '/products?category=men' },
      { name: 'Florentine Leather Boots', href: '/products?category=shoes' }
    ],
    promoImage: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800',
    promoTitle: 'SARTORIAL HERITAGE',
    promoSubtitle: 'Italian tailoring engineered for contemporary movement.'
  },
  Shoes: {
    title: 'Shoes',
    slug: 'shoes',
    subcategories: [
      { name: 'Minimalist Leather Sneakers', href: '/products?category=shoes&subCategory=sneakers' },
      { name: 'Hand-Stitched Penny Loafers', href: '/products?category=shoes' },
      { name: 'Pointed Toe Stiletto Pumps', href: '/products?category=shoes&subCategory=heels' },
      { name: 'Tuscan Chelsea Boots', href: '/products?category=shoes' },
      { name: 'Evening Mule Sandals', href: '/products?category=shoes' }
    ],
    promoImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800',
    promoTitle: 'FLORENTINE FOOTWEAR',
    promoSubtitle: 'Vegetable-tanned calfskin and Goodyear welted soles.'
  },
  Bags: {
    title: 'Bags',
    slug: 'bags',
    subcategories: [
      { name: 'Structured Leather Totes', href: '/products?category=bags&subCategory=shoulder-bags' },
      { name: 'Curved Half-Moon Shoulder Bags', href: '/products?category=bags' },
      { name: 'Crossbody Pouches', href: '/products?category=bags' },
      { name: 'Travel & Weekenders', href: '/products?category=bags' },
      { name: 'Small Leather Goods & Wallets', href: '/products?category=bags' }
    ],
    promoImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800',
    promoTitle: 'THE MONOLITH BAG',
    promoSubtitle: 'Architectural lines in palmellato leather.'
  },
  Jewellery: {
    title: 'Jewellery & Watches',
    slug: 'jewellery',
    subcategories: [
      { name: 'Automatic Chronographs', href: '/products?category=jewellery&subCategory=fine-jewellery' },
      { name: '18K Solid Gold Rings', href: '/products?category=jewellery' },
      { name: 'Sculptural Link Necklaces', href: '/products?category=jewellery' },
      { name: 'Tahitian Pearl Earrings', href: '/products?category=jewellery' }
    ],
    promoImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800',
    promoTitle: 'HOROLOGY & GOLD',
    promoSubtitle: 'Timeless Swiss movements and recycled 18-karat gold.'
  },
  Living: {
    title: 'Home & Living',
    slug: 'home',
    subcategories: [
      { name: 'Travertine & Marble Lighting', href: '/products?category=home&subCategory=lighting' },
      { name: 'Artisanal Ceramic Amphoras', href: '/products?category=home&subCategory=decor' },
      { name: 'Belgian Linen Bedding', href: '/products?category=home' },
      { name: 'Acoustic Studio Audio', href: '/products?category=electronics' }
    ],
    promoImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800',
    promoTitle: 'SCULPTURAL SPACES',
    promoSubtitle: 'Objects designed to elevate modern architectural dwellings.'
  },
  Sale: {
    title: 'Private Sale',
    slug: 'sale',
    subcategories: [
      { name: 'Outerwear & Tailoring (-40%)', href: '/products?collection=sale' },
      { name: 'Florentine Leather Goods (-30%)', href: '/products?collection=sale' },
      { name: 'Footwear & Margom Soles (-35%)', href: '/products?collection=sale' },
      { name: 'Silk Dresses & Blouses (-50%)', href: '/products?collection=sale' }
    ],
    promoImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800',
    promoTitle: 'ARCHIVAL SELECTIONS',
    promoSubtitle: 'Exceptional investment pieces with private privilege pricing.'
  }
};

const resolveCategoryData = (cat: string): MegaMenuCategory | undefined => {
  if (!cat) return undefined;
  const key = cat.toLowerCase().trim();
  if (key === 'women' || key === 'beauty' || key === 'fragrance') return MENU_DATA.Women;
  if (key === 'men') return MENU_DATA.Men;
  if (key === 'shoes') return MENU_DATA.Shoes;
  if (key === 'bags') return MENU_DATA.Bags;
  if (key === 'jewellery' || key === 'horology') return MENU_DATA.Jewellery;
  if (key === 'home' || key === 'living' || key === 'electronics') return MENU_DATA.Living;
  if (key === 'sale') return MENU_DATA.Sale;
  return MENU_DATA[cat] || MENU_DATA[cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()];
};

interface MegaMenuProps {
  category: string;
  onClose: () => void;
  className?: string;
  onMouseEnter?: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ category, onClose, className = '', onMouseEnter }) => {
  const data = resolveCategoryData(category);
  if (!data) return null;

  return (
    <div
      onMouseLeave={onClose}
      onMouseEnter={onMouseEnter}
      className={`absolute top-full left-0 w-full bg-white border-b border-[#e5e5e5] shadow-xl z-50 py-10 px-8 transition-all duration-300 ${className}`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-start">
        {/* Subcategories list */}
        <div className="col-span-4 pr-6">
          <span className="text-xs uppercase tracking-luxury text-[#8c8c8c] block mb-4 font-medium">
            Explore {data.title}
          </span>
          <ul className="space-y-3">
            {data.subcategories.map(sub => (
              <li key={sub.name}>
                <Link
                  href={sub.href}
                  onClick={onClose}
                  className="text-sm font-light text-[#121212] hover:text-[#c5a880] transition-colors block py-1"
                >
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-4 border-t border-[#f0ede6]">
            <Link
              href={`/products?category=${data.slug}`}
              onClick={onClose}
              className="text-xs uppercase tracking-luxury font-medium text-[#121212] hover:text-[#c5a880] flex items-center gap-2 transition-colors"
            >
              View All {data.title} &rarr;
            </Link>
          </div>
        </div>

        {/* Featured Editorial Column */}
        <div className="col-span-8 grid grid-cols-2 gap-6 pl-6 border-l border-[#f0ede6]">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#faf9f6] group">
            <Image
              src={data.promoImage}
              alt={data.promoTitle}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] tracking-luxury uppercase bg-black/60 px-2 py-1 mb-2 inline-block">
                Featured Editorial
              </span>
              <h4 className="font-serif-luxury text-lg tracking-wide">{data.promoTitle}</h4>
            </div>
          </div>

          <div className="flex flex-col justify-between py-2">
            <div>
              <span className="text-xs uppercase tracking-luxury text-[#c5a880] block mb-2 font-medium">
                New Arrivals
              </span>
              <h3 className="font-serif-luxury text-2xl text-[#121212] font-normal leading-tight mb-3">
                {data.promoTitle}
              </h3>
              <p className="text-xs text-[#575757] font-light leading-relaxed mb-6">
                {data.promoSubtitle}
              </p>
            </div>
            <div>
              <Link
                href={`/products?category=${data.slug}&collection=new-arrivals`}
                onClick={onClose}
                className="inline-block border border-[#121212] px-6 py-2.5 text-xs uppercase tracking-luxury text-[#121212] hover:bg-[#121212] hover:text-white transition-all duration-300"
              >
                Discover Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
