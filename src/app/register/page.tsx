"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, User, Phone, Accessibility, Headphones, Brain, Languages } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
    disabilityFocus: "",
    assistiveTech: "",
    communicationPreference: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [supportAreas, setSupportAreas] = useState<string[]>([])
  const router = useRouter()

  const supportOptions = [
    { value: "visual", label: "Görsel Destek", icon: Eye },
    { value: "hearing", label: "İşitsel Destek", icon: Headphones },
    { value: "cognitive", label: "Bilişsel Destek", icon: Brain },
    { value: "mobility", label: "Motor Destek", icon: Accessibility },
    { value: "communication", label: "İletişim Desteği", icon: Languages },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSupportChange = (value: string) => {
    setSupportAreas(prev =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    )
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Ad soyad zorunludur")
      return false
    }
    if (!formData.email.trim()) {
      setError("E-posta adresi zorunludur")
      return false
    }
    if (!formData.username.trim()) {
      setError("Kullanıcı adı zorunludur")
      return false
    }
    if (formData.username.length < 3) {
      setError("Kullanıcı adı en az 3 karakter olmalıdır")
      return false
    }
    if (!formData.phone.trim()) {
      setError("Telefon numarası zorunludur")
      return false
    }
    if (formData.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler eşleşmiyor")
      return false
    }
    if (supportAreas.length === 0) {
      setError("En az bir destek alanı seçmelisiniz")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          supportAreas,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.message ?? "Kayıt başarısız")
        return
      }

      setSuccess("Kayıt başarılı! Engelsiz deneyim paneliniz hazır.")
      router.push("/")
      router.refresh()

    } catch (err) {
      setError("Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Kayıt Ol</h2>
          <p className="mt-2 text-gray-600">
            EngelsizForum Platformuna üye olun
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Hesap Oluşturun</CardTitle>
            <CardDescription>
              Platforma erişim için hesap bilgilerinizi girin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Ad Soyad</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Adınız Soyadınız"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-posta Adresi</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="kullanici_adi"
                    value={formData.username}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">Kullanıcı adınız en az 3 karakter olmalıdır</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon Numarası</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="0555 123 45 67"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Şifrenizi girin"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">Şifreniz en az 6 karakter olmalıdır</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Şifreyi Onayla</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Şifrenizi tekrar girin"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  <a href="/terms" className="text-blue-600 hover:text-blue-500">
                    Kullanım Koşulları
                  </a>{" "}
                  ve{" "}
                  <a href="/privacy" className="text-blue-600 hover:text-blue-500">
                    Gizlilik Politikası
                  </a>{" "}
                  nı okudum, kabul ediyorum.
                </label>
              </div>

              <div className="space-y-4 rounded-2xl border p-4">
                <div>
                  <p className="font-medium">Erişilebilirlik Profili</p>
                  <p className="text-sm text-gray-500">
                    Destek alanlarını seçerek forumun size özel öneriler sunmasını sağlayın.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {supportOptions.map((option) => {
                    const Icon = option.icon
                    return (
                      <label
                        key={option.value}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border p-3"
                      >
                        <Checkbox
                          checked={supportAreas.includes(option.value)}
                          onCheckedChange={() => handleSupportChange(option.value)}
                        />
                        <div>
                          <div className="flex items-center gap-2 font-medium">
                            <Icon className="h-4 w-4" />
                            {option.label}
                          </div>
                          <p className="text-xs text-gray-500">Önerilen araçları kişiselleştirir</p>
                        </div>
                      </label>
                    )
                  })}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="disabilityFocus">Engel/odak alanınız</Label>
                  <Input
                    id="disabilityFocus"
                    name="disabilityFocus"
                    placeholder="Örn. işitme kaybı, otizm, görme kaybı"
                    value={formData.disabilityFocus}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assistiveTech">Kullandığınız yardımcı teknolojiler</Label>
                  <Textarea
                    id="assistiveTech"
                    name="assistiveTech"
                    placeholder="Braille ekran, sesli komut, göz izleme vb."
                    value={formData.assistiveTech}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        assistiveTech: e.target.value,
                      }))
                    }
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">Virgülle ayrılarak kaydedilir.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="communicationPreference">İletişim tercihiniz</Label>
                  <Textarea
                    id="communicationPreference"
                    name="communicationPreference"
                    placeholder="Örn. işaret dili, yazılı sohbet, telefon"
                    value={formData.communicationPreference}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        communicationPreference: e.target.value,
                      }))
                    }
                    rows={2}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Kayıt Olunuyor..." : "Kayıt Ol"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Veya</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Zaten hesabınız var mı?{" "}
                  <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                    Giriş yapın
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              ← Ana sayfaya dön
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}