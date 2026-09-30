import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { CartDrawer } from '../components/ui/CartDrawer';
import { MobileNav } from '../components/layout/MobileNav';

export const metadata: Metadata = {
  title: 'OPHMNART | Haute Édition',
  description:
    'Editorial luxury e-commerce house defining modern silhouettes, virgin wool tailoring, fine horology, and minimalist living.',
  keywords: ['luxury fashion', 'editorial menswear', 'haute couture', 'ophmart', 'designer apparel'],
  openGraph: {
    title: 'OPHMNART | Haute Édition',
    description: 'Modern silhouettes, virgin wool tailoring, fine horology, and minimalist living.',
    url: 'https://ophmart.com',
    siteName: 'OPHMNART',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-[#ffffff] text-[#121212]">
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Header />
              <CartDrawer />
              <main className="flex-1 pt-16 sm:pt-18 pb-16 lg:pb-0">{children}</main>
              <Footer />
              <MobileNav />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
