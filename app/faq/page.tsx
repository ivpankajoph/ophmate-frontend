'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Shipping',
      question: 'What are the delivery transit timelines and packaging standards?',
      answer: 'All orders are dispatched via BlueDart Express Luxury within 24 hours of placement. Metro deliveries take 2–3 business days. Every creation is nestled inside our archival black lacquer presentation box with anti-tarnish tissue paper, wax seal, and complimentary scented cedar block.'
    },
    {
      category: 'Returns',
      question: 'What is your returns and exchange policy?',
      answer: 'We provide a complimentary 30-day doorstep return and exchange service for all unworn pieces in their original condition with security tags intact. You can register your return directly through your client account under Order Details.'
    },
    {
      category: 'Orders',
      question: 'Can I request bespoke alterations or customized sizing?',
      answer: 'Yes. Our ateliers offer bespoke sleeve adjustments, hem tailoring, and trouser rise modifications for all virgin wool suiting and evening gowns. Please contact concierge@ophmart.com after placing your order.'
    },
    {
      category: 'Payments',
      question: 'Which payment methods are accepted?',
      answer: 'We accept Cash on Delivery (COD) across India, all international credit/debit cards (Visa, MasterCard, American Express) via Stripe, and UPI / Netbanking via Razorpay.'
    },
    {
      category: 'Products',
      question: 'How do I care for my cashmere and Mulberry silk pieces?',
      answer: 'Cashmere should be rested between wears and gently hand-washed or dry-cleaned using neutral pH detergent. Mulberry silk must be dry-cleaned or ironed on reverse at low heat using a protective pressing cloth.'
    },
    {
      category: 'Account',
      question: 'What privileges are included in Haute Privé client membership?',
      answer: 'Members enjoy priority private sale invitations, dedicated personal styling consultations, complimentary lifetime garment repair, and invitations to seasonal runway viewings.'
    }
  ];

  const categories = ['All', 'Shipping', 'Returns', 'Orders', 'Payments', 'Products', 'Account'];

  const filtered = faqs.filter(faq => {
    const matchesCat = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 space-y-12">
      <div className="text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] block mb-2 font-medium">
          KNOWLEDGE BASE
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-5xl text-[#121212]">
          Frequently Consulted Inquiries
        </h1>
        <p className="text-xs text-[#8c8c8c] mt-2 font-light">
          Everything you need to know about our services, ateliers, consignments, and care.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-lg mx-auto">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by keyword (e.g. shipping, return, silk)..."
          className="w-full border border-gray-300 pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-black bg-white"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-4 py-2 border transition-all ${
              activeCategory === cat
                ? 'border-[#121212] bg-[#121212] text-white font-medium'
                : 'border-gray-200 text-gray-600 hover:border-black'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="border border-[#f0ede6] divide-y divide-[#f0ede6] bg-[#faf9f6]">
        {filtered.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="p-6">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left text-sm font-medium text-[#121212]"
              >
                <span>{item.question}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {isOpen && (
                <p className="mt-3 text-xs text-[#575757] font-light leading-relaxed">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
