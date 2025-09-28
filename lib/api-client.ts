import { appConfig } from "./config"
import { mockApiResponses } from "./mock-data"

// Types for API responses
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  status: number
}

export interface PaginatedResponse<T> {
  results: T[]
  count: number
  next: string | null
  previous: string | null
}

// API Client with fallback middleware
class ApiClient {
  private baseUrl: string
  private useMockData: boolean

  constructor() {
    this.baseUrl = appConfig.api.baseUrl
    this.useMockData = appConfig.api.useMockData
  }

  private async withAuthHeaders(headers: HeadersInit = {}): Promise<HeadersInit> {
    // Get JWT token from cookies or session storage
    const token = this.getAuthToken()

    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    }
  }

  private getAuthToken(): string | null {
    // In a real app, this would get the token from secure storage
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token")
    }
    return null
  }

  private getMockResponse<T>(endpoint: string, method = "GET"): ApiResponse<T> {
    const mockKey = `${method.toUpperCase()} ${endpoint}`
    const mockData = mockApiResponses[mockKey as keyof typeof mockApiResponses]

    if (mockData) {
      return {
        data: mockData as T,
        status: 200,
      }
    }

    return {
      error: `Mock data not found for ${mockKey}`,
      status: 404,
    }
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    // Use mock data if configured
    if (this.useMockData) {
      console.log(`[API Middleware] Using mock data for ${endpoint}`)
      return this.getMockResponse<T>(endpoint, options.method)
    }

    try {
      const url = `${this.baseUrl}/api${endpoint}`
      const headers = await this.withAuthHeaders(options.headers)

      const response = await fetch(url, {
        ...options,
        headers,
        next: { revalidate: 0 },
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          error: data.detail || "Request failed",
          status: response.status,
        }
      }

      return {
        data,
        status: response.status,
      }
    } catch (error) {
      console.error("[API Client] Request failed:", error)
      return {
        error: error instanceof Error ? error.message : "Network error",
        status: 500,
      }
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: "GET" })
  }

  async post<T>(endpoint: string, body?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  async patch<T>(endpoint: string, body?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: "DELETE" })
  }
}

export const apiClient = new ApiClient()

// Convenience hooks for common API patterns
export const useApiClient = () => {
  return {
    client: apiClient,
    isUsingMockData: appConfig.api.useMockData,
  }
}
