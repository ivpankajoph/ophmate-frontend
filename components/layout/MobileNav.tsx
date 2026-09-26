'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Search, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const { openCart, itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  const handleOpenSearch = () => {
    const btn = document.querySelector('button[aria-label="Search"]') as HTMLButtonElement;
    if (btn) btn.click();
  };

  const links = [
    { name: 'Home', href: '/', icon: Home, isAction: false },
    { name: 'Catalog', href: '/products', icon: Grid, isAction: false },
    { name: 'Search', href: '#', icon: Search, isAction: true, onClick: handleOpenSearch },
    { name: 'Wishlist', href: '/wishlist', icon: Heart, isAction: false, badge: wishlistCount },
    { name: 'Bag', href: '#', icon: ShoppingBag, isAction: true, onClick: openCart, badge: itemCount }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e5e5e5] px-4 py-2.5">
      <div className="flex items-center justify-around">
        {links.map(link => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          if (link.isAction) {
            return (
              <button
                key={link.name}
                onClick={link.onClick}
                className="flex flex-col items-center justify-center p-1 relative text-[#575757] hover:text-[#121212]"
              >
                <Icon className="w-5 h-5 stroke-[1.5]" />
                <span className="text-[10px] tracking-wider mt-1">{link.name}</span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="absolute top-0 right-2 bg-[#c5a880] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          }

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex flex-col items-center justify-center p-1 relative ${
                isActive ? 'text-[#121212] font-medium' : 'text-[#8c8c8c]'
              }`}
            >
              <Icon className="w-5 h-5 stroke-[1.5]" />
              <span className="text-[10px] tracking-wider mt-1">{link.name}</span>
              {link.badge !== undefined && link.badge > 0 && (
                <span className="absolute top-0 right-2 bg-[#121212] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono">
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
