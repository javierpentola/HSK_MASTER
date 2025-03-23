"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { getAllListeningExercisesByLevel } from "@/lib/exercises/listening"
import type { ListeningExercise } from "@/lib/exercises/types"
import { Play, Pause, RotateCcw, Volume2, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// Bauhaus color palette
const BAUHAUS_COLORS = {
  black: "#000000",
  red: "#be1e2d",
  yellow: "#ffde17",
  white: "#ffffff",
  blue: "#21409a",
}

interface ListeningComprehensionProps {
  level: number
  onBack: () => void
}

export function ListeningComprehension({ level, onBack }: ListeningComprehensionProps) {
  const [exercises, setExercises] = useState<ListeningExercise[]>([])
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    try {
      const loadedExercises = getAllListeningExercisesByLevel(level)
      setExercises(loadedExercises)
      setIsLoading(false)

      // Reset state when level changes
      setCurrentExerciseIndex(0)
      setSelectedAnswers({})
      setShowResults(false)
      setHasPlayed(false)
      setIsPlaying(false)
    } catch (err) {
      setError(`Error loading exercises: ${err instanceof Error ? err.message : String(err)}`)
      setIsLoading(false)
    }
  }, [level])

  useEffect(() => {
    // Reset audio state when changing exercise
    setHasPlayed(false)
    setIsPlaying(false)

    // Create new audio element for current exercise
    if (exercises.length > 0 && exercises[currentExerciseIndex]?.audioUrl) {
      audioRef.current = new Audio(exercises[currentExerciseIndex].audioUrl)

      audioRef.current.onended = () => {
        setIsPlaying(false)
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.onended = null
        }
      }
    }
  }, [currentExerciseIndex, exercises])

  const playAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.currentTime = 0
        audioRef.current.play()
        setIsPlaying(true)
        setHasPlayed(true)
      }
    }
  }

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

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
        <h2 className="text-2xl font-bold mb-4">No Listening Exercises</h2>
        <p>There are no listening exercises available for HSK Level {level}.</p>
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
      setHasPlayed(false)
    }
  }

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1)
      setSelectedAnswers({})
      setShowResults(false)
      setHasPlayed(false)
    }
  }

  const handleReset = () => {
    setSelectedAnswers({})
    setShowResults(false)
    setHasPlayed(false)
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
        <h2 className="text-2xl font-bold">Listening Comprehension - HSK Level {level}</h2>
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

          <div className="mb-6">
            <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-md border">
              <div className="mb-4 text-center">
                <p className="text-lg font-medium mb-2">Listen to the audio</p>
                <p className="text-sm text-gray-500">
                  {hasPlayed ? "You can play the audio again if needed" : "Click the play button to listen"}
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={playAudio}
                  className="flex items-center gap-2"
                  style={{
                    backgroundColor: isPlaying ? BAUHAUS_COLORS.red : BAUHAUS_COLORS.blue,
                    color: BAUHAUS_COLORS.white,
                  }}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-5 w-5" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      Play
                    </>
                  )}
                </Button>

                <Button
                  onClick={resetAudio}
                  variant="outline"
                  disabled={!hasPlayed}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>

              {showResults && (
                <div className="mt-6 p-4 bg-white border rounded-md w-full">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Volume2 className="h-5 w-5 mr-2" style={{ color: BAUHAUS_COLORS.blue }} />
                    Transcript:
                  </h4>
                  <p className="text-lg">{currentExercise.transcript}</p>
                  <p className="mt-2 text-sm text-gray-600 italic">{currentExercise.translation}</p>
                </div>
              )}
            </div>
          </div>

          {!hasPlayed && !showResults && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md mb-4">
              <p className="text-sm text-yellow-700">Please listen to the audio before answering the questions.</p>
            </div>
          )}
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
                disabled={!hasPlayed && !showResults}
              >
                {question.options.map((option, oIndex) => (
                  <div
                    key={oIndex}
                    className={cn(
                      "flex items-center space-x-2 p-2 rounded",
                      showResults && oIndex === question.correctAnswer
                        ? "bg-green-100"
                        : showResults && selectedAnswers[question.id] === oIndex && oIndex !== question.correctAnswer
                          ? "bg-red-100"
                          : "",
                      !hasPlayed && !showResults ? "opacity-50" : "",
                    )}
                  >
                    <RadioGroupItem
                      value={oIndex.toString()}
                      id={`${question.id}-option-${oIndex}`}
                      disabled={showResults || (!hasPlayed && !showResults)}
                    />
                    <Label
                      htmlFor={`${question.id}-option-${oIndex}`}
                      className={cn("flex-grow cursor-pointer", !hasPlayed && !showResults ? "text-gray-500" : "")}
                    >
                      {option}
                    </Label>

                    {showResults && oIndex === question.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {showResults && selectedAnswers[question.id] === oIndex && oIndex !== question.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
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
            disabled={!allQuestionsAnswered || !hasPlayed}
            style={{
              backgroundColor: allQuestionsAnswered && hasPlayed ? BAUHAUS_COLORS.blue : "gray",
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

