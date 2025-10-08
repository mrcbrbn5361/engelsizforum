import { db } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, MessageSquare, Users, Eye, TrendingUp } from "lucide-react"
import Link from "next/link"

// Mock data for development - replace with actual database queries
const mockCategories = [
  {
    id: "1",
    name: "Yasal Düzenlemeler",
    description: "Engellilerle ilgili yasal düzenlemeler ve mevzuat",
    icon: "⚖️",
    threadCount: 156,
    postCount: 2340,
    color: "bg-blue-100 text-blue-800",
    latestThread: {
      title: "2024 Engelli Personel Alım İlanları",
      author: "Av. Mehmet Yılmaz",
      createdAt: "2024-01-15",
      replies: 23
    }
  },
  {
    id: "2",
    name: "Sağlık ve Rehabilitasyon",
    description: "Sağlık hizmetleri, rehabilitasyon ve tıbbi destek",
    icon: "🏥",
    threadCount: 89,
    postCount: 1567,
    color: "bg-green-100 text-green-800",
    latestThread: {
      title: "Engelliler İçin Fizik Tedavi Merkezleri",
      author: "Dr. Ayşe Kaya",
      createdAt: "2024-01-14",
      replies: 15
    }
  },
  {
    id: "3",
    name: "Eğitim ve Öğretim",
    description: "Engelli bireylerin eğitim hakları ve imkanları",
    icon: "🎓",
    threadCount: 124,
    postCount: 2103,
    color: "bg-purple-100 text-purple-800",
    latestThread: {
      title: "Engelli Öğrenciler İçin Burs Fırsatları",
      author: "Öğretmen Zeynep Demir",
      createdAt: "2024-01-13",
      replies: 31
    }
  },
  {
    id: "4",
    name: "İstihdam ve Kariyer",
    description: "Engellilerin iş bulma ve kariyer gelişimi",
    icon: "💼",
    threadCount: 78,
    postCount: 1345,
    color: "bg-orange-100 text-orange-800",
    latestThread: {
      title: "Engelliler İçin Özel İş İlanları",
      author: "İnsan Kaynakları Nilay Şahin",
      createdAt: "2024-01-12",
      replies: 19
    }
  },
  {
    id: "5",
    name: "Teknoloji ve Erişilebilirlik",
    description: "Teknolojik çözümler ve erişilebilirlik",
    icon: "💻",
    threadCount: 95,
    postCount: 1789,
    color: "bg-indigo-100 text-indigo-800",
    latestThread: {
      title: "Engelliler İçin Uygun Yazılımlar",
      author: "Teknik Destek Burak Özkan",
      createdAt: "2024-01-11",
      replies: 27
    }
  },
  {
    id: "6",
    name: "Sosyal Yaşam ve Destek",
    description: "Sosyal destek grupları ve yaşam deneyimleri",
    icon: "🤝",
    threadCount: 67,
    postCount: 1123,
    color: "bg-pink-100 text-pink-800",
    latestThread: {
      title: "Engelliler İçin Sosyal Etkinlikler",
      author: "Sosyal Hizmetler Elif Arslan",
      createdAt: "2024-01-10",
      replies: 12
    }
  }
]

const mockStats = {
  totalUsers: 15420,
  totalThreads: 876,
  totalPosts: 12345,
  onlineUsers: 234
}

const mockRecentThreads = [
  {
    id: "1",
    title: "Yeni Engelli Hakları Yasası Taslağı",
    author: "Hukukçu Ahmet",
    category: "Yasal Düzenlemeler",
    replies: 45,
    views: 1234,
    createdAt: "2 saat önce"
  },
  {
    id: "2", 
    title: "Engelli Bireyler İçin Evde Bakım Desteği",
    author: "Sosyal Hizmetler",
    category: "Sosyal Yaşam ve Destek",
    replies: 23,
    views: 856,
    createdAt: "5 saat önce"
  },
  {
    id: "3",
    title: "Engelliler İçin Ulaşım Kartı Başvurusu",
    author: "Ulaşım Uzmanı",
    category: "Yasal Düzenlemeler",
    replies: 31,
    views: 967,
    createdAt: "1 gün önce"
  }
]

export default async function Home() {
  // In a real implementation, you would fetch this data from the database
  // const categories = await db.category.findMany({ include: { threads: true } })
  // const stats = await db.user.count() etc.

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          EngelsizForum Platformuna Hoş Geldiniz
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Engelli haklarıyla ilgili yasal düzenlemeler başta olmak üzere, 
          karşılaşılan her türlü sorunun çözümüne yönelik mücadele eden bir topluluk platformu.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Toplam Üye</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Toplam Konu</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalThreads.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Toplam Mesaj</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalPosts.toLocaleString()}</p>
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
                <p className="text-sm text-gray-500">Çevrimiçi Üye</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.onlineUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Forum Kategorileri</h2>
          <Button asChild>
            <Link href="/categories">Tüm Kategoriler</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCategories.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{category.icon}</div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription className="text-sm">{category.description}</CardDescription>
                  </div>
                  <Badge className={category.color}>
                    {category.threadCount} konu
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{category.postCount} mesaj</span>
                    <span className="text-xs text-gray-500">
                      {category.latestThread.createdAt}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Son Konu: {category.latestThread.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {category.latestThread.author} • {category.latestThread.replies} yanıt
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Konuları Görüntüle
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Threads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Son Konular</CardTitle>
              <CardDescription>Forumdaki en yeni tartışmalar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentThreads.map((thread) => (
                  <div key={thread.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">
                        <Link href={`/thread/${thread.id}`} className="hover:text-blue-600">
                          {thread.title}
                        </Link>
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{thread.category}</span>
                        <span>{thread.replies} yanıt</span>
                        <span>{thread.views} görüntülenme</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">{thread.createdAt}</p>
                      <p className="text-xs text-gray-400">{thread.author}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Tüm Konuları Görüntüle
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Active Users */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Aktif Kullanıcılar</CardTitle>
              <CardDescription>Şimdi çevrimiçi olan üyeler</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Ayşe Kaya", "Mehmet Yılmaz", "Zeynep Demir", "Burak Özkan", "Elif Arslan"].map((user, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{user}</p>
                      <p className="text-xs text-gray-500">Çevrimiçi</p>
                    </div>
                    <Badge variant="secondary">Aktif</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Hızlı Eylemler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link href="/new-thread">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Yeni Konu Aç
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link href="/search">
                  <Calendar className="h-4 w-4 mr-2" />
                  Konu Ara
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link href="/help">
                  <Users className="h-4 w-4 mr-2" />
                  Yardım Al
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}