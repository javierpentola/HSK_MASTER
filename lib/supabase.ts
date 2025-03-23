import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://xfnjdbnlanmibpisjmcd.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmbmpkYm5sYW5taWJwaXNqbWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0ODAyOTIsImV4cCI6MjA1ODA1NjI5Mn0.uXLXZ6BUg1HIo15gkf0lPtbsJfAZ2Kw9p9gy1S5US6A"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to check if Supabase connection is working
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from("profiles").select("count", { count: "exact" }).limit(0)

    if (error) {
      console.error("Error connecting to Supabase:", error)
      return false
    }

    console.log("Successfully connected to Supabase")
    return true
  } catch (error) {
    console.error("Error checking Supabase connection:", error)
    return false
  }
}

