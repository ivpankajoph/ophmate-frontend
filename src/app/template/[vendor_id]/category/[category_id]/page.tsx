"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "@/config/variables";

export default function CategoryProductsPage() {
  const params = useParams();
  const vendor_id = params.vendor_id as string;
  const categoryId = params.category_id as string;
  const products = useSelector((state: any) => state?.alltemplatepage?.products || []);
  const [searchTerm, setSearchTerm] = useState("");
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

  const { label, filteredProducts } = useMemo(() => {
    const normalize = (value: unknown) =>
      typeof value === "string" ? value.trim() : "";
    const normalizedParam = decodeURIComponent(categoryId || "").toLowerCase();

    const matchesCategory = (product: any) => {
      const id =
        normalize(product?.productCategory?._id) ||
        normalize(product?.productCategory);
      const name =
        normalize(product?.productCategoryName) ||
        normalize(product?.productCategory?.name) ||
        normalize(product?.productCategory?.title) ||
        normalize(product?.productCategory?.categoryName) ||
        (id && categoryMap[id]) ||
        "";

      if (id && id.toLowerCase() === normalizedParam) return true;
      if (name && name.toLowerCase().replace(/\s+/g, "-") === normalizedParam) {
        return true;
      }
      return false;
    };

    const list = products.filter(matchesCategory);
    const displayLabel =
      list[0]?.productCategoryName ||
      list[0]?.productCategory?.name ||
      list[0]?.productCategory?.title ||
      list[0]?.productCategory?.categoryName ||
      (list[0]?.productCategory?._id &&
        categoryMap[list[0].productCategory._id]) ||
      decodeURIComponent(categoryId || "").replace(/-/g, " ");

    const searched = list.filter((product: any) => {
      const name = normalize(product?.productName).toLowerCase();
      const desc = normalize(product?.shortDescription).toLowerCase();
      const term = searchTerm.toLowerCase();
      return name.includes(term) || desc.includes(term);
    });

    return { label: displayLabel, filteredProducts: searched };
  }, [categoryId, products, searchTerm, categoryMap]);

  return (
    <div className="min-h-screen bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
              Category
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {label}
            </h1>
          </div>
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 template-focus-accent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredProducts.map((product: any) => (
              <Link
                key={product._id}
                href={`/template/${vendor_id}/product/${product._id}`}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden bg-gray-100 mb-4 aspect-square rounded-xl">
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
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {product.productName || "Untitled Product"}
                </h3>
                <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                  {product.shortDescription || "No description"}
                </p>
                <p className="text-gray-900 text-lg font-semibold">
                  ₹{product?.variants?.[0]?.finalPrice || product?.finalPrice || "--"}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-12 text-center text-gray-500">
            No products found for this category.
          </div>
        )}
      </div>
    </div>
  );
}
