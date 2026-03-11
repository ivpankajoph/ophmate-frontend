"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type MainCategory = {
  _id?: string;
  name?: string;
  slug?: string;
  image_url?: string;
  categories?: Array<{
    _id?: string;
    name?: string;
    slug?: string;
    subcategories?: Array<{
      _id?: string;
      name?: string;
      slug?: string;
    }>;
  }>;
};

const ImageThumb = ({
  src,
  alt,
  size = 56,
}: {
  src?: string | null;
  alt?: string;
  size?: number;
}) => {
  if (!src) {
    return (
      <div
        className="rounded-full border border-orange-100 bg-orange-50"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt ?? ""}
      width={size}
      height={size}
      className="rounded-full border border-orange-100 object-cover"
      style={{ width: size, height: size }}
    />
  );
};

const LoadingCategoryBar = () => (
  <div className="relative z-30 border-b border-orange-100 bg-white/95">
    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
      <div className="flex gap-3 overflow-x-auto pb-1">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="flex min-w-[96px] animate-pulse flex-col items-center gap-2 rounded-2xl px-3 py-2"
          >
            <div className="h-14 w-14 rounded-full bg-orange-100" />
            <div className="h-3 w-16 rounded-full bg-orange-100" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function CategoryMegaBar() {
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [activeMainId, setActiveMainId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchMainCategories = async () => {
      try {
        const params = new URLSearchParams({
          page: "1",
          limit: "50",
        });
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/maincategories/getall?${params.toString()}`
        );
        const data = await res.json();
        if (!isMounted) return;
        const list = Array.isArray(data?.data) ? data.data : [];
        setMainCategories(list);
        setActiveMainId(list[0]?._id || null);
      } catch (error) {
        console.error("Failed to fetch main categories", error);
        if (isMounted) {
          setMainCategories([]);
          setActiveMainId(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchMainCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeMain = useMemo(() => {
    return (
      mainCategories.find((item) => item._id === activeMainId) ||
      mainCategories[0] ||
      null
    );
  }, [mainCategories, activeMainId]);

  if (isLoading) {
    return <LoadingCategoryBar />;
  }

  if (!mainCategories.length) {
    return null;
  }

  return (
    <div className="relative z-30 border-b border-orange-100 bg-white/95 shadow-[0_1px_0_rgba(253,186,116,0.2)]">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="group relative">
          <div className="flex items-start gap-2 overflow-x-auto pb-1">
            {mainCategories.map((main) => {
              const isActive = main._id === activeMain?._id;
              const href = main.slug
                ? `/main-categories/${main.slug}`
                : main._id
                  ? `/main-categories/${main._id}`
                  : "#";

              return (
                <Link
                  key={main._id || main.slug || main.name}
                  href={href}
                  onMouseEnter={() => setActiveMainId(main._id || null)}
                  onFocus={() => setActiveMainId(main._id || null)}
                  className={`flex min-w-[96px] flex-col items-center gap-2 rounded-2xl px-3 py-2 text-center text-xs font-semibold transition ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-700 hover:bg-orange-50/70 hover:text-orange-600"
                  }`}
                >
                  <div className="rounded-full bg-white p-0.5 shadow-sm ring-1 ring-orange-100">
                    <ImageThumb
                      src={main.image_url}
                      alt={main.name || "Category"}
                      size={56}
                    />
                  </div>
                  <span className="line-clamp-2">{main.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="absolute left-0 top-full hidden w-full pt-2 group-hover:block">
            <div className="w-full overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-[0_24px_70px_-28px_rgba(15,23,42,0.35)]">
              <div className="grid grid-cols-[220px_1fr]">
                <div className="max-h-[520px] overflow-auto border-r border-orange-100 bg-orange-50/40">
                  <div className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Main categories
                  </div>
                  {mainCategories.map((main) => {
                    const isActive = main._id === activeMain?._id;
                    const href = main.slug
                      ? `/main-categories/${main.slug}`
                      : main._id
                        ? `/main-categories/${main._id}`
                        : "#";

                    return (
                      <Link
                        key={main._id || main.slug || main.name}
                        href={href}
                        onMouseEnter={() => setActiveMainId(main._id || null)}
                        onFocus={() => setActiveMainId(main._id || null)}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition ${
                          isActive
                            ? "bg-white font-semibold text-slate-900"
                            : "text-slate-600 hover:bg-white hover:text-slate-900"
                        }`}
                      >
                        <ImageThumb
                          src={main.image_url}
                          alt={main.name || "Category"}
                          size={32}
                        />
                        <span>{main.name || "Unassigned"}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="max-h-[520px] overflow-auto p-6">
                  <div className="mb-4 text-lg font-semibold text-slate-900">
                    {activeMain?.name || "Categories"}
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {(activeMain?.categories || []).map((category) => (
                      <div key={category._id || category.slug || category.name}>
                        <Link
                          href={`/categories/${category.slug}`}
                          className="text-sm font-semibold text-slate-900 hover:text-orange-600"
                        >
                          {category.name}
                        </Link>
                        <div className="mt-3 flex flex-col gap-1 text-sm text-slate-500">
                          {(category.subcategories || []).length ? (
                            category.subcategories?.map((sub) => (
                              <Link
                                key={sub._id || sub.slug || sub.name}
                                href={`/sub-categories/${sub.slug}`}
                                className="hover:text-orange-600"
                              >
                                {sub.name}
                              </Link>
                            ))
                          ) : (
                            <span className="text-slate-400">
                              No subcategories
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {!activeMain?.categories?.length && (
                      <div className="text-sm text-slate-500">
                        No categories available yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
