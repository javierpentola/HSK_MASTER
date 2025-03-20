"use client"

import { useState } from "react"
import { LevelSelector } from "@/components/level-selector"
import { Flashcards } from "@/components/game-modes/flashcards"
import { Quiz } from "@/components/game-modes/quiz"
import { Matching } from "@/components/game-modes/matching"
import { Button } from "@/components/ui/button"
import { Writing } from "@/components/game-modes/writing"

// Bauhaus color palette
const BAUHAUS_COLORS = {
  black: "#000000",
  red: "#be1e2d",
  yellow: "#ffde17",
  white: "#ffffff",
  blue: "#21409a",
}

type GameMode = "select-level" | "select-game" | "flashcards" | "quiz" | "matching" | "writing" | "spaced"

export function GameContainer() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [gameMode, setGameMode] = useState<GameMode>("select-level")

  const handleLevelSelect = (level: number) => {
    setSelectedLevel(level)
    setGameMode("select-game")
  }

  const handleGameSelect = (mode: GameMode) => {
    setGameMode(mode)
  }

  const handleBackToLevels = () => {
    setSelectedLevel(null)
    setGameMode("select-level")
  }

  const handleBackToGames = () => {
    setGameMode("select-game")
  }

  return (
    <div className="container mx-auto p-4">
      {gameMode === "select-level" && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide flex items-center">
            <div className="w-6 h-6 mr-3 rounded-full" style={{ backgroundColor: BAUHAUS_COLORS.red }}></div>
            Select your HSK level
          </h2>
          <LevelSelector bauhausColors={BAUHAUS_COLORS} onSelectLevel={handleLevelSelect} />
        </div>
      )}

      {gameMode === "select-game" && selectedLevel && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold uppercase tracking-wide flex items-center">
              <div
                className="w-6 h-6 mr-3 transform rotate-45"
                style={{ backgroundColor: BAUHAUS_COLORS.yellow }}
              ></div>
              Select Game Mode - HSK Level {selectedLevel}
            </h2>
            <Button variant="outline" onClick={handleBackToLevels}>
              Change Level
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GameModeCard
              id="flashcards"
              name="Flashcards"
              description="Learn characters with interactive cards"
              icon="■"
              color={BAUHAUS_COLORS.red}
              onClick={() => handleGameSelect("flashcards")}
            />
            <GameModeCard
              id="quiz"
              name="Quiz"
              description="Test your knowledge with questions"
              icon="●"
              color={BAUHAUS_COLORS.blue}
              onClick={() => handleGameSelect("quiz")}
            />
            <GameModeCard
              id="matching"
              name="Matching"
              description="Connect characters with their meanings"
              icon="▲"
              color={BAUHAUS_COLORS.yellow}
              onClick={() => handleGameSelect("matching")}
            />
            <GameModeCard
              id="writing"
              name="Writing"
              description="Practice writing characters"
              icon="◆"
              color={BAUHAUS_COLORS.red}
              onClick={() => handleGameSelect("writing")}
              disabled={false}
            />
            <GameModeCard
              id="spaced"
              name="Spaced Repetition"
              description="Optimize your long-term memory"
              icon="◯"
              color={BAUHAUS_COLORS.yellow}
              onClick={() => handleGameSelect("spaced")}
              disabled
              inDevelopment
            />
          </div>
        </div>
      )}

      {gameMode === "flashcards" && selectedLevel && <Flashcards level={selectedLevel} onBack={handleBackToGames} />}
      {gameMode === "quiz" && selectedLevel && <Quiz level={selectedLevel} onBack={handleBackToGames} />}
      {gameMode === "matching" && selectedLevel && <Matching level={selectedLevel} onBack={handleBackToGames} />}
      {gameMode === "writing" && selectedLevel && <Writing level={selectedLevel} onBack={handleBackToGames} />}
    </div>
  )
}

interface GameModeCardProps {
  id: string
  name: string
  description: string
  icon: string
  color: string
  onClick: () => void
  disabled?: boolean
  inDevelopment?: boolean
}

function GameModeCard({
  id,
  name,
  description,
  icon,
  color,
  onClick,
  disabled = false,
  inDevelopment = false,
}: GameModeCardProps) {
  return (
    <div
      className={`relative bg-white p-6 border-2 transition-all duration-300 hover:shadow-lg ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      style={{ borderColor: BAUHAUS_COLORS.black }}
      onClick={disabled ? undefined : onClick}
    >
      {/* Decorative element */}
      <div className="absolute -top-4 -right-4 w-8 h-8" style={{ backgroundColor: color }}></div>

      <div className="flex items-start">
        <div
          className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-2xl mr-4 border-2"
          style={{
            borderColor: BAUHAUS_COLORS.black,
            backgroundColor: BAUHAUS_COLORS.white,
            color: BAUHAUS_COLORS.black,
          }}
        >
          {icon}
        </div>

        <div>
          <div className="flex items-center">
            <h4 className="text-xl font-bold uppercase tracking-wide" style={{ color: BAUHAUS_COLORS.black }}>
              {name}
            </h4>
            {disabled && !inDevelopment && (
              <span
                className="ml-2 px-2 py-0.5 text-xs font-bold rounded-sm"
                style={{
                  backgroundColor: BAUHAUS_COLORS.yellow,
                  color: BAUHAUS_COLORS.black,
                }}
              >
                Coming soon
              </span>
            )}
            {inDevelopment && (
              <span
                className="ml-2 px-2 py-0.5 text-xs font-bold rounded-sm animate-pulse"
                style={{
                  backgroundColor: BAUHAUS_COLORS.yellow,
                  color: BAUHAUS_COLORS.black,
                }}
              >
                Still in development!
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-3 right-3 h-0.5 w-6" style={{ backgroundColor: BAUHAUS_COLORS.black }}></div>
    </div>
  )
}

