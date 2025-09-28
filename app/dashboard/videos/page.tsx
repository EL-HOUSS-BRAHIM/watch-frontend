"use client"

import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useApiClient } from "@/lib/api-client"

interface VideoAsset {
  id: number
  title: string
  description: string
  duration: number
  thumbnail?: string
  upload_date: string
  processing_state: string
  metadata?: {
    resolution?: string
    codec?: string
  }
}

export default function VideoLibraryPage() {
  const { client } = useApiClient()
  const [videos, setVideos] = useState<VideoAsset[]>([])

  useEffect(() => {
    const loadVideos = async () => {
      const response = await client.get<{ results: VideoAsset[] }>("/videos/")
      if (response.data?.results) {
        setVideos(response.data.results)
      }
    }

    loadVideos()
  }, [client])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Video Library</h1>
        <p className="text-muted-foreground">
          Upload content, monitor processing, and keep your catalog ready for the next premiere.
        </p>
      </div>

      <Card className="cinema-card">
        <CardHeader>
          <CardTitle>Ready to stream</CardTitle>
          <CardDescription>Videos are transcoded via Celery jobs and surfaced here once processing completes.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          {videos.map((video) => (
            <div key={video.id} className="flex gap-4 rounded-xl border border-border/40 bg-card/40 p-4">
              <img
                src={video.thumbnail || "/placeholder.svg?height=160&width=280"}
                alt={video.title}
                className="h-28 w-40 rounded-lg object-cover"
              />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{video.title}</h3>
                  <Badge variant={video.processing_state === "ready" ? "default" : "secondary"}>
                    {video.processing_state}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{video.description}</p>
                <div className="text-xs text-muted-foreground">
                  <p>Uploaded {new Date(video.upload_date).toLocaleDateString()}</p>
                  <p>{Math.round(video.duration / 60)} minutes · {video.metadata?.resolution}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
