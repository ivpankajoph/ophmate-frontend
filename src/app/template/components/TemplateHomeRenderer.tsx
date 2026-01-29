'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import LandingPageDev from './HeroSection'
import Hero2 from './Hero2'
import TrendingProducts from './TrendingProducts'
import OurCategories from './Category'
import PopularProducts from './PopularProducts'
import CustomerTestimonials from './Testimonials'
import FaqsDev from './Faqs'
import { useTemplateVariant } from './useTemplateVariant'

export function TemplateHomeRenderer() {
  const variant = useTemplateVariant()
  const params = useParams()
  const vendorId = String((params as any)?.vendor_id || '')
  const template = useSelector((state: any) => state?.alltemplatepage?.data)
  const products = useSelector((state: any) => state?.alltemplatepage?.products || [])
  const home = template?.components?.home_page || {}

  if (variant.key === 'studio') {
    return (
      <div className='template-home template-home-studio'>
        <section className='px-6 py-16 lg:px-12'>
          <div className='mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]'>
            <div>
              <p className='text-xs uppercase tracking-[0.5em] text-slate-400'>
                {home.hero_kicker || 'Studio collection'}
              </p>
              <h1 className='mt-4 text-5xl font-semibold text-white'>
                {home.header_text || 'Design-forward storefronts'}
              </h1>
              <p className='mt-4 text-lg text-slate-300'>
                {home.header_text_small ||
                  'High contrast, editorial layouts, bold product grids.'}
              </p>
              <div className='mt-8 flex flex-wrap items-center gap-4'>
                <Link
                  href={vendorId ? `/template/${vendorId}/all-products` : '#'}
                  className='rounded-none bg-gradient-to-r from-sky-400 to-indigo-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-slate-900'
                >
                  {home.button_header || 'Explore'}
                </Link>
                <span className='text-xs uppercase tracking-[0.3em] text-slate-400'>
                  {home.button_secondary || 'Limited drops'}
                </span>
              </div>
            </div>
            <div className='overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70'>
              {home.backgroundImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={home.backgroundImage}
                  alt='Studio hero'
                  className='h-full w-full object-cover'
                />
              ) : (
                <div className='flex h-80 items-center justify-center text-xs uppercase tracking-[0.4em] text-slate-500'>
                  Hero image
                </div>
              )}
            </div>
          </div>
        </section>

        <section className='mx-auto max-w-7xl px-6 pb-16 lg:px-12'>
          <div className='grid gap-6 md:grid-cols-3'>
            {['Live drop', 'Fast shipping', 'Curated picks'].map((item) => (
              <div
                key={item}
                className='rounded-xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-200'
              >
                <p className='text-xs uppercase tracking-[0.3em] text-slate-400'>
                  {item}
                </p>
                <p className='mt-3 text-lg font-semibold'>Studio quality</p>
                <p className='mt-2 text-slate-400'>
                  Designed to spotlight your best products with high contrast.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className='mx-auto max-w-7xl px-6 pb-16 lg:px-12'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-semibold text-white'>Latest products</h2>
            <Link
              href={vendorId ? `/template/${vendorId}/all-products` : '#'}
              className='text-xs uppercase tracking-[0.3em] text-slate-400'
            >
              View all
            </Link>
          </div>
          <div className='mt-6 grid gap-6 md:grid-cols-3'>
            {products.slice(0, 6).map((product: any) => (
              <Link
                key={product?._id}
                href={`/template/${vendorId}/product/${product?._id}`}
                className='group rounded-xl border border-slate-800 bg-slate-900/70 p-4'
              >
                <div className='aspect-[4/3] overflow-hidden rounded-lg bg-slate-800'>
                  {product?.defaultImages?.[0]?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.defaultImages[0].url}
                      alt={product.productName}
                      className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                  ) : null}
                </div>
                <p className='mt-4 text-sm text-slate-400'>
                  {product?.productCategoryName || 'Collection'}
                </p>
                <p className='mt-1 text-lg font-semibold text-white'>
                  {product?.productName || 'Product'}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    )
  }

  if (variant.key === 'minimal') {
    return (
      <div className='template-home template-home-minimal'>
        <section className='mx-auto max-w-6xl px-6 py-16'>
          <p className='text-xs uppercase tracking-[0.4em] text-slate-400'>
            {home.hero_kicker || 'Simple storefront'}
          </p>
          <h1 className='mt-4 text-5xl font-semibold text-slate-900'>
            {home.header_text || 'Minimal, clean, product-first'}
          </h1>
          <p className='mt-4 text-lg text-slate-600'>
            {home.header_text_small || 'No clutter. Just your products.'}
          </p>
          <div className='mt-8 flex flex-wrap items-center gap-4'>
            <Link
              href={vendorId ? `/template/${vendorId}/all-products` : '#'}
              className='rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white'
            >
              {home.button_header || 'Shop now'}
            </Link>
            <span className='text-sm text-slate-500'>
              {home.button_secondary || 'Fresh arrivals'}
            </span>
          </div>
        </section>

        <section className='mx-auto max-w-6xl px-6 pb-16'>
          <div className='grid gap-8 md:grid-cols-2'>
            {products.slice(0, 4).map((product: any) => (
              <Link
                key={product?._id}
                href={`/template/${vendorId}/product/${product?._id}`}
                className='rounded-3xl border border-slate-200 bg-white p-5'
              >
                <div className='aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100'>
                  {product?.defaultImages?.[0]?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.defaultImages[0].url}
                      alt={product.productName}
                      className='h-full w-full object-cover'
                    />
                  ) : null}
                </div>
                <p className='mt-4 text-xs uppercase tracking-[0.3em] text-slate-400'>
                  {product?.productCategoryName || 'Category'}
                </p>
                <p className='mt-2 text-lg font-semibold text-slate-900'>
                  {product?.productName || 'Product'}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className='template-home template-home-classic'>
      <LandingPageDev />
      <Hero2 />
      <TrendingProducts />
      <OurCategories />
      <PopularProducts />
      <CustomerTestimonials />
      <FaqsDev />
    </div>
  )
}
