"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { getAllReadingExercisesByLevel } from "@/lib/exercises/reading"
import type { ReadingExercise } from "@/lib/exercises/types"

// Bauhaus color palette
const BAUHAUS_COLORS = {
  black: "#000000",
  red: "#be1e2d",
  yellow: "#ffde17",
  white: "#ffffff",
  blue: "#21409a",
}

interface ReadingComprehensionProps {
  level: number
  onBack: () => void
}

export function ReadingComprehension({ level, onBack }: ReadingComprehensionProps) {
  const [exercises, setExercises] = useState<ReadingExercise[]>([])
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const loadedExercises = getAllReadingExercisesByLevel(level)
      setExercises(loadedExercises)
      setIsLoading(false)

      // Reset state when level changes
      setCurrentExerciseIndex(0)
      setSelectedAnswers({})
      setShowResults(false)
    } catch (err) {
      setError(`Error loading exercises: ${err instanceof Error ? err.message : String(err)}`)
      setIsLoading(false)
    }
  }, [level])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-xl">Loading exercises...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 border-2 border-red-500">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="text-red-500">{error}</p>
        <Button onClick={onBack} className="mt-4">
          Back to Game Selection
        </Button>
      </div>
    )
  }

  if (exercises.length === 0) {
    return (
      <div className="p-8 border-2" style={{ borderColor: BAUHAUS_COLORS.black }}>
        <h2 className="text-2xl font-bold mb-4">No Reading Exercises</h2>
        <p>There are no reading exercises available for HSK Level {level}.</p>
        <Button onClick={onBack} className="mt-4">
          Back to Game Selection
        </Button>
      </div>
    )
  }

  const currentExercise = exercises[currentExerciseIndex]
  const totalExercises = exercises.length

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    if (showResults) return // Prevent changing answers after submission

    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex,
    })
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const handleNext = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
      setSelectedAnswers({})
      setShowResults(false)
    }
  }

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1)
      setSelectedAnswers({})
      setShowResults(false)
    }
  }

  const handleReset = () => {
    setSelectedAnswers({})
    setShowResults(false)
  }

  // Calculate score if results are shown
  const calculateScore = () => {
    if (!showResults) return null

    let correctAnswers = 0
    currentExercise.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })

    return {
      correct: correctAnswers,
      total: currentExercise.questions.length,
      percentage: Math.round((correctAnswers / currentExercise.questions.length) * 100),
    }
  }

  const score = calculateScore()

  // Check if all questions have been answered
  const allQuestionsAnswered = currentExercise.questions.every((question) => selectedAnswers[question.id] !== undefined)

  return (
    <div className="p-8 border-2" style={{ borderColor: BAUHAUS_COLORS.black }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Reading Comprehension - HSK Level {level}</h2>
        <Button variant="outline" onClick={onBack}>
          Back to Games
        </Button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm">
          Exercise {currentExerciseIndex + 1} of {totalExercises}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrevious} disabled={currentExerciseIndex === 0} size="sm">
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentExerciseIndex === totalExercises - 1}
            size="sm"
          >
            Next
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4" style={{ color: BAUHAUS_COLORS.blue }}>
            {currentExercise.title}
          </h3>
          <div className="mb-6 text-lg leading-relaxed whitespace-pre-line">{currentExercise.text}</div>
          <div className="mb-4 text-sm text-gray-600 italic">Translation: {currentExercise.translation}</div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {currentExercise.questions.map((question, qIndex) => (
          <Card key={question.id} className="overflow-hidden">
            <div
              className="h-2"
              style={{
                backgroundColor: showResults
                  ? selectedAnswers[question.id] === question.correctAnswer
                    ? "green"
                    : BAUHAUS_COLORS.red
                  : BAUHAUS_COLORS.yellow,
              }}
            />
            <CardContent className="p-6">
              <h4 className="font-bold mb-4">
                {qIndex + 1}. {question.question}
              </h4>

              <RadioGroup
                value={selectedAnswers[question.id]?.toString()}
                onValueChange={(value) => handleAnswerSelect(question.id, Number.parseInt(value))}
                className="space-y-3"
              >
                {question.options.map((option, oIndex) => (
                  <div
                    key={oIndex}
                    className={`flex items-center space-x-2 p-2 rounded ${
                      showResults && oIndex === question.correctAnswer
                        ? "bg-green-100"
                        : showResults && selectedAnswers[question.id] === oIndex && oIndex !== question.correctAnswer
                          ? "bg-red-100"
                          : ""
                    }`}
                  >
                    <RadioGroupItem
                      value={oIndex.toString()}
                      id={`${question.id}-option-${oIndex}`}
                      disabled={showResults}
                    />
                    <Label htmlFor={`${question.id}-option-${oIndex}`} className="flex-grow cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {showResults && (
                <div className="mt-4 p-3 bg-gray-100 rounded">
                  <p className="font-semibold">Explanation:</p>
                  <p>{question.explanation}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        {!showResults ? (
          <Button
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            style={{
              backgroundColor: allQuestionsAnswered ? BAUHAUS_COLORS.blue : "gray",
              color: BAUHAUS_COLORS.white,
            }}
          >
            Check Answers
          </Button>
        ) : (
          <Button onClick={handleReset} style={{ backgroundColor: BAUHAUS_COLORS.yellow, color: BAUHAUS_COLORS.black }}>
            Try Again
          </Button>
        )}

        {showResults && score && (
          <div className="text-xl font-bold">
            Score: {score.correct}/{score.total} ({score.percentage}%)
          </div>
        )}
      </div>
    </div>
  )
}

