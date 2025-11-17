import "server-only"

import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto"
import { promisify } from "util"

const scrypt = promisify(scryptCallback)
const KEY_LENGTH = 64

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex")
  const derived = (await scrypt(password, salt, KEY_LENGTH)) as Buffer
  return `${salt}:${derived.toString("hex")}`
}

export async function verifyPassword(password: string, stored: string) {
  if (!stored?.includes(":")) return false
  const [salt, key] = stored.split(":")
  if (!salt || !key) return false
  const derived = (await scrypt(password, salt, KEY_LENGTH)) as Buffer
  const keyBuffer = Buffer.from(key, "hex")
  if (derived.length !== keyBuffer.length) return false

  return timingSafeEqual(derived, keyBuffer)
}
