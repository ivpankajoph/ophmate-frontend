'use client';

import React, { useEffect, useState, use } from 'react';
import { ProductGrid } from '../../../components/product/ProductGrid';
import { fetchApi } from '../../../lib/api';
import { IBrand, IProduct } from '../../../types';

export default function BrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [brandData, setBrandData] = useState<{ brand: IBrand; products: IProduct[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi<{ brand: IBrand; products: IProduct[] }>(`/brands/${resolvedParams.slug}`)
      .then(res => {
        if (res.success && res.data) setBrandData(res.data);
      })
      .finally(() => setLoading(false));
  }, [resolvedParams.slug]);

  if (loading) {
    return <div className="py-24 text-center text-xs text-[#8c8c8c]">Accessing Maison Atelier...</div>;
  }

  if (!brandData) {
    return <div className="py-24 text-center text-xs text-[#8c8c8c]">Maison not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-12">
      <div className="max-w-2xl mx-auto text-center border-b border-[#f0ede6] pb-8">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] block mb-2 font-medium">
          MAISON DOSSIER · {brandData.brand.originCountry?.toUpperCase()}
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-5xl text-[#121212] mb-3">
          {brandData.brand.name}
        </h1>
        <p className="text-xs text-[#575757] font-light leading-relaxed">
          {brandData.brand.description}
        </p>
      </div>

      <div>
        <h3 className="text-xs uppercase tracking-luxury font-medium text-[#121212] mb-6">
          Creations by {brandData.brand.name} ({brandData.products?.length || 0})
        </h3>
        {brandData.products?.length > 0 ? (
          <ProductGrid products={brandData.products} columns={4} />
        ) : (
          <p className="text-xs text-[#8c8c8c]">No current creations listed for this maison.</p>
        )}
      </div>
    </div>
  );
}
