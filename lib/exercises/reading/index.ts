import type { ReadingExercise } from "../types"
import { hsk2Exercises } from "./hsk2"
import { hsk3Exercises } from "./hsk3"
import { hsk4Exercises } from "./hsk4"
import { hsk5Exercises } from "./hsk5"
import { hsk6Exercises } from "./hsk6"

// Get all reading exercises
export function getAllReadingExercises(): ReadingExercise[] {
  return [...hsk2Exercises, ...hsk3Exercises, ...hsk4Exercises, ...hsk5Exercises, ...hsk6Exercises]
}

// Get reading exercises by level
export function getAllReadingExercisesByLevel(level: number): ReadingExercise[] {
  switch (level) {
    case 2:
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
      return []
  }
}

// Get a specific reading exercise by ID
export function getReadingExerciseById(id: string): ReadingExercise | undefined {
  return getAllReadingExercises().find((exercise) => exercise.id === id)
}

