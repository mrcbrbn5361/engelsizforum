"use client"

import { Brain, Ear, Eye, Hand } from "lucide-react"
import { AccessibilitySettings, useAccessibility } from "@/hooks/use-accessibility"
import { cn } from "@/lib/utils"

const supportCards = [
  {
    key: "visual" as const,
    label: "Görsel Destek",
    description: "Yüksek kontrast, renk körlüğü modu ve büyük puntolar",
    icon: Eye,
    isActive: (settings: AccessibilitySettings) =>
      settings.highContrast || settings.dyslexiaFont || settings.colorBlindFriendly,
  },
  {
    key: "hearing" as const,
    label: "İşitsel Destek",
    description: "Canlı altyazı ve işaret dili avatarı",
    icon: Ear,
    isActive: (settings: AccessibilitySettings) =>
      settings.captionedMedia || settings.signLanguageGuide,
  },
  {
    key: "cognitive" as const,
    label: "Bilişsel Rahatlık",
    description: "Hareket azaltma ve geniş satır aralığı",
    icon: Brain,
    isActive: (settings: AccessibilitySettings) =>
      settings.reduceMotion || settings.calmTypography,
  },
  {
    key: "motor" as const,
    label: "Motor Destek",
    description: "Geniş dokunma alanı ve klavye odak vurgusu",
    icon: Hand,
    isActive: (settings: AccessibilitySettings) =>
      settings.focusHighlight || settings.motorSupport,
  },
]

export function AssistiveHUD() {
  const { settings } = useAccessibility()

  return (
    <div
      className="pointer-events-none fixed bottom-4 left-4 z-40 hidden w-full max-w-xl flex-col gap-2 md:flex"
      aria-live="polite"
    >
      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-lg backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Engelsiz Durum Panosu
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {supportCards.map((card) => {
            const Icon = card.icon
            const active = card.isActive(settings)
            return (
              <div
                key={card.key}
                className={cn(
                  "rounded-2xl border p-3 text-sm transition",
                  active
                    ? "border-blue-200 bg-blue-50/70 text-blue-900"
                    : "border-slate-200/80 bg-white/70 text-slate-500",
                )}
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Icon className="h-4 w-4" />
                  <span>{card.label}</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed">{card.description}</p>
                <p className="mt-2 text-[11px] font-semibold tracking-wide text-slate-500">
                  {active ? "Aktif" : "Hazır"}
                </p>
              </div>
            )
          })}
        </div>
        {(settings.captionedMedia || settings.signLanguageGuide) && (
          <p className="mt-3 text-xs text-slate-500">
            {settings.captionedMedia && "Canlı altyazı transkriptleri devrede."} {" "}
            {settings.signLanguageGuide && "İşaret dili avatarı ve danışmanlık bağlantıları gösteriliyor."}
          </p>
        )}
      </div>
    </div>
  )
}
