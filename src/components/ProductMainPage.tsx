"use client";

import { useMemo, useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/store";
import { addCartItem } from "@/store/slices/customerCartSlice";
import { toggleWishlistItem } from "@/store/slices/customerWishlistSlice";
import { Heart } from "lucide-react";
import { createWishlistItem } from "@/lib/wishlist";
import { toastError, toastSuccess } from "@/lib/toast";
import { trackAddToCart } from "@/lib/analytics-events";

type Category = {
  _id?: string;
  name?: string;
  slug?: string;
  image_url?: string;
};

const formatPrice = (value: number) =>
  `Rs. ${Number(value || 0).toLocaleString()}`;

const getProductImage = (product: any) => {
  const firstVariant = product?.variants?.[0];
  return (
    product?.defaultImages?.[0]?.url?.trim() ||
    firstVariant?.variantsImageUrls?.[0]?.url?.trim() ||
    "/placeholder.jpg"
  );
};

const ProductCard = ({ product }: { product: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.customerAuth.token);
  const user = useSelector((state: RootState) => state.customerAuth.user);
  const wishlistItems = useSelector(
    (state: RootState) => state.customerWishlist?.items || [],
  );
  const [isAdding, setIsAdding] = useState(false);
  const firstVariant =
    product?.variants?.find((variant: any) => variant?.isActive) ||
    product?.variants?.[0];
  const productCategory = product?.productCategory || "unknown";
  const finalPrice = Number(firstVariant?.finalPrice || 0);
  const actualPrice = Number(firstVariant?.actualPrice || 0);
  const discountPercent = Number(firstVariant?.discountPercent || 0);
  const stockQuantity = Number(firstVariant?.stockQuantity || 0);
  const imageUrl = getProductImage(product);
  const isOutOfStock = stockQuantity <= 0;
  const isWishlisted = wishlistItems.some(
    (item) => item.product_id === String(product?._id || ""),
  );

  const handleAddToCart = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!product || !firstVariant?._id) return;
    if (!token) {
      router.push("/login");
      return;
    }
    setIsAdding(true);
    try {
      await dispatch(
        addCartItem({
          product_id: product._id,
          variant_id: firstVariant._id,
          quantity: 1,
        }),
      ).unwrap();
      trackAddToCart({
        vendorId: product?.vendor?._id,
        userId: user?._id || user?.id || "",
        productId: product._id,
        productName: product.productName,
        productPrice: firstVariant.finalPrice || 0,
        quantity: 1,
      });
      toastSuccess("Added to cart");
    } catch (error: any) {
      toastError(error || "Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleWishlist = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!product?._id) return;

    dispatch(
      toggleWishlistItem(
        createWishlistItem({
          product_id: product._id,
          product_name: product.productName,
          product_category: product.productCategory || "unknown",
          image_url: imageUrl,
          final_price: finalPrice,
          actual_price: actualPrice || finalPrice,
          brand: product.brand,
          short_description: product.shortDescription || product.description,
          variant_id: firstVariant?._id,
          variant_attributes: firstVariant?.variantAttributes || undefined,
          stock_quantity: stockQuantity,
        }),
      ),
    );
    toastSuccess(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div className="group h-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_18px_40px_-32px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_-32px_rgba(15,23,42,0.6)]">
      <Link
        href={`/product/${productCategory}/${product?._id || ""}`}
        className="block"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
          <img
            src={imageUrl}
            alt={
              firstVariant?.variantMetaTitle ||
              product?.productName ||
              "Product"
            }
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {discountPercent > 0 && (
            <span className="absolute left-3 top-3 rounded-lg bg-blue-600 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow">
              {discountPercent}% off
            </span>
          )}
          <button
            type="button"
            onClick={handleToggleWishlist}
            className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow transition hover:scale-105"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`h-4 w-4 ${
                isWishlisted
                  ? "fill-red-500 text-red-500"
                  : "text-slate-700 hover:fill-red-500 hover:text-red-500"
              }`}
            />
          </button>
        </div>
        <div className="space-y-2 px-4 pb-3 pt-4">
          <div>
            <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
              {product?.productName || "Untitled Product"}
            </h3>
            <p className="text-xs text-slate-500">1 unit</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-slate-900">
              {formatPrice(finalPrice)}
            </span>
            {actualPrice > finalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(actualPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between gap-2 px-4 pb-4">
        <span
          className={`text-xs font-medium ${
            stockQuantity > 5 ? "text-emerald-600" : "text-orange-600"
          }`}
        >
          {stockQuantity > 0 ? `${stockQuantity} in stock` : "Out of stock"}
        </span>
        <Button
          onClick={handleAddToCart}
          disabled={isAdding || isOutOfStock || !firstVariant?._id}
          variant="outline"
          className="h-8 rounded-full border-emerald-500 px-4 text-xs font-semibold uppercase text-emerald-600 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isOutOfStock ? "Out" : isAdding ? "Adding" : "Add"}
        </Button>
      </div>
    </div>
  );
};

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div>
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
    </div>
  </div>
);

const ProductsMainPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("authToken") || ""
            : "";
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/all`, {
            params: { page: 1, limit: 48 },
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories/getall`, {
            params: { page: 1, limit: 8 },
          }),
        ]);

        const productList = Array.isArray(productsRes.data?.products)
          ? productsRes.data.products
          : [];
        const categoryList = Array.isArray(categoriesRes.data?.data)
          ? categoriesRes.data.data
          : [];

        setProducts(productList);
        setCategories(categoryList);
        setShuffleSeed(Math.random());
      } catch (error) {
        console.error("Failed to fetch home data:", error);
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const trendingProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        const aStock = Number(a?.variants?.[0]?.stockQuantity || 0);
        const bStock = Number(b?.variants?.[0]?.stockQuantity || 0);
        return bStock - aStock;
      })
      .slice(0, 8);
  }, [products]);

  const newArrivals = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        const aTime = new Date(a?.createdAt || 0).getTime();
        const bTime = new Date(b?.createdAt || 0).getTime();
        return bTime - aTime;
      })
      .slice(0, 8);
  }, [products]);

  const bestDeals = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        const discountA = Number(a?.variants?.[0]?.discountPercent || 0);
        const discountB = Number(b?.variants?.[0]?.discountPercent || 0);
        return discountB - discountA;
      })
      .slice(0, 8);
  }, [products]);

  const topRated = useMemo(() => {
    const list = [...products];
    let seed = Math.floor(shuffleSeed * 1000000) || 1;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = list.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list.slice(0, 8);
  }, [products, shuffleSeed]);

  const categorySections = useMemo(() => {
    return categories
      .map((category) => {
        const categoryId = String(category._id || "");
        const categoryProducts = products.filter(
          (product) => String(product?.productCategory || "") === categoryId
        );
        return {
          ...category,
          products: categoryProducts.slice(0, 4),
        };
      })
      .filter((section) => section.products.length > 0);
  }, [categories, products]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        Loading products...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-white py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        <section>
          <SectionHeader
            title="Trending right now"
            subtitle="Fresh arrivals that shoppers are picking fast."
          />
          {trendingProducts.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trendingProducts.map((product) => (
                <ProductCard
                  key={product?._id || product?.slug || product?.productName}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-500">
              No trending products yet.
            </div>
          )}
        </section>

        <section>
          <SectionHeader
            title="Top rated picks"
            subtitle="A shuffled mix of highly loved products."
          />
          {topRated.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {topRated.map((product) => (
                <ProductCard
                  key={product?._id || product?.slug || product?.productName}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-500">
              No top rated products yet.
            </div>
          )}
        </section>

        <section>
          <SectionHeader
            title="New arrivals"
            subtitle="Just in: latest additions to the store."
          />
          {newArrivals.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {newArrivals.map((product) => (
                <ProductCard
                  key={product?._id || product?.slug || product?.productName}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-500">
              No new arrivals yet.
            </div>
          )}
        </section>

        <section>
          <SectionHeader
            title="Best deals for you"
            subtitle="Top discounts hand-picked across the store."
          />
          {bestDeals.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {bestDeals.map((product) => (
                <ProductCard
                  key={product?._id || product?.slug || product?.productName}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-500">
              No deals to show right now.
            </div>
          )}
        </section>

        <section>
          <SectionHeader
            title="Category-wise picks"
            subtitle="Browse a few favorites from every category."
          />
          <div className="space-y-10">
            {categorySections.length ? (
              categorySections.map((section) => (
                <div key={section._id || section.slug || section.name}>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {section.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Popular in {section.name}
                      </p>
                    </div>
                    {section.slug && (
                      <Link
                        href={`/categories/${section.slug}`}
                        className="text-sm font-semibold text-orange-600 hover:text-orange-700"
                      >
                        View all
                      </Link>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {section.products.map((product: any) => (
                      <ProductCard
                        key={
                          product?._id || product?.slug || product?.productName
                        }
                        product={product}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-500">
                No category products to show yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductsMainPage;
