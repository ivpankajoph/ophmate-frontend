'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { fetchApi } from '../../lib/api';
import { IBrand } from '../../types';

export default function BrandsIndexPage() {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi<IBrand[]>('/brands')
      .then(res => {
        if (res.success && res.data) setBrands(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] block mb-2 font-medium">
          LES MAISONS
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-5xl text-[#121212]">
          Design Houses & Ateliers
        </h1>
        <p className="text-xs text-[#8c8c8c] mt-2 font-light">
          An assembly of world-class ateliers united by material nobility, heritage tailoring, and artistic discipline.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {brands.map(brand => (
          <Link
            key={brand._id}
            href={`/brands/${brand.slug}`}
            className="group block p-8 border border-[#f0ede6] bg-[#faf9f6] hover:bg-white hover:border-[#121212] transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-luxury text-[#c5a880]">
                {brand.originCountry || 'Europe'}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
            </div>

            <h3 className="font-serif-luxury text-2xl text-[#121212] mb-2">{brand.name}</h3>
            <p className="text-xs text-[#575757] font-light leading-relaxed line-clamp-2">
              {brand.description || 'Artisanal atelier dedicated to tailoring and modern luxury design.'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
