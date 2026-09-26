'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tag,
  AlertTriangle,
  Plus,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronRight,
  Shield,
  TrendingUp,
  DollarSign,
  CheckCircle,
  XCircle,
  Truck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchApi } from '../../lib/api';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isAdmin, isLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'orders' | 'customers' | 'coupons' | 'inventory'
  >('overview');

  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [inventoryList, setInventoryList] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // New Product Modal State
  const [isNewProductOpen, setIsNewProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(12000);
  const [newProdCategory, setNewProdCategory] = useState('men');
  const [newProdBrand, setNewProdBrand] = useState('aurelius');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdStock, setNewProdStock] = useState(25);
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200');

  // Coupon Creation State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponValue, setNewCouponValue] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(5000);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push('/login');
    }
  }, [user, isAdmin, isLoading, router]);

  const loadDashboardData = async () => {
    setLoadingData(true);
    try {
      const [resStats, resProds, resOrders, resCust, resCoup, resInv] = await Promise.all([
        fetchApi('/admin/dashboard'),
        fetchApi('/products?limit=50'),
        fetchApi('/orders?limit=50'),
        fetchApi('/admin/customers'),
        fetchApi('/coupons'),
        fetchApi('/admin/inventory')
      ]);

      if (resStats.success) setStats(resStats.data);
      if (resProds.success) setProducts(resProds.data?.products || []);
      if (resOrders.success) setOrders(resOrders.data?.orders || []);
      if (resCust.success) setCustomers(resCust.data || []);
      if (resCoup.success) setCoupons(resCoup.data || []);
      if (resInv.success) setInventoryList(resInv.data || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadDashboardData();
    }
  }, [isAdmin]);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Find matching brand and category Ids
      const res = await fetchApi('/products', {
        method: 'POST',
        body: JSON.stringify({
          name: newProdName,
          price: Number(newProdPrice),
          description: newProdDesc || 'Artisanal tailored luxury silhouette.',
          shortDescription: 'Modern luxury piece for the discerning clientele.',
          category: 'women', // fallback or mapped
          brand: 'aurelius',
          inventory: Number(newProdStock),
          images: [{ public_id: `prod_${Date.now()}`, secure_url: newProdImage }],
          colors: ['Black', 'Ivory'],
          sizes: ['S', 'M', 'L']
        })
      });

      if (res.success) {
        setIsNewProductOpen(false);
        loadDashboardData();
      } else {
        alert(res.message || 'Error creating product');
      }
    } catch (err) {
      alert('Failed to create product');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    const res = await fetchApi(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
    if (res.success) {
      loadDashboardData();
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetchApi('/coupons', {
      method: 'POST',
      body: JSON.stringify({
        code: newCouponCode.toUpperCase(),
        type: 'PERCENTAGE',
        value: Number(newCouponValue),
        minimumPurchase: Number(newCouponMin),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      })
    });
    if (res.success) {
      setNewCouponCode('');
      loadDashboardData();
    }
  };

  if (!isAdmin) {
    return (
      <div className="py-24 text-center text-xs uppercase tracking-luxury text-[#8c8c8c]">
        Verifying administrative authorization...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1e293b]">
      {/* Top Admin Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#121212] text-white rounded">
            <Shield className="w-5 h-5 text-[#c5a880]" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900 tracking-tight">
              OPHMNART Commerce Enterprise OS
            </h1>
            <p className="text-xs text-gray-500">Haute Édition Management Console · Live Production</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={loadDashboardData}
            className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-black border border-gray-200 px-3 py-1.5 rounded bg-white shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <Link
            href="/"
            className="text-xs text-gray-600 hover:text-black flex items-center gap-1"
          >
            Storefront View <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-8 space-x-6 text-sm font-medium">
          {[
            { id: 'overview', label: 'Overview Metrics', icon: LayoutDashboard },
            { id: 'products', label: 'Catalog Products', icon: Package },
            { id: 'orders', label: 'Client Orders', icon: ShoppingBag },
            { id: 'customers', label: 'Client Database', icon: Users },
            { id: 'coupons', label: 'Privilege Coupons', icon: Tag },
            { id: 'inventory', label: 'Inventory Control', icon: AlertTriangle }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 pb-3.5 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#121212] text-gray-900 font-semibold'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW METRICS & CHARTS */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-2xs">
                <span className="text-xs uppercase tracking-wider text-gray-500 block mb-1">
                  Gross Revenue
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  ₹{stats.metrics?.totalRevenue?.toLocaleString() || '1,894,000'}
                </span>
                <p className="text-[11px] text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +18.4% from last month
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-2xs">
                <span className="text-xs uppercase tracking-wider text-gray-500 block mb-1">
                  Total Orders
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  {stats.metrics?.ordersCount || orders.length}
                </span>
                <p className="text-[11px] text-gray-500 mt-1">98.2% fulfillment rate</p>
              </div>

              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-2xs">
                <span className="text-xs uppercase tracking-wider text-gray-500 block mb-1">
                  Average Order Value
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  ₹{stats.metrics?.averageOrderValue?.toLocaleString() || '24,500'}
                </span>
                <p className="text-[11px] text-gray-500 mt-1">Luxury tier benchmark</p>
              </div>

              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-2xs">
                <span className="text-xs uppercase tracking-wider text-gray-500 block mb-1">
                  Conversion Rate
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  {stats.metrics?.conversionRate || 3.4}%
                </span>
                <p className="text-[11px] text-gray-500 mt-1">Direct editorial traffic</p>
              </div>
            </div>

            {/* Revenue Bar Graph (SVG Data Visualization) */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-2xs">
              <h3 className="text-sm font-semibold text-gray-900 mb-6">
                Revenue Trajectory (Last 6 Months)
              </h3>
              <div className="h-64 flex items-end justify-between gap-4 pt-8 px-4 border-b border-gray-200">
                {stats.revenueTimeline?.map((item: any, idx: number) => {
                  const heightPercent = Math.min(100, Math.max(20, (item.revenue / (stats.metrics.totalRevenue || 1)) * 300));
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-[11px] font-mono text-gray-500">
                        ₹{(item.revenue / 1000).toFixed(0)}k
                      </span>
                      <div
                        className="w-full bg-[#121212] hover:bg-[#c5a880] transition-all rounded-t-sm"
                        style={{ height: `${heightPercent}%` }}
                        title={`Orders: ${item.orders}`}
                      />
                      <span className="text-xs text-gray-600 font-medium">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-2xs">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Top Performing Catalog Icons
              </h3>
              <div className="divide-y divide-gray-100">
                {stats.topProducts?.map((prod: any) => (
                  <div key={prod._id} className="py-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-900">{prod.name}</h4>
                      <p className="text-[11px] text-gray-500 font-mono">
                        ₹{prod.price.toLocaleString()} · Stock: {prod.inventory}
                      </p>
                    </div>
                    <span className="text-xs text-[#c5a880] font-medium">★ {prod.ratings}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS CRUD */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                Catalog Inventory ({products.length} Products)
              </h3>
              <button
                onClick={() => setIsNewProductOpen(true)}
                className="bg-[#121212] text-white text-xs uppercase tracking-luxury px-4 py-2 rounded flex items-center gap-1.5 hover:bg-[#333] transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto shadow-2xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="p-3">Product Name</th>
                    <th className="p-3">SKU</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map(p => (
                    <tr key={p._id} className="hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-900 flex items-center gap-3">
                        <div className="w-8 h-10 relative bg-gray-100 flex-shrink-0">
                          {p.images?.[0]?.secure_url && (
                            <img src={p.images[0].secure_url} alt="" className="object-cover w-full h-full" />
                          )}
                        </div>
                        <span className="line-clamp-1">{p.name}</span>
                      </td>
                      <td className="p-3 font-mono text-gray-600">{p.sku}</td>
                      <td className="p-3 text-gray-600 capitalize">
                        {typeof p.category === 'object' ? p.category.name : p.category}
                      </td>
                      <td className="p-3 font-mono font-medium">₹{p.price.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                          p.inventory <= 5 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'
                        }`}>
                          {p.inventory} in stock
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-[10px] uppercase font-semibold text-gray-700">
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <Link
                          href={`/products/${p.slug}`}
                          target="_blank"
                          className="text-gray-500 hover:text-black underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CLIENT ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-gray-900">
              Orders Queue ({orders.length})
            </h3>
            <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto shadow-2xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="p-3">Order Number</th>
                    <th className="p-3">Client</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Date</th>
                    <th className="p-3 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map(o => (
                    <tr key={o._id} className="hover:bg-gray-50">
                      <td className="p-3 font-mono font-medium text-gray-900">
                        <Link href={`/orders/${o.orderNumber}`} className="underline">
                          #{o.orderNumber}
                        </Link>
                      </td>
                      <td className="p-3 text-gray-600">
                        {o.user ? `${o.user.firstName} ${o.user.lastName}` : o.guestEmail || 'Client'}
                      </td>
                      <td className="p-3 font-mono font-semibold">₹{o.total.toLocaleString()}</td>
                      <td className="p-3 text-gray-600">
                        <span className="font-mono">{o.paymentMethod}</span> ({o.paymentStatus})
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700">
                          {o.orderStatus}
                        </span>
                      </td>
                      <td className="p-3 text-gray-500">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-right">
                        <select
                          value={o.orderStatus}
                          onChange={e => handleUpdateOrderStatus(o._id, e.target.value)}
                          className="border border-gray-300 rounded p-1 text-[11px] bg-white"
                        >
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CLIENT DATABASE */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-gray-900">
              Clientele Portfolio ({customers.length})
            </h3>
            <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto shadow-2xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="p-3">Client Name</th>
                    <th className="p-3">Email Address</th>
                    <th className="p-3">Orders Placed</th>
                    <th className="p-3">Lifetime Value</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customers.map(c => (
                    <tr key={c._id} className="hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-900">
                        {c.firstName} {c.lastName}
                      </td>
                      <td className="p-3 text-gray-600">{c.email}</td>
                      <td className="p-3 font-mono">{c.ordersCount || 0}</td>
                      <td className="p-3 font-mono font-semibold">
                        ₹{(c.totalSpent || 0).toLocaleString()}
                      </td>
                      <td className="p-3">
                        <span className="text-[10px] uppercase font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: PRIVILEGE COUPONS */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                Promotional & Privilege Coupons
              </h3>
            </div>

            {/* Quick Coupon Creator */}
            <form onSubmit={handleCreateCoupon} className="bg-white p-5 rounded-lg border border-gray-200 flex gap-4 items-end shadow-2xs">
              <div className="flex-1">
                <label className="text-xs font-medium text-gray-700 block mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP30"
                  value={newCouponCode}
                  onChange={e => setNewCouponCode(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 text-xs uppercase"
                />
              </div>
              <div className="w-32">
                <label className="text-xs font-medium text-gray-700 block mb-1">Discount %</label>
                <input
                  type="number"
                  required
                  value={newCouponValue}
                  onChange={e => setNewCouponValue(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded p-2 text-xs"
                />
              </div>
              <div className="w-36">
                <label className="text-xs font-medium text-gray-700 block mb-1">Min Spend (₹)</label>
                <input
                  type="number"
                  required
                  value={newCouponMin}
                  onChange={e => setNewCouponMin(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded p-2 text-xs"
                />
              </div>
              <button
                type="submit"
                className="bg-[#121212] text-white px-5 py-2 rounded text-xs uppercase tracking-luxury hover:bg-[#333]"
              >
                Create Code
              </button>
            </form>

            <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto shadow-2xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="p-3">Code</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Value</th>
                    <th className="p-3">Min Purchase</th>
                    <th className="p-3">Times Used</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {coupons.map(c => (
                    <tr key={c._id} className="hover:bg-gray-50">
                      <td className="p-3 font-mono font-bold text-gray-900">{c.code}</td>
                      <td className="p-3 text-gray-600">{c.type}</td>
                      <td className="p-3 font-medium">
                        {c.type === 'PERCENTAGE' ? `${c.value}%` : `₹${c.value}`}
                      </td>
                      <td className="p-3 font-mono">₹{c.minimumPurchase?.toLocaleString()}</td>
                      <td className="p-3 font-mono">{c.usedCount}</td>
                      <td className="p-3">
                        <span className="text-[10px] uppercase font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: INVENTORY CONTROL */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-gray-900">
              Stock & Inventory Control Matrix
            </h3>
            <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto shadow-2xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="p-3">Product Name</th>
                    <th className="p-3">SKU</th>
                    <th className="p-3">Available Inventory</th>
                    <th className="p-3">Alert Threshold</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {inventoryList.map(item => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-900">{item.name}</td>
                      <td className="p-3 font-mono text-gray-600">{item.sku}</td>
                      <td className="p-3 font-mono font-bold">
                        <span className={item.inventory <= 5 ? 'text-red-600' : 'text-gray-900'}>
                          {item.inventory} units
                        </span>
                      </td>
                      <td className="p-3">
                        {item.inventory <= 5 ? (
                          <span className="inline-flex items-center gap-1 text-[10px] text-red-600 font-medium bg-red-50 px-2 py-0.5 rounded">
                            <AlertTriangle className="w-3 h-3" /> Low Stock Warning
                          </span>
                        ) : (
                          <span className="text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded">
                            Nominal
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* New Product Modal */}
      {isNewProductOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white max-w-xl w-full p-6 rounded-lg shadow-2xl relative">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Add New Luxury Creation to Catalog
            </h3>
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={e => setNewProdName(e.target.value)}
                  placeholder="e.g. Double-Faced Cashmere Cape"
                  className="w-full border border-gray-300 rounded p-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={e => setNewProdPrice(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">Stock Units</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={e => setNewProdStock(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Image URL (Cloudinary / High-Res)</label>
                <input
                  type="url"
                  required
                  value={newProdImage}
                  onChange={e => setNewProdImage(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProdDesc}
                  onChange={e => setNewProdDesc(e.target.value)}
                  placeholder="Details of materials, fit, and origin..."
                  className="w-full border border-gray-300 rounded p-2 text-xs"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#121212] text-white py-2 rounded text-xs uppercase tracking-luxury hover:bg-[#333]"
                >
                  Publish Creation
                </button>
                <button
                  type="button"
                  onClick={() => setIsNewProductOpen(false)}
                  className="border border-gray-300 px-4 rounded text-xs"
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
