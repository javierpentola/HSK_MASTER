import { getAllExerciseIds, getExerciseById } from "@/lib/exercises/index"
import { notFound } from "next/navigation"

// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
  const ids = getAllExerciseIds()

  return ids.map((id) => ({
    id: id,
  }))
}

export default function ExercisePage({ params }: { params: { id: string } }) {
  const exercise = getExerciseById(params.id)

  if (!exercise) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">{exercise.title}</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        {/* Render exercise content based on exercise type */}
        <pre>{JSON.stringify(exercise, null, 2)}</pre>
      </div>
    </div>
  )
}

