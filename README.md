# 🚀 EngelsizForum - Engelli Hakları Forumu

Modern, üretim hazır bir forum uygulaması, engelli haklarıyla ilgili yasal düzenlemeler ve sorunların çözümüne yönelik mücadele eden bir topluluk platformu.

## ✨ Teknoloji Stack

Bu platform aşağıdaki modern teknolojilerle oluşturulmuştur:

### 🎯 Çekirdek Framework
- **⚡ Next.js 15** - App Router ile üretim için React framework
- **📘 TypeScript 5** - Daha iyi geliştirici deneyimi için tip güvenli JavaScript
- **🎨 Tailwind CSS 4** - Hızlı UI geliştirme için utility-first CSS framework

### 🧩 UI Bileşenleri & Stil
- **🧩 shadcn/ui** - Radix UI üzerine kurulu yüksek kaliteli, erişilebilir bileşenler
- **🎯 Lucide React** - Güzel ve tutarlı ikon kütüphanesi
- **🌈 Framer Motion** - React için üretim hazır motion kütüphanesi
- **🎨 Next Themes** - 2 satır mükemmel karanlık mod

### 📋 Formlar & Doğrulama
- **🎣 React Hook Form** - Performanslı formlar ile kolay doğrulama
- **✅ Zod** - TypeScript-first şema doğrulama

### 🔄 State Management & Veri Çekme
- **🐻 Zustand** - Basit, ölçeklenebilir state management
- **🔄 TanStack Query** - React için güçlü veri senkronizasyonu
- **🌐 Axios** - Promise tabanlı HTTP istemcisi

### 🗄️ Veritabanı & Backend
- **🗄️ Prisma** - Next-generation Node.js ve TypeScript ORM
- **🔐 NextAuth.js** - Tam açık kaynaklı kimlik doğrulama çözümü

### 🎨 Gelişmiş Özellikler
- **📊 TanStack Table** - Headless UI for building tables and datagrids
- **🖱️ DND Kit** - Modern drag and drop toolkit for React
- **📊 Recharts** - Redefined chart library built with React and D3
- **🖼️ Sharp** - High performance image processing

### 🌍 Uluslararası & Araçlar
- **🌍 Next Intl** - Next.js için uluslararasılaştırma kütüphanesi
- **📅 Date-fns** - Modern JavaScript date utility library
- **🪝 ReactUse** - Modern development için essential React hooks

## 🎯 Neden EngelsizForum?

- **🏎️ Hızlı Geliştirme** - Önceden yapılandırılmış araçlar ve en iyi uygulamalar
- **🎨 Güzel UI** - Gelişmiş etkileşimlerle tam shadcn/ui bileşen kütüphanesi
- **🔒 Tip Güvenliği** - Zod doğrulaması ile tam TypeScript yapılandırması
- **📱 Responsive** - Mobil öncesi tasarım ilkeleri ile pürüzsüz animasyonlar
- **🗄️ Veritabanı Hazır** - Hızlı backend geliştirme için Prisma ORM
- **🔐 Kimlik Doğrulama Dahil** - Güvenli kimlik doğrulama akışları
- **📊 Veri Görselleştirme** - Grafikler, tablolar ve sürükle-bırak işlevselliği
- **🌍 i18n Hazır** - Next Intl ile çoklu dil desteği
- **🚀 Üretim Hazır** - Optimize edilmiş build ve deployment ayarları
- **🤖 AI Dostu** - AI yardımı için yapılandırılmış kod tabanı

## 🚀 Hızlı Başlangıç

```bash
# Bağımlılıkları yükle
npm install

# .env dosyasını oluştur (örn. .env.example dosyasını kopyalayarak)
cp .env.example .env

# Veritabanı şemasını ve örnek verileri yükle
npm run db:push
npm run db:seed

# Geliştirme sunucusunu başlat
npm run dev

# Üretim için build
npm run build

# Üretim sunucusunu başlat
npm start
```

