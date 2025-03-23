import type { ReadingExercise } from "../../types"

const exercise1: ReadingExercise = {
  id: "reading-hsk5-1",
  level: 5,
  title: "中国的传统节日",
  text: '中国有许多传统节日，其中最重要的是春节。春节是农历新年的第一天，通常在公历的一月底或二月初。春节期间，人们会贴春联、放鞭炮、吃团圆饭，还会给孩子们发红包。春节是家人团聚的时刻，因此也被称为"团圆节"。\n\n除了春节，中秋节也是中国人非常重视的传统节日。中秋节在农历八月十五，是一年中月亮最圆的时候。这一天，家人会一起赏月、吃月饼。月饼是中秋节的传统食品，象征着团圆和幸福。\n\n端午节是为了纪念古代诗人屈原而设立的。在这一天，人们会吃粽子、赛龙舟。粽子是用糯米和各种馅料包成的三角形或长方形食品，外面用竹叶包裹。\n\n这些传统节日不仅丰富了中国人的文化生活，也体现了中国人对家庭和谐、民族团结的重视。',
  translation:
    'Chinese Traditional Festivals\n\nChina has many traditional festivals, the most important of which is the Spring Festival. The Spring Festival is the first day of the lunar new year, usually in late January or early February of the Gregorian calendar. During the Spring Festival, people put up Spring Festival couplets, set off firecrackers, have reunion dinners, and give red envelopes to children. The Spring Festival is a time for family reunions, so it is also known as the "Reunion Festival".\n\nBesides the Spring Festival, the Mid-Autumn Festival is also a traditional festival that Chinese people attach great importance to. The Mid-Autumn Festival is on the fifteenth day of the eighth lunar month, when the moon is the fullest of the year. On this day, families gather to admire the moon and eat mooncakes. Mooncakes are traditional food for the Mid-Autumn Festival, symbolizing reunion and happiness.\n\nThe Dragon Boat Festival was established to commemorate the ancient poet Qu Yuan. On this day, people eat zongzi and hold dragon boat races. Zongzi is a triangular or rectangular food made of glutinous rice and various fillings, wrapped in bamboo leaves.\n\nThese traditional festivals not only enrich the cultural life of Chinese people but also reflect the importance Chinese people attach to family harmony and national unity.',
  questions: [
    {
      id: "reading-hsk5-1-q1",
      question: "春节通常在什么时候？",
      options: ["公历的一月初", "公历的一月底或二月初", "农历的二月", "农历的八月十五"],
      correctAnswer: 1,
      explanation:
        '文章中提到"春节是农历新年的第一天，通常在公历的一月底或二月初"，所以春节通常在公历的一月底或二月初。',
    },
    {
      id: "reading-hsk5-1-q2",
      question: "中秋节的传统食品是什么？",
      options: ["粽子", "月饼", "春联", "团圆饭"],
      correctAnswer: 1,
      explanation: '文章中提到"月饼是中秋节的传统食品，象征着团圆和幸福"，所以中秋节的传统食品是月饼。',
    },
    {
      id: "reading-hsk5-1-q3",
      question: "端午节是为了纪念谁而设立的？",
      options: ["孔子", "屈原", "关羽", "岳飞"],
      correctAnswer: 1,
      explanation: '文章中提到"端午节是为了纪念古代诗人屈原而设立的"，所以端午节是为了纪念屈原而设立的。',
    },
  ],
}

export default exercise1

