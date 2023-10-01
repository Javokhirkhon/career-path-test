interface OptionProps {
  option: number
  handleNextQuestion: (questionIndex: number, option: number) => void
  answer: number | null
  questionIndex: number
}

const Option = ({
  option,
  handleNextQuestion,
  answer,
  questionIndex,
}: OptionProps) => {
  const notLast = option < 7
  return (
    <div className={`relative ${notLast ? 'flex-1' : ''}`}>
      <div
        className='w-10 h-10 rounded-full border-2 border-blue-300 bg-blue-50 cursor-pointer relative'
        onClick={() => handleNextQuestion(questionIndex, option)}
      >
        {answer === option && (
          <div className='w-0 h-0 bg-blue-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-growCircle'></div>
        )}
      </div>
      {notLast && (
        <div className='absolute top-1/2 transform -translate-y-1/2 left-10 h-0.5 w-full bg-blue-300' />
      )}
    </div>
  )
}

export default Option
