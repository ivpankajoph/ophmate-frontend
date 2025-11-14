"use client"
import React, { useState } from "react";
import { Star, Search } from "lucide-react";


export default function AllProducts() {
  const products = [
    {
      id: 1,
      name: "Emerald Fern",
      category: "Indoor Plants",
      price: 120.0,
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=676",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Golden Pothos",
      category: "Hanging Plants",
      price: 85.0,
      image:
        "https://plus.unsplash.com/premium_photo-1676478746990-4ef5c8ef234a?auto=format&fit=crop&q=60&w=600",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Starlight Succulent",
      category: "Indoor Plants",
      price: 95.0,
      image:
        "https://images.unsplash.com/photo-1617111490936-07b47eafdcd4?auto=format&fit=crop&q=80&w=676",
      rating: 0,
    },
    {
      id: 4,
      name: "Snake Plant",
      category: "Low Maintenance",
      price: 110.0,
      image:
        "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=676",
      rating: 4.7,
    },
    {
      id: 5,
      name: "Aloe Vera",
      category: "Medicinal Plants",
      price: 75.0,
      image:
        "https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?auto=format&fit=crop&q=60&w=600",
      rating: 4.6,
    },
    {
      id: 6,
      name: "Peace Lily",
      category: "Flowering Plants",
      price: 130.0,
      image:
        "https://plus.unsplash.com/premium_vector-1712614779372-248dd015213b?auto=format&fit=crop&q=60&w=352&dpr=2&h=367",
      rating: 4.9,
    },
    {
      id: 7,
      name: "Spider Plant",
      category: "Air Purifying",
      price: 90.0,
      image:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=60&w=600",
      rating: 4.2,
    },
    {
      id: 8,
      name: "ZZ Plant",
      category: "Low Maintenance",
      price: 105.0,
      image:
        "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&q=60&w=600",
      rating: 4.4,
    },
    {
      id: 9,
      name: "Jade Plant",
      category: "Succulents",
      price: 115.0,
      image:
        "https://plus.unsplash.com/premium_photo-1683121484963-a491b935780b?auto=format&fit=crop&q=60&w=600",
      rating: 4.5,
    },
    {
      id: 10,
      name: "Boston Fern",
      category: "Hanging Plants",
      price: 100.0,
      image:
        "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&q=60&w=600",
      rating: 4.3,
    },
  ];

  const categories = [
    "All",
    "Indoor Plants",
    "Hanging Plants",
    "Low Maintenance",
    "Medicinal Plants",
    "Flowering Plants",
    "Air Purifying",
    "Succulents",
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filtered products based on search + category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
     <>
    <div className="bg-white py-16 lg:py-20">
     
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-4xl lg:text-5xl font-bold text-left text-gray-900 mb-8">
          All Products
        </h2>

        {/* Search + Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
          {/* Search Bar */}
          <div className="relative w-full lg:w-1/3">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === cat
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-green-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100 mb-4 aspect-square rounded-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={
                        index < Math.round(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                {/* Product Info */}
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm lg:text-base mb-2">
                  {product.category}
                </p>
                <p className="text-gray-900 text-lg lg:text-xl font-semibold">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No products found matching your criteria.
          </p>
        )}
      </div>
    </div></>
  );
}
