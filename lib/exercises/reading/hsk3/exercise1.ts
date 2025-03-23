import type { ReadingExercise } from "../../types"

const exercise1: ReadingExercise = {
  id: "reading-hsk3-1",
  level: 3,
  title: "北京的四季",
  text: "北京有四个季节，春、夏、秋、冬都很有特点。\n\n春天的北京，天气暖和，风有点大。人们喜欢去公园看花。夏天的北京很热，常常下雨。秋天的北京天气很好，不冷也不热，天空很蓝。冬天的北京很冷，有时候会下雪。北京的冬天很干燥，需要多喝水。\n\n我最喜欢北京的秋天，因为天气舒服，可以去很多地方玩。",
  translation:
    "The Four Seasons of Beijing\n\nBeijing has four seasons, and spring, summer, autumn, and winter all have their own characteristics.\n\nIn spring, Beijing's weather is warm, and the wind is a bit strong. People like to go to parks to see flowers. In summer, Beijing is very hot and it often rains. In autumn, Beijing's weather is very good, neither cold nor hot, and the sky is very blue. In winter, Beijing is very cold, and sometimes it snows. Beijing's winter is very dry, so you need to drink more water.\n\nI like Beijing's autumn the most because the weather is comfortable and I can go to many places to play.",
  questions: [
    {
      id: "reading-hsk3-1-q1",
      question: "北京的春天有什么特点？",
      options: ["很热", "很冷", "暖和，风有点大", "常常下雨"],
      correctAnswer: 2,
      explanation: '文章中提到"春天的北京，天气暖和，风有点大"，所以北京的春天暖和，风有点大。',
    },
    {
      id: "reading-hsk3-1-q2",
      question: "作者最喜欢北京的哪个季节？",
      options: ["春天", "夏天", "秋天", "冬天"],
      correctAnswer: 2,
      explanation: '文章中提到"我最喜欢北京的秋天，因为天气舒服，可以去很多地方玩"，所以作者最喜欢秋天。',
    },
    {
      id: "reading-hsk3-1-q3",
      question: "北京的冬天是什么样的？",
      options: ["暖和", "很热", "很冷，很干燥", "不冷也不热"],
      correctAnswer: 2,
      explanation:
        '文章中提到"冬天的北京很冷，有时候会下雪。北京的冬天很干燥，需要多喝水"，所以北京的冬天很冷，很干燥。',
    },
  ],
}

export default exercise1

