import { ResourceType, UserRole } from "@prisma/client"

type BaseCategory = {
  name: string
  slug: string
  description: string
  icon: string
  color: string
  order: number
}

type BaseUser = {
  name: string
  email: string
  username: string
  avatar?: string
  bio: string
  role?: UserRole
}

type BaseThread = {
  title: string
  slug: string
  content: string
  categorySlug: string
  authorEmail: string
  isSticky?: boolean
  isLocked?: boolean
  viewCount?: number
}

type BasePost = {
  threadSlug: string
  authorEmail: string
  content: string
  position: number
  parentPosition?: number
}

type BaseResource = {
  title: string
  description: string
  category: string
  contact?: string
  link?: string
  location?: string
  resourceType: ResourceType
  icon: string
  tags: string[]
  supportHours?: string
}

export const baseCategories: BaseCategory[] = [
  {
    name: "Yasal Düzenlemeler",
    slug: "yasal-duzenlemeler",
    description: "Engelli bireyleri ilgilendiren güncel yasa ve yönetmelikler",
    icon: "⚖️",
    color: "from-blue-500 to-indigo-500",
    order: 1,
  },
  {
    name: "Sağlık ve Rehabilitasyon",
    slug: "saglik-rehabilitasyon",
    description: "Tedavi süreçleri, fizik tedavi merkezleri ve bakım rehberleri",
    icon: "🏥",
    color: "from-emerald-500 to-teal-500",
    order: 2,
  },
  {
    name: "Eğitim ve Öğrenme",
    slug: "egitim-ogrenme",
    description: "Özel eğitim hakları, burslar ve erişilebilir materyaller",
    icon: "🎓",
    color: "from-purple-500 to-fuchsia-500",
    order: 3,
  },
  {
    name: "İstihdam ve Kariyer",
    slug: "istihdam-kariyer",
    description: "İŞKUR kontenjanları, kariyer planlama ve girişimcilik",
    icon: "💼",
    color: "from-orange-500 to-amber-500",
    order: 4,
  },
  {
    name: "Teknoloji ve Erişilebilirlik",
    slug: "teknoloji-erisilebilirlik",
    description: "Yardımcı teknolojiler, erişilebilir yazılım ve donanımlar",
    icon: "💻",
    color: "from-cyan-500 to-sky-500",
    order: 5,
  },
  {
    name: "Sosyal Yaşam ve Destek",
    slug: "sosyal-destek",
    description: "Günlük yaşam ipuçları, bakım veren deneyimleri ve etkinlikler",
    icon: "🤝",
    color: "from-pink-500 to-rose-500",
    order: 6,
  },
]

export const baseUsers: BaseUser[] = [
  {
    name: "Av. Mehmet Yılmaz",
    email: "mehmet@engelsizforum.org",
    username: "avmehmet",
    bio: "Engelli hakları alanında 10+ yıl deneyimli avukat.",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
    role: UserRole.MODERATOR,
  },
  {
    name: "Dr. Ayşe Kaya",
    email: "ayse@engelsizforum.org",
    username: "drayse",
    bio: "Fizik tedavi ve rehabilitasyon uzmanı.",
    avatar: "https://images.unsplash.com/photo-1544723795-432537f475ba",
  },
  {
    name: "Zeynep Demir",
    email: "zeynep@engelsizforum.org",
    username: "zeynepedu",
    bio: "Görme engelliler için öğretmen ve içerik tasarımcısı.",
  },
  {
    name: "Burak Özkan",
    email: "burak@engelsizforum.org",
    username: "buraktech",
    bio: "Erişilebilirlik üzerine çalışan yazılım geliştiricisi.",
  },
  {
    name: "Elif Arslan",
    email: "elif@engelsizforum.org",
    username: "elifdestek",
    bio: "Sosyal hizmetler uzmanı.",
  },
]

