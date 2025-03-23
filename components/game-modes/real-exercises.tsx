"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getExercisesByLevel } from "@/lib/exercises"
import { MixedExercise } from "./mixed-exercise"
import type { Exercise, MixedExercise as MixedExerciseType } from "@/lib/exercises/types"

interface RealExercisesProps {
  level: number
}

export function RealExercises({ level }: RealExercisesProps) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load exercises for the selected level
    const loadedExercises = getExercisesByLevel(level)
    setExercises(loadedExercises)
    setCurrentExerciseIndex(0)
    setScore({ correct: 0, total: 0 })
    setLoading(false)
  }, [level])

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1)
    }
  }

  const handleComplete = (correct: number, total: number) => {
    setScore((prev) => ({
      correct: prev.correct + correct,
      total: prev.total + total,
    }))
  }

  if (loading) {
    return <div className="text-center py-8">Loading exercises...</div>
  }

  if (exercises.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="mb-4">No exercises available for HSK {level} yet.</p>
        <p>Check back later or try another level!</p>
      </div>
    )
  }

  const currentExercise = exercises[currentExerciseIndex]

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Exercise {currentExerciseIndex + 1} of {exercises.length} - HSK {level}
        </h2>
        <div className="text-lg">
          Score: {score.correct}/{score.total}
        </div>
      </div>

      {/* Render the appropriate exercise component based on the exercise type */}
      {'type' in currentExercise && currentExercise.type === "mixed" && (
        <MixedExercise exercise={currentExercise as MixedExerciseType} onComplete={handleComplete} />
      )}
      {/* Add other exercise type components here when implemented */}

      <div className="mt-6 flex justify-between">
        <Button onClick={handlePrevious} disabled={currentExerciseIndex === 0}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={currentExerciseIndex === exercises.length - 1}>
          Next
        </Button>
      </div>
    </div>
  )
}

