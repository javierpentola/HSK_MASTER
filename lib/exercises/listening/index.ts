import type { ListeningExercise } from "../types"
import { hsk2Exercises } from "./hsk2"
import { hsk3Exercises } from "./hsk3"
import { hsk4Exercises } from "./hsk4"
import { hsk5Exercises } from "./hsk5"
import { hsk6Exercises } from "./hsk6"

// Get all listening exercises
export function getAllListeningExercises(): ListeningExercise[] {
  return [...hsk2Exercises, ...hsk3Exercises, ...hsk4Exercises, ...hsk5Exercises, ...hsk6Exercises]
}

// Get listening exercises by level
export function getAllListeningExercisesByLevel(level: number): ListeningExercise[] {
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

// Get a specific listening exercise by ID
export function getListeningExerciseById(id: string): ListeningExercise | undefined {
  return getAllListeningExercises().find((exercise) => exercise.id === id)
}

