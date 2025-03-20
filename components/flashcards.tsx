"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, RotateCw, Eye, EyeOff } from "lucide-react"
import { getVocabularyByLevel } from "@/lib/vocabulary"
import type { VocabularyItem } from "@/lib/vocabulary"
import { cn } from "@/lib/utils"

interface FlashcardsProps {
  level: number | null
  onBack: () => void
}

export function Flashcards({ level, onBack }: FlashcardsProps) {
  const [cards, setCards] = useState<VocabularyItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showPinyin, setShowPinyin] = useState(true)
  const [flipped, setFlipped] = useState(false)

  // Load vocabulary based on selected level
  useEffect(() => {
    if (level) {
      const vocabularyItems = getVocabularyByLevel(level)
      // Shuffle the cards for better learning experience
      const shuffled = [...vocabularyItems].sort(() => Math.random() - 0.5)
      setCards(shuffled)
      setCurrentIndex(0)
      setLoading(false)
    }
  }, [level])

  // Handle navigation between cards
  const goToNextCard = () => {
    setShowTranslation(false)
    setFlipped(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
  }

  const goToPrevCard = () => {
    setShowTranslation(false)
    setFlipped(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length)
  }

  // Toggle translation visibility
  const toggleTranslation = () => {
    setFlipped(!flipped)
    setShowTranslation(!showTranslation)
  }

  const togglePinyin = () => {
    setShowPinyin(!showPinyin)
  }

  // Shuffle cards
  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setCurrentIndex(0)
    setShowTranslation(false)
    setFlipped(false)
  }

  if (!level) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold mb-4">Please select a level first</h2>
        <Button onClick={onBack} className="bg-[#21409a] hover:bg-[#21409a]/80">
          Go Back
        </Button>
      </div>
    )
  }

  if (loading) {
    return <div className="text-center p-8">Loading...</div>
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold mb-4">No vocabulary found for HSK {level}</h2>
        <Button onClick={onBack} className="bg-[#21409a] hover:bg-[#21409a]/80">
          Go Back
        </Button>
      </div>
    )
  }

  const currentCard = cards[currentIndex]

  return (
    <div className="flex flex-col items-center p-4 max-w-4xl mx-auto">
      <div className="w-full flex justify-between items-center mb-8">
        <Button variant="outline" onClick={onBack} className="border-[#000000] text-[#000000] hover:bg-[#000000]/10">
          Back to Levels
        </Button>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-[#be1e2d]"></div>
          <h2 className="text-xl font-bold">HSK Level {level}</h2>
          <div className="h-4 w-4 rounded-full bg-[#ffde17]"></div>
        </div>
        <div className="text-sm font-medium px-3 py-1 bg-[#21409a] text-white rounded">
          {currentIndex + 1} / {cards.length}
        </div>
      </div>

      {/* Flashcard container with perspective */}
      <div className="perspective-1000 w-full max-w-md mb-8">
        <div
          className={cn(
            "relative w-full transition-transform duration-500 transform-style-3d cursor-pointer",
            flipped ? "rotate-y-180" : "",
          )}
          onClick={toggleTranslation}
          style={{ height: "320px" }}
        >
          {/* Front of card */}
          <div
            className={cn(
              "absolute w-full h-full backface-hidden rounded-none border-4 border-[#000000] flex flex-col items-center justify-center p-6",
              flipped ? "invisible" : "visible",
            )}
          >
            <div className="absolute top-0 left-0 h-12 w-12 bg-[#ffde17]"></div>
            <div className="absolute bottom-0 right-0 h-12 w-12 bg-[#be1e2d]"></div>

            <div className="text-6xl font-bold mb-6">{currentCard.hanzi}</div>
            {showPinyin && <div className="text-2xl text-[#21409a] font-medium">{currentCard.pinyin}</div>}

            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-sm text-[#000000]/70">Click to flip</p>
            </div>
          </div>

          {/* Back of card */}
          <div
            className={cn(
              "absolute w-full h-full backface-hidden rounded-none border-4 border-[#000000] flex flex-col items-center justify-center p-6 rotate-y-180 bg-[#21409a]",
              flipped ? "visible" : "invisible",
            )}
          >
            <div className="absolute top-0 right-0 h-12 w-12 bg-[#ffde17]"></div>
            <div className="absolute bottom-0 left-0 h-12 w-12 bg-[#be1e2d]"></div>

            <div className="text-4xl font-bold mb-4 text-white">{currentCard.hanzi}</div>
            {showPinyin && <div className="text-xl text-[#ffde17] mb-6">{currentCard.pinyin}</div>}
            <div className="text-2xl text-white font-medium">{currentCard.translation}</div>

            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-sm text-white/70">Click to flip back</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-md">
        <Button
          onClick={goToPrevCard}
          className="bg-[#000000] hover:bg-[#000000]/80 text-white h-auto py-2 px-3 flex items-center justify-center text-sm"
        >
          <ChevronLeft className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="whitespace-nowrap">Previous</span>
        </Button>

        <Button
          onClick={togglePinyin}
          className="bg-[#ffde17] hover:bg-[#ffde17]/80 text-[#000000] h-auto py-2 px-3 flex items-center justify-center text-sm"
        >
          {showPinyin ? (
            <>
              <EyeOff className="h-4 w-4 mr-1 flex-shrink-0" /> <span className="whitespace-nowrap">Pinyin ✓</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-1 flex-shrink-0" /> <span className="whitespace-nowrap">Pinyin ✗</span>
            </>
          )}
        </Button>

        <Button
          onClick={shuffleCards}
          className="bg-[#be1e2d] hover:bg-[#be1e2d]/80 text-white h-auto py-2 px-3 flex items-center justify-center text-sm"
        >
          <RotateCw className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="whitespace-nowrap">Shuffle</span>
        </Button>

        <Button
          onClick={goToNextCard}
          className="bg-[#000000] hover:bg-[#000000]/80 text-white h-auto py-2 px-3 flex items-center justify-center text-sm"
        >
          <span className="whitespace-nowrap">Next</span>
          <ChevronRight className="h-4 w-4 ml-1 flex-shrink-0" />
        </Button>
      </div>
    </div>
  )
}

