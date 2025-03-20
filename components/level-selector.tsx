"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const HSK_LEVELS = [1, 2, 3, 4, 5, 6]

interface LevelSelectorProps {
  bauhausColors?: {
    black: string
    red: string
    yellow: string
    white: string
    blue: string
  }
  onSelectLevel?: (level: number) => void
}

export function LevelSelector({ bauhausColors, onSelectLevel }: LevelSelectorProps) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)

  // Usar colores Bauhaus si están disponibles, de lo contrario usar los valores por defecto
  const colors = bauhausColors || {
    black: "#000000",
    red: "#E53935",
    yellow: "#FDD835",
    white: "#ffffff",
    blue: "#1E88E5",
  }

  const handleLevelClick = (level: number) => {
    setSelectedLevel(level)
    if (onSelectLevel) {
      onSelectLevel(level)
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      {HSK_LEVELS.map((level, index) => {
        // Asignar un color y forma diferente a cada nivel
        const getBgColor = (isSelected: boolean) => {
          if (!isSelected) return colors.white

          switch (level % 3) {
            case 1:
              return colors.red
            case 2:
              return colors.blue
            case 0:
              return colors.yellow
            default:
              return colors.black
          }
        }

        const getShape = () => {
          switch (level % 3) {
            case 1:
              return "rounded-full" // Círculo
            case 2:
              return "" // Cuadrado
            case 0:
              return "transform rotate-45" // Diamante
            default:
              return ""
          }
        }

        return (
          <button key={level} onClick={() => handleLevelClick(level)} className="group relative">
            <div
              className={cn("relative h-24 border-2 transition-all duration-300", "hover:shadow-lg overflow-hidden")}
              style={{
                borderColor: colors.black,
                backgroundColor: selectedLevel === level ? getBgColor(true) : colors.white,
              }}
            >
              {/* Elemento decorativo */}
              <div
                className={cn(
                  "absolute w-6 h-6 transition-all duration-300",
                  getShape(),
                  selectedLevel === level ? "top-2 right-2" : "top-2 right-2 opacity-0 group-hover:opacity-100",
                )}
                style={{
                  backgroundColor: selectedLevel === level ? colors.white : colors.black,
                }}
              ></div>

              {/* Línea diagonal decorativa */}
              <div
                className={cn(
                  "absolute top-0 left-0 w-full h-full overflow-hidden",
                  selectedLevel === level ? "opacity-20" : "opacity-0 group-hover:opacity-10",
                )}
              >
                <div
                  className="absolute top-0 left-0 w-1/2 h-full transform -skew-x-12"
                  style={{ backgroundColor: colors.black }}
                ></div>
              </div>

              {/* Número de nivel */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span
                    className={cn("text-3xl font-bold transition-all duration-300")}
                    style={{
                      color: selectedLevel === level ? colors.white : colors.black,
                    }}
                  >
                    HSK {level}
                  </span>
                </div>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

