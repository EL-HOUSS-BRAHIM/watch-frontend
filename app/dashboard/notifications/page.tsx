"use client"

import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useApiClient } from "@/lib/api-client"

interface NotificationItem {
  id: number
  title: string
  message: string
  read: boolean
  timestamp: string
  action_url?: string
}

export default function NotificationsPage() {
  const { client } = useApiClient()
  const [notifications, setNotifications] = useState<NotificationItem[]>([])

  useEffect(() => {
    const loadNotifications = async () => {
      const response = await client.get<{ results: NotificationItem[] }>("/notifications/")
      if (response.data?.results) {
        setNotifications(response.data.results)
      }
    }

    loadNotifications()
  }, [client])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Notifications</h1>
        <p className="text-muted-foreground">
          Real-time updates arrive via the notifications WebSocket with mock fallbacks provided through the API middleware.
        </p>
      </div>

      <Card className="cinema-card">
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
          <CardDescription>Stay informed about invitations, party status updates, and billing alerts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.length ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="rounded-xl border border-border/40 bg-card/40 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{notification.title}</h3>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                  </div>
                  <Badge variant={notification.read ? "outline" : "default"}>
                    {notification.read ? "Read" : "New"}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
                {notification.action_url ? (
                  <a href={notification.action_url} className="text-sm text-primary hover:underline">
                    View details
                  </a>
                ) : null}
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No notifications yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
