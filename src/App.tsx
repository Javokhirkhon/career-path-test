import Banner from './sections/Banner'
import Cards from './sections/Cards'
import Submission from './sections/Submission'
import Progress from './components/Progress'
import Question from './components/Question'
import { TQuestion } from './types'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'https://fhc-api.onrender.com/'

const App = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const userParam = searchParams.get('user')
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState<TQuestion[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [date, setDate] = useState('')

  useEffect(() => {
    if (!userParam) {
      const defaultUser = 'javokhirkhon_sharipkhonov'
      const updatedURL = window.location.href + `?user=${defaultUser}`
      window.history.replaceState({}, document.title, updatedURL)
    }
  }, [userParam])

  const fetchQuestions = useCallback(() => {
    axios
      .get(API_URL + 'questions', { params: { user: userParam } })
      .then((res) => {
        if (res.status === 200) {
          setQuestions(
            res.data.questions.map(
              ({ id, text }: { id: string; text: string }) => ({
                questionId: id,
                text,
                answer: null,
              })
            )
          )
        } else {
          console.error('Network response was not ok')
        }
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
  }, [userParam])

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)

    axios
      .get(API_URL + 'submissions', { params: { user: userParam } })
      .then((res) => {
        if (!isMounted) return
        if (res.status === 200) {
          setDate(res.data.latestSubmission)
        } else {
          console.error('Network response was not ok')
        }
      })
      .catch((err) => {
        if (!isMounted) return
        if (err.response.status === 404) {
          fetchQuestions()
        }
        alert(err.response.data.message)
      })
      .finally(() => setIsLoading(false))

    return () => {
      isMounted = false
    }
  }, [fetchQuestions, userParam])

  const handleNextQuestion = (questionIndex: number, option: number) => {
    const updatedQuestions = [...questions]

    updatedQuestions[questionIndex] = {
      ...questions[questionIndex],
      answer: option,
    }

    setQuestions(updatedQuestions)

    const scrollTarget = document.getElementById(
      questions[questionIndex + 1]?.questionId
    )

    if (scrollTarget) {
      setTimeout(() => {
        scrollTarget.scrollIntoView({ behavior: 'smooth' })
      }, 250)
    }
  }

  const handleSubmit = async () => {
    setIsCreating(true)

    axios
      .post(
        API_URL + 'submissions',
        {
          answers: questions.map(({ questionId, answer }) => ({
            questionId,
            answer,
          })),
        },
        {
          params: { user: userParam },
        }
      )
      .then((res) => setDate(res.data.submissionDate))
      .catch((err) => {
        alert(err.response.data.message)
      })
      .finally(() => setIsCreating(false))
  }

  const totalQuestions = questions.length
  const answeredQuestions = questions.filter((q) => q.answer !== null).length
  const percentage = Math.round((answeredQuestions / totalQuestions) * 100) || 0

  return (
    <>
      <Banner />
      <div className='mx-20'>
        <Cards />
        {isLoading ? (
          <div className='text-center font-bold my-10'>Loading...</div>
        ) : date ? (
          <Submission date={date} />
        ) : (
          <div className='border-2 my-8 shadow-md'>
            <Progress percentage={percentage} />
            <div className='snap-y snap-mandatory snap-always h-96 overflow-scroll'>
              {questions.map(({ questionId, text, answer }, questionIndex) => (
                <Question
                  key={questionId}
                  {...{
                    questionId,
                    text,
                    answer,
                    questionIndex,
                    handleNextQuestion,
                    totalQuestions,
                  }}
                />
              ))}
            </div>
            <div className='text-center p-8'>
              {percentage === 100 ? (
                <button
                  className='bg-orange-400 rounded-lg font-bold py-2 px-10'
                  onClick={handleSubmit}
                  disabled={isCreating}
                >
                  Finish
                </button>
              ) : (
                <div>
                  To review your previous answers, scroll back before selecting
                  "finish".
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
