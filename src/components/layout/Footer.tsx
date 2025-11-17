import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Logo } from "@/components/layout/Logo"

const supportLinks = [
  { label: "Destek Merkezi", href: "/#destek" },
  { label: "Forum Kuralları", href: "/rules" },
  { label: "Erişilebilirlik Taahhüdü", href: "/accessibility" },
  { label: "Sıkça Sorulan Sorular", href: "/help" },
]

const legalLinks = [
  { label: "Gizlilik Politikası", href: "/privacy" },
  { label: "Kullanım Koşulları", href: "/terms" },
  { label: "Çerez Politikası", href: "/cookies" },
  { label: "İletişim", href: "/contact" },
]

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <Logo showWordmark={true} />
            <p className="text-sm text-slate-300">
              EngelsizForum; hukukçular, sağlık profesyonelleri ve deneyimli topluluk üyelerinden oluşan gönüllü bir ağ ile
              engelli bireylere rehberlik eder.
            </p>
            <div className="flex gap-4 text-slate-400">
              {[Twitter, Facebook, Instagram].map((Icon, index) => (
                <Link key={index} href="#" className="transition hover:text-white" aria-label="Sosyal medya bağlantısı">
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">Navigasyon</h3>
            <ul className="space-y-2 text-sm">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-300 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">Yasal</h3>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-300 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">Hızlı Destek</h3>
            <div className="space-y-3 text-sm">
              <p className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200">
                <span className="block text-xs uppercase tracking-wide text-slate-400">24/7 Destek Hattı</span>
                +90 850 555 00 00
              </p>
              <p className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200">
                <span className="block text-xs uppercase tracking-wide text-slate-400">İşaret Dili Çağrı Merkezi</span>
                canli@engelsizforum.org
              </p>
              <p className="text-xs text-slate-400">
                EngelsizForum Vakfı | Öğretmenler Mah. 1357. Sok. No:12 Çankaya/Ankara
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EngelsizForum Platformu. Topluluğun sesiyle büyüyor.</p>
        </div>
      </div>
    </footer>
  )
}