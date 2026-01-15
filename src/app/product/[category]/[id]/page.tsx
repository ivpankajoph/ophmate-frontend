"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Star, Heart, ShoppingCart, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { useParams } from "next/navigation";
import { fetchProductById } from "@/store/slices/productSlice";
import PromotionalBanner from "@/components/promotional-banner";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer";
import MightInterested from "@/components/MightInterested";

// Types
type VariantImage = {
  url: string;
  publicId: string;
};

type Variant = {
  _id: string;
  variantSku: string;
  variantAttributes: {
    color: string;
    country: string;
  };
  actualPrice: number;
  discountPercent: number;
  finalPrice: number;
  stockQuantity: number;
  variantsImageUrls: VariantImage[];
  isActive: boolean;
  variantMetaTitle: string;
  variantMetaDescription: string;
  variantMetaKeywords: string[];
  variantCanonicalUrl: string;
};

type FAQ = {
  question: string;
  answer: string;
};

type Product = {
  _id: string;
  productName: string;
  productCategory: string;
  brand: string;
  variants: Variant[];
  shortDescription?: string;
  description?: string;
  defaultImages?: { url: string; publicId: string }[];
  isAvailable?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  faqs?: FAQ[];
  vendor?: {
    name?: string;
    vendor_id?: string;
  };
};

