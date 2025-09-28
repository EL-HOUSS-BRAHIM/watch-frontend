"use client"

import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useApiClient } from "@/lib/api-client"

interface PreferenceSettings {
  timezone: string
  theme: "system" | "light" | "dark"
  language: string
  notification_channels: {
    email: boolean
    sms: boolean
    push: boolean
  }
  weekly_digest: boolean
}

const themeOptions: Array<{ value: PreferenceSettings["theme"]; label: string; description: string }> = [
  { value: "system", label: "Match system", description: "Follow the viewer's OS theme settings." },
  { value: "light", label: "Light", description: "High-contrast interface for bright environments." },
  { value: "dark", label: "Dark", description: "Cinematic theme that prioritizes contrast for screenings." },
]

export default function PreferencesSettingsPage() {
  const { client } = useApiClient()
  const [settings, setSettings] = useState<PreferenceSettings | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await client.get<PreferenceSettings>("/settings/preferences/")
        if (response.data) {
          setSettings(response.data)
        }
      } catch (error) {
        console.error("Unable to load preferences", error)
      }
    }

    fetchPreferences()
  }, [client])

  const updateSetting = (updates: Partial<PreferenceSettings>) => {
    setSettings((prev) => (prev ? { ...prev, ...updates } : prev))
    setStatus(null)
  }

  const handleSave = async () => {
    if (!settings) return

    setIsSaving(true)
    setStatus(null)

    try {
      const response = await client.patch("/settings/preferences/", settings)
      if (response.status < 300) {
        setStatus("Preferences saved")
      } else {
        setStatus(response.error || "Unable to save preferences")
      }
    } catch (error) {
      console.error("Failed to save preferences", error)
      setStatus("Something went wrong while saving")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card className="cinema-card">
        <CardHeader>
          <CardTitle className="text-2xl font-serif">Preferences</CardTitle>
          <CardDescription>Choose how the dashboard should feel and when we should reach out.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <section className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={settings?.timezone ?? ""}
                onChange={(event) => updateSetting({ timezone: event.target.value })}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Scheduling, reminders, and analytics will align to this timezone.
              </p>
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                value={settings?.language ?? ""}
                onChange={(event) => updateSetting({ language: event.target.value })}
              />
              <p className="mt-2 text-xs text-muted-foreground">Localization support for teams in multiple regions.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Theme</h3>
            <div className="grid gap-3 md:grid-cols-3">
              {themeOptions.map((option) => {
                const isActive = settings?.theme === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateSetting({ theme: option.value })}
                    className={`rounded-lg border p-4 text-left transition ${
                      isActive
                        ? "border-primary bg-primary/10 text-foreground shadow-md"
                        : "border-border/40 bg-background/60 text-muted-foreground hover:border-primary/60"
                    }`}
                  >
                    <p className="font-medium">{option.label}</p>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                    {isActive && <Badge className="mt-3">Selected</Badge>}
                  </button>
                )
              })}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Notification channels</h3>
            <div className="space-y-3">
              <PreferenceToggle
                label="Email"
                description="Send booking confirmations, reminders, and digests to your inbox."
                checked={settings?.notification_channels.email ?? false}
                onChange={(checked) => {
                  const channels = settings?.notification_channels ?? { email: false, sms: false, push: false }
                  updateSetting({ notification_channels: { ...channels, email: checked } })
                }}
              />
              <PreferenceToggle
                label="SMS"
                description="Receive text message alerts when events go live or hosts mention you."
                checked={settings?.notification_channels.sms ?? false}
                onChange={(checked) => {
                  const channels = settings?.notification_channels ?? { email: false, sms: false, push: false }
                  updateSetting({ notification_channels: { ...channels, sms: checked } })
                }}
              />
              <PreferenceToggle
                label="Push"
                description="Enable real-time push notifications in supported browsers."
                checked={settings?.notification_channels.push ?? false}
                onChange={(checked) => {
                  const channels = settings?.notification_channels ?? { email: false, sms: false, push: false }
                  updateSetting({ notification_channels: { ...channels, push: checked } })
                }}
              />
            </div>
          </section>

          <section className="flex items-center justify-between rounded-lg border border-border/40 p-4">
            <div>
              <p className="text-sm font-medium text-foreground">Weekly insights digest</p>
              <p className="text-xs text-muted-foreground">
                Receive a summary of watch party performance and trending content every Monday.
              </p>
            </div>
            <Switch
              checked={settings?.weekly_digest ?? false}
              onCheckedChange={(checked) => updateSetting({ weekly_digest: checked })}
            />
          </section>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleSave} className="cinema-glow" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save preferences"}
            </Button>
            {status && <p className="text-sm text-muted-foreground">{status}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PreferenceToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border/40 p-4">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  )
}
