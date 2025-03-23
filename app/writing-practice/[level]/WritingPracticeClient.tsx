"use client"

import { useRouter } from "next/navigation"
import { WritingPractice } from "@/components/game-modes/writing-practice"
import { Button } from "@/components/ui/button"

interface WritingPracticeClientProps {
  level: number
}

export function WritingPracticeClient({ level }: WritingPracticeClientProps) {
  const router = useRouter()

  if (isNaN(level) || level < 2 || level > 6) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Invalid HSK Level</h1>
        <p>Please select a valid HSK level (2-6).</p>
        <Button onClick={() => router.push("/")} className="mt-4">
          Back to Home
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <WritingPractice level={level} />
    </div>
  )
}

