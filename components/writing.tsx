"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, RotateCcw, Pencil, Eraser } from "lucide-react"
import { getVocabularyByLevel } from "@/lib/vocabulary"
import type { VocabularyItem } from "@/lib/vocabulary"
import { cn } from "@/lib/utils"

// Bauhaus color palette
const BAUHAUS_COLORS = {
  black: "#000000",
  red: "#be1e2d",
  yellow: "#ffde17",
  white: "#ffffff",
  blue: "#21409a",
}

interface WritingProps {
  level: number
  onBack: () => void
}

type Tool = "pencil" | "eraser"

export function Writing({ level, onBack }: WritingProps) {
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [activeTool, setActiveTool] = useState<Tool>("pencil")
  const [isDrawing, setIsDrawing] = useState(false)
  const [showPinyin, setShowPinyin] = useState(true)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  // Load vocabulary based on selected level
  useEffect(() => {
    const vocabData = getVocabularyByLevel(level)
    if (vocabData.length > 0) {
      // Shuffle the vocabulary for better practice
      const shuffled = [...vocabData].sort(() => Math.random() - 0.5)
      setVocabulary(shuffled)
      setLoading(false)
    }
  }, [level])

  // Initialize canvas when component mounts
  useEffect(() => {
    const setupCanvas = () => {
      const canvas = canvasRef.current
      const container = canvasContainerRef.current

      if (!canvas || !container) return

      // Set canvas dimensions to match container
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight

      // Fill with white background
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }

    setupCanvas()

    // Also set up canvas when window resizes
    window.addEventListener("resize", setupCanvas)
    return () => window.removeEventListener("resize", setupCanvas)
  }, [])

  // Drawing functions
  const getMousePos = (canvas: HTMLCanvasElement, evt: React.MouseEvent) => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY,
    }
  }

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    setIsDrawing(true)

    const pos = getMousePos(canvas, e)

    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)

    // Configure context based on active tool
    if (activeTool === "pencil") {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 3
    } else {
      ctx.globalCompositeOperation = "destination-out"
      ctx.lineWidth = 20
    }

    ctx.lineCap = "round"
    ctx.lineJoin = "round"
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const pos = getMousePos(canvas, e)

    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
  }

  const stopDraw = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.beginPath() // Reset the path
    }
  }

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }

  // Navigation between characters
  const goToNextCharacter = () => {
    clearCanvas()
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vocabulary.length)
  }

  const goToPrevCharacter = () => {
    clearCanvas()
    setCurrentIndex((prevIndex) => (prevIndex - 1 + vocabulary.length) % vocabulary.length)
  }

  if (loading || vocabulary.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        {loading ? (
          <p className="text-lg font-medium">Loading vocabulary...</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">No vocabulary found for HSK {level}</h2>
            <Button onClick={onBack} className="bg-[#21409a] hover:bg-[#21409a]/80">
              Go Back
            </Button>
          </>
        )}
      </div>
    )
  }

  const currentWord = vocabulary[currentIndex]

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      {/* Header with back button and navigation */}
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
            {currentIndex + 1} / {vocabulary.length}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Character display */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Character to Practice</h3>
          <div
            className="flex-1 border-2 flex flex-col items-center justify-center p-4"
            style={{ borderColor: BAUHAUS_COLORS.black, minHeight: "300px" }}
          >
            <div className="text-9xl font-bold mb-4">{currentWord.hanzi}</div>
            {showPinyin && <div className="text-2xl text-[#21409a] font-medium">{currentWord.pinyin}</div>}
            <div className="mt-2 text-lg">{currentWord.translation}</div>
          </div>
        </div>

        {/* Drawing canvas */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Practice Writing</h3>
          <div className="mb-4 p-3 border-l-4 bg-blue-50" style={{ borderColor: BAUHAUS_COLORS.blue }}>
            <p className="text-sm flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                style={{ color: BAUHAUS_COLORS.blue }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>We recommend using a graphics tablet for better practice experience!</span>
            </p>
          </div>
          <div
            ref={canvasContainerRef}
            className="flex-1 border-2 relative bg-white"
            style={{ borderColor: BAUHAUS_COLORS.black, minHeight: "300px" }}
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-crosshair"
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="w-full grid grid-cols-2 gap-4 mb-4">
        <div className="flex gap-2">
          <Button
            onClick={() => setActiveTool("pencil")}
            className={cn(
              "flex-1 flex items-center justify-center",
              activeTool === "pencil" ? "bg-[#21409a] text-white" : "bg-white text-[#000000] border-2 border-[#000000]",
            )}
          >
            <Pencil className="h-5 w-5 mr-2" />
            Pencil
          </Button>
          <Button
            onClick={() => setActiveTool("eraser")}
            className={cn(
              "flex-1 flex items-center justify-center",
              activeTool === "eraser" ? "bg-[#be1e2d] text-white" : "bg-white text-[#000000] border-2 border-[#000000]",
            )}
          >
            <Eraser className="h-5 w-5 mr-2" />
            Eraser
          </Button>
        </div>
        <Button
          onClick={clearCanvas}
          className="bg-[#ffde17] text-[#000000] border-2 border-[#000000] hover:bg-[#ffde17]/80"
        >
          <RotateCcw className="h-5 w-5 mr-2" />
          Clear Canvas
        </Button>
      </div>

      {/* Navigation */}
      <div className="w-full grid grid-cols-2 gap-4">
        <Button onClick={goToPrevCharacter} className="bg-[#000000] hover:bg-[#000000]/80 text-white">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Previous Character
        </Button>
        <Button onClick={goToNextCharacter} className="bg-[#000000] hover:bg-[#000000]/80 text-white">
          Next Character
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}

