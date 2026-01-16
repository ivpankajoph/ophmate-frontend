// pages/products.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';


const ProductsMainPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace with your actual token storage method
        const token = localStorage.getItem('authToken') || '';
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Featured Products
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => {
            // Get first variant for preview
            const firstVariant = product.variants[0];
            const imageUrl = firstVariant.variantsImageUrls[0]?.url.trim() || '/placeholder.jpg';
            
            return (
              <Link 
                key={product._id} 
                href={`/product/${product.productCategory}/${product._id}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-[500px]">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={imageUrl}
                      alt={firstVariant.variantMetaTitle}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {product.productName}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
                      </div>
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {firstVariant?.variantAttributes?.color}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex items-baseline">
                      <span className="text-2xl font-bold text-gray-900">₹{firstVariant.finalPrice.toLocaleString()}</span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ₹{firstVariant.actualPrice.toLocaleString()}
                      </span>
                      <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                        {firstVariant.discountPercent}% off
                      </span>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <span className={`text-sm font-medium ${
                        firstVariant.stockQuantity > 5 ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {firstVariant.stockQuantity > 0 ? `${firstVariant.stockQuantity} in stock` : 'Out of stock'}
                      </span>
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center">
                        View Details
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductsMainPage;