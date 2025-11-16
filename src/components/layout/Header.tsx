"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, HeartHandshake, LogIn, LogOut, MessageCircle, Search, User } from "lucide-react"
import { Logo } from "@/components/layout/Logo"

interface HeaderProps {
  user?: {
    id: string
    name: string
    email: string
    avatar?: string
  } | null
}

export function Header({ user }: HeaderProps) {
  const navItems = [
    { href: "/", label: "Ana Sayfa" },
    { href: "/categories", label: "Kategoriler" },
    { href: "/#ozellikler", label: "Özellikler" },
    { href: "/#destek", label: "Destek Merkezi" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-6">
            <Logo />
            <div className="hidden flex-1 md:block">
              <label className="relative block" aria-label="Forum içerisinde ara">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Konularda, etiketlerde veya uzmanlarda ara"
                  className="w-full rounded-2xl border border-slate-200 bg-white/70 py-2 pl-9 pr-4 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2 border-blue-200 text-blue-600" asChild>
              <Link href="tel:+908505550000">
                <HeartHandshake className="h-4 w-4" />
                0850 555 00 00
              </Link>
            </Button>
            {user ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full" asChild>
                  <Link href="/notifications">
                    <Bell className="h-4 w-4" />
                  </Link>
                </Button>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profil
                  </Link>
                </Button>
                <Button variant="default" size="sm" className="bg-slate-900 text-white">
                  <LogOut className="mr-2 h-4 w-4" />
                  Çıkış
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Giriş
                  </Link>
                </Button>
                <Button variant="default" size="sm" className="bg-blue-600 text-white" asChild>
                  <Link href="/register">Kayıt Ol</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        <nav className="flex flex-col gap-3 border-t border-slate-100 py-3 text-sm font-medium text-slate-600 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 transition hover:bg-blue-50 hover:text-blue-600"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/new-thread">
                <MessageCircle className="h-4 w-4" />
                Yeni Konu Aç
              </Link>
            </Button>
            <Button variant="ghost" className="text-slate-500" asChild>
              <Link href="/search">Gelişmiş Arama</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}