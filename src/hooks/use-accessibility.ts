"use client"

import { useCallback, useEffect, useState } from "react"

export type AccessibilitySettings = {
  highContrast: boolean
  dyslexiaFont: boolean
  reduceMotion: boolean
  fontScale: number
  focusHighlight: boolean
  colorBlindFriendly: boolean
  calmTypography: boolean
  captionedMedia: boolean
  signLanguageGuide: boolean
  motorSupport: boolean
}

const STORAGE_KEY = "engelsizforum-accessibility"
const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  dyslexiaFont: false,
  reduceMotion: false,
  focusHighlight: true,
  fontScale: 1,
  colorBlindFriendly: false,
  calmTypography: false,
  captionedMedia: false,
  signLanguageGuide: false,
  motorSupport: false,
}

const applyToDocument = (settings: AccessibilitySettings) => {
  if (typeof document === "undefined") return
  const root = document.documentElement
  root.dataset.highContrast = settings.highContrast ? "true" : "false"
  root.dataset.dyslexic = settings.dyslexiaFont ? "true" : "false"
  root.dataset.reduceMotion = settings.reduceMotion ? "true" : "false"
  root.dataset.focusHighlight = settings.focusHighlight ? "true" : "false"
  root.dataset.colorBlindFriendly = settings.colorBlindFriendly ? "true" : "false"
  root.dataset.calmTypography = settings.calmTypography ? "true" : "false"
  root.dataset.captionedMedia = settings.captionedMedia ? "true" : "false"
  root.dataset.signLanguage = settings.signLanguageGuide ? "true" : "false"
  root.dataset.motorSupport = settings.motorSupport ? "true" : "false"
  root.style.setProperty("--accessibility-font-scale", settings.fontScale.toString())
}

export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AccessibilitySettings
        setSettings({ ...defaultSettings, ...parsed })
        applyToDocument({ ...defaultSettings, ...parsed })
      } catch (error) {
        console.warn("Erişilebilirlik tercihleri okunamadı", error)
      }
    } else {
      applyToDocument(defaultSettings)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    applyToDocument(settings)
  }, [settings])

  const toggleSetting = useCallback((key: keyof AccessibilitySettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }, [])

  const updateFontScale = useCallback((value: number) => {
    setSettings((prev) => ({
      ...prev,
      fontScale: value,
    }))
  }, [])

  return {
    settings,
    toggleSetting,
    updateFontScale,
  }
}
