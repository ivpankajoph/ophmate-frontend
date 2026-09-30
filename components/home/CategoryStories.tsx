'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MegaMenu } from '../layout/MegaMenu';

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
  const [activeStory, setActiveStory] = useState<StoryCategory | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScrollability, { passive: true });
    window.addEventListener('resize', checkScrollability);
    return () => {
      el.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      const scrollAmount = direction === 'left' ? -Math.round(containerWidth * 0.7) : Math.round(containerWidth * 0.7);
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollability, 350);
    }
  };

  const handleStoryMouseEnter = (story: StoryCategory) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveStory(story);
  };

  const handleStoryMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveStory(null);
    }, 280);
  };

  const handleDropdownMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleDropdownClose = () => {
    setActiveStory(null);
  };

  return (
    <section className="relative w-full pt-1 pb-1 sm:pt-2 sm:pb-2 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Horizontal Stories Container with Edge Navigation Arrows */}
        <div className="relative group/carousel">
          {/* Left Arrow Button at Start */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute -left-2 sm:-left-3 md:-left-5 top-12 sm:top-[54px] md:top-[58px] -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#121212] hover:text-black border border-[#e5e5e5] hover:border-[#121212] shadow-sm hover:shadow-md flex items-center justify-center transition-all cursor-pointer ${
              canScrollLeft
                ? 'opacity-100 scale-100 hover:scale-105 active:scale-95'
                : 'opacity-0 pointer-events-none scale-75'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Right Arrow Button at End */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute -right-2 sm:-right-3 md:-right-5 top-12 sm:top-[54px] md:top-[58px] -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#121212] hover:text-black border border-[#e5e5e5] hover:border-[#121212] shadow-sm hover:shadow-md flex items-center justify-center transition-all cursor-pointer ${
              canScrollRight
                ? 'opacity-100 scale-100 hover:scale-105 active:scale-95'
                : 'opacity-0 pointer-events-none scale-75'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex items-start gap-4 sm:gap-6 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth pt-3 pb-2 px-1.5 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {CATEGORY_STORIES.map((story) => {
              const isHovered = activeStory?.id === story.id;
              return (
                <div
                  key={story.id}
                  onMouseEnter={() => handleStoryMouseEnter(story)}
                  onMouseLeave={handleStoryMouseLeave}
                  className="flex flex-col items-center flex-shrink-0 group focus:outline-none cursor-pointer snap-start"
                >
                  <Link
                    href={`/products?${story.queryParam}`}
                    className="flex flex-col items-center"
                  >
                    {/* Story Circle Avatar */}
                    <div className="relative">
                      {/* Luxury Gold/Champagne Editorial Gradient Ring */}
                      <div
                        className={`p-[2.5px] rounded-full transition-all duration-300 ${
                          isHovered
                            ? 'bg-gradient-to-tr from-[#121212] via-[#9c7c4e] to-[#c5a880] ring-2 ring-[#c5a880]/40 scale-105 shadow-md'
                            : 'bg-gradient-to-tr from-[#c5a880] via-[#f3e5d0] to-[#9c7c4e] shadow-2xs group-hover:from-[#121212] group-hover:to-[#c5a880] group-hover:scale-105'
                        }`}
                      >
                        {/* White inner border gap */}
                        <div className="p-[2px] bg-white rounded-full">
                          {/* Circle Image */}
                          <div className="relative w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full overflow-hidden bg-[#f4f3ee]">
                            <Image
                              src={story.image}
                              alt={story.name}
                              fill
                              sizes="96px"
                              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Badge */}
                      {story.badge && (
                        <span
                          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 text-[8px] uppercase tracking-wider font-semibold rounded-none shadow-2xs pointer-events-none transition-transform group-hover:scale-105 ${
                            story.badge === '-40%'
                              ? 'bg-[#c5a880] text-white'
                              : 'bg-[#121212] text-white'
                          }`}
                        >
                          {story.badge}
                        </span>
                      )}
                    </div>

                    {/* Category Name Underneath */}
                    <span
                      className={`text-[11px] sm:text-xs font-light tracking-wide text-center mt-2 max-w-[84px] sm:max-w-[96px] truncate block transition-colors ${
                        isHovered
                          ? 'text-[#c5a880]'
                          : 'text-[#121212] group-hover:text-[#c5a880]'
                      }`}
                    >
                      {story.name}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* DROPDOWN OF CATEGORIES - EXACTLY SAME AS DROPDOWN OF HEADER TEXT */}
      {activeStory && (
        <MegaMenu
          category={activeStory.id}
          onClose={handleDropdownClose}
          onMouseEnter={handleDropdownMouseEnter}
          className="border-t border-[#f0ede6]"
        />
      )}
    </section>
  );
};
