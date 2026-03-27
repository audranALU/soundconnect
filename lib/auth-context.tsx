"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

export interface User {
  username: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem("soundconnect_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("soundconnect_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (data.success) {
        const userData: User = {
          username: data.user.username,
          createdAt: data.user.createdAt,
        }
        setUser(userData)
        localStorage.setItem("soundconnect_user", JSON.stringify(userData))
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch {
      return { success: false, error: "Something went wrong. Please try again." }
    }
  }

  const signup = async (username: string, password: string) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (data.success) {
        const userData: User = {
          username: data.user.username,
          createdAt: data.user.createdAt,
        }
        setUser(userData)
        localStorage.setItem("soundconnect_user", JSON.stringify(userData))
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch {
      return { success: false, error: "Something went wrong. Please try again." }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("soundconnect_user")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
