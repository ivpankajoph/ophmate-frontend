// app/categories/[slug]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  Filter,
  Heart,
  Package,
  ShoppingCart,
  Star,
  X,
  Zap,
} from "lucide-react";
import PromotionalBanner from "@/components/promotional-banner";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer";
import Pagination from "@/components/ui/Pagination";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { toggleWishlistItem } from "@/store/slices/customerWishlistSlice";
import { createWishlistItem } from "@/lib/wishlist";
import { toastSuccess } from "@/lib/toast";
import { buildProductPath } from "@/lib/product-route";

interface Variant {
  _id: string;
  variantSku: string;
  variantAttributes: {
    color?: string;
    country?: string;
  };
  actualPrice: number;
  discountPercent: number;
  finalPrice: number;
  stockQuantity: number;
  variantsImageUrls: Array<{
    url: string;
    publicId: string;
  }>;
  isActive: boolean;
}

interface Product {
  _id: string;
  productName: string;
  slug: string;
  brand: string;
  shortDescription: string;
  description: string;
  specifications: any[];
  defaultImages: Array<{
    url: string;
    publicId: string;
  }>;
  variants: Variant[];
  isAvailable: boolean;
  productCategory: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
}

interface ProductsResponse {
  success: boolean;
  products: Product[];
  category: Category;
  count?: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface CategoryResponse {
  success: boolean;
  data: Category;
}

export default function CategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const categorySlug = params.slug as string;
  const wishlistItems = useSelector(
    (state: RootState) => state.customerWishlist?.items || [],
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const categoryResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/slug/${categorySlug}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!categoryResponse.ok) {
          throw new Error(
            `Failed to fetch category: ${categoryResponse.statusText}`
          );
        }

        const categoryData: CategoryResponse = await categoryResponse.json();

        if (!categoryData?.data?._id) {
          throw new Error("Category not found");
        }

        setCategory(categoryData.data);

