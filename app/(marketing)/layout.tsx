import type { ReactNode } from "react"

import { MarketingFooter } from "@/components/marketing/footer"
import { MarketingHeader } from "@/components/marketing/header"

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  )
}
