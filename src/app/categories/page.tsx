import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Users, TrendingUp, Eye } from "lucide-react"
import Link from "next/link"

// Mock data for categories
const categories = [
  {
    id: "1",
    name: "Yasal Düzenlemeler",
    description: "Engellilerle ilgili yasal düzenlemeler, mevzuat ve haklar",
    icon: "⚖️",
    threadCount: 156,
    postCount: 2340,
    latestThread: {
      title: "2024 Engelli Personel Alım İlanları",
      author: "Av. Mehmet Yılmaz",
      createdAt: "2024-01-15",
      replies: 23
    },
    color: "bg-blue-100 text-blue-800",
    moderators: ["Av. Mehmet Yılmaz", "Hukukçu Ayşe Demir"]
  },
  {
    id: "2",
    name: "Sağlık ve Rehabilitasyon",
    description: "Sağlık hizmetleri, rehabilitasyon programları ve tıbbi destek",
    icon: "🏥",
    threadCount: 89,
    postCount: 1567,
    latestThread: {
      title: "Engelliler İçin Fizik Tedavi Merkezleri",
      author: "Dr. Ayşe Kaya",
      createdAt: "2024-01-14",
      replies: 15
    },
    color: "bg-green-100 text-green-800",
    moderators: ["Dr. Ayşe Kaya", "Fizyoterapist Burak Özkan"]
  },
  {
    id: "3",
    name: "Eğitim ve Öğretim",
    description: "Engelli bireylerin eğitim hakları, okul seçenekleri ve burslar",
    icon: "🎓",
    threadCount: 124,
    postCount: 2103,
    latestThread: {
      title: "Engelli Öğrenciler İçin Burs Fırsatları",
      author: "Öğretmen Zeynep Demir",
      createdAt: "2024-01-13",
      replies: 31
    },
    color: "bg-purple-100 text-purple-800",
    moderators: ["Öğretmen Zeynep Demir", "Rehber Öğretmen Elif Arslan"]
  },
  {
    id: "4",
    name: "İstihdam ve Kariyer",
    description: "Engellilerin iş bulma, kariyer gelişimi ve işe alım",
    icon: "💼",
    threadCount: 78,
    postCount: 1345,
    latestThread: {
      title: "Engelliler İçin Özel İş İlanları",
      author: "İnsan Kaynakları Nilay Şahin",
      createdAt: "2024-01-12",
      replies: 19
    },
    color: "bg-orange-100 text-orange-800",
    moderators: ["İnsan Kaynakları Nilay Şahin", "Kariyer Danışmanı Ahmet Yılmaz"]
  },
  {
    id: "5",
    name: "Teknoloji ve Erişilebilirlik",
    description: "Teknolojik çözümler, yardımcı cihazlar ve erişilebilirlik",
    icon: "💻",
    threadCount: 95,
    postCount: 1789,
    latestThread: {
      title: "Engelliler İçin Uygun Yazılımlar",
      author: "Teknik Destek Burak Özkan",
      createdAt: "2024-01-11",
      replies: 27
    },
    color: "bg-indigo-100 text-indigo-800",
    moderators: ["Teknik Destek Burak Özkan", "Yazılım Geliştirici Mehmet Demir"]
  },
  {
    id: "6",
    name: "Sosyal Yaşam ve Destek",
    description: "Sosyal destek grupları, etkinlikler ve yaşam deneyimleri",
    icon: "🤝",
    threadCount: 67,
    postCount: 1123,
    latestThread: {
      title: "Engelliler İçin Sosyal Etkinlikler",
      author: "Sosyal Hizmetler Elif Arslan",
      createdAt: "2024-01-10",
      replies: 12
    },
    color: "bg-pink-100 text-pink-800",
    moderators: ["Sosyal Hizmetler Elif Arslan", "Psikolog Zeynep Kaya"]
  }
]

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          EngelsizForum Kategorileri
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          İlgi alanınıza uygun kategorilerde tartışmalara katılın ve bilgi paylaşın
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Toplam Kategori</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Toplam Konu</p>
                <p className="text-2xl font-bold text-gray-900">
                  {categories.reduce((sum, cat) => sum + cat.threadCount, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Toplam Mesaj</p>
                <p className="text-2xl font-bold text-gray-900">
                  {categories.reduce((sum, cat) => sum + cat.postCount, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Eye className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Aktif Kullanıcı</p>
                <p className="text-2xl font-bold text-gray-900">15,420</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{category.icon}</div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                    <span>
                      <span className="font-medium text-gray-900">{category.threadCount}</span> konu
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <span>
                      <span className="font-medium text-gray-900">{category.postCount}</span> mesaj
                    </span>
                  </div>
                </div>

                {/* Latest Thread */}
                <div className="border-t pt-3">
                  <p className="text-xs font-medium text-gray-500 mb-2">SON KONU</p>
                  <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                    {category.latestThread.title}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{category.latestThread.author}</span>
                    <span>{category.latestThread.replies} yanıt</span>
                  </div>
                </div>

                {/* Moderators */}
                <div className="border-t pt-3">
                  <p className="text-xs font-medium text-gray-500 mb-2">MODERATÖRLER</p>
                  <div className="flex flex-wrap gap-1">
                    {category.moderators.slice(0, 2).map((moderator) => (
                      <Badge key={moderator} variant="outline" className="text-xs">
                        {moderator}
                      </Badge>
                    ))}
                    {category.moderators.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{category.moderators.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full" asChild>
                  <Link href={`/category/${category.id}`}>
                    Kategoriyi Görüntüle
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategori Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-100 rounded"></div>
            <span>Yasal ve Hukuki Konular</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 rounded"></div>
            <span>Sağlık ve Tıbbi Konular</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-100 rounded"></div>
            <span>Eğitim ve Öğrenim</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-100 rounded"></div>
            <span>İş ve Kariyer</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-indigo-100 rounded"></div>
            <span>Teknoloji ve Yazılım</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-pink-100 rounded"></div>
            <span>Sosyal Destek</span>
          </div>
        </div>
      </div>
    </div>
  )
}