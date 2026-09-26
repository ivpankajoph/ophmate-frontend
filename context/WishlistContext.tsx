'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IProduct } from '../types';
import { fetchApi } from '../lib/api';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  wishlistIds: string[];
  wishlistItems: IProduct[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: IProduct) => Promise<void>;
  isLoading: boolean;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [wishlistItems, setWishlistItems] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize from LocalStorage or fetch if authenticated
  useEffect(() => {
    const loadWishlist = async () => {
      setIsLoading(true);
      if (user) {
        // Authenticated user
        try {
          const res = await fetchApi<IProduct[]>('/wishlist');
          if (res.success && res.data) {
            setWishlistItems(res.data);
            setWishlistIds(res.data.map(p => p._id));
          }
        } catch (err) {
          console.error('Error fetching server wishlist:', err);
        }
      } else {
        // Guest user local storage
        const saved = localStorage.getItem('ophmart_guest_wishlist');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            setWishlistIds(parsed.map((p: any) => p._id || p));
            setWishlistItems(parsed);
          } catch {
            setWishlistIds([]);
            setWishlistItems([]);
          }
        }
      }
      setIsLoading(false);
    };

    loadWishlist();
  }, [user]);

  const isInWishlist = (productId: string) => {
    return wishlistIds.includes(productId);
  };

  const toggleWishlist = async (product: IProduct) => {
    const isPresent = wishlistIds.includes(product._id);
    const newIds = isPresent
      ? wishlistIds.filter(id => id !== product._id)
      : [...wishlistIds, product._id];

    const newItems = isPresent
      ? wishlistItems.filter(p => p._id !== product._id)
      : [...wishlistItems, product];

    setWishlistIds(newIds);
    setWishlistItems(newItems);

    if (user) {
      try {
        await fetchApi('/wishlist/toggle', {
          method: 'POST',
          body: JSON.stringify({ productId: product._id })
        });
      } catch (err) {
        console.error('Failed to sync wishlist with server:', err);
      }
    } else {
      localStorage.setItem('ophmart_guest_wishlist', JSON.stringify(newItems));
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistItems,
        isInWishlist,
        toggleWishlist,
        isLoading,
        itemCount: wishlistIds.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};
