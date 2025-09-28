import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
  {
    name: "Starter",
    price: "$0",
    cadence: "per month",
    badge: "Best for trial nights",
    features: [
      "Up to 25 participants per watch party",
      "Mock API mode enabled by default",
      "Access to public events and chat",
      "Email support with 48h response",
    ],
  },
  {
    name: "Creator",
    price: "$39",
    cadence: "per month",
    badge: "Most popular",
    features: [
      "Unlimited hosted parties and archives",
      "Video uploads with Celery-powered processing",
      "Advanced analytics & engagement reports",
      "Stripe-powered ticketing and merch",
    ],
    highlight: true,
  },
  {
    name: "Studio",
    price: "Custom",
    cadence: "enterprise",
    badge: "Scaled operations",
    features: [
      "Dedicated admin workspace & SSO",
      "Realtime moderation queue and escalation",
      "SLA-backed support with dedicated CSM",
      "Custom integrations & white-labeling",
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="bg-background px-4 py-16">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Flexible billing through Stripe
          </Badge>
          <h1 className="text-4xl font-serif font-semibold text-foreground md:text-5xl">Pricing that scales with every premiere</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Start free with mock data, graduate to creator-ready tooling, and unlock enterprise controls for studio-grade
            operations.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`cinema-card flex h-full flex-col ${plan.highlight ? "border-primary shadow-lg" : ""}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-serif">{plan.name}</CardTitle>
                  <Badge variant={plan.highlight ? "default" : "outline"}>{plan.badge}</Badge>
                </div>
                <CardDescription className="text-sm text-muted-foreground">
                  <span className="text-3xl font-semibold text-foreground">{plan.price}</span>
                  <span className="ml-2 text-muted-foreground">{plan.cadence}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className={`w-full ${plan.highlight ? "cinema-glow" : ""}`} variant={plan.highlight ? "default" : "outline"}>
                  {plan.highlight ? "Start 14-day trial" : "Contact sales"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
