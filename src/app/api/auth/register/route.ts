import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/db"
import { hashPassword } from "@/lib/auth/password"
import { createSession } from "@/lib/auth/session"

const registerSchema = z.object({
  name: z.string().min(2, "Ad soyad zorunludur"),
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  username: z.string().min(3, "Kullanıcı adı en az 3 karakter olmalı"),
  phone: z.string().min(10, "Telefon numarası eksik görünüyor").optional(),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
  disabilityFocus: z.string().optional(),
  assistiveTech: z.string().optional(),
  communicationPreference: z.string().optional(),
  supportAreas: z.array(z.string()).default([]),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message ?? "Form verileri doğrulanamadı"
      return NextResponse.json({ message }, { status: 400 })
    }

    const { email, username, name, password, phone, disabilityFocus, assistiveTech, communicationPreference, supportAreas } =
      parsed.data

    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
      },
    })

    if (existingUser) {
      return NextResponse.json({ message: "Bu e-posta veya kullanıcı adı zaten kullanılıyor" }, { status: 409 })
    }

    const hashedPassword = await hashPassword(password)

    const user = await db.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        phone,
        hashedPassword,
      },
    })

    await db.accessibilityProfile.create({
      data: {
        userId: user.id,
        disabilityFocus,
        assistiveTech: assistiveTech ? assistiveTech.split(",").map((item) => item.trim()).filter(Boolean) : undefined,
        communicationPreference,
        visualSupport: supportAreas.includes("visual"),
        hearingSupport: supportAreas.includes("hearing"),
        cognitiveSupport: supportAreas.includes("cognitive"),
        mobilitySupport: supportAreas.includes("mobility"),
        communicationSupport: supportAreas.includes("communication"),
      },
    })

    await createSession(user.id)

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    })
  } catch (error) {
    console.error("Register error", error)
    return NextResponse.json({ message: "Kayıt sırasında bir hata oluştu" }, { status: 500 })
  }
}
