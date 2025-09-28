import Link from "next/link"

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Watch Parties", href: "/features#watch-parties" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Support", href: "/dashboard/support" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "API Guide", href: "/features#integrations" },
      { label: "Tech Alignment", href: "/about" },
      { label: "Status", href: "#" },
    ],
  },
]

export function MarketingFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-card/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <svg className="h-5 w-5 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
                </svg>
              </div>
              <span className="text-lg font-serif font-semibold">WatchTogether</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Host immersive watch parties, stay connected with your community, and manage every event from one cinematic hub.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border/50 pt-6 text-sm text-muted-foreground">
          <div className="flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between">
            <p>© {currentYear} WatchTogether. All rights reserved.</p>
            <div className="flex items-center justify-center gap-4">
              <Link href="#" className="transition-colors hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="transition-colors hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="transition-colors hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
