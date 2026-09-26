'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight } from 'lucide-react';
import { fetchApi } from '../../lib/api';
import { IProduct, ICategory, IBrand } from '../../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    products: IProduct[];
    categories: ICategory[];
    brands: IBrand[];
    suggestedProducts?: IProduct[];
    trendingSearches?: string[];
  }>({
    products: [],
    categories: [],
    brands: [],
    suggestedProducts: [],
    trendingSearches: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      loadInitialSuggestions();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const loadInitialSuggestions = async () => {
    try {
      const res = await fetchApi('/products/search/overlay');
      if (res.success && res.data) {
        setResults({
          products: [],
          categories: res.data.categories || [],
          brands: res.data.brands || [],
          suggestedProducts: res.data.suggestedProducts || [],
          trendingSearches: res.data.trendingSearches || []
        });
      }
    } catch (err) {
      console.error('Failed to load initial search data:', err);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      loadInitialSuggestions();
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetchApi(`/products/search/overlay?q=${encodeURIComponent(query.trim())}`);
        if (res.success && res.data) {
          setResults(prev => ({
            ...prev,
            products: res.data.products || [],
            categories: res.data.categories || [],
            brands: res.data.brands || []
          }));
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      {/* Search Header */}
      <div className="border-b border-[#e5e5e5] px-6 py-6 md:px-12 flex items-center justify-between">
        <div className="flex-1 max-w-4xl mx-auto flex items-center gap-4">
          <Search className="w-5 h-5 text-[#8c8c8c]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products, brands, materials, collections..."
            className="w-full text-lg md:text-2xl font-light text-[#121212] placeholder-[#a0a0a0] focus:outline-none bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-[#8c8c8c] hover:text-[#121212]">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          className="ml-4 p-2 text-[#575757] hover:text-[#121212] transition-colors"
          aria-label="Close search"
        >
          <X className="w-6 h-6 stroke-[1.5]" />
        </button>
      </div>

      {/* Search Body */}
      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 max-w-7xl mx-auto w-full">
        {query.trim().length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Trending Searches */}
            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-luxury text-[#8c8c8c] block mb-4 font-medium">
                Trending Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {results.trendingSearches?.map(item => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="text-xs border border-[#e5e5e5] px-3.5 py-1.5 hover:border-[#121212] hover:bg-[#121212] hover:text-white transition-all text-[#121212]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Curated Suggested Products */}
            <div className="md:col-span-8">
              <span className="text-xs uppercase tracking-luxury text-[#8c8c8c] block mb-4 font-medium">
                Trending In The Collection
              </span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {results.suggestedProducts?.slice(0, 3).map(prod => (
                  <Link
                    key={prod._id}
                    href={`/products/${prod.slug}`}
                    onClick={onClose}
                    className="group block"
                  >
                    <div className="relative aspect-[3/4] bg-[#f5f4f0] overflow-hidden mb-2">
                      {prod.images?.[0]?.secure_url && (
                        <Image
                          src={prod.images[0].secure_url}
                          alt={prod.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <p className="text-xs uppercase tracking-luxury text-[#8c8c8c]">
                      {typeof prod.brand === 'object' ? prod.brand.name : 'OPHMNART'}
                    </p>
                    <h4 className="text-xs font-medium text-[#121212] truncate">{prod.name}</h4>
                    <p className="text-xs font-light text-[#121212] mt-0.5">
                      ₹{prod.price.toLocaleString()}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {isLoading ? (
              <div className="py-16 text-center text-xs tracking-luxury uppercase text-[#8c8c8c]">
                Searching the archive...
              </div>
            ) : results.products.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-sm font-light text-[#575757] mb-3">
                  No products matched &ldquo;{query}&rdquo;
                </p>
                <Link
                  href="/products"
                  onClick={onClose}
                  className="text-xs uppercase tracking-luxury text-[#121212] border-b border-[#121212] pb-0.5"
                >
                  Browse all new arrivals
                </Link>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs uppercase tracking-luxury text-[#8c8c8c]">
                    Found {results.products.length} products
                  </span>
                  <Link
                    href={`/products?search=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="text-xs uppercase tracking-luxury font-medium text-[#121212] flex items-center gap-1 hover:text-[#c5a880]"
                  >
                    View all matching results <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {results.products.map(prod => (
                    <Link
                      key={prod._id}
                      href={`/products/${prod.slug}`}
                      onClick={onClose}
                      className="group block"
                    >
                      <div className="relative aspect-[3/4] bg-[#f5f4f0] overflow-hidden mb-2">
                        {prod.images?.[0]?.secure_url && (
                          <Image
                            src={prod.images[0].secure_url}
                            alt={prod.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      </div>
                      <p className="text-[10px] uppercase tracking-luxury text-[#8c8c8c]">
                        {typeof prod.brand === 'object' ? prod.brand.name : 'OPHMNART'}
                      </p>
                      <h4 className="text-xs font-medium text-[#121212] truncate">{prod.name}</h4>
                      <p className="text-xs font-light text-[#121212] mt-0.5">
                        ₹{prod.price.toLocaleString()}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
