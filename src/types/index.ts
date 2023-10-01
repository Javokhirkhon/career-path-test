export type TCard = {
  icon: string
  border: string
  bg: string
  title: string
  desc: string
}

export type TIcon = Pick<TCard, 'icon' | 'border' | 'bg'>

export type TQuestion = {
  questionId: string
  text: string
  answer: number | null
}
