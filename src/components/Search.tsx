"use client";

import { type KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
  Package,
  Search,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import useDebounce from "@/hooks/useDebounce";

type SearchResult = {
  type: "product" | "category";
  id: string;
  name: string;
  slug?: string | null;
  categorySlug?: string | null;
  imageUrl?: string | null;
};

const featureBadges = [
  { icon: TrendingUp, label: "Top Ranking" },
  { icon: Package, label: "Fast Delivery" },
  { icon: Zap, label: "Quick Quote" },
];

export default function EcommerceSearchUI() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [aiSearchEnabled, setAiSearchEnabled] = useState(true);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiBase = useMemo(() => process.env.NEXT_PUBLIC_API_URL || "", []);
  const debouncedQuery = useDebounce(searchQuery, 350);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchResults = async (query: string) => {
    if (!query || !apiBase) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      setIsLoading(true);
      const response = await fetch(
        `${apiBase}/search?query=${encodeURIComponent(query)}`,
        { signal: controller.signal },
      );
      if (!response.ok) {
        throw new Error("Search request failed");
      }
      const data = await response.json();
      setResults(Array.isArray(data?.results) ? data.results : []);
    } catch (error: any) {
      if (error?.name !== "AbortError") {
        console.error("Search error:", error);
        setResults([]);
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (!query) return;
    fetchResults(query);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const query = debouncedQuery.trim();
    if (!query) {
      controllerRef.current?.abort();
      setResults([]);
      setIsLoading(false);
      return;
    }
    fetchResults(query);
  }, [debouncedQuery]);

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  const handleResultClick = (result: SearchResult) => {
    const targetSlug =
      result.type === "product" ? result.categorySlug : result.slug;
    if (targetSlug) {
      router.push(`/categories/${targetSlug}`);
    }
    setSearchQuery("");
    setResults([]);
  };

  const showResults = searchQuery.trim().length > 0;

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,237,213,0.95)_0%,_rgba(255,247,237,0.95)_38%,_rgba(253,242,248,0.92)_100%)]">
      <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(135deg,rgba(251,146,60,0.18),rgba(244,114,182,0.12),rgba(255,255,255,0))]" />
      <div className="absolute left-1/2 top-8 h-56 w-56 -translate-x-[170%] rounded-full bg-orange-200/40 blur-3xl" />
      <div className="absolute left-1/2 top-20 h-52 w-52 translate-x-[100%] rounded-full bg-amber-200/35 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Smart catalog search
          </p>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Find products and categories in seconds
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Type a product name, brand, or category. We'll show the best matches
            instantly.
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-5xl">
          <div className="rounded-[32px] border border-white/70 bg-white/85 p-4 shadow-[0_30px_80px_-32px_rgba(249,115,22,0.45)] backdrop-blur-xl sm:p-6">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div className="relative z-20">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search products, brands, or categories"
                    className="h-16 w-full rounded-[24px] border border-orange-200/80 bg-white pl-14 pr-14 text-base text-slate-900 shadow-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 sm:text-lg"
                  />
                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-slate-400 transition hover:bg-orange-50 hover:text-orange-600"
                      aria-label="Clear search"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-slate-400 transition hover:bg-orange-50 hover:text-orange-600"
                      aria-label="Search by image"
                    >
                      <Image className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {showResults && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-[24px] border border-orange-100 bg-white shadow-[0_24px_70px_-28px_rgba(15,23,42,0.35)]">
                    {isLoading ? (
                      <div className="p-4 text-sm text-slate-500">
                        Searching...
                      </div>
                    ) : results.length > 0 ? (
                      <div className="max-h-80 overflow-y-auto">
                        {results.map((result) => (
                          <button
                            key={`${result.type}-${result.id}`}
                            type="button"
                            onClick={() => handleResultClick(result)}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-orange-50/70"
                          >
                            {result.imageUrl ? (
                              <NextImage
                                src={result.imageUrl}
                                alt={result.name}
                                width={48}
                                height={48}
                                className="h-12 w-12 rounded-2xl object-cover"
                              />
                            ) : (
                              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-xs font-semibold text-orange-600">
                                IMG
                              </div>
                            )}
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-slate-900 sm:text-base">
                                {result.name}
                              </span>
                              <span className="text-xs capitalize text-slate-500">
                                {result.type}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-sm text-slate-500">
                        No results found. Try a different keyword.
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleSearch}
                className="inline-flex h-16 items-center justify-center gap-2 rounded-[24px] bg-gradient-to-r from-orange-500 to-orange-600 px-8 text-base font-semibold text-white shadow-lg transition hover:from-orange-600 hover:to-orange-700 lg:min-w-[180px]"
              >
                <Search className="h-5 w-5" />
                Search
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-4 border-t border-orange-100 pt-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={aiSearchEnabled}
                  onClick={() => setAiSearchEnabled(!aiSearchEnabled)}
                  className="inline-flex items-center gap-3 rounded-full bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>AI Smart Search</span>
                  <span
                    className={`relative h-7 w-12 rounded-full transition ${
                      aiSearchEnabled ? "bg-orange-500" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                        aiSearchEnabled ? "left-6" : "left-1"
                      }`}
                    />
                  </span>
                </button>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700 shadow-sm">
                  Free
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                {featureBadges.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-orange-100"
                  >
                    <Icon className="h-4 w-4 text-orange-500" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