const getColorFromVariant = (variant: Variant): string => {
  return variant?.variantAttributes?.color || "Unknown";
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { product, loading, error } = useSelector(
    (state: any) => state.product
  );

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Fetch product
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  // Set meta tags & initialize variant/image
  useEffect(() => {
    if (!product) return;

    const firstActiveVariant =
      product.variants.find((v: Variant) => v.isActive) || product.variants[0];
    setSelectedVariant(firstActiveVariant ?? null);

    const firstImg = firstActiveVariant?.variantsImageUrls[0]?.url?.trim();
    setSelectedImage(firstImg || "");

    // Update document title and meta description
    const metaTitle =
      firstActiveVariant?.variantMetaTitle ||
      product.metaTitle ||
      product.productName;
    const metaDesc =
      firstActiveVariant?.variantMetaDescription ||
      product.metaDescription ||
      "";

    document.title = metaTitle;

    let metaTag = document.querySelector('meta[name="description"]');
    if (metaTag) {
      metaTag.setAttribute("content", metaDesc);
    } else {
      metaTag = document.createElement("meta");
      (metaTag as HTMLMetaElement).name = "description";
      (metaTag as HTMLMetaElement).content = metaDesc;
      document.head.appendChild(metaTag);
    }
  }, [product]);

  // Update image when variant changes
  useEffect(() => {
    if (selectedVariant?.variantsImageUrls?.[0]?.url) {
      setSelectedImage(selectedVariant.variantsImageUrls[0].url.trim());
    }
  }, [selectedVariant]);

  const subtotal = useMemo(() => {
    const basePrice = selectedVariant?.finalPrice ?? product?.variants?.[0]?.finalPrice ?? 0;
    return basePrice * quantity;
  }, [quantity, selectedVariant, product]);

  const onThumbKey = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    img: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedImage(img);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant || !product) return;
    alert(
      `Added ${quantity} × ${product.productName} (${getColorFromVariant(
        selectedVariant
      )}) to cart — ₹${subtotal.toFixed(2)}`
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
  };

  const handleMouseEnter = () => setShowMagnifier(true);
  const handleMouseLeave = () => setShowMagnifier(false);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-96">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-96">
        Failed to load product. Please try again.
      </div>
    );
  }

  const allImageUrls = Array.from(
    new Set(
      product.variants.flatMap((v: Variant) =>
        v.variantsImageUrls.map((img) => img.url.trim())
      )
    )
  ).filter(Boolean);

  const productDescription =
    selectedVariant?.variantMetaDescription ||
    product.variants[0]?.variantMetaDescription ||
    product.description ||
    product.shortDescription ||
    "No description available.";

  const specs: Record<string, string> = {
    Brand: product.brand || "N/A",
    Category: product.productCategory || "N/A",
    "Stock Available": selectedVariant?.stockQuantity?.toString() || "0",
    Price: `₹${(selectedVariant?.finalPrice || 0).toLocaleString()}`,
    ...(selectedVariant?.variantAttributes || {}),
  };

  return (
    <>
      <PromotionalBanner />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Flex layout: sticky left, scrollable right */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Image Gallery - Sticky on desktop */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-8 self-start">
            <div className="flex gap-4">
              <div className="flex flex-col gap-3">
                {(allImageUrls as string[]).map((img, i) => (
                  <button
                    key={i}
                    aria-label={`View product image ${i + 1}`}
                    onClick={() => setSelectedImage(img)}
                    onKeyDown={(e) => onThumbKey(e, img)}
                    className={`w-20 h-20 rounded-md overflow-hidden border ${
                      selectedImage === img
                        ? "ring-2 ring-indigo-500"
                        : "border-neutral-200"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.jpg"}
                      alt="thumb"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="flex-1 relative">
                <div className="relative w-full h-[520px] rounded-xl overflow-hidden bg-neutral-100">
                  <Image
                    src={selectedImage || "/placeholder.jpg"}
                    alt={product.productName}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover cursor-crosshair"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />

                  {/* Magnifying Glass */}
                  {showMagnifier && (
                    <div
                      className="absolute w-48 h-48 rounded-full border-2 border-white shadow-xl overflow-hidden pointer-events-none z-10"
                      style={{
                        left: cursorPos.x - 96,
                        top: cursorPos.y - 96,
                        backgroundImage: `url(${selectedImage})`,
                        backgroundSize: `${520 * 2}px ${520 * 2}px`,
                        backgroundPosition: `-${cursorPos.x * 2}px -${cursorPos.y * 2}px`,
                      }}
                    />
                  )}

                  {/* Stock Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                      {(selectedVariant?.stockQuantity ?? 0) > 0
                        ? "In stock"
                        : "Out of stock"}
                    </Badge>
                  </div>

                  {/* Mobile Thumbnails */}
                  <div className="absolute bottom-4 left-4 right-4 hidden md:flex gap-2 justify-center">
                    {(allImageUrls as string[]).map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(img)}
                        className={`w-16 h-16 rounded-md overflow-hidden border ${
                          selectedImage === img
                            ? "ring-2 ring-indigo-500"
                            : "border-neutral-200"
                        }`}
                      >
                        <Image
                          src={img || "/placeholder.jpg"}
                          alt="mini"
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setWishlisted((s) => !s)}
                  >
                    <Heart className="mr-2" />{" "}
                    {wishlisted ? "Wishlisted" : "Add to favorites"}
                  </Button>
                  <Button variant="ghost">Share</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Info - Scrollable */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-extrabold">{product.productName}</h1>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="text-amber-400" />
                  <span className="font-semibold">4.6</span>
                  <span className="text-sm text-muted-foreground">
                    (213 reviews)
                  </span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="text-sm text-muted-foreground">
                  SKU: {selectedVariant?.variantSku || "N/A"}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-baseline gap-3">
                  <div className="text-2xl font-bold">
                    ₹{(selectedVariant?.finalPrice || 0).toLocaleString()}
                  </div>
                  {selectedVariant?.actualPrice !== selectedVariant?.finalPrice && (
                    <div className="text-sm text-muted-foreground line-through">
                      ₹{(selectedVariant?.actualPrice || 0).toLocaleString()}
                    </div>
                  )}
                  {selectedVariant?.discountPercent && selectedVariant.discountPercent > 0 && (
                    <div className="text-sm bg-red-100 text-red-800 px-2 py-0.5 rounded">
                      {selectedVariant.discountPercent}% off
                    </div>
                  )}
                </div>
              </div>

              <p className="mt-4 text-muted-foreground max-w-prose">
                {productDescription.split('.')[0] || "No description available."}
              </p>
            </div>

            {/* Variants */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <div>
                <div className="text-sm font-medium mb-2">Color</div>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map((v: Variant) => (
                    <button
                      key={v._id}
                      aria-pressed={selectedVariant?._id === v._id}
                      onClick={() => setSelectedVariant(v)}
                      disabled={!v.isActive}
                      className={`px-3 py-2 rounded-md border ${
                        selectedVariant?._id === v._id
                          ? "ring-2 ring-indigo-500 bg-indigo-50"
                          : "bg-white"
                      } text-sm flex items-center gap-2 ${
                        !v.isActive ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {v.variantsImageUrls[0] && (
                        <Image
                          src={v.variantsImageUrls[0].url.trim()}
                          alt={getColorFromVariant(v)}
                          width={36}
                          height={36}
                          className="object-cover rounded-sm"
                        />
                      )}
                      <span>
                        {getColorFromVariant(v).charAt(0).toUpperCase() +
                          getColorFromVariant(v).slice(1)}
                      </span>
                      {v.stockQuantity <= 0 && (
                        <span className="text-xs text-red-500">Out</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Quantity</div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </Button>
                  <Input
                    value={String(quantity)}
                    onChange={(e) =>
                      setQuantity(Math.max(1, Number(e.target.value) || 1))
                    }
                    className="w-20 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </Button>
                </div>

                <div className="mt-2 text-sm text-muted-foreground">
                  Available:{" "}
                  {(selectedVariant?.stockQuantity ?? 0) > 0
                    ? "In stock"
                    : "Out of stock"}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button
                className="flex-1 flex items-center justify-center gap-2 py-4"
                onClick={handleAddToCart}
                disabled={!selectedVariant || selectedVariant.stockQuantity <= 0}
              >
                <ShoppingCart /> Add to Bag — ₹{subtotal.toLocaleString()}
              </Button>
              <Button variant="outline" className="flex-1 py-4">
                Buy it now
              </Button>
            </div>

            <div className="flex gap-6 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck /> <span>Free shipping over ₹75</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw /> <span>30 days return</span>
              </div>
            </div>

            <Separator />

            {/* Always-visible content sections */}
            <div className="space-y-8 mt-6">
              {/* Details */}
              <section>
                <h2 className="text-xl font-bold mb-3">Product Details</h2>
                <div className="prose max-w-none">
                  <p>{productDescription}</p>
                </div>
              </section>

              {/* Specifications */}
              <section>
                <h2 className="text-xl font-bold mb-3">Specifications</h2>
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  {Object.entries(specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{k}</span>
                      <span className="text-sm font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Reviews */}
              <section>
                <h2 className="text-xl font-bold mb-3">Customer Reviews (213)</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">Customer {i}</div>
                          <div className="text-sm text-muted-foreground">
                            2 days ago
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="text-amber-400" />{" "}
                          <span className="font-medium">4.{i}</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Great product! Highly recommended.
                      </p>
                    </div>
                  ))}
                  <Button variant="ghost">Write a review</Button>
                </div>
              </section>

              {/* FAQs */}
              {product.faqs && product.faqs.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold mb-3">Frequently Asked Questions</h2>
                  <Accordion type="multiple" className="w-full">
                    {product.faqs.map((faq: FAQ, index: number) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              )}
            </div>

            <Separator />

            {/* Additional Accordions */}
            <div className="mt-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="shipping">
                  <AccordionTrigger>Shipping & Delivery</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      Standard shipping 3-7 business days. Expedited options
                      available at checkout.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                  <AccordionTrigger>Returns & Warranty</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      30-day returns. 1-year limited warranty on manufacturing
                      defects.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                {product.vendor?.vendor_id && (
                  <AccordionItem value="seller_details">
                    <AccordionTrigger>Seller Details</AccordionTrigger>
                    <AccordionContent>
                      <a
                        href={`/vendor/catalog/${product.vendor.vendor_id}`}
                        className="text-sm text-muted-foreground hover:underline"
                      >
                        {product.vendor.name || "N/A"}
                      </a>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          </div>
        </div>

        <MightInterested />

        {/* Sticky mobile CTA */}
        <div className="fixed left-0 right-0 bottom-4 md:hidden px-4">
          <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur rounded-full p-2 flex gap-3 items-center shadow-lg">
            <div className="flex-1 text-sm font-medium">
              {product.productName} • ₹{subtotal.toLocaleString()}
            </div>
            <Button onClick={handleAddToCart} className="py-3">
              Add to bag
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}