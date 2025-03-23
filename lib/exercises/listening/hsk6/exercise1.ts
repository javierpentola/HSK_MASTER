import type { ListeningExercise } from "../../types"

const exercise1: ListeningExercise = {
  id: "listening-hsk6-1",
  level: 6,
  title: "自我介绍 (Presentación personal 6)",
  audioUrl: "https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3", // Tono simple
  transcript: "你好，我叫王明。我是中国人。我今年二十岁。我是学生。我学习汉语。",
  translation: "Hola, me llamo Wang Ming. Soy chino. Tengo 20 años. Soy estudiante. Estudio chino.",
  questions: [
    {
      id: "q1",
      question: "这个人叫什么名字？",
      options: ["李明", "王明", "张明", "刘明"],
      correctAnswer: 1,
      explanation: '音频中，这个人说"我叫王明"。',
    },
    {
      id: "q2",
      question: "这个人是哪国人？",
      options: ["日本人", "美国人", "中国人", "韩国人"],
      correctAnswer: 2,
      explanation: '音频中，这个人说"我是中国人"。',
    },
    {
      id: "q3",
      question: "这个人多大了？",
      options: ["18岁", "19岁", "20岁", "21岁"],
      correctAnswer: 2,
      explanation: '音频中，这个人说"我今年二十岁"。',
    },
  ],
}

export default exercise1

