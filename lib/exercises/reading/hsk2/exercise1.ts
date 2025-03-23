import type { ReadingExercise } from "../../types"

const exercise1: ReadingExercise = {
  id: "reading-hsk2-1",
  level: 2,
  title: "我的家庭",
  text: "我叫小明，今年十岁。我的家有四口人：爸爸、妈妈、妹妹和我。\n\n我爸爸是医生，他在医院工作。我妈妈是老师，她在学校教中文。我妹妹今年六岁，她上幼儿园。\n\n我们家有一只小狗，它叫旺旺。我们都很喜欢它。",
  translation:
    "My Family\n\nMy name is Xiao Ming, and I am 10 years old. My family has four people: father, mother, younger sister, and me.\n\nMy father is a doctor, he works in a hospital. My mother is a teacher, she teaches Chinese at school. My younger sister is 6 years old, she goes to kindergarten.\n\nOur family has a small dog, it's called Wangwang. We all like it very much.",
  questions: [
    {
      id: "reading-hsk2-1-q1",
      question: "小明的爸爸是做什么工作的？",
      options: ["老师", "医生", "学生", "警察"],
      correctAnswer: 1,
      explanation: '文章中提到"我爸爸是医生，他在医院工作"，所以小明的爸爸是医生。',
    },
    {
      id: "reading-hsk2-1-q2",
      question: "小明的妈妈在哪里工作？",
      options: ["医院", "商店", "学校", "餐厅"],
      correctAnswer: 2,
      explanation: '文章中提到"我妈妈是老师，她在学校教中文"，所以小明的妈妈在学校工作。',
    },
    {
      id: "reading-hsk2-1-q3",
      question: "小明家有几口人？",
      options: ["三口人", "四口人", "五口人", "六口人"],
      correctAnswer: 1,
      explanation: '文章中提到"我的家有四口人：爸爸、妈妈、妹妹和我"，所以小明家有四口人。',
    },
  ],
}

export default exercise1

