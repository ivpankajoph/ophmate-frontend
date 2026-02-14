'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlltemplatepageTemplate } from '@/store/slices/alltemplateslice'
import { fetchVendorProfile } from '@/store/slices/vendorProfileSlice'
import type { AppDispatch, RootState } from '@/store'

type Props = {
  vendorId?: string
}

const DATA_STALE_MS = 2 * 60 * 1000
const FOCUS_REFRESH_COOLDOWN_MS = 20 * 1000

export function TemplateDataLoader({ vendorId }: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const focusRefreshRef = useRef(0)
  const {
    templateData,
    templateLoading,
    templateVendorId,
    templateLastFetchedAt,
    vendorProfile,
    vendorLoading,
    vendorVendorId,
    vendorLastFetchedAt,
  } = useSelector((state: RootState) => ({
    templateData: state.alltemplatepage?.data,
    templateLoading: Boolean(state.alltemplatepage?.loading),
    templateVendorId: state.alltemplatepage?.currentVendorId || null,
    templateLastFetchedAt: state.alltemplatepage?.lastFetchedAt || null,
    vendorProfile: state.vendorprofilepage?.vendor,
    vendorLoading: Boolean(state.vendorprofilepage?.loading),
    vendorVendorId: state.vendorprofilepage?.currentVendorId || null,
    vendorLastFetchedAt: state.vendorprofilepage?.lastFetchedAt || null,
  }))

  const refreshIfStale = useCallback(() => {
    if (!vendorId) return
    const now = Date.now()

    const templateIsFresh =
      templateVendorId === vendorId &&
      Boolean(templateData) &&
      typeof templateLastFetchedAt === 'number' &&
      now - templateLastFetchedAt < DATA_STALE_MS

    const vendorIsFresh =
      vendorVendorId === vendorId &&
      Boolean(vendorProfile) &&
      typeof vendorLastFetchedAt === 'number' &&
      now - vendorLastFetchedAt < DATA_STALE_MS

    if (!templateIsFresh && !templateLoading) {
      dispatch(fetchAlltemplatepageTemplate(vendorId))
    }
    if (!vendorIsFresh && !vendorLoading) {
      dispatch(fetchVendorProfile(vendorId))
    }
  }, [
    dispatch,
    templateData,
    templateLastFetchedAt,
    templateLoading,
    templateVendorId,
    vendorId,
    vendorLastFetchedAt,
    vendorLoading,
    vendorProfile,
    vendorVendorId,
  ])

  useEffect(() => {
    if (!vendorId) return
    refreshIfStale()

    const handleFocus = () => {
      const now = Date.now()
      if (now - focusRefreshRef.current < FOCUS_REFRESH_COOLDOWN_MS) return
      focusRefreshRef.current = now
      refreshIfStale()
    }
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") return
      handleFocus()
    }

    window.addEventListener("focus", handleFocus)
    document.addEventListener("visibilitychange", handleVisibility)
    return () => {
      window.removeEventListener("focus", handleFocus)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [refreshIfStale, vendorId])

  return null
}
