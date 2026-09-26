'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ProductGrid } from '../../../components/product/ProductGrid';
import { fetchApi } from '../../../lib/api';
import { IProduct } from '../../../types';

export default function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const title = resolvedParams.slug.replace('-', ' ').toUpperCase();

  useEffect(() => {
    fetchApi<{ products: IProduct[] }>(`/products?collection=${resolvedParams.slug}`)
      .then(res => {
        if (res.success && res.data) setProducts(res.data.products);
      })
      .finally(() => setLoading(false));
  }, [resolvedParams.slug]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="border-b border-[#f0ede6] pb-8 mb-10 text-center max-w-2xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] block mb-2 font-medium">
          CURATED ARCHIVE CAPSULE
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-5xl text-[#121212] mb-3">
          {title}
        </h1>
        <p className="text-xs text-[#8c8c8c] font-light leading-relaxed">
          Pieces selected for their architectural silhouette, exceptional material grade, and timeless enduring character.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="aspect-[4/5] bg-gray-100" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center text-xs text-[#8c8c8c]">
          No pieces currently cataloged under this capsule.
        </div>
      ) : (
        <ProductGrid products={products} columns={4} />
      )}
    </div>
  );
}
