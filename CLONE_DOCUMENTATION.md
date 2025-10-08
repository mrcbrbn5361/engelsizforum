# Engelliler.Biz Platformu - Klonlama Dokümantasyonu

## Proje Özeti

Bu proje, https://www.engelliler.biz/ adresindeki forum platformunun modern bir Next.js klonudur. Platform, engelli haklarıyla ilgili yasal düzenlemeler, sağlık, eğitim, istihdam ve diğer konularda tartışma imkanı sunan bir topluluk sitesidir.

## Teknoloji Stack

### Core Framework
- **Next.js 15** - React tabanlı full-stack framework (App Router)
- **TypeScript 5** - Tip güvenliği ve geliştirici deneyimi
- **Tailwind CSS 4** - Utility-first CSS framework

### Database & ORM
- **Prisma** - Modern database ORM
- **SQLite** - Development database (üretim için PostgreSQL/MySQL hazır)

### UI Components
- **shadcn/ui** - Radix UI tabanlı modern component kütüphanesi
- **Lucide React** - Modern icon kütüphanesi
- **Radix UI** - Accessible component primitives

### State Management
- **Zustand** - Client-side state management
- **TanStack Query** - Server state management

### Authentication & Security
- **NextAuth v4** - Authentication (yapılandırma için hazır)
- **bcrypt** - Password hashing (yapılandırma için hazır)

### Real-time Features
- **Socket.IO** - WebSocket server (yapılandırma hazır)

### Development Tools
- **ESLint** - Code quality
- **Prettier** - Code formatting
- **Nodemon** - Development server hot-reload
- **tsx** - TypeScript execution

## Database Schema

### Kullanıcılar (Users)
```typescript
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  username  String?  @unique
  avatar    String?
  bio       String?
  role      UserRole @default(USER)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  threads  Thread[]
  posts    Post[]
  sessions Session[]
  likes    PostLike[]
}
```

### Kategoriler (Categories)
```typescript
model Category {
  id          String   @id @default(cuid())
  name        String
  description String?
  slug        String   @unique
  icon        String?
  color       String?
  order       Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  threads Thread[]
}
```

### Konular (Threads)
```typescript
model Thread {
  id          String      @id @default(cuid())
  title       String
  slug        String
  content     String
  isSticky    Boolean     @default(false)
  isLocked    Boolean     @default(false)
  isAnswered  Boolean     @default(false)
  viewCount   Int         @default(0)
  replyCount  Int         @default(0)
  categoryId  String
  authorId    String
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  lastPostAt  DateTime?

  // Relations
  category    Category    @relation(fields: [categoryId], references: [id])
  author      User        @relation(fields: [authorId], references: [id])
  posts       Post[]
  tags        ThreadTag[]
}
```

### Mesajlar (Posts)
```typescript
model Post {
  id        String   @id @default(cuid())
  content   String
  authorId  String
  threadId  String
  parentId  String?
  position  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  thread    Thread   @relation(fields: [threadId], references: [id])
  author    User     @relation(fields: [authorId], references: [id])
  parent    Post?    @relation("PostReplies", fields: [parentId], references: [id])
  replies   Post[]   @relation("PostReplies")
  likes     PostLike[]
}
```

### Özellikler (Features)
- **Etiket Sistemi** (Tags, ThreadTag)
- **Beğeni Sistemi** (PostLike)
- **Oturum Yönetimi** (Sessions)
- **Kullanıcı Rolleri** (USER, MODERATOR, ADMIN)

## Uygulanan Özellikler

### ✅ Tamamlanan Özellikler

1. **Ana Sayfa**
   - Forum istatistikleri (toplam üye, konu, mesaj)
   - Kategori listesi ve son konular
   - Aktif kullanıcılar
   - Hızlı eylemler

2. **Kullanıcı Kimlik Doğrulama**
   - Giriş sayfası
   - Kayıt sayfası
   - Form validasyonları
   - Şifre gösterme/gizleme

3. **Forum Fonksiyonelliği**
   - Yeni konu oluşturma
   - Konu detay sayfası
   - Yanıt sistemi
   - Kategori listeleme

4. **Arama Sistemi**
   - Konu arama
   - Kategori filtreleme
   - Sıralama seçenekleri
   - Etiket arama

5. **UI/UX**
   - Responsive tasarım
   - Modern ve temiz arayüz
   - Türkçe dil desteği
   - Loading states ve hata yönetimi

### 🔄 Geliştirme Aşamasında Olan Özellikler

1. **Kullanıcı Profilleri**
   - Profil sayfaları
   - Ayarlar
   - Avatar yönetimi

2. **Admin Paneli**
   - Kategori yönetimi
   - Kullanıcı yönetimi
   - İçerik moderasyonu

3. **Gelişmiş Özellikler**
   - Gerçek zamanlı bildirimler (Socket.IO)
   - Dosya yükleme
   - E-posta doğrulama

## Dosya Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Ana layout
│   ├── page.tsx           # Ana sayfa
│   ├── login/            # Giriş sayfası
│   ├── register/         # Kayıt sayfası
│   ├── new-thread/       # Yeni konu sayfası
│   ├── thread/[id]/      # Konu detay sayfası
│   ├── categories/       # Kategoriler sayfası
│   ├── search/           # Arama sayfası
│   └── api/              # API rotaları
├── components/
│   ├── layout/           # Layout bileşenleri
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/               # shadcn/ui bileşenleri
├── lib/
│   ├── db.ts            # Database client
│   └── utils.ts         # Yardımcı fonksiyonlar
└── hooks/               # Custom hooks
```

## Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Kurulum Adımları

1. **Depoyu klonlayın**
```bash
git clone <repository-url>
cd engelliler-biz-clone
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Ortam değişkenlerini ayarlayın**
```bash
cp .env.example .env.local
```

4. **Database'i başlatın**
```bash
npm run db:push
```

5. **Geliştirme sunucusunu çalıştırın**
```bash
npm run dev
```

6. **Tarayıcıda açın**
```
http://localhost:3000
```

### Komutlar
```bash
npm run dev          # Geliştirme sunucusu
npm run build        # Production build
npm run start        # Production sunucusu
npm run lint         # Kod kalitesi kontrolü
npm run db:push      # Database schema güncelleme
npm run db:generate  # Prisma client oluşturma
```

## API Endpoint'leri

### Mevcut API'ler (Yapılandırma için hazır)
- `/api/health` - Health check
- `/api/auth/*` - Authentication endpoints
- `/api/threads/*` - Thread management
- `/api/posts/*` - Post management
- `/api/categories/*` - Category management
- `/api/search/*` - Search functionality
- `/api/socketio` - WebSocket server

## Özelleştirme

### Tema Özelleştirme
- Renkler: `src/components/ui/` içindeki bileşenler
- Font: `src/app/layout.tsx` içindeki font yapılandırması
- Logo: `public/logo.svg` dosyası

### Dil Özelleştirme
- Türkçe metinler: Bileşen dosyalarında doğrudan
- Dil desteği: `next-intl` kütüphanesi ile çoklu dil eklenebilir

### Database Değişiklikleri
- Schema: `prisma/schema.prisma`
- Migration: `npm run db:migrate`
- Örnek veri: `prisma/seed.ts` (oluşturulabilir)

## Güvenlik Özellikleri

### Mevcut Güvenlik Önlemleri
- CSRF koruması (NextAuth ile)
- XSS koruması (React built-in)
- SQL Injection koruması (Prisma ORM)
- Input validasyonu (Zod ile)

### Eklenmesi Gereken Güvenlik Özellikleri
- Rate limiting
- Spam filtreleme
- Content moderation
- File upload güvenliği

## Performans Optimizasyonları

### Zaten Uygulanan Optimizasyonlar
- Next.js static generation
- Image optimization (Sharp)
- Code splitting
- Lazy loading

### Ek Optimizasyonlar
- Caching (Redis)
- Database indexing
- CDN integration
- Performance monitoring

## Testler

### Mevcut Testler
- ESLint kod kalitesi
- TypeScript tip kontrolü

### Eklenmesi Gereken Testler
- Unit testleri (Jest/Vitest)
- Integration testleri
- E2E testleri (Playwright)
- Accessibility testleri

## Dağıtım

### Production Build
```bash
npm run build
npm run start
```

### Deployment Seçenekleri
- Vercel (recommended for Next.js)
- Docker
- Traditional server (PM2)

## Lisans

Bu proje, orijinal Engelliler.Biz platformunun bir klonudur ve eğitim amaçlı olarak oluşturulmuştur. Orijinal platformun tüm haklarına tabidir.

---

## İletişim

Prole ilgili sorularınız için:
- GitHub Issues
- E-posta: [iletişim bilgileri]

---

*Bu dokümantasyon, projenin güncel durumunu ve geliştirme planlarını içermektedir.*