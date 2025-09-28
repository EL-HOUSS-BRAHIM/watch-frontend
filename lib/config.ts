// Configuration management for API fallback and app settings
export const appConfig = {
  // API Configuration
  api: {
    useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true",
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
    wsBaseUrl: process.env.NEXT_PUBLIC_WS_BASE_URL || "ws://localhost:8000",
  },

  // Feature flags
  features: {
    realTimeChat: true,
    videoProcessing: true,
    analytics: true,
    billing: true,
  },

  // App metadata
  app: {
    name: "WatchTogether",
    version: "1.0.0",
  },
} as const

export type AppConfig = typeof appConfig
