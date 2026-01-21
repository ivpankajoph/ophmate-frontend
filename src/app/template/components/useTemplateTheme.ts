'use client'

import { useMemo } from 'react'
import { useSelector } from 'react-redux'

const DEFAULT_THEME = {
  templateColor: '#0f172a',
  bannerColor: '#0f172a',
  fontScale: 1,
}

type ThemePayload = {
  templateColor?: string
  bannerColor?: string
  fontScale?: number
}

export function useTemplateTheme() {
  const theme = useSelector(
    (state: any) => state?.alltemplatepage?.data?.components?.theme
  ) as ThemePayload | undefined

  return useMemo(() => {
    const templateColor = theme?.templateColor || DEFAULT_THEME.templateColor
    const bannerColor = theme?.bannerColor || DEFAULT_THEME.bannerColor
    const fontScale =
      typeof theme?.fontScale === 'number' && Number.isFinite(theme.fontScale)
        ? theme.fontScale
        : DEFAULT_THEME.fontScale

    return {
      templateColor,
      bannerColor,
      fontScale,
    }
  }, [theme?.templateColor, theme?.bannerColor, theme?.fontScale])
}
