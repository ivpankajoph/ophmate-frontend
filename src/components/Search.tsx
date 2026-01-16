'use client';

import React, { useState, useEffect } from 'react';
import { Search, Image, Sparkles, TrendingUp, Package, Zap, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

type TabType = 'category' | 'subcategory' | 'wholesale' | 'retail';

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  subcategories?: Subcategory[];
}

interface ApiResponse {
  success: boolean;
  data: Category[];
}

export default function EcommerceSearchUI() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('category');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiSearchEnabled, setAiSearchEnabled] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/categories/get-category');
      const result: ApiResponse = await response.json();
      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/categories/${categoryId}`);
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    router.push(`/sub-categories/${subcategoryId}`);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery, {
      tab: activeTab,
      aiEnabled: aiSearchEnabled
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Navigation */}
        <nav className="flex items-center justify-center gap-8 mb-8">
          <button className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-orange-600 transition-colors font-medium">
            <Sparkles className="w-5 h-5" />
            AI Mode
          </button>
          <button className="px-6 py-3 text-orange-600 font-semibold border-b-3 border-orange-600">
            Products
          </button>
          <button className="px-6 py-3 text-gray-700 hover:text-orange-600 transition-colors font-medium">
            Manufacturers
          </button>
          <button className="px-6 py-3 text-gray-700 hover:text-orange-600 transition-colors font-medium">
            Worldwide
          </button>
        </nav>

        {/* Categories Horizontal Scrollable Bar */}
        <div className="mb-32 bg-white rounded-2xl shadow-lg p-6 relative">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Browse Categories</h2>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <>
              <div className="relative" 
                onMouseEnter={() => setIsScrolling(false)}
                onMouseLeave={() => setIsScrolling(true)}
              >
                <div className="overflow-x-auto scrollbar-visible pb-4" id="categories-scroll">
                  <div className={`flex gap-4 ${isScrolling ? 'animate-scroll-seamless' : ''}`}>
                    {[...categories, ...categories, ...categories].map((category, index) => (
                      <div
                        key={`${category._id}-${index}`}
                        className="flex-shrink-0 relative"
                        onMouseEnter={() => setHoveredCategory(category._id)}
                        onMouseLeave={() => setHoveredCategory(null)}
                      >
                        <button
                          onClick={() => handleCategoryClick(category._id)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all min-w-[140px] ${
                            hoveredCategory === category._id
                              ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl scale-105'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-md">
                            <img
                              src={category.image_url || '/placeholder.png'}
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-semibold text-sm text-center">{category.name}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subcategories Dropdown - Appears below category bar */}
              {hoveredCategory && (
                <div 
                  className="absolute left-0 right-0 top-full -mt-12 bg-white rounded-xl shadow-2xl border-2 border-orange-300 z-[100] animate-fadeIn mx-6"
                  onMouseEnter={() => setHoveredCategory(hoveredCategory)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
                      <span>{categories.find(c => c._id === hoveredCategory)?.name} - Subcategories</span>
                      <ChevronRight className="w-5 h-5 text-orange-500" />
                    </h3>
                    
                    <div className="max-h-80 overflow-y-auto scrollbar-thin">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {categories
                          .find(c => c._id === hoveredCategory)
                          ?.subcategories?.map((sub) => (
                            <button
                              key={sub._id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSubcategoryClick(sub._id);
                              }}
                              className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-orange-100 hover:shadow-md transition-all group"
                            >
                              {sub.image_url && (
                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                                  <img
                                    src={sub.image_url}
                                    alt={sub.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                  />
                                </div>
                              )}
                              <div className="text-center">
                                <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 block">
                                  {sub.name}
                                </span>
                                {sub.description && (
                                  <span className="text-xs text-gray-500 line-clamp-2 mt-1">
                                    {sub.description}
                                  </span>
                                )}
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
   <h1 className='text-4xl flex justify-center mb-10'>Search Anything you want............</h1>
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-orange-400 overflow-hidden">

          <div className="p-8">
         
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Search ${activeTab === 'wholesale' ? 'wholesale' : activeTab === 'retail' ? 'retail' : ''} products...`}
                  className="w-full px-6 py-4 pr-32 text-lg border-2 border-gray-300 rounded-2xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-orange-600 transition-colors">
                  <Image className="w-6 h-6" />
                </button>
              </div>
              <button
                onClick={handleSearch}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>

            {/* AI Search Toggle & Features */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="flex items-center gap-2 text-orange-600 font-semibold">
                    <Sparkles className="w-5 h-5" />
                    <span>AI Smart Search</span>
                  </div>
                  <div
                    onClick={() => setAiSearchEnabled(!aiSearchEnabled)}
                    className={`relative w-14 h-7 rounded-full transition-all ${
                      aiSearchEnabled ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        aiSearchEnabled ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    />
                  </div>
                  <span className="text-sm text-gray-500">Free</span>
                </label>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <span>Top Ranking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-orange-500" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-500" />
                  <span>Quick Quote</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-lg">
            Welcome to <span className="font-semibold text-orange-600">ShopHub</span>, Your Premium E-Commerce Platform
          </p>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-visible::-webkit-scrollbar {
          height: 8px;
        }
        .scrollbar-visible::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-visible::-webkit-scrollbar-thumb {
          background: #fb923c;
          border-radius: 10px;
        }
        .scrollbar-visible::-webkit-scrollbar-thumb:hover {
          background: #f97316;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #fb923c;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #f97316;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes scroll-seamless {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        .animate-scroll-seamless {
          animation: scroll-seamless 40s linear infinite;
          width: max-content;
        }
      `}</style>
    </div>
  );
}