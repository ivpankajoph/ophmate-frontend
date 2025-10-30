"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useParams } from "next/navigation";
import { fetchProductById } from "@/store/slices/productSlice";
import { getImageUrl } from "@/components/main/Index";

// Types
type Variant = {
  _id: string;
  sku: string;
  attributes: Record<string, string>;
  actual_price: number;
  price: number;
  final_price: number;
  stockQuantity: number;
  image_urls: string[];
  is_active: boolean;
};

type Product = {
  _id: string;
  productName: string;
  slug: string;
  productCategory: string;
  brand: string;
  short_description: string;
  description: string;
  default_images: string[];
  isAvailable: boolean;
  variants: Variant[];
  createdAt: string;
  updatedAt: string;
  vendor?: {
    name?: string;
  };
};

// Helper
const getColorFromVariant = (variant: Variant): string => {
  return variant.attributes.Color || "Unknown";
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { product, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [isZoom, setIsZoom] = useState(false);
  const mainRef = useRef<HTMLDivElement | null>(null);

  // Fetch product
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  // Initialize selected variant & image
  useEffect(() => {
    if (!product) return;

    let firstActiveVariant: Variant | undefined;
    if (product.variants && product.variants.length > 0) {
      firstActiveVariant =
        product.variants.find((v) => v.is_active) || product.variants[0];
      setSelectedVariant(firstActiveVariant);

      const firstImg = firstActiveVariant.image_urls[0];
      setSelectedImage(getImageUrl(firstImg) || getImageUrl(product.default_images[0]) || "");
    } else {
      setSelectedImage(getImageUrl(product.default_images[0]) || "");
    }
  }, [product]);

  // Update main image when variant changes
  useEffect(() => {
    if (selectedVariant?.image_urls?.[0]) {
      setSelectedImage(getImageUrl(selectedVariant.image_urls[0]));
    }
  }, [selectedVariant]);

  const subtotal = useMemo(() => {
    const basePrice = selectedVariant?.final_price ?? product?.variants?.[0]?.final_price ?? 0;
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isZoom || !mainRef.current) return;
    const rect = mainRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mainRef.current.style.backgroundPosition = `${x}% ${y}%`;
  };

  // Loading / Error states
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

  // Image sources
  const defaultImages = product.default_images.length > 0 ? product.default_images : [];
  const variantImages = selectedVariant?.image_urls || [];
  const allImageUrls = [...new Set([...defaultImages, ...variantImages])]
    .filter(Boolean)
    .map(getImageUrl);

  // Description features
  const features = product.description
    ? product.description.split(/[\r\n]+/).filter(Boolean)
    : [];

  // Specifications
  const specs: Record<string, string> = {
    Brand: product.brand || "N/A",
    Category: product.productCategory || "N/A",
    "Stock Available": selectedVariant?.stockQuantity?.toString() || "0",
    Price: `₹${(selectedVariant?.final_price || 0).toLocaleString()}`,
    ...(selectedVariant?.attributes || {}),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Gallery */}
        <div className="lg:col-span-6">
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {allImageUrls.map((img, i) => (
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
              <motion.div
                ref={mainRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoom(true)}
                onMouseLeave={() => {
                  setIsZoom(false);
                  if (mainRef.current)
                    mainRef.current.style.backgroundPosition = "center";
                }}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="w-full rounded-xl overflow-hidden bg-neutral-100"
                style={{
                  height: 520,
                  backgroundSize: isZoom ? "200%" : "cover",
                  backgroundPosition: "center",
                }}
              >
                <Image
                  src={selectedImage || "/placeholder.jpg"}
                  alt={product.productName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: "center" }}
                />

                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                    {product.isAvailable ? "In stock" : "Out of stock"}
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4 hidden md:flex gap-2 justify-center">
                  {allImageUrls.map((img, i) => (
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
              </motion.div>

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

        {/* Product Info & Actions */}
        <div className="lg:col-span-6 flex flex-col gap-6">
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
                SKU: {selectedVariant?.sku || "N/A"}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-baseline gap-3">
                <div className="text-2xl font-bold">
                  ₹{(selectedVariant?.final_price || 0).toLocaleString()}
                </div>
                {selectedVariant?.actual_price !== selectedVariant?.final_price && (
                  <div className="text-sm text-muted-foreground line-through">
                    ₹{(selectedVariant?.actual_price || 0).toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            <p className="mt-4 text-muted-foreground max-w-prose">
              {product.short_description ||
                product.description?.split("\n")[0] ||
                "No description available."}
            </p>
          </div>

          {/* Variants */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <div>
              <div className="text-sm font-medium mb-2">Color</div>
              <div className="flex gap-2 flex-wrap">
                {product.variants.map((v) => (
                  <button
                    key={v._id}
                    aria-pressed={selectedVariant?._id === v._id}
                    onClick={() => setSelectedVariant(v)}
                    disabled={!v.is_active}
                    className={`px-3 py-2 rounded-md border ${
                      selectedVariant?._id === v._id
                        ? "ring-2 ring-indigo-500 bg-indigo-50"
                        : "bg-white"
                    } text-sm flex items-center gap-2 ${
                      !v.is_active ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {v.image_urls[0] && (
                      <Image
                        src={getImageUrl(v.image_urls[0])}
                        alt={getColorFromVariant(v)}
                        width={36}
                        height={36}
                        className="object-cover rounded-sm"
                      />
                    )}
                    <span>{getColorFromVariant(v)}</span>
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
                {selectedVariant?.stockQuantity > 0
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

          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews (213)</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4">
              <div className="prose max-w-none">
                <p>{product.description || "No details available."}</p>
                {features.length > 0 && (
                  <ul>
                    {features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-4">
              <div className="grid grid-cols-2 gap-3 max-w-md">
                {Object.entries(specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{k}</span>
                    <span className="text-sm font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
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
            </TabsContent>
          </Tabs>

          <Separator />

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
              <AccordionItem value="seller_details">
                <AccordionTrigger>Seller Details</AccordionTrigger>
                <AccordionContent>
                <Link href={`/vendor/catalog/${product.vendor._id}`}>  <p className="text-sm text-muted-foreground">
                    {product.vendor?.name || "N/A"}
                  </p></Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">You might also like</h2>
          <Button variant="ghost">View all</Button>
        </div>
        <div className="no-scrollbar flex gap-4 overflow-x-auto py-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="min-w-[220px] p-3 rounded-xl border bg-white"
            >
              <div className="relative h-40 w-full rounded-md overflow-hidden mb-3">
                <Image
                  src={getImageUrl(`/-${(i % 6) + 1}.jpg`)}
                  alt={`rel-${i}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-sm">
                    Related Product {i + 1}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ₹{(20000 + i * 5000).toLocaleString()}
                  </div>
                </div>
                <Button size="icon">+</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

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
  );
}