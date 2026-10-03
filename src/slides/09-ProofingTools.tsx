import { useRevealBlocks } from '../hooks/useSteps'
import { useState } from 'react'
import { DemoLabel, SlideHeading } from './shared'

const tools = ['Spell checker', 'Thesaurus', 'Grammar checker']
export default function ProofingTools() {
  useRevealBlocks(['.proof-paper', '.proof-controls'])
  const [active, setActive] = useState<string[]>([])
  const toggle = (tool: string) => setActive((current) => current.includes(tool) ? current.filter((item) => item !== tool) : [...current, tool])
  return (
    <div className="content-slide">
      <SlideHeading eyebrow="01 / WORD PROCESSING" title="Proofread with a little help" subtitle="Each tool checks a different part of your writing. Click to try one." />
      <div className="proof-demo">
        <div className="proof-paper"><div className="proof-toolbar"><span>Document1</span><span>100% · English (UK)</span></div><div className="proof-text"><h3>Meeting update</h3><p>Please check the <span className={active.includes(tools[0]) ? 'spell-error' : ''}>recieve</span> date before we send the <span className={active.includes(tools[0]) ? 'spell-error' : ''}>finaly</span> report.</p><p className={active.includes(tools[2]) ? 'grammar-error' : ''}>The team are ready for the launch, and we has prepared the slides.</p><p>We need a <span className={active.includes(tools[1]) ? 'thesaurus-word' : ''}>good</span> summary of the results.</p>{active.includes(tools[1]) && <div className="suggestion-popover"><small>SYNONYMS FOR “GOOD”</small><span>excellent</span><span>effective</span><span>useful</span></div>}</div><div className="proof-status">✦ Editor suggestions available</div></div>
        <div className="proof-controls"><DemoLabel>CLICK TO CHECK</DemoLabel>{tools.map((tool, index) => <button className={`proof-tool ${active.includes(tool) ? 'active' : ''}`} key={tool} onClick={() => toggle(tool)}><span className={`proof-symbol proof-${index}`}>{index === 0 ? 'Aa' : index === 1 ? '↔' : '✓'}</span><span><strong>{tool}</strong><small>{index === 0 ? 'Spelling mistakes · red underline' : index === 1 ? 'Alternative words · suggestions' : 'Grammar issues · blue underline'}</small></span><span className="tool-state">{active.includes(tool) ? 'ON' : '＋'}</span></button>)}</div>
      </div>
    </div>
  )
}
