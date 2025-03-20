"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { VocabularyItem } from "@/lib/vocabulary"

export function VocabularyManager() {
  const [level, setLevel] = useState<string>("1")
  const [word, setWord] = useState<Partial<VocabularyItem>>({
    id: "",
    hanzi: "",
    pinyin: "",
    translation: "",
    example: "",
    exampleTranslation: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar la palabra en la estructura de datos
    console.log("Palabra a guardar:", { level, word })

    // Limpiar el formulario
    setWord({
      id: "",
      hanzi: "",
      pinyin: "",
      translation: "",
      example: "",
      exampleTranslation: "",
    })
  }

  return (
    <div className="border-2 border-black p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <div className="w-4 h-4 bg-blue-500 mr-2"></div>
        Administrador de Vocabulario
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="level">Nivel HSK</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="level">
                <SelectValue placeholder="Selecciona nivel" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((l) => (
                  <SelectItem key={l} value={l.toString()}>
                    HSK {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hanzi">Carácter (汉字)</Label>
            <Input
              id="hanzi"
              value={word.hanzi}
              onChange={(e) => setWord({ ...word, hanzi: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pinyin">Pinyin</Label>
            <Input
              id="pinyin"
              value={word.pinyin}
              onChange={(e) => setWord({ ...word, pinyin: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="translation">Traducción</Label>
            <Input
              id="translation"
              value={word.translation}
              onChange={(e) => setWord({ ...word, translation: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="example">Ejemplo (opcional)</Label>
          <Textarea
            id="example"
            value={word.example || ""}
            onChange={(e) => setWord({ ...word, example: e.target.value })}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="exampleTranslation">Traducción del ejemplo (opcional)</Label>
          <Textarea
            id="exampleTranslation"
            value={word.exampleTranslation || ""}
            onChange={(e) => setWord({ ...word, exampleTranslation: e.target.value })}
            rows={2}
          />
        </div>

        <Button type="submit" className="w-full bg-black text-white hover:bg-red-500 transition-colors">
          Guardar palabra
        </Button>
      </form>
    </div>
  )
}

