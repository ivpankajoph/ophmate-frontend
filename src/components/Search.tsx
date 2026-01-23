"use client";

import React, { useState } from "react";
import { Search, Image, Sparkles, TrendingUp, Package, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

type TabType = "category" | "subcategory" | "wholesale" | "retail";

export default function EcommerceSearchUI() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("category");
  const [searchQuery, setSearchQuery] = useState("");
  const [aiSearchEnabled, setAiSearchEnabled] = useState(true);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery, {
      tab: activeTab,
      aiEnabled: aiSearchEnabled,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 mt-32">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Navigation */}
        {/* <nav className="flex items-center justify-center gap-8 mb-8">
          <button className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-orange-600 transition-colors font-medium">
            <Sparkles className="w-5 h-5" />
            AI Mode
          </button>
          <button className="px-6 py-3 text-orange-600 font-semibold border-b-3 border-orange-600">
            Products
          </button>
          <button className="px-6 py-3 text-gray-700 hover:text-orange-600 transition-colors font-medium">
            Manufacturers
          </button>
          <button className="px-6 py-3 text-gray-700 hover:text-orange-600 transition-colors font-medium">
            Worldwide
          </button>
        </nav> */}

        <h1 className="text-4xl flex justify-center -mt-20 mb-10">
          Search Anything you want............
        </h1>
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-orange-400 overflow-hidden w-fit justify-center mx-auto">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Search ${
                    activeTab === "wholesale"
                      ? "wholesale"
                      : activeTab === "retail"
                      ? "retail"
                      : ""
                  } products...`}
                  className="w-full px-6 py-4 pr-32 text-lg border-2 border-gray-300 rounded-2xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-orange-600 transition-colors">
                  <Image className="w-6 h-6" />
                </button>
              </div>
              <button
                onClick={handleSearch}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>

            {/* AI Search Toggle & Features */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="flex items-center gap-2 text-orange-600 font-semibold">
                    <Sparkles className="w-5 h-5" />
                    <span>AI Smart Search</span>
                  </div>
                  <div
                    onClick={() => setAiSearchEnabled(!aiSearchEnabled)}
                    className={`relative w-14 h-7 rounded-full transition-all ${
                      aiSearchEnabled ? "bg-orange-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        aiSearchEnabled ? "translate-x-7" : "translate-x-0"
                      }`}
                    />
                  </div>
                  <span className="text-sm text-gray-500">Free</span>
                </label>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <span>Top Ranking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-orange-500" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-500" />
                  <span>Quick Quote</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-lg">
            Welcome to{" "}
            <span className="font-semibold text-orange-600">OPH-mart</span>, Your
            Premium E-Commerce Platform
          </p>
        </div>
      </div>

    </div>
  );
}
