import { NextResponse } from "next/server"

import { deleteSession } from "@/lib/auth/session"

export async function POST() {
  try {
    await deleteSession()
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Logout error", error)
    return NextResponse.json({ message: "Çıkış yapılamadı" }, { status: 500 })
  }
}
