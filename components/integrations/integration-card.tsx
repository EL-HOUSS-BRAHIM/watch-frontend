import { type LucideIcon, Cloud, PlaySquare, Slack, Twitch, Youtube } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface IntegrationProvider {
  id: string
  name: string
  description: string
  category: string
  status: "connected" | "available" | "coming_soon"
  features: string[]
  icon?: string
  premium?: boolean
}

interface IntegrationCardProps {
  provider: IntegrationProvider
  isConnecting?: boolean
  onConnect?: (providerId: string) => void
  onDisconnect?: (providerId: string) => void
}

const iconMap: Record<string, LucideIcon> = {
  youtube: Youtube,
  twitch: Twitch,
  slack: Slack,
  vimeo: PlaySquare,
  dropbox: Cloud,
}

export function IntegrationCard({ provider, isConnecting, onConnect, onDisconnect }: IntegrationCardProps) {
  const Icon = provider.icon ? iconMap[provider.icon] ?? Cloud : Cloud
  const isConnected = provider.status === "connected"

  return (
    <Card className={cn("h-full border-border/40 bg-background/60", isConnected && "ring-1 ring-primary/40")}> 
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/10 p-2 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <CardTitle>{provider.name}</CardTitle>
            {provider.premium ? <Badge variant="outline">Premium</Badge> : null}
          </div>
          <CardDescription>{provider.description}</CardDescription>
        </div>
        <Badge variant={isConnected ? "default" : provider.status === "coming_soon" ? "outline" : "secondary"}>
          {provider.status === "coming_soon" ? "Coming soon" : isConnected ? "Connected" : "Available"}
        </Badge>
      </CardHeader>
      <CardContent className="flex h-full flex-col justify-between space-y-4">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {provider.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          {provider.status === "coming_soon" ? (
            <Button variant="outline" disabled>
              Join waitlist
            </Button>
          ) : isConnected ? (
            <Button variant="outline" onClick={() => onDisconnect?.(provider.id)} disabled={isConnecting}>
              {isConnecting ? "Disconnecting" : "Disconnect"}
            </Button>
          ) : (
            <Button className="cinema-glow" onClick={() => onConnect?.(provider.id)} disabled={isConnecting}>
              {isConnecting ? "Connecting" : "Connect"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
