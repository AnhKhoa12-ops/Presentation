import { useRevealBlocks } from '../hooks/useSteps'
import { useState } from 'react'
import { DemoLabel, SlideHeading } from './shared'

export default function UndoFindReplace() {
  useRevealBlocks(['.find-document', '.find-window', '.find-shortcuts'])
  const [replaced, setReplaced] = useState(false)
  const [undone, setUndone] = useState(false)
  return (
    <div className="content-slide">
      <SlideHeading eyebrow="01 / WORD PROCESSING" title="Undo, find & replace" subtitle="Fix a mistake instantly, or update every matching word in one step." />
      <div className="find-demo">
        <div className="find-document"><DemoLabel>DOCUMENT</DemoLabel><h3>Welcome to the team</h3><p>Our <mark className={replaced ? 'new-word' : ''}>{replaced ? 'colleagues' : 'staff'}</mark> are here to help you settle in. Ask a member of <mark className={replaced ? 'new-word' : ''}>{replaced ? 'colleagues' : 'staff'}</mark> if you need anything.</p><p>We hope you enjoy working with our <mark className={replaced ? 'new-word' : ''}>{replaced ? 'colleagues' : 'staff'}</mark>!</p><button className="undo-button" onClick={() => { setReplaced(undone); setUndone(!undone) }}>↶ {undone ? 'Redo' : 'Undo'} <kbd>Ctrl Z</kbd></button></div>
        <div className="find-window"><div className="find-title"><span>Find and Replace</span><button aria-label="Close">×</button></div><div className="find-tabs"><span>Find</span><b>Replace</b></div><label>Find what<input value={replaced ? 'staff' : 'staff'} readOnly /></label><label>Replace with<input value="colleagues" readOnly /></label><div className="find-options"><span>☑ Match whole word only</span><span>☐ Match case</span></div><button className={`replace-button ${replaced ? 'replaced' : ''}`} onClick={() => { setReplaced(true); setUndone(false) }}>{replaced ? '✓ Replaced all' : 'Replace All'}</button><div className="replace-count">{replaced ? '3 replacements made' : '3 matches found'}</div></div>
      </div>
      <div className="find-shortcuts"><span><kbd>Ctrl Z</kbd> Undo the last action</span><span><kbd>Ctrl H</kbd> Open Find and Replace</span><DemoLabel>INTERACTIVE DEMO</DemoLabel></div>
    </div>
  )
}
