"use client"

import { useEffect, useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useApiClient } from "@/lib/api-client"

interface AnalyticsOverview {
  total_watch_time: number
  total_parties: number
  total_participants: number
  engagement_rate: number
  popular_genres: Array<{ genre: string; count: number }>
  weekly_stats: Array<{ week: string; parties: number; participants: number }>
}

export default function AnalyticsPage() {
  const { client } = useApiClient()
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null)

  useEffect(() => {
    const loadAnalytics = async () => {
      const response = await client.get<AnalyticsOverview>("/analytics/overview/")
      if (response.data) {
        setOverview(response.data)
      }
    }

    loadAnalytics()
  }, [client])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          Track engagement, watch time, and monetization. These metrics map to the Django analytics endpoints documented in the
          integration guide.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card className="cinema-card">
          <CardHeader>
            <CardTitle>Total watch time</CardTitle>
            <CardDescription>Minutes across all hosted events</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-foreground">{overview?.total_watch_time ?? "--"}</p>
          </CardContent>
        </Card>
        <Card className="cinema-card">
          <CardHeader>
            <CardTitle>Hosted parties</CardTitle>
            <CardDescription>All time events</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-foreground">{overview?.total_parties ?? "--"}</p>
          </CardContent>
        </Card>
        <Card className="cinema-card">
          <CardHeader>
            <CardTitle>Total participants</CardTitle>
            <CardDescription>Unique attendees across events</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-foreground">{overview?.total_participants ?? "--"}</p>
          </CardContent>
        </Card>
        <Card className="cinema-card">
          <CardHeader>
            <CardTitle>Engagement rate</CardTitle>
            <CardDescription>Chat, reactions, and participation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-foreground">
              {overview ? `${Math.round(overview.engagement_rate * 100)}%` : "--"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="cinema-card">
        <CardHeader>
          <CardTitle>Weekly performance</CardTitle>
          <CardDescription>Snapshots of hosted parties and attendance pulled from analytics endpoints.</CardDescription>
        </CardHeader>
        <CardContent>
          {overview?.weekly_stats?.length ? (
            <div className="grid gap-4 md:grid-cols-3">
              {overview.weekly_stats.map((week) => (
                <div key={week.week} className="rounded-xl border border-border/30 bg-card/30 p-4">
                  <p className="text-sm font-medium text-muted-foreground">{week.week}</p>
                  <p className="mt-2 text-xl font-semibold text-foreground">{week.parties} parties</p>
                  <p className="text-sm text-muted-foreground">{week.participants} participants</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No analytics yet. Host an event to see insights.</p>
          )}
        </CardContent>
      </Card>

      <Card className="cinema-card">
        <CardHeader>
          <CardTitle>Popular genres</CardTitle>
          <CardDescription>Audience preferences aggregated from recent parties.</CardDescription>
        </CardHeader>
        <CardContent>
          {overview?.popular_genres?.length ? (
            <div className="space-y-3">
              {overview.popular_genres.map((genre) => (
                <div key={genre.genre} className="flex items-center justify-between rounded-lg border border-border/30 bg-card/30 px-4 py-3">
                  <span className="font-medium text-foreground">{genre.genre}</span>
                  <span className="text-sm text-muted-foreground">{genre.count} parties</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No genre data available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
