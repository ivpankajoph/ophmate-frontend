'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { ProductGrid } from '../components/product/ProductGrid';
import { CategoryStories } from '../components/home/CategoryStories';
import { HeroSlider } from '../components/home/HeroSlider';
import { HomeSearchBar } from '../components/home/HomeSearchBar';
import { fetchApi } from '../lib/api';
import { IProduct } from '../types';

export default function HomePage() {
  const [newArrivals, setNewArrivals] = useState<IProduct[]>([]);
  const [trending, setTrending] = useState<IProduct[]>([]);
  const [bestSellers, setBestSellers] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [resNew, resTrending, resBest] = await Promise.all([
          fetchApi<{ products: IProduct[] }>('/products?collection=new-arrivals&limit=4'),
          fetchApi<{ products: IProduct[] }>('/products?collection=trending&limit=8'),
          fetchApi<{ products: IProduct[] }>('/products?collection=best-sellers&limit=4')
        ]);

        if (resNew.success && resNew.data) setNewArrivals(resNew.data.products);
        if (resTrending.success && resTrending.data) setTrending(resTrending.data.products);
        if (resBest.success && resBest.data) setBestSellers(resBest.data.products);
      } catch (err) {
        console.warn('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const featuredCategories = [
    {
      title: 'WOMEN',
      subtitle: 'Sculptural silhouettes & fluid silk',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000',
      href: '/products?category=women'
    },
    {
      title: 'MEN',
      subtitle: 'Virgin wool tailoring & relaxed cuts',
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000',
      href: '/products?category=men'
    },
    {
      title: 'SHOES',
      subtitle: 'Tuscan leather & Margom court sneakers',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000',
      href: '/products?category=shoes'
    },
    {
      title: 'BAGS',
      subtitle: 'The Monolith in palmellato leather',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000',
      href: '/products?category=bags'
    },
    {
      title: 'JEWELLERY',
      subtitle: '18K solid gold & Swiss automatic horology',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000',
      href: '/products?category=jewellery'
    },
    {
      title: 'HOME & OBJECTS',
      subtitle: 'Roman travertine & acoustic audio design',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000',
      href: '/products?category=home'
    }
  ];

  return (
    <div>
      {/* INSTAGRAM-STYLE CATEGORY STORIES BUBBLES */}
      <CategoryStories />

      {/* 1. HERO BANNER SECTION */}
      <HeroSlider />

      {/* 2. SEARCH BAR */}
      <HomeSearchBar />

      <div className="space-y-14 md:space-y-20 mt-10 md:mt-14">
        {/* 3. NEW ARRIVALS CAROUSEL / GRID */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-10 pb-4 border-b border-[#f0ede6]">
            <div>
              <span className="text-[10px] uppercase tracking-luxury text-[#c5a880] block mb-1 font-medium">
                Curated Selection
              </span>
              <h2 className="font-serif-luxury text-3xl md:text-4xl text-[#121212] font-normal">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/products?collection=new-arrivals"
              className="text-xs uppercase tracking-luxury font-medium text-[#121212] hover:text-[#c5a880] flex items-center gap-1.5 transition-colors"
            >
              Explore All New Arrivals <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="aspect-[4/5] bg-gray-100 rounded-none" />
              ))}
            </div>
          ) : (
            <ProductGrid products={newArrivals} columns={4} />
          )}
        </section>

        {/* 4. FEATURED CATEGORIES VISUAL CARDS */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-luxury text-[#c5a880] block mb-2 font-medium">
              Taxonomy
            </span>
            <h2 className="font-serif-luxury text-3xl md:text-4xl text-[#121212] font-normal mb-2">
              The Collections
            </h2>
            <p className="text-xs font-light text-[#575757]">
              Structured by timeless silhouettes, curated for discerning aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map(cat => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group relative h-[380px] overflow-hidden bg-gray-100 rounded-none cursor-pointer"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase tracking-luxury text-[#c5a880] block mb-1 font-medium">
                    Collection
                  </span>
                  <h3 className="font-serif-luxury text-2xl tracking-wide mb-1">{cat.title}</h3>
                  <p className="text-xs font-light text-white/80 line-clamp-1 mb-3">
                    {cat.subtitle}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-luxury text-white underline underline-offset-4 group-hover:text-[#c5a880] transition-colors">
                    Shop Category <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. EDITORIAL FULL-WIDTH BANNER */}
        <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden bg-[#111]">
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2400"
            alt="The Art of Everyday"
            fill
            className="object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div className="max-w-xl text-white">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#c5a880] block mb-3 font-medium">
                PHILOSOPHY OF FORM
              </span>
              <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-normal leading-tight mb-4">
                THE ART OF EVERYDAY
              </h2>
              <p className="text-sm font-light text-[#ededed] leading-relaxed mb-8 max-w-md mx-auto">
                Discover timeless pieces designed for effortless modern elegance. Pure compositions,
                uncompromising materials.
              </p>
              <Link
                href="/collections/premium-edit"
                className="inline-block bg-purple-600 text-white px-8 py-3.5 text-xs uppercase tracking-luxury font-medium hover:bg-purple-700 transition-all duration-300 rounded-none shadow-md cursor-pointer"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </section>

        {/* 6. TRENDING PRODUCTS */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-10 pb-4 border-b border-[#f0ede6]">
            <div>
              <span className="text-[10px] uppercase tracking-luxury text-[#c5a880] block mb-1 font-medium">
                Trending Now
              </span>
              <h2 className="font-serif-luxury text-3xl md:text-4xl text-[#121212] font-normal">
                Most Coveted
              </h2>
            </div>
            <Link
              href="/products?collection=trending"
              className="text-xs uppercase tracking-luxury font-medium text-[#121212] hover:text-[#c5a880] flex items-center gap-1.5 transition-colors"
            >
              View Trending <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="aspect-[4/5] bg-gray-100 rounded-none" />
              ))}
            </div>
          ) : (
            <ProductGrid products={trending} columns={4} />
          )}
        </section>

        {/* 7. PRIVATE SALE PROMOTIONAL BANNER */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-[#faf9f6] border border-[#f0ede6] p-8 md:p-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center rounded-none">
            <div className="md:col-span-7">
              <span className="text-[10px] uppercase tracking-luxury text-[#c5a880] block mb-2 font-medium">
                EXCLUSIVE INVITATION
              </span>
              <h3 className="font-serif-luxury text-3xl md:text-5xl text-[#121212] font-normal mb-4">
                SPECIAL SALE
              </h3>
              <p className="text-sm font-light text-[#575757] leading-relaxed max-w-lg mb-6">
                Selected previous season silhouettes, archival outerwear, and fine lifestyle goods up to
                50% off. Complimentary insured priority dispatch included.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/products?collection=sale"
                  className="bg-purple-600 text-white px-7 py-3 text-xs uppercase tracking-luxury font-medium hover:bg-purple-700 rounded-none shadow-md transition-colors"
                >
                  Shop Sale
                </Link>
                <span className="text-xs text-[#8c8c8c] font-light">
                  Use code <strong className="font-mono text-[#121212]">SALE50</strong> at checkout
                </span>
              </div>
            </div>

            <div className="md:col-span-5 relative aspect-[4/3] overflow-hidden bg-white shadow-2xs rounded-none border border-[#e5e5e5]">
              <Image
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000"
                alt="Special Archive Sale"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* 8. BEST SELLERS */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-12">
          <div className="flex items-end justify-between mb-10 pb-4 border-b border-[#f0ede6]">
            <div>
              <span className="text-[10px] uppercase tracking-luxury text-[#c5a880] block mb-1 font-medium">
                Top Picks
              </span>
              <h2 className="font-serif-luxury text-3xl md:text-4xl text-[#121212] font-normal">
                Best Sellers
              </h2>
            </div>
            <Link
              href="/products?collection=best-sellers"
              className="text-xs uppercase tracking-luxury font-medium text-[#121212] hover:text-[#c5a880] flex items-center gap-1.5 transition-colors"
            >
              Explore Best Sellers <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="aspect-[4/5] bg-gray-100 rounded-none" />
              ))}
            </div>
          ) : (
            <ProductGrid products={bestSellers} columns={4} />
          )}
        </section>
      </div>
    </div>
  );
}
