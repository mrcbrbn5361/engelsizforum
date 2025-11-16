"use client"

import { Accessibility, Contrast, Eye, MousePointerClick, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAccessibility } from "@/hooks/use-accessibility"

const fontScaleOptions = [1, 1.1, 1.2, 1.3]

export function AccessibilityPanel() {
  const { settings, toggleSetting, updateFontScale } = useAccessibility()

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="lg" className="shadow-xl bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6" aria-label="Erişilebilirlik panelini aç">
            <Sparkles className="mr-2 h-4 w-4" />
            Engelsiz Mod
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Erişilebilirlik Paneli</SheetTitle>
            <SheetDescription>
              Yazı boyutları, yüksek kontrast ve odak seçenekleri ile deneyiminizi kişiselleştirin.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-8">
            <section aria-label="Yazı boyutu">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Yazı Boyutu</p>
                  <p className="text-sm text-muted-foreground">Başlıklar ve içerikler için dinamik ölçek</p>
                </div>
                <span className="text-sm font-semibold">{Math.round(settings.fontScale * 100)}%</span>
              </div>
              <Slider
                className="mt-4"
                min={1}
                max={1.3}
                step={0.1}
                value={[settings.fontScale]}
                onValueChange={(value) => {
                  const newValue = value[0] ?? 1
                  updateFontScale(Number(newValue.toFixed(1)))
                }}
                aria-label="Yazı boyutunu ayarla"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {fontScaleOptions.map((option) => (
                  <Button
                    key={option}
                    size="sm"
                    variant={settings.fontScale === option ? "default" : "outline"}
                    onClick={() => updateFontScale(option)}
                  >
                    {Math.round(option * 100)}%
                  </Button>
                ))}
              </div>
            </section>

            <section className="space-y-4" aria-label="Görsel destekler">
              <div className="flex items-center justify-between rounded-2xl border p-4">
                <div>
                  <p className="font-medium">Yüksek Kontrast</p>
                  <p className="text-sm text-muted-foreground">Arkaplan ve metinlerde maksimum ayrışma</p>
                </div>
                <div className="flex items-center gap-3">
                  <Contrast className="h-5 w-5 text-blue-500" />
                  <Switch checked={settings.highContrast} onCheckedChange={() => toggleSetting("highContrast")} />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border p-4">
                <div>
                  <p className="font-medium">Disleksi Dostu Font</p>
                  <p className="text-sm text-muted-foreground">Atkinson Hyperlegible ile akıcı okuma</p>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-purple-500" />
                  <Switch checked={settings.dyslexiaFont} onCheckedChange={() => toggleSetting("dyslexiaFont")} />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border p-4">
                <div>
                  <p className="font-medium">Odak Vurgusu</p>
                  <p className="text-sm text-muted-foreground">Klavye ile gezen kullanıcılar için belirgin çerçeve</p>
                </div>
                <div className="flex items-center gap-3">
                  <MousePointerClick className="h-5 w-5 text-emerald-500" />
                  <Switch checked={settings.focusHighlight} onCheckedChange={() => toggleSetting("focusHighlight")} />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border p-4">
                <div>
                  <p className="font-medium">Hareketi Azalt</p>
                  <p className="text-sm text-muted-foreground">Animasyon ve geçişlerde sadeleşme</p>
                </div>
                <div className="flex items-center gap-3">
                  <Accessibility className="h-5 w-5 text-amber-500" />
                  <Switch checked={settings.reduceMotion} onCheckedChange={() => toggleSetting("reduceMotion")} />
                </div>
              </div>
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
