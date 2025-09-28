import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MessagesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">
          Conversation threads sync via WebSockets as documented in the user scenarios guide. This placeholder reserves space for
          the messaging list and thread view components.
        </p>
      </div>

      <Card className="cinema-card">
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
          <CardDescription>
            Messaging threads will appear here with participant presence, typing indicators, and infinite scroll powered by
            <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">/api/messaging/conversations/</code>
            and
            <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">/api/chat/{"{partyId}"}/messages/</code>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Follow the docs to implement `MessagingThread` and related components. Until then, use notifications and dashboard
            insights to keep up with party engagement.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
