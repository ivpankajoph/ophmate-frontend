'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Check,
  Shield,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchApi } from '../../lib/api';
import { IOrder, IUserAddress } from '../../types';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, updateProfile, manageAddress, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'profile'>('overview');
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Address modal / form
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressForm, setAddressForm] = useState<Partial<IUserAddress>>({
    fullName: '',
    phone: '',
    addressLine1: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    isDefault: false
  });

  // Profile Form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [profileMsg, setProfileMsg] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    setFirstName(user.firstName || '');
    setLastName(user.lastName || '');
    setPhone(user.phone || '');

    // Fetch user orders
    setLoadingOrders(true);
    fetchApi<{ orders: IOrder[] }>('/orders')
      .then(res => {
        if (res.success && res.data) setOrders(res.data.orders);
      })
      .finally(() => setLoadingOrders(false));
  }, [user, router]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await updateProfile({ firstName, lastName, phone });
    if (ok) {
      setProfileMsg('Profile details updated successfully');
      setTimeout(() => setProfileMsg(''), 3000);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await manageAddress('add', addressForm);
    setIsAddressModalOpen(false);
    setAddressForm({
      fullName: '',
      phone: '',
      addressLine1: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      isDefault: false
    });
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      {/* Top Welcome Header */}
      <div className="border-b border-[#f0ede6] pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-luxury text-[#c5a880] block mb-1">
            CLIENT PRIVILEGE ACCOUNT
          </span>
          <h1 className="font-serif-luxury text-3xl md:text-5xl text-[#121212]">
            Bonjour, {user.firstName}
          </h1>
          <p className="text-xs text-[#8c8c8c] mt-1 font-light">{user.email}</p>
        </div>

        {isAdmin && (
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 bg-[#121212] text-white text-xs uppercase tracking-luxury px-5 py-2.5 hover:bg-[#333] transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-[#c5a880]" /> Admin Portal
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 border border-[#f0ede6] divide-y divide-[#f0ede6] bg-[#faf9f6]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 p-4 text-xs uppercase tracking-luxury text-left transition-colors ${
              activeTab === 'overview' ? 'bg-[#121212] text-white font-medium' : 'text-[#575757] hover:bg-white'
            }`}
          >
            <User className="w-4 h-4" /> Overview
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between p-4 text-xs uppercase tracking-luxury text-left transition-colors ${
              activeTab === 'orders' ? 'bg-[#121212] text-white font-medium' : 'text-[#575757] hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4" /> Order History
            </div>
            <span className="text-[10px] font-mono">{orders.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center gap-3 p-4 text-xs uppercase tracking-luxury text-left transition-colors ${
              activeTab === 'addresses' ? 'bg-[#121212] text-white font-medium' : 'text-[#575757] hover:bg-white'
            }`}
          >
            <MapPin className="w-4 h-4" /> Addresses
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 p-4 text-xs uppercase tracking-luxury text-left transition-colors ${
              activeTab === 'profile' ? 'bg-[#121212] text-white font-medium' : 'text-[#575757] hover:bg-white'
            }`}
          >
            <Settings className="w-4 h-4" /> Profile Details
          </button>

          <Link
            href="/wishlist"
            className="flex items-center gap-3 p-4 text-xs uppercase tracking-luxury text-[#575757] hover:bg-white transition-colors"
          >
            <Heart className="w-4 h-4" /> Saved Pieces
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 p-4 text-xs uppercase tracking-luxury text-left text-red-600 hover:bg-white transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#faf9f6] border border-[#f0ede6] p-6">
                  <span className="text-[10px] uppercase tracking-luxury text-[#8c8c8c] block mb-1">Total Orders</span>
                  <span className="font-serif-luxury text-3xl text-[#121212]">{orders.length}</span>
                </div>

                <div className="bg-[#faf9f6] border border-[#f0ede6] p-6">
                  <span className="text-[10px] uppercase tracking-luxury text-[#8c8c8c] block mb-1">Tier Status</span>
                  <span className="font-serif-luxury text-2xl text-[#c5a880]">Haute Privé</span>
                </div>

                <div className="bg-[#faf9f6] border border-[#f0ede6] p-6">
                  <span className="text-[10px] uppercase tracking-luxury text-[#8c8c8c] block mb-1">Addresses Saved</span>
                  <span className="font-serif-luxury text-3xl text-[#121212]">{user.addresses?.length || 0}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-luxury font-medium text-[#121212] mb-4">
                  Recent Consignments
                </h3>
                {orders.length === 0 ? (
                  <p className="text-xs text-[#8c8c8c] font-light py-8 border border-dashed border-[#e5e5e5] text-center">
                    No order history recorded yet. Explore our latest runway collection.
                  </p>
                ) : (
                  <div className="divide-y divide-[#f0ede6] border border-[#f0ede6]">
                    {orders.slice(0, 3).map(ord => (
                      <div key={ord._id} className="p-5 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono font-medium text-[#121212]">
                            #{ord.orderNumber}
                          </span>
                          <p className="text-[11px] text-[#8c8c8c]">
                            {new Date(ord.createdAt).toLocaleDateString()} · {ord.items?.length} items · ₹{ord.total.toLocaleString()}
                          </p>
                        </div>
                        <Link
                          href={`/orders/${ord.orderNumber}`}
                          className="border border-[#121212] px-4 py-1.5 text-[11px] uppercase tracking-luxury hover:bg-[#121212] hover:text-white transition-colors"
                        >
                          View Order
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-luxury font-medium text-[#121212]">
                Order Consignments ({orders.length})
              </h3>
              {loadingOrders ? (
                <div className="py-12 text-center text-xs text-[#8c8c8c]">Retrieving archives...</div>
              ) : orders.length === 0 ? (
                <p className="text-xs text-[#8c8c8c] py-8 border border-dashed border-[#e5e5e5] text-center">
                  You have not placed any orders yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {orders.map(ord => (
                    <div key={ord._id} className="border border-[#f0ede6] bg-[#faf9f6] p-6 space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between pb-4 border-b border-[#e5e5e5] gap-2">
                        <div>
                          <span className="text-xs font-mono font-medium text-[#121212]">
                            Order #{ord.orderNumber}
                          </span>
                          <p className="text-[11px] text-[#8c8c8c]">
                            Placed on {new Date(ord.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-medium text-[#121212]">
                            ₹{ord.total.toLocaleString()}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider bg-white border border-[#e5e5e5] px-2 py-0.5">
                            {ord.orderStatus}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-[#575757]">
                          Carrier: {ord.carrier || 'BlueDart Luxury Express'}
                        </span>
                        <Link
                          href={`/orders/${ord.orderNumber}`}
                          className="bg-[#121212] text-white text-xs uppercase tracking-luxury px-5 py-2 hover:bg-[#333] transition-colors"
                        >
                          Consignment Dossier &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-luxury font-medium text-[#121212]">
                  Registered Addresses
                </h3>
                <button
                  onClick={() => setIsAddressModalOpen(true)}
                  className="border border-[#121212] px-4 py-2 text-xs uppercase tracking-luxury flex items-center gap-1.5 hover:bg-[#121212] hover:text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Address
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.addresses?.map(addr => (
                  <div key={addr._id} className="p-5 border border-[#f0ede6] bg-[#faf9f6] relative flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-[#121212]">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="text-[9px] uppercase tracking-wider bg-[#121212] text-white px-2 py-0.5">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#575757] leading-relaxed">
                        {addr.addressLine1}
                        <br />
                        {addr.city}, {addr.state} {addr.postalCode}
                        <br />
                        {addr.country}
                        <br />
                        Phone: {addr.phone}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#e5e5e5] flex items-center justify-between">
                      {!addr.isDefault && (
                        <button
                          onClick={() => manageAddress('setDefault', undefined, addr._id)}
                          className="text-[11px] text-[#8c8c8c] hover:text-black underline uppercase tracking-wider"
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        onClick={() => manageAddress('delete', undefined, addr._id)}
                        className="text-[11px] text-red-600 hover:underline uppercase tracking-wider ml-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeTab === 'profile' && (
            <div className="max-w-lg space-y-6">
              <h3 className="text-xs uppercase tracking-luxury font-medium text-[#121212]">
                Personal Identity & Preferences
              </h3>

              {profileMsg && (
                <div className="text-xs text-[#2e7d32] p-3 bg-green-50 border border-green-200">
                  {profileMsg}
                </div>
              )}

              <form onSubmit={handleProfileSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-luxury text-[#575757] block mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-luxury text-[#575757] block mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-luxury text-[#575757] block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full border border-gray-200 p-2.5 text-xs bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-luxury text-[#575757] block mb-1">
                    Telephone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none focus:border-black"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#121212] text-white text-xs uppercase tracking-luxury px-6 py-3 hover:bg-[#333] transition-colors"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full p-8 shadow-2xl relative">
            <h3 className="font-serif-luxury text-2xl mb-4">Add Shipping Destination</h3>
            <form onSubmit={handleAddressSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={addressForm.fullName}
                  onChange={e => setAddressForm({ ...addressForm, fullName: e.target.value })}
                  className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="tel"
                  required
                  placeholder="Phone"
                  value={addressForm.phone}
                  onChange={e => setAddressForm({ ...addressForm, phone: e.target.value })}
                  className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  required
                  placeholder="Street Address"
                  value={addressForm.addressLine1}
                  onChange={e => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                  className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={addressForm.city}
                  onChange={e => setAddressForm({ ...addressForm, city: e.target.value })}
                  className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="PIN Code"
                  value={addressForm.postalCode}
                  onChange={e => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                  className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#121212] text-white text-xs uppercase tracking-luxury py-3"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="border border-gray-300 px-4 text-xs uppercase tracking-luxury"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
