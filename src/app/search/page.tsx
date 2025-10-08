"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Clock, Eye, MessageSquare, User } from "lucide-react"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState("relevance")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  const mockCategories = [
    { id: "", name: "Tüm Kategoriler" },
    { id: "1", name: "Yasal Düzenlemeler" },
    { id: "2", name: "Sağlık ve Rehabilitasyon" },
    { id: "3", name: "Eğitim ve Öğretim" },
    { id: "4", name: "İstihdam ve Kariyer" },
    { id: "5", name: "Teknoloji ve Erişilebilirlik" },
    { id: "6", name: "Sosyal Yaşam ve Destek" }
  ]

  const mockSearchResults = [
    {
      id: "1",
      title: "2024 Engelli Personel Alım İlanları",
      excerpt: "Merhaba arkadaşlar, 2024 yılında engelli personel alımlarıyla ilgili bilgileri paylaşmak istiyorum. Kamu kurumlarında ve özel sektörde engelli vatandaşlar için açılan pozisyonlar hakkında detaylı bilgi edinmek istiyorum.",
      author: "Av. Mehmet Yılmaz",
      category: "Yasal Düzenlemeler",
      createdAt: "2024-01-15 14:30",
      replies: 23,
      views: 234,
      tags: ["yasal haklar", "personel alımı", "2024"],
      relevanceScore: 95
    },
    {
      id: "2",
      title: "Engelliler İçin Fizik Tedavi Merkezleri",
      excerpt: "Engelli bireyler için uygun fizik tedavi merkezleri ve rehabilitasyon programları hakkında bilgi paylaşımı. Fizik tedavi yöntemleri ve uzmanlar.",
      author: "Dr. Ayşe Kaya",
      category: "Sağlık ve Rehabilitasyon",
      createdAt: "2024-01-14 15:45",
      replies: 15,
      views: 189,
      tags: ["sağlık", "fizik tedavi", "rehabilitasyon"],
      relevanceScore: 88
    },
    {
      id: "3",
      title: "Engelli Öğrenciler İçin Burs Fırsatları",
      excerpt: "2024 yılında engelli öğrenciler için açılan burs programları, başvuru şartları ve tarihleri hakkında detaylı bilgiler. Üniversite ve lise öğrencileri için.",
      author: "Öğretmen Zeynep Demir",
      category: "Eğitim ve Öğretim",
      createdAt: "2024-01-13 16:20",
      replies: 31,
      views: 456,
      tags: ["eğitim", "burs", "öğrenci"],
      relevanceScore: 82
    },
    {
      id: "4",
      title: "Engelliler İçin Özel İş İlanları",
      excerpt: "Özel sektörde engelli çalışanlar için açılan pozisyonlar, maaş skalaları ve çalışma koşulları hakkında bilgi paylaşımı.",
      author: "İnsan Kaynakları Nilay Şahin",
      category: "İstihdam ve Kariyer",
      createdAt: "2024-01-12 17:30",
      replies: 19,
      views: 298,
      tags: ["iş", "istihdam", "kariyer"],
      relevanceScore: 78
    },
    {
      id: "5",
      title: "Engelliler İçin Uygun Yazılımlar",
      excerpt: "Engelli bireyler için erişilebilir yazılım seçenekleri, yardımcı teknolojiler ve digital çözümler hakkında bilgi.",
      author: "Teknik Destek Burak Özkan",
      category: "Teknoloji ve Erişilebilirlik",
      createdAt: "2024-01-11 18:15",
      replies: 27,
      views: 367,
      tags: ["teknoloji", "yazılım", "yardımcı teknolojiler"],
      relevanceScore: 75
    }
  ]

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Filter results based on search query and category
      let results = mockSearchResults
      
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        results = results.filter(result => 
          result.title.toLowerCase().includes(query) ||
          result.excerpt.toLowerCase().includes(query) ||
          result.tags.some((tag: string) => tag.toLowerCase().includes(query))
        )
      }
      
      if (selectedCategory) {
        results = results.filter(result => 
          result.category === mockCategories.find(cat => cat.id === selectedCategory)?.name
        )
      }
      
      // Sort results
      results.sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          case "oldest":
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          case "popular":
            return b.views - a.views
          case "replies":
            return b.replies - a.replies
          default: // relevance
            return b.relevanceScore - a.relevanceScore
        }
      })
      
      setSearchResults(results)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            EngelsizForum Arama
          </h1>
          <p className="text-gray-600">
            Konular, mesajlar ve kullanıcıları arayın
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Arama Yap</span>
            </CardTitle>
            <CardDescription>
              Konu başlıklarını, içerikleri veya etiketleri arayın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Arama yapın..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="w-full md:w-48">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori" />
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

                {/* Sort By */}
                <div className="w-full md:w-48">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sırala" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevans</SelectItem>
                      <SelectItem value="newest">En Yeni</SelectItem>
                      <SelectItem value="oldest">En Eski</SelectItem>
                      <SelectItem value="popular">Popüler</SelectItem>
                      <SelectItem value="replies">Çok Yanıtlı</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <div className="w-full md:w-auto">
                  <Button type="submit" className="w-full md:w-auto">
                    {isSearching ? "Aranıyor..." : "Ara"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Search Results */}
        <div>
          {searchResults.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Arama Sonuçları ({searchResults.length})
                </h2>
                <div className="text-sm text-gray-500">
                  {searchQuery && `"${searchQuery}" için`}
                </div>
              </div>

              <div className="space-y-4">
                {searchResults.map((result) => (
                  <Card key={result.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {/* Title and Category */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <Link href={`/thread/${result.id}`}>
                              <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800 mb-2">
                                {result.title}
                              </h3>
                            </Link>
                            <Badge variant="outline" className="mb-3">
                              {result.category}
                            </Badge>
                          </div>
                        </div>

                        {/* Excerpt */}
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {result.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {result.tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Meta Information */}
                        <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{result.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{result.createdAt}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{result.replies} yanıt</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{result.views} görüntülenme</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/thread/${result.id}`}>
                              Konuyu Görüntüle
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : searchQuery ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Sonuç bulunamadı
                </h3>
                <p className="text-gray-600 mb-4">
                  Aradığınız kriterlere uygun sonuç bulunamadı. Farklı anahtar kelimeler deneyin veya filtreleri genişletin.
                </p>
                <Button onClick={() => {
                  setSearchQuery("")
                  setSearchResults([])
                }}>
                  Aramayı Temizle
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Arama Yapın
                </h3>
                <p className="text-gray-600">
                  Arama yapmak için yukarıdaki formu kullanın
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// Import required components
import Link from "next/link"