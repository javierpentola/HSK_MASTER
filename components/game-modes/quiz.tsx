"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getVocabularyByLevel } from "@/lib/vocabulary"
import type { VocabularyItem } from "@/lib/vocabulary"
import { ArrowLeft, RotateCcw, CheckCircle, XCircle } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Bauhaus color palette
const BAUHAUS_COLORS = {
  black: "#000000",
  red: "#be1e2d",
  yellow: "#ffde17",
  white: "#ffffff",
  blue: "#21409a",
}

type QuestionType = "hanziToTranslation" | "translationToHanzi" | "pinyinToHanzi"
type QuizState = "question" | "feedback" | "results"

interface QuizProps {
  level: number
  onBack: () => void
}

export function Quiz({ level, onBack }: QuizProps) {
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([])
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [quizState, setQuizState] = useState<QuizState>("question")
  const [quizLength, setQuizLength] = useState(10) // Default quiz length
  const [questionResults, setQuestionResults] = useState<boolean[]>([])

  // Load vocabulary based on selected level
  useEffect(() => {
    const vocabData = getVocabularyByLevel(level)
    if (vocabData.length > 0) {
      setVocabulary(vocabData)
    }
  }, [level])

  // Generate quiz questions when vocabulary is loaded
  useEffect(() => {
    if (vocabulary.length > 0) {
      generateQuiz()
    }
  }, [vocabulary])

  // Generate a new quiz with random questions
  const generateQuiz = () => {
    if (vocabulary.length < 4) {
      console.error("Not enough vocabulary items to create a quiz")
      return
    }

    // Determine how many questions to generate (min of vocabulary length or quizLength)
    const numQuestions = Math.min(vocabulary.length, quizLength)

    // Shuffle vocabulary to get random items
    const shuffledVocab = [...vocabulary].sort(() => Math.random() - 0.5)

    const newQuestions = []

    for (let i = 0; i < numQuestions; i++) {
      // Randomly select question type
      const questionTypes: QuestionType[] = ["hanziToTranslation", "translationToHanzi", "pinyinToHanzi"]
      const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)]

      // Current word is the correct answer
      const correctWord = shuffledVocab[i]

      // Generate 3 wrong answers (ensure they're different from correct answer)
      const wrongAnswers = []
      const usedIndices = new Set([i])

      while (wrongAnswers.length < 3) {
        const randomIndex = Math.floor(Math.random() * shuffledVocab.length)
        if (!usedIndices.has(randomIndex)) {
          usedIndices.add(randomIndex)
          wrongAnswers.push(shuffledVocab[randomIndex])
        }
      }

      // Create question based on type
      let question, correctAnswer, options

      switch (questionType) {
        case "hanziToTranslation":
          question = {
            prompt: `What does "${correctWord.hanzi}" mean?`,
            correctAnswer: correctWord.translation,
            options: [correctWord.translation, ...wrongAnswers.map((word) => word.translation)].sort(
              () => Math.random() - 0.5,
            ),
          }
          break

        case "translationToHanzi":
          question = {
            prompt: `How do you write "${correctWord.translation}" in Chinese?`,
            correctAnswer: correctWord.hanzi,
            options: [correctWord.hanzi, ...wrongAnswers.map((word) => word.hanzi)].sort(() => Math.random() - 0.5),
          }
          break

        case "pinyinToHanzi":
          question = {
            prompt: `Which character corresponds to the pronunciation "${correctWord.pinyin}"?`,
            correctAnswer: correctWord.hanzi,
            options: [correctWord.hanzi, ...wrongAnswers.map((word) => word.hanzi)].sort(() => Math.random() - 0.5),
          }
          break
      }

      newQuestions.push(question)
    }

    setQuestions(newQuestions)
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setQuizState("question")
    setQuestionResults([])
  }

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    setQuizState("feedback")

    const isCorrect = answer === questions[currentQuestionIndex].correctAnswer

    // Update question results
    const newResults = [...questionResults]
    newResults[currentQuestionIndex] = isCorrect
    setQuestionResults(newResults)

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1)
    }
  }

  // Move to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      setSelectedAnswer(null)
      setQuizState("question")
    } else {
      setQuizState("results")
    }
  }

  // Restart the quiz
  const handleRestartQuiz = () => {
    generateQuiz()
  }

  // If no questions are available yet
  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-64">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-8 h-8" style={{ backgroundColor: BAUHAUS_COLORS.yellow }}></div>
          <div className="absolute bottom-0 right-0 w-8 h-8" style={{ backgroundColor: BAUHAUS_COLORS.red }}></div>
          <div
            className="absolute top-0 right-0 w-8 h-8 rounded-full"
            style={{ backgroundColor: BAUHAUS_COLORS.blue }}
          ></div>
          <div
            className="absolute bottom-0 left-0 w-8 h-8 rounded-full animate-pulse"
            style={{ backgroundColor: BAUHAUS_COLORS.black }}
          ></div>
        </div>
        <p className="mt-6 text-lg font-bold uppercase tracking-wider">Generating quiz</p>
      </div>
    )
  }

  // Current question
  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      {/* Header with back button and progress */}
      <div className="w-full flex justify-between items-center mb-8">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex items-center border-2 rounded-none"
          style={{ borderColor: BAUHAUS_COLORS.black }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="uppercase tracking-wide text-sm font-bold">Back</span>
        </Button>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute -top-1 -left-1 w-6 h-6" style={{ backgroundColor: BAUHAUS_COLORS.yellow }}></div>
            <div
              className="relative z-10 px-3 py-1 font-bold"
              style={{
                backgroundColor: BAUHAUS_COLORS.white,
                border: `2px solid ${BAUHAUS_COLORS.black}`,
              }}
            >
              HSK {level}
            </div>
          </div>

          <div
            className="text-sm font-bold px-3 py-1"
            style={{
              backgroundColor: BAUHAUS_COLORS.blue,
              color: BAUHAUS_COLORS.white,
            }}
          >
            {currentQuestionIndex + 1}/{questions.length}
          </div>
        </div>
      </div>

      {/* Quiz progress bar with Bauhaus style and color-coded segments */}
      <div
        className="w-full h-8 mb-8 relative flex"
        style={{
          backgroundColor: BAUHAUS_COLORS.white,
          border: `2px solid ${BAUHAUS_COLORS.black}`,
        }}
      >
        {/* Render segments for each question */}
        {questions.map((_, index) => {
          // Determine segment color based on question status
          let segmentColor = BAUHAUS_COLORS.white // Default for unanswered questions

          if (index < currentQuestionIndex) {
            // Past question - show result
            segmentColor = questionResults[index] ? "#4CAF50" : BAUHAUS_COLORS.red
          } else if (index === currentQuestionIndex) {
            // Current question
            segmentColor = BAUHAUS_COLORS.blue
          }

          return (
            <div
              key={index}
              className="h-full transition-all duration-300"
              style={{
                width: `${100 / questions.length}%`,
                backgroundColor: segmentColor,
                borderRight: index < questions.length - 1 ? `2px solid ${BAUHAUS_COLORS.black}` : "none",
              }}
            >
              {/* Show question number */}
              <div className="h-full flex items-center justify-center">
                <span
                  className="text-xs font-bold"
                  style={{
                    color:
                      segmentColor === BAUHAUS_COLORS.blue || segmentColor === BAUHAUS_COLORS.red
                        ? BAUHAUS_COLORS.white
                        : BAUHAUS_COLORS.black,
                  }}
                >
                  {index + 1}
                </span>
              </div>
            </div>
          )
        })}

        {/* Legend */}
        <div className="absolute -bottom-6 left-0 flex items-center text-xs gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1" style={{ backgroundColor: "#4CAF50" }}></div>
            <span>Correct</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1" style={{ backgroundColor: BAUHAUS_COLORS.red }}></div>
            <span>Incorrect</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1" style={{ backgroundColor: BAUHAUS_COLORS.blue }}></div>
            <span>Current</span>
          </div>
        </div>
      </div>

      {quizState === "question" || quizState === "feedback" ? (
        <>
          {/* Question container with Bauhaus design */}
          <div className="w-full mb-8 relative">
            <div
              className="absolute -top-3 -right-3 w-12 h-12 rotate-45"
              style={{ backgroundColor: BAUHAUS_COLORS.yellow }}
            ></div>
            <div
              className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full"
              style={{ backgroundColor: BAUHAUS_COLORS.red }}
            ></div>

            <div
              className="p-8 relative z-10"
              style={{
                backgroundColor: BAUHAUS_COLORS.white,
                border: `2px solid ${BAUHAUS_COLORS.black}`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm uppercase tracking-wider font-bold">Question {currentQuestionIndex + 1}</div>
                <div className="flex items-center">
                  <div className="text-sm uppercase tracking-wider font-bold mr-2">Score</div>
                  <div
                    className="w-8 h-8 flex items-center justify-center font-bold"
                    style={{
                      backgroundColor: BAUHAUS_COLORS.blue,
                      color: BAUHAUS_COLORS.white,
                    }}
                  >
                    {score}
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-2 relative">
                <span className="relative z-10">{currentQuestion.prompt}</span>
                <div
                  className="absolute bottom-0 left-0 h-3 w-1/3"
                  style={{ backgroundColor: BAUHAUS_COLORS.yellow, zIndex: 0 }}
                ></div>
              </h3>
            </div>
          </div>

          {/* Answer options with Bauhaus-inspired design */}
          <div className="w-full grid grid-cols-1 gap-4 mb-8">
            {currentQuestion.options.map((option: string, index: number) => {
              const isSelected = selectedAnswer === option
              const isCorrect = option === currentQuestion.correctAnswer

              // Determine button style based on quiz state and selection
              let buttonStyle = {}
              let textColor = BAUHAUS_COLORS.black
              let borderColor = BAUHAUS_COLORS.black

              if (quizState === "feedback") {
                if (isCorrect) {
                  buttonStyle = {
                    backgroundColor: "#4CAF50", // Green for correct
                    color: BAUHAUS_COLORS.white,
                  }
                  textColor = BAUHAUS_COLORS.white
                  borderColor = "#4CAF50"
                } else if (isSelected && !isCorrect) {
                  buttonStyle = {
                    backgroundColor: BAUHAUS_COLORS.red,
                    color: BAUHAUS_COLORS.white,
                  }
                  textColor = BAUHAUS_COLORS.white
                  borderColor = BAUHAUS_COLORS.red
                }
              } else {
                buttonStyle = {
                  backgroundColor: isSelected ? BAUHAUS_COLORS.blue : BAUHAUS_COLORS.white,
                  color: isSelected ? BAUHAUS_COLORS.white : BAUHAUS_COLORS.black,
                }
              }

              return (
                <motion.div
                  key={index}
                  className="relative"
                  whileHover={quizState === "question" ? { x: 4, y: -4 } : {}}
                  whileTap={quizState === "question" ? { x: 0, y: 0 } : {}}
                >
                  {/* Shadow element for 3D effect */}
                  <div
                    className={cn(
                      "absolute top-2 left-2 w-full h-full transition-all duration-150",
                      quizState === "question" && "hover:top-1 hover:left-1",
                    )}
                    style={{
                      backgroundColor: BAUHAUS_COLORS.black,
                      zIndex: 0,
                    }}
                  ></div>

                  <button
                    className="p-4 border-2 text-left relative flex items-center w-full z-10"
                    style={{
                      ...buttonStyle,
                      borderColor: borderColor,
                    }}
                    onClick={() => quizState === "question" && handleAnswerSelect(option)}
                    disabled={quizState === "feedback"}
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center mr-4 border-2 font-bold text-lg"
                      style={{
                        borderColor: borderColor,
                        color: textColor,
                      }}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg font-medium" style={{ color: textColor }}>
                      {option}
                    </span>

                    {quizState === "feedback" && isCorrect && (
                      <CheckCircle className="absolute right-4 h-6 w-6 text-white" />
                    )}
                    {quizState === "feedback" && isSelected && !isCorrect && (
                      <XCircle className="absolute right-4 h-6 w-6 text-white" />
                    )}
                  </button>
                </motion.div>
              )
            })}
          </div>

          {/* Feedback and next button */}
          {quizState === "feedback" && (
            <div className="w-full">
              <div
                className="p-4 mb-6 relative"
                style={{
                  backgroundColor: selectedAnswer === currentQuestion.correctAnswer ? "#E8F5E9" : "#FFEBEE",
                  border: `2px solid ${selectedAnswer === currentQuestion.correctAnswer ? "#4CAF50" : BAUHAUS_COLORS.red}`,
                }}
              >
                {/* Decorative element */}
                <div
                  className="absolute top-0 right-0 w-8 h-8"
                  style={{
                    backgroundColor: selectedAnswer === currentQuestion.correctAnswer ? "#4CAF50" : BAUHAUS_COLORS.red,
                    transform: "translateY(-50%) translateX(50%) rotate(45deg)",
                  }}
                ></div>

                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <p className="font-bold text-green-800 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Correct! Good answer.
                  </p>
                ) : (
                  <div>
                    <p className="font-bold text-red-800 flex items-center">
                      <XCircle className="h-5 w-5 mr-2" />
                      Incorrect.
                    </p>
                    <p className="mt-2">
                      The correct answer is: <strong>{currentQuestion.correctAnswer}</strong>
                    </p>
                  </div>
                )}
              </div>

              <Button
                onClick={handleNextQuestion}
                className="w-full py-4 rounded-none border-2 uppercase tracking-wider font-bold text-lg relative"
                style={{
                  backgroundColor: BAUHAUS_COLORS.blue,
                  color: BAUHAUS_COLORS.white,
                  borderColor: BAUHAUS_COLORS.black,
                }}
              >
                <div
                  className="absolute -top-2 -left-2 w-4 h-4"
                  style={{ backgroundColor: BAUHAUS_COLORS.yellow }}
                ></div>
                <div
                  className="absolute -bottom-2 -right-2 w-4 h-4"
                  style={{ backgroundColor: BAUHAUS_COLORS.red }}
                ></div>
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "View Results"}
              </Button>
            </div>
          )}
        </>
      ) : (
        // Results screen with Bauhaus design
        <div className="w-full relative">
          {/* Decorative elements */}
          <div
            className="absolute -top-4 -left-4 w-16 h-16 rounded-full"
            style={{ backgroundColor: BAUHAUS_COLORS.yellow }}
          ></div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16" style={{ backgroundColor: BAUHAUS_COLORS.red }}></div>
          <div className="absolute top-1/4 -right-8 w-16 h-2" style={{ backgroundColor: BAUHAUS_COLORS.blue }}></div>
          <div className="absolute bottom-1/4 -left-8 w-16 h-2" style={{ backgroundColor: BAUHAUS_COLORS.black }}></div>

          <div className="p-8 border-2 relative z-10 bg-white" style={{ borderColor: BAUHAUS_COLORS.black }}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold uppercase tracking-wider mb-6 relative inline-block">
                Quiz Completed
                <div
                  className="absolute bottom-0 left-0 h-3 w-full"
                  style={{ backgroundColor: BAUHAUS_COLORS.yellow, zIndex: -1 }}
                ></div>
              </h2>

              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full transform rotate-45"
                    style={{
                      backgroundColor: BAUHAUS_COLORS.black,
                      zIndex: 0,
                    }}
                  ></div>
                  <div
                    className="w-32 h-32 rounded-full flex items-center justify-center text-3xl font-bold relative z-10"
                    style={{
                      backgroundColor: score > questions.length / 2 ? BAUHAUS_COLORS.blue : BAUHAUS_COLORS.red,
                      color: BAUHAUS_COLORS.white,
                      border: `4px solid ${BAUHAUS_COLORS.black}`,
                    }}
                  >
                    {score}/{questions.length}
                  </div>
                </div>
              </div>

              <p className="text-xl font-bold mb-4">
                {score === questions.length && "Perfect! You got all questions right."}
                {score >= questions.length / 2 && score < questions.length && "Good job! You passed the quiz."}
                {score < questions.length / 2 && "Keep practicing to improve your score."}
              </p>

              <div
                className="inline-block px-4 py-2"
                style={{
                  backgroundColor: BAUHAUS_COLORS.yellow,
                  border: `2px solid ${BAUHAUS_COLORS.black}`,
                }}
              >
                <p className="text-lg font-bold">Score: {Math.round((score / questions.length) * 100)}%</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div whileHover={{ x: 4, y: -4 }} whileTap={{ x: 0, y: 0 }} className="relative">
                <div
                  className="absolute top-2 left-2 w-full h-full"
                  style={{ backgroundColor: BAUHAUS_COLORS.black }}
                ></div>
                <Button
                  onClick={handleRestartQuiz}
                  className="w-full py-4 flex items-center justify-center rounded-none border-2 uppercase tracking-wider font-bold relative z-10"
                  style={{
                    backgroundColor: BAUHAUS_COLORS.yellow,
                    color: BAUHAUS_COLORS.black,
                    borderColor: BAUHAUS_COLORS.black,
                  }}
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Restart Quiz
                </Button>
              </motion.div>

              <motion.div whileHover={{ x: 4, y: -4 }} whileTap={{ x: 0, y: 0 }} className="relative">
                <div
                  className="absolute top-2 left-2 w-full h-full"
                  style={{ backgroundColor: BAUHAUS_COLORS.black }}
                ></div>
                <Button
                  onClick={onBack}
                  className="w-full py-4 rounded-none border-2 uppercase tracking-wider font-bold relative z-10"
                  style={{
                    backgroundColor: BAUHAUS_COLORS.blue,
                    color: BAUHAUS_COLORS.white,
                    borderColor: BAUHAUS_COLORS.black,
                  }}
                >
                  Back to Game Modes
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

