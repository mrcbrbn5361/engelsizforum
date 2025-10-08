"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Menu, User, LogIn, LogOut, Bell } from "lucide-react"

interface HeaderProps {
  user?: {
    id: string
    name: string
    email: string
    avatar?: string
  } | null
}

export function Header({ user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Header Top */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EF</span>
              </div>
              <span className="text-xl font-bold text-gray-900">EngelsizForum</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Arama..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="ghost" size="sm">
                  <Link href="/notifications">
                    <Bell className="h-4 w-4" />
                  </Link>
                </Button>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="sm">
                  <Link href="/profile">
                    <User className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Çıkış
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Giriş
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/register">Kayıt Ol</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t border-gray-200">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-1">
              <Link 
                href="/" 
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border-b-2 border-blue-600"
              >
                Ana Sayfa
              </Link>
              <Link 
                href="/categories" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Kategoriler
              </Link>
              <Link 
                href="/latest" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Son Konular
              </Link>
              <Link 
                href="/popular" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Popüler
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}