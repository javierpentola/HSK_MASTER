"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import type { Vocabulary } from "@/lib/types"

interface QuizProps {
  vocabulary: Vocabulary[]
  level: number
}

export function Quiz({ vocabulary, level }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([])
  const [isAnswered, setIsAnswered] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()
  const router = useRouter()

  const currentQuestion = vocabulary[currentQuestionIndex]

  // Number of questions to ask (limit to 10 or the total number of vocabulary items)
  const totalQuestions = Math.min(10, vocabulary.length)

  useEffect(() => {
    if (vocabulary.length > 0) {
      generateOptions()
    }
  }, [currentQuestionIndex, vocabulary])

  useEffect(() => {
    // Update progress when current question changes
    setProgress((currentQuestionIndex / totalQuestions) * 100)
  }, [currentQuestionIndex, totalQuestions])

  const generateOptions = () => {
    if (!currentQuestion) return

    // Get the correct answer
    const correctAnswer = currentQuestion.english

    // Get 3 random incorrect answers from the vocabulary
    const incorrectOptions: string[] = []
    const usedIndices = new Set([currentQuestionIndex])

    while (incorrectOptions.length < 3 && incorrectOptions.length < vocabulary.length - 1) {
      const randomIndex = Math.floor(Math.random() * vocabulary.length)
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex)
        incorrectOptions.push(vocabulary[randomIndex].english)
      }
    }

    // Combine correct and incorrect options and shuffle
    const options = [correctAnswer, ...incorrectOptions]
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[options[i], options[j]] = [options[j], options[i]]
    }

    setShuffledOptions(options)
  }

  const handleOptionClick = (option: string) => {
    if (isAnswered) return

    setSelectedOption(option)
    const correct = option === currentQuestion.english
    setIsCorrect(correct)
    setIsAnswered(true)

    if (correct) {
      setScore(score + 1)
    }

    // Simple animation delay before moving to next question
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedOption(null)
        setIsCorrect(null)
        setIsAnswered(false)
      } else {
        setShowResult(true)
        toast({
          title: "Quiz completed!",
          description: `Your score: ${score + (correct ? 1 : 0)} out of ${totalQuestions}`,
        })
      }
    }, 1000)
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setIsCorrect(null)
    setScore(0)
    setShowResult(false)
    setIsAnswered(false)
    setProgress(0)
  }

  if (vocabulary.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-xl mb-4">No vocabulary available for this level.</p>
        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <p className="text-xl mb-6">
          Your score: {score} out of {totalQuestions}
        </p>
        <div className="flex gap-4">
          <Button onClick={restartQuiz}>Restart Quiz</Button>
          <Button onClick={() => router.push("/")} variant="outline">
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full p-4">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium">Score: {score}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2 text-center">{currentQuestion.hanzi}</h2>
          <p className="text-lg text-center mb-4">{currentQuestion.pinyin}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 mb-6">
        {shuffledOptions.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className={cn(
              "h-auto py-4 px-6 text-left justify-start",
              selectedOption === option && isCorrect && "bg-green-100 border-green-500",
              selectedOption === option && !isCorrect && "bg-red-100 border-red-500",
              option === currentQuestion.english && isAnswered && "bg-green-100 border-green-500",
            )}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  )
}

