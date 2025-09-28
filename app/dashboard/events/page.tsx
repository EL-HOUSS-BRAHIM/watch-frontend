import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Events Calendar</h1>
        <p className="text-muted-foreground">
          Coordinate festivals, premieres, and community meetups. This calendar view will integrate with the `EventCard` and
          `Calendar` components outlined in the docs.
        </p>
      </div>

      <Card className="cinema-card">
        <CardHeader>
          <CardTitle>Calendar integration pending</CardTitle>
          <CardDescription>
            Hook into `/api/events/` to populate the timeline, and use the middleware-driven API client to work in mock mode while
            backend endpoints evolve.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Add filters for hosts, genres, and access levels once the event schemas are wired up. The docs include guidance on
            pagination and search parameters.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
