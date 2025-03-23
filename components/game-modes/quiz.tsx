"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import type { Vocabulary } from "@/lib/types"
import { getVocabularyByLevel } from "@/lib/vocabulary"

// Modificar la estructura de Props para quitar la dependencia directa en vocabulary
interface QuizProps {
  level: number
  onBack: () => void
}

// Actualizar la definición de función y agregar manejo de estado para el vocabulario
export function Quiz({ level, onBack }: QuizProps) {
  const [vocabulary, setVocabulary] = useState<Vocabulary[]>([])
  const [loading, setLoading] = useState(true)
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

  // Cargar vocabulario cuando el componente se monte
  useEffect(() => {
    const loadVocabulary = () => {
      setLoading(true)
      try {
        const vocabData = getVocabularyByLevel(level);
        // Ensure the data matches the Vocabulary type interface by mapping the required properties
        const formattedVocabData = vocabData.map(item => ({
          ...item,
          english: item.translation || '', // Using only translation property which exists in VocabularyItem
        }));
        setVocabulary(formattedVocabData);
      } catch (error) {
        console.error("Error loading vocabulary:", error);
      } finally {
        setLoading(false);
      }
    }

    loadVocabulary()
  }, [level])

  // Número de preguntas a hacer (limitar a 10 o el número total de elementos de vocabulario)
  const totalQuestions = Math.min(10, vocabulary.length)

  // Solo intentar acceder a currentQuestion si hay vocabulario disponible
  const currentQuestion =
    vocabulary.length > 0 && currentQuestionIndex < vocabulary.length ? vocabulary[currentQuestionIndex] : null

  useEffect(() => {
    if (vocabulary.length > 0 && currentQuestion) {
      generateOptions()
    }
  }, [currentQuestionIndex, vocabulary])

  useEffect(() => {
    // Actualiza el progreso cuando cambia la pregunta actual
    if (totalQuestions > 0) {
      setProgress((currentQuestionIndex / totalQuestions) * 100)
    }
  }, [currentQuestionIndex, totalQuestions])

  const generateOptions = () => {
    if (!currentQuestion) return

    // Obtener la respuesta correcta
    const correctAnswer = currentQuestion.english // Using english property from Vocabulary type

    // Obtener 3 respuestas incorrectas aleatorias del vocabulario
    const incorrectOptions: string[] = []
    const usedIndices = new Set([currentQuestionIndex])

    while (incorrectOptions.length < 3 && incorrectOptions.length < vocabulary.length - 1) {
      const randomIndex = Math.floor(Math.random() * vocabulary.length)
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex)
        incorrectOptions.push(vocabulary[randomIndex].english)
      }
    }

    // Combinar opciones correctas e incorrectas y mezclar
    const options = [correctAnswer, ...incorrectOptions]
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[options[i], options[j]] = [options[j], options[i]]
    }

    setShuffledOptions(options)
  }

  const handleOptionClick = (option: string) => {
    if (isAnswered || !currentQuestion) return

    setSelectedOption(option)
    const correct = option === currentQuestion.english // Using english property from Vocabulary type
    setIsCorrect(correct)
    setIsAnswered(true)

    if (correct) {
      setScore(score + 1)
    }

    // Animación simple antes de pasar a la siguiente pregunta
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-xl mb-4">Loading vocabulary...</p>
      </div>
    )
  }

  if (vocabulary.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-xl mb-4">No vocabulary available for HSK {level}.</p>
        <Button onClick={onBack}>Back to Game Modes</Button>
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
          <Button onClick={onBack} variant="outline">
            Back to Games
          </Button>
        </div>
      </div>
    )
  }

  // Protección adicional antes de renderizar el quiz principal
  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-xl mb-4">Error loading quiz questions.</p>
        <Button onClick={onBack}>Back to Game Modes</Button>
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
              option === currentQuestion.english && isAnswered && "bg-green-100 border-green-500", // Highlight correct answer when answered
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

