"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CinemaThemeToggle } from "@/components/ui/theme-provider"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("access_token")
    const userData = localStorage.getItem("user")

    if (!token) {
      router.push("/auth/login")
      return
    }

    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
                </svg>
              </div>
              <span className="text-xl font-serif font-semibold">WatchTogether</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link
                href="/dashboard/watch-parties"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Parties
              </Link>
              <Link href="/dashboard/videos" className="text-muted-foreground hover:text-foreground transition-colors">
                Videos
              </Link>
              <Link
                href="/dashboard/analytics"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Analytics
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <CinemaThemeToggle />

            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.profile?.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {user.first_name?.[0]}
                  {user.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">
                  {user.first_name} {user.last_name}
                </p>
                <Badge variant="secondary" className="text-xs">
                  {user.role}
                </Badge>
              </div>
            </div>

            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
