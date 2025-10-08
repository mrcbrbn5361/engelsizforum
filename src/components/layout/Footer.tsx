import Link from "next/link"
import { Twitter, Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hakkımızda</h3>
            <p className="text-gray-300 text-sm mb-4">
              EngelsizForum, engelli haklarıyla ilgili yasal düzenlemeler 
              ve karşılaşılan sorunların çözümüne yönelik mücadele eden bir topluluktur.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/forum" className="text-gray-300 hover:text-white">
                  Forum Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-300 hover:text-white">
                  Kategoriler
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-gray-300 hover:text-white">
                  Forum Kuralları
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white">
                  Yardım
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Yasal Bilgiler</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white">
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-300 hover:text-white">
                  Çerez Politikası
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Bülten</h3>
            <p className="text-gray-300 text-sm mb-4">
              Platformdaki güncel konulardan haberdar olmak için bültenimize abone olun.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
              >
                Abone Ol
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 EngelsizForum Platformu. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}