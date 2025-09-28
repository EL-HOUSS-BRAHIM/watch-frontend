import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get configuration from headers or environment
  const useMockData = request.headers.get("x-use-mock-data") || process.env.NEXT_PUBLIC_USE_MOCK_DATA

  // Add configuration headers to the response
  const response = NextResponse.next()

  // Pass configuration to the client
  response.headers.set("x-config-mock-data", useMockData || "false")
  response.headers.set("x-config-api-base", process.env.NEXT_PUBLIC_API_BASE_URL || "")
  response.headers.set("x-config-ws-base", process.env.NEXT_PUBLIC_WS_BASE_URL || "")

  // Handle authentication for protected routes
  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth")
  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard")
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")

  // In a real app, you would check JWT tokens here
  // For demo purposes, we'll allow all routes

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
