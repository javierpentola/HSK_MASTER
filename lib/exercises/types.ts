export interface WritingExercise {
  id: string
  level: number
  question: string
  translation: string
  sampleAnswer: string
  minChars: number
  maxChars: number
  suggestedVocabulary?: {
    word: string
    translation: string
  }[]
}

export interface ReadingExercise {
  id: string
  level: number
  title: string
  text: string
  translation: string
  questions: {
    id: string
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }[]
}

export interface ListeningExercise {
  id: string
  level: number
  title: string
  audioUrl?: string
  transcript: string
  translation: string
  questions: {
    id: string
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }[]
}

export interface MixedExercise {
  id: string
  title: string
  description: string
  level: number
  type: "mixed"
  content: {
    reading?: {
      text: string
      questions: {
        id: string
        question: string
        options: string[]
        correctAnswer: string
      }[]
    }
    listening?: {
      audioUrl: string
      transcript: string
      questions: {
        id: string
        question: string
        options: string[]
        correctAnswer: string
      }[]
    }
    writing?: {
      tasks: {
        id: string
        instruction: string
        expectedAnswer: string
        hint: string
      }[]
    }
    vocabulary?: {
      word: string
      pinyin: string
      translation: string
    }[]
  }
}

export type Exercise = MixedExercise | ReadingExercise | ListeningExercise | WritingExercise

