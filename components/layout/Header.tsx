'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, User as UserIcon, Shield } from 'lucide-react';
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

  const navCategories = ['Women', 'Men', 'Shoes', 'Bags', 'Jewellery', 'Living'];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'header-glass border-b border-[#e5e5e5] py-3.5 shadow-sm'
            : 'bg-white/90 border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href="/collections/new-arrivals"
              className="text-xs uppercase tracking-luxury font-medium text-[#121212] hover:text-[#c5a880] transition-colors"
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
                  className={`text-xs uppercase tracking-luxury font-light text-[#121212] hover:text-[#c5a880] transition-colors ${
                    activeMegaMenu === cat ? 'text-[#c5a880]' : ''
                  }`}
                >
                  {cat}
                </Link>
              </div>
            ))}
            <Link
              href="/collections/sale"
              className="text-xs uppercase tracking-luxury font-medium text-[#c5a880] hover:text-[#9c7c4e] transition-colors"
            >
              Private Sale
            </Link>
          </nav>

          {/* Center Brand Logo */}
          <div className="flex-1 lg:flex-initial text-center lg:text-center">
            <Link href="/" className="inline-block group">
              <span className="font-serif-luxury text-2xl md:text-3xl tracking-luxury-wide font-normal text-[#121212] group-hover:opacity-80 transition-opacity">
                OPHMNART
              </span>
              <span className="block text-[8px] uppercase tracking-[0.35em] text-[#8c8c8c] -mt-1 text-center">
                HAUTE ÉDITION
              </span>
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-[#121212] hover:text-[#c5a880] transition-colors flex items-center gap-1.5"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[1.5]" />
              <span className="hidden md:inline text-xs font-light text-[#575757]">Search</span>
            </button>

            {/* Account Link */}
            <Link
              href={user ? '/account' : '/login'}
              className="text-[#121212] hover:text-[#c5a880] transition-colors relative"
              aria-label="Account"
            >
              <UserIcon className="w-4 h-4 stroke-[1.5]" />
            </Link>

            {/* Admin Quick Link */}
            {isAdmin && (
              <Link
                href="/admin"
                className="hidden md:flex items-center gap-1 text-[11px] uppercase tracking-luxury bg-[#121212] text-white px-2.5 py-1 hover:bg-[#333] transition-colors"
                title="Admin Dashboard"
              >
                <Shield className="w-3 h-3 text-[#c5a880]" /> Admin
              </Link>
            )}

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="text-[#121212] hover:text-[#c5a880] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#121212] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Bag Icon with Drawer Trigger */}
            <button
              onClick={openCart}
              className="text-[#121212] hover:text-[#c5a880] transition-colors relative flex items-center gap-1"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#c5a880] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono">
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
