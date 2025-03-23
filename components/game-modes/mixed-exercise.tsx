"use client"

import { useState, useRef } from "react"
import type { MixedExercise } from "@/lib/exercises/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MixedExerciseProps {
  exercise: MixedExercise // Changed from Exercise to MixedExercise
  onComplete?: (score: number, total: number) => void
}

export function MixedExercise({ exercise, onComplete }: MixedExerciseProps) {
  const [activeTab, setActiveTab] = useState("reading")
  const [readingAnswers, setReadingAnswers] = useState<Record<string, string>>({})
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, string>>({})
  const [writingAnswers, setWritingAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [audioPlayed, setAudioPlayed] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleReadingAnswer = (questionId: string, answer: string) => {
    setReadingAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleListeningAnswer = (questionId: string, answer: string) => {
    setListeningAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleWritingAnswer = (questionId: string, answer: string) => {
    setWritingAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const playAudio = () => {
    if (exercise.content.listening?.audioUrl && audioRef.current) {
      audioRef.current.play()
      setAudioPlayed(true)
    }
  }

  const calculateScore = () => {
    let score = 0
    let total = 0

    // Count correct reading answers
    if (exercise.content.reading) {
      exercise.content.reading.questions.forEach((q) => {
        total++
        if (readingAnswers[q.id] === q.correctAnswer) {
          score++
        }
      })
    }

    // Count correct listening answers
    if (exercise.content.listening) {
      exercise.content.listening.questions.forEach((q) => {
        total++
        if (listeningAnswers[q.id] === q.correctAnswer) {
          score++
        }
      })
    }

    // Count correct writing answers
    if (exercise.content.writing) {
      exercise.content.writing.tasks.forEach((task) => {
        total++
        if (writingAnswers[task.id]?.trim().toLowerCase() === task.expectedAnswer.toLowerCase()) {
          score++
        }
      })
    }

    return { score, total }
  }

  const handleSubmit = () => {
    setShowResults(true)
    const { score, total } = calculateScore()
    if (onComplete) {
      onComplete(score, total)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{exercise.title}</CardTitle>
        <p className="text-gray-500">{exercise.description}</p>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="reading">Reading</TabsTrigger>
            <TabsTrigger value="listening">Listening</TabsTrigger>
            <TabsTrigger value="writing">Writing</TabsTrigger>
          </TabsList>

          {/* Reading Section */}
          <TabsContent value="reading">
            {exercise.content.reading && (
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-lg font-medium mb-4">Text:</p>
                    <p className="text-lg leading-relaxed">{exercise.content.reading.text}</p>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {exercise.content.reading.questions.map((question) => (
                    <Card key={question.id}>
                      <CardContent className="p-4">
                        <p className="font-medium mb-3">{question.question}</p>
                        <RadioGroup
                          value={readingAnswers[question.id]}
                          onValueChange={(value) => handleReadingAnswer(question.id, value)}
                        >
                          {question.options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                              <RadioGroupItem value={option} id={`${question.id}-${index}`} disabled={showResults} />
                              <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
                              {showResults && option === question.correctAnswer && (
                                <span className="text-green-500 ml-2">✓</span>
                              )}
                            </div>
                          ))}
                        </RadioGroup>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Listening Section */}
          <TabsContent value="listening">
            {exercise.content.listening && (
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center">
                    {exercise.content.listening.audioUrl && (
                      <audio ref={audioRef} src={exercise.content.listening.audioUrl} className="hidden" />
                    )}
                    <Button onClick={playAudio} className="mb-4" disabled={audioPlayed && showResults}>
                      {audioPlayed ? "Audio played" : "Play audio"}
                    </Button>
                    {showResults && (
                      <div className="mt-4 p-3 bg-gray-100 rounded-md w-full">
                        <p className="font-medium mb-2">Transcript:</p>
                        <p>{exercise.content.listening.transcript}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {exercise.content.listening.questions.map((question) => (
                    <Card key={question.id}>
                      <CardContent className="p-4">
                        <p className="font-medium mb-3">{question.question}</p>
                        <RadioGroup
                          value={listeningAnswers[question.id]}
                          onValueChange={(value) => handleListeningAnswer(question.id, value)}
                        >
                          {question.options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                              <RadioGroupItem value={option} id={`${question.id}-${index}`} disabled={showResults} />
                              <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
                              {showResults && option === question.correctAnswer && (
                                <span className="text-green-500 ml-2">✓</span>
                              )}
                            </div>
                          ))}
                        </RadioGroup>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Writing Section */}
          <TabsContent value="writing">
            {exercise.content.writing && (
              <div className="space-y-6">
                {exercise.content.writing.tasks.map((task) => (
                  <Card key={task.id}>
                    <CardContent className="p-4">
                      <p className="font-medium mb-3">{task.instruction}</p>
                      <div className="mb-4">
                        <Input
                          placeholder="Write your answer here"
                          value={writingAnswers[task.id] || ""}
                          onChange={(e) => handleWritingAnswer(task.id, e.target.value)}
                          disabled={showResults}
                          className="mb-2"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleWritingAnswer(task.id, writingAnswers[task.id] || "")}
                          disabled={showResults}
                        >
                          Hint
                        </Button>
                        {task.hint && <p className="text-sm text-gray-500 mt-2">{task.hint}</p>}
                      </div>
                      {showResults && (
                        <div className="mt-2">
                          <p className="font-medium">Correct answer: {task.expectedAnswer}</p>
                          {writingAnswers[task.id]?.trim().toLowerCase() === task.expectedAnswer.toLowerCase() ? (
                            <p className="text-green-500">Correct!</p>
                          ) : (
                            <p className="text-red-500">Incorrect</p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Vocabulary */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Vocabulary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exercise.content.vocabulary?.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-lg font-bold">{item.word}</p>
                      <p className="text-sm text-gray-500">{item.pinyin}</p>
                    </div>
                    <p>{item.translation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <div className="mt-8 flex justify-center">
          <Button onClick={handleSubmit} disabled={showResults} className="px-8">
            {showResults ? "Submitted" : "Submit answers"}
          </Button>
        </div>

        {/* Results */}
        {showResults && (
          <Card className="mt-6">
            <CardContent className="p-4">
              <h3 className="text-xl font-bold mb-2">Results</h3>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {calculateScore().score} / {calculateScore().total}
                </p>
                <p className="text-lg">{((calculateScore().score / calculateScore().total) * 100).toFixed(0)}%</p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

