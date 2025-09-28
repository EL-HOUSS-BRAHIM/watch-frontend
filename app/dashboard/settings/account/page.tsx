"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { useApiClient } from "@/lib/api-client"

interface AccountSettings {
  email: string
  plan: {
    name: string
    renewal_date: string
    seat_limit: number
    seats_used: number
    features: string[]
  }
  billing_portal_url: string
  connected_identities: Array<{
    provider: string
    email: string
    status: "verified" | "pending"
  }>
}

export default function AccountSettingsPage() {
  const { client } = useApiClient()
  const [account, setAccount] = useState<AccountSettings | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await client.get<AccountSettings>("/settings/account/")
        if (response.data) {
          setAccount(response.data)
        }
      } catch (error) {
        console.error("Unable to fetch account settings", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAccount()
  }, [client])

  const handleEmailUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    setIsSaving(true)
    setStatusMessage(null)

    try {
      const response = await client.patch("/settings/account/", {
        email: formData.get("email"),
      })

      if (response.status < 300) {
        setStatusMessage("Primary email updated")
        setAccount((prev) => (prev ? { ...prev, email: formData.get("email") as string } : prev))
      } else {
        setStatusMessage(response.error || "Unable to save email")
      }
    } catch (error) {
      console.error("Failed to update email", error)
      setStatusMessage("Something went wrong while saving")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card className="cinema-card">
        <CardHeader>
          <CardTitle className="text-2xl font-serif">Account</CardTitle>
          <CardDescription>Manage your login details and workspace subscription.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Primary email</h3>
            <form className="mt-3 space-y-4" onSubmit={handleEmailUpdate}>
              <div>
                <Label htmlFor="email">Email address</Label>
                {isLoading ? (
                  <Skeleton className="mt-2 h-10 w-full" />
                ) : (
                  <Input id="email" name="email" type="email" defaultValue={account?.email} required disabled={isSaving} />
                )}
                <p className="mt-2 text-xs text-muted-foreground">We'll use this for billing, receipts, and account recovery.</p>
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit" className="cinema-glow" disabled={isSaving || isLoading}>
                  {isSaving ? "Saving..." : "Save email"}
                </Button>
                {statusMessage && <p className="text-sm text-muted-foreground">{statusMessage}</p>}
              </div>
            </form>
          </section>

          <section className="space-y-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Subscription</h3>
                <p className="text-lg font-medium text-foreground">{account?.plan?.name ?? ""}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">
                  {account && account.plan
                    ? `${account.plan.seats_used}/${account.plan.seat_limit} seats`
                    : ""}
                </Badge>
                <Button asChild variant="outline">
                  <Link href={account?.billing_portal_url ?? "#"}>Manage billing</Link>
                </Button>
              </div>
            </div>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <p>
                Renews on {account?.plan ? new Date(account.plan.renewal_date).toLocaleDateString() : ""}
              </p>
              <ul className="grid gap-2 md:grid-cols-2">
                {account?.plan?.features?.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Connected identities</h3>
              <p className="text-sm text-muted-foreground">
                Link social and single sign-on providers to make it easier for collaborators to join your workspace.
              </p>
            </div>
            <div className="space-y-3">
              {account?.connected_identities?.map((identity) => (
                <Card key={identity.provider} className="border-border/40 bg-background/60">
                  <CardContent className="flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-medium text-foreground">{identity.provider}</p>
                      <p className="text-xs text-muted-foreground">{identity.email}</p>
                    </div>
                    <Badge variant={identity.status === "verified" ? "default" : "outline"}>
                      {identity.status === "verified" ? "Verified" : "Pending"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
              <Button asChild variant="outline">
                <Link href="/dashboard/settings/integrations">Add identity provider</Link>
              </Button>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
