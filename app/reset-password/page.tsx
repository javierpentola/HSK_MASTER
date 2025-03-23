"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"

// Bauhaus color palette
export const BAUHAUS_COLORS = {
  black: "#000000",
  red: "#be1e2d",
  yellow: "#ffde17",
  white: "#ffffff",
  blue: "#21409a",
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isReady, setIsReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      setIsReady(true)
    }
  }, [])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." })
      return
    }

    if (password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters long." })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        setMessage({ type: "error", text: error.message })
        return
      }

      setMessage({ type: "success", text: "Password has been reset successfully!" })

      // Redirect to home page after successful password reset
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while resetting your password." })
      console.error("Reset password error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isReady) {
    return null // Return nothing during SSR
  }

  return (
    <div className="container mx-auto max-w-md py-12">
      <div className="bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold mb-6 uppercase tracking-tight" style={{ color: BAUHAUS_COLORS.black }}>
          Reset Your Password
        </h1>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded text-sm ${
                message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          <Button
            type="submit"
            className="w-full mt-6"
            disabled={loading}
            style={{
              backgroundColor: BAUHAUS_COLORS.blue,
              color: BAUHAUS_COLORS.white,
            }}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  )
}

