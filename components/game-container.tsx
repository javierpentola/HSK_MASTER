"use client"

import type React from "react"

import { useState } from "react"
import { LevelSelector } from "@/components/level-selector"
import { Flashcards } from "@/components/game-modes/flashcards"
import { Quiz } from "@/components/game-modes/quiz"
import { Matching } from "@/components/game-modes/matching"
import { Button } from "@/components/ui/button"
import { Writing } from "@/components/game-modes/writing"
import { RealExercises } from "@/components/game-modes/real-exercises"
import { WritingPractice } from "@/components/game-modes/writing-practice"
import { ReadingComprehension } from "@/components/game-modes/reading-comprehension"
import { ListeningComprehension } from "@/components/game-modes/listening-comprehension"

// Bauhaus color palette
const BAUHAUS_COLORS = {
  black: "#000000",
  red: "#be1e2d",
  yellow: "#ffde17",
  white: "#ffffff",
  blue: "#21409a",
}

type GameMode =
  | "select-level"
  | "select-game"
  | "flashcards"
  | "quiz"
  | "matching"
  | "writing"
  | "spaced"
  | "real-exercises"
  | "reading-comprehension"
  | "listening-comprehension"
  | "writing-practice"

export default function GameContainer() {
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
            {selectedLevel === 1 && (
              <GameModeCard
                id="real-exercises"
                name="Real Exercises"
                description="Complete real exercises combining reading, writing and listening skills"
                icon="□"
                color={BAUHAUS_COLORS.blue}
                onClick={() => handleGameSelect("real-exercises")}
              />
            )}
            {selectedLevel && selectedLevel > 1 && (
              <GameModeCard
                id="reading-comprehension"
                name="Reading Comprehension"
                description="Improve your Chinese reading skills with practical exercises"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 1024 1024"
                    className="w-6 h-6"
                  >
                    <path
                      fill="currentColor"
                      d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 0 0 324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3-32-32V193c0-17.7-14.3-32-32-32M404 553.5c0 4.1-3.2 7.5-7.1 7.5H211.1c-3.9 0-7.1-3.4-7.1-7.5v-45c0-4.1 3.2-7.5 7.1-7.5h185.7c3.9 0 7.1 3.4 7.1 7.5v45zm0-140c0 4.1-3.2 7.5-7.1 7.5H211.1c-3.9 0-7.1-3.4-7.1-7.5v-45c0-4.1 3.2-7.5 7.1-7.5h185.7c3.9 0 7.1 3.4 7.1 7.5v45zm416 140c0 4.1-3.2 7.5-7.1 7.5H627.1c-3.9 0-7.1-3.4-7.1-7.5v-45c0-4.1 3.2-7.5 7.1-7.5h185.7c3.9 0 7.1 3.4 7.1 7.5v45zm0-140c0 4.1-3.2 7.5-7.1 7.5H627.1c-3.9 0-7.1-3.4-7.1-7.5v-45c0-4.1 3.2-7.5 7.1-7.5h185.7c3.9 0 7.1 3.4 7.1 7.5v45z"
                    />
                  </svg>
                }
                color={BAUHAUS_COLORS.blue}
                onClick={() => handleGameSelect("reading-comprehension")}
              />
            )}
            {selectedLevel && selectedLevel > 1 && (
              <GameModeCard
                id="listening-comprehension"
                name="Listening Comprehension"
                description="Enhance your ability to understand spoken Chinese"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 512 512"
                    className="w-6 h-6"
                  >
                    <path
                      fill="currentColor"
                      d="M216 260c0 15.464-12.536 28-28 28s-28-12.536-28-28c0-44.112 35.888-80 80-80s80 35.888 80 80c0 15.464-12.536 28-28 28s-28-12.536-28-28c0-13.234-10.767-24-24-24s-24 10.766-24 24m24-176c-97.047 0-176 78.953-176 176c0 15.464 12.536 28 28 28s28-12.536 28-28c0-66.168 53.832-120 120-120s120 53.832 120 120c0 75.164-71.009 70.311-71.997 143.622L288 404c0 28.673-23.327 52-52 52c-15.464 0-28 12.536-28 28s12.536 28 28 28c59.475 0 107.876-48.328 108-107.774c.595-34.428 72-48.24 72-144.226c0-97.047-78.953-176-176-176m-80 236c-17.673 0-32 14.327-32 32s14.327 32 32 32s32-14.327 32-32s-14.327-32-32-32M32 448c-17.673 0-32 14.327-32 32s14.327 32 32 32s32-14.327 32-32s-14.327-32-32-32m480-187.993c0-1.518-.012-3.025-.045-4.531C510.076 140.525 436.157 38.47 327.994 1.511c-14.633-4.998-30.549 2.809-35.55 17.442s2.81 30.549 17.442 35.55c85.906 29.354 144.61 110.513 146.077 201.953l.003.188c.026 1.118.033 2.236.033 3.363c0 15.464 12.536 28 28 28s28.001-12.536 28.001-28M152.971 439.029l-80-80L39.03 392.97l80 80z"
                    />
                  </svg>
                }
                color={BAUHAUS_COLORS.red}
                onClick={() => handleGameSelect("listening-comprehension")}
              />
            )}
            {selectedLevel && selectedLevel > 1 && (
              <GameModeCard
                id="writing-practice"
                name="Writing Practice"
                description="Develop your Chinese writing skills through guided exercises"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="-0.5 -0.5 24 24"
                    className="w-6 h-6"
                  >
                    <path
                      fill="currentColor"
                      d="m21.289.98l.59.59c.813.814.69 2.257-.277 3.223L9.435 16.96l-3.942 1.442c-.495.182-.977-.054-1.075-.525a.93.93 0 0 1 .045-.51l1.47-3.976L18.066 1.257c.967-.966 2.41-1.09 3.223-.276zM8.904 2.19a1 1 0 1 1 0 2h-4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4a1 1 0 0 1 2 0v4a4 4 0 0 1-4 4h-12a4 4 0 0 1-4-4v-12a4 4 0 0 1 4-4z"
                    />
                  </svg>
                }
                color={BAUHAUS_COLORS.yellow}
                onClick={() => handleGameSelect("writing-practice")}
              />
            )}
          </div>
        </div>
      )}

      {gameMode === "flashcards" && selectedLevel && <Flashcards level={selectedLevel} onBack={handleBackToGames} />}
      {gameMode === "quiz" && selectedLevel && <Quiz level={selectedLevel} onBack={handleBackToGames} />}
      {gameMode === "matching" && selectedLevel && <Matching level={selectedLevel} onBack={handleBackToGames} />}
      {gameMode === "writing" && selectedLevel && <Writing level={selectedLevel} onBack={handleBackToGames} />}
      {gameMode === "real-exercises" && selectedLevel === 1 && (
        <RealExercises level={selectedLevel} />
      )}
      {gameMode === "reading-comprehension" && selectedLevel && selectedLevel > 1 && (
        <ReadingComprehension level={selectedLevel} onBack={handleBackToGames} />
      )}
      {gameMode === "listening-comprehension" && selectedLevel && selectedLevel > 1 && (
        <ListeningComprehension level={selectedLevel} onBack={handleBackToGames} />
      )}
      {gameMode === "writing-practice" && selectedLevel && selectedLevel > 1 && (
        <div className="p-8 border-2 border-black">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Writing Practice - HSK Level {selectedLevel}</h2>
            <Button variant="outline" onClick={handleBackToGames}>
              Back to Games
            </Button>
          </div>
          <WritingPractice level={selectedLevel} onBack={handleBackToGames} />
        </div>
      )}
    </div>
  )
}

interface GameModeCardProps {
  id: string
  name: string
  description: string
  icon: React.ReactNode
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

