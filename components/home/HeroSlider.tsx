'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const HeroSlider: React.FC = () => {
  return (
    <section className="relative w-full bg-[#98d1e2] overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto">
        <Link
          href="/products"
          className="group block relative w-full aspect-[934/350] cursor-pointer"
          aria-label="New Sale - Up to 50% Off - Shop Online"
        >
          <Image
            src="/banners/home-banner.jpg"
            alt="New Sale - Up to 50% Off"
            fill
            priority
            sizes="(max-width: 1920px) 100vw, 1920px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01]"
          />
        </Link>
      </div>
    </section>
  );
};
