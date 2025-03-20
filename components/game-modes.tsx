"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const GAME_MODES = [
  {
    id: "flashcards",
    name: "Flashcards",
    description: "Learn characters with interactive cards",
    icon: "■",
    color: "red",
  },
  {
    id: "quiz",
    name: "Quiz",
    description: "Test your knowledge with questions",
    icon: "●",
    color: "blue",
  },
  {
    id: "matching",
    name: "Matching",
    description: "Connect characters with their meanings",
    icon: "▲",
    color: "yellow",
  },
  {
    id: "writing",
    name: "Writing",
    description: "Practice writing characters",
    icon: "◆",
    color: "red",
  },
  {
    id: "challenge",
    name: "Daily Challenge",
    description: "Complete daily challenges to improve",
    icon: "★",
    color: "blue",
  },
  {
    id: "spaced",
    name: "Spaced Repetition",
    description: "Optimize your long-term memory",
    icon: "◯",
    color: "yellow",
    inDevelopment: true,
  },
]

interface GameModesProps {
  bauhausColors?: {
    black: string
    red: string
    yellow: string
    white: string
    blue: string
  }
}

export function GameModes({ bauhausColors }: GameModesProps) {
  const [hoveredMode, setHoveredMode] = useState<string | null>(null)

  // Use Bauhaus colors if available, otherwise use default values
  const colors = bauhausColors || {
    black: "#000000",
    red: "#E53935",
    yellow: "#FDD835",
    white: "#ffffff",
    blue: "#1E88E5",
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {GAME_MODES.map((mode, index) => {
        const isEven = index % 2 === 0
        const colorValue = mode.color === "red" ? colors.red : mode.color === "blue" ? colors.blue : colors.yellow

        return (
          <div
            key={mode.id}
            className={cn(
              "relative bg-white p-6 border-2",
              "transition-all duration-300 hover:shadow-lg",
              hoveredMode === mode.id ? "transform translate-x-1 translate-y-1" : "",
            )}
            style={{ borderColor: colors.black }}
            onMouseEnter={() => setHoveredMode(mode.id)}
            onMouseLeave={() => setHoveredMode(null)}
          >
            {/* Decorative element */}
            <div
              className={cn(
                "absolute w-8 h-8",
                isEven ? "-top-4 -right-4" : "-bottom-4 -left-4",
                mode.icon === "●" || mode.icon === "◯"
                  ? "rounded-full"
                  : mode.icon === "▲"
                    ? "transform rotate-45"
                    : "",
              )}
              style={{ backgroundColor: colorValue }}
            ></div>

            <div className="flex items-start">
              <div
                className={cn("flex-shrink-0 w-12 h-12 flex items-center justify-center text-2xl mr-4", "border-2")}
                style={{
                  borderColor: colors.black,
                  backgroundColor: hoveredMode === mode.id ? colorValue : colors.white,
                  color: hoveredMode === mode.id ? colors.white : colors.black,
                }}
              >
                {mode.icon}
              </div>

              <div>
                <div className="flex items-center">
                  <h4 className="text-xl font-bold uppercase tracking-wide" style={{ color: colors.black }}>
                    {mode.name}
                  </h4>
                  {mode.inDevelopment && (
                    <span
                      className="ml-2 px-2 py-0.5 text-xs font-bold rounded-sm animate-pulse"
                      style={{
                        backgroundColor: colors.yellow,
                        color: colors.black,
                      }}
                    >
                      Still in development!
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{mode.description}</p>
              </div>
            </div>

            {/* Decorative line */}
            <div
              className={cn(
                "absolute bottom-3 right-3 h-0.5 transition-all duration-300",
                hoveredMode === mode.id ? "w-1/3" : "w-6",
              )}
              style={{ backgroundColor: colors.black }}
            ></div>
          </div>
        )
      })}
    </div>
  )
}

