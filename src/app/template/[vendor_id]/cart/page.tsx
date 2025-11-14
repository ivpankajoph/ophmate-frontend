"use client"
import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

export default function ShoppingCartPage() {
  const [quantity, setQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [showNotification, setShowNotification] = useState(true);

  const itemPrice = 85.00;
  const subtotal = itemPrice * quantity;

  const handleQuantityChange = (e:any) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(value > 0 ? value : 1);
  };

  const removeItem = () => {
    setQuantity(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Cart Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Cart</h1>
        
        {/* Green line separator */}
        <div className="h-1 bg-green-500 mb-6"></div>

        {/* Success Notification */}
        {showNotification && (
          <div className="bg-gray-100 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={20} />
              <p className="text-gray-700">
                "Golden Glow" has been added to your cart.
              </p>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* View Cart Button */}
        <div className="flex justify-end mb-6">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors">
            View cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 bg-gray-50 p-4 font-semibold text-gray-700 border-b">
                <div className="col-span-1"></div>
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* Cart Item */}
              {quantity > 0 && (
                <div className="grid grid-cols-12 gap-4 p-4 items-center border-b">
                  {/* Remove Button */}
                  <div className="col-span-1">
                    <button
                      onClick={removeItem}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <X size={16} className="text-gray-600" />
                    </button>
                  </div>

                  {/* Product Image and Name */}
                  <div className="col-span-5 flex items-center gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=200&q=80"
                      alt="Golden Glow"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <a href="#" className="text-green-600 hover:underline font-medium">
                      Golden Glow
                    </a>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center text-gray-700">
                    ${itemPrice.toFixed(2)}
                  </div>

                  {/* Quantity */}
                  <div className="col-span-2 flex justify-center">
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      className="w-16 px-3 py-2 border border-gray-300 rounded text-center focus:outline-none focus:border-green-500"
                    />
                  </div>

                  {/* Subtotal */}
                  <div className="col-span-2 text-right font-semibold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </div>
                </div>
              )}

              {/* Coupon Section */}
              <div className="p-4 flex items-center gap-4">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                />
                <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Apply coupon
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Update cart
                </button>
              </div>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b">
                Cart totals
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-900 font-semibold text-lg pt-4 border-t">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-full font-semibold transition-colors text-lg">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-md shadow-lg flex items-center justify-center transition-all transform hover:scale-105 z-50"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}