"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Heart, Menu, Moon, Search, Store, Sun, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import CartDrawer from "../cart/CartDrawer"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store"
import { logoutCustomer } from "@/store/slices/customerAuthSlice"
import { useRouter } from "next/navigation"
import useDebounce from "@/hooks/useDebounce"

type SearchResult = {
  type: "product" | "category"
  id: string
  name: string
  slug?: string | null
  categorySlug?: string | null
  imageUrl?: string | null
}

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [search, setSearch] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: RootState) => state.customerAuth.token)
  const wishlistCount = useSelector(
    (state: RootState) => state.customerWishlist?.items?.length || 0,
  )
  const router = useRouter()
  const apiBase = useMemo(() => process.env.NEXT_PUBLIC_API_URL || "", [])
  const debouncedSearch = useDebounce(search, 350)

  useEffect(() => {
    const query = debouncedSearch.trim()
    if (!query) {
      setResults([])
      setIsLoading(false)
      return
    }
    if (!apiBase) {
      setResults([])
      return
    }

    const controller = new AbortController()
    let isActive = true

    const runSearch = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `${apiBase}/search?query=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        )
        if (!response.ok) {
          throw new Error("Search request failed")
        }
        const data = await response.json()
        if (isActive) {
          setResults(Array.isArray(data?.results) ? data.results : [])
        }
      } catch (error: any) {
        if (error?.name !== "AbortError") {
          console.error("Search error:", error)
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    runSearch()

    return () => {
      isActive = false
      controller.abort()
    }
  }, [apiBase, debouncedSearch])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "Deals", href: "/deals" },
    { name: "Contact", href: "/contact" },
  ]

  const handleResultClick = (result: SearchResult) => {
    const targetSlug =
      result.type === "product" ? result.categorySlug : result.slug
    if (targetSlug) {
      router.push(`/categories/${targetSlug}`)
    }
    setSearch("")
    setResults([])
  }

  const renderResults = search.trim().length > 0

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/92 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-slate-700 hover:bg-slate-100 md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/sellerslogin-logo.svg"
                  alt="OPH-Mart"
                  width={44}
                  height={44}
                  className="h-11 w-11"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Sellerslogin
                  </p>
                  <p className="text-xs text-slate-500">
                    Smart sourcing marketplace
                  </p>
                </div>
              </div>
              <nav className="mt-8 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/sellerslogin-logo.svg"
              alt="OPH-Mart"
              width={52}
              height={52}
              className="h-12 w-12"
            />
            <div className="hidden xl:block">
              <p className="text-sm font-semibold tracking-wide text-slate-900">
                Sellerslogin
              </p>
              <p className="text-xs text-slate-500">
                Smart sourcing marketplace
              </p>
            </div>
          </Link>
        </div>

        <div className="hidden flex-1 justify-center md:flex">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search products, categories, or brands"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 rounded-full border-slate-200 bg-slate-50/80 pl-11 pr-4 shadow-sm transition focus-visible:border-orange-300 focus-visible:ring-orange-100"
            />
            {renderResults && (
              <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_24px_70px_-28px_rgba(15,23,42,0.35)]">
                {isLoading ? (
                  <div className="p-4 text-sm text-slate-500">Searching...</div>
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
                          <Image
                            src={result.imageUrl}
                            alt={result.name}
                            width={44}
                            height={44}
                            className="h-11 w-11 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xs font-semibold text-slate-500">
                            IMG
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-900">
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
                    No results found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <Button
            asChild
            variant="outline"
            className="hidden h-10 rounded-full border-orange-200 bg-orange-50 px-4 text-sm font-semibold text-orange-700 shadow-sm transition hover:bg-orange-100 lg:inline-flex"
          >
            <Link href="/vendor">
              <Store className="h-4 w-4" />
              Become a Seller
            </Link>
          </Button>

          <Link href="/wishlist">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              aria-label="Wishlist"
            >
              <Heart
                className={`h-5 w-5 ${
                  wishlistCount > 0 ? "fill-red-500 text-red-500" : ""
                }`}
              />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Button>
          </Link>

          <CartDrawer />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/orders">My Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/cart">View Cart</Link>
              </DropdownMenuItem>
              {token ? (
                <DropdownMenuItem onClick={() => dispatch(logoutCustomer())}>
                  Logout
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href="/login">Sign In</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <div className="border-t border-slate-200/70 bg-white/90 px-4 py-3 md:hidden sm:px-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search products, categories, or brands"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 rounded-full border-slate-200 bg-slate-50/80 pl-11 pr-4 shadow-sm transition focus-visible:border-orange-300 focus-visible:ring-orange-100"
          />
          {renderResults && (
            <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_24px_70px_-28px_rgba(15,23,42,0.35)]">
              {isLoading ? (
                <div className="p-4 text-sm text-slate-500">Searching...</div>
              ) : results.length > 0 ? (
                <div className="max-h-80 overflow-y-auto">
                  {results.map((result) => (
                    <button
                      key={`${result.type}-${result.id}-mobile`}
                      type="button"
                      onClick={() => handleResultClick(result)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-orange-50/70"
                    >
                      {result.imageUrl ? (
                        <Image
                          src={result.imageUrl}
                          alt={result.name}
                          width={44}
                          height={44}
                          className="h-11 w-11 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xs font-semibold text-slate-500">
                          IMG
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-900">
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
                  No results found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
