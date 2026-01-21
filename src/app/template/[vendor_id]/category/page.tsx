"use client"
import React, { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Grid3x3, List, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '@/config/variables';


export default function ShopCategoriesPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = useSelector((state: any) => state?.alltemplatepage?.products || []);
  const params = useParams();
  const vendor_id = params.vendor_id as string;
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${NEXT_PUBLIC_API_URL}/categories/getall`);
        const list = res.data?.data || [];
        const map = list.reduce((acc: Record<string, string>, item: any) => {
          if (item?._id && item?.name) acc[item._id] = item.name;
          return acc;
        }, {});
        setCategoryMap(map);
      } catch {
        setCategoryMap({});
      }
    };

    load();
  }, []);

  const categories = useMemo(() => {
    const map = new Map<
      string,
      { id: string; name: string; count: number; image?: string }
    >();

    const normalize = (value: unknown) =>
      typeof value === 'string' ? value.trim() : '';

    products.forEach((product: any) => {
      const categoryObject =
        typeof product?.productCategory === 'string'
          ? undefined
          : product?.productCategory;

      const rawId =
        categoryObject?._id ||
        (typeof product?.productCategory === 'string'
          ? product.productCategory
          : '') ||
        product?.productCategoryName ||
        categoryObject?.name ||
        categoryObject?.title ||
        categoryObject?.categoryName;

      const label =
        normalize(product?.productCategoryName) ||
        normalize(categoryObject?.name) ||
        normalize(categoryObject?.title) ||
        normalize(categoryObject?.categoryName) ||
        normalize(
          typeof product?.productCategory === 'string'
            ? product.productCategory
            : ''
        ) ||
        (rawId ? categoryMap[rawId] : '') ||
        '';

      const id = normalize(rawId) || label;
      if (!id) return;

      const image = product?.defaultImages?.[0]?.url || product?.images?.[0];
      const existing = map.get(id);
      if (existing) {
        existing.count += 1;
        if (!existing.image && image) existing.image = image;
      } else {
        map.set(id, {
          id,
          name: label || 'Category',
          count: 1,
          image,
        });
      }
    });

    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [products, categoryMap]);

  const toCategorySlug = (value: string) =>
    encodeURIComponent(value.toLowerCase().replace(/\s+/g, '-'));

  return (
   <>

    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(color-mix(in srgb, var(--template-banner-color) 60%, transparent), color-mix(in srgb, var(--template-banner-color) 60%, transparent)), url('https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=1920&q=80')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">Shop</h1>
            <p className="text-xl lg:text-2xl">Discover Our Beautiful Collection</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              {/* Search */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3">
                  Search Products
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg template-focus-accent"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
                  <SlidersHorizontal size={20} />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? 'template-accent-soft template-accent font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-sm">({cat.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="text-gray-900 font-semibold mb-3">
                  Price Range
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded template-accent-input" />
                    <span className="text-gray-600">Under $50</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded template-accent-input" />
                    <span className="text-gray-600">$50 - $100</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded template-accent-input" />
                    <span className="text-gray-600">$100 - $150</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded template-accent-input" />
                    <span className="text-gray-600">Over $150</span>
                  </label>
                </div>
              </div>

              {/* Filter Button */}
              <button className="w-full text-white py-3 rounded-lg font-semibold transition-colors template-accent-bg template-accent-bg-hover">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-gray-600">
                Showing <span className="font-semibold">{categories.length}</span> categories
              </div>
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 cursor-pointer template-focus-accent"
                  >
                    <option value="default">Default sorting</option>
                    <option value="name">Name: A to Z</option>
                    <option value="count">Most Products</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={18} />
                </div>

                {/* View Mode Toggle */}
                <div className="flex gap-2 border border-gray-300 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${
                      viewMode === 'grid' ? 'text-white template-accent-bg' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Grid3x3 size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${
                      viewMode === 'list' ? 'text-white template-accent-bg' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Cards */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
              {categories.map((category) => {
                const isObjectId = /^[a-f\d]{24}$/i.test(category.id);
                const categoryPath = isObjectId
                  ? category.id
                  : toCategorySlug(category.name);
                return (
                  <Link
                    key={category.id}
                    href={`/template/${vendor_id}/category/${categoryPath}`}
                  >
                    <div
                      className={`relative bg-white rounded-lg shadow-sm overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden bg-gray-100 ${
                          viewMode === 'list' ? 'w-48' : 'h-56'
                        }`}
                        style={{
                          backgroundImage: `url(${category.image || 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=800&q=80'})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all"></div>
                      </div>

                      <div className={`p-4 text-center ${viewMode === 'list' ? 'flex-1 flex flex-col justify-center' : ''}`}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 template-accent-group">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-500">{category.count} Products</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 text-white w-12 h-12 rounded-md shadow-lg flex items-center justify-center transition-all transform hover:scale-105 z-50 template-accent-bg template-accent-bg-hover"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div></>
  );
}
