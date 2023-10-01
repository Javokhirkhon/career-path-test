import clipboardQuestion from '../assets/clipboard-question.svg'
import stopwatch from '../assets/stopwatch.svg'
import scissorCutting from '../assets/scissor-cutting.svg'
import Card from '../components/Card'
import { TCard } from '../types'

const cards: TCard[] = [
  {
    icon: clipboardQuestion,
    border: 'border-orange-500',
    bg: 'bg-orange-50',
    title: '24 questions',
    desc: 'Answer 24 questions about your working style and career preferences.',
  },
  {
    icon: stopwatch,
    border: 'border-purple-500',
    bg: 'bg-purple-50',
    title: '2 minutes',
    desc: 'Gain insights into your future career in just two minutes.',
  },
  {
    icon: scissorCutting,
    border: 'border-yellow-500',
    bg: 'bg-yellow-50',
    title: 'Personalised advice',
    desc: 'Receive personalised advice to guide you on your next steps.',
  },
]

const Cards = () => {
  return (
    <>
      <div className='flex gap-16 my-16 mx-8'>
        {cards.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>
      <div>
        <p>
          We've analysed data from thousands of our member who work in graduate
          roles across a range of sectors to understand which personalities,
          skills and values best fit each career path.
        </p>
        <p className='mt-4'>
          Take this test to understand what career path you might be suited to
          and how to get started.
        </p>
      </div>
    </>
  )
}

export default Cards
