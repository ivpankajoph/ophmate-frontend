'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isRegisterMode) {
        const res = await register({ firstName, lastName, email, password, phone });
        if (res.success) {
          router.push('/account');
        } else {
          setErrorMsg(res.message || 'Registration failed');
        }
      } else {
        const res = await login(email, password);
        if (res.success) {
          router.push('/account');
        } else {
          setErrorMsg(res.message || 'Invalid credentials');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (role: 'admin' | 'customer') => {
    setLoading(true);
    setErrorMsg('');
    const credentials =
      role === 'admin'
        ? { email: 'admin@ophmart.com', password: 'Admin@123456' }
        : { email: 'customer@ophmart.com', password: 'Customer@123456' };

    const res = await login(credentials.email, credentials.password);
    setLoading(false);
    if (res.success) {
      router.push(role === 'admin' ? '/admin' : '/account');
    } else {
      setErrorMsg(res.message || 'Quick login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="text-center mb-8">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] block mb-2 font-medium">
          PRIVILEGE ACCESS
        </span>
        <h1 className="font-serif-luxury text-3xl md:text-4xl text-[#121212]">
          {isRegisterMode ? 'Create Maison Account' : 'Client Sign In'}
        </h1>
        <p className="text-xs text-[#8c8c8c] mt-1 font-light">
          {isRegisterMode
            ? 'Join our private clientele to unlock bespoke services'
            : 'Access your order archive and curated wishlist'}
        </p>
      </div>

      {errorMsg && (
        <div className="text-xs text-red-600 p-3 bg-red-50 border border-red-200 mb-6 text-center">
          {errorMsg}
        </div>
      )}

      {/* Demo Quick Logins */}
      <div className="bg-[#faf9f6] border border-[#f0ede6] p-4 mb-6 text-center space-y-2">
        <span className="text-[10px] uppercase tracking-luxury text-[#8c8c8c] block font-medium">
          Instant Client Demonstration Logins:
        </span>
        <div className="flex gap-2 justify-center">
          <button
            type="button"
            onClick={() => handleQuickLogin('customer')}
            className="border border-[#121212] bg-white px-3 py-1.5 text-[11px] uppercase tracking-luxury hover:bg-[#121212] hover:text-white transition-colors"
          >
            Demo Customer
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('admin')}
            className="border border-[#121212] bg-[#121212] text-white px-3 py-1.5 text-[11px] uppercase tracking-luxury hover:bg-[#333] transition-colors flex items-center gap-1"
          >
            <Shield className="w-3 h-3 text-[#c5a880]" /> Admin Portal
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegisterMode && (
          <div className="grid grid-cols-2 gap-3">
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
        )}

        <div>
          <label className="text-[11px] uppercase tracking-luxury text-[#575757] block mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="elena@example.com"
            className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="text-[11px] uppercase tracking-luxury text-[#575757] block mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none focus:border-black"
          />
        </div>

        {isRegisterMode && (
          <div>
            <label className="text-[11px] uppercase tracking-luxury text-[#575757] block mb-1">
              Telephone (Optional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+91 9876543210"
              className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none focus:border-black"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#121212] text-white text-xs uppercase tracking-luxury py-3.5 hover:bg-[#333] transition-colors mt-2"
        >
          {loading
            ? 'Authenticating...'
            : isRegisterMode
            ? 'Create Account'
            : 'Sign In To Account'}
        </button>
      </form>

      <div className="mt-8 text-center border-t border-[#f0ede6] pt-6">
        <button
          type="button"
          onClick={() => {
            setIsRegisterMode(!isRegisterMode);
            setErrorMsg('');
          }}
          className="text-xs text-[#575757] hover:text-[#121212] underline uppercase tracking-wider"
        >
          {isRegisterMode
            ? 'Already have an account? Sign in'
            : "Don't have an account yet? Register here"}
        </button>
      </div>
    </div>
  );
}
