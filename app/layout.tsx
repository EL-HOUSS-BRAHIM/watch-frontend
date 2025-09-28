import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

import { ThemeProvider } from "@/components/ui/theme-provider"

export const metadata: Metadata = {
  title: "WatchTogether - Cinema & Watch Party Platform",
  description:
    "Host movie nights and watch parties with friends. Stream together, chat in real-time, and create unforgettable cinema experiences.",
  generator: "v0.app",
  keywords: ["watch party", "movie night", "cinema", "streaming", "friends"],
  authors: [{ name: "WatchTogether Team" }],
  openGraph: {
    title: "WatchTogether - Cinema & Watch Party Platform",
    description: "Host movie nights and watch parties with friends",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
