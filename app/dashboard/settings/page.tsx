"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { ConfigPanel } from "@/components/admin/config-panel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useApiClient } from "@/lib/api-client"

interface ProfileSummary {
  first_name: string
  last_name: string
  username: string
  email: string
  role: string
  profile: {
    avatar: string
    bio: string
    timezone: string
  }
}

interface SettingsDigest {
  open_support_tickets: number
  pending_invitations: number
  integrations_connected: number
  notifications_enabled: number
}

export default function SettingsOverviewPage() {
  const { client } = useApiClient()
  const [profile, setProfile] = useState<ProfileSummary | null>(null)
  const [digest, setDigest] = useState<SettingsDigest | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const [profileResponse, digestResponse] = await Promise.all([
          client.get<ProfileSummary>("/users/me/"),
          client.get<SettingsDigest>("/settings/overview/"),
        ])

        if (profileResponse.data) {
          setProfile(profileResponse.data)
        }

        if (digestResponse.data) {
          setDigest(digestResponse.data)
        }
      } catch (error) {
        console.error("Failed to load settings overview", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOverview()
  }, [client])

  return (
    <div className="space-y-8">
      <Card className="cinema-card overflow-hidden">
        <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:gap-8">
          {isLoading ? (
            <Skeleton className="h-24 w-24 rounded-full" />
          ) : (
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile?.profile.avatar} alt={profile?.username} />
              <AvatarFallback>
                {profile ? profile.first_name.charAt(0) + profile.last_name.charAt(0) : "U"}
              </AvatarFallback>
            </Avatar>
          )}

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle className="text-2xl font-serif">
                {isLoading ? <Skeleton className="h-6 w-48" /> : `${profile?.first_name} ${profile?.last_name}`}
              </CardTitle>
              {profile && (
                <Badge variant="outline" className="uppercase tracking-wide">
                  {profile.role}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {isLoading ? <Skeleton className="h-4 w-72" /> : profile?.profile.bio || "Tell collaborators more about you."}
            </p>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              {isLoading ? (
                <Skeleton className="h-4 w-24" />
              ) : (
                <span>Username: @{profile?.username}</span>
              )}
              {isLoading ? <Skeleton className="h-4 w-32" /> : <span>Email: {profile?.email}</span>}
              {isLoading ? <Skeleton className="h-4 w-32" /> : <span>Timezone: {profile?.profile.timezone}</span>}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="cinema-glow">
                <Link href="/dashboard/settings/profile">Update profile</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/settings/account">Manage account</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/settings/integrations">Connect services</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="cinema-card">
          <CardHeader>
            <CardTitle>Quick health checks</CardTitle>
            <CardDescription>Track the operational state of key settings across your workspace.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {isLoading ? (
                <>
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </>
              ) : (
                <>
                  <DigestRow
                    label="Support tickets awaiting replies"
                    value={digest?.open_support_tickets ?? 0}
                    href="/dashboard/support"
                  />
                  <DigestRow
                    label="Pending watch party invitations"
                    value={digest?.pending_invitations ?? 0}
                    href="/dashboard/watch-parties"
                  />
                  <DigestRow
                    label="Connected integrations"
                    value={digest?.integrations_connected ?? 0}
                    href="/dashboard/settings/integrations"
                  />
                  <DigestRow
                    label="Notification channels enabled"
                    value={digest?.notifications_enabled ?? 0}
                    href="/dashboard/settings/preferences"
                  />
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="cinema-card">
          <CardHeader>
            <CardTitle>Recommended actions</CardTitle>
            <CardDescription>Keep your workspace production-ready with these quick improvements.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Recommendation
              title="Enable two-factor authentication"
              description="Protect your host tools with an extra layer of verification."
              href="/dashboard/settings/security"
            />
            <Recommendation
              title="Connect a streaming platform"
              description="Sync scheduled broadcasts from YouTube or Twitch to automate watch parties."
              href="/dashboard/settings/integrations"
            />
            <Recommendation
              title="Review notification preferences"
              description="Choose how you and collaborators get updates about parties and messages."
              href="/dashboard/settings/preferences"
            />
          </CardContent>
        </Card>
      </div>

      <ConfigPanel />
    </div>
  )
}

function DigestRow({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link href={href} className="group flex items-center justify-between rounded-lg border border-border/40 p-4 transition">
      <div>
        <p className="text-sm font-medium text-foreground group-hover:text-primary">{label}</p>
        <p className="text-xs text-muted-foreground">Tap to review</p>
      </div>
      <Badge variant="secondary" className="text-base font-semibold">
        {value}
      </Badge>
    </Link>
  )
}

function Recommendation({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-border/40 p-4 transition hover:border-primary/60 hover:shadow-lg"
    >
      <p className="font-medium text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  )
}
