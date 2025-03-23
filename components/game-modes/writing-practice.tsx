"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getWritingExercisesByLevel } from "@/lib/exercises/writing"
import type { WritingExercise } from "@/lib/exercises/types"

interface WritingPracticeProps {
  level: number
  onBack?: () => void
}

export function WritingPractice({ level, onBack }: WritingPracticeProps) {
  const router = useRouter()
  const [exercises, setExercises] = useState<WritingExercise[]>([])
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [showSampleAnswer, setShowSampleAnswer] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      console.log("Loading exercises for level:", level)
      const loadedExercises = getWritingExercisesByLevel(level)
      console.log("Loaded exercises:", loadedExercises)
      setExercises(loadedExercises)
      setLoading(false)
    } catch (error) {
      console.error("Error loading exercises:", error)
      setLoading(false)
    }
  }, [level])

  const currentExercise = exercises[currentExerciseIndex]

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
      setUserAnswer("")
      setShowSampleAnswer(false)
      setSubmitted(false)
    }
  }

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1)
      setUserAnswer("")
      setShowSampleAnswer(false)
      setSubmitted(false)
    }
  }

  const handleBackToLevels = () => {
    if (onBack) {
      onBack()
    } else {
      router.push("/")
    }
  }

  if (loading) {
    return (
      <div className="p-8 border-2 border-black">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Writing Practice - HSK Level {level}</h2>
          <Button variant="outline" onClick={handleBackToLevels}>
            Back
          </Button>
        </div>
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading exercises...</p>
        </div>
      </div>
    )
  }

  if (!currentExercise) {
    return (
      <div className="p-8 border-2 border-black">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Writing Practice - HSK Level {level}</h2>
          <Button variant="outline" onClick={handleBackToLevels}>
            Back
          </Button>
        </div>
        <p className="text-xl">No exercises available for this level.</p>
      </div>
    )
  }

  const characterCount = userAnswer.length
  const isWithinLimits =
    characterCount >= (currentExercise?.minChars || 0) && characterCount <= (currentExercise?.maxChars || 0)

  return (
    <div className="p-8 border-2 border-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Writing Practice - HSK Level {level}</h2>
        <Button variant="outline" onClick={handleBackToLevels}>
          Back
        </Button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-500">
            Exercise {currentExerciseIndex + 1} of {exercises.length}
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrevious} disabled={currentExerciseIndex === 0}>
            Previous
          </Button>
          <Button variant="outline" onClick={handleNext} disabled={currentExerciseIndex === exercises.length - 1}>
            Next
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex flex-col gap-2">
            <div className="text-2xl">{currentExercise.question}</div>
            <div className="text-lg text-gray-600">{currentExercise.translation}</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm">
                Character limit: {currentExercise.minChars}-{currentExercise.maxChars}
              </span>
              <span
                className={`text-sm ${
                  characterCount < currentExercise.minChars
                    ? "text-yellow-600"
                    : characterCount > currentExercise.maxChars
                      ? "text-red-600"
                      : "text-green-600"
                }`}
              >
                {characterCount} characters
              </span>
            </div>
            <Textarea
              placeholder="Write your answer in Chinese..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="min-h-[150px] text-lg"
              disabled={submitted}
            />
          </div>

          {currentExercise.suggestedVocabulary && currentExercise.suggestedVocabulary.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Suggested vocabulary:</h4>
              <div className="flex flex-wrap gap-2">
                {currentExercise.suggestedVocabulary.map((vocab, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {vocab.word} - {vocab.translation}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handleSubmit}
            disabled={submitted || !userAnswer.trim()}
            className="w-full"
            variant="default"
          >
            Submit Answer
          </Button>
        </CardFooter>
      </Card>

      {submitted && (
        <Card>
          <CardHeader>
            <CardTitle>Your Response</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="your-answer">
              <TabsList className="mb-4">
                <TabsTrigger value="your-answer">Your Answer</TabsTrigger>
                <TabsTrigger value="sample-answer" onClick={() => setShowSampleAnswer(true)}>
                  Sample Answer
                </TabsTrigger>
              </TabsList>
              <TabsContent value="your-answer">
                <div className="p-4 border rounded-md bg-gray-50">
                  <p className="text-lg">{userAnswer}</p>
                  <div className="mt-4 flex items-center">
                    <span className={`text-sm ${isWithinLimits ? "text-green-600" : "text-red-600"}`}>
                      {characterCount} characters
                      {!isWithinLimits && ` (${characterCount < currentExercise.minChars ? "too short" : "too long"})`}
                    </span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="sample-answer">
                <div className="p-4 border rounded-md bg-gray-50">
                  <p className="text-lg">{currentExercise.sampleAnswer}</p>
                  <p className="mt-4 text-sm text-gray-600">
                    This is just one possible answer. Your answer might be different but still correct.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

