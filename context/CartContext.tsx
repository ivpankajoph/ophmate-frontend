'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ICartItem, ICartTotals } from '../types';
import { fetchApi } from '../lib/api';
import { useAuth } from './AuthContext';

interface CartContextType {
  items: ICartItem[];
  totals: ICartTotals;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (productId: string, variantId?: string, quantity?: number) => Promise<boolean>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  toggleGiftWrap: (giftWrap?: boolean, giftMessage?: string) => Promise<void>;
  itemCount: number;
  isLoading: boolean;
  couponCode?: string;
  giftWrap: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<ICartItem[]>([]);
  const [totals, setTotals] = useState<ICartTotals>({
    subtotal: 0,
    discount: 0,
    shipping: 0,
    giftWrapCost: 0,
    tax: 0,
    total: 0
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string | undefined>(undefined);
  const [giftWrap, setGiftWrap] = useState<boolean>(false);

  const refreshCart = async () => {
    setIsLoading(true);
    try {
      const res = await fetchApi<{ cart: any; totals: ICartTotals }>('/cart');
      if (res.success && res.data) {
        setItems(res.data.cart?.items || []);
        if (res.data.totals) setTotals(res.data.totals);
        if (res.data.cart?.coupon?.code) setCouponCode(res.data.cart.coupon.code);
        setGiftWrap(!!res.data.cart?.giftWrap);
      }
    } catch (err) {
      console.warn('Failed to load cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = async (productId: string, variantId?: string, quantity: number = 1): Promise<boolean> => {
    try {
      const res = await fetchApi<{ cart: any; totals: ICartTotals }>('/cart/items', {
        method: 'POST',
        body: JSON.stringify({ productId, variantId, quantity })
      });
      if (res.success && res.data) {
        setItems(res.data.cart?.items || []);
        if (res.data.totals) setTotals(res.data.totals);
        setIsCartOpen(true); // Open drawer on addition as per requirement
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const res = await fetchApi<{ cart: any; totals: ICartTotals }>(`/cart/items/${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity })
      });
      if (res.success && res.data) {
        setItems(res.data.cart?.items || []);
        if (res.data.totals) setTotals(res.data.totals);
      }
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const res = await fetchApi<{ cart: any; totals: ICartTotals }>(`/cart/items/${itemId}`, {
        method: 'DELETE'
      });
      if (res.success && res.data) {
        setItems(res.data.cart?.items || []);
        if (res.data.totals) setTotals(res.data.totals);
      }
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const applyCoupon = async (code: string) => {
    try {
      const res = await fetchApi<{ cart: any; totals: ICartTotals }>('/cart/coupon', {
        method: 'POST',
        body: JSON.stringify({ code })
      });
      if (res.success && res.data) {
        setItems(res.data.cart?.items || []);
        if (res.data.totals) setTotals(res.data.totals);
        setCouponCode(code.toUpperCase());
        return { success: true, message: res.message || 'Coupon applied' };
      }
      return { success: false, message: res.message || 'Invalid coupon' };
    } catch (err) {
      return { success: false, message: 'Failed to apply coupon' };
    }
  };

  const toggleGiftWrap = async (wrap?: boolean, message?: string) => {
    try {
      const res = await fetchApi<{ cart: any; totals: ICartTotals }>('/cart/gift-wrap', {
        method: 'POST',
        body: JSON.stringify({ giftWrap: wrap, giftMessage: message })
      });
      if (res.success && res.data) {
        setGiftWrap(!!res.data.cart?.giftWrap);
        if (res.data.totals) setTotals(res.data.totals);
      }
    } catch (err) {
      console.error('Error toggling gift wrap:', err);
    }
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totals,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeItem,
        applyCoupon,
        toggleGiftWrap,
        itemCount,
        isLoading,
        couponCode,
        giftWrap
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