export const baseThreads: BaseThread[] = [
  {
    title: "2025 Engelli Hakları Strateji Belgesi",
    slug: "2025-engelli-haklari-strateji-belgesi",
    content:
      "Aile ve Sosyal Hizmetler Bakanlığı tarafından yayınlanan yeni strateji belgesini inceledik. Hak temelli yaklaşım, bağımsız yaşam ve dijital erişilebilirlik için gelen güncellemeleri değerlendiriyoruz.",
    categorySlug: "yasal-duzenlemeler",
    authorEmail: "mehmet@engelsizforum.org",
    isSticky: true,
    viewCount: 1820,
  },
  {
    title: "Rehabilitasyon Merkezleri İçin Randevu Altyapısı",
    slug: "rehabilitasyon-merkezleri-randevu-altyapisi",
    content:
      "Yeni açılan kamu rehabilitasyon merkezlerinin online randevu sistemi aktif oldu. Deneyimleyen var mı? Ulaşılabilirlik durumlarını konuşalım.",
    categorySlug: "saglik-rehabilitasyon",
    authorEmail: "ayse@engelsizforum.org",
    viewCount: 960,
  },
  {
    title: "Görme Engelli Öğrenciler İçin Açık Kaynak Kitaplık",
    slug: "gorme-engelli-ogrenciler-acik-kaynak-kitaplik",
    content:
      "Braille, sesli kitap ve büyük puntolu içerikleri aynı arayüzde sunan açık kaynak kitaplık projemizi paylaşıyoruz. Katkı ve test etmek isteyenleri bekleriz.",
    categorySlug: "teknoloji-erisilebilirlik",
    authorEmail: "burak@engelsizforum.org",
    viewCount: 740,
  },
]

export const basePosts: BasePost[] = [
  {
    threadSlug: "2025-engelli-haklari-strateji-belgesi",
    authorEmail: "mehmet@engelsizforum.org",
    content: "Belgedeki izleme mekanizması olumlu ama yerel yönetim uygulamalarını yakından takip etmeliyiz.",
    position: 1,
  },
  {
    threadSlug: "2025-engelli-haklari-strateji-belgesi",
    authorEmail: "zeynep@engelsizforum.org",
    content: "Eğitim başlığındaki içerikler özellikle kapsayıcı eğitim konusunda umut verici.",
    position: 2,
    parentPosition: 1,
  },
  {
    threadSlug: "rehabilitasyon-merkezleri-randevu-altyapisi",
    authorEmail: "ayse@engelsizforum.org",
    content: "Merkezlerin hepsi aynı altyapıyı kullanıyor. Ankara için randevu aldım, ekran okuyucu uyumluluğu gayet iyi.",
    position: 1,
  },
  {
    threadSlug: "rehabilitasyon-merkezleri-randevu-altyapisi",
    authorEmail: "elif@engelsizforum.org",
    content: "Aileler için rehber hazırlıyorum, deneyimlerinizi özel mesajla paylaşabilirsiniz.",
    position: 2,
    parentPosition: 1,
  },
  {
    threadSlug: "gorme-engelli-ogrenciler-acik-kaynak-kitaplik",
    authorEmail: "burak@engelsizforum.org",
    content: "Repo linkini ekledim, geri bildirimlerinizi bekliyorum.",
    position: 1,
  },
  {
    threadSlug: "gorme-engelli-ogrenciler-acik-kaynak-kitaplik",
    authorEmail: "zeynep@engelsizforum.org",
    content: "Sesli kitap arayüzü çok temiz, lise öğrencileriyle deneyeceğim.",
    position: 2,
    parentPosition: 1,
  },
]

export const baseAccessibilityResources: BaseResource[] = [
  {
    title: "24/7 Engelsiz Destek Hattı",
    description: "Yasal danışmanlık, psikolojik destek ve acil ihtiyaçlar için ücretsiz hat.",
    category: "Hızlı Destek",
    contact: "+90 850 555 00 00",
    resourceType: ResourceType.HOTLINE,
    icon: "🆘",
    tags: ["acil", "psikolojik destek"],
    supportHours: "7/24",
  },
  {
    title: "İşaret Dili Görüntülü Çağrı Merkezi",
    description: "İşaret dili bilen uzmanlarımız görüntülü çağrı ile yardımcı oluyor.",
    category: "İletişim",
    contact: "canli@engelsizforum.org",
    link: "https://meet.engelsizforum.org",
    resourceType: ResourceType.TOOL,
    icon: "🤟",
    tags: ["işaret dili", "görüntülü"],
    supportHours: "Hafta içi 09:00 - 22:00",
  },
  {
    title: "Erişilebilir Mekan Haritası",
    description: "Şehirlerdeki erişilebilir kamu binaları ve kafeleri toplulukla haritalandırıyoruz.",
    category: "Topluluk",
    link: "https://maps.engelsizforum.org",
    resourceType: ResourceType.COMMUNITY,
    icon: "🗺️",
    tags: ["mekan", "harita"],
  },
  {
    title: "Engelsiz Eğitim Materyal Kütüphanesi",
    description: "Braille, büyük puntolu ve sesli ders içerikleri.",
    category: "Eğitim",
    link: "https://learn.engelsizforum.org",
    resourceType: ResourceType.GUIDE,
    icon: "📚",
    tags: ["eğitim", "erişilebilir içerik"],
  },
]
