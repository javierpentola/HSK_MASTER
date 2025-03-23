import type { WritingExercise } from "../types"
import { hsk2Exercises } from "./hsk2"
import { hsk3Exercises } from "./hsk3"
import { hsk4Exercises } from "./hsk4"
import { hsk5Exercises } from "./hsk5"
import { hsk6Exercises } from "./hsk6"

// Combine all exercises
const allWritingExercises: WritingExercise[] = [
  ...hsk2Exercises,
  ...hsk3Exercises,
  ...hsk4Exercises,
  ...hsk5Exercises,
  ...hsk6Exercises,
]

// Get exercises by HSK level
export function getWritingExercisesByLevel(level: number): WritingExercise[] {
  console.log("Getting exercises for level:", level)

  switch (level) {
    case 2:
      console.log("HSK2 exercises:", hsk2Exercises)
      return hsk2Exercises
    case 3:
      return hsk3Exercises
    case 4:
      return hsk4Exercises
    case 5:
      return hsk5Exercises
    case 6:
      return hsk6Exercises
    default:
      console.log("No exercises found for level:", level)
      return []
  }
}

// Get a specific exercise by ID
export function getWritingExerciseById(id: string): WritingExercise | undefined {
  return allWritingExercises.find((exercise) => exercise.id === id)
}

// Get all writing exercises
export function getAllWritingExercises(): WritingExercise[] {
  return allWritingExercises
}

