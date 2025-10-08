"use client"

import { useState } from "react"
import Link from "next/navigation"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, FileText, Tag } from "lucide-react"

export default function NewThreadPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: "",
    tags: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const mockCategories = [
    { id: "1", name: "Yasal Düzenlemeler" },
    { id: "2", name: "Sağlık ve Rehabilitasyon" },
    { id: "3", name: "Eğitim ve Öğretim" },
    { id: "4", name: "İstihdam ve Kariyer" },
    { id: "5", name: "Teknoloji ve Erişilebilirlik" },
    { id: "6", name: "Sosyal Yaşam ve Destek" }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Başlık zorunludur")
      return false
    }
    if (formData.title.length < 5) {
      setError("Başlık en az 5 karakter olmalıdır")
      return false
    }
    if (!formData.content.trim()) {
      setError("İçerik zorunludur")
      return false
    }
    if (formData.content.length < 10) {
      setError("İçerik en az 10 karakter olmalıdır")
      return false
    }
    if (!formData.categoryId) {
      setError("Kategori seçmek zorunludur")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // TODO: Implement actual thread creation logic
      // For now, just simulate a successful thread creation
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log("Thread creation attempt:", formData)
      
      // Simulate successful thread creation
      alert("Konu başarıyla oluşturuldu! Konu sayfasına yönlendiriliyorsunuz...")
      
      // In a real app, you would redirect to the created thread page
      // router.push(`/thread/${newThreadId}`)
      
      // For demo purposes, redirect to homepage
      setTimeout(() => {
        router.push("/")
      }, 2000)
      
    } catch (err) {
      setError("Konu oluşturulamadı. Lütfen bilgilerinizi kontrol edin.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Geri
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Yeni Konu Aç</h1>
              <p className="text-gray-600">EngelsizForum'da yeni bir tartışma başlatın</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Konu Bilgileri</span>
                </CardTitle>
                <CardDescription>
                  Konunuzun başlığını ve içeriğini girin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Konu Başlığı</Label>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Konunuzun başlığını girin..."
                      value={formData.title}
                      onChange={handleChange}
                      className="text-lg"
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Başlık en az 5 karakter olmalıdır
                    </p>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="categoryId">Kategori</Label>
                    <Select value={formData.categoryId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Kategori seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">Etiketler</Label>
                    <Input
                      id="tags"
                      name="tags"
                      type="text"
                      placeholder="etiket1, etiket2, etiket3"
                      value={formData.tags}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-gray-500">
                      Konuyu daha kolay bulabilmek için etiket ekleyin
                    </p>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content">İçerik</Label>
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="Konunuzun detaylı açıklamasını buraya yazın..."
                      value={formData.content}
                      onChange={handleChange}
                      rows={8}
                      required
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">
                        İçerik en az 10 karakter olmalıdır
                      </p>
                      <p className="text-xs text-gray-500">
                        {formData.content.length} / 2000 karakter
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Yükleniyor...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Konuyu Oluştur
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      asChild
                    >
                      <Link href="/">İptal</Link>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Konu Oluşturma Kuralları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">1</Badge>
                  <p className="text-sm text-gray-700">Net ve anlaşılır bir başlık kullanın</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">2</Badge>
                  <p className="text-sm text-gray-700">Doğru kategoriyi seçin</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">3</Badge>
                  <p className="text-sm text-gray-700">Detaylı ve yardımcı içerik paylaşın</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">4</Badge>
                  <p className="text-sm text-gray-700">Saygılı iletişim kurun</p>
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Tag className="h-4 w-4" />
                  <span>Popüler Etiketler</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["yasal haklar", "eğitim", "sağlık", "istihdam", "teknoloji", "rehabilitasyon", "destek", "ulaşım"].map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-blue-100"
                      onClick={() => setFormData(prev => ({ ...prev, tags: prev.tags ? `${prev.tags}, ${tag}` : tag }))}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">İpuçları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Dikkat:</strong> Konunuz açıldıktan sonra düzenleme yapabilirsiniz.
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Öneri:</strong> Konunuza uygun etiket ekleyerek daha fazla kişiye ulaşın.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}