"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase"

// Bauhaus color palette
export const BAUHAUS_COLORS = {
  black: "#000000",
  red: "#be1e2d",
  yellow: "#ffde17",
  white: "#ffffff",
  blue: "#21409a",
}

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAuthSuccess: (user: any) => void
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<string>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setMessage(null)
    } else {
      // Small delay to prevent seeing the form reset
      setTimeout(() => {
        setEmail("")
        setPassword("")
        setMessage(null)
        setActiveTab("login")
      }, 300)
    }
  }, [isOpen])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage({ type: "error", text: error.message })
        return
      }

      setMessage({ type: "success", text: "Login successful!" })
      onAuthSuccess(data.user)
      setTimeout(() => onClose(), 1000) // Close after 1 second
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred during login." })
      console.error("Login error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setMessage({ type: "error", text: error.message })
        return
      }

      setMessage({
        type: "success",
        text: "Registration successful! Please check your email to confirm your account.",
      })
      setEmail("")
      setPassword("")
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred during registration." })
      console.error("Registration error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address." })
      setLoading(false)
      return
    }

    try {
      // Get the current URL for the redirect
      const origin = typeof window !== "undefined" ? window.location.origin : ""
      const redirectTo = `${origin}/reset-password`

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      })

      if (error) {
        setMessage({ type: "error", text: error.message })
        return
      }

      setMessage({
        type: "success",
        text: "Password reset instructions have been sent to your email.",
      })
      setEmail("")
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while sending reset instructions." })
      console.error("Reset password error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold uppercase tracking-tight" style={{ color: BAUHAUS_COLORS.black }}>
            Account
          </DialogTitle>
          <DialogDescription>Sign in or create an account to save your learning progress</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="reset">Reset</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-login">Email</Label>
                <Input
                  id="email-login"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-login">Password</Label>
                <Input
                  id="password-login"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
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

              <DialogFooter className="mt-6">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                  style={{
                    backgroundColor: BAUHAUS_COLORS.blue,
                    color: BAUHAUS_COLORS.white,
                  }}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-register">Email</Label>
                <Input
                  id="email-register"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-register">Password</Label>
                <Input
                  id="password-register"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              <DialogFooter className="mt-6">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                  style={{
                    backgroundColor: BAUHAUS_COLORS.red,
                    color: BAUHAUS_COLORS.white,
                  }}
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>

          {/* Reset Password Tab */}
          <TabsContent value="reset">
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-reset">Email</Label>
                <Input
                  id="email-reset"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
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

              <DialogFooter className="mt-6">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                  style={{
                    backgroundColor: BAUHAUS_COLORS.yellow,
                    color: BAUHAUS_COLORS.black,
                  }}
                >
                  {loading ? "Sending..." : "Send Reset Instructions"}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

