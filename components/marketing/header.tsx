"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { CinemaThemeToggle } from "@/components/ui/theme-provider"
import { cn } from "@/lib/utils"

const navigation = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
]

export function MarketingHeader() {
  const pathname = usePathname()

  return (
    <header className="border-b border-border/50 bg-card/40 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <svg className="h-5 w-5 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
            </svg>
          </div>
          <span className="text-lg font-serif font-semibold">WatchTogether</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === item.href && "text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CinemaThemeToggle />
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="sm" className="cinema-glow">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
