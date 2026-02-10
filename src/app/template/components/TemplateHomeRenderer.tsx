'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import LandingPageDev from './HeroSection'
import { useTemplateVariant } from './useTemplateVariant'
import { getTemplateAuth, templateApiFetch } from './templateAuth'

type Product = {
  _id?: string
  productName?: string
  shortDescription?: string
  productCategory?: { _id?: string; name?: string; title?: string; categoryName?: string } | string
  productCategoryName?: string
  defaultImages?: Array<{ url?: string }>
  variants?: Array<{
    _id?: string
    finalPrice?: number
    stockQuantity?: number
  }>
}

const getMinPrice = (variants: Array<{ finalPrice?: number }> = []) => {
  const values = variants
    .map((variant) => variant.finalPrice)
    .filter((value): value is number => typeof value === 'number')
  return values.length ? Math.min(...values) : 0
}

const getCategoryLabel = (product: Product) => {
  if (product.productCategoryName) return product.productCategoryName
  if (typeof product.productCategory === 'string') {
    return /^[a-f\d]{24}$/i.test(product.productCategory)
      ? ''
      : product.productCategory
  }
  return (
    product.productCategory?.name ||
    product.productCategory?.title ||
    product.productCategory?.categoryName ||
    ''
  )
}

const getCategoryId = (product: Product) => {
  if (typeof product.productCategory === 'string') {
    return /^[a-f\d]{24}$/i.test(product.productCategory)
      ? product.productCategory
      : undefined
  }
  return product.productCategory?._id
}

const toCategorySlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

