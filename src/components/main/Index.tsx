"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/store/slices/productSlice";
import { useRouter } from "next/navigation";
import { NEXT_PUBLIC_API_URL_BANNERS } from "@/config/variables";

  const BASE_URL = NEXT_PUBLIC_API_URL_BANNERS;
  
 export const getImageUrl = (path?: string) => {
    if (!path) return "/placeholder.jpg";
    if (path.startsWith("http")) return path; // already full URL
    return `${BASE_URL}/${path.replace(/^\//, "")}`; // ensure no double slash
  };

export default function EcommerceHeroPage() {
  const [active, setActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<any>();

  const router = useRouter();

  const handleCardClick = (p: any) => {
    const categoryName = p.productCategory || p.category?.name || "unknown"; // fallback if field name differs
    router.push(`/product/${encodeURIComponent(categoryName)}/${p._id}`);
  };

 

  // Select state from Redux store
  const { products, loading, error } = useSelector(
    (state: any) => state.product || { products: [] }
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const child = container.children[index] as HTMLElement | undefined;
    if (!child) return;
    child.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    setActive(index);
  };

  const featured = products?.slice(0, 6) || [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-10">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 lg:col-span-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Discover stylish gear for every day
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Curated collections, fast shipping and hassle-free returns. Shop
              top-rated products across categories — clothes, bags, tech and
              more.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "All",
                "Clothing",
                "Bags",
                "Electronics",
                "Footwear",
                "Home",
              ].map((c) => (
                <button
                  key={c}
                  className="px-3 py-1.5 rounded-full border text-sm hover:bg-muted transition"
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-8 flex gap-4 items-center">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-neutral-100 grid place-items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2v6"
                      stroke="#4F46E5"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 10h12"
                      stroke="#4F46E5"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold">Fast Delivery</div>
                  <div className="text-xs text-muted-foreground">
                    Most orders in 2 days
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-neutral-100 grid place-items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14"
                      stroke="#06b6d4"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold">Easy Returns</div>
                  <div className="text-xs text-muted-foreground">
                    30 days money back
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual */}
          <div className="col-span-12 lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-tr from-indigo-50 to-white p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold">Spring Sale</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Up to 40% off on selected items
                  </p>
                  <div className="mt-4 flex gap-3">
                    <Button>Shop Sale</Button>
                    <Button variant="ghost">Learn More</Button>
                  </div>
                </div>

              </div>

              {/* Small Product Carousel */}
              <div className="mt-6 relative">
                <div
                  ref={carouselRef}
                  className="no-scrollbar flex gap-4 overflow-x-auto scroll-snap-x py-2 px-1"
                  style={{ scrollSnapType: "x mandatory" }}
                >
                  {loading ? (
                    <p className="text-sm text-gray-500">Loading...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : (
                    featured.map((p: any, i: number) => (
                      <div
                        key={p._id}
                        className="min-w-[180px] flex-shrink-0 rounded-lg bg-white p-3 shadow-md scroll-snap-align-center"
                        style={{ scrollSnapAlign: "center" }}
                        onClick={() => scrollToIndex(i)}
                      >
                        <div className="relative h-36 w-full mb-2 rounded-md overflow-hidden">
                          <Image
                            src={getImageUrl(p.default_images?.[0])}
                            alt={p.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-sm font-medium">
                          {p.productName}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          ₹{p.variants?.[0]?.final_price || 0}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="absolute bottom-2 left-4 flex gap-2">
                  {featured.map((_: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => scrollToIndex(i)}
                      className={`h-2 w-8 rounded-full ${
                        i === active ? "bg-indigo-600" : "bg-neutral-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="container mx-auto px-4 mt-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Trending Now</h2>
            <Button variant="ghost">View all</Button>
          </div>

          <div className="no-scrollbar flex gap-4 overflow-x-auto py-2">
            {loading ? (
              <p>Loading...</p>
            ) : (
              products.map((p: any) => (
                <Card
                  key={p._id}
                  onClick={() => handleCardClick(p)}
                  className="min-w-[220px] flex-shrink-0"
                >
                  <CardContent className="p-3">
                    <div className="relative h-40 w-full rounded-md overflow-hidden mb-3">
                      <Image
                        src={getImageUrl(p.default_images?.[0])}
                        alt={p.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{p.productName}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          ₹{p.variants?.[0]?.final_price || 0}
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-yellow-500">
                          <Star className="h-4 w-4" />
                          <span className="text-sm">4.5</span>
                        </div>
                      </div>
                      {/* <div className="self-start">
                        <Button size="icon">+</Button>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Popular Picks */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Popular Picks</h2>
            <div className="text-sm text-muted-foreground">Curated for you</div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              <p>Loading...</p>
            ) : (
              products.map((p: any) => (
                <div key={p._id} className="group">
                  <div
                    onClick={() => handleCardClick(p)}
                    className="relative w-full h-56 rounded-xl overflow-hidden shadow hover:scale-[1.01] transition-transform"
                  >
                    <Image
                      src={getImageUrl(p.default_images?.[0])}
                      alt={p.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <div>
                      <div className="font-medium text-sm">{p.productName}</div>
                      <div className="text-xs text-muted-foreground">
                        ₹{p.variants?.[0]?.final_price || 0}
                      </div>
                    </div>
                    <Badge>{p.brand}</Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Promotional Banner + Testimonials */}
        <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-amber-50 to-white p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">Bundle & Save</h3>
            <p className="mt-2 text-muted-foreground">
              Mix and match items and save up to 20% on bundles.
            </p>
          </div>
          <div className="flex gap-3">
            <Button>Build bundle</Button>
            <Button variant="ghost">See bundles</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
