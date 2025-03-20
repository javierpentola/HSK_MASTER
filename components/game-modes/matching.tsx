"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getVocabularyByLevel } from "@/lib/vocabulary"
import type { VocabularyItem } from "@/lib/vocabulary"
import { ArrowLeft, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

// Bauhaus color palette
const BAUHAUS_COLORS = {
  black: "#000000",
  red: "#be1e2d",
  yellow: "#ffde17",
  white: "#ffffff",
  blue: "#21409a",
}

type MatchingMode = "pinyin-hanzi" | "translation-hanzi"
type GameState = "selecting-mode" | "playing" | "results"

interface MatchingProps {
  level: number
  onBack: () => void
}

interface Card {
  id: string
  content: string
  type: "hanzi" | "pinyin" | "translation"
  matched: boolean
  selected: boolean
  pairId: string
}

export function Matching({ level, onBack }: MatchingProps) {
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([])
  const [gameState, setGameState] = useState<GameState>("selecting-mode")
  const [matchingMode, setMatchingMode] = useState<MatchingMode>("pinyin-hanzi")
  const [cards, setCards] = useState<Card[]>([])
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)
  const [gameCompleted, setGameCompleted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  // Load vocabulary based on selected level
  useEffect(() => {
    const loadVocabulary = async () => {
      setLoading(true)
      const vocabData = getVocabularyByLevel(level)
      if (vocabData.length > 0) {
        setVocabulary(vocabData)
      }
      setLoading(false)
    }

    loadVocabulary()
  }, [level])

  // Start the game with the selected mode
  const startGame = (mode: MatchingMode) => {
    setMatchingMode(mode)
    generateCards(mode)
    setGameState("playing")
    setMoves(0)
    setMatchedPairs(0)
    setGameCompleted(false)
  }

  // Generate cards based on the selected mode
  const generateCards = (mode: MatchingMode) => {
    // Shuffle vocabulary and take a subset for the game
    const shuffledVocab = [...vocabulary].sort(() => Math.random() - 0.5)
    const gameVocab = shuffledVocab.slice(0, 8) // 8 pairs = 16 cards

    const newCards: Card[] = []

    // Create pairs based on the selected mode
    gameVocab.forEach((item, index) => {
      const pairId = `pair-${index}`

      // First card is always hanzi
      newCards.push({
        id: `hanzi-${index}`,
        content: item.hanzi,
        type: "hanzi",
        matched: false,
        selected: false,
        pairId,
      })

      // Second card depends on the mode
      if (mode === "pinyin-hanzi") {
        newCards.push({
          id: `pinyin-${index}`,
          content: item.pinyin,
          type: "pinyin",
          matched: false,
          selected: false,
          pairId,
        })
      } else {
        // translation-hanzi
        newCards.push({
          id: `translation-${index}`,
          content: item.translation,
          type: "translation",
          matched: false,
          selected: false,
          pairId,
        })
      }
    })

    // Shuffle the cards
    const shuffledCards = [...newCards].sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
  }

  // Handle card selection
  const handleCardClick = (card: Card) => {
    // Ignore if card is already matched or selected
    if (card.matched || card.selected) return

    // Update the selected state of the card
    const updatedCards = cards.map((c) => (c.id === card.id ? { ...c, selected: true } : c))
    setCards(updatedCards)

    // If no card is selected yet, set this as the selected card
    if (!selectedCard) {
      setSelectedCard(card)
      return
    }

    // If a card is already selected, check if it matches with the current card
    setMoves((prev) => prev + 1)

    // Check if the cards match (have the same pairId)
    if (selectedCard.pairId === card.pairId) {
      // Match found
      const matchedCards = updatedCards.map((c) =>
        c.id === card.id || c.id === selectedCard.id ? { ...c, matched: true, selected: false } : c,
      )
      setCards(matchedCards)
      setMatchedPairs((prev) => prev + 1)
      setSelectedCard(null)

      // Check if all pairs are matched
      if (matchedPairs + 1 === vocabulary.slice(0, 8).length) {
        // Game completed
        setTimeout(() => {
          setGameCompleted(true)
          setGameState("results")
        }, 1000)
      }
    } else {
      // No match, flip cards back after a delay
      setTimeout(() => {
        const resetCards = updatedCards.map((c) =>
          c.id === card.id || c.id === selectedCard.id ? { ...c, selected: false } : c,
        )
        setCards(resetCards)
        setSelectedCard(null)
      }, 1000)
    }
  }

  // Restart the game
  const restartGame = () => {
    setGameState("selecting-mode")
    setSelectedCard(null)
    setMatchedPairs(0)
    setMoves(0)
    setGameCompleted(false)
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-12 h-12 border-4 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium">Loading vocabulary...</p>
      </div>
    )
  }

  // Not enough vocabulary
  if (vocabulary.length < 8) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold mb-4">Not enough vocabulary for HSK {level}</h2>
        <p className="mb-6">At least 8 vocabulary items are needed for the matching game.</p>
        <Button onClick={onBack} className="bg-[#21409a] hover:bg-[#21409a]/80">
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      {/* Header with back button */}
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

          {gameState === "playing" && (
            <div
              className="text-sm font-bold px-3 py-1"
              style={{
                backgroundColor: BAUHAUS_COLORS.blue,
                color: BAUHAUS_COLORS.white,
              }}
            >
              Pairs: {matchedPairs}/{cards.length / 2} | Moves: {moves}
            </div>
          )}
        </div>
      </div>

      {/* Game content based on state */}
      {gameState === "selecting-mode" && (
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-wide relative inline-block">
              Matching Game
              <div
                className="absolute bottom-0 left-0 h-3 w-full"
                style={{ backgroundColor: BAUHAUS_COLORS.yellow, zIndex: -1 }}
              ></div>
            </h2>
            <p className="text-lg">Select a matching mode to start the game:</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="relative">
              <div
                className="absolute top-2 left-2 w-full h-full"
                style={{ backgroundColor: BAUHAUS_COLORS.black }}
              ></div>
              <Button
                onClick={() => startGame("pinyin-hanzi")}
                className="w-full py-6 rounded-none border-2 uppercase tracking-wider font-bold text-lg relative z-10"
                style={{
                  backgroundColor: BAUHAUS_COLORS.red,
                  color: BAUHAUS_COLORS.white,
                  borderColor: BAUHAUS_COLORS.black,
                }}
              >
                Pinyin - Hanzi
              </Button>
            </div>

            <div className="relative">
              <div
                className="absolute top-2 left-2 w-full h-full"
                style={{ backgroundColor: BAUHAUS_COLORS.black }}
              ></div>
              <Button
                onClick={() => startGame("translation-hanzi")}
                className="w-full py-6 rounded-none border-2 uppercase tracking-wider font-bold text-lg relative z-10"
                style={{
                  backgroundColor: BAUHAUS_COLORS.blue,
                  color: BAUHAUS_COLORS.white,
                  borderColor: BAUHAUS_COLORS.black,
                }}
              >
                Translation - Hanzi
              </Button>
            </div>
          </div>
        </div>
      )}

      {gameState === "playing" && (
        <div className="w-full">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold mb-2 uppercase tracking-wide">
              {matchingMode === "pinyin-hanzi" ? "Match Pinyin with Hanzi" : "Match Translation with Hanzi"}
            </h2>
            <p className="text-sm">Click on two cards to find matching pairs</p>
          </div>

          {/* Game grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className={cn(
                  "aspect-[3/4] cursor-pointer transition-all duration-300 transform perspective-1000",
                  card.matched && "opacity-60",
                )}
                onClick={() => !card.matched && !card.selected && handleCardClick(card)}
              >
                <div
                  className={cn(
                    "w-full h-full transform-style-3d transition-transform duration-500",
                    (card.selected || card.matched) && "rotate-y-180",
                  )}
                >
                  {/* Card back */}
                  <div
                    className="absolute w-full h-full backface-hidden border-2 flex items-center justify-center"
                    style={{ borderColor: BAUHAUS_COLORS.black, backgroundColor: BAUHAUS_COLORS.white }}
                  >
                    <div
                      className={cn(
                        "absolute w-8 h-8",
                        card.type === "hanzi" ? "top-0 left-0" : "bottom-0 right-0",
                        card.type === "hanzi" ? "" : "rounded-full",
                      )}
                      style={{
                        backgroundColor: card.type === "hanzi" ? BAUHAUS_COLORS.yellow : BAUHAUS_COLORS.red,
                      }}
                    ></div>
                    <div className="text-4xl font-bold">?</div>
                  </div>

                  {/* Card front */}
                  <div
                    className="absolute w-full h-full backface-hidden rotate-y-180 border-2 flex items-center justify-center p-2"
                    style={{
                      borderColor: BAUHAUS_COLORS.black,
                      backgroundColor: card.type === "hanzi" ? BAUHAUS_COLORS.blue : BAUHAUS_COLORS.red,
                    }}
                  >
                    <div
                      className={cn(
                        "text-center break-words overflow-hidden",
                        card.type === "hanzi" ? "text-4xl" : "text-lg",
                      )}
                      style={{ color: BAUHAUS_COLORS.white }}
                    >
                      {card.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {gameState === "results" && (
        <div className="w-full max-w-md mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-wide relative inline-block">
              Game Completed!
              <div
                className="absolute bottom-0 left-0 h-3 w-full"
                style={{ backgroundColor: BAUHAUS_COLORS.yellow, zIndex: -1 }}
              ></div>
            </h2>

            <div className="flex items-center justify-center mb-6">
              <div
                className="w-32 h-32 rounded-full flex items-center justify-center text-3xl font-bold relative"
                style={{
                  backgroundColor: BAUHAUS_COLORS.blue,
                  color: BAUHAUS_COLORS.white,
                  border: `4px solid ${BAUHAUS_COLORS.black}`,
                }}
              >
                {cards.length / 2}/{cards.length / 2}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xl font-bold mb-2">You completed the matching game!</p>
              <p className="text-lg">
                Total moves: <span className="font-bold">{moves}</span>
              </p>
              <p className="text-lg">
                Performance:{" "}
                <span className="font-bold">
                  {moves <= cards.length
                    ? "Excellent!"
                    : moves <= cards.length * 1.5
                      ? "Great!"
                      : moves <= cards.length * 2
                        ? "Good!"
                        : "Keep practicing!"}
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative">
              <div
                className="absolute top-2 left-2 w-full h-full"
                style={{ backgroundColor: BAUHAUS_COLORS.black }}
              ></div>
              <Button
                onClick={restartGame}
                className="w-full py-4 flex items-center justify-center rounded-none border-2 uppercase tracking-wider font-bold relative z-10"
                style={{
                  backgroundColor: BAUHAUS_COLORS.yellow,
                  color: BAUHAUS_COLORS.black,
                  borderColor: BAUHAUS_COLORS.black,
                }}
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Play Again
              </Button>
            </div>

            <div className="relative">
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

