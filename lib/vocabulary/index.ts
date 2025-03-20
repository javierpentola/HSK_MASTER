// Importar vocabulario de cada nivel
import { HSK1_WORDS } from "./hsk1"
import { HSK2_WORDS } from "./hsk2"
import { HSK3_WORDS } from "./hsk3"
import { HSK4_WORDS } from "./hsk4"
import { HSK5_WORDS } from "./hsk5"
import { HSK6_WORDS } from "./hsk6"

// Estructura para almacenar el vocabulario HSK
export interface VocabularyItem {
  hanzi: string
  pinyin: string
  translation: string
  example?: string
  exampleTranslation?: string
}

// Tipo para entradas simplificadas
type SimpleVocabularyEntry = [string, string, string]

// Función para convertir entradas simples a objetos VocabularyItem
function convertSimpleEntries(entries: SimpleVocabularyEntry[]): VocabularyItem[] {
  return entries.map(([hanzi, pinyin, translation]) => ({
    hanzi,
    pinyin,
    translation,
  }))
}

// Estructura de niveles HSK con vocabulario convertido
export const HSK_VOCABULARY = [
  { level: 1, words: convertSimpleEntries(HSK1_WORDS) },
  { level: 2, words: convertSimpleEntries(HSK2_WORDS) },
  { level: 3, words: convertSimpleEntries(HSK3_WORDS) },
  { level: 4, words: convertSimpleEntries(HSK4_WORDS) },
  { level: 5, words: convertSimpleEntries(HSK5_WORDS) },
  { level: 6, words: convertSimpleEntries(HSK6_WORDS) },
]

// Función para obtener vocabulario por nivel
export function getVocabularyByLevel(level: number): VocabularyItem[] {
  const levelData = HSK_VOCABULARY.find((l) => l.level === level)

  // Agregar logs para depuración
  console.log(`Intentando cargar vocabulario para HSK ${level}`)
  console.log(`Datos encontrados:`, levelData)

  if (!levelData || levelData.words.length === 0) {
    console.warn(`No se encontró vocabulario para HSK ${level} o está vacío`)
  }

  return levelData?.words || []
}

// Función para importar vocabulario desde CSV
export function importFromCSV(csvText: string, level: number): VocabularyItem[] {
  const lines = csvText.trim().split("\n")
  const words: VocabularyItem[] = []

  for (const line of lines) {
    const [hanzi, pinyin, translation] = line.split(",").map((item) => item.trim())
    if (hanzi && pinyin && translation) {
      words.push({ hanzi, pinyin, translation })
    }
  }

  // Actualizar el nivel correspondiente
  const levelIndex = HSK_VOCABULARY.findIndex((l) => l.level === level)
  if (levelIndex !== -1) {
    HSK_VOCABULARY[levelIndex].words = words
  }

  return words
}

// Función para exportar vocabulario a CSV
export function exportToCSV(level: number): string {
  const words = getVocabularyByLevel(level)
  return words.map((word) => `${word.hanzi},${word.pinyin},${word.translation}`).join("\n")
}

