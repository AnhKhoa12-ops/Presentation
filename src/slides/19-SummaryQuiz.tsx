import { useState } from 'react'
import { Icon, SlideHeading } from './shared'

type ToolName = 'Word' | 'Excel' | 'Database'

const questions: { prompt: string; answer: ToolName }[] = [
  { prompt: 'You need to write a formal letter with headings, formatted paragraphs, and a signature.', answer: 'Word' },
  { prompt: 'You need to calculate monthly payroll for 500 employees and create a revenue chart.', answer: 'Excel' },
  { prompt: 'You need to store millions of customer records and support thousands of simultaneous users without conflicts or duplicates.', answer: 'Database' },
  { prompt: 'You need to create a long legal contract with an automatic table of contents and tables.', answer: 'Word' },
  { prompt: 'You need to manage university grades across linked tables for students, instructors, and courses.', answer: 'Database' },
  { prompt: 'You need to track daily personal expenses and use a formula to calculate the total automatically.', answer: 'Excel' },
  { prompt: 'You need to write a 20-page internship report with citations and a bibliography.', answer: 'Word' },
  { prompt: 'You need to build an online airline booking system where seat availability updates in real time for every user.', answer: 'Database' },
  { prompt: 'You need to quickly sort 50 products by price and apply custom filters.', answer: 'Excel' },
  { prompt: 'You need to print 200 personalized meeting invitations using names and job titles from a list.', answer: 'Word' },
  { prompt: 'You need to analyze profit growth over several years with column and line charts.', answer: 'Excel' },
  { prompt: 'You need strict access controls for sensitive user data, such as passwords and transaction history.', answer: 'Database' },
  { prompt: 'You need to create an attractive job résumé with clean page layout and aligned sections.', answer: 'Word' },
  { prompt: 'You need to model monthly loan repayments that recalculate when interest rates change.', answer: 'Excel' },
  { prompt: 'You need to manage millions of daily inventory transactions for a large corporation.', answer: 'Database' },
]

const choices = [
  { name: 'Word' as const, icon: 'word' as const, color: 'violet' },
  { name: 'Excel' as const, icon: 'excel' as const, color: 'green' },
  { name: 'Database' as const, icon: 'database' as const, color: 'blue' },
]

export default function SummaryQuiz() {
  const [question, setQuestion] = useState(0)
  const [answer, setAnswer] = useState<ToolName | ''>('')
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const current = questions[question]
  const isCorrect = answer === current.answer
  const correctChoice = choices.find((choice) => choice.name === current.answer)

  const choose = (value: ToolName) => {
    if (answer) return
    setAnswer(value)
    if (value === current.answer) {
      setScore((currentScore) => currentScore + 1)
      setStreak((currentStreak) => currentStreak + 1)
    } else {
      setStreak(0)
    }
  }

  const next = () => {
    if (question === questions.length - 1) {
      setScore(0)
      setStreak(0)
    }
    setQuestion((currentQuestion) => (currentQuestion + 1) % questions.length)
    setAnswer('')
  }

  return (
    <div className="content-slide summary-slide">
      <SlideHeading eyebrow="WRAP-UP" title="Choose the right tool" subtitle="Read each scenario and choose the best office tool for the job." />
      <div className="quiz-card">
        <div className="quiz-top">
          <span className="quiz-count">QUICK CHECK <b>{String(question + 1).padStart(2, '0')} / {questions.length}</b></span>
          <span className="quiz-stars">✦ SCORE {score}/{questions.length}{streak > 1 ? ` · COMBO ×${streak}` : ''}</span>
        </div>
        <div className="quiz-question">
          <span className="question-mark">?</span>
          <p>{current.prompt}</p>
        </div>
        <div className="quiz-choices">
          {choices.map((choice) => (
            <button
              className={`quiz-choice ${choice.color} ${answer && choice.name === current.answer ? 'correct-choice' : answer === choice.name ? 'wrong-choice' : ''}`}
              key={choice.name}
              onClick={() => choose(choice.name)}
              aria-pressed={answer === choice.name}
            >
              <Icon name={choice.icon} />
              <span>{choice.name}</span>
              <i>{answer && choice.name === current.answer ? '✓' : answer === choice.name ? '×' : '↗'}</i>
            </button>
          ))}
        </div>
        <div
          className={`quiz-feedback ${answer ? (isCorrect ? 'correct-feedback' : 'wrong-feedback') : 'quiz-feedback-empty'}`}
          aria-hidden={!answer}
        >
          {answer && (
            <>
              {isCorrect ? 'Correct — that is the best tool for this task.' : `Not quite — the best choice is ${current.answer}.`}
              <button onClick={next}>{question === questions.length - 1 ? 'Play again →' : 'Next question →'}</button>
            </>
          )}
        </div>
        <div className="quiz-answer-panel" aria-live="polite">
          {answer && correctChoice && (
            <>
              <span className="quiz-answer-label">QUESTION &amp; ANSWER</span>
              <p>{current.prompt}</p>
              <strong>
                <Icon name={correctChoice.icon} />
                Correct answer: {current.answer}
              </strong>
            </>
          )}
        </div>
        <div className="quiz-bottom">
          <span>WORD PROCESSING · SPREADSHEETS · DATABASES</span>
          <span>THANKS FOR TAKING PART</span>
        </div>
      </div>
      <div className="summary-tools">
        {choices.map((choice, index) => (
          <div key={choice.name} className={`summary-tool ${choice.color}`}>
            <Icon name={choice.icon} />
            <span>
              <strong>{choice.name}</strong>
              <small>{['Create & format text', 'Calculate & visualize data', 'Store & query records'][index]}</small>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
