"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, Heart, ShoppingCart, Truck, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

// Mock types
type Variant = { id: string; name: string; priceDiff?: number; image?: string; inStock?: boolean }

type Product = {
  id: string
  title: string
  sku: string
  price: number
  rating: number
  reviews: number
  images: string[]
  variants: Variant[]
  description: string
  features: string[]
  specs: Record<string, string>
}

// Mock product data (replace with real API data)
const PRODUCT: Product = {
  id: "p-001",
  title: "PulseWave BeatPods Pro",
  sku: "PW-BP-2025",
  price: 162,
  rating: 4.6,
  reviews: 213,
  images: [
    "/images/product-hero-1.jpg",
    "/images/product-hero-2.jpg",
    "/images/product-hero-3.jpg",
    "/images/product-hero-4.jpg",
  ],
  variants: [
    { id: "v-black", name: "Black", image: "/images/product-hero-1.jpg", inStock: true },
    { id: "v-green", name: "Green", image: "/images/product-hero-2.jpg", inStock: true },
    { id: "v-white", name: "White", image: "/images/product-hero-3.jpg", inStock: false },
  ],
  description:
    "Experience the next level of audio immersion with PulseWave BeatPods Pro. These wireless headphones deliver crystal clear sound quality and powerful bass, perfect for music lovers and gamers alike.",
  features: [
    "Active Noise Cancellation",
    "30 hours battery life",
    "Fast charge: 10 min = 4 hours",
    "Bluetooth 5.3",
    "IPX4 sweat resistant",
  ],
  specs: {
    Weight: "250g",
    Driver: "40mm Dynamic",
    Battery: "30 hours",
    Connectivity: "Bluetooth 5.3",
  },
}

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState<string>(PRODUCT.images[0])
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(PRODUCT.variants[0])
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [isZoom, setIsZoom] = useState(false)
  const mainRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // update main image when variant changes
    if (selectedVariant?.image) setSelectedImage(selectedVariant.image)
  }, [selectedVariant])

  const subtotal = useMemo(() => {
    const base = PRODUCT.price + (selectedVariant?.priceDiff || 0)
    return base * quantity
  }, [quantity, selectedVariant])

  // Accessibility: keyboard thumbnail navigation
  const onThumbKey = (e: React.KeyboardEvent<HTMLButtonElement>, img: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setSelectedImage(img)
    }
  }

  // Simple add to cart handler (replace with global store / API)
  const handleAddToCart = () => {
    // TODO: connect with global cart (Zustand/Redux) & analytics
    alert(`Added ${quantity} × ${PRODUCT.title} (${selectedVariant?.name}) to cart — $${subtotal.toFixed(2)}`)
  }

  // Zoom effect: on hover, enable transform on image
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isZoom || !mainRef.current) return
    const rect = mainRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    mainRef.current.style.backgroundPosition = `${x}% ${y}%`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Gallery */}
        <div className="lg:col-span-6">
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {PRODUCT.images.map((img) => (
                <button
                  key={img}
                  aria-label={`View product image`}
                  onClick={() => setSelectedImage(img)}
                  onKeyDown={(e) => onThumbKey(e, img)}
                  className={`w-20 h-20 rounded-md overflow-hidden border ${selectedImage === img ? "ring-2 ring-indigo-500" : "border-neutral-200"}`}
                >
                  <Image src={img} alt="thumb" width={80} height={80} className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image with zoom + animation */}
            <div className="flex-1 relative">
              <motion.div
                ref={mainRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoom(true)}
                onMouseLeave={() => {
                  setIsZoom(false)
                  if (mainRef.current) mainRef.current.style.backgroundPosition = "center"
                }}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="w-full rounded-xl overflow-hidden bg-neutral-100"
                style={{ height: 520, backgroundSize: isZoom ? "200%" : "cover", backgroundPosition: "center" }}
              >
                {/* Using Image inside for responsive optimization; background used for zoom transform */}
                <Image
                  src={selectedImage}
                  alt={PRODUCT.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: "center" }}
                />

                {/* badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">In stock</Badge>
                </div>

                {/* small thumbnails overlay on mobile */}
                <div className="absolute bottom-4 left-4 right-4 hidden md:flex gap-2 justify-center">
                  {PRODUCT.images.map((img) => (
                    <button key={img} onClick={() => setSelectedImage(img)} className={`w-16 h-16 rounded-md overflow-hidden border ${selectedImage === img ? "ring-2 ring-indigo-500" : "border-neutral-200"}`}>
                      <Image src={img} alt="mini" width={64} height={64} className="object-cover" />
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* quick actions (wishlist, share) */}
              <div className="mt-3 flex gap-3">
                <Button variant="outline" onClick={() => setWishlisted((s) => !s)}>
                  <Heart className="mr-2" /> {wishlisted ? "Wishlisted" : "Add to favorites"}
                </Button>
                <Button variant="ghost">Share</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Info & Actions */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-extrabold">{PRODUCT.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <Star className="text-amber-400" />
                <span className="font-semibold">{PRODUCT.rating}</span>
                <span className="text-sm text-muted-foreground">({PRODUCT.reviews} reviews)</span>
              </div>

              <Separator orientation="vertical" className="h-6" />

              <div className="text-sm text-muted-foreground">SKU: {PRODUCT.sku}</div>
            </div>

            <div className="mt-4">
              <div className="flex items-baseline gap-3">
                <div className="text-2xl font-bold">${PRODUCT.price.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Inclusive of taxes</div>
              </div>
            </div>

            <p className="mt-4 text-muted-foreground max-w-prose">{PRODUCT.description}</p>
          </div>

          {/* Variants */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <div>
              <div className="text-sm font-medium mb-2">Color</div>
              <div className="flex gap-2 flex-wrap">
                {PRODUCT.variants.map((v) => (
                  <button
                    key={v.id}
                    aria-pressed={selectedVariant?.id === v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-3 py-2 rounded-md border ${selectedVariant?.id === v.id ? "ring-2 ring-indigo-500 bg-indigo-50" : "bg-white"} text-sm flex items-center gap-2`}
                  >
                    {v.image && (
                      <Image src={v.image} alt={v.name} width={36} height={36} className="object-cover rounded-sm" />
                    )}
                    <span>{v.name}</span>
                    {!v.inStock && <span className="text-xs text-red-500">Out</span>}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Quantity</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</Button>
                <Input value={String(quantity)} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))} className="w-20 text-center" />
                <Button variant="outline" size="icon" onClick={() => setQuantity((q) => q + 1)}>+</Button>
              </div>

              <div className="mt-2 text-sm text-muted-foreground">Available: {selectedVariant?.inStock ? "In stock" : "Out of stock"}</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button className="flex-1 flex items-center justify-center gap-2 py-4" onClick={handleAddToCart} disabled={!selectedVariant?.inStock}>
              <ShoppingCart /> Add to Bag — ${subtotal.toFixed(2)}
            </Button>

            <Button variant="outline" className="flex-1 py-4">Buy it now</Button>
          </div>

          <div className="flex gap-6 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck /> <span>Free shipping over $75</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw /> <span>30 days return</span>
            </div>
          </div>

          <Separator />

          {/* Tabs: description, specs, reviews */}
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({PRODUCT.reviews})</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4">
              <div className="prose max-w-none">
                <p>{PRODUCT.description}</p>
                <ul>
                  {PRODUCT.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-4">
              <div className="grid grid-cols-2 gap-3 max-w-md">
                {Object.entries(PRODUCT.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{k}</span>
                    <span className="text-sm font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-4">
                {/* Mocked reviews */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">Customer {i}</div>
                        <div className="text-sm text-muted-foreground">2 days ago</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="text-amber-400" /> <span className="font-medium">4.{i}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">Great sound quality and comfortable fit — recommended!</p>
                  </div>
                ))}

                <Button variant="ghost">Write a review</Button>
              </div>
            </TabsContent>
          </Tabs>

          <Separator />

          {/* Accordion for shipping & returns */}
          <div className="mt-4">
            <Accordion type="single">
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Delivery</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">Standard shipping 3-7 business days. Expedited options available at checkout.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="returns">
                <AccordionTrigger>Returns & Warranty</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">30-day returns. 1-year limited warranty on manufacturing defects.</p>
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
            <motion.div key={i} whileHover={{ scale: 1.03 }} className="min-w-[220px] p-3 rounded-xl border bg-white">
              <div className="relative h-40 w-full rounded-md overflow-hidden mb-3">
                <Image src={`/images/product-${(i % 6) + 1}.jpg`} alt={`rel-${i}`} fill className="object-cover" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-sm">Related Product {i + 1}</div>
                  <div className="text-xs text-muted-foreground">$${(20 + i * 10).toFixed(2)}</div>
                </div>
                <Button size="icon">+</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sticky bottom CTA for mobile */}
      <div className="fixed left-0 right-0 bottom-4 md:hidden px-4">
        <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur rounded-full p-2 flex gap-3 items-center shadow-lg">
          <div className="flex-1 text-sm font-medium">{PRODUCT.title} • ${subtotal.toFixed(2)}</div>
          <Button onClick={handleAddToCart} className="py-3">Add to bag</Button>
        </div>
      </div>
    </div>
  )
}
