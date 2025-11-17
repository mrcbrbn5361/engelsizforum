import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/db"
import { verifyPassword } from "@/lib/auth/password"
import { createSession } from "@/lib/auth/session"

const loginSchema = z.object({
  identifier: z.string().min(3, "E-posta veya kullanıcı adı gereklidir"),
  password: z.string().min(6, "Şifre alanı zorunludur"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message ?? "Form verileri doğrulanamadı"
      return NextResponse.json({ message }, { status: 400 })
    }

    const { identifier, password } = parsed.data
    const normalizedIdentifier = identifier.trim().toLowerCase()

    const user = await db.user.findFirst({
      where: {
        OR: [
          { email: normalizedIdentifier },
          { username: normalizedIdentifier },
        ],
      },
    })

    if (!user) {
      return NextResponse.json({ message: "Kullanıcı bulunamadı" }, { status: 401 })
    }

    const isValidPassword = await verifyPassword(password, user.hashedPassword)
    if (!isValidPassword) {
      return NextResponse.json({ message: "Bilgiler eşleşmiyor" }, { status: 401 })
    }

    await createSession(user.id)

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Login error", error)
    return NextResponse.json({ message: "Giriş sırasında bir hata oluştu" }, { status: 500 })
  }
}
