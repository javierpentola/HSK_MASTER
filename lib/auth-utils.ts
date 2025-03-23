/**
 * Extracts username from email address
 * Example: from "john.doe@example.com" returns "john.doe"
 */
export function getUsernameFromEmail(email: string): string {
  if (!email) return ""
  const parts = email.split("@")
  return parts[0]
}

