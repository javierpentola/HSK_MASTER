import type { Exercise } from "../types"

const exercise1: Exercise = {
  id: "hsk1-exercise1",
  title: "HSK1 Basic Exercise",
  description: "An exercise that combines reading, listening and writing for beginners",
  level: 1,
  type: "mixed",
  content: {
    // Reading section
    reading: {
      text: "你好！我叫小明。我是学生。我喜欢学中文。中文很有意思。我也喜欢喝茶。",
      questions: [
        {
          id: "r1",
          question: "谁喜欢学中文？",
          options: ["小红", "小明", "老师", "妈妈"],
          correctAnswer: "小明",
        },
        {
          id: "r2",
          question: "小明是什么？",
          options: ["老师", "医生", "学生", "工人"],
          correctAnswer: "学生",
        },
        {
          id: "r3",
          question: "小明觉得中文怎么样？",
          options: ["很难", "很有意思", "不好", "很无聊"],
          correctAnswer: "很有意思",
        },
      ],
    },

    // Listening section
    listening: {
      audioUrl: "https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3", // A beep sound example
      transcript: "我叫李华。我今年八岁。我喜欢吃苹果。我不喜欢吃香蕉。",
      questions: [
        {
          id: "l1",
          question: "他叫什么名字？",
          options: ["小明", "李华", "王红", "张伟"],
          correctAnswer: "李华",
        },
        {
          id: "l2",
          question: "他几岁？",
          options: ["六岁", "七岁", "八岁", "九岁"],
          correctAnswer: "八岁",
        },
        {
          id: "l3",
          question: "他喜欢吃什么？",
          options: ["香蕉", "苹果", "橙子", "葡萄"],
          correctAnswer: "苹果",
        },
      ],
    },

    // Writing section
    writing: {
      tasks: [
        {
          id: "w1",
          instruction: 'Write the characters for "Hello" in Chinese',
          expectedAnswer: "你好",
          hint: "Used to greet someone",
        },
        {
          id: "w2",
          instruction: "Complete the sentence: 我是_____。(student)",
          expectedAnswer: "学生",
          hint: "Person who studies at a school",
        },
        {
          id: "w3",
          instruction: 'Write the characters for "thank you" in Chinese',
          expectedAnswer: "谢谢",
          hint: "Used to thank someone",
        },
      ],
    },

    // Relevant vocabulary for the exercise
    vocabulary: [
      { word: "你好", pinyin: "nǐ hǎo", translation: "hello" },
      { word: "我", pinyin: "wǒ", translation: "I" },
      { word: "叫", pinyin: "jiào", translation: "to be called" },
      { word: "是", pinyin: "shì", translation: "to be" },
      { word: "学生", pinyin: "xué shēng", translation: "student" },
      { word: "喜欢", pinyin: "xǐ huān", translation: "to like" },
      { word: "学", pinyin: "xué", translation: "to study" },
      { word: "中文", pinyin: "zhōng wén", translation: "Chinese (language)" },
      { word: "很", pinyin: "hěn", translation: "very" },
      { word: "有意思", pinyin: "yǒu yì si", translation: "interesting" },
      { word: "也", pinyin: "yě", translation: "also" },
      { word: "喝", pinyin: "hē", translation: "to drink" },
      { word: "茶", pinyin: "chá", translation: "tea" },
      { word: "吃", pinyin: "chī", translation: "to eat" },
      { word: "苹果", pinyin: "píng guǒ", translation: "apple" },
      { word: "不", pinyin: "bù", translation: "not" },
      { word: "香蕉", pinyin: "xiāng jiāo", translation: "banana" },
      { word: "谢谢", pinyin: "xiè xiè", translation: "thank you" },
    ],
  },
}

export default exercise1

