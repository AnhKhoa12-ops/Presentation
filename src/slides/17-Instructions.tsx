import { useState } from 'react'
import { SlideHeading } from './shared'

const lines = [
  { word: 'First,', text: 'open the spreadsheet and select the sales sheet.' },
  { word: 'Next,', text: 'enter the new figures in the blue cells.' },
  { word: 'Then,', text: 'check that the total recalculates correctly.' },
  { word: 'Finally,', text: 'save the file and send it to your tutor.' },
]
export default function Instructions() {
  const [visible, setVisible] = useState(1)
  return (
    <div className="content-slide">
      <SlideHeading eyebrow="LANGUAGE WORK" title="Give clear instructions" subtitle="Sequence words guide someone through a process, one step at a time." />
      <div className="instruction-demo"><div className="conversation"><div className="conversation-heading"><span className="conversation-icon">↗</span><div><strong>Updating a sales sheet</strong><small>WORKPLACE CONVERSATION</small></div><span className="conversation-dots">•••</span></div><div className="chat-line"><span className="avatar avatar-tutor">T</span><div><small>TUTOR</small><div className="speech-bubble">Can you show me how to update the monthly sales?</div></div></div><div className="chat-line learner-line"><span className="avatar avatar-you">Y</span><div><small>YOU · INSTRUCTIONS</small><div className="instruction-steps">{lines.slice(0, visible).map((line, index) => <p className="instruction-line" key={line.word} style={{ animationDelay: `${index * 100}ms` }}><b>{line.word}</b> {line.text}</p>)}</div></div></div><div className="chat-line"><span className="avatar avatar-tutor">T</span><div><small>TUTOR</small><div className="speech-bubble question-bubble">Is that right? <span>↗</span></div></div></div><div className="reply-chips"><button onClick={() => setVisible(4)}>Yes, that's right.</button><button onClick={() => setVisible(1)}>Let's go through it again.</button></div></div><div className="sequence-sidebar"><span className="sequence-label">USE SEQUENCE WORDS</span>{lines.map((line, index) => <button className={`sequence-word ${visible > index ? 'shown' : ''}`} key={line.word} onClick={() => setVisible(index + 1)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{line.word.replace(',', '')}</strong><i>{visible > index ? '✓' : '+'}</i></button>)}<div className="instruction-tip"><b>Check understanding</b><p>Ask “Is that right?” or “Do you follow?”</p></div></div></div>
    </div>
  )
}
