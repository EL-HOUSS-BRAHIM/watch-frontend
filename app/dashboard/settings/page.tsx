"use client"

import { ConfigPanel } from "@/components/admin/config-panel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { appConfig } from "@/lib/config"

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your application configuration and preferences</p>
      </div>

      {/* System Status */}
      <Card className="cinema-card">
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current application configuration overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium">API Mode</p>
                <p className="text-xs text-muted-foreground">Data source</p>
              </div>
              <Badge variant={appConfig.api.useMockData ? "secondary" : "default"}>
                {appConfig.api.useMockData ? "Mock" : "Live"}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium">Real-time Chat</p>
                <p className="text-xs text-muted-foreground">WebSocket status</p>
              </div>
              <Badge variant={appConfig.features.realTimeChat ? "default" : "outline"}>
                {appConfig.features.realTimeChat ? "Enabled" : "Disabled"}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium">Video Processing</p>
                <p className="text-xs text-muted-foreground">Upload & transcode</p>
              </div>
              <Badge variant={appConfig.features.videoProcessing ? "default" : "outline"}>
                {appConfig.features.videoProcessing ? "Enabled" : "Disabled"}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium">Analytics</p>
                <p className="text-xs text-muted-foreground">Tracking & reports</p>
              </div>
              <Badge variant={appConfig.features.analytics ? "default" : "outline"}>
                {appConfig.features.analytics ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Panel */}
      <ConfigPanel />
    </div>
  )
}
