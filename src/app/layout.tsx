import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EngelsizForum - Engelli Hakları Forumu",
  description: "Engelli haklarıyla ilgili yasal düzenlemeler ve sorunların çözümüne yönelik mücadele eden bir topluluk platformu.",
  keywords: ["engelli", "hakları", "forum", "yasal düzenlemeler", "mücadele", "topluluk"],
  authors: [{ name: "EngelsizForum Team" }],
  openGraph: {
    title: "EngelsizForum",
    description: "Engelli hakları forumu ve topluluk platformu",
    url: "https://w08cb7n06hb1-deploy.space.z.ai",
    siteName: "EngelsizForum",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EngelsizForum",
    description: "Engelli hakları forumu ve topluluk platformu",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
