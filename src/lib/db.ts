import { PrismaClient } from '@prisma/client'
import path from 'path'

const databaseUrl = process.env.DATABASE_URL
if (databaseUrl?.startsWith('file:./')) {
  const relativePath = databaseUrl.replace('file:', '')
  const absolutePath = path.join(process.cwd(), relativePath)
  process.env.DATABASE_URL = `file:${absolutePath}`
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db