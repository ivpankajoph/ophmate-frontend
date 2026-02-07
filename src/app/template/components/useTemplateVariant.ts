'use client'

import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'next/navigation'

export type TemplateVariantKey = 'classic' | 'studio' | 'minimal'

export type TemplateVariant = {
  key: TemplateVariantKey
  name: string
  description: string
}

export const TEMPLATE_VARIANTS: TemplateVariant[] = [
  {
    key: 'classic',
    name: 'Classic Luxe',
    description: 'Elegant hero-first layout with refined serif accents.',
  },
  {
    key: 'studio',
    name: 'Studio Bold',
    description: 'Editorial grid, high-contrast panels, bold CTAs.',
  },
  {
    key: 'minimal',
    name: 'Minimal Market',
    description: 'Clean, airy, product-forward storefront.',
  },
]

export const DEFAULT_TEMPLATE_VARIANT: TemplateVariantKey = 'classic'

const normalizeVariantKey = (value: unknown): TemplateVariantKey | undefined => {
  if (typeof value !== 'string') return undefined
  const key = value.trim().toLowerCase()
  if (!key) return undefined
  if (key.includes('studio')) return 'studio'
  if (key.includes('minimal')) return 'minimal'
  if (key.includes('classic')) return 'classic'
  if (key === '0') return 'classic'
  if (key === '1') return 'studio'
  if (key === '2') return 'minimal'
  return undefined
}

export function useTemplateVariant() {
  const searchParams = useSearchParams()
  const previewKey = searchParams?.get('preview') || searchParams?.get('template')
  const rawKey = useSelector(
    (state: any) =>
      state?.alltemplatepage?.data?.template_key ||
      state?.alltemplatepage?.data?.templateKey
  )

  return useMemo(() => {
    const key = normalizeVariantKey(previewKey) || normalizeVariantKey(rawKey)
    const match = TEMPLATE_VARIANTS.find((item) => item.key === key)
    return match || TEMPLATE_VARIANTS[0]
  }, [previewKey, rawKey])
}
