import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore - CSS global import has no type declarations
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import VendorProvider from "@/providers/VendorProvider";
import Script from "next/script";
import GoogleAnalytics from "@/components/google-analytics/GoogleAnalytics";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";

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
        <VendorProvider>
          <GoogleAnalytics />
          <ReduxProvider>
            <AnalyticsTracker />
            {children}
          </ReduxProvider>
        </VendorProvider>
      </body>
    </html>
  );
}
