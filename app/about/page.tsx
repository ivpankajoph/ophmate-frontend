import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 space-y-16">
      <div className="text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] block mb-2 font-medium">
          LA MAISON OPHMNART
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-5xl text-[#121212]">
          Our Heritage & Manifesto
        </h1>
        <p className="text-xs text-[#8c8c8c] mt-2 font-light max-w-md mx-auto">
          Founded on the uncompromising pursuit of architectural simplicity, tactile nobility, and enduring sartorial craftsmanship.
        </p>
      </div>

      <div className="relative aspect-[16/9] bg-[#f5f4f0] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1600"
          alt="OPHMNART Atelier"
          fill
          className="object-cover"
        />
      </div>

      <div className="prose prose-neutral max-w-none text-xs text-[#575757] font-light leading-relaxed space-y-6">
        <p className="text-sm font-normal text-[#121212] leading-relaxed">
          At OPHMNART, luxury is not noise; it is silence perfected. We reject the fleeting cycles of fast disposable fashion in favor of timeless silhouettes cut from virgin wool in Biella, mulberry silks in Como, and full-grain vegetable-tanned calfskin in Tuscany.
        </p>

        <p>
          Every piece in our Haute Édition catalog is conceived as an architectural object designed to live alongside you for decades. We partner exclusively with multi-generational family-owned ateliers across Italy, France, Switzerland, and Japan where ancient techniques coexist seamlessly with modern ergonomic precision.
        </p>

        <h3 className="font-serif-luxury text-2xl text-[#121212] pt-4">Sustainability & Circularity</h3>
        <p>
          Circularity is integral to our existence. 100% of our virgin wool is certified mulesing-free, our silks originate from regenerative sericulture, and all packaging is crafted from FSC-certified cotton-blend boards sealed with natural vegetable inks.
        </p>
      </div>

      <div className="border-t border-[#f0ede6] pt-12 text-center">
        <Link
          href="/products"
          className="inline-block bg-[#121212] text-white text-xs uppercase tracking-luxury px-8 py-4 hover:bg-[#333] transition-colors"
        >
          Explore The Current Edit
        </Link>
      </div>
    </div>
  );
}
