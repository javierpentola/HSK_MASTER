import type { Exercise } from "../types"

const exercise2: Exercise = {
  id: "hsk1-exercise2",
  title: "Family and Numbers",
  description: "Learn vocabulary about family and numbers in Chinese",
  level: 1,
  type: "mixed",
  content: {
    // Reading section
    reading: {
      text: "这是我的家。我有爸爸、妈妈和一个妹妹。我爸爸四十岁，妈妈三十八岁。我妹妹十岁。我们都喜欢吃饭。",
      questions: [
        {
          id: "r1",
          question: "他有几个妹妹？",
          options: ["零个", "一个", "两个", "三个"],
          correctAnswer: "一个",
        },
        {
          id: "r2",
          question: "他爸爸多大？",
          options: ["三十八岁", "四十岁", "四十五岁", "五十岁"],
          correctAnswer: "四十岁",
        },
        {
          id: "r3",
          question: "他们都喜欢什么？",
          options: ["喝水", "吃饭", "看书", "听音乐"],
          correctAnswer: "吃饭",
        },
      ],
    },

    // Listening section
    listening: {
      audioUrl: "https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3", // A beep sound example
      transcript: "我家有五口人：爸爸、妈妈、哥哥、妹妹和我。我们住在北京。",
      questions: [
        {
          id: "l1",
          question: "他家有几口人？",
          options: ["三口人", "四口人", "五口人", "六口人"],
          correctAnswer: "五口人",
        },
        {
          id: "l2",
          question: "他们住在哪里？",
          options: ["上海", "北京", "广州", "深圳"],
          correctAnswer: "北京",
        },
        {
          id: "l3",
          question: "他有没有哥哥？",
          options: ["有", "没有"],
          correctAnswer: "有",
        },
      ],
    },

    // Writing section
    writing: {
      tasks: [
        {
          id: "w1",
          instruction: 'Write the characters for "father" in Chinese',
          expectedAnswer: "爸爸",
          hint: "A male family member",
        },
        {
          id: "w2",
          instruction: 'Write the characters for "mother" in Chinese',
          expectedAnswer: "妈妈",
          hint: "A female family member",
        },
        {
          id: "w3",
          instruction: "Write the number 10 in Chinese",
          expectedAnswer: "十",
          hint: "It's a basic number in Chinese",
        },
      ],
    },

    // Relevant vocabulary for the exercise
    vocabulary: [
      { word: "家", pinyin: "jiā", translation: "home/family" },
      { word: "爸爸", pinyin: "bà ba", translation: "father" },
      { word: "妈妈", pinyin: "mā ma", translation: "mother" },
      { word: "哥哥", pinyin: "gē ge", translation: "older brother" },
      { word: "妹妹", pinyin: "mèi mei", translation: "younger sister" },
      { word: "我们", pinyin: "wǒ men", translation: "we" },
      { word: "都", pinyin: "dōu", translation: "all" },
      { word: "住", pinyin: "zhù", translation: "to live" },
      { word: "在", pinyin: "zài", translation: "in" },
      { word: "北京", pinyin: "běi jīng", translation: "Beijing" },
      { word: "有", pinyin: "yǒu", translation: "to have" },
      { word: "口人", pinyin: "kǒu rén", translation: "people (counter)" },
      { word: "三", pinyin: "sān", translation: "three" },
      { word: "四", pinyin: "sì", translation: "four" },
      { word: "五", pinyin: "wǔ", translation: "five" },
      { word: "十", pinyin: "shí", translation: "ten" },
      { word: "岁", pinyin: "suì", translation: "years (age)" },
    ],
  },
}

export default exercise2

