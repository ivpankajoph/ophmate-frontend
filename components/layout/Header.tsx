'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, User as UserIcon, Shield, Sparkles } from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { SearchOverlay } from '../ui/SearchOverlay';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { openCart, itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { user, isAdmin } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navCategories = ['Women', 'Men', 'Shoes'];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'header-glass border-b border-[#e5e5e5] py-3.5 shadow-xs'
            : 'bg-white/95 border-b border-[#f0ede6] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-4 md:gap-6">
          {/* LEFT: BRAND LOGO WITH IMAGE + NAME */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0 group">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Ophmart Logo"
                fill
                priority
                className="object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#121212] group-hover:text-purple-600 transition-colors">
                Ophmart
              </span>
            </div>
          </Link>

          {/* CENTER: NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link
              href="/collections/new-arrivals"
              className="text-xs uppercase tracking-luxury font-medium text-[#121212] hover:text-purple-600 transition-colors"
            >
              New
            </Link>
            {navCategories.map(cat => (
              <div
                key={cat}
                onMouseEnter={() => setActiveMegaMenu(cat)}
                className="relative cursor-pointer py-1"
              >
                <Link
                  href={`/products?category=${cat.toLowerCase()}`}
                  className={`text-xs uppercase tracking-luxury font-light text-[#121212] hover:text-purple-600 transition-colors ${
                    activeMegaMenu === cat ? 'text-purple-600 font-medium' : ''
                  }`}
                >
                  {cat}
                </Link>
              </div>
            ))}
            <Link
              href="/collections/sale"
              className="text-xs uppercase tracking-luxury font-medium text-[#c5a880] hover:text-purple-600 transition-colors"
            >
              Private Sale
            </Link>
          </nav>

          {/* RIGHT: BECOME PARTNER BUTTON & ACTION ICONS */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
            {/* Become our Partner Button - Purple */}
            <Link
              href="/partner"
              className="text-[10px] sm:text-[11px] uppercase tracking-luxury font-medium px-3.5 py-1.5 bg-purple-600 text-white hover:bg-purple-700 border border-purple-600 rounded-none transition-colors flex-shrink-0"
            >
              Become our Partner
            </Link>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-[#121212] hover:text-purple-600 transition-colors flex items-center gap-1.5 cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[1.5]" />
              <span className="hidden md:inline text-xs font-light text-[#575757] hover:text-[#121212]">
                Search
              </span>
            </button>

            {/* Account Link */}
            <Link
              href={user ? '/account' : '/login'}
              className="text-[#121212] hover:text-purple-600 transition-colors relative"
              aria-label="Account"
            >
              <UserIcon className="w-4 h-4 stroke-[1.5]" />
            </Link>

            {/* Admin Quick Link */}
            {isAdmin && (
              <Link
                href="/admin"
                className="hidden md:flex items-center gap-1 text-[10px] uppercase tracking-luxury bg-purple-600 text-white px-2 py-1 rounded-none hover:bg-purple-700 transition-colors"
                title="Admin Dashboard"
              >
                <Shield className="w-3 h-3 text-[#c5a880]" /> Admin
              </Link>
            )}

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="text-[#121212] hover:text-purple-600 transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-purple-600 text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Bag Icon with Drawer Trigger */}
            <button
              onClick={openCart}
              className="text-[#121212] hover:text-purple-600 transition-colors relative flex items-center gap-1 cursor-pointer"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-purple-600 text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        {activeMegaMenu && (
          <MegaMenu
            category={activeMegaMenu}
            onClose={() => setActiveMegaMenu(null)}
          />
        )}
      </header>

      {/* Global Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
