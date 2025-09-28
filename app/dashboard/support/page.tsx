import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupportPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Support Center</h1>
        <p className="text-muted-foreground">
          Submit tickets, review responses, and collaborate with admins. This page will host the `SupportTicketForm` component and
          ticket threads described in the user scenarios doc.
        </p>
      </div>

      <Card className="cinema-card">
        <CardHeader>
          <CardTitle>Ticketing workflow</CardTitle>
          <CardDescription>
            Route new issues to `/api/support/tickets/` and receive updates via notifications WebSocket or polling endpoints.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            While we build the full experience, track updates through email notifications or the admin dashboard. Integrate the
            documented support APIs to unlock threaded conversations and attachment uploads.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