Uygulamanın çalıştığını görmek için [http://localhost:3000](http://localhost:3000) adresini ziyaret edin. Geliştirme sunucusu başladığında terminalde aşağıdaki gibi yerel bilgiler görünecektir:

```
> Ready on http://0.0.0.0:3000
> Production URL: http://localhost:3000
> Socket.IO server running at ws://0.0.0.0:3000/api/socketio
```

> Yeni geliştirilen erişilebilir arayüz için en iyi deneyimi elde etmek adına tarayıcınızda yüksek kontrast ve font ölçeklendirme ayarlarını denemeyi unutmayın.

## 📁 Proje Yapısı

```
src/
├── app/                 # Next.js App Router sayfaları
│   ├── login/          # Giriş sayfası
│   ├── register/       # Kayıt sayfası
│   ├── new-thread/     # Yeni konu oluşturma
│   ├── thread/[id]/    # Konu detayları
│   ├── categories/     # Kategoriler
│   └── search/         # Arama
├── components/         # Tekrar kullanılabilir React bileşenleri
│   └── layout/         # Layout bileşenleri (Header, Footer)
├── hooks/              # Özel React hooks
└── lib/                # Utility fonksiyonları ve yapılandırmalar
```

## 🎨 Kullanılabilir Özellikler & Bileşenler

Bu platform modern web geliştirme için kapsamlı bir araç seti içerir:

### 🌈 Engelsiz Deneyim Katmanları
- **Erişilebilirlik Paneli**: Yazı boyutu, yüksek kontrast, disleksi dostu font ve hareket azaltma seçenekleri kullanıcı başına kaydedilir.
- **Engelsiz Destek Hattı**: Ana sayfadan 7/24 arama ve işaret dili çağrı merkezi bağlantıları.
- **Kaynak Havuzu**: Prisma veritabanında saklanan erişilebilirlik kaynakları `GET /api/accessibility/resources` ve `GET /api/forum/overview` uç noktalarıyla sunulur.
- **Duyarlı Logo ve Tema**: Yeni EngelsizForum logosu ile hero bölümü, kartlar ve istatistikler yüksek kontrastlı olarak güncellendi.

### 🧩 UI Bileşenleri (shadcn/ui)
- **Layout**: Card, Separator, Aspect Ratio, Resizable Panels
- **Forms**: Input, Textarea, Select, Checkbox, Radio Group, Switch
- **Feedback**: Alert, Toast (Sonner), Progress, Skeleton
- **Navigation**: Breadcrumb, Menubar, Navigation Menu, Pagination
- **Overlay**: Dialog, Sheet, Popover, Tooltip, Hover Card
- **Data Display**: Badge, Avatar, Calendar

### 📊 Gelişmiş Veri Özellikleri
- **Tables**: Güçlü veri tabloları ile sıralama, filtreleme, sayfalama (TanStack Table)
- **Charts**: Beautiful visualizations with Recharts
- **Forms**: Type-safe forms with React Hook Form + Zod validation

### 🎨 Etkileşimli Özellikler
- **Animations**: Pürüzsüz mikro etkileşimler ile Framer Motion
- **Drag & Drop**: Modern sürükle-bırak işlevselliği ile DND Kit
- **Theme Switching**: Yerleşik karanlık/aydınlık mod desteği

### 🔐 Backend Entegrasyonu
- **Authentication**: Kullanıcı giriş/çıkış akışları
- **Database**: Type-safe veritabanı işlemleri ile Prisma
- **Seed Script**: `npm run db:seed` komutu; kategoriler, uzman kullanıcılar, forum başlıkları ve erişilebilirlik kaynakları ile veritabanını doldurur.
- **API Client**: HTTP istekleri ile Axios + TanStack Query
- **State Management**: Basit ve ölçeklenebilir ile Zustand

### 🌍 Üretim Özellikleri
- **Internationalization**: Next Intl ile çoklu dil desteği
- **Image Optimization**: Sharp ile otomatik görüntü işleme
- **Type Safety**: Zod doğrulaması ile uçtan uca TypeScript
- **Essential Hooks**: ReactUse ile 100+ faydalı React hooks

## 🚀 Deployment

- Varsayılan olarak uygulama `http://localhost:3000` adresinde çalışır.
- Farklı bir domain veya port kullanmak için `.env` dosyasındaki `HOST`, `PORT`, `APP_BASE_URL` ve `NEXT_PUBLIC_APP_URL` değişkenlerini güncellemeniz yeterlidir.
- Yapı sonrası `npm start` komutu `server.ts` dosyasını kullanarak aynı yerel bilgileri konsola yazdırır.

## 📋 Forum Özellikleri

- **Kategori Sistemi**: 6 ana kategori (Yasal Düzenlemeler, Sağlık, Eğitim, İstihdam, Teknoloji, Sosyal Destek)
- **Konu Yönetimi**: Konu oluşturma, yanıtlama, beğeni sistemi
- **Arama**: İçerik, etiket ve yazar bazlı arama
- **Kullanıcı Yönetimi**: Kayıt, giriş, profil yönetimi
- **Moderasyon**: Moderatör sistemi ve kilitli/sabitli konular
- **Etiket Sistemi**: Konuları kategorize etme ve bulma
- **Destek Merkezi**: İşaret dili hattı, haritalar ve psikolojik destek bağlantıları.
- **Görsel Rahatlık**: Yüksek kontrast ve disleksi dostu font ayarları tüm sayfalarda uygulanır.

## 🎯 Ana Sayfa Özellikleri

- **İstatistikler**: Toplam üye, konu, mesaj sayıları
- **Kategori Kartları**: Her kategori için detaylı bilgi
- **Son Konular**: En yeni tartışmalar
- **Aktif Kullanıcılar**: Çevrimiçi üyeler
- **Hızlı Eylemler**: Yeni konu, arama, yardım

---

Engelliler hakları bilinçlenmesi ve mücadelesi için ❤️ ile geliştirildi.