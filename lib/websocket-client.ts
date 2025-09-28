import { appConfig } from "./config"

// WebSocket client with mock fallback
export class WebSocketClient {
  private ws: WebSocket | null = null
  private url: string
  private useMockData: boolean
  private mockEventHandlers: Map<string, Function[]> = new Map()
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5

  constructor(endpoint: string) {
    this.url = `${appConfig.api.wsBaseUrl}/ws${endpoint}`
    this.useMockData = appConfig.api.useMockData
  }

  connect(token?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.useMockData) {
        console.log("[WebSocket] Using mock WebSocket connection")
        this.simulateMockConnection()
        resolve()
        return
      }

      try {
        const wsUrl = token ? `${this.url}?token=${token}` : this.url
        this.ws = new WebSocket(wsUrl)

        this.ws.onopen = () => {
          console.log("[WebSocket] Connected")
          this.reconnectAttempts = 0
          resolve()
        }

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            this.handleMessage(data)
          } catch (error) {
            console.error("[WebSocket] Failed to parse message:", error)
          }
        }

        this.ws.onclose = () => {
          console.log("[WebSocket] Connection closed")
          this.attemptReconnect(token)
        }

        this.ws.onerror = (error) => {
          console.error("[WebSocket] Error:", error)
          reject(error)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  private simulateMockConnection() {
    // Simulate real-time events for development
    setTimeout(() => {
      this.handleMessage({
        type: "user_joined",
        data: {
          user: { id: 2, username: "sarah_m" },
          timestamp: new Date().toISOString(),
        },
      })
    }, 2000)

    setTimeout(() => {
      this.handleMessage({
        type: "chat_message",
        data: {
          id: Date.now(),
          user: { id: 2, username: "sarah_m" },
          message: "Hello from mock WebSocket!",
          timestamp: new Date().toISOString(),
        },
      })
    }, 5000)
  }

  private handleMessage(data: any) {
    const handlers = this.mockEventHandlers.get(data.type) || []
    handlers.forEach((handler) => handler(data.data))
  }

  private attemptReconnect(token?: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const delay = Math.pow(2, this.reconnectAttempts) * 1000 // Exponential backoff

      setTimeout(() => {
        console.log(`[WebSocket] Reconnecting... (attempt ${this.reconnectAttempts})`)
        this.connect(token)
      }, delay)
    }
  }

  on(event: string, handler: Function) {
    if (!this.mockEventHandlers.has(event)) {
      this.mockEventHandlers.set(event, [])
    }
    this.mockEventHandlers.get(event)!.push(handler)
  }

  send(data: any) {
    if (this.useMockData) {
      console.log("[WebSocket] Mock send:", data)
      // Simulate echo for testing
      setTimeout(() => {
        this.handleMessage({
          type: "echo",
          data: { ...data, timestamp: new Date().toISOString() },
        })
      }, 100)
      return
    }

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    } else {
      console.warn("[WebSocket] Cannot send message: connection not open")
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}
