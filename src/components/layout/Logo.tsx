import Link from "next/link"
import { cn } from "@/lib/utils"

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
}

type LogoProps = {
  showWordmark?: boolean
  size?: keyof typeof sizeMap
  className?: string
}

export function Logo({ showWordmark = true, size = "md", className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 font-semibold text-gray-900", className)}
      aria-label="EngelsizForum ana sayfası"
    >
      <LogoMark size={size} />
      {showWordmark && (
        <div>
          <p className="text-lg font-bold leading-none">EngelsizForum</p>
          <p className="text-xs text-muted-foreground">Birlikte daha erişilebilir</p>
        </div>
      )}
    </Link>
  )
}

type LogoMarkProps = {
  size?: keyof typeof sizeMap
}

export function LogoMark({ size = "md" }: LogoMarkProps) {
  return (
    <span className={cn("inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-500 to-rose-500 p-0.5", sizeMap[size])}>
      <svg viewBox="0 0 64 64" role="img" aria-hidden="true" className="h-full w-full rounded-[1.35rem] bg-white p-2">
        <defs>
          <linearGradient id="handshake" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="28" fill="#eef2ff" />
        <path
          d="M16 30c3-6 9-10 16-10s13 4 16 10"
          fill="none"
          stroke="#a5b4fc"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M18 34l10 10c2 2 6 2 8 0l10-10"
          fill="none"
          stroke="url(#handshake)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="24" r="4" fill="#38bdf8" />
        <circle cx="40" cy="24" r="4" fill="#f472b6" />
      </svg>
    </span>
  )
}
