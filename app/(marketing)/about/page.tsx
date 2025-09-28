import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const milestones = [
  {
    year: "2022",
    title: "Prototype & Mock Middleware",
    description:
      "Built our Next.js middleware to swap seamlessly between bundled mock responses and live API calls, accelerating design sprints.",
  },
  {
    year: "2023",
    title: "Realtime Expansion",
    description:
      "Integrated Django Channels, WebSocket providers, and polling fallbacks to support large scale synchronized events.",
  },
  {
    year: "2024",
    title: "Studio Operations",
    description:
      "Launched admin workspaces, advanced analytics, and Stripe-backed monetization for creators and studios.",
  },
]

export default function AboutPage() {
  return (
    <div className="bg-background px-4 py-16">
      <div className="container mx-auto max-w-4xl space-y-12">
        <div className="text-center">
          <Badge variant="outline" className="mb-4">
            Our mission
          </Badge>
          <h1 className="text-4xl font-serif font-semibold text-foreground md:text-5xl">Building the future of shared cinema</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            WatchTogether was founded by engineers and filmmakers who craved authentic shared viewing experiences. We combine a
            robust Next.js frontend with a Django-powered platform to make hosting cinematic events effortless.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="cinema-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Why we exist</CardTitle>
              <CardDescription>
                We believe stories are best experienced together. Our platform removes technical barriers so communities can focus
                on the films and the conversations that follow.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="cinema-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">How we build</CardTitle>
              <CardDescription>
                Every feature aligns with the documentation in our docs directory—covering API integrations, personas, and
                technology alignment—to deliver a cohesive product.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="rounded-3xl border border-border/40 bg-card/50 p-8">
          <h2 className="text-3xl font-serif font-semibold text-foreground">Milestones</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {milestones.map((milestone) => (
              <div key={milestone.year} className="rounded-2xl border border-border/30 bg-background/60 p-6">
                <p className="text-sm font-medium uppercase tracking-wide text-primary/70">{milestone.year}</p>
                <h3 className="mt-2 text-xl font-semibold text-foreground">{milestone.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="cinema-card">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">What&apos;s next</CardTitle>
            <CardDescription>
              We are expanding support for large-scale film festivals, implementing watch party recording, and deepening our API so
              partners can embed WatchTogether into their ecosystems.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Interested in partnering or contributing? Reach out to our team or explore the docs to see where you can plug in.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
