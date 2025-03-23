import type { WritingExercise } from "../../types"

const exercise: WritingExercise = {
  id: "writing-hsk3-1",
  level: 3,
  question: "描述一下你的日常生活。",
  translation: "Describe your daily life.",
  sampleAnswer:
    "我每天早上七点起床，吃早饭后去上班。中午我和同事一起吃午饭。下午五点下班后，我常常去健身房锻炼身体。晚上我喜欢看书或者看电视。",
  minChars: 20,
  maxChars: 50,
  suggestedVocabulary: [
    { word: "每天", translation: "every day" },
    { word: "起床", translation: "to get up" },
    { word: "上班", translation: "to go to work" },
    { word: "同事", translation: "colleague" },
    { word: "健身房", translation: "gym" },
    { word: "锻炼身体", translation: "to exercise" },
  ],
}

export default exercise

