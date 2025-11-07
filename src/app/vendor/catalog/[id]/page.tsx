"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { getImageUrl } from "@/components/main/Index";
import { User2Icon } from "lucide-react";
import { NEXT_PUBLIC_API_URL } from "@/config/variables";

// Hide scrollbar styles
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `;
  document.head.appendChild(style);
}

// Define the correct type for params
type VendorCatalogPageProps = {
  params: Promise<{ id: string }>;
};

export default function VendorCatalogPage({ params }: VendorCatalogPageProps) {
  // Await the params promise
  const resolvedParams = params;
  const [vendorId, setVendorId] = useState<string | null>(null);

  useEffect(() => {
    // Resolve the params promise
    const resolveParams = async () => {
      const resolved = await resolvedParams;
      setVendorId(resolved.id);
    };
    
    resolveParams();
  }, [resolvedParams]);

  const [vendor, setVendor] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("newest");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!vendorId) return;

    const fetchVendor = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${NEXT_PUBLIC_API_URL}/users/${vendorId}/products`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setVendor(data.vendor);
        setProducts(data.products);
      } catch (err) {
        console.error("Error fetching vendor:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVendor();
  }, [vendorId]);

  const filteredAndSorted = useMemo(() => {
    let result = [...products];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((p) =>
        p.productName.toLowerCase().includes(q)
      );
    }

    if (sort === "price_low_high") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sort === "price_high_low") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sort === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return result;
  }, [products, query, sort]);

  if (loading) return <VendorSkeleton />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Vendor Header */}
      <motion.header
        className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Avatar Area: Image or Lottie */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 shadow-md flex items-center justify-center">
          {vendor?.logo ? (
            <Image
              src={getImageUrl(vendor.logo)}
              alt={vendor?.name || "Vendor"}
              fill
              className="object-cover"
            />
          ) : (
           <User2Icon/>
          )}
        </div>

        <div className="text-center sm:text-left max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {vendor?.name || "Vendor"}
          </h1>
          <p className="text-sm text-gray-600 mt-1">{vendor?.email}</p>
          <p className="text-gray-700 mt-3 text-sm sm:text-base">
            {vendor?.description ||
              "Premium vendor offering exclusive quality products."}
          </p>
        </div>
      </motion.header>

      {/* Filters Bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 px-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between max-w-7xl mx-auto w-full">
          <div className="w-full sm:w-[280px]">
            <Input
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="w-full sm:w-[200px]">
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price_low_high">Price: Low → High</SelectItem>
                <SelectItem value="price_high_low">Price: High → Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Product Carousel */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
        {filteredAndSorted.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="relative w-48 h-48 mb-6">
              <Image
                src="/empty-state.svg"
                alt="No products found"
                fill
                className="opacity-80"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 max-w-md">
              {query
                ? `No products match your search for "${query}".`
                : "This vendor hasn't listed any products yet."}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800 px-1">
              Products ({filteredAndSorted.length})
            </h2>
            <div className="relative">
              <div
                className="flex overflow-x-auto hide-scrollbar pb-4 space-x-5"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {filteredAndSorted.map((product) => (
                  <motion.div
                    key={product._id}
                    className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px]"
                    style={{ scrollSnapAlign: "start" }}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={`/product/${product.productCategory}/${product._id}`}
                      className="block h-full"
                    >
                      <Card className="h-full flex flex-col overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 rounded-xl">
                        <div className="relative w-full h-48 bg-gray-100">
                          <Image
                            src={getImageUrl(product.default_images?.[0])}
                            alt={product.productName}
                            fill
                            className="object-cover transition-transform duration-300"
                          />
                        </div>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-sm font-semibold text-gray-900 line-clamp-2 h-12">
                            {product.productName}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-xs text-gray-500">
                            {product.productCategory || "Uncategorized"}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Skeleton Loader
function VendorSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 mb-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-3 w-full">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-8 px-2">
          <Skeleton className="h-10 w-full sm:w-[280px]" />
          <Skeleton className="h-10 w-full sm:w-[200px]" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <div className="flex overflow-x-auto hide-scrollbar pb-4 space-x-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[280px] sm:w-[300px]">
                <Card className="overflow-hidden border border-gray-200 rounded-xl">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}