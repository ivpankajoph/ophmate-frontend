'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  position?: string;
  tag: string;
  title: string;
  description: string;
  primaryBtn: { text: string; href: string };
  secondaryBtn: { text: string; href: string };
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2400',
    position: 'center 8%', // Top framing keeps model's full head, hair & sunglasses completely visible
    tag: 'AUTUMN / WINTER 2026',
    title: 'THE NEW SEASON',
    description: 'Defined by architectural simplicity. Sculpted for modern life. Exploring fluid silks, Biella wool tailoring, and quiet luxury.',
    primaryBtn: { text: 'Shop Women', href: '/products?category=women' },
    secondaryBtn: { text: 'Shop Men', href: '/products?category=men' }
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2400',
    position: 'center 16%', // Anchored near top so men's tailored suit shoulders and lapels are in full view
    tag: 'SARTORIAL ATELIER',
    title: 'ARCHITECTURAL TAILORING',
    description: 'Meticulously hand-cut virgin wool blazers, double-breasted overcoats, and pleated trousers crafted in Biella ateliers.',
    primaryBtn: { text: "Explore Men's Wear", href: '/products?category=men' },
    secondaryBtn: { text: 'Discover Blazers', href: '/products?category=men&subCategory=men-blazers' }
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2400',
    position: 'center 20%', // Editorial camel coat in natural wide landscape
    tag: 'HAUTE COUTURE EDITORIAL',
    title: 'TIMELESS SILHOUETTES',
    description: 'Double-faced cashmere coats, architectural capes, and fluid silk pieces designed for effortless modern elegance.',
    primaryBtn: { text: 'Shop Outerwear', href: '/products?category=women&subCategory=dresses' },
    secondaryBtn: { text: 'Fine Jewellery', href: '/products?category=jewellery' }
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2400',
    position: 'center 45%', // Warm luxury fashion atelier & accessories
    tag: 'HOROLOGY & OBJECTS',
    title: 'THE ART OF TIME & FORM',
    description: 'Florentine palmellato calfskin bags, artisanal accessories, and Swiss chronographs engineered with uncompromising precision.',
    primaryBtn: { text: 'Discover Bags', href: '/products?category=bags' },
    secondaryBtn: { text: 'Fine Timepieces', href: '/products?category=jewellery' }
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Autoplay timer (5.5 seconds per slide)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, currentSlide]);

  const goToNext = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  const goToPrev = () => {
    setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[580px] sm:h-[640px] lg:h-[calc(100vh-5.5rem)] lg:max-h-[740px] overflow-hidden bg-[#0a0a0a] select-none"
    >
      {/* Background Slides */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Slide Background Image with tailored focal objectPosition */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              style={{ objectPosition: slide.position || 'center 20%' }}
              className={`object-cover transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-90' : 'opacity-40'
              }`}
            />

            {/* Cinematic Gradient Overlays: Darker on text side (left), transparent on model (right) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            {/* Slide Text Content */}
            <div className="absolute inset-0 flex flex-col justify-end pb-12 sm:pb-16 md:pb-20 px-6 md:px-16 max-w-7xl mx-auto">
              <div
                className={`max-w-xl text-white transition-all duration-700 ease-out ${
                  isActive
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-6 opacity-0'
                }`}
              >
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c5a880] block mb-2 font-medium">
                  {slide.tag}
                </span>

                <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.08] tracking-tight mb-3.5 drop-shadow-sm">
                  {slide.title}
                </h1>

                <p className="text-xs sm:text-sm md:text-[15px] font-light text-[#dedede] leading-relaxed mb-7 max-w-md">
                  {slide.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5">
                  <Link
                    href={slide.primaryBtn.href}
                    className="bg-white text-[#121212] px-7 sm:px-8 py-3 sm:py-3.5 text-xs uppercase tracking-luxury font-medium hover:bg-[#c5a880] hover:text-white transition-all duration-300 shadow-md cursor-pointer"
                  >
                    {slide.primaryBtn.text}
                  </Link>

                  <Link
                    href={slide.secondaryBtn.href}
                    className="border border-white/80 text-white px-7 sm:px-8 py-3 sm:py-3.5 text-xs uppercase tracking-luxury font-medium hover:bg-white hover:text-[#121212] transition-all duration-300 backdrop-blur-xs cursor-pointer"
                  >
                    {slide.secondaryBtn.text}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Manual Slide Navigation Buttons (Left & Right) */}
      <div className="absolute inset-y-0 left-4 md:left-8 flex items-center z-20 pointer-events-none">
        <button
          onClick={goToPrev}
          className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/40 hover:bg-white hover:text-black text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 group shadow-lg cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-4 md:right-8 flex items-center z-20 pointer-events-none">
        <button
          onClick={goToNext}
          className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/40 hover:bg-white hover:text-black text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 group shadow-lg cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Bottom Numbered Indicators with Progress Bar */}
      <div className="absolute bottom-6 md:bottom-8 right-6 md:right-16 z-20 flex items-center gap-3 md:gap-5">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className="group flex flex-col items-start focus:outline-none cursor-pointer"
              aria-label={`Go to slide ${slide.id}`}
            >
              <span
                className={`font-mono text-[10px] md:text-xs tracking-wider transition-colors ${
                  isActive ? 'text-[#c5a880] font-semibold' : 'text-white/60 group-hover:text-white'
                }`}
              >
                0{slide.id}
              </span>

              {/* Progress Line */}
              <div className="w-8 sm:w-12 md:w-16 h-[2px] bg-white/25 mt-1 relative overflow-hidden">
                {isActive && (
                  <div
                    className="absolute inset-0 bg-[#c5a880]"
                    style={{
                      animation: isPaused ? 'none' : 'heroProgress 5.5s linear infinite'
                    }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Progress Keyframe Styles */}
      <style jsx>{`
        @keyframes heroProgress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};
