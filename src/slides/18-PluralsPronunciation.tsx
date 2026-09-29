import { useState } from 'react'
import { SlideHeading } from './shared'

const words = [
  { word: 'databases', sound: '/ɪz/', group: 'iz' },
  { word: 'taxes', sound: '/ɪz/', group: 'iz' },
  { word: 'files', sound: '/z/', group: 'z' },
  { word: 'records', sound: '/z/', group: 'z' },
  { word: 'reports', sound: '/s/', group: 's' },
  { word: 'cells', sound: '/z/', group: 'z' },
]
const groups = [{ key: 's', label: '/s/', hint: 'voiceless sound' }, { key: 'iz', label: '/ɪz/', hint: 'extra syllable' }, { key: 'z', label: '/z/', hint: 'voiced sound' }]
export default function PluralsPronunciation() {
  const [placed, setPlaced] = useState<Record<string, string>>({})
  const [selected, setSelected] = useState('')
  const place = (group: string) => {
    if (selected) {
      setPlaced((current) => ({ ...current, [selected]: group }))
      setSelected('')
    }
  }
  const correct = Object.entries(placed).filter(([word, group]) => words.find((item) => item.word === word)?.group === group).length
  return (
    <div className="content-slide">
      <SlideHeading eyebrow="LANGUAGE WORK" title="Plural endings have a sound" subtitle="Sort each word by how its final -s or -es is pronounced. Select a word, then a sound." />
      <div className="plural-demo"><div className="plural-rule"><span className="rule-icon">Aa</span><div><strong>Plural spelling</strong><span>Most nouns + <b>-s</b> · after s, sh, ch, x or z, add <b>-es</b> · some forms are irregular</span></div><span className="plural-score">{correct}/{words.length} correct</span></div><div className="word-bank"><span className="bank-label">WORD BANK <small>SELECT A WORD</small></span><div className="word-chips">{words.filter((item) => !placed[item.word]).map((item) => <button className={`word-chip ${selected === item.word ? 'selected' : ''}`} key={item.word} onClick={() => setSelected(item.word)}>{item.word}<span>+</span></button>)}</div></div><div className="sound-columns">{groups.map((group) => <button key={group.key} className={`sound-column sound-${group.key}`} onClick={() => place(group.key)}><span className="sound-heading"><strong>{group.label}</strong><small>{group.hint}</small></span><div className="drop-zone">{words.filter((item) => placed[item.word] === group.key).map((item) => <span key={item.word} className={`placed-word ${item.group === group.key ? 'correct-word' : 'incorrect-word'}`}>{item.word} {item.group === group.key ? '✓' : '↻'}</span>)}{words.every((item) => placed[item.word] === group.key || placed[item.word]) ? null : <span className="drop-hint">{selected ? 'Click to place here' : 'Select a word above'}</span>}</div></button>)}</div><div className="plural-feedback">{selected ? `Selected “${selected}” — now choose its ending sound.` : correct === words.length ? 'Great work — every ending is in the right group!' : 'Tip: /ɪz/ adds a syllable; /s/ and /z/ do not.'}</div></div>
    </div>
  )
}
