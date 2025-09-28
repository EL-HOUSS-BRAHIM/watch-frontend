"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useApiClient } from "@/lib/api-client"

interface PartySummary {
  id: number
  title: string
  description: string
  scheduled_for: string
  status: string
  participants_count: number
  max_participants: number
  video: {
    id: number
    title: string
    thumbnail?: string
  }
}

export default function WatchPartiesPage() {
  const { client } = useApiClient()
  const [parties, setParties] = useState<PartySummary[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadParties = async () => {
      setIsLoading(true)
      const response = await client.get<{ results: PartySummary[] }>("/parties/")

      if (response.data?.results) {
        setParties(response.data.results)
      }

      setIsLoading(false)
    }

    loadParties()
  }, [client])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Watch Parties</h1>
          <p className="text-muted-foreground">
            Manage upcoming screenings, monitor participation, and review archived events.
          </p>
        </div>
        <Link href="/dashboard/watch-parties/create">
          <Button className="cinema-glow">Create Party</Button>
        </Link>
      </div>

      <Card className="cinema-card">
        <CardHeader>
          <CardTitle>Upcoming & Recent Parties</CardTitle>
          <CardDescription>
            Synchronized playback, chat, and invitations are powered by the APIs described in the integration guide.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
            </div>
          ) : parties.length > 0 ? (
            <div className="space-y-6">
              {parties.map((party) => (
                <div key={party.id} className="flex flex-col gap-4 rounded-xl border border-border/40 bg-card/40 p-4 md:flex-row">
                  <img
                    src={party.video.thumbnail || "/placeholder.svg?height=120&width=200"}
                    alt={party.video.title}
                    className="h-28 w-full rounded-lg object-cover md:w-48"
                  />
                  <div className="flex flex-1 flex-col justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground">{party.title}</h3>
                        <Badge variant={party.status === "live" ? "default" : "secondary"}>{party.status}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{party.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span>
                        {new Date(party.scheduled_for).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                      <span>
                        {party.participants_count}/{party.max_participants} participants
                      </span>
                      <span>Feature film: {party.video.title}</span>
                    </div>
                    <div className="flex gap-3">
                      <Link href={`/dashboard/watch-parties/${party.id}`} className="text-sm text-primary hover:underline">
                        Open live room
                      </Link>
                      <Link
                        href={`/dashboard/watch-parties/${party.id}/settings`}
                        className="text-sm text-primary hover:underline"
                      >
                        Edit settings
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No parties scheduled yet. Create your first watch party.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
