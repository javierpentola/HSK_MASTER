import { hsk1Exercises } from "./hsk1"
import type { Exercise } from "./types"

// Aquí se importarían los ejercicios de otros niveles
// import { hsk2Exercises } from './reading/hsk2';
// import { hsk3Exercises } from './reading/hsk3';
// etc.

export const getAllExercises = (): Exercise[] => {
  return [
    ...hsk1Exercises,
    // ...hsk2Exercises,
    // ...hsk3Exercises,
    // etc.
  ]
}

export const getExercisesByLevel = (level: number): Exercise[] => {
  return getAllExercises().filter((exercise) => exercise.level === level)
}

export const getExerciseById = (id: string): Exercise | undefined => {
  return getAllExercises().find((exercise) => exercise.id === id)
}

export function getAllExerciseIds(): string[] {
  // Get all exercises and extract their IDs
  const allExercises = getAllExercises()
  return allExercises.map((exercise) => exercise.id)
}

export default {
  getAllExercises,
  getExercisesByLevel,
  getExerciseById,
  getAllExerciseIds,
}

