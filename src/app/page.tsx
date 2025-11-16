import Link from "next/link"
import { db } from "@/lib/db"
import { ensureBaseData } from "@/lib/ensure-base-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Accessibility,
  ArrowRight,
  Calendar,
  HandHeart,
  HeartHandshake,
  Languages,
  Map,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

const inclusiveFeatureList = [
  {
    title: "İşaret Dili ve Sesli Rehber",
    description: "Video konferans odaları ve eş zamanlı işaret dili çevirileri.",
    icon: Languages,
  },
  {
    title: "Hissedilebilir Arayüz",
    description: "Büyük puntolu tema, yüksek kontrast ve klavye kısayolları.",
    icon: Accessibility,
  },
  {
    title: "Duygusal Destek",
    description: "Uzman psikologlar ve sosyal hizmet uzmanlarıyla canlı sohbet.",
    icon: HandHeart,
  },
  {
    title: "Navigasyon Rehberi",
    description: "Erişilebilir mekan haritaları ve ulaşım kartı yönlendirmeleri.",
    icon: Map,
  },
]

const supportSteps = [
  {
    title: "Hızlı Bildirim",
    description: "Forumdaki uzmanlardan 15 dakikadan kısa sürede yanıt alın.",
  },
  {
    title: "Çözüm Odası",
    description: "Avukat, doktor ve teknoloji mentoru ortak çözüm planı çıkarır.",
  },
  {
    title: "Takip ve Mentor",
    description: "Destek ekibi çözümün uygulanmasını haftalık kontrol eder.",
  },
]

const heroHighlights = [
  "Hukuk, sağlık ve eğitim uzmanları tek platformda",
  "24/7 Engelsiz Destek Hattı",
  "Erişilebilirlik odaklı yeni nesil arayüz",
]

type ResourceCard = {
  id: string
  title: string
  description: string
  category: string
  contact: string | null
  link: string | null
  icon: string | null
  tags: string[]
}

async function getHomeData() {
  await ensureBaseData()

  const [categoriesRaw, recentThreadsRaw, resourcesRaw, activeUsers, totalUsers, totalThreads, totalPosts] = await Promise.all([
    db.category.findMany({
      orderBy: { order: "asc" },
      include: {
        threads: {
          take: 1,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            title: true,
            createdAt: true,
            _count: { select: { posts: true } },
            author: { select: { name: true } },
          },
        },
        _count: { select: { threads: true } },
      },
    }),
    db.thread.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
      include: {
        category: { select: { name: true } },
        author: { select: { name: true } },
        _count: { select: { posts: true } },
      },
    }),
    db.accessibilityResource.findMany({ orderBy: { createdAt: "desc" } }),
    db.user.findMany({ orderBy: { updatedAt: "desc" }, take: 6 }),
    db.user.count(),
    db.thread.count(),
    db.post.count(),
  ])

  const categoryPostCounts = await Promise.all(
    categoriesRaw.map((category) =>
      db.post.count({ where: { thread: { categoryId: category.id } } })
    )
  )

  const categories = categoriesRaw.map((category, index) => {
    const latestThread = category.threads[0]
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color,
      threadCount: category._count.threads,
      postCount: categoryPostCounts[index],
      latestThread: latestThread
        ? {
            title: latestThread.title,
            replies: Math.max(latestThread._count.posts - 1, 0),
            author: latestThread.author?.name ?? "Topluluk Üyesi",
            createdAt: latestThread.createdAt.toLocaleDateString("tr-TR"),
          }
        : null,
    }
  })

  const recentThreads = recentThreadsRaw.map((thread) => ({
    id: thread.id,
    title: thread.title,
    category: thread.category.name,
    replies: Math.max(thread._count.posts - 1, 0),
    views: thread.viewCount,
    author: thread.author?.name ?? "Topluluk Üyesi",
    createdAt: thread.createdAt.toLocaleDateString("tr-TR"),
  }))

  const resources: ResourceCard[] = resourcesRaw.map((resource) => ({
    id: resource.id,
    title: resource.title,
    description: resource.description,
    category: resource.category,
    contact: resource.contact,
    link: resource.link,
    icon: resource.icon,
    tags: Array.isArray(resource.tags) ? (resource.tags as string[]) : [],
  }))

  return {
    categories,
    recentThreads,
    resources,
    activeUsers,
    stats: {
      totalUsers,
      totalThreads,
      totalPosts,
      onlineUsers: Math.max(activeUsers.length * 3, 18),
      activeResources: resources.length,
    },
  }
}

