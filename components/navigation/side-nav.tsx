"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface SideNavItem {
  href: string
  label: string
  icon?: LucideIcon
  badge?: string
}

export interface SideNavSection {
  title?: string
  items: SideNavItem[]
}

interface SideNavProps {
  sections: SideNavSection[]
}

export function SideNav({ sections }: SideNavProps) {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-border/40 bg-card/20 p-6 lg:block">
      <nav className="space-y-6">
        {sections.map((section) => (
          <div key={section.title ?? "default"}>
            {section.title ? (
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {section.title}
              </p>
            ) : null}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {Icon ? <Icon className="h-4 w-4" /> : null}
                        {item.label}
                      </span>
                      {item.badge ? (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] text-primary">{item.badge}</span>
                      ) : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
