"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  ArrowLeft, 
  MessageSquare, 
  Heart, 
  Share2, 
  MoreHorizontal,
  Clock,
  Eye,
  Reply
} from "lucide-react"

export default function ThreadPage({ params }: { params: { id: string } }) {
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const mockThread = {
    id: params.id,
    title: "2024 Engelli Personel Alım İlanları",
    content: "Merhaba arkadaşlar, 2024 yılında engelli personel alımlarıyla ilgili bilgileri paylaşmak istiyorum. Kamu kurumlarında ve özel sektörde engelli vatandaşlar için açılan pozisyonlar hakkında detaylı bilgi edinmek istiyorum. Özellikle KPSS puanı, başvuru şartları ve maaş skalaları hakkında merak ettiğim noktalar var. Aynı zamanda engelli memur alımlarında öncelikli gruplar ve başvuru tarihleri hakkında detaylı bilgi almak istiyorum. Deneyimli arkadaşların bu konuda bilgilerini ve tecrübelerini paylaşmasını rica ediyorum.",
    author: {
      id: "1",
      name: "Av. Mehmet Yılmaz",
      avatar: "",
      role: "Moderatör",
      joinDate: "2023-01-15"
    },
    category: {
      id: "1",
      name: "Yasal Düzenlemeler",
      color: "bg-blue-100 text-blue-800"
    },
    tags: ["yasal haklar", "personel alımı", "2024"],
    createdAt: "2024-01-15 14:30",
    viewCount: 234,
    likeCount: 45,
    replyCount: 12,
    isSticky: true,
    isLocked: false
  }

  const mockReplies = [
    {
      id: "1",
      content: "Merhaba, ben de bu konuyla ilgileniyorum. Kamu kurumlarında engelli personel alımlarında KPSS puanı şartı aranıyor. Genellikle en düşük KPSS puanı 60-70 arasında değişiyor. Başvuru tarihleri genellikle Nisan-Haziran aylarında açıklanıyor. Detaylı bilgi için https://www.kpss.gov.tr adresini takip edebilirsiniz.",
      author: {
        id: "2",
        name: "İK Uzmanı",
        avatar: "",
        role: "Üye",
        joinDate: "2023-03-20"
      },
      createdAt: "2024-01-15 15:45",
      likeCount: 12,
      isLiked: false
    },
    {
      id: "2",
      content: "Özel sektörde de engelli personel alımları devam ediyor. Özellikle büyük firmaların insan kaynakları departmanları engelli çalışanlar için ayrı kontenjanlar ayırıyor. Maaş skalaları pozisyona göre değişmekle birlikte, asgari ücretin 1.5-2 katı arasında değişiyor. Ayrıca engelli çalışanlar için vergi muafiyeti gibi avantajlar da mevcut.",
      author: {
        id: "3",
        name: "İnsan Kaynakları Nilay Şahin",
        avatar: "",
        role: "Üye",
        joinDate: "2023-02-10"
      },
      createdAt: "2024-01-15 16:20",
      likeCount: 8,
      isLiked: true
    },
    {
      id: "3",
      content: "Engelli memur alımlarında öncelikli gruplar şunlar: 1. %40 ve üzeri engeli olanlar, 2. Kamu kurumlarında çalışan engelli personellerin çocukları, 3. Şehit ve gazi çocukları. Başvuru için Aile ve Sosyal Hizmetler Bakanlığı'nın engelli kimlik belgesi şartı aranıyor.",
      author: {
        id: "4",
        name: "Hukukçu Ayşe Demir",
        avatar: "",
        role: "Moderatör",
        joinDate: "2022-11-05"
      },
      createdAt: "2024-01-15 17:30",
      likeCount: 15,
      isLiked: false
    }
  ]

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!replyContent.trim()) {
      setError("Yanıt boş olamaz")
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Implement actual reply creation logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log("Reply creation attempt:", { content: replyContent, threadId: params.id })
      
      // Simulate successful reply
      alert("Yanıtınız başarıyla gönderildi!")
      setReplyContent("")
      
      // In a real app, you would add the reply to the list and update the UI
      // mockReplies.unshift({
      //   id: Date.now().toString(),
      //   content: replyContent,
      //   author: { id: "current-user", name: "Ben", avatar: "", role: "Üye", joinDate: "2024-01-01" },
      //   createdAt: "Şimdi",
      //   likeCount: 0,
      //   isLiked: false
      // })
      
    } catch (err) {
      setError("Yanıt gönderilemedi. Lütfen tekrar deneyin.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLike = (replyId: string) => {
    console.log("Like clicked for reply:", replyId)
    // TODO: Implement like functionality
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
              <h1 className="text-2xl font-bold text-gray-900">Konu Detayı</h1>
              <p className="text-gray-600">EngelsizForum tartışma ve yanıtlar</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Thread */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge className={mockThread.category.color}>
                      {mockThread.category.name}
                    </Badge>
                    {mockThread.isSticky && (
                      <Badge variant="secondary">
                        <Pin className="h-3 w-3 mr-1" />
                        Sabitli
                      </Badge>
                    )}
                    {mockThread.isLocked && (
                      <Badge variant="destructive">
                        <Lock className="h-3 w-3 mr-1" />
                        Kilitli
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl mb-2">{mockThread.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{mockThread.createdAt}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>{mockThread.viewCount} görüntülenme</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>{mockThread.replyCount} yanıt</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Author Info */}
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={mockThread.author.avatar} />
                    <AvatarFallback>
                      {mockThread.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{mockThread.author.name}</p>
                    <p className="text-sm text-gray-500">{mockThread.author.role}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed">{mockThread.content}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {mockThread.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 pt-4 border-t">
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Beğen ({mockThread.likeCount})
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Paylaş
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Replies */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Yanıtlar ({mockThread.replyCount})
              </h2>
            </div>

            <div className="space-y-6">
              {mockReplies.map((reply) => (
                <Card key={reply.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Author Info */}
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reply.author.avatar} />
                          <AvatarFallback>
                            {reply.author.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{reply.author.name}</p>
                          <p className="text-sm text-gray-500">{reply.author.role}</p>
                        </div>
                        <span className="text-sm text-gray-500">{reply.createdAt}</span>
                      </div>

                      {/* Content */}
                      <p className="text-gray-700 leading-relaxed">{reply.content}</p>

                      {/* Actions */}
                      <div className="flex items-center space-x-4 pt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(reply.id)}
                          className={reply.isLiked ? "text-red-500" : ""}
                        >
                          <Heart className={`h-4 w-4 mr-2 ${reply.isLiked ? "fill-current" : ""}`} />
                          Beğen ({reply.likeCount})
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Reply className="h-4 w-4 mr-2" />
                          Yanıtla
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Reply Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Yanıt Yaz</CardTitle>
              <CardDescription>
                Bu konuya yanıt vermek için aşağıdaki formu kullanın
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleReply} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Textarea
                  placeholder="Yanıtınızı buraya yazın..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows={4}
                  required
                />

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/">İptal</Link>
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Gönderiliyor..." : "Yanıt Gönder"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Import required components
import { Pin, Lock } from "lucide-react"
import Link from "next/link"