"use client"
import React, { useMemo, useState } from "react";
import { Star, Search } from "lucide-react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTemplateVariant } from "@/app/template/components/useTemplateVariant";


export default function AllProducts() {
  const variant = useTemplateVariant();
  const products = useSelector((state: any) => state?.alltemplatepage?.products || []);
  const params = useParams();
  const vendor_id = params.vendor_id as string;

  const categories = useMemo(() => {
    const list = new Set<string>();
    products.forEach((product: any) => {
      const label =
        product?.productCategoryName ||
        product?.productCategory?.name ||
        product?.productCategory?.title ||
        product?.productCategory?.categoryName ||
        product?.productCategory;
      if (typeof label === "string" && label.trim()) list.add(label.trim());
    });
    return ["All", ...Array.from(list).sort()];
  }, [products]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const isStudio = variant.key === "studio";
  const isMinimal = variant.key === "minimal";
  const pageClass = isStudio
    ? "min-h-screen bg-slate-950 text-slate-100"
    : isMinimal
      ? "min-h-screen bg-[#f5f5f7] text-slate-900"
      : "min-h-screen bg-white";

  // Filtered products based on search + category
  const filteredProducts = products.filter((product: any) => {
    const name = (product?.productName || "").toLowerCase();
    const category =
      (product?.productCategoryName ||
        product?.productCategory?.name ||
        product?.productCategory?.title ||
        product?.productCategory?.categoryName ||
        product?.productCategory ||
        "") + "";
    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
     <>
    <div className={`${pageClass} py-16 lg:py-20`}>
     
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-4xl lg:text-5xl font-bold text-left mb-8">
          All Products
        </h2>

        {/* Search + Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
          {/* Search Bar */}
          <div className="relative w-full lg:w-1/3">
            <input
              type="text"
              placeholder="Search products..."
              className={`w-full rounded-lg pl-10 pr-4 py-2 template-focus-accent ${isStudio ? "border border-slate-700 bg-slate-950 text-slate-100" : "border border-gray-300"}`}
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
                    ? "text-white template-accent-bg"
                    : "bg-gray-100 text-gray-700 template-accent-soft-hover"
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
            {filteredProducts.map((product: any) => (
              <Link
                key={product._id}
                href={`/template/${vendor_id}/product/${product._id}`}
                className="group cursor-pointer"
              >
                {/* Product Image */}
                <div className={`relative overflow-hidden mb-4 aspect-square rounded-xl ${isStudio ? "bg-slate-900" : "bg-gray-100"}`}>
                  {product?.defaultImages?.[0]?.url ? (
                    <img
                      src={product.defaultImages[0].url}
                      alt={product.productName}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.3em] text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={
                        index < Math.round(product?.rating || 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                {/* Product Info */}
                <h3 className="text-xl lg:text-2xl font-semibold mb-1">
                  {product.productName || "Untitled Product"}
                </h3>
                <p className={`${isStudio ? "text-slate-400" : "text-gray-500"} text-sm lg:text-base mb-2`}>
                  {product?.productCategoryName ||
                    product?.productCategory?.name ||
                    product?.productCategory?.title ||
                    product?.productCategory?.categoryName ||
                    "Category"}
                </p>
                <p className="text-lg lg:text-xl font-semibold">
                  ₹{product?.variants?.[0]?.finalPrice || "--"}
                </p>
              </Link>
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
