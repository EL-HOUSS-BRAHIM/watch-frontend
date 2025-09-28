"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const settingsNav = [
  { href: "/dashboard/settings", label: "Overview" },
  { href: "/dashboard/settings/profile", label: "Profile" },
  { href: "/dashboard/settings/account", label: "Account" },
  { href: "/dashboard/settings/security", label: "Security" },
  { href: "/dashboard/settings/preferences", label: "Preferences" },
  { href: "/dashboard/settings/integrations", label: "Integrations" },
]

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-border/40 bg-background/70 p-4 shadow-sm ring-1 ring-inset ring-black/5 backdrop-blur">
        <h1 className="text-3xl font-serif font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account details, preferences, and connected services for your watch party studio.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="lg:w-64">
          <nav className="flex flex-row gap-2 overflow-x-auto rounded-lg border border-border/40 bg-muted/30 p-2 lg:flex-col lg:gap-1 lg:overflow-visible">
            {settingsNav.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors lg:flex-none",
                    isActive
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        <div className="flex-1 space-y-8">{children}</div>
      </div>
    </div>
  )
}
