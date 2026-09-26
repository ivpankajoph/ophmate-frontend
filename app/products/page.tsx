'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, Grid3X3, Grid2X2, LayoutGrid, ChevronDown } from 'lucide-react';
import { ProductGrid } from '../../components/product/ProductGrid';
import { FilterPanel } from '../../components/product/FilterPanel';
import { fetchApi } from '../../lib/api';
import { IProduct } from '../../types';

function ProductListingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [columns, setColumns] = useState<2 | 3 | 4>(4);

  const categoryParam = searchParams.get('category');
  const collectionParam = searchParams.get('collection');
  const searchParam = searchParams.get('search');
  const sortParam = searchParams.get('sort') || 'featured';

  const categoryTitles: Record<string, string> = {
    women: "WOMEN'S ATELIER & COUTURE",
    men: "MEN'S SARTORIAL & TAILORING",
    electronics: "ELECTRONICS & AUDIO DESIGN",
    beauty: "MAKE-UP, BEAUTY & ELIXIRS",
    shoes: "FOOTWEAR & HANDCRAFTED SHOES",
    bags: "HANDBAGS & LUXURY LEATHER TOTES",
    jewellery: "FINE JEWELLERY & HOROLOGY",
    home: "HOME & ARCHITECTURAL OBJECTS"
  };

  const title = searchParam
    ? `Search Results for "${searchParam}"`
    : collectionParam
    ? `${collectionParam.replace('-', ' ').toUpperCase()}`
    : categoryParam && categoryTitles[categoryParam.toLowerCase()]
    ? categoryTitles[categoryParam.toLowerCase()]
    : categoryParam
    ? `${categoryParam.toUpperCase()}`
    : 'ALL COLLECTIONS';

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const queryStr = searchParams.toString();
        const res = await fetchApi<{
          products: IProduct[];
          pagination: { page: number; limit: number; total: number; totalPages: number };
        }>(`/products?${queryStr}`);

        if (res.success && res.data) {
          setProducts(res.data.products);
          setTotal(res.data.pagination.total);
          setTotalPages(res.data.pagination.totalPages);
          setCurrentPage(res.data.pagination.page);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchParams]);

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/products?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      {/* Top Header & Breadcrumb */}
      <div className="border-b border-[#f0ede6] pb-8 mb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-luxury text-[#8c8c8c] mb-2">
          <span>Home</span>
          <span>/</span>
          <span>Catalog</span>
          {categoryParam && (
            <>
              <span>/</span>
              <span className="text-[#121212] font-medium">{categoryParam}</span>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif-luxury text-3xl md:text-5xl font-normal text-[#121212] leading-tight">
              {title}
            </h1>
            <p className="text-xs text-[#8c8c8c] mt-1.5 font-light">
              Showing {total} pieces handcrafted with artisanal precision
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 border border-[#e5e5e5] px-4 py-2 text-xs uppercase tracking-luxury text-[#121212]"
            >
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>

            {/* Grid Column Selector (Desktop) */}
            <div className="hidden md:flex items-center border border-[#e5e5e5]">
              <button
                onClick={() => setColumns(2)}
                className={`p-2 hover:text-[#121212] transition-colors ${
                  columns === 2 ? 'bg-[#121212] text-white' : 'text-[#8c8c8c]'
                }`}
                title="2 Columns"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setColumns(3)}
                className={`p-2 hover:text-[#121212] transition-colors ${
                  columns === 3 ? 'bg-[#121212] text-white' : 'text-[#8c8c8c]'
                }`}
                title="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setColumns(4)}
                className={`p-2 hover:text-[#121212] transition-colors ${
                  columns === 4 ? 'bg-[#121212] text-white' : 'text-[#8c8c8c]'
                }`}
                title="4 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Selector */}
            <div className="relative">
              <select
                value={sortParam}
                onChange={e => handleSortChange(e.target.value)}
                className="appearance-none bg-transparent border border-[#e5e5e5] px-4 py-2 pr-8 text-xs uppercase tracking-luxury text-[#121212] focus:outline-none cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="newest">Sort: Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="best_selling">Best Selling</option>
                <option value="discount">Highest Discount</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#575757]" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="flex gap-12 items-start">
        {/* Desktop Filter Panel */}
        <FilterPanel
          isOpenMobile={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />

        {/* Products Grid Column */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                <div key={n} className="aspect-[4/5] bg-gray-100" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-24 text-center">
              <h3 className="font-serif-luxury text-2xl text-[#121212] mb-2">
                NO PIECES MATCH YOUR CRITERIA
              </h3>
              <p className="text-xs text-[#8c8c8c] font-light max-w-sm mx-auto mb-6">
                Try loosening your filters or resetting your parameters to explore our broader archive.
              </p>
              <button
                onClick={() => router.push('/products')}
                className="border border-[#121212] text-xs uppercase tracking-luxury px-6 py-2.5 hover:bg-[#121212] hover:text-white transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <ProductGrid products={products} columns={columns} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 pt-8 border-t border-[#f0ede6] flex justify-center items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`w-9 h-9 text-xs flex items-center justify-center transition-all ${
                        currentPage === p
                          ? 'border border-[#121212] bg-[#121212] text-white font-medium'
                          : 'border border-[#e5e5e5] text-[#575757] hover:border-black'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductListingPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-6 py-20 text-center text-xs uppercase tracking-luxury text-[#8c8c8c]">
          Loading Haute Édition Collection...
        </div>
      }
    >
      <ProductListingContent />
    </Suspense>
  );
}
