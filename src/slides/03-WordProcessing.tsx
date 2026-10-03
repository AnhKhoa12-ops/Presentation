import { useRevealBlocks } from '../hooks/useSteps'
import { Panel, SlideHeading } from './shared'

const cards = [
  { icon: '✉', title: 'Letters', text: 'Write, format and share a clear message.', color: 'violet' },
  { icon: '▤', title: 'Reports', text: 'Organise ideas with headings, images and lists.', color: 'blue' },
  { icon: '▣', title: 'CVs', text: 'Present your skills in a polished layout.', color: 'orange' },
]

export default function WordProcessing() {
  useRevealBlocks(['.definition-card', '.type-card:nth-child(1)', '.type-card:nth-child(2)', '.type-card:nth-child(3)', '.bottom-callout'])
  return (
    <div className="content-slide">
      <SlideHeading eyebrow="01 / WORD PROCESSING" title="What is word processing?" subtitle="Using software to create, edit, format, save and print text documents." />
      <div className="definition-row">
        <Panel className="definition-card"><span className="definition-mark">“</span><p>A word processor turns typed text into a <strong>finished document</strong> you can revise and reuse.</p><span className="definition-caption">CREATE → EDIT → FORMAT → SHARE</span></Panel>
        <div className="document-types">{cards.map((card) => <article className={`type-card ${card.color}`} key={card.title}><span className="type-icon">{card.icon}</span><div><strong>{card.title}</strong><p>{card.text}</p></div><span className="type-check">✓</span></article>)}</div>
      </div>
      <div className="bottom-callout"><span>WHY IT MATTERS</span><p>Make changes quickly without rewriting the whole page.</p></div>
    </div>
  )
}
