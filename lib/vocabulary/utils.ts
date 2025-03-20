import type { VocabularyItem } from "./index"
import fs from "fs"
import path from "path"

/**
 * Utilidad para guardar vocabulario importado en el archivo correspondiente
 * Nota: Esta función solo funciona en entorno Node.js, no en el navegador
 */
export async function saveVocabularyToFile(level: number, words: [string, string, string][]): Promise<boolean> {
  try {
    const filePath = path.join(process.cwd(), `lib/vocabulary/hsk${level}.ts`)

    // Formatear el contenido del archivo
    const fileContent = `// Vocabulario HSK nivel ${level}
// Formato: [hanzi, pinyin, traducción]
export const HSK${level}_WORDS: [string, string, string][] = ${JSON.stringify(words, null, 2)
      .replace(/\[/g, "\n  [")
      .replace(/\],\n/g, "],\n")
      .replace(/\]\]/g, "]\n]")}
`

    // Escribir el archivo
    await fs.promises.writeFile(filePath, fileContent, "utf8")
    return true
  } catch (error) {
    console.error("Error al guardar el vocabulario:", error)
    return false
  }
}

/**
 * Utilidad para buscar palabras en el vocabulario
 */
export function searchVocabulary(query: string, allWords: VocabularyItem[]): VocabularyItem[] {
  const lowerQuery = query.toLowerCase()

  return allWords.filter(
    (word) =>
      word.hanzi.includes(query) ||
      word.pinyin.toLowerCase().includes(lowerQuery) ||
      word.translation.toLowerCase().includes(lowerQuery),
  )
}

/**
 * Obtener estadísticas del vocabulario
 */
export function getVocabularyStats(allWords: VocabularyItem[]) {
  return {
    totalWords: allWords.length,
    uniqueCharacters: new Set(allWords.flatMap((word) => word.hanzi.split(""))).size,
  }
}

