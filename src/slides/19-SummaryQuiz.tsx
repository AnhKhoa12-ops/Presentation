import { useState } from 'react'
import { Icon, SlideHeading } from './shared'

const questions = [
  { prompt: 'You need a polished letter with headings and a signature.', answer: 'Word' },
  { prompt: 'You want totals and a chart to update when figures change.', answer: 'Excel' },
  { prompt: 'You need to find every customer who placed a large order.', answer: 'Database' },
]
const choices = [{ name: 'Word', icon: 'word' as const, color: 'violet' }, { name: 'Excel', icon: 'excel' as const, color: 'green' }, { name: 'Database', icon: 'database' as const, color: 'blue' }]
export default function SummaryQuiz() {
  const [question, setQuestion] = useState(0)
  const [answer, setAnswer] = useState('')
  const current = questions[question]
  const choose = (value: string) => setAnswer(value)
  const next = () => { setQuestion((question + 1) % questions.length); setAnswer('') }
  return (
    <div className="content-slide summary-slide">
      <SlideHeading eyebrow="WRAP-UP" title="Choose the right tool" subtitle="Different tasks, different strengths. What would you use?" />
      <div className="quiz-card"><div className="quiz-top"><span className="quiz-count">QUICK CHECK <b>0{question + 1} / 03</b></span><span className="quiz-stars">✦ &nbsp; YOUR TURN</span></div><div className="quiz-question"><span className="question-mark">?</span><p>{current.prompt}</p></div><div className="quiz-choices">{choices.map((choice) => <button className={`quiz-choice ${choice.color} ${answer === choice.name ? (answer === current.answer ? 'correct-choice' : 'wrong-choice') : ''}`} key={choice.name} onClick={() => choose(choice.name)}><Icon name={choice.icon} /><span>{choice.name}</span><i>{answer === choice.name ? (answer === current.answer ? '✓' : '×') : '↗'}</i></button>)}</div>{answer && <div className={`quiz-feedback ${answer === current.answer ? 'correct-feedback' : 'wrong-feedback'}`}>{answer === current.answer ? 'Exactly right — you picked the best tool for the job.' : `Not quite — think about which tool is designed for this task.`}<button onClick={next}>{question === questions.length - 1 ? 'Play again →' : 'Next question →'}</button></div>}<div className="quiz-bottom"><span>WORD PROCESSING · SPREADSHEETS · DATABASES</span><span>THANKS FOR TAKING PART</span></div></div><div className="summary-tools">{choices.map((choice, index) => <div key={choice.name} className={`summary-tool ${choice.color}`}><Icon name={choice.icon} /><span><strong>{choice.name}</strong><small>{['Create & format text', 'Calculate & visualise', 'Store & query records'][index]}</small></span></div>)}</div>
    </div>
  )
}
