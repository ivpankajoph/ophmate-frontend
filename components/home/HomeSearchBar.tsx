'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Camera,
  FileText,
  Sparkles,
  X,
  ArrowRight,
  Loader2,
  ChevronRight,
  Image as ImageIcon
} from 'lucide-react';
import { fetchApi } from '../../lib/api';
import { IProduct, ICategory } from '../../types';

type SearchTab = 'ai' | 'products' | 'categories' | 'ateliers';

export const HomeSearchBar: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SearchTab>('products');
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allCategories, setAllCategories] = useState<ICategory[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<IProduct[]>([]);
  const [trendingSearches, setTrendingSearches] = useState<string[]>([
    'Tailored Blazer',
    'Silk Dress',
    'Calfskin Bag',
    'Chronograph Watch',
    'Cashmere Coat',
    'Fine Jewellery'
  ]);

  const [searchResults, setSearchResults] = useState<{
    products: IProduct[];
    categories: ICategory[];
  }>({
    products: [],
    categories: []
  });

  const [imageSearchActive, setImageSearchActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load initial categories & suggested products from database
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [catRes, overlayRes] = await Promise.all([
          fetchApi('/categories'),
          fetchApi('/products/search/overlay')
        ]);

        if (catRes.success && catRes.data) {
          setAllCategories(catRes.data);
        }

        if (overlayRes.success && overlayRes.data) {
          if (overlayRes.data.suggestedProducts?.length) {
            setSuggestedProducts(overlayRes.data.suggestedProducts);
          }
          if (overlayRes.data.trendingSearches?.length) {
            setTrendingSearches(overlayRes.data.trendingSearches);
          }
        }
      } catch (err) {
        console.warn('Failed to load initial search data:', err);
      }
    };

    loadInitialData();
  }, []);

  // Debounced search when user types
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults({ products: [], categories: [] });
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetchApi(`/products/search/overlay?q=${encodeURIComponent(query.trim())}`);
        if (res.success && res.data) {
          setSearchResults({
            products: res.data.products || [],
            categories: res.data.categories || []
          });
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    router.push(`/products?search=${encodeURIComponent(query.trim())}`);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setImageSearchActive(true);
        setIsOpen(true);
        const fileName = file.name.toLowerCase();
        let detected = 'Luxury Collection';
        if (fileName.includes('dress') || fileName.includes('women')) detected = 'Dress';
        else if (fileName.includes('suit') || fileName.includes('blazer')) detected = 'Blazer';
        else if (fileName.includes('bag') || fileName.includes('purse')) detected = 'Bag';
        else if (fileName.includes('shoe')) detected = 'Shoes';
        else if (fileName.includes('watch')) detected = 'Watch';
        setQuery(detected);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImageSearch = () => {
    setImagePreview(null);
    setImageSearchActive(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setQuery('');
  };

  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 my-6 md:my-10 z-30">
      <div ref={containerRef} className="relative w-full">
        {/* TOP MODE TABS */}
        <div className="flex items-center justify-center gap-2 sm:gap-6 mb-3 select-none flex-wrap">
          {/* AI Mode Tab */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('ai');
              inputRef.current?.focus();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-[13px] uppercase tracking-luxury font-medium rounded-none border transition-all cursor-pointer ${
              activeTab === 'ai'
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-white text-[#121212] border-[#e5e5e5] hover:border-purple-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-current" />
            <span>AI Mode</span>
            <span className="text-[9px] bg-purple-200 text-purple-900 px-1.5 py-0.5 rounded-none font-mono font-bold uppercase">
              Pro
            </span>
          </button>

          <span className="text-[#e5e5e5] font-light hidden sm:inline">|</span>

          {/* Products Tab */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('products');
              inputRef.current?.focus();
            }}
            className={`relative px-3 py-1.5 text-xs sm:text-[13px] uppercase tracking-luxury font-medium transition-colors cursor-pointer rounded-none ${
              activeTab === 'products'
                ? 'text-purple-600 font-semibold'
                : 'text-[#8c8c8c] hover:text-purple-600'
            }`}
          >
            <span>Products</span>
            {activeTab === 'products' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-600" />
            )}
          </button>

          {/* Categories Tab */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('categories');
              inputRef.current?.focus();
            }}
            className={`relative px-3 py-1.5 text-xs sm:text-[13px] uppercase tracking-luxury font-medium transition-colors cursor-pointer rounded-none ${
              activeTab === 'categories'
                ? 'text-purple-600 font-semibold'
                : 'text-[#8c8c8c] hover:text-purple-600'
            }`}
          >
            <span>Categories</span>
            {activeTab === 'categories' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-600" />
            )}
          </button>

          {/* Ateliers & Brands Tab */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('ateliers');
              inputRef.current?.focus();
            }}
            className={`relative px-3 py-1.5 text-xs sm:text-[13px] uppercase tracking-luxury font-medium transition-colors cursor-pointer rounded-none ${
              activeTab === 'ateliers'
                ? 'text-purple-600 font-semibold'
                : 'text-[#8c8c8c] hover:text-purple-600'
            }`}
          >
            <span>Ateliers & Brands</span>
            {activeTab === 'ateliers' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-600" />
            )}
          </button>
        </div>

        {/* MAIN LARGE SEARCH BAR CONTAINER - SHARP LUXURY RECTANGLE (INCREASED HEIGHT) */}
        <form
          onSubmit={handleSearchSubmit}
          className={`relative bg-white rounded-none border-2 transition-all duration-200 p-5 sm:p-7 md:p-8 min-h-[150px] sm:min-h-[175px] flex flex-col justify-between shadow-md ${
            isOpen && query.trim()
              ? 'border-purple-600 ring-2 ring-purple-600/20'
              : 'border-[#121212] hover:border-purple-600'
          }`}
        >
          {/* Upper Row: Input Field with Clear & Indicator (Taller & Roomier) */}
          <div className="flex items-center gap-3.5 sm:gap-4 px-1 sm:px-2 min-h-[50px] sm:min-h-[62px]">
            {activeTab === 'ai' ? (
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#c5a880] flex-shrink-0 animate-pulse" />
            ) : (
              <Search className="w-6 h-6 sm:w-7 sm:h-7 text-[#121212] flex-shrink-0 stroke-[1.6]" />
            )}

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                const val = e.target.value;
                setQuery(val);
                setIsOpen(val.trim().length > 0);
              }}
              onFocus={() => {
                if (query.trim().length > 0) {
                  setIsOpen(true);
                }
              }}
              placeholder={
                activeTab === 'ai'
                  ? 'Ask AI Stylist: "Recommend a silk evening dress with fine jewellery..."'
                  : 'Search products, categories, tailoring, silk, horology...'
              }
              className="w-full text-base sm:text-lg md:text-xl text-[#121212] placeholder:text-[#8c8c8c] font-light outline-none bg-transparent py-2"
            />

            {isLoading && (
              <Loader2 className="w-5 h-5 text-[#121212] animate-spin flex-shrink-0" />
            )}

            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setImagePreview(null);
                  setImageSearchActive(false);
                  setIsOpen(false);
                  inputRef.current?.focus();
                }}
                className="w-8 h-8 rounded-none hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-black transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Visual Search Badge preview if user uploaded an image */}
          {imageSearchActive && imagePreview && (
            <div className="flex items-center gap-2 my-2 mx-2 bg-[#faf9f6] border border-[#e5e5e5] px-3.5 py-2 rounded-none w-fit">
              <div className="relative w-8 h-8 rounded-none overflow-hidden flex-shrink-0 border border-[#121212]">
                <Image src={imagePreview} alt="Image search preview" fill className="object-cover" />
              </div>
              <span className="text-xs sm:text-sm text-[#121212] font-medium">Image Search: Searching matches</span>
              <button
                type="button"
                onClick={clearImageSearch}
                className="text-[#8c8c8c] hover:text-black ml-1 text-xs cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Lower Actions Row: Tools on Left & Large Purple Search Button on Right */}
          <div className="flex items-center justify-between pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-[#e5e5e5]">
            {/* Left Actions */}
            <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#575757]">
              {/* Image Search Trigger */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
                id="home-image-search-input"
              />
              <label
                htmlFor="home-image-search-input"
                className="flex items-center gap-2 text-[#575757] hover:text-[#121212] font-medium cursor-pointer transition-colors px-2 py-1.5 rounded-none hover:bg-gray-50"
              >
                <Camera className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#121212]" />
                <span className="uppercase tracking-luxury text-xs sm:text-[12px] font-semibold">Image Search</span>
              </label>

              <span className="text-[#e5e5e5]">|</span>

              {/* Search with File / Categories Quick Trigger */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('categories');
                  inputRef.current?.focus();
                }}
                className="flex items-center gap-2 text-[#575757] hover:text-[#121212] font-medium cursor-pointer transition-colors px-2 py-1.5 rounded-none hover:bg-gray-50"
              >
                <FileText className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#121212]" />
                <span className="uppercase tracking-luxury text-xs sm:text-[12px] font-semibold">Categories</span>
              </button>
            </div>

            {/* Right: Sharp Prominent Purple Search Button */}
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs sm:text-sm uppercase tracking-luxury px-8 sm:px-12 py-3.5 sm:py-4 rounded-none flex items-center gap-2.5 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-98"
            >
              <Search className="w-4 h-4 stroke-[2.2]" />
              <span>Search</span>
            </button>
          </div>
        </form>

        {/* LIVE SEARCH RESULTS DROPDOWN WITH DATABASE PRODUCTS & CATEGORIES */}
        {isOpen && query.trim().length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-none border border-[#121212] shadow-xl overflow-hidden z-50 animate-in fade-in duration-150">
            <div className="max-h-[500px] overflow-y-auto divide-y divide-[#f0ede6]">
              {/* 1. MATCHING CATEGORIES FROM DATABASE */}
              {searchResults.categories.length > 0 && (
                <div className="p-4 bg-[#faf9f6]">
                  <span className="text-[10px] uppercase tracking-luxury font-medium text-[#8c8c8c] block mb-2.5">
                    Matching Categories ({searchResults.categories.length})
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {searchResults.categories.map((cat) => (
                      <Link
                        key={cat._id}
                        href={`/products?category=${cat.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2.5 p-2 bg-white rounded-none border border-[#e5e5e5] hover:border-[#121212] transition-colors group"
                      >
                        <div className="relative w-10 h-10 rounded-none overflow-hidden bg-[#f4f3ee] flex-shrink-0">
                          {cat.image?.secure_url ? (
                            <Image
                              src={cat.image.secure_url}
                              alt={cat.name}
                              fill
                              sizes="40px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-medium text-[#121212] group-hover:text-[#c5a880] truncate block">
                            {cat.name}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider text-[#8c8c8c]">Explore →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. MATCHING PRODUCTS FROM DATABASE */}
              <div className="p-4 sm:p-5">
                <span className="text-[10px] uppercase tracking-luxury font-medium text-[#8c8c8c] block mb-3">
                  Matching Products ({searchResults.products.length})
                </span>

                {isLoading ? (
                  <div className="flex items-center justify-center py-10 gap-2 text-[#121212]">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-xs font-light">Searching catalog...</span>
                  </div>
                ) : searchResults.products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {searchResults.products.slice(0, 6).map((prod) => (
                      <Link
                        key={prod._id}
                        href={`/products/${prod.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-none border border-[#e5e5e5] hover:border-[#121212] hover:bg-[#faf9f6] transition-all group"
                      >
                        {/* Product Image from DB */}
                        <div className="relative w-14 h-16 rounded-none overflow-hidden bg-gray-100 flex-shrink-0 border border-[#e5e5e5]">
                          {prod.images?.[0]?.secure_url ? (
                            <Image
                              src={prod.images[0].secure_url}
                              alt={prod.name}
                              fill
                              sizes="56px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <ImageIcon className="w-6 h-6" />
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] uppercase tracking-luxury text-[#c5a880] block font-medium">
                            {prod.brand?.name || 'OPHMNART'}
                          </span>
                          <h4 className="text-xs font-normal text-[#121212] truncate group-hover:text-[#c5a880]">
                            {prod.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-medium text-[#121212]">
                              ₹{prod.price.toLocaleString('en-IN')}
                            </span>
                            {prod.compareAtPrice && prod.compareAtPrice > prod.price && (
                              <span className="text-[10px] text-gray-400 line-through">
                                ₹{prod.compareAtPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#121212] transition-colors flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-xs text-[#8c8c8c] mb-2 font-light">
                      No direct matches found for &quot;{query}&quot;.
                    </p>
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="text-xs uppercase tracking-luxury text-[#121212] underline hover:text-[#c5a880] cursor-pointer"
                    >
                      Search entire archive for &quot;{query}&quot; →
                    </button>
                  </div>
                )}
              </div>

              {/* Footer to View All Results */}
              <div className="p-3 bg-[#faf9f6] flex items-center justify-between px-5 border-t border-[#f0ede6]">
                <span className="text-xs text-[#8c8c8c] font-light">
                  Showing top results for <strong className="text-[#121212] font-medium">&quot;{query}&quot;</strong>
                </span>
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="text-xs uppercase tracking-luxury font-medium text-[#121212] hover:text-[#c5a880] flex items-center gap-1 cursor-pointer"
                >
                  <span>View all matching products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
