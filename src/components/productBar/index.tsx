"use client";

import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getAllCategories } from "@/store/slices/category";

export default function ProductNavbar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const categories = useSelector(
    (state: RootState) => (state as any).category.categories || []
  );

  const handleMouseEnter = (idx: number) => {
    setOpenIndex(idx);
  };

  const handleMouseLeave = () => {
    setOpenIndex(null);
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-40">
      <ul className="flex space-x-0 px-4 py-3 overflow-x-auto">
        {categories.map((category: any, idx: number) => (
          <li
            key={category.id}
            className="relative"
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={`/category/${category.slug}`}
              className="px-4 py-2 font-medium text-gray-800 hover:text-purple-600 hover:bg-purple-50 rounded whitespace-nowrap transition duration-200 inline-block"
            >
              {category.name}
            </Link>

            {/* Dropdown - Absolutely positioned, floats above */}
            {category.subcategories?.length > 0 && openIndex === idx && (
              <div
                className="absolute left-0 top-full mt-0 bg-white border border-gray-200 rounded-md shadow-2xl py-2 z-50 w-max pointer-events-auto"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                {category.subcategories.map((sub: any) => (
                  <Link
                    key={sub.id}
                    href={`/subcategory/${sub.slug}`}
                    className="block px-4 py-2 hover:bg-purple-100 text-gray-700 text-sm transition duration-150"
                  >
                    <span className="font-medium">{sub.name}</span>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {sub.description || "View More"}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}