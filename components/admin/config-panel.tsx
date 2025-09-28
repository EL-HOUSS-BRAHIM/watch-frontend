"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { appConfig } from "@/lib/config"

interface ConfigSetting {
  key: string
  label: string
  description: string
  type: "boolean" | "string" | "number"
  value: any
  category: "api" | "features" | "ui" | "performance"
}

export function ConfigPanel() {
  const [settings, setSettings] = useState<ConfigSetting[]>([
    {
      key: "useMockData",
      label: "Use Mock Data",
      description: "Enable mock API responses instead of real backend calls",
      type: "boolean",
      value: appConfig.api.useMockData,
      category: "api",
    },
    {
      key: "apiBaseUrl",
      label: "API Base URL",
      description: "Backend API endpoint URL",
      type: "string",
      value: appConfig.api.baseUrl,
      category: "api",
    },
    {
      key: "wsBaseUrl",
      label: "WebSocket Base URL",
      description: "WebSocket server endpoint URL",
      type: "string",
      value: appConfig.api.wsBaseUrl,
      category: "api",
    },
    {
      key: "realTimeChat",
      label: "Real-time Chat",
      description: "Enable live chat functionality in watch parties",
      type: "boolean",
      value: appConfig.features.realTimeChat,
      category: "features",
    },
    {
      key: "videoProcessing",
      label: "Video Processing",
      description: "Enable video upload and transcoding features",
      type: "boolean",
      value: appConfig.features.videoProcessing,
      category: "features",
    },
    {
      key: "analytics",
      label: "Analytics",
      description: "Enable analytics tracking and reporting",
      type: "boolean",
      value: appConfig.features.analytics,
      category: "features",
    },
    {
      key: "billing",
      label: "Billing System",
      description: "Enable subscription and payment features",
      type: "boolean",
      value: appConfig.features.billing,
      category: "features",
    },
  ])

  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => prev.map((setting) => (setting.key === key ? { ...setting, value } : setting)))
    setHasChanges(true)
  }

  const saveConfiguration = async () => {
    setIsSaving(true)

    // In a real app, this would save to backend or local storage
    // For demo purposes, we'll simulate the save
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update environment variables (in a real app, this would require a restart)
    console.log("[Config] Saving configuration:", settings)

    setHasChanges(false)
    setIsSaving(false)
  }

  const resetToDefaults = () => {
    setSettings((prev) =>
      prev.map((setting) => ({
        ...setting,
        value: getDefaultValue(setting.key),
      })),
    )
    setHasChanges(true)
  }

  const getDefaultValue = (key: string) => {
    const defaults: Record<string, any> = {
      useMockData: true,
      apiBaseUrl: "http://localhost:8000",
      wsBaseUrl: "ws://localhost:8000",
      realTimeChat: true,
      videoProcessing: true,
      analytics: true,
      billing: true,
    }
    return defaults[key]
  }

  const getCategorySettings = (category: string) => {
    return settings.filter((setting) => setting.category === category)
  }

  const getCategoryBadgeVariant = (category: string) => {
    const variants: Record<string, any> = {
      api: "default",
      features: "secondary",
      ui: "outline",
      performance: "destructive",
    }
    return variants[category] || "default"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold">Configuration Management</h2>
          <p className="text-muted-foreground">Manage application settings and feature toggles</p>
        </div>
        <div className="flex items-center space-x-3">
          {hasChanges && (
            <Badge variant="outline" className="text-amber-600 border-amber-600">
              Unsaved Changes
            </Badge>
          )}
          <Button variant="outline" onClick={resetToDefaults} disabled={isSaving}>
            Reset to Defaults
          </Button>
          <Button onClick={saveConfiguration} disabled={!hasChanges || isSaving} className="cinema-glow">
            {isSaving ? "Saving..." : "Save Configuration"}
          </Button>
        </div>
      </div>

      {appConfig.api.useMockData && (
        <Alert>
          <AlertDescription>
            <strong>Mock Mode Active:</strong> The application is currently using mock data instead of real API calls.
            This is useful for development and testing.
          </AlertDescription>
        </Alert>
      )}

      {/* API Configuration */}
      <Card className="cinema-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <span>API Configuration</span>
                <Badge variant={getCategoryBadgeVariant("api")}>API</Badge>
              </CardTitle>
              <CardDescription>Backend connection and data source settings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {getCategorySettings("api").map((setting) => (
            <div key={setting.key} className="flex items-center justify-between space-x-4">
              <div className="flex-1">
                <Label htmlFor={setting.key} className="text-sm font-medium">
                  {setting.label}
                </Label>
                <p className="text-sm text-muted-foreground">{setting.description}</p>
              </div>
              <div className="flex-shrink-0">
                {setting.type === "boolean" ? (
                  <Switch
                    id={setting.key}
                    checked={setting.value}
                    onCheckedChange={(checked) => updateSetting(setting.key, checked)}
                  />
                ) : (
                  <Input
                    id={setting.key}
                    type={setting.type === "number" ? "number" : "text"}
                    value={setting.value}
                    onChange={(e) =>
                      updateSetting(setting.key, setting.type === "number" ? Number(e.target.value) : e.target.value)
                    }
                    className="w-64"
                  />
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card className="cinema-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <span>Feature Toggles</span>
                <Badge variant={getCategoryBadgeVariant("features")}>Features</Badge>
              </CardTitle>
              <CardDescription>Enable or disable application features</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {getCategorySettings("features").map((setting) => (
            <div key={setting.key} className="flex items-center justify-between space-x-4">
              <div className="flex-1">
                <Label htmlFor={setting.key} className="text-sm font-medium">
                  {setting.label}
                </Label>
                <p className="text-sm text-muted-foreground">{setting.description}</p>
              </div>
              <div className="flex-shrink-0">
                <Switch
                  id={setting.key}
                  checked={setting.value}
                  onCheckedChange={(checked) => updateSetting(setting.key, checked)}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Configuration Export/Import */}
      <Card className="cinema-card">
        <CardHeader>
          <CardTitle>Configuration Management</CardTitle>
          <CardDescription>Export or import configuration settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => {
                const config = settings.reduce(
                  (acc, setting) => {
                    acc[setting.key] = setting.value
                    return acc
                  },
                  {} as Record<string, any>,
                )

                const blob = new Blob([JSON.stringify(config, null, 2)], {
                  type: "application/json",
                })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = "watchtogether-config.json"
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="bg-transparent"
            >
              Export Configuration
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                const input = document.createElement("input")
                input.type = "file"
                input.accept = ".json"
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                      try {
                        const config = JSON.parse(e.target?.result as string)
                        setSettings((prev) =>
                          prev.map((setting) => ({
                            ...setting,
                            value: config[setting.key] ?? setting.value,
                          })),
                        )
                        setHasChanges(true)
                      } catch (error) {
                        console.error("Failed to import configuration:", error)
                      }
                    }
                    reader.readAsText(file)
                  }
                }
                input.click()
              }}
              className="bg-transparent"
            >
              Import Configuration
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              <strong>Note:</strong> Some configuration changes may require an application restart to take effect.
              Environment variables are loaded at build time.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
