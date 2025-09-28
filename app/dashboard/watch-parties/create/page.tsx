"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useApiClient } from "@/lib/api-client"

export default function CreateWatchPartyPage() {
  const router = useRouter()
  const { client, isUsingMockData } = useApiClient()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [scheduledFor, setScheduledFor] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSaving(true)

    const response = await client.post("/parties/", {
      title,
      description,
      scheduled_for: scheduledFor,
    })

    if (response.data) {
      router.push(`/dashboard/watch-parties/${response.data.id || "new"}`)
    }

    setIsSaving(false)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Create Watch Party</h1>
        <p className="text-muted-foreground">
          Set the stage for your next event. Configure playback, invitations, and moderation in a few steps.
        </p>
      </div>

      <Card className="cinema-card">
        <CardHeader>
          <CardTitle>Party details</CardTitle>
          <CardDescription>
            {isUsingMockData
              ? "Demo mode enabled. Submit the form to preview the workflow without live API calls."
              : "Provide required details to schedule your party. Invitations can be sent once the party is created."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Friday Night Premiere"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the vibe, schedule, or any pre-show activities"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scheduled-for">Start time</Label>
              <Input
                id="scheduled-for"
                type="datetime-local"
                value={scheduledFor}
                onChange={(event) => setScheduledFor(event.target.value)}
                required
              />
            </div>
            <Button type="submit" className="cinema-glow" disabled={isSaving}>
              {isSaving ? "Creating..." : "Create party"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
