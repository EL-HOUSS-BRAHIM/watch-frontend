// Comprehensive mock data structure matching backend API responses
export const mockApiResponses = {
  // Authentication endpoints
  "POST /auth/login/": {
    access: "mock-jwt-access-token",
    refresh: "mock-jwt-refresh-token",
    user: {
      id: 1,
      username: "demo_user",
      email: "demo@example.com",
      first_name: "Demo",
      last_name: "User",
      role: "host",
      profile: {
        avatar: "/diverse-user-avatars.png",
        bio: "Movie enthusiast and watch party host",
        timezone: "America/New_York",
      },
    },
  },

  "POST /auth/register/": {
    message: "Registration successful. Please check your email to verify your account.",
    user: {
      id: 2,
      username: "new_user",
      email: "new@example.com",
      is_active: false,
    },
  },

  "GET /users/me/": {
    id: 1,
    first_name: "Demo",
    last_name: "User",
    username: "demo_user",
    email: "demo@example.com",
    role: "host",
    profile: {
      avatar: "/friendly-podcast-host.png",
      bio: "Hosting immersive film screenings for the community.",
      location: "Brooklyn, NY",
      timezone: "America/New_York",
      headline: "Cinematic curator & watch party producer",
    },
  },

  "PATCH /users/me/": {
    success: true,
  },

  "GET /settings/overview/": {
    open_support_tickets: 2,
    pending_invitations: 5,
    integrations_connected: 3,
    notifications_enabled: 4,
  },

  "GET /settings/account/": {
    email: "demo@example.com",
    plan: {
      name: "Studio Plus",
      renewal_date: "2024-02-01T00:00:00Z",
      seat_limit: 10,
      seats_used: 4,
      features: [
        "Unlimited watch parties",
        "Custom branding",
        "Priority support",
        "Advanced analytics",
      ],
    },
    billing_portal_url: "https://billing.example.com/portal",
    connected_identities: [
      { provider: "Google", email: "demo@example.com", status: "verified" },
      { provider: "Slack", email: "studio@slack.com", status: "pending" },
    ],
  },

  "PATCH /settings/account/": {
    success: true,
  },

  "GET /settings/security/": {
    two_factor_enabled: true,
    backup_codes_remaining: 6,
    session_timeout_minutes: 45,
    allow_new_devices: false,
    alert_on_unusual_activity: true,
  },

  "PATCH /settings/security/": {
    success: true,
  },

  "GET /settings/preferences/": {
    timezone: "America/New_York",
    theme: "dark",
    language: "English (US)",
    notification_channels: {
      email: true,
      sms: false,
      push: true,
    },
    weekly_digest: true,
  },

  "PATCH /settings/preferences/": {
    success: true,
  },

  "GET /integrations/providers/": {
    providers: [
      {
        id: "youtube",
        name: "YouTube",
        description: "Import premieres, member-only videos, and channel analytics.",
        category: "Streaming",
        status: "connected",
        features: [
          "Sync scheduled livestreams",
          "Auto-create watch parties",
          "Track subscriber growth",
        ],
        icon: "youtube",
      },
      {
        id: "twitch",
        name: "Twitch",
        description: "Connect creator events and chat engagement for co-streams.",
        category: "Streaming",
        status: "available",
        features: [
          "Pull channel schedule",
          "Enable chat overlays",
          "Reward loyal viewers",
        ],
        icon: "twitch",
      },
      {
        id: "slack",
        name: "Slack",
        description: "Share go-live alerts with your production team instantly.",
        category: "Collaboration",
        status: "available",
        features: [
          "Post watch party reminders",
          "Escalate support tickets",
          "Sync channel guests",
        ],
        icon: "slack",
      },
      {
        id: "vimeo",
        name: "Vimeo OTT",
        description: "Distribute premium screenings with DRM-protected assets.",
        category: "Streaming",
        status: "coming_soon",
        features: [
          "Sync OTT catalog",
          "Gate by subscription tier",
          "Surface rental performance",
        ],
        icon: "vimeo",
        premium: true,
      },
    ],
  },

  "GET /integrations/accounts/": {
    accounts: [
      {
        id: "youtube-main",
        provider_id: "youtube",
        provider_name: "YouTube",
        account_name: "WatchTogether Studio",
        status: "connected",
        last_synced_at: "2024-01-15T18:30:00Z",
        scopes: ["videos.read", "analytics.read"],
      },
      {
        id: "slack-production",
        provider_id: "slack",
        provider_name: "Slack",
        account_name: "Production HQ",
        status: "connected",
        last_synced_at: "2024-01-15T18:45:00Z",
        scopes: ["channels:write", "chat:write"],
      },
    ],
  },

  "GET /integrations/settings/": {
    auto_sync: true,
    sync_window_minutes: 60,
    notify_on_failure: true,
  },

  "PATCH /integrations/settings/": {
    success: true,
  },

  "POST /integrations/connect/": {
    status: "connected",
  },

  "POST /integrations/disconnect/": {
    status: "disconnected",
  },

  // Dashboard stats
  "GET /dashboard/stats/": {
    total_parties: 12,
    upcoming_parties: 3,
    total_participants: 45,
    hours_watched: 127,
    recent_activity: [
      {
        id: 1,
        type: "party_created",
        message: 'Created "Movie Night: Inception"',
        timestamp: "2024-01-15T20:00:00Z",
      },
      {
        id: 2,
        type: "participant_joined",
        message: "Sarah joined your party",
        timestamp: "2024-01-15T19:45:00Z",
      },
    ],
  },

  // Watch parties
  "GET /parties/": {
    count: 15,
    next: null,
    previous: null,
    results: [
      {
        id: 1,
        title: "Movie Night: Inception",
        description: "Mind-bending sci-fi thriller watch party",
        scheduled_for: "2024-01-20T20:00:00Z",
        status: "scheduled",
        host: {
          id: 1,
          username: "demo_user",
          avatar: "/friendly-podcast-host.png",
        },
        participants_count: 8,
        max_participants: 20,
        video: {
          id: 1,
          title: "Inception",
          duration: 8880, // seconds
          thumbnail: "/inception-movie-poster.png",
          processing_state: "ready",
        },
        settings: {
          allow_chat: true,
          allow_reactions: true,
          moderation_enabled: true,
          public: false,
        },
      },
      {
        id: 2,
        title: "Classic Horror Marathon",
        description: "Spooky movies all night long",
        scheduled_for: "2024-01-25T21:00:00Z",
        status: "scheduled",
        host: {
          id: 1,
          username: "demo_user",
          avatar: "/friendly-podcast-host.png",
        },
        participants_count: 12,
        max_participants: 15,
        video: {
          id: 2,
          title: "The Shining",
          duration: 8640,
          thumbnail: "/the-shining-movie-poster.jpg",
          processing_state: "ready",
        },
        settings: {
          allow_chat: true,
          allow_reactions: true,
          moderation_enabled: false,
          public: true,
        },
      },
    ],
  },

  "POST /parties/": {
    id: 3,
    title: "New Watch Party",
    status: "scheduled",
    created_at: "2024-01-15T22:00:00Z",
  },

  // Videos
  "GET /videos/": {
    count: 8,
    next: null,
    previous: null,
    results: [
      {
        id: 1,
        title: "Inception",
        description: "A thief who steals corporate secrets through dream-sharing technology",
        duration: 8880,
        file_size: 2147483648, // 2GB
        thumbnail: "/inception-movie-poster.png",
        processing_state: "ready",
        upload_date: "2024-01-10T15:30:00Z",
        metadata: {
          resolution: "1920x1080",
          codec: "H.264",
          bitrate: "5000 kbps",
        },
      },
      {
        id: 2,
        title: "The Shining",
        description: "A family heads to an isolated hotel for the winter",
        duration: 8640,
        file_size: 1932735283,
        thumbnail: "/the-shining-movie-poster.jpg",
        processing_state: "ready",
        upload_date: "2024-01-08T12:15:00Z",
        metadata: {
          resolution: "1920x1080",
          codec: "H.264",
          bitrate: "4500 kbps",
        },
      },
    ],
  },

  // Chat messages
  "GET /chat/1/messages/": {
    count: 25,
    next: null,
    previous: null,
    results: [
      {
        id: 1,
        user: {
          id: 2,
          username: "sarah_m",
          avatar: "/sarah-avatar.png",
        },
        message: "This movie is incredible! 🍿",
        timestamp: "2024-01-15T20:15:00Z",
        reactions: [
          { emoji: "👍", count: 3, users: [1, 3, 4] },
          { emoji: "🔥", count: 1, users: [1] },
        ],
      },
      {
        id: 2,
        user: {
          id: 3,
          username: "mike_j",
          avatar: "/mike-avatar.jpg",
        },
        message: "The cinematography is amazing",
        timestamp: "2024-01-15T20:17:00Z",
        reactions: [],
      },
    ],
  },

  // Analytics
  "GET /analytics/overview/": {
    total_watch_time: 15420, // minutes
    total_parties: 12,
    total_participants: 45,
    engagement_rate: 0.87,
    popular_genres: [
      { genre: "Sci-Fi", count: 5 },
      { genre: "Horror", count: 3 },
      { genre: "Comedy", count: 2 },
      { genre: "Drama", count: 2 },
    ],
    weekly_stats: [
      { week: "2024-W01", parties: 2, participants: 15 },
      { week: "2024-W02", parties: 3, participants: 18 },
      { week: "2024-W03", parties: 1, participants: 8 },
    ],
  },

  // Notifications
  "GET /notifications/": {
    count: 5,
    unread_count: 2,
    results: [
      {
        id: 1,
        type: "party_invitation",
        title: "Party Invitation",
        message: 'You\'ve been invited to "Movie Night: Inception"',
        read: false,
        timestamp: "2024-01-15T18:30:00Z",
        action_url: "/dashboard/watch-parties/1",
      },
      {
        id: 2,
        type: "party_starting",
        title: "Party Starting Soon",
        message: "Your party starts in 15 minutes",
        read: false,
        timestamp: "2024-01-15T19:45:00Z",
        action_url: "/dashboard/watch-parties/2",
      },
    ],
  },

  // Admin endpoints
  "GET /admin/overview/": {
    total_users: 1250,
    active_users: 890,
    total_parties: 156,
    total_watch_time: 45600, // minutes
    revenue: 12500.0,
    pending_reports: 3,
    system_health: {
      api_status: "healthy",
      database_status: "healthy",
      websocket_status: "healthy",
      storage_usage: 0.67, // 67%
    },
  },

  "GET /admin/users/": {
    count: 1250,
    results: [
      {
        id: 1,
        username: "demo_user",
        email: "demo@example.com",
        role: "host",
        is_active: true,
        date_joined: "2024-01-01T00:00:00Z",
        last_login: "2024-01-15T20:00:00Z",
        parties_hosted: 12,
        subscription_status: "premium",
      },
    ],
  },

  // Error responses for testing
  "GET /nonexistent/": {
    detail: "Not found",
  },
} as const

export type MockApiResponses = typeof mockApiResponses
