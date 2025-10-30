import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore - CSS global import has no type declarations
import "./globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import ReduxProvider from "@/providers/ReduxProvider";
import PromotionalBanner from "@/components/promotional-banner";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer";
import ProductNavbar from "@/components/productBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OPH-mart",
  description: "design and developed by ivpankaj",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PromotionalBanner />
        <Navbar />
        {/* <ProductNavbar/> */}
        <ReduxProvider>{children}</ReduxProvider>
        <Footer />
      </body>
    </html>
  );
}
