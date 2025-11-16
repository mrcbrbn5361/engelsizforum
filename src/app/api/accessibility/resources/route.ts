import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { ensureBaseData } from "@/lib/ensure-base-data"

export async function GET() {
  try {
    await ensureBaseData()
    const resources = await db.accessibilityResource.findMany({ orderBy: { createdAt: "desc" } })
    return NextResponse.json({ resources })
  } catch (error) {
    console.error("Accessibility resources error", error)
    return NextResponse.json({ message: "Kaynak listesi yüklenemedi" }, { status: 500 })
  }
}
