'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAlltemplatepageTemplate } from '@/store/slices/alltemplateslice'
import { fetchVendorProfile } from '@/store/slices/vendorProfileSlice'
import type { AppDispatch } from '@/store'

type Props = {
  vendorId?: string
}

export function TemplateDataLoader({ vendorId }: Props) {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!vendorId) return
    const load = () => {
      dispatch(fetchAlltemplatepageTemplate(vendorId))
      dispatch(fetchVendorProfile(vendorId))
    }
    load()

    const handleFocus = () => load()
    const handleVisibility = () => {
      if (document.visibilityState === "visible") load()
    }

    window.addEventListener("focus", handleFocus)
    document.addEventListener("visibilitychange", handleVisibility)
    return () => {
      window.removeEventListener("focus", handleFocus)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [dispatch, vendorId])

  return null
}