        const productsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/category/${categoryData.data._id}?page=${page}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!productsResponse.ok) {
          throw new Error(
            `Failed to fetch products: ${productsResponse.statusText}`
          );
        }

        const productsData: ProductsResponse = await productsResponse.json();
        setProducts(productsData?.products || []);
        setTotalPages(productsData?.pagination?.totalPages || 1);
        setTotalProducts(productsData?.pagination?.total || productsData?.count || 0);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load category"
        );
        console.error("Error fetching category products:", err);
        setCategory(null);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) {
      fetchCategoryProducts();
    }
  }, [categorySlug, page, limit]);

  useEffect(() => {
    setPage(1);
  }, [categorySlug]);

  // Get all unique brands
  const allBrands = React.useMemo(() => {
    const brands = new Set<string>();
    products.forEach((p) => p.brand && brands.add(p.brand));
    return Array.from(brands);
  }, [products]);

  // Flatten products with their variants for display
  const flattenedProducts = React.useMemo(() => {
    const flattened: Array<{
      product: Product;
      variant: Variant;
      displayPrice: number;
      originalPrice: number;
      discount: number;
      image: string;
    }> = [];

    products.forEach((product) => {
      if (product.variants && product.variants.length > 0) {
        product.variants.forEach((variant) => {
          flattened.push({
            product,
            variant,
            displayPrice: variant.finalPrice,
            originalPrice: variant.actualPrice,
            discount: variant.discountPercent,
            image:
              variant.variantsImageUrls?.[0]?.url ||
              product.defaultImages?.[0]?.url ||
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
          });
        });
      }
    });

    return flattened;
  }, [products]);

  const filteredAndSortedProducts = React.useMemo(() => {
    let filtered = flattenedProducts.filter((item) => {
      const productName = item.product.productName?.toLowerCase() || "";
      const productDesc = item.product.shortDescription?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();
      const price = item.displayPrice || 0;

      const matchesSearch =
        productName.includes(search) || productDesc.includes(search);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(item.product.brand);

      return matchesSearch && matchesPrice && matchesBrand;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.displayPrice - b.displayPrice;
        case "price-high":
          return b.displayPrice - a.displayPrice;
        case "discount":
          return b.discount - a.discount;
        case "newest":
          return 0;
        default:
          return 0;
      }
    });

    return filtered;
  }, [flattenedProducts, searchTerm, sortBy, priceRange, selectedBrands]);

  const handleProductClick = (productSlugOrId: string) => {
    router.push(
      buildProductPath({
        category: categorySlug,
        productId: productSlugOrId,
      }),
    );
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const sortOptions: Array<{ key: string; label: string }> = [
    { key: "relevance", label: "Relevance" },
    { key: "price-low", label: "Price -- Low to High" },
    { key: "price-high", label: "Price -- High to Low" },
    { key: "newest", label: "Newest First" },
    { key: "discount", label: "Top Discount" },
  ];

  const visibleCount = filteredAndSortedProducts.length;
  const resultStart = visibleCount > 0 ? (page - 1) * limit + 1 : 0;
  const resultEnd = visibleCount > 0 ? resultStart + visibleCount - 1 : 0;

  const getProductHighlights = (
    product: Product,
    variant: Variant,
  ): string[] => {
    const highlights: string[] = [];

    if (variant?.variantAttributes?.color) {
      highlights.push(`Color: ${variant.variantAttributes.color}`);
    }
    if (variant?.variantAttributes?.country) {
      highlights.push(`Country: ${variant.variantAttributes.country}`);
    }

    const primarySpec =
      Array.isArray(product.specifications) &&
      product.specifications.length > 0 &&
      product.specifications[0] &&
      typeof product.specifications[0] === "object"
        ? product.specifications[0]
        : null;

    if (primarySpec) {
      Object.entries(primarySpec)
        .slice(0, 4)
        .forEach(([key, value]) => {
          if (value !== undefined && value !== null && String(value).trim()) {
            highlights.push(`${key}: ${String(value)}`);
          }
        });
    }

    if (highlights.length === 0 && product.shortDescription) {
      highlights.push(product.shortDescription);
    }

    return highlights.slice(0, 5);
  };

  const isWishlisted = (productId: string) =>
    wishlistItems.some((item) => item.product_id === String(productId));

  const handleToggleWishlist = (product: Product, variant: Variant) => {
    const alreadyWishlisted = isWishlisted(product._id);
    dispatch(
      toggleWishlistItem(
        createWishlistItem({
          product_id: product._id,
          product_slug: product.slug,
          product_name: product.productName,
          product_category: categorySlug || "unknown",
          image_url:
            variant?.variantsImageUrls?.[0]?.url ||
            product.defaultImages?.[0]?.url ||
            "/placeholder.png",
          final_price: variant?.finalPrice || 0,
          actual_price: variant?.actualPrice || variant?.finalPrice || 0,
          brand: product.brand,
          short_description: product.shortDescription || product.description,
          variant_id: variant?._id,
          variant_attributes: variant?.variantAttributes || undefined,
          stock_quantity: variant?.stockQuantity ?? 0,
        }),
      ),
    );
    toastSuccess(alreadyWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };
useEffect(() => {
  if (!category) return;

  const metaTitle =
    category.metaTitle?.trim() || category.name || "Category";

  const metaDescription =
    category.metaDescription?.trim() ||
    category.description ||
    "";

  // âœ… Set browser tab title
  document.title = metaTitle;

  // âœ… Set meta description safely
  let metaTag = document.head.querySelector(
    'meta[name="description"]'
  ) as HTMLMetaElement | null;

  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.name = "description";
    document.head.appendChild(metaTag);
  }

  metaTag.content = metaDescription;

  // âœ… Optional: keywords
  if (category.metaKeywords?.length) {
    let keywordTag = document.head.querySelector(
      'meta[name="keywords"]'
    ) as HTMLMetaElement | null;

    if (!keywordTag) {
      keywordTag = document.createElement("meta");
      keywordTag.name = "keywords";
      document.head.appendChild(keywordTag);
    }

    keywordTag.content = category.metaKeywords.join(",");
  }
}, [category]);


  if (loading) {
    return (
      <>
        <PromotionalBanner />
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-gray-700 text-lg font-medium">
              Loading amazing products...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !category) {
    return (
      <>
        <PromotionalBanner />
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-3xl shadow-xl p-12">
              <Package className="w-20 h-20 mx-auto mb-6 text-gray-400" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {error || "Category not found"}
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                Unable to load category details. Let's get you back on track.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  const metaTitle = category?.metaTitle || "Category";
  const metaDescription = category?.metaDescription || "";
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta
          name="keywords"
          content={category?.metaKeywords?.join(",") || ""}
        />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={category?.image_url} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={category?.image_url} />
      </Head>

      <PromotionalBanner />
      <Navbar />

      <div className="min-h-screen bg-[#f1f3f6]">
        <div className="mx-auto max-w-[1400px] px-3 py-4 md:px-4">
          <div className="mb-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <span>›</span>
              <span className="font-medium text-slate-700">{category?.name}</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {category?.name}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Showing {resultStart} - {resultEnd} of{' '}
              {totalProducts || filteredAndSortedProducts.length} results for
              {` "${searchTerm.trim() || category?.name}"`}
            </p>

            <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="font-semibold text-slate-700">Sort By</span>
                {sortOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setSortBy(option.key)}
                    className={`border-b-2 pb-1 font-medium transition-colors ${
                      sortBy === option.key
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="w-full lg:w-[340px]">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search within results..."
                  className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowMobileFilters((prev) => !prev)}
            className="mb-3 inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm lg:hidden"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 p-4">
                  <h3 className="text-3xl font-extrabold leading-none text-slate-900">
                    Filters
                  </h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="rounded p-1 text-slate-500 hover:bg-slate-100 lg:hidden"
                    aria-label="Close filters"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="border-b border-slate-200 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                    Categories
                  </p>
                  <div className="mt-3 space-y-2 text-sm">
                    <button className="text-left font-medium text-slate-700 hover:text-blue-600">
                      {category?.name}
                    </button>
                  </div>
                </div>

                <div className="border-b border-slate-200 p-4">
                  <button className="flex w-full items-center justify-between text-left text-sm font-bold uppercase tracking-[0.12em] text-slate-600">
                    <span>Price</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="mt-4 space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([0, Number.parseInt(e.target.value)])
                      }
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="rounded bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
                        Rs. 0
                      </span>
                      <span className="text-slate-500">to</span>
                      <span className="rounded bg-blue-100 px-2.5 py-1 font-semibold text-blue-700">
                        Rs. {priceRange[1].toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {allBrands.length > 0 && (
                  <div className="border-b border-slate-200 p-4">
                    <button className="flex w-full items-center justify-between text-left text-sm font-bold uppercase tracking-[0.12em] text-slate-600">
                      <span>Brands</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <div className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
                      {allBrands.map((brand) => (
                        <label
                          key={brand}
                          className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700"
                        >
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedBrands([...selectedBrands, brand]);
                              } else {
                                setSelectedBrands(
                                  selectedBrands.filter((b) => b !== brand),
                                );
                              }
                            }}
                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span>{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4">
                  <button
                    onClick={() => {
                      setSelectedBrands([]);
                      setPriceRange([0, 200000]);
                      setSearchTerm('');
                    }}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </aside>

            <section className="space-y-3">
              {filteredAndSortedProducts.length > 0 ? (
                <>
                  {filteredAndSortedProducts.map((item) => {
                    const alreadyWishlisted = isWishlisted(item.product._id);
                    const highlights = getProductHighlights(
                      item.product,
                      item.variant,
                    );

                    return (
                      <article
                        key={`${item.product._id}-${item.variant._id}`}
                        onClick={() =>
                          handleProductClick(
                            item.product.slug || item.product._id,
                          )
                        }
                        className="relative cursor-pointer rounded-md border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleWishlist(item.product, item.variant);
                          }}
                          className="absolute right-3 top-3 rounded-full border border-slate-200 bg-white p-2 transition hover:border-rose-200 hover:bg-rose-50"
                          aria-label="Toggle wishlist"
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              alreadyWishlisted
                                ? 'fill-rose-500 text-rose-500'
                                : 'text-slate-500'
                            }`}
                          />
                        </button>

                        <div className="flex flex-col gap-4 md:flex-row">
                          <div className="relative mx-auto w-full max-w-[220px] shrink-0 overflow-hidden rounded-md border border-slate-100 bg-slate-50">
                            {item.discount > 0 && (
                              <span className="absolute right-2 top-2 z-10 rounded bg-green-600 px-2 py-1 text-xs font-bold text-white">
                                {item.discount.toFixed(0)}% off
                              </span>
                            )}
                            <img
                              src={item.image}
                              alt={item.product.productName}
                              className="h-[220px] w-full object-contain p-3"
                              onError={(e) => {
                                e.currentTarget.src =
                                  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e';
                              }}
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h2 className="text-2xl font-semibold leading-snug text-slate-900 md:text-3xl">
                              {item.product.productName}
                            </h2>
                            <div className="mt-2 flex flex-wrap items-center gap-3">
                              <span className="inline-flex items-center gap-1 rounded bg-green-600 px-2 py-1 text-xs font-bold text-white">
                                4.2 <Star className="h-3 w-3 fill-current" />
                              </span>
                              <span className="text-sm font-medium text-slate-500">
                                Brand: {item.product.brand}
                              </span>
                              {item.variant.stockQuantity > 0 && (
                                <span className="text-xs font-semibold text-emerald-600">
                                  {item.variant.stockQuantity} in stock
                                </span>
                              )}
                            </div>

                            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                              {highlights.map((line, idx) => (
                                <li key={`${item.variant._id}-${idx}`}>{line}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="md:w-[220px] md:border-l md:border-slate-200 md:pl-4">
                            <div className="text-3xl font-bold text-slate-900 md:text-4xl">
                              Rs. {item.displayPrice.toLocaleString()}
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              {item.discount > 0 && (
                                <span className="text-base text-slate-400 line-through">
                                  Rs. {item.originalPrice.toLocaleString()}
                                </span>
                              )}
                              {item.discount > 0 && (
                                <span className="text-base font-semibold text-green-600">
                                  {item.discount.toFixed(0)}% off
                                </span>
                              )}
                            </div>
                            {item.discount > 0 && (
                              <p className="mt-2 text-sm font-medium text-emerald-600">
                                Save Rs.{" "}
                                {(
                                  item.originalPrice - item.displayPrice
                                ).toLocaleString()}
                              </p>
                            )}

                            <button
                              onClick={(e) => e.stopPropagation()}
                              disabled={item.variant.stockQuantity === 0}
                              className="mt-4 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                            >
                              <ShoppingCart className="h-4 w-4" />
                              Add
                            </button>

                            {item.variant.stockQuantity > 0 &&
                              item.variant.stockQuantity < 10 && (
                                <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-orange-600">
                                  <Zap className="h-3 w-3" />
                                  Only {item.variant.stockQuantity} left
                                </p>
                              )}
                            {item.variant.stockQuantity === 0 && (
                              <p className="mt-3 text-xs font-semibold text-red-600">
                                Out of stock
                              </p>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}

                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    isLoading={loading}
                  />
                </>
              ) : (
                <div className="rounded-md border border-slate-200 bg-white py-20 text-center shadow-sm">
                  <Package className="mx-auto mb-5 h-16 w-16 text-slate-300" />
                  <h3 className="text-2xl font-bold text-slate-900">
                    No products found
                  </h3>
                  <p className="mt-2 text-slate-600">
                    Try changing filters or search query
                  </p>
                  <button
                    onClick={() => {
                      setSelectedBrands([]);
                      setPriceRange([0, 200000]);
                      setSearchTerm('');
                    }}
                    className="mt-5 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}














