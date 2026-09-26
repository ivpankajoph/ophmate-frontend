'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, MessageSquare, Check } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'Bespoke Order Inquiry', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-16">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] block mb-2 font-medium">
          CLIENT CONCIERGE
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-5xl text-[#121212]">
          Private Inquiries & Appointments
        </h1>
        <p className="text-xs text-[#8c8c8c] mt-2 font-light">
          Our private client advisors are available 7 days a week to assist with bespoke fittings, sizing counsel, and private styling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Contact Info */}
        <div className="md:col-span-5 space-y-8 bg-[#faf9f6] p-8 border border-[#f0ede6]">
          <div>
            <h3 className="font-serif-luxury text-xl text-[#121212] mb-4">Maison Flagships</h3>
            <div className="space-y-4 text-xs text-[#575757] font-light">
              <div className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-[#c5a880] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-medium text-[#121212] block">Mumbai Flagship</strong>
                  <p>Ground Floor, The Palladium, Lower Parel, Mumbai 400013</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-[#c5a880] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-medium text-[#121212] block">Parisian Atelier</strong>
                  <p>28 Rue du Faubourg Saint-Honoré, 75008 Paris, France</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#e5e5e5] pt-6 space-y-3 text-xs text-[#575757] font-light">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#c5a880]" />
              <span>concierge@ophmart.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#c5a880]" />
              <span>+91 1800 200 4888 (Toll Free)</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#c5a880]" />
              <span>Mon – Sun: 10:00 AM – 9:00 PM IST</span>
            </div>
          </div>

          <div className="border-t border-[#e5e5e5] pt-4">
            <Link
              href="/faq"
              className="text-xs uppercase tracking-luxury text-[#121212] underline font-medium hover:text-[#c5a880]"
            >
              Consult Common Client FAQs &rarr;
            </Link>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7">
          {submitted ? (
            <div className="bg-[#faf9f6] border border-[#f0ede6] p-10 text-center">
              <Check className="w-8 h-8 text-[#2e7d32] mx-auto mb-3" />
              <h3 className="font-serif-luxury text-2xl text-[#121212] mb-2">Message Received</h3>
              <p className="text-xs text-[#575757] font-light max-w-sm mx-auto mb-6">
                Your dossier has been routed to our senior client advisor. You will receive a bespoke reply within 4 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="border border-[#121212] text-xs uppercase tracking-luxury px-6 py-2.5"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-luxury text-[#575757] block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-luxury text-[#575757] block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-luxury text-[#575757] block mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none"
                >
                  <option value="Bespoke Order Inquiry">Bespoke Order Inquiry</option>
                  <option value="Private Atelier Appointment">Private Atelier Appointment</option>
                  <option value="Sizing & Fitting Counsel">Sizing & Fitting Counsel</option>
                  <option value="Consignment & Delivery Status">Consignment & Delivery Status</option>
                  <option value="Press & Editorial Collaborations">Press & Editorial Collaborations</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-luxury text-[#575757] block mb-1">
                  Message Details
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Inscribe your inquiry..."
                  className="w-full border border-gray-300 p-2.5 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#121212] text-white text-xs uppercase tracking-luxury py-4 hover:bg-[#333] transition-colors"
              >
                Transmit Inquiry to Concierge
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
