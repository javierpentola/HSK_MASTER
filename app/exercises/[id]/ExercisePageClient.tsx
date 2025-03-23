"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getExerciseById } from "@/lib/exercises"
import type { Exercise } from "@/lib/exercises/types"
import { MixedExercise } from "@/components/game-modes/mixed-exercise"
import { Button } from "@/components/ui/button"

export default function ExercisePageClient({ params }: { params: { id: string } }) {
  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const router = useRouter()

  useEffect(() => {
    const fetchExercise = () => {
      try {
        const exerciseData = getExerciseById(params.id)
        if (exerciseData) {
          setExercise(exerciseData)
        } else {
          console.error("Ejercicio no encontrado")
        }
      } catch (error) {
        console.error("Error al cargar el ejercicio:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchExercise()
  }, [params.id])

  const handleExerciseComplete = (correct: number, total: number) => {
    setScore({ correct, total })
    setCompleted(true)
  }

  const handleBackToLevels = () => {
    router.push("/")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Cargando ejercicio...</p>
      </div>
    )
  }

  if (!exercise) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <p className="text-xl">Ejercicio no encontrado</p>
        <Button onClick={handleBackToLevels}>Volver a los niveles</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ejercicio: {exercise.title}</h1>
        <Button variant="outline" onClick={handleBackToLevels}>
          Volver a los niveles
        </Button>
      </div>

      <MixedExercise exercise={exercise} onComplete={handleExerciseComplete} />

      {completed && (
        <div className="mt-8 text-center">
          <Button onClick={handleBackToLevels} className="px-8">
            Volver a los niveles
          </Button>
        </div>
      )}
    </div>
  )
}

