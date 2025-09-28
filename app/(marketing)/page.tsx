import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const featureHighlights = [
  {
    title: "Synchronized Playback",
    description: "Host perfectly timed screenings with automatic buffering and playback controls that stay in lock-step for every guest.",
  },
  {
    title: "Realtime Chat & Reactions",
    description: "Run lively conversations with emoji bursts, polls, and moderation controls wired to our WebSocket infrastructure.",
  },
  {
    title: "Video Library",
    description: "Upload, organize, and transcode your catalog automatically so parties always start on time with cinematic quality.",
  },
]

const workflow = [
  {
    step: "1",
    title: "Plan the Event",
    description:
      "Pick a film, configure privacy, and invite your community. Templates and timezone smarts keep hosts on track.",
  },
  {
    step: "2",
    title: "Go Live Together",
    description:
      "Our party player syncs streams, while chat, polls, and reactions keep everyone engaged from lobby to credits.",
  },
  {
    step: "3",
    title: "Measure the Impact",
    description:
      "Analytics recap attendance, engagement, and monetization so you can iterate on every premiere.",
  },
]

export default function LandingPage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden px-4 py-20">
        <div className="container mx-auto max-w-5xl text-center">
          <Badge variant="secondary" className="mb-6">
            🎬 Now screening in Beta
          </Badge>
          <h1 className="text-balance text-4xl font-serif font-bold text-foreground sm:text-6xl">
            Host cinematic watch parties that feel like everyone is on the same couch
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            WatchTogether keeps playback in sync, powers realtime conversation, and gives hosts the tools to run unforgettable
            events from anywhere.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/auth/register">
              <Button size="lg" className="cinema-glow text-base">
                Start Your First Party
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="outline" size="lg" className="text-base">
                Explore the Platform
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-semibold text-foreground md:text-4xl">
              Everything you need for unforgettable premieres
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Built with realtime infrastructure, resilient fallbacks, and a mockable API layer so teams can ship quickly without
              waiting on live services.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featureHighlights.map((feature) => (
              <Card key={feature.title} className="cinema-card">
                <CardHeader>
                  <CardTitle className="font-serif text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="container mx-auto grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-semibold text-foreground md:text-4xl">
              Designed for hosts, participants, and admins alike
            </h2>
            <p className="text-lg text-muted-foreground">
              Role-based dashboards, comprehensive analytics, and admin tooling keep experiences polished whether you are running
              public festivals or private family screenings.
            </p>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  1
                </span>
                <div>
                  <p className="font-medium text-foreground">Mock-friendly middleware</p>
                  <p className="text-sm">
                    Toggle between live endpoints and bundled mock responses, ensuring developers can iterate without waiting on
                    backend availability.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  2
                </span>
                <div>
                  <p className="font-medium text-foreground">Realtime ready by default</p>
                  <p className="text-sm">
                    WebSocket providers, presence indicators, and reconnection strategies mirror the Django Channels back end
                    detailed in our platform docs.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  3
                </span>
                <div>
                  <p className="font-medium text-foreground">Analytics you can act on</p>
                  <p className="text-sm">
                    Capture watch time, engagement, and monetization with clear KPIs that line up with the scenarios in our user
                    and admin guides.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="cinema-card rounded-2xl bg-card/60 p-8 shadow-lg">
            <img
              src="/placeholder.svg?height=420&width=720&text=Watch+Party+Control+Center"
              alt="Host control center mockup"
              className="w-full rounded-xl border border-border/40"
            />
          </div>
        </div>
      </section>

      <section className="bg-muted/20 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-serif font-semibold text-foreground md:text-4xl">
            A host-friendly workflow from invite to analytics
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {workflow.map((item) => (
              <div key={item.step} className="rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm">
                <span className="text-4xl font-serif text-primary/80">{item.step}</span>
                <h3 className="mt-4 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
