"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Star, Heart, ShoppingCart, Truck, RefreshCw, Package, TrendingDown, Award, Shield, Zap, Users, ChevronRight, Info, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import Link from "next/link";
import { FAQ, Variant } from "../../type/type";

const getColorFromVariant = (variant: Variant): string => {
  return variant?.variantAttributes?.color || "Unknown";
};

// Wholesale pricing tiers
const wholesaleTiers = [
  { min: 2, max: 499, discount: 10, label: "Starter Pack" },
  { min: 500, max: 9999, discount: 17, label: "Business Pack" },
  { min: 10000, max: null, discount: 44, label: "Enterprise Pack" },
];

const retailBenefits = [
  { icon: Truck, text: "Free shipping over ₹75" },
  { icon: RefreshCw, text: "30-day easy returns" },
  { icon: Shield, text: "1-year warranty" },
  { icon: Zap, text: "Fast delivery in 3-7 days" },
];

const wholesaleBenefits = [
  { icon: TrendingDown, text: "Bulk pricing discounts" },
  { icon: Users, text: "Dedicated account manager" },
  { icon: Award, text: "Priority support" },
  { icon: Package, text: "Custom packaging options" },
];

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { product, loading, error } = useSelector(
    (state: any) => state.product,
  );

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [pricingMode, setPricingMode] = useState<"retail" | "wholesale">("retail");

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!product) return;

    const firstActiveVariant =
      product.variants.find((v: Variant) => v.isActive) || product.variants[0];
    setSelectedVariant(firstActiveVariant ?? null);

    const firstImg = firstActiveVariant?.variantsImageUrls[0]?.url?.trim();
    setSelectedImage(firstImg || "");

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

  useEffect(() => {
    if (selectedVariant?.variantsImageUrls?.[0]?.url) {
      setSelectedImage(selectedVariant.variantsImageUrls[0].url.trim());
    }
  }, [selectedVariant]);

  useEffect(() => {
    if (pricingMode === "wholesale" && quantity < 2) {
      setQuantity(2);
    }
  }, [pricingMode]);

  const calculateWholesalePrice = (basePrice: number, qty: number) => {
    const tier = wholesaleTiers.find(
      (t) => qty >= t.min && (t.max === null || qty <= t.max)
    );
    if (!tier) return basePrice;
    return basePrice * (1 - tier.discount / 100);
  };

  const getCurrentTier = () => {
    return wholesaleTiers.find(
      (t) => quantity >= t.min && (t.max === null || quantity <= t.max)
    );
  };

  const subtotal = useMemo(() => {
    const basePrice =
      selectedVariant?.finalPrice ?? product?.variants?.[0]?.finalPrice ?? 0;
    
    if (pricingMode === "wholesale") {
      return calculateWholesalePrice(basePrice, quantity) * quantity;
    }
    return basePrice * quantity;
  }, [quantity, selectedVariant, product, pricingMode]);

  const savings = useMemo(() => {
    const basePrice = selectedVariant?.finalPrice ?? product?.variants?.[0]?.finalPrice ?? 0;
    if (pricingMode === "wholesale") {
      const regularTotal = basePrice * quantity;
      return regularTotal - subtotal;
    }
    return 0;
  }, [quantity, selectedVariant, product, pricingMode, subtotal]);

  const onThumbKey = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    img: string,
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
        selectedVariant,
      )}) to cart — ₹${subtotal.toFixed(2)}`,
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
      <>
        <PromotionalBanner />
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-medium">Loading product...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <p className="text-xl font-semibold">Failed to load product</p>
          <p className="text-muted-foreground mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  const allImageUrls = Array.from(
    new Set(
      product.variants.flatMap((v: Variant) =>
        v.variantsImageUrls.map((img) => img.url.trim()),
      ),
    ),
  ).filter(Boolean);

  const productDescription =
    selectedVariant?.variantMetaDescription ||
    product.variants[0]?.variantMetaDescription ||
    product.description ||
    product.shortDescription ||
    "No description available.";

  const specs: Record<string, string> = {
    Brand: product.brand || "N/A",
    "Stock Available": selectedVariant?.stockQuantity?.toString() || "0",
    Price: `₹${(selectedVariant?.finalPrice || 0).toLocaleString()}`,
    ...(selectedVariant?.variantAttributes || {}),
  };

  const basePrice = selectedVariant?.finalPrice || 0;
  const actualPrice = selectedVariant?.actualPrice || 0;
  const currentTier = getCurrentTier();

  return (
    <>
      <PromotionalBanner />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-8 self-start">
            <div className="flex gap-4">
              <div className="flex flex-col gap-3">
                {(allImageUrls as string[]).map((img, i) => (
                  <button
                    key={i}
                    aria-label={`View product image ${i + 1}`}
                    onClick={() => setSelectedImage(img)}
                    onKeyDown={(e) => onThumbKey(e, img)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? "ring-2 ring-indigo-500 border-indigo-300 scale-105"
                        : "border-neutral-200 hover:border-indigo-200"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.jpg"}
                      alt="thumb"
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>

              <div className="flex-1 relative">
                <div className="relative w-full h-[520px] rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 shadow-xl">
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

                  {showMagnifier && (
                    <div
                      className="absolute w-48 h-48 rounded-full border-4 border-white shadow-2xl overflow-hidden pointer-events-none z-10"
                      style={{
                        left: cursorPos.x - 96,
                        top: cursorPos.y - 96,
                        backgroundImage: `url(${selectedImage})`,
                        backgroundSize: `${520 * 2}px ${520 * 2}px`,
                        backgroundPosition: `-${cursorPos.x * 2}px -${
                          cursorPos.y * 2
                        }px`,
                      }}
                    />
                  )}

                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg">
                      {(selectedVariant?.stockQuantity ?? 0) > 0
                        ? "✓ In Stock"
                        : "Out of Stock"}
                    </Badge>
                    {selectedVariant?.discountPercent && selectedVariant.discountPercent > 0 && (
                      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg animate-pulse">
                        {selectedVariant.discountPercent}% OFF
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <Button
                    variant="outline"
                    className={`flex-1 transition-all ${wishlisted ? 'bg-pink-50 border-pink-300 text-pink-600' : ''}`}
                    onClick={() => setWishlisted((s) => !s)}
                  >
                    <Heart className={`mr-2 ${wishlisted ? 'fill-current' : ''}`} />{" "}
                    {wishlisted ? "Added to Favorites" : "Add to Favorites"}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {product.productName}
              </h1>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full">
                  <Star className="text-amber-400 fill-amber-400 w-5 h-5" />
                  <span className="font-bold text-amber-900">4.6</span>
                  <span className="text-sm text-amber-700">
                    (213 reviews)
                  </span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="text-sm text-muted-foreground font-mono bg-neutral-100 px-3 py-1 rounded">
                  SKU: {selectedVariant?.variantSku || "N/A"}
                </div>
              </div>
            </div>

            {/* Pricing Tabs */}
            <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 p-1 rounded-2xl shadow-lg">
              <Tabs 
                value={pricingMode} 
                onValueChange={(v) => setPricingMode(v as "retail" | "wholesale")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 bg-white p-1 rounded-xl">
                  <TabsTrigger 
                    value="retail"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-lg transition-all"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Retail
                  </TabsTrigger>
                  <TabsTrigger 
                    value="wholesale"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white rounded-lg transition-all"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Wholesale
                  </TabsTrigger>
                </TabsList>

                {/* Retail Pricing */}
                <TabsContent value="retail" className="mt-4">
                  <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Single Item Price</p>
                        <div className="flex items-baseline gap-3">
                          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            ₹{basePrice.toLocaleString()}
                          </div>
                          {actualPrice !== basePrice && (
                            <div className="text-xl text-muted-foreground line-through">
                              ₹{actualPrice.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                      {selectedVariant?.discountPercent && selectedVariant.discountPercent > 0 && (
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                          Save {selectedVariant.discountPercent}%
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                      {retailBenefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm bg-blue-50 px-3 py-2 rounded-lg">
                          <benefit.icon className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-900">{benefit.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 text-sm text-blue-900">
                        <Info className="w-4 h-4" />
                        <span className="font-medium">Perfect for personal use or small quantities</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Wholesale Pricing */}
                <TabsContent value="wholesale" className="mt-4">
                  <div className="bg-white rounded-xl p-6 shadow-md border-2 border-orange-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Package className="text-orange-600 w-6 h-6" />
                      <h3 className="font-bold text-xl bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                        Bulk Order Pricing
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                      {wholesaleTiers.map((tier, idx) => {
                        const tierPrice = basePrice * (1 - tier.discount / 100);
                        const isActive = quantity >= tier.min && (tier.max === null || quantity <= tier.max);
                        
                        return (
                          <div 
                            key={idx}
                            className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${
                              isActive 
                                ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-amber-50 shadow-lg scale-105' 
                                : 'border-gray-200 bg-white hover:border-orange-200 hover:shadow-md'
                            }`}
                            onClick={() => setQuantity(tier.min)}
                          >
                            {isActive && (
                              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                                Active
                              </div>
                            )}
                            <div className="text-xs font-semibold text-orange-600 mb-1">
                              {tier.label}
                            </div>
                            <div className="text-xs text-muted-foreground mb-2">
                              {tier.min} - {tier.max || '10000+'} pcs
                            </div>
                            <div className="text-2xl font-bold text-orange-600 mb-1">
                              ₹{tierPrice.toFixed(2)}
                            </div>
                            <div className="text-xs text-muted-foreground line-through mb-2">
                              ₹{basePrice.toFixed(2)}
                            </div>
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                              {tier.discount}% OFF
                            </Badge>
                          </div>
                        );
                      })}
                    </div>

                    {currentTier && (
                      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-xl shadow-lg mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm opacity-90 mb-1">Your Price ({quantity} pieces)</p>
                            <div className="text-3xl font-bold">
                              ₹{calculateWholesalePrice(basePrice, quantity).toFixed(2)}
                              <span className="text-sm font-normal ml-2 opacity-90">per piece</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm opacity-90">You Save</p>
                            <p className="text-2xl font-bold">₹{savings.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {wholesaleBenefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm bg-orange-50 px-3 py-2 rounded-lg">
                          <benefit.icon className="w-4 h-4 text-orange-600" />
                          <span className="text-orange-900">{benefit.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-orange-900">
                          <Info className="w-4 h-4" />
                          <span className="font-medium">Sample available: ₹{(basePrice * 0.85).toFixed(2)}</span>
                        </div>
                        <Button size="sm" variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                          Get Sample
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {productDescription.split(".")[0] || "No description available."}
            </p>

            {/* Variants */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <div>
                <div className="text-sm font-semibold mb-3 text-neutral-700">Select Color</div>
                <div className="flex gap-3 flex-wrap">
                  {product.variants.map((v: Variant) => (
                    <button
                      key={v._id}
                      aria-pressed={selectedVariant?._id === v._id}
                      onClick={() => setSelectedVariant(v)}
                      disabled={!v.isActive}
                      className={`group relative px-4 py-3 rounded-xl border-2 transition-all ${
                        selectedVariant?._id === v._id
                          ? "ring-2 ring-indigo-500 border-indigo-400 bg-indigo-50 shadow-lg scale-105"
                          : "bg-white border-neutral-200 hover:border-indigo-200 hover:shadow-md"
                      } text-sm flex items-center gap-3 ${
                        !v.isActive ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {v.variantsImageUrls[0] && (
                        <Image
                          src={v.variantsImageUrls[0].url.trim()}
                          alt={getColorFromVariant(v)}
                          width={40}
                          height={40}
                          className="object-cover rounded-lg shadow-sm"
                        />
                      )}
                      <div className="flex flex-col items-start">
                        <span className="font-medium">
                          {getColorFromVariant(v).charAt(0).toUpperCase() +
                            getColorFromVariant(v).slice(1)}
                        </span>
                        {v.stockQuantity <= 0 && (
                          <span className="text-xs text-red-500 font-semibold">Out of Stock</span>
                        )}
                      </div>
                      {selectedVariant?._id === v._id && (
                        <div className="absolute -top-1 -right-1 bg-indigo-500 text-white rounded-full p-1">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold mb-3 text-neutral-700">Quantity</div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-12 h-12 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition-all"
                    onClick={() => setQuantity((q) => Math.max(pricingMode === "wholesale" ? 2 : 1, q - 1))}
                  >
                    <span className="text-xl">-</span>
                  </Button>
                  <Input
                    value={String(quantity)}
                    onChange={(e) => {
                      const min = pricingMode === "wholesale" ? 2 : 1;
                      setQuantity(Math.max(min, Number(e.target.value) || min));
                    }}
                    className="w-24 text-center text-xl font-bold border-2 rounded-xl"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-12 h-12 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition-all"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    <span className="text-xl">+</span>
                  </Button>
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm">
                  {pricingMode === "wholesale" && (
                    <Badge variant="outline" className="border-orange-300 text-orange-600">
                      MOQ: 2 pieces
                    </Badge>
                  )}
                  <Badge className={`${(selectedVariant?.stockQuantity ?? 0) > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {(selectedVariant?.stockQuantity ?? 0) > 0 ? "✓ In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ₹{subtotal.toLocaleString()}
                  </p>
                  {pricingMode === "wholesale" && savings > 0 && (
                    <p className="text-sm text-green-600 font-semibold">You save ₹{savings.toFixed(2)}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="text-2xl font-bold">{quantity} pcs</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                  onClick={handleAddToCart}
                  disabled={
                    !selectedVariant || 
                    selectedVariant.stockQuantity <= 0 ||
                    (pricingMode === "wholesale" && quantity < 2)
                  }
                >
                  <ShoppingCart className="mr-2" /> Add to Bag
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 h-14 text-lg font-semibold border-2 hover:bg-indigo-50 hover:border-indigo-300 transition-all"
                >
                  {pricingMode === "wholesale" ? "Request Quote" : "Buy Now"}
                  <ChevronRight className="ml-2" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
                <Truck className="text-green-600 w-6 h-6 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-green-900">Free Shipping</p>
                  <p className="text-xs text-green-700">On orders over ₹75</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                <RefreshCw className="text-blue-600 w-6 h-6 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">Easy Returns</p>
                  <p className="text-xs text-blue-700">30-day return policy</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Product Details Sections */}
            <div className="space-y-8 mt-6">
              <section className="bg-white rounded-xl p-6 shadow-md border">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Info className="text-indigo-600" />
                  Product Details
                </h2>
                <div className="prose max-w-none text-muted-foreground leading-relaxed">
                  <p>{productDescription}</p>
                </div>
              </section>

              <section className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-6 shadow-md border">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Award className="text-indigo-600" />
                  Specifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                      <span className="text-sm font-medium text-neutral-600">{k}</span>
                      <span className="text-sm font-bold text-neutral-900">{v}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 shadow-md border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Star className="text-amber-500 fill-amber-500" />
                    Customer Reviews
                  </h2>
                  <Badge className="bg-amber-100 text-amber-800 text-lg px-3 py-1">
                    4.6 ★ (213)
                  </Badge>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 border-2 rounded-xl hover:shadow-md transition-shadow bg-gradient-to-br from-white to-neutral-50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold">
                            C{i}
                          </div>
                          <div>
                            <div className="font-semibold">Customer {i}</div>
                            <div className="text-xs text-muted-foreground">2 days ago</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                          <Star className="text-amber-400 fill-amber-400 w-4 h-4" />
                          <span className="font-bold text-amber-900">4.{i}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Great product! Highly recommended. The quality exceeded my expectations and delivery was fast.
                      </p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full h-12 border-2 hover:bg-indigo-50 hover:border-indigo-300 font-semibold">
                    Write a Review
                  </Button>
                </div>
              </section>

              {product.faqs && product.faqs.length > 0 && (
                <section className="bg-white rounded-xl p-6 shadow-md border">
                  <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                  <Accordion type="multiple" className="w-full">
                    {product.faqs.map((faq: FAQ, index: number) => (
                      <AccordionItem key={index} value={`faq-${index}`} className="border-b-2">
                        <AccordionTrigger className="text-left font-semibold hover:text-indigo-600 transition-colors">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              )}
            </div>

            <Separator />

            <div className="bg-white rounded-xl shadow-md border overflow-hidden">
              <Accordion type="single" collapsible>
                <AccordionItem value="shipping" className="border-b-2">
                  <AccordionTrigger className="px-6 py-4 hover:bg-neutral-50 font-semibold">
                    <div className="flex items-center gap-2">
                      <Truck className="text-indigo-600" />
                      Shipping & Delivery
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {pricingMode === "wholesale" 
                        ? "Bulk orders ship within 5-10 business days. Contact us for expedited shipping options and custom delivery arrangements."
                        : "Standard shipping 3-7 business days. Expedited options available at checkout. Free shipping on orders over ₹75."}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns" className="border-b-2">
                  <AccordionTrigger className="px-6 py-4 hover:bg-neutral-50 font-semibold">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="text-indigo-600" />
                      Returns & Warranty
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      30-day hassle-free returns. 1-year limited warranty on manufacturing defects. Full refund or replacement guaranteed.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                {product.vendor?._id && (
                  <AccordionItem value="seller_details">
                    <AccordionTrigger className="px-6 py-4 hover:bg-neutral-50 font-semibold">
                      <div className="flex items-center gap-2">
                        <Package className="text-indigo-600" />
                        Seller Details
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <Link
                        href={`/vendor/catalog/${product.vendor._id}`}
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold hover:underline flex items-center gap-1"
                      >
                        {product.vendor.name || "N/A"}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          </div>
        </div>

        <MightInterested />

        {/* Mobile Floating Bar */}
        <div className="fixed left-0 right-0 bottom-0 md:hidden z-50">
          <div className="bg-white/95 backdrop-blur-xl border-t-2 border-indigo-200 shadow-2xl p-4">
            <div className="flex gap-3 items-center max-w-3xl mx-auto">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ₹{subtotal.toLocaleString()}
                </p>
              </div>
              <Button 
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 font-semibold shadow-lg"
                disabled={
                  !selectedVariant || 
                  selectedVariant.stockQuantity <= 0 ||
                  (pricingMode === "wholesale" && quantity < 2)
                }
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                Add to Bag
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}