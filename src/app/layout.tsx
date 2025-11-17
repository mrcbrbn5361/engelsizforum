import type { Metadata } from "next";
import { Geist, Geist_Mono, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AccessibilityPanel } from "@/components/layout/AccessibilityPanel";
import { AssistiveHUD } from "@/components/layout/AssistiveHUD";
import { getCurrentUser } from "@/lib/auth/session";
import { runtimeConfig } from "@/lib/runtime-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hyperlegible = Atkinson_Hyperlegible({
  variable: "--font-accessibility",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const { appUrl } = runtimeConfig;

export const metadata: Metadata = {
  title: "EngelsizForum - Engelli Hakları Forumu",
  description: "Engelli haklarıyla ilgili yasal düzenlemeler ve sorunların çözümüne yönelik mücadele eden bir topluluk platformu.",
  keywords: ["engelli", "hakları", "forum", "yasal düzenlemeler", "mücadele", "topluluk"],
  authors: [{ name: "EngelsizForum Team" }],
  metadataBase: new URL(appUrl),
  openGraph: {
    title: "EngelsizForum",
    description: "Engelli hakları forumu ve topluluk platformu",
    url: appUrl,
    siteName: "EngelsizForum",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EngelsizForum",
    description: "Engelli hakları forumu ve topluluk platformu",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${hyperlegible.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-screen flex flex-col">
          <Header user={currentUser} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <AccessibilityPanel />
        <AssistiveHUD />
        <Toaster />
      </body>
    </html>
  );
}
