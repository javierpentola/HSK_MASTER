import type { ReadingExercise } from "../../types"

const exercise1: ReadingExercise = {
  id: "reading-hsk4-1",
  level: 4,
  title: "中国的高铁",
  text: "中国的高速铁路（简称“高铁”）发展非常快。现在，中国已经���了���界上最长的高铁网络。\n\n坐高铁有很多好处。首先，高铁很快，从北京到上海只需要四个半小时，比坐飞机还方便。其次，高铁很准时，很少晚点。最后，高铁站通常在市中心，交通很方便。\n\n不过，高铁票比普通火车票贵。在春节、国庆节等节假日，买高铁票也不容易，需要提前预订。\n\n总的来说，高铁的出现改变了中国人的出行方式，让人们的生活更加便利。",
  translation:
    "China's High-Speed Rail\n\nChina's high-speed railway (abbreviated as \"high-speed rail\") has developed very quickly. Now, China has the longest high-speed rail network in the world.\n\nThere are many benefits to taking the high-speed rail. First, it's very fast; it only takes four and a half hours from Beijing to Shanghai, which is even more convenient than taking a plane. Second, the high-speed rail is very punctual and rarely delayed. Finally, high-speed rail stations are usually in the city center, making transportation very convenient.\n\nHowever, high-speed rail tickets are more expensive than regular train tickets. During holidays such as Spring Festival and National Day, it's also not easy to buy high-speed rail tickets, and you need to book in advance.\n\nOverall, the emergence of high-speed rail has changed the way Chinese people travel, making people's lives more convenient.",
  questions: [
    {
      id: "reading-hsk4-1-q1",
      question: "中国高铁的发展状况如何？",
      options: ["发展很慢", "刚刚开始发展", "已经有了世界上最长的高铁网络", "只在大城市有"],
      correctAnswer: 2,
      explanation: '文章中提到"现在，中国已经有了世界上最长的高铁网络"，所以中国已经有了世界上最长的高铁网络。',
    },
    {
      id: "reading-hsk4-1-q2",
      question: "从北京到上海坐高铁需要多长时间？",
      options: ["两个小时", "三个小时", "四个小时", "四个半小时"],
      correctAnswer: 3,
      explanation: '文章中提到"从北京到上海只需要四个半小时"，所以从北京到上海坐高铁需要四个半小时。',
    },
    {
      id: "reading-hsk4-1-q3",
      question: "高铁有什么缺点？",
      options: ["很慢", "经常晚点", "票价比普通火车贵，节假日不容易买票", "站点很少"],
      correctAnswer: 2,
      explanation:
        '文章中提到"不过，高铁票比普通火车票贵。在春节、国庆节等节假日，买高铁票也不容易，需要提前预订"，所以高铁的缺点是票价贵，节假日不容易买票。',
    },
  ],
}

export default exercise1

