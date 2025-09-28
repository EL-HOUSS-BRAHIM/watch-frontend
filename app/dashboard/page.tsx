"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useApiClient } from "@/lib/api-client"
import Link from "next/link"

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [recentParties, setRecentParties] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { client } = useApiClient()

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [statsResponse, partiesResponse] = await Promise.all([
          client.get("/dashboard/stats/"),
          client.get("/parties/"),
        ])

        if (statsResponse.data) {
          setStats(statsResponse.data)
        }

        if (partiesResponse.data) {
          setRecentParties(partiesResponse.data.results.slice(0, 3))
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [client])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your watch parties.</p>
        </div>
        <Link href="/dashboard/watch-parties/create">
          <Button className="cinema-glow mt-4 sm:mt-0">Create New Party</Button>
        </Link>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="cinema-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Parties</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_parties}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card className="cinema-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcoming_parties}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card className="cinema-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_participants}</div>
              <p className="text-xs text-muted-foreground">Across all parties</p>
            </CardContent>
          </Card>

          <Card className="cinema-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hours Watched</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.hours_watched}</div>
              <p className="text-xs text-muted-foreground">Total watch time</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Parties */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="cinema-card">
          <CardHeader>
            <CardTitle>Recent Parties</CardTitle>
            <CardDescription>Your latest watch party events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentParties.map((party) => (
                <div key={party.id} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                  <img
                    src={party.video.thumbnail || "/placeholder.svg"}
                    alt={party.video.title}
                    className="w-16 h-12 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{party.title}</p>
                    <p className="text-sm text-muted-foreground">{party.video.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={party.status === "scheduled" ? "default" : "secondary"} className="text-xs">
                        {party.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{party.participants_count} participants</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/dashboard/watch-parties">
                <Button variant="outline" className="w-full bg-transparent">
                  View All Parties
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="cinema-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recent_activity?.map((activity: any) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/dashboard/notifications">
                <Button variant="outline" className="w-full bg-transparent">
                  View All Activity
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="cinema-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to get you started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/watch-parties/create">
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Create Party</span>
              </Button>
            </Link>

            <Link href="/dashboard/videos/upload">
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span>Upload Video</span>
              </Button>
            </Link>

            <Link href="/dashboard/analytics">
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span>View Analytics</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