export default async function Home() {
  const { categories, stats, recentThreads, resources, activeUsers } = await getHomeData()

  return (
    <div className="bg-slate-50 pb-16">
      <div className="container mx-auto px-4 py-10 space-y-12">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-700 px-6 py-12 text-white shadow-2xl">
          <div className="relative z-10 grid gap-10 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-slate-100">
                Engelsiz Topluluk
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-tight lg:text-5xl">
                Engelli bireylerin hak mücadelesi için {" "}
                <span className="text-sky-200">tam erişilebilir</span> forum.
              </h1>
              <p className="mt-4 text-lg text-slate-200">
                Hukuki, tıbbi, teknolojik ve sosyal çözümleri aynı çatı altında toplayan EngelsizForum; destek ekibiyle 24/7 erişilebilirlik sunar.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {heroHighlights.map((highlight) => (
                  <span key={highlight} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100">
                    <Sparkles className="h-4 w-4" />
                    {highlight}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-slate-100 text-slate-900 hover:bg-white">
                  <Link href="/new-thread" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Yeni Konu Aç
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                  <Link href="/#destek" className="flex items-center gap-2">
                    <HeartHandshake className="h-4 w-4" />
                    Destek Merkezi
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
              <h2 className="text-xl font-semibold text-slate-100">Güncel İstatistikler</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[{ label: "Toplam Üye", value: stats.totalUsers, icon: Users }, { label: "Konu Sayısı", value: stats.totalThreads, icon: MessageSquare }, { label: "Mesaj", value: stats.totalPosts, icon: Calendar }, { label: "Aktif Destek Hattı", value: stats.activeResources, icon: ShieldCheck }].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/20 bg-white/5 p-4">
                    <item.icon className="mb-3 h-5 w-5 text-slate-200" />
                    <p className="text-sm text-slate-200">{item.label}</p>
                    <p className="text-2xl font-bold text-white">{item.value.toLocaleString("tr-TR")}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-white/10 to-transparent lg:block" aria-hidden="true" />
        </section>

        <section id="ozellikler" className="grid gap-6 lg:grid-cols-4">
          {inclusiveFeatureList.map((feature) => (
            <Card key={feature.title} className="h-full rounded-3xl border border-white/60 bg-white/80 shadow-sm">
              <CardHeader>
                <div className="inline-flex rounded-2xl bg-blue-50 p-2 text-blue-600">
                  <feature.icon className="h-5 w-5" />
                </div>
                <CardTitle className="mt-4 text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {categories.map((category) => (
                <Card key={category.id} className="rounded-3xl border border-slate-100 bg-white shadow">
                  <CardHeader className={`rounded-2xl bg-gradient-to-r ${category.color} text-white`}>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{category.icon}</span>
                      <div>
                        <CardTitle className="text-white">{category.name}</CardTitle>
                        <CardDescription className="text-white/80">
                          {category.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>{category.threadCount} konu</span>
                      <span>{category.postCount} mesaj</span>
                    </div>
                    {category.latestThread ? (
                      <div className="rounded-2xl border border-slate-100 p-4">
                        <p className="text-sm font-semibold text-slate-800">Son Konu</p>
                        <p className="mt-1 text-slate-900">{category.latestThread.title}</p>
                        <p className="text-xs text-slate-500">
                          {category.latestThread.author} · {category.latestThread.replies} yanıt · {category.latestThread.createdAt}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">Henüz konu açılmadı.</p>
                    )}
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/categories">Konuları Gör</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Son Konular</CardTitle>
                <CardDescription>Topluluğun gündemindeki başlıklar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentThreads.map((thread) => (
                  <div key={thread.id} className="rounded-2xl border border-slate-100 p-4 hover:border-blue-200">
                    <Link href={`/thread/${thread.id}`} className="text-lg font-semibold text-slate-900">
                      {thread.title}
                    </Link>
                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                      <span>{thread.category}</span>
                      <span>{thread.replies} yanıt</span>
                      <span>{thread.views} görüntülenme</span>
                      <span>{thread.createdAt}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{thread.author}</p>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full">
                  <Link href="/search">Tüm konuları görüntüle</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Aktif Mentorlar</CardTitle>
                <CardDescription>Şu anda çevrimiçi olan destekçiler</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {activeUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3">
                    <Avatar>
                      <AvatarFallback>{user.name?.charAt(0) ?? "Ü"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-900">{user.name}</p>
                      <p className="text-xs text-emerald-600">Çevrimiçi</p>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-slate-400">Toplam {stats.onlineUsers}+ çevrimiçi kullanıcı</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500 to-cyan-500 text-white">
              <CardHeader>
                <CardTitle>Engelsiz Destek Hattı</CardTitle>
                <CardDescription className="text-white/80">
                  Hukuki veya tıbbi acil durumlarda 7/24 ulaşın.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-3xl font-bold">0850 555 00 00</p>
                <p className="text-sm text-white/80">İşaret dili ve yazılı sohbet destekleri dahildir.</p>
                <Button asChild className="w-full bg-white text-emerald-600">
                  <Link href="tel:+908505550000">Hemen Ara</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="destek" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-widest text-blue-500">Destek Merkezi</p>
              <h2 className="text-3xl font-bold text-slate-900">Erişilebilir Kaynaklar</h2>
              <p className="text-slate-500">İşaret dili, psikolojik destek ve ulaşım haritaları tek panelde.</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/help" className="flex items-center gap-2">
                Tüm destekler
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => (
              <Card key={resource.id} className="h-full rounded-3xl border border-slate-100">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{resource.icon ?? "🧭"}</span>
                    <div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>{resource.category}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-600">
                  <p>{resource.description}</p>
                  {resource.contact && (
                    <p className="font-semibold text-slate-900">{resource.contact}</p>
                  )}
                  {resource.link && (
                    <Link href={resource.link} className="text-blue-600 underline" target="_blank">
                      Kaynağı Aç
                    </Link>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-full">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {supportSteps.map((step, index) => (
            <Card key={step.title} className="rounded-3xl border border-slate-100 bg-white">
              <CardHeader>
                <Badge variant="secondary" className="w-fit rounded-full">
                  Adım {index + 1}
                </Badge>
                <CardTitle className="text-2xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </div>
  )
}
