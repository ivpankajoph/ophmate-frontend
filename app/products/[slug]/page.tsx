'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Heart,
  ShoppingBag,
  Star,
  ChevronDown,
  ChevronUp,
  Shield,
  Truck,
  RotateCcw,
  Check,
  Maximize2,
  X
} from 'lucide-react';
import { ProductGrid } from '../../../components/product/ProductGrid';
import { fetchApi } from '../../../lib/api';
import { IProduct, IReview } from '../../../types';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [recommendations, setRecommendations] = useState<{
    similar: IProduct[];
    completeLook: IProduct[];
  }>({ similar: [], completeLook: [] });
  const [reviewsData, setReviewsData] = useState<{
    reviews: IReview[];
    breakdown: Record<number, number>;
    averageRating: number;
    total: number;
  }>({ reviews: [], breakdown: {}, averageRating: 5, total: 0 });

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [openAccordion, setOpenAccordion] = useState<string>('description');
  const [isAdding, setIsAdding] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Review Form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  useEffect(() => {
    const loadProductData = async () => {
      try {
        const res = await fetchApi<{
          product: IProduct;
          recommendations: { similar: IProduct[]; completeLook: IProduct[] };
        }>(`/products/${resolvedParams.slug}`);

        if (res.success && res.data) {
          setProduct(res.data.product);
          setRecommendations(res.data.recommendations || { similar: [], completeLook: [] });
          if (res.data.product.colors?.[0]) setSelectedColor(res.data.product.colors[0]);
          if (res.data.product.sizes?.[0]) setSelectedSize(res.data.product.sizes[0]);

          // Load Reviews
          const revRes = await fetchApi(`/reviews?productId=${res.data.product._id}`);
          if (revRes.success && revRes.data) {
            setReviewsData(revRes.data);
          }
        }
      } catch (err) {
        console.error('Failed to load product detail:', err);
      }
    };

    loadProductData();
  }, [resolvedParams.slug]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xs uppercase tracking-luxury text-[#8c8c8c]">
        Summoning Haute Édition Piece...
      </div>
    );
  }

  const inWishlist = isInWishlist(product._id);
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(product._id, undefined, 1);
    setIsAdding(false);
  };

  const handleBuyNow = async () => {
    setIsAdding(true);
    await addToCart(product._id, undefined, 1);
    setIsAdding(false);
    router.push('/checkout');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitting(true);
    try {
      const res = await fetchApi('/reviews', {
        method: 'POST',
        body: JSON.stringify({
          productId: product._id,
          rating: reviewRating,
          title: reviewTitle,
          comment: reviewComment
        })
      });
      if (res.success) {
        setIsReviewModalOpen(false);
        // Refresh reviews
        const revRes = await fetchApi(`/reviews?productId=${product._id}`);
        if (revRes.success && revRes.data) setReviewsData(revRes.data);
      } else {
        alert(res.message || 'Please log in to submit a verified review');
      }
    } finally {
      setReviewSubmitting(false);
    }
  };

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? '' : name);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-luxury text-[#8c8c8c] mb-8">
        <Link href="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link href={`/products?category=${typeof product.category === 'object' ? product.category.slug : ''}`} className="hover:text-black">
          {typeof product.category === 'object' ? product.category.name : 'Catalog'}
        </Link>
        <span>/</span>
        <span className="text-[#121212] font-medium truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Luxury Editorial Image Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Vertical Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[750px] flex-shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 md:w-20 aspect-[3/4] bg-[#f5f4f0] flex-shrink-0 border transition-all ${
                    selectedImage === idx ? 'border-[#121212] ring-1 ring-black' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <Image src={img.secure_url} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main Large Image */}
          <div className="relative flex-1 aspect-luxury-card bg-[#f4f3ee] overflow-hidden group">
            {product.images?.[selectedImage]?.secure_url && (
              <Image
                src={product.images[selectedImage].secure_url}
                alt={product.name}
                fill
                priority
                className="object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-700"
                onClick={() => setIsZoomOpen(true)}
              />
            )}
            <button
              onClick={() => setIsZoomOpen(true)}
              className="absolute bottom-4 right-4 bg-white/80 p-2.5 rounded-full hover:bg-white text-[#121212] transition-colors"
              title="Zoom image"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Purchase and Detail Specifications */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-luxury text-[#8c8c8c] font-medium block mb-1.5">
              {typeof product.brand === 'object' ? product.brand.name : 'OPHMNART'}
            </span>
            <h1 className="font-serif-luxury text-3xl md:text-4xl text-[#121212] font-normal leading-tight mb-2">
              {product.name}
            </h1>

            {/* Ratings and Reviews count */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-[#c5a880]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.ratings || 5)
                        ? 'fill-current text-[#c5a880]'
                        : 'text-[#e5e5e5]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-[#575757] font-light">
                {product.ratings?.toFixed(1) || '4.9'} ({product.reviewsCount || reviewsData.total || 0} reviews)
              </span>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-2xl font-medium text-[#121212]">
                ₹{product.price.toLocaleString()}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-sm text-[#8c8c8c] line-through">
                    ₹{product.compareAtPrice?.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#c5a880] font-medium tracking-luxury uppercase">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-[11px] text-[#8c8c8c] font-light">Inclusive of all duties & luxury taxes.</p>
          </div>

          <div className="border-t border-[#f0ede6] pt-6 space-y-5">
            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="text-xs uppercase tracking-luxury text-[#121212] font-medium block mb-2.5">
                  Colour: <span className="font-normal text-[#575757]">{selectedColor}</span>
                </span>
                <div className="flex gap-2.5">
                  {product.colors.map(col => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`text-xs border px-3.5 py-1.5 transition-all ${
                        selectedColor === col
                          ? 'border-[#121212] bg-[#121212] text-white font-medium'
                          : 'border-[#e5e5e5] text-[#121212] hover:border-black'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs uppercase tracking-luxury text-[#121212] font-medium">
                    Size: <span className="font-normal text-[#575757]">{selectedSize}</span>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[11px] text-[#8c8c8c] hover:text-[#121212] underline uppercase tracking-wider"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-11 h-11 text-xs border flex items-center justify-center transition-all ${
                        selectedSize === sz
                          ? 'border-[#121212] bg-[#121212] text-white font-medium'
                          : 'border-[#e5e5e5] text-[#121212] hover:border-black'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Inventory Status */}
            <div className="flex items-center gap-2 text-xs text-[#2e7d32]">
              <Check className="w-3.5 h-3.5" />
              <span>In Stock — Dispatched within 24 hours</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <div className="flex gap-2.5">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || product.inventory <= 0}
                  className="flex-1 bg-purple-600 text-white text-xs uppercase tracking-luxury py-4 flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors disabled:bg-[#ccc]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {product.inventory <= 0 ? 'Out of Stock' : isAdding ? 'Adding to Bag...' : 'Add to Bag'}
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 border border-[#e5e5e5] hover:border-[#121212] transition-colors ${
                    inWishlist ? 'text-red-600 border-red-200' : 'text-[#121212]'
                  }`}
                  title={inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={product.inventory <= 0}
                className="w-full border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white text-xs uppercase tracking-luxury py-3.5 transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Accordion Specs */}
          <div className="border-t border-[#f0ede6] divide-y divide-[#f0ede6] pt-2">
            {/* Description */}
            <div className="py-3.5">
              <button
                onClick={() => toggleAccordion('description')}
                className="w-full flex items-center justify-between text-xs uppercase tracking-luxury font-medium text-[#121212] text-left"
              >
                <span>Description & Composition</span>
                {openAccordion === 'description' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'description' && (
                <div className="mt-3 text-xs text-[#575757] font-light leading-relaxed space-y-2">
                  <p>{product.description}</p>
                  {product.material && <p><strong>Material:</strong> {product.material}</p>}
                </div>
              )}
            </div>

            {/* Details & Fit */}
            <div className="py-3.5">
              <button
                onClick={() => toggleAccordion('fit')}
                className="w-full flex items-center justify-between text-xs uppercase tracking-luxury font-medium text-[#121212] text-left"
              >
                <span>Details & Fit</span>
                {openAccordion === 'fit' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'fit' && (
                <div className="mt-3 text-xs text-[#575757] font-light leading-relaxed space-y-1.5">
                  <p>Fit: {product.details?.fit || 'True to luxury European sizing.'}</p>
                  <p>Origin: Handcrafted in {product.details?.origin || 'Milan, Italy'}</p>
                  <p>SKU: {product.sku}</p>
                </div>
              )}
            </div>

            {/* Care Instructions */}
            <div className="py-3.5">
              <button
                onClick={() => toggleAccordion('care')}
                className="w-full flex items-center justify-between text-xs uppercase tracking-luxury font-medium text-[#121212] text-left"
              >
                <span>Material & Care Instructions</span>
                {openAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'care' && (
                <ul className="mt-3 text-xs text-[#575757] font-light leading-relaxed list-disc list-inside space-y-1">
                  {product.details?.careInstructions?.map((c, i) => (
                    <li key={i}>{c}</li>
                  )) || (
                    <>
                      <li>Specialist dry clean only</li>
                      <li>Do not bleach or tumble dry</li>
                      <li>Store on wooden contoured hanger</li>
                    </>
                  )}
                </ul>
              )}
            </div>

            {/* Shipping & Returns */}
            <div className="py-3.5">
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full flex items-center justify-between text-xs uppercase tracking-luxury font-medium text-[#121212] text-left"
              >
                <span>Complimentary Delivery & Returns</span>
                {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'shipping' && (
                <div className="mt-3 text-xs text-[#575757] font-light leading-relaxed space-y-1.5">
                  <p>Express 2–4 business days delivery in bespoke gift box packaging.</p>
                  <p>Complimentary 30-day doorstep returns and direct exchanges.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <section className="mt-24 pt-16 border-t border-[#f0ede6]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-luxury text-[#c5a880] block mb-1 font-medium">
              Client Appraisals
            </span>
            <h2 className="font-serif-luxury text-3xl md:text-4xl text-[#121212] font-normal">
              Ratings & Reviews
            </h2>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="border border-[#121212] text-xs uppercase tracking-luxury px-6 py-3 hover:bg-[#121212] hover:text-white transition-colors"
          >
            Write a Review
          </button>
        </div>

        {/* Rating Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 bg-[#faf9f6] p-8 border border-[#f0ede6]">
          <div className="md:col-span-4 flex flex-col justify-center items-center md:items-start md:border-r border-[#e5e5e5] pr-6">
            <span className="font-serif-luxury text-5xl text-[#121212]">
              {reviewsData.averageRating?.toFixed(1) || '4.9'}
            </span>
            <div className="flex items-center text-[#c5a880] my-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-[#8c8c8c] font-light">
              Based on {reviewsData.total} verified client purchases
            </p>
          </div>

          <div className="md:col-span-8 flex flex-col justify-center space-y-2">
            {[5, 4, 3, 2, 1].map(stars => {
              const count = reviewsData.breakdown?.[stars] || 0;
              const percent = reviewsData.total > 0 ? (count / reviewsData.total) * 100 : stars === 5 ? 75 : 15;
              return (
                <div key={stars} className="flex items-center gap-3 text-xs">
                  <span className="w-12 text-[#575757] font-light">{stars} stars</span>
                  <div className="flex-1 h-1.5 bg-[#e5e5e5] overflow-hidden">
                    <div className="h-full bg-[#121212]" style={{ width: `${percent}%` }} />
                  </div>
                  <span className="w-8 text-right text-[#8c8c8c] font-mono">{Math.round(percent)}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews List */}
        <div className="divide-y divide-[#f0ede6]">
          {reviewsData.reviews?.length > 0 ? (
            reviewsData.reviews.map(rev => (
              <div key={rev._id} className="py-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-[#121212]">{rev.userName}</span>
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] bg-[#f0ede6] text-[#121212] px-2 py-0.5 uppercase tracking-wider flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#2e7d32]" /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#8c8c8c]">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex text-[#c5a880] mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'text-gray-200'}`}
                    />
                  ))}
                </div>

                <h4 className="text-xs font-medium text-[#121212] mb-1">{rev.title}</h4>
                <p className="text-xs text-[#575757] font-light leading-relaxed">{rev.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-[#8c8c8c] py-6 font-light">
              No reviews submitted yet for this piece. Be the first to share your appraisal.
            </p>
          )}
        </div>
      </section>

      {/* RECOMMENDATIONS: COMPLETE THE LOOK & SIMILAR PRODUCTS */}
      {recommendations.completeLook?.length > 0 && (
        <section className="mt-24 pt-16 border-t border-[#f0ede6]">
          <div className="mb-10">
            <span className="text-[10px] uppercase tracking-luxury text-[#c5a880] block mb-1 font-medium">
              Sartorial Pairing
            </span>
            <h2 className="font-serif-luxury text-3xl md:text-4xl text-[#121212] font-normal">
              Complete The Look
            </h2>
          </div>
          <ProductGrid products={recommendations.completeLook} columns={3} />
        </section>
      )}

      {recommendations.similar?.length > 0 && (
        <section className="mt-24 pt-16 border-t border-[#f0ede6]">
          <div className="mb-10">
            <span className="text-[10px] uppercase tracking-luxury text-[#c5a880] block mb-1 font-medium">
              Harmonious Compositions
            </span>
            <h2 className="font-serif-luxury text-3xl md:text-4xl text-[#121212] font-normal">
              You May Also Like
            </h2>
          </div>
          <ProductGrid products={recommendations.similar} columns={4} />
        </section>
      )}

      {/* Fullscreen Zoom Modal */}
      {isZoomOpen && (
        <div
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-[120] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 text-white p-2"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-4xl h-[85vh]">
            {product.images?.[selectedImage]?.secure_url && (
              <Image
                src={product.images[selectedImage].secure_url}
                alt="Zoomed view"
                fill
                className="object-contain"
              />
            )}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full p-8 shadow-2xl relative">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif-luxury text-2xl mb-4">Haute Édition Sizing Guide</h3>
            <p className="text-xs text-gray-600 mb-4 font-light">
              Measurements conform to tailored European specifications (in inches):
            </p>
            <table className="w-full text-xs text-left border-collapse border border-gray-200 mb-6">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 border border-gray-200">Size</th>
                  <th className="p-2 border border-gray-200">Chest</th>
                  <th className="p-2 border border-gray-200">Waist</th>
                  <th className="p-2 border border-gray-200">Length</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border border-gray-200 font-medium">S</td><td className="p-2 border border-gray-200">38"</td><td className="p-2 border border-gray-200">30"</td><td className="p-2 border border-gray-200">28"</td></tr>
                <tr><td className="p-2 border border-gray-200 font-medium">M</td><td className="p-2 border border-gray-200">40"</td><td className="p-2 border border-gray-200">32"</td><td className="p-2 border border-gray-200">29"</td></tr>
                <tr><td className="p-2 border border-gray-200 font-medium">L</td><td className="p-2 border border-gray-200">42"</td><td className="p-2 border border-gray-200">34"</td><td className="p-2 border border-gray-200">30"</td></tr>
                <tr><td className="p-2 border border-gray-200 font-medium">XL</td><td className="p-2 border border-gray-200">44"</td><td className="p-2 border border-gray-200">36"</td><td className="p-2 border border-gray-200">31"</td></tr>
              </tbody>
            </table>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full bg-[#121212] text-white text-xs uppercase tracking-luxury py-3"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

      {/* Write Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white max-w-lg w-full p-8 shadow-2xl relative">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif-luxury text-2xl mb-1">Client Appraisal</h3>
            <p className="text-xs text-gray-500 mb-6 font-light">
              Reviewing: {product.name}
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-luxury block mb-2 font-medium">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(st => (
                    <button
                      type="button"
                      key={st}
                      onClick={() => setReviewRating(st)}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          st <= reviewRating
                            ? 'text-[#c5a880] fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-luxury block mb-1 font-medium">
                  Headline
                </label>
                <input
                  type="text"
                  required
                  value={reviewTitle}
                  onChange={e => setReviewTitle(e.target.value)}
                  placeholder="e.g. Exceptional tailoring and silk drape"
                  className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-luxury block mb-1 font-medium">
                  Appraisal Notes
                </label>
                <textarea
                  required
                  rows={4}
                  value={reviewComment}
                  onChange={e => setReviewComment(e.target.value)}
                  placeholder="Share details on texture, silhouette fit, and craft..."
                  className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                disabled={reviewSubmitting}
                className="w-full bg-[#121212] text-white text-xs uppercase tracking-luxury py-3.5 hover:bg-[#333] transition-colors"
              >
                {reviewSubmitting ? 'Submitting Appraisal...' : 'Submit Appraisal'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
