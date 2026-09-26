'use client';

import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from '../ui/QuickViewModal';
import { IProduct } from '../../types';

interface ProductGridProps {
  products: IProduct[];
  columns?: 2 | 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, columns = 4 }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<IProduct | null>(null);

  const colClasses = {
    2: 'grid-cols-2 md:grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  }[columns];

  return (
    <>
      <div className={`grid ${colClasses} gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12`}>
        {products.map(product => (
          <ProductCard
            key={product._id}
            product={product}
            onQuickView={prod => setQuickViewProduct(prod)}
          />
        ))}
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
};
