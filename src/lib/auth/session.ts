import "server-only"

import { cookies } from "next/headers"
import { createHash, randomBytes } from "crypto"
import { db } from "@/lib/db"

const SESSION_COOKIE = "engelsizforum_session"
const SESSION_DURATION_DAYS = 7

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex")
}

export async function createSession(userId: string) {
  const rawToken = randomBytes(32).toString("hex")
  const tokenHash = hashToken(rawToken)
  const expiresAt = new Date(Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000)

  await db.session.create({
    data: {
      userId,
      token: tokenHash,
      expiresAt,
    },
  })

  const cookieStore = cookies()
  cookieStore.set(SESSION_COOKIE, rawToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  })
}

export async function getSession() {
  const cookieStore = cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null

  const session = await db.session.findFirst({
    where: {
      token: hashToken(token),
      expiresAt: { gt: new Date() },
    },
    include: { user: true },
  })

  if (!session) {
    cookieStore.delete(SESSION_COOKIE, { path: "/" })
    return null
  }

  return session
}

export async function deleteSession() {
  const cookieStore = cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return

  await db.session.deleteMany({ where: { token: hashToken(token) } })
  cookieStore.delete(SESSION_COOKIE, { path: "/" })
}

export async function getCurrentUser() {
  const session = await getSession()
  if (!session) return null

  const { user } = session
  return {
    id: user.id,
    name: user.name ?? "Topluluk Üyesi",
    email: user.email,
    avatar: user.avatar ?? undefined,
  }
}
