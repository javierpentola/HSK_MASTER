import type { WritingExercise } from "../../types"

const exercise: WritingExercise = {
  id: "writing-hsk3-2",
  level: 3,
  question: "你的周末通常做什么？",
  translation: "What do you usually do on weekends?",
  sampleAnswer:
    "周末我通常睡得晚一点。上午我常常去咖啡店喝咖啡，看书。下午有时候和朋友一起去公园或者电影院。晚上我喜欢在家做饭，然后看电影。",
  minChars: 20,
  maxChars: 50,
  suggestedVocabulary: [
    { word: "周末", translation: "weekend" },
    { word: "通常", translation: "usually" },
    { word: "咖啡店", translation: "coffee shop" },
    { word: "公园", translation: "park" },
    { word: "电影院", translation: "cinema" },
    { word: "做饭", translation: "to cook" },
  ],
}

export default exercise

