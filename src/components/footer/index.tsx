"use client";

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import CustomerQueryForm from "./CustomerQueryForm";

const vendorCategories = [
  [
    "Sell Mobile Online",
    "Sell Clothes Online",
    "Sell Sarees Online",
    "Sell Electronics Online",
    "Sell Women Clothes Online",
  ],
  [
    "Sell Shoes Online",
    "Sell Jewellery Online",
    "Sell Tshirts Online",
    "Sell Furniture Online",
    "Sell Makeup Online",
  ],
  [
    "Sell Paintings Online",
    "Sell Watch Online",
    "Sell Books Online",
    "Sell Home Products Online",
    "Sell Kurtis Online",
  ],
  [
    "Sell Beauty Products Online",
    "Sell Toys Online",
    "Sell Appliances Online",
    "Sell Shirts Online",
    "Sell Indian Clothes Online",
  ],
];

const vendorFooterLinks = [
  {
    title: "Sell Online",
    items: [
      "Create Account",
      "List Products",
      "Storage & Shipping",
      "Fees & Commission",
      "Help & Support",
    ],
  },
  {
    title: "Grow Your Business",
    items: [
      "Insights & Tools",
      "OPH Ads",
      "Value Seller Services",
      "Shopping Festivals",
    ],
  },
  {
    title: "Learn More",
    items: ["FAQs", "Seller Success Stories", "Seller Blogs"],
  },
];

export default function Footer() {
  const customerUser = useSelector((state: any) => state.customerAuth?.user);
  const vendorToken = useSelector((state: any) => state.auth?.token);
  const pathname = usePathname();
  const isVendorRegistration = pathname?.startsWith("/vendor/registration");
  const isVendor = pathname?.startsWith("/vendor");
  const vendorTarget = vendorToken ? "/vendor" : "/vendor/registration";

  if (isVendorRegistration) {
    return null;
  }

  if (isVendor) {
    return (
      <footer className="mt-20 bg-white text-neutral-900 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h3 className="text-center text-4xl font-semibold">
            Popular categories to sell across India
          </h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-sm">
            {vendorCategories.map((column, index) => (
              <ul key={`category-col-${index}`} className="space-y-2">
                {column.map((item) => (
                  <li key={item}>
                    <Link
                      href={vendorTarget}
                      className="text-neutral-700 hover:text-neutral-900 transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
            {vendorFooterLinks.map((section) => (
              <div key={section.title}>
                <h4 className="text-neutral-900 font-semibold mb-3">
                  {section.title}
                </h4>
                <ul className="space-y-2 text-neutral-700">
                  {section.items.map((item) => (
                    <li key={item}>
                      <Link
                        href={vendorTarget}
                        className="hover:text-neutral-900 transition"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="space-y-5">
              <div>
                <h4 className="text-neutral-900 font-semibold mb-3">
                  Download Mobile App
                </h4>
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    className="w-full rounded-lg border border-border bg-neutral-50 px-4 py-2 text-left text-xs font-semibold"
                  >
                    Get it on Google Play
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-lg border border-border bg-neutral-50 px-4 py-2 text-left text-xs font-semibold"
                  >
                    Download on the App Store
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-neutral-900 font-semibold mb-3">Stay Connected</h4>
                <div className="flex items-center gap-3 text-neutral-700">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 border border-border">
                    <Facebook className="h-4 w-4" />
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 border border-border">
                    <Instagram className="h-4 w-4" />
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 border border-border">
                    <Linkedin className="h-4 w-4" />
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 border border-border">
                    <Youtube className="h-4 w-4" />
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 border border-border">
                    <Twitter className="h-4 w-4" />
                  </span>
                </div>
              </div>



              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 z-50 group flex items-center justify-center w-14 h-14 rounded-full bg-[rgb(147,51,234)] text-white shadow-[0_8px_30px_rgb(147,51,234,0.4)] hover:shadow-[0_8px_30px_rgb(147,51,234,0.7)] transition-all duration-300 hover:-translate-y-2 active:scale-90"
                aria-label="Scroll to top"
              >
                {/* The Icon */}
                <ChevronUp
                  size={28}
                  className="group-hover:animate-bounce"
                />
                {/* Optional: Subtle pulse ring for extra visibility */}
                <span className="absolute inset-0 rounded-full bg-[rgb(147,51,234)] opacity-20 animate-ping group-hover:hidden" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-muted/30 text-foreground border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr]">
        <div className="rounded-2xl border border-border/60 bg-background/70 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-semibold">
              SL
            </div>
            <div>
              <h3 className="text-lg font-bold">SellersLogin</h3>
              <p className="text-xs text-muted-foreground">
                Smart shopping, locally delivered.
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mt-4">
            Your one-stop online store for everything you love. Shop the latest
            trends, unbeatable deals, and premium products -- all in one place.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            <Link
              href="#"
              className="px-3 py-1.5 rounded-full border border-border/70 bg-background hover:bg-primary/10 transition text-xs"
            >
              Facebook
            </Link>
            <Link
              href="#"
              className="px-3 py-1.5 rounded-full border border-border/70 bg-background hover:bg-primary/10 transition text-xs"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="px-3 py-1.5 rounded-full border border-border/70 bg-background hover:bg-primary/10 transition text-xs"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="px-3 py-1.5 rounded-full border border-border/70 bg-background hover:bg-primary/10 transition text-xs"
            >
              YouTube
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:underline">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:underline">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/returns" className="hover:underline">
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:underline">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/data-deletion" className="hover:underline">
                Data Deletion
              </Link>
            </li>
            {customerUser && (
              <li className="pt-2">
                <CustomerQueryForm />
              </li>
            )}
          </ul>

        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1" />
              <span>
                Office No 834 Gaur City Mall, Greater Noida, Gautam Budhdha Nagar
                201310, India
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href="tel:+919873138444" className="hover:underline">
                +91 9873138444
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:support@sellerslogin.com" className="hover:underline">
                support@sellerslogin.com
              </a>
            </li>
          </ul>

        </div>
      </div>

      <div className="border-t border-border py-4 text-center text-xs sm:text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 px-6">
          <p>(c) {new Date().getFullYear()} SellersLogin. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
