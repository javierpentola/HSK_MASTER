import { getAllExerciseIds } from "@/lib/exercises"
import ExercisePageClient from "./ExercisePageClient"

// Add this function to generate all possible exercise IDs at build time
export function generateStaticParams() {
  const exerciseIds = getAllExerciseIds()
  return exerciseIds.map((id) => ({
    id,
  }))
}

export default function ExercisePage({ params }: { params: { id: string } }) {
  return <ExercisePageClient params={params} />
}

