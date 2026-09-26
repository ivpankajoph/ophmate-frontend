'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export interface StoryCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  badge?: string;
  queryParam: string;
}

export const CATEGORY_STORIES: StoryCategory[] = [
  {
    id: 'women',
    name: "Women's Wear",
    slug: 'women',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600',
    badge: 'NEW',
    queryParam: 'category=women'
  },
  {
    id: 'men',
    name: "Men's Wear",
    slug: 'men',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=600',
    badge: 'TAILORED',
    queryParam: 'category=men'
  },
  {
    id: 'electronics',
    name: 'Electronics & Audio',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600',
    badge: 'TECH',
    queryParam: 'category=electronics'
  },
  {
    id: 'beauty',
    name: 'Make-up & Beauty',
    slug: 'beauty',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600',
    badge: 'COSMETICS',
    queryParam: 'category=beauty'
  },
  {
    id: 'shoes',
    name: 'Shoes & Footwear',
    slug: 'shoes',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600',
    queryParam: 'category=shoes'
  },
  {
    id: 'bags',
    name: 'Handbags & Totes',
    slug: 'bags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600',
    badge: 'LEATHER',
    queryParam: 'category=bags'
  },
  {
    id: 'jewellery',
    name: 'Fine Jewellery',
    slug: 'jewellery',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600',
    badge: '18K GOLD',
    queryParam: 'category=jewellery'
  },
  {
    id: 'horology',
    name: 'Swiss Watches',
    slug: 'jewellery',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600',
    badge: 'CHRONO',
    queryParam: 'category=jewellery&subCategory=fine-jewellery'
  },
  {
    id: 'home',
    name: 'Home & Living',
    slug: 'home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600',
    badge: 'DESIGN',
    queryParam: 'category=home'
  },
  {
    id: 'fragrance',
    name: 'Fragrance',
    slug: 'beauty',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600',
    badge: 'NICHE',
    queryParam: 'category=beauty&subCategory=fragrance'
  },
  {
    id: 'sale',
    name: 'Private Sale',
    slug: 'sale',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600',
    badge: '-40%',
    queryParam: 'collection=sale'
  }
];

export const CategoryStories: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5 px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8c8c8c] font-medium">
            DISCOVER STORIES · HAUTE CATEGORIES
          </span>
        </div>

        {/* Scroll Arrows for Desktop */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="w-7 h-7 rounded-full border border-[#e5e5e5] bg-white flex items-center justify-center text-[#575757] hover:text-[#121212] hover:border-[#121212] transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-7 h-7 rounded-full border border-[#e5e5e5] bg-white flex items-center justify-center text-[#575757] hover:text-[#121212] hover:border-[#121212] transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Stories Container */}
      <div className="relative group/carousel">
        <div
          ref={scrollRef}
          className="flex items-start gap-4 sm:gap-6 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-3 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CATEGORY_STORIES.map((story) => (
            <Link
              key={story.id}
              href={`/products?${story.queryParam}`}
              className="flex flex-col items-center flex-shrink-0 group focus:outline-none cursor-pointer"
            >
              {/* Story Circle Avatar */}
              <div className="relative">
                {/* Luxury Instagram-Style Gradient Ring */}
                <div className="p-[2.5px] rounded-full bg-gradient-to-tr from-[#c5a880] via-[#f3e5d0] to-[#9c7c4e] shadow-sm group-hover:from-[#121212] group-hover:to-[#c5a880] group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                  {/* White inner border gap */}
                  <div className="p-[2px] bg-white rounded-full">
                    {/* Circle Image */}
                    <div className="relative w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full overflow-hidden bg-[#f4f3ee]">
                      <Image
                        src={story.image}
                        alt={story.name}
                        fill
                        sizes="96px"
                        className="object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
                      />
                    </div>
                  </div>
                </div>

                {/* Badge (Optional on specific stories like NEW, TECH, 40%) */}
                {story.badge && (
                  <span
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 text-[8px] uppercase tracking-wider font-semibold rounded-xs shadow-xs pointer-events-none transition-transform group-hover:scale-105 ${
                      story.badge === '-40%'
                        ? 'bg-[#c5a880] text-white'
                        : story.badge === 'TECH'
                        ? 'bg-[#121212] text-white'
                        : 'bg-[#121212] text-white'
                    }`}
                  >
                    {story.badge}
                  </span>
                )}
              </div>

              {/* Category Name Underneath */}
              <span className="text-[11px] sm:text-xs font-medium text-[#121212] tracking-wide text-center mt-2.5 max-w-[84px] sm:max-w-[96px] truncate block group-hover:text-[#c5a880] transition-colors">
                {story.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
