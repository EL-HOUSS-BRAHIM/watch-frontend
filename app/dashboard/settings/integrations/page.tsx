"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

import { IntegrationCard, type IntegrationProvider } from "@/components/integrations/integration-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useApiClient } from "@/lib/api-client"

interface IntegrationAccount {
  id: string
  provider_id: string
  provider_name: string
  account_name: string
  status: "connected" | "needs_attention"
  last_synced_at: string
  scopes: string[]
}

interface IntegrationSettings {
  auto_sync: boolean
  sync_window_minutes: number
  notify_on_failure: boolean
}

export default function IntegrationsPage() {
  const { client } = useApiClient()
  const [providers, setProviders] = useState<IntegrationProvider[]>([])
  const [accounts, setAccounts] = useState<IntegrationAccount[]>([])
  const [settings, setSettings] = useState<IntegrationSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [busyProvider, setBusyProvider] = useState<string | null>(null)

  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        const [providersResponse, accountsResponse, settingsResponse] = await Promise.all([
          client.get<{ providers: IntegrationProvider[] }>("/integrations/providers/"),
          client.get<{ accounts: IntegrationAccount[] }>("/integrations/accounts/"),
          client.get<IntegrationSettings>("/integrations/settings/"),
        ])

        if (providersResponse.data?.providers) {
          setProviders(providersResponse.data.providers)
        }
        if (accountsResponse.data?.accounts) {
          setAccounts(accountsResponse.data.accounts)
        }
        if (settingsResponse.data) {
          setSettings(settingsResponse.data)
        }
      } catch (error) {
        console.error("Unable to load integration data", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchIntegrations()
  }, [client])

  const connectedProviders = useMemo(
    () => new Set(accounts.filter((account) => account.status === "connected").map((account) => account.provider_id)),
    [accounts],
  )

  const handleConnect = async (providerId: string) => {
    setBusyProvider(providerId)
    try {
      const response = await client.post("/integrations/connect/", { provider_id: providerId })
      if (response.status < 300) {
        setProviders((prev) =>
          prev.map((provider) =>
            provider.id === providerId ? { ...provider, status: "connected" as const } : provider,
          ),
        )
        setAccounts((prev) => [
          ...prev,
          {
            id: `${providerId}-account`,
            provider_id: providerId,
            provider_name: providers.find((provider) => provider.id === providerId)?.name ?? providerId,
            account_name: "Demo Studio",
            status: "connected",
            last_synced_at: new Date().toISOString(),
            scopes: ["read", "write"],
          },
        ])
      }
    } catch (error) {
      console.error("Failed to connect integration", error)
    } finally {
      setBusyProvider(null)
    }
  }

  const handleDisconnect = async (providerId: string) => {
    setBusyProvider(providerId)
    try {
      const response = await client.post("/integrations/disconnect/", { provider_id: providerId })
      if (response.status < 300) {
        setProviders((prev) =>
          prev.map((provider) =>
            provider.id === providerId ? { ...provider, status: "available" as const } : provider,
          ),
        )
        setAccounts((prev) => prev.filter((account) => account.provider_id !== providerId))
      }
    } catch (error) {
      console.error("Failed to disconnect integration", error)
    } finally {
      setBusyProvider(null)
    }
  }

  const updateSettings = (updates: Partial<IntegrationSettings>) => {
    setSettings((prev) => (prev ? { ...prev, ...updates } : prev))
  }

  const handleSettingsSave = async () => {
    if (!settings) return
    try {
      await client.patch("/integrations/settings/", settings)
    } catch (error) {
      console.error("Failed to save integration settings", error)
    }
  }

  return (
    <div className="space-y-8">
      <Card className="cinema-card">
        <CardHeader>
          <CardTitle className="text-2xl font-serif">Integrations</CardTitle>
          <CardDescription>
            Connect third-party platforms to automate video ingestion, event promotion, and community notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Connected accounts</h3>
              <Button asChild variant="outline">
                <Link href="/dashboard/settings/account">Manage billing & identity</Link>
              </Button>
            </div>
            <div className="space-y-3">
              {isLoading ? (
                <Skeleton className="h-24 w-full" />
              ) : accounts.length === 0 ? (
                <Card className="border-border/40 bg-background/60">
                  <CardContent className="flex flex-col items-start gap-2 p-6">
                    <p className="font-medium text-foreground">No integrations connected yet</p>
                    <p className="text-sm text-muted-foreground">
                      Connect a provider below to sync watch party schedules, audience updates, or monetization data.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                accounts.map((account) => (
                  <Card key={account.id} className="border-border/40 bg-background/60">
                    <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-medium text-foreground">{account.account_name}</p>
                        <p className="text-xs text-muted-foreground">{account.provider_name}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={account.status === "connected" ? "default" : "outline"}>
                          {account.status === "connected" ? "Synced" : "Attention"}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          Last synced {new Date(account.last_synced_at).toLocaleString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Sync preferences</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-border/40 bg-background/60">
                <CardContent className="space-y-2 p-4">
                  <p className="text-sm font-medium text-foreground">Automatic sync</p>
                  <p className="text-xs text-muted-foreground">
                    Keep connected providers aligned without manual refreshes.
                  </p>
                  <Button
                    variant={settings?.auto_sync ? "default" : "outline"}
                    onClick={() => updateSettings({ auto_sync: !(settings?.auto_sync ?? false) })}
                  >
                    {settings?.auto_sync ? "Enabled" : "Enable"}
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-border/40 bg-background/60">
                <CardContent className="space-y-2 p-4">
                  <p className="text-sm font-medium text-foreground">Sync interval</p>
                  <p className="text-xs text-muted-foreground">
                    Frequency for polling provider updates (minutes).
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => updateSettings({ sync_window_minutes: 30 })}>
                      30m
                    </Button>
                    <Button variant="outline" onClick={() => updateSettings({ sync_window_minutes: 60 })}>
                      1h
                    </Button>
                    <Badge variant="secondary">{settings?.sync_window_minutes ?? 60}m</Badge>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/40 bg-background/60">
                <CardContent className="space-y-2 p-4">
                  <p className="text-sm font-medium text-foreground">Failure alerts</p>
                  <p className="text-xs text-muted-foreground">
                    Notify workspace admins when integrations need attention.
                  </p>
                  <Button
                    variant={settings?.notify_on_failure ? "default" : "outline"}
                    onClick={() => updateSettings({ notify_on_failure: !(settings?.notify_on_failure ?? false) })}
                  >
                    {settings?.notify_on_failure ? "Enabled" : "Enable"}
                  </Button>
                </CardContent>
              </Card>
            </div>
            <Button onClick={handleSettingsSave} variant="outline">
              Save sync preferences
            </Button>
          </section>

          <section className="space-y-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Browse providers</h3>
              <p className="text-sm text-muted-foreground">
                Connect streaming platforms, community tools, and analytics suites to streamline your workflow.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {isLoading
                ? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-64 w-full" />)
                : providers.map((provider) => (
                    <IntegrationCard
                      key={provider.id}
                      provider={
                        connectedProviders.has(provider.id)
                          ? { ...provider, status: "connected" }
                          : provider
                      }
                      isConnecting={busyProvider === provider.id}
                      onConnect={handleConnect}
                      onDisconnect={handleDisconnect}
                    />
                  ))}
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
