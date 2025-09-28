import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const featureGroups = [
  {
    id: "watch-parties",
    title: "Watch Party Control",
    description:
      "Synchronized playback, lobby staging, and moderation tools keep every screening smooth for hosts and guests.",
    bullets: [
      "Shared playback controls with host override and latency smoothing",
      "Participant lobby, readiness indicators, and invite management",
      "Realtime chat with emoji reactions, polls, and content moderation",
    ],
  },
  {
    id: "videos",
    title: "Video Library & Uploads",
    description:
      "Upload feature-length films or shorts, track processing, and surface curated libraries for each party.",
    bullets: [
      "Direct uploads with resumable transfers and pre-signed URLs",
      "Automated transcoding with status polling and WebSocket updates",
      "Metadata management, tagging, and spotlight playlists",
    ],
  },
  {
    id: "integrations",
    title: "Integrations & Infrastructure",
    description:
      "Aligned with the Django + Channels backend: JWT auth, Celery-powered jobs, Stripe billing, and push notifications.",
    bullets: [
      "Role-aware middleware toggles between mock and live API clients",
      "WebSocket provider for parties, chat, notifications, and presence",
      "Stripe checkout, Firebase push registration, and analytics batching",
    ],
  },
]

const personas = [
  {
    title: "Hosts",
    summary:
      "Plan parties, configure access, and monitor engagement from the dashboard overview. Quick actions help launch events in minutes.",
  },
  {
    title: "Participants",
    summary:
      "Join from invites, chat in real time, purchase merch, and catch up on archived events with synchronized playback history.",
  },
  {
    title: "Administrators",
    summary:
      "Moderate the community, review reports, manage billing, and track platform health through dedicated admin tooling.",
  },
]

export default function FeaturesPage() {
  return (
    <div className="bg-background px-4 py-16">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center">
          <Badge variant="outline" className="mb-4">
            Built for realtime cinema
          </Badge>
          <h1 className="text-4xl font-serif font-semibold text-foreground md:text-5xl">Feature Overview</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Every surface of WatchTogether maps to documented backend capabilities: Django REST endpoints, Channels websockets,
            Celery jobs, and Stripe billing. Develop confidently with mock data or live infrastructure.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {featureGroups.map((feature) => (
            <Card key={feature.title} id={feature.id} className="cinema-card">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-foreground">{feature.title}</CardTitle>
                <CardDescription className="text-base text-muted-foreground">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 md:grid-cols-2">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-lg border border-border/40 bg-card/40 p-4 text-sm text-muted-foreground">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-border/40 bg-card/50 p-8">
          <h2 className="text-3xl font-serif font-semibold text-foreground">Experience tailored to every persona</h2>
          <p className="mt-3 text-muted-foreground">
            The docs outline journeys for hosts, participants, creators, and admins. Our frontend mirrors those scenarios with
            dedicated navigation, route groups, and feature toggles.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {personas.map((persona) => (
              <div key={persona.title} className="rounded-2xl border border-border/30 bg-background/60 p-6">
                <h3 className="text-xl font-semibold text-foreground">{persona.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{persona.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
