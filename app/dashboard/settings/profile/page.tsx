"use client"

import { useEffect, useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { useApiClient } from "@/lib/api-client"

interface ProfileResponse {
  first_name: string
  last_name: string
  username: string
  email: string
  profile: {
    avatar: string
    bio: string
    location: string
    timezone: string
    headline: string
  }
}

export default function ProfileSettingsPage() {
  const { client } = useApiClient()
  const [profile, setProfile] = useState<ProfileResponse | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await client.get<ProfileResponse>("/users/me/")
        if (response.data) {
          setProfile(response.data)
        }
      } catch (error) {
        console.error("Unable to fetch profile", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [client])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const payload = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      username: formData.get("username") as string,
      profile: {
        headline: formData.get("headline") as string,
        bio: formData.get("bio") as string,
        location: formData.get("location") as string,
        timezone: formData.get("timezone") as string,
        avatar: profile?.profile.avatar,
      },
    }

    setIsSaving(true)
    setStatusMessage(null)

    try {
      const response = await client.patch("/users/me/", payload)
      if (response.status < 300) {
        setStatusMessage("Profile updated successfully")
        setProfile((prev) => (prev ? { ...prev, ...payload, profile: { ...prev.profile, ...payload.profile } } : prev))
      } else {
        setStatusMessage(response.error || "Unable to update profile")
      }
    } catch (error) {
      console.error("Failed to update profile", error)
      setStatusMessage("Something went wrong while saving your profile")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card className="cinema-card">
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-2xl font-serif">Profile</CardTitle>
            <CardDescription>Show collaborators who you are and how to reach you.</CardDescription>
          </div>
          {isLoading ? (
            <Skeleton className="h-16 w-16 rounded-full" />
          ) : (
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.profile.avatar} alt={profile?.username} />
              <AvatarFallback>
                {profile ? `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}` : "U"}
              </AvatarFallback>
            </Avatar>
          )}
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="First name" name="first_name" defaultValue={profile?.first_name} required disabled={isLoading} />
              <Field label="Last name" name="last_name" defaultValue={profile?.last_name} required disabled={isLoading} />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Username" name="username" defaultValue={profile?.username} helperText="This appears on invitations and public pages." disabled={isLoading} />
              <Field label="Headline" name="headline" defaultValue={profile?.profile.headline} helperText="A short statement about your studio." disabled={isLoading} />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Location" name="location" defaultValue={profile?.profile.location} disabled={isLoading} />
              <Field label="Timezone" name="timezone" defaultValue={profile?.profile.timezone} disabled={isLoading} />
            </div>
            <div>
              <Label htmlFor="bio" className="text-sm font-medium">
                Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Share your hosting style, favorite genres, or collaboration requests."
                defaultValue={profile?.profile.bio}
                disabled={isLoading}
                className="mt-1 h-32"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Your bio appears on invitations, the watch party lobby, and shared landing pages.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" className="cinema-glow" disabled={isSaving || isLoading}>
                {isSaving ? "Saving..." : "Save changes"}
              </Button>
              {statusMessage && <p className="text-sm text-muted-foreground">{statusMessage}</p>}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function Field({
  label,
  name,
  defaultValue,
  helperText,
  required,
  disabled,
}: {
  label: string
  name: string
  defaultValue?: string
  helperText?: string
  required?: boolean
  disabled?: boolean
}) {
  return (
    <div>
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        disabled={disabled}
        className="mt-1"
      />
      {helperText ? <p className="mt-2 text-xs text-muted-foreground">{helperText}</p> : null}
    </div>
  )
}