export function TemplateHomeRenderer() {
  const variant = useTemplateVariant()
  const params = useParams()
  const vendorId = String((params as any)?.vendor_id || '')
  const template = useSelector((state: any) => state?.alltemplatepage?.data)
  const products = useSelector(
    (state: any) => (state?.alltemplatepage?.products || []) as Product[]
  )
  const [addingId, setAddingId] = useState<string | null>(null)
  const [actionMessage, setActionMessage] = useState('')

  const categoryEntries = useMemo(() => {
    const map = new Map<string, { label: string; id?: string }>()
    products.forEach((product) => {
      const label = getCategoryLabel(product)
      if (!label) return
      const id = getCategoryId(product)
      const key = id || label
      if (!map.has(key)) map.set(key, { label, id })
    })
    return Array.from(map.values())
  }, [products])

  const home = template?.components?.home_page || {}
  const heroImage = home?.backgroundImage || template?.previewImage || ''
  const description = home?.description || {}
  const features = Array.isArray(description?.features) ? description.features : []
  const faqSection = template?.components?.social_page?.faqs || {}
  const faqItems = Array.isArray(faqSection?.faqs) ? faqSection.faqs : []

  const handleAddToCart = async (product: Product) => {
    setActionMessage('')
    if (!vendorId || !product?._id) return
    const auth = getTemplateAuth(vendorId)
    if (!auth) {
      window.location.href = `/template/${vendorId}/login?next=/template/${vendorId}`
      return
    }
    const variantId = product?.variants?.[0]?._id
    if (!variantId) {
      setActionMessage('Variant not available for this product.')
      return
    }
    setAddingId(product._id)
    try {
      await templateApiFetch(vendorId, '/cart', {
        method: 'POST',
        body: JSON.stringify({
          product_id: product._id,
          variant_id: variantId,
          quantity: 1,
        }),
      })
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('template-cart-updated'))
      }
      setActionMessage('Added to cart.')
    } catch (error: any) {
      setActionMessage(error?.message || 'Failed to add to cart.')
    } finally {
      setAddingId(null)
    }
  }

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
          <div className='grid items-center gap-10 lg:grid-cols-[1fr_1fr]'>
            <div>
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
            </div>

            <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm'>
              {heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={heroImage}
                  alt='Storefront hero'
                  className='h-72 w-full object-cover sm:h-80 lg:h-[420px]'
                />
              ) : (
                <div className='flex h-72 items-center justify-center text-xs uppercase tracking-[0.3em] text-slate-400 sm:h-80 lg:h-[420px]'>
                  Hero image
                </div>
              )}
            </div>
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

      <section className='mx-auto max-w-7xl px-6 py-16'>
        <div className='grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[1.2fr_0.8fr]'>
          <div className='space-y-4'>
            <p className='text-xs font-semibold uppercase tracking-[0.32em] text-slate-400'>
              Brand Story
            </p>
            <h2 className='text-2xl font-semibold text-slate-900 sm:text-3xl'>
              {description?.large_text || 'A storefront built for modern shoppers.'}
            </h2>
            <p className='text-sm text-slate-600 sm:text-base'>
              {description?.summary ||
                'Curate products, tell your story, and convert shoppers faster.'}
            </p>
          </div>
          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <p className='text-xs uppercase tracking-[0.3em] text-slate-400'>Success</p>
              <p className='mt-2 text-3xl font-semibold text-slate-900'>
                {description?.percent?.percent_in_number || '92'}
                <span className='text-lg text-slate-500'>%</span>
              </p>
              <p className='text-sm text-slate-500'>
                {description?.percent?.percent_text || 'Satisfied buyers'}
              </p>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <p className='text-xs uppercase tracking-[0.3em] text-slate-400'>Sold</p>
              <p className='mt-2 text-3xl font-semibold text-slate-900'>
                {description?.sold?.sold_number || '0'}
              </p>
              <p className='text-sm text-slate-500'>
                {description?.sold?.sold_text || 'Products shipped'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {features.length > 0 && (
        <section className='mx-auto max-w-7xl px-6 pb-16'>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {features.slice(0, 8).map((feature: any, index: number) => (
              <div
                key={`${feature?.title || 'feature'}-${index}`}
                className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'
              >
                <p className='text-lg font-semibold text-slate-900'>
                  {feature?.title || 'Feature'}
                </p>
                <p className='mt-2 text-sm text-slate-600'>
                  {feature?.description || 'Add feature details from template editor.'}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className='mx-auto max-w-7xl px-6 pb-16'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.32em] text-slate-400'>
              {home?.products_kicker || 'Catalog'}
            </p>
            <h3 className='text-2xl font-semibold text-slate-900'>
              {home?.products_heading || 'Products in this store'}
            </h3>
          </div>
          <p className='text-sm text-slate-500'>
            {home?.products_subtitle || `${products.length} products available`}
          </p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          <Link
            href={`/template/${vendorId}/all-products`}
            className='rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900'
          >
            All products
          </Link>
          {categoryEntries.map((entry) => {
            const slug = entry.id || toCategorySlug(entry.label)
            return (
              <Link
                key={`${entry.label}-${slug}`}
                href={`/template/${vendorId}/category/${slug}`}
                className='rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900'
              >
                {entry.label}
              </Link>
            )
          })}
        </div>

        <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {products.slice(0, 9).map((product, index) => (
            <div
              key={product._id || `${product.productName}-${index}`}
              className='group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg'
            >
              <Link href={product?._id ? `/template/${vendorId}/product/${product._id}` : '#'}>
                <div className='aspect-[4/3] overflow-hidden bg-slate-100'>
                  {product.defaultImages?.[0]?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.defaultImages[0].url}
                      alt={product.productName || 'Product'}
                      className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
                    />
                  ) : (
                    <div className='flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.3em] text-slate-400'>
                      No Image
                    </div>
                  )}
                </div>
              </Link>

              <div className='space-y-2 p-4'>
                {getCategoryLabel(product) ? (
                  <span className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
                    {getCategoryLabel(product)}
                  </span>
                ) : null}
                <Link href={product?._id ? `/template/${vendorId}/product/${product._id}` : '#'}>
                  <p className='text-sm font-semibold text-slate-900'>
                    {product.productName || 'Untitled Product'}
                  </p>
                </Link>
                <p className='line-clamp-2 text-xs text-slate-500'>
                  {product.shortDescription || 'No description yet.'}
                </p>
                <div className='flex items-center justify-between gap-3'>
                  <span className='text-sm font-semibold text-slate-900'>
                    Rs. {getMinPrice(product.variants).toLocaleString()}
                  </span>
                  <button
                    type='button'
                    className='rounded-full border border-slate-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:border-slate-900 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60'
                    disabled={
                      !product?._id ||
                      addingId === product._id ||
                      (product.variants?.[0]?.stockQuantity ?? 1) <= 0
                    }
                    onClick={() => handleAddToCart(product)}
                  >
                    {(product.variants?.[0]?.stockQuantity ?? 1) <= 0
                      ? 'Out'
                      : addingId === product._id
                        ? 'Adding'
                        : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div className='col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500'>
              No products found for this vendor yet.
            </div>
          )}
        </div>
        {actionMessage && <p className='mt-3 text-sm text-slate-500'>{actionMessage}</p>}
      </section>

      <section className='mx-auto max-w-7xl px-6 pb-16'>
        <h2 className='text-3xl font-semibold text-slate-900'>
          {faqSection?.heading || 'Frequently Asked Questions'}
        </h2>
        <p className='mt-2 text-sm text-slate-600'>
          {faqSection?.subheading || 'Quick answers to common questions'}
        </p>

        <div className='mt-6 grid gap-4 md:grid-cols-2'>
          {faqItems.slice(0, 8).map((faq: any, index: number) => (
            <div
              key={`${faq?.question || 'faq'}-${index}`}
              className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'
            >
              <h3 className='text-base font-semibold text-slate-900'>
                {faq?.question || 'Question'}
              </h3>
              <p className='mt-2 text-sm text-slate-600'>{faq?.answer || 'Answer not available.'}</p>
            </div>
          ))}
          {faqItems.length === 0 && (
            <div className='rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500 md:col-span-2'>
              No FAQs added yet.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
