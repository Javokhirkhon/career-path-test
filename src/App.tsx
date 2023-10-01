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

  // This useEffect sets a default user parameter in the URL if none is provided.
  useEffect(() => {
    if (!userParam) {
      const defaultUser = 'javokhirkhon_sharipkhonov'
      const updatedURL = window.location.href + `?user=${defaultUser}`
      window.history.replaceState({}, document.title, updatedURL)
    }
  }, [userParam])

  // This function fetches questions from the API based on the user parameter.
  const fetchQuestions = useCallback(() => {
    axios
      .get(API_URL + 'questions', { params: { user: userParam } })
      .then((res) => {
        if (res.status === 200) {
          // Set the retrieved questions in the component's state.
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
        console.error(err)
      })
  }, [userParam])

  // This useEffect fetches submissions and updates the date. It also handles cleanup.
  useEffect(() => {
    let isMounted = true
    setIsLoading(true)

    axios
      .get(API_URL + 'submissions', { params: { user: userParam } })
      .then((res) => {
        if (!isMounted) return
        if (res.status === 200) {
          // Set the latest submission date in the component's state.
          setDate(res.data.latestSubmission)
        } else {
          console.error('Network response was not ok')
        }
      })
      .catch((err) => {
        if (!isMounted) return
        if (err.response.status === 404) {
          // If a 404 error occurs, call the fetchQuestions function.
          fetchQuestions()
        }
        console.error(err)
      })
      .finally(() => setIsLoading(false))

    // Cleanup function to prevent potential memory leaks.
    return () => {
      isMounted = false
    }
  }, [fetchQuestions, userParam])

  // This function handles selecting an option for a question and scrolling to the next question.
  const handleNextQuestion = (questionIndex: number, option: number) => {
    const updatedQuestions = [...questions]

    updatedQuestions[questionIndex] = {
      ...questions[questionIndex],
      answer: option,
    }

    // Update the component's state with the selected answer.
    setQuestions(updatedQuestions)

    const scrollTarget = document.getElementById(
      questions[questionIndex + 1]?.questionId
    )

    if (scrollTarget) {
      setTimeout(() => {
        // Scroll to the next question smoothly.
        scrollTarget.scrollIntoView({ behavior: 'smooth' })
      }, 250)
    }
  }

  // This function handles submitting answers to the API and updates the submission date.
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
        console.error(err)
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
