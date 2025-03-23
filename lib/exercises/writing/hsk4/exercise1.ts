import type { WritingExercise } from "../../types"

const exercise: WritingExercise = {
  id: "writing-hsk4-1",
  level: 4,
  question: "你认为学习外语重要吗？为什么？",
  translation: "Do you think learning a foreign language is important? Why?",
  sampleAnswer:
    "我认为学习外语非常重要。首先，它可以帮助我们了解不同的文化和思维方式。其次，在全球化的今天，会说多种语言对工作和旅行都有很大帮助。最后，学习语言也能锻炼我们的大脑，提高记忆力和思考能力。",
  minChars: 40,
  maxChars: 80,
  suggestedVocabulary: [
    { word: "外语", translation: "foreign language" },
    { word: "重要", translation: "important" },
    { word: "文化", translation: "culture" },
    { word: "思维方式", translation: "way of thinking" },
    { word: "全球化", translation: "globalization" },
    { word: "锻炼", translation: "to exercise/train" },
    { word: "记忆力", translation: "memory" },
  ],
}

export default exercise

