"use client"

import { useCallback } from "react"

import { useEffect } from "react"

import { useState } from "react"

// Advanced configuration management with persistence and validation
export class ConfigManager {
  private static instance: ConfigManager
  private config: Record<string, any> = {}
  private listeners: Map<string, Function[]> = new Map()

  private constructor() {
    this.loadFromStorage()
  }

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }

  // Load configuration from localStorage
  private loadFromStorage() {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("watchtogether-config")
        if (stored) {
          this.config = JSON.parse(stored)
        }
      } catch (error) {
        console.error("[ConfigManager] Failed to load config from storage:", error)
      }
    }
  }

  // Save configuration to localStorage
  private saveToStorage() {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("watchtogether-config", JSON.stringify(this.config))
      } catch (error) {
        console.error("[ConfigManager] Failed to save config to storage:", error)
      }
    }
  }

  // Get configuration value with fallback
  get<T>(key: string, fallback?: T): T {
    const value = this.config[key]
    return value !== undefined ? value : fallback
  }

  // Set configuration value
  set(key: string, value: any): void {
    const oldValue = this.config[key]
    this.config[key] = value
    this.saveToStorage()

    // Notify listeners
    const keyListeners = this.listeners.get(key) || []
    keyListeners.forEach((listener) => listener(value, oldValue))

    // Notify global listeners
    const globalListeners = this.listeners.get("*") || []
    globalListeners.forEach((listener) => listener(key, value, oldValue))
  }

  // Subscribe to configuration changes
  subscribe(key: string, listener: Function): () => void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, [])
    }
    this.listeners.get(key)!.push(listener)

    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(key) || []
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }

  // Get all configuration
  getAll(): Record<string, any> {
    return { ...this.config }
  }

  // Set multiple configuration values
  setMany(values: Record<string, any>): void {
    Object.entries(values).forEach(([key, value]) => {
      this.set(key, value)
    })
  }

  // Reset configuration to defaults
  reset(): void {
    this.config = {}
    this.saveToStorage()

    // Notify all listeners
    this.listeners.forEach((listeners, key) => {
      if (key !== "*") {
        listeners.forEach((listener) => listener(undefined, this.config[key]))
      }
    })
  }

  // Validate configuration against schema
  validate(schema: Record<string, any>): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    Object.entries(schema).forEach(([key, rules]) => {
      const value = this.config[key]

      if (rules.required && value === undefined) {
        errors.push(`${key} is required`)
      }

      if (value !== undefined && rules.type && typeof value !== rules.type) {
        errors.push(`${key} must be of type ${rules.type}`)
      }

      if (rules.validate && typeof rules.validate === "function") {
        const validationResult = rules.validate(value)
        if (validationResult !== true) {
          errors.push(validationResult || `${key} is invalid`)
        }
      }
    })

    return {
      valid: errors.length === 0,
      errors,
    }
  }

  // Export configuration as JSON
  export(): string {
    return JSON.stringify(this.config, null, 2)
  }

  // Import configuration from JSON
  import(jsonString: string): { success: boolean; error?: string } {
    try {
      const imported = JSON.parse(jsonString)
      this.setMany(imported)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Invalid JSON",
      }
    }
  }
}

// Global configuration manager instance
export const configManager = ConfigManager.getInstance()

// React hook for using configuration
export function useConfig<T>(key: string, fallback?: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(configManager.get(key, fallback))

  useEffect(() => {
    const unsubscribe = configManager.subscribe(key, (newValue: T) => {
      setValue(newValue)
    })

    return unsubscribe
  }, [key])

  const setConfigValue = useCallback(
    (newValue: T) => {
      configManager.set(key, newValue)
    },
    [key],
  )

  return [value, setConfigValue]
}
