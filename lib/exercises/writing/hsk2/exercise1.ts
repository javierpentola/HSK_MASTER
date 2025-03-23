import type { WritingExercise } from "../../types"

const exercise1: WritingExercise = {
  id: "writing-hsk2-1",
  level: 2,
  question: "你的家在哪里？",
  translation: "Where is your home?",
  sampleAnswer: "我的家在美国纽约。我和我的父母住在一个小公寓里。",
  minChars: 10,
  maxChars: 30,
  suggestedVocabulary: [
    { word: "家", translation: "home" },
    { word: "在", translation: "in/at" },
    { word: "住", translation: "to live" },
    { word: "公寓", translation: "apartment" },
    { word: "父母", translation: "parents" },
  ],
}

export default exercise1

