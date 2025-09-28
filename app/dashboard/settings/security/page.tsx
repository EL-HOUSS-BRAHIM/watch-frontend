"use client"

import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useApiClient } from "@/lib/api-client"

interface SecuritySettings {
  two_factor_enabled: boolean
  backup_codes_remaining: number
  session_timeout_minutes: number
  allow_new_devices: boolean
  alert_on_unusual_activity: boolean
}

export default function SecuritySettingsPage() {
  const { client } = useApiClient()
  const [settings, setSettings] = useState<SecuritySettings | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const fetchSecurity = async () => {
      try {
        const response = await client.get<SecuritySettings>("/settings/security/")
        if (response.data) {
          setSettings(response.data)
        }
      } catch (error) {
        console.error("Unable to load security settings", error)
      }
    }

    fetchSecurity()
  }, [client])

  const toggleSetting = (key: keyof SecuritySettings, value: boolean | number) => {
    setSettings((prev) => (prev ? { ...prev, [key]: value } : prev))
    setStatus(null)
  }

  const handleSave = async () => {
    if (!settings) return

    setIsSaving(true)
    setStatus(null)

    try {
      const response = await client.patch("/settings/security/", settings)
      if (response.status < 300) {
        setStatus("Security preferences saved")
      } else {
        setStatus(response.error || "Unable to save settings")
      }
    } catch (error) {
      console.error("Failed to save security settings", error)
      setStatus("Something went wrong while saving")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card className="cinema-card">
        <CardHeader>
          <CardTitle className="text-2xl font-serif">Security</CardTitle>
          <CardDescription>Protect your studio access with multi-factor authentication and alerts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <section className="space-y-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Two-factor authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Require an authenticator app or SMS code when logging in to your dashboard.
                </p>
              </div>
              <Switch
                checked={settings?.two_factor_enabled ?? false}
                onCheckedChange={(checked) => toggleSetting("two_factor_enabled", checked)}
              />
            </div>
            {settings?.two_factor_enabled ? (
              <Badge variant="secondary">{settings.backup_codes_remaining} backup codes remaining</Badge>
            ) : (
              <Button variant="outline">Generate backup codes</Button>
            )}
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Session controls</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="session_timeout">Session timeout (minutes)</Label>
                <Input
                  id="session_timeout"
                  type="number"
                  min={10}
                  max={240}
                  value={settings?.session_timeout_minutes ?? 30}
                  onChange={(event) => toggleSetting("session_timeout_minutes", Number(event.target.value))}
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  Automatically sign out inactive collaborators after this duration.
                </p>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/40 p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Allow logins from new devices</p>
                  <p className="text-xs text-muted-foreground">
                    Require approval before hosts sign in from a device we haven't seen before.
                  </p>
                </div>
                <Switch
                  checked={settings?.allow_new_devices ?? false}
                  onCheckedChange={(checked) => toggleSetting("allow_new_devices", checked)}
                />
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-border/40 p-4">
              <div>
                <p className="text-sm font-medium text-foreground">Alert on unusual activity</p>
                <p className="text-xs text-muted-foreground">
                  Send an email and dashboard notification when we detect suspicious sign-in attempts.
                </p>
              </div>
              <Switch
                checked={settings?.alert_on_unusual_activity ?? false}
                onCheckedChange={(checked) => toggleSetting("alert_on_unusual_activity", checked)}
              />
            </div>
          </section>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleSave} className="cinema-glow" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save security settings"}
            </Button>
            {status && <p className="text-sm text-muted-foreground">{status}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
