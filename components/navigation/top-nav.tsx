"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Search } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CinemaThemeToggle } from "@/components/ui/theme-provider"
import { cn } from "@/lib/utils"

interface NavLink {
  href: string
  label: string
}

interface TopNavProps {
  user?: {
    name: string
    role?: string
    avatarUrl?: string
  }
  navLinks?: NavLink[]
  onLogout?: () => void
}

export function TopNav({ user, navLinks = [], onLogout }: TopNavProps) {
  const pathname = usePathname()

  return (
    <header className="border-b border-border/40 bg-card/40 backdrop-blur">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <svg className="h-5 w-5 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">WatchTogether</span>
                <span className="text-xs text-muted-foreground">Creator Dashboard</span>
              </div>
            </Link>

            <nav className="hidden items-center gap-4 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                    pathname === link.href && "text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-1 items-center gap-3">
            <div className="relative hidden flex-1 items-center md:flex">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search parties, videos, people..." aria-label="Search dashboard" />
            </div>
            <CinemaThemeToggle />
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                3
              </span>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="hidden text-left text-sm sm:block">
                <p className="font-medium text-foreground">{user.name}</p>
                {user.role ? <Badge variant="secondary">{user.role}</Badge> : null}
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Not signed in</div>
          )}

          {onLogout ? (
            <Button variant="ghost" size="sm" onClick={onLogout}>
              Sign Out
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  )
}
