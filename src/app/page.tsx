"use client";
import PromotionalBanner from "@/components/promotional-banner";
import { useEffect } from "react";

import FullWidthBanner from "@/components/banner";
import EcommerceHeroPage from "@/components/main/Index";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/Navbar";
import Category from "@/components/Category";
import ProductsMainPage from "@/components/ProductMainPage";

declare global {
  interface Window {
    gtag: (event: string, name: string, params: Record<string, string>) => void;
  }
}

export default function Home() {
   useEffect(() => {
    const interval = setInterval(() => {
      if (window.gtag) {
        console.log("Sending vendor event...");
        window.gtag("event", "vendor_event", {
          vendor_id: "69105d3293e589da8f8efe7f",
        });
        clearInterval(interval);
      }
    }, 200);
  }, []);

  return (
    <>
      <PromotionalBanner />
      <Navbar />
      <FullWidthBanner />
      <Category/>
      <ProductsMainPage/>
      {/* <EcommerceHeroPage /> */}
      <Footer />
    </>
  );
}
