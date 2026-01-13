// app/categories/[slug]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Search,
  Heart,
} from "lucide-react";

// Define static category data
const STATIC_CATEGORIES: Record<string, { name: string; description: string; image_url: string }> = {
  electronics: {
    name: "Electronics",
    description: "Cutting-edge gadgets, smartphones, laptops, and smart home devices for the modern lifestyle.",
    image_url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  fashion: {
    name: "Fashion",
    description: "Trendy clothing, footwear, and accessories for men, women, and kids.",
    image_url: "https://images.unsplash.com/photo-1523381214153-c761a8d7a2e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  home: {
    name: "Home & Living",
    description: "Elegant furniture, decor, kitchenware, and essentials to transform your space.",
    image_url: "https://images.unsplash.com/photo-1616469829474-531b9f34d55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
};

// Static products per category (for demo)
const STATIC_PRODUCTS: Record<string, Array<{
  _id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
}>> = {
  electronics: [
    {
      _id: "1",
      name: "Wireless Noise-Canceling Headphones",
      description: "Premium sound quality with 30-hour battery life.",
      price: 199,
      image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stock: 15,
    },
    {
      _id: "2",
      name: "Smart 4K Ultra HD TV",
      description: "65-inch display with HDR and voice control.",
      price: 899,
      image_url: "https://images.unsplash.com/photo-1593784991095-a20514f84978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stock: 5,
    },
  ],
  fashion: [
    {
      _id: "3",
      name: "Designer Leather Jacket",
      description: "Genuine leather with modern fit and premium finish.",
      price: 249,
      image_url: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stock: 8,
    },
  ],
  home: [
    {
      _id: "4",
      name: "Minimalist Coffee Table",
      description: "Solid wood design with hidden storage compartment.",
      price: 349,
      image_url: "https://images.unsplash.com/photo-1555041832-263109571380?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stock: 3,
    },
    {
      _id: "5",
      name: "Ceramic Dinner Set (12 pcs)",
      description: "Elegant, dishwasher-safe tableware for everyday use.",
      price: 89,
      image_url: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stock: 0, // Out of stock
    },
  ],
};

// Default fallback for unknown slugs
const DEFAULT_CATEGORY = {
  name: "Category Not Found",
  description: "The requested category does not exist.",
  image_url: "https://images.unsplash.com/photo-1505784603745-7c2c4f3a1b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
};

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = (params.slug as string)?.toLowerCase();

  // Get static data based on slug
  const category = STATIC_CATEGORIES[slug] || DEFAULT_CATEGORY;
  const products = STATIC_PRODUCTS[slug] || [];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Back to All Categories
        </Link>

        {/* Category Header */}
        <div
          className="rounded-2xl h-64 mb-10 flex items-center justify-center"
          style={{
            backgroundImage: `url(${category.image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/60 text-white p-6 rounded-xl text-center max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
            <p className="text-lg">{category.description}</p>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products in this category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  {product.stock === 0 && (
                    <span className="absolute top-4 left-4 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
                      Out of Stock
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">${product.price}</span>
                    <button
                      disabled={product.stock === 0}
                      className={`px-4 py-2 rounded-lg ${
                        product.stock === 0
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No products available in this category
            </h3>
            <p className="text-gray-600">Check back soon or explore other categories!</p>
            <Link
              href="/categories"
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Browse All Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}