import Option from './Option'

interface QuestionProps {
  questionId: string
  text: string
  answer: number | null
  questionIndex: number
  handleNextQuestion: (questionIndex: number, option: number) => void
  totalQuestions: number
}

const Question = ({
  questionId,
  text,
  answer,
  questionIndex,
  handleNextQuestion,
  totalQuestions,
}: QuestionProps) => {
  return (
    <div
      key={questionId}
      id={questionId}
      className='snap-start h-96 pt-16 px-48'
    >
      <div className='relative'>
        <span className='absolute top-0 -left-14 text-orange-300'>
          Q{questionIndex + 1}/{totalQuestions}
        </span>
        <div>In a job, I would be motivated by</div>
        <div className='font-bold'>{text}</div>
      </div>
      <div className='flex w-full mt-14 mb-6'>
        {Array.from({ length: 8 }, (_, option) => (
          <Option
            key={option}
            {...{
              option,
              handleNextQuestion,
              answer,
              questionIndex,
            }}
          />
        ))}
      </div>
      <div className='flex justify-between'>
        <div>Strongly disagree</div>
        <div>Strongly agree</div>
      </div>
    </div>
  )
}

export default Question
