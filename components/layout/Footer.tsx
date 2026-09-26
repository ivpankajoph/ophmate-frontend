'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0a0a0a] text-[#ededed] pt-20 pb-12 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#262626] items-end">
          <div className="lg:col-span-6">
            <span className="text-[10px] tracking-luxury uppercase text-[#c5a880] block mb-2 font-medium">
              STAY IN TOUCH
            </span>
            <h3 className="font-serif-luxury text-3xl md:text-4xl font-normal text-white mb-3">
              JOIN THE WORLD OF OPHMNART
            </h3>
            <p className="text-xs text-[#8c8c8c] font-light leading-relaxed max-w-md">
              Receive private invitations to runway previews, archive capsule sales, and editorial perspectives on contemporary design.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#c5a880] py-3">
                <Check className="w-4 h-4" /> Thank you for subscribing. You are now part of our private clientele.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex border-b border-[#404040] focus-within:border-white transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-transparent py-3 text-sm text-white placeholder-[#737373] focus:outline-none font-light"
                />
                <button
                  type="submit"
                  className="text-xs uppercase tracking-luxury text-white hover:text-[#c5a880] px-4 py-3 flex items-center gap-2 transition-colors flex-shrink-0"
                >
                  Subscribe <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[10px] text-[#575757] mt-3">
              By subscribing, you agree to our Privacy Policy and terms of clientele engagement.
            </p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-16 border-b border-[#262626]">
          {/* Shop */}
          <div>
            <h4 className="text-xs uppercase tracking-luxury text-[#c5a880] mb-5 font-medium">
              Shop
            </h4>
            <ul className="space-y-3 text-xs font-light text-[#a0a0a0]">
              <li><Link href="/products?category=women" className="hover:text-white transition-colors">Women</Link></li>
              <li><Link href="/products?category=men" className="hover:text-white transition-colors">Men</Link></li>
              <li><Link href="/products?category=shoes" className="hover:text-white transition-colors">Shoes</Link></li>
              <li><Link href="/products?category=bags" className="hover:text-white transition-colors">Bags</Link></li>
              <li><Link href="/products?category=jewellery" className="hover:text-white transition-colors">Jewellery & Watches</Link></li>
              <li><Link href="/products?category=home" className="hover:text-white transition-colors">Home & Objects</Link></li>
            </ul>
          </div>

          {/* Client Service */}
          <div>
            <h4 className="text-xs uppercase tracking-luxury text-[#c5a880] mb-5 font-medium">
              Client Care
            </h4>
            <ul className="space-y-3 text-xs font-light text-[#a0a0a0]">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Concierge</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Care Guide & Sizing</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">Track Your Order</Link></li>
            </ul>
          </div>

          {/* Maison */}
          <div>
            <h4 className="text-xs uppercase tracking-luxury text-[#c5a880] mb-5 font-medium">
              Maison
            </h4>
            <ul className="space-y-3 text-xs font-light text-[#a0a0a0]">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Heritage</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Atelier & Craft</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Sustainability Manifesto</Link></li>
              <li><Link href="/brands" className="hover:text-white transition-colors">Design Houses</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-luxury text-[#c5a880] mb-5 font-medium">
              Legal
            </h4>
            <ul className="space-y-3 text-xs font-light text-[#a0a0a0]">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Cookie Preferences</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs uppercase tracking-luxury text-[#c5a880] mb-5 font-medium">
              Follow
            </h4>
            <ul className="space-y-3 text-xs font-light text-[#a0a0a0]">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Pinterest</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">YouTube Editorial</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#575757]">
          <p>© {new Date().getFullYear()} OPHMNART Luxury Inc. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-serif-luxury tracking-widest text-[#8c8c8c]">
            MILAN — PARIS — LONDON — TOKYO — MUMBAI
          </p>
        </div>
      </div>
    </footer>
  );
};
