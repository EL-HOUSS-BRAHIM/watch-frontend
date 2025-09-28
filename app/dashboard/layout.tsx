"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import {
  BarChart3,
  Bell,
  CalendarDays,
  Clapperboard,
  LayoutDashboard,
  LifeBuoy,
  MessagesSquare,
  Settings,
  Video,
  Wallet,
} from "lucide-react"
import { useRouter } from "next/navigation"

import { SideNav, type SideNavSection } from "@/components/navigation/side-nav"
import { TopNav } from "@/components/navigation/top-nav"

interface StoredUser {
  first_name?: string
  last_name?: string
  role?: string
  profile?: {
    avatar?: string
  }
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null
    const userData = typeof window !== "undefined" ? localStorage.getItem("user") : null

    if (!token) {
      router.push("/auth/login")
      setIsCheckingAuth(false)
      return
    }

    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error("Failed to parse stored user", error)
      }
    }

    setIsCheckingAuth(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
    router.push("/")
  }

  const navSections: SideNavSection[] = useMemo(
    () => [
      {
        items: [
          { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
          { href: "/dashboard/watch-parties", label: "Watch Parties", icon: Clapperboard, badge: "Live" },
          { href: "/dashboard/videos", label: "Video Library", icon: Video },
          { href: "/dashboard/events", label: "Events", icon: CalendarDays },
        ],
      },
      {
        title: "Engagement",
        items: [
          { href: "/dashboard/messages", label: "Messages", icon: MessagesSquare },
          { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
          { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
          { href: "/dashboard/store", label: "Store", icon: Wallet },
        ],
      },
      {
        title: "Configuration",
        items: [
          { href: "/dashboard/settings", label: "Settings", icon: Settings },
          { href: "/dashboard/support", label: "Support", icon: LifeBuoy },
        ],
      },
    ],
    [],
  )

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav
        user={
          user
            ? {
                name: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() || "Host",
                role: user.role,
                avatarUrl: user.profile?.avatar || "/placeholder.svg",
              }
            : undefined
        }
        navLinks={[
          { href: "/dashboard", label: "Overview" },
          { href: "/dashboard/watch-parties", label: "Parties" },
          { href: "/dashboard/videos", label: "Videos" },
          { href: "/dashboard/analytics", label: "Analytics" },
        ]}
        onLogout={handleLogout}
      />

      <div className="flex">
        <SideNav sections={navSections} />
        <main className="flex-1 px-4 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
