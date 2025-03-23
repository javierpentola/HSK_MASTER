import { WritingPracticeClient } from "./WritingPracticeClient"

// Generate static params for all valid HSK levels (2-6)
export function generateStaticParams() {
  return [{ level: "2" }, { level: "3" }, { level: "4" }, { level: "5" }, { level: "6" }]
}

export default function WritingPracticePage({ params }: { params: { level: string } }) {
  const level = Number.parseInt(params.level, 10)

  return <WritingPracticeClient level={level} />
}

