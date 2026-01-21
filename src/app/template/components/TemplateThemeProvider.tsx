'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { useTemplateTheme } from './useTemplateTheme'

type Props = {
  children: ReactNode
}

export function TemplateThemeProvider({ children }: Props) {
  const { templateColor, bannerColor, fontScale } = useTemplateTheme()
  const initialStyles = useRef<{
    fontSize: string
    templateColor: string
    bannerColor: string
    fontScale: string
  } | null>(null)

  useEffect(() => {
    const root = document.documentElement
    if (!initialStyles.current) {
      initialStyles.current = {
        fontSize: root.style.fontSize,
        templateColor: root.style.getPropertyValue('--template-color'),
        bannerColor: root.style.getPropertyValue('--template-banner-color'),
        fontScale: root.style.getPropertyValue('--template-font-scale'),
      }
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--template-color', templateColor)
    root.style.setProperty('--template-banner-color', bannerColor)
    root.style.setProperty('--template-font-scale', String(fontScale))
    root.style.fontSize = `${16 * fontScale}px`
  }, [templateColor, bannerColor, fontScale])

  useEffect(() => {
    return () => {
      if (!initialStyles.current) return
      const root = document.documentElement
      root.style.fontSize = initialStyles.current.fontSize
      root.style.setProperty('--template-color', initialStyles.current.templateColor)
      root.style.setProperty(
        '--template-banner-color',
        initialStyles.current.bannerColor
      )
      root.style.setProperty(
        '--template-font-scale',
        initialStyles.current.fontScale
      )
    }
  }, [])

  return <div className="template-theme">{children}</div>
}
