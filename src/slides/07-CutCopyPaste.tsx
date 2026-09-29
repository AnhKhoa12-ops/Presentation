import { useState } from 'react'
import { DemoLabel, SlideHeading } from './shared'

export default function CutCopyPaste() {
  const [action, setAction] = useState<'cut' | 'copy' | null>(null)
  return (
    <div className="content-slide">
      <SlideHeading eyebrow="01 / WORD PROCESSING" title="Move and reuse text" subtitle="Cut removes, copy duplicates, paste inserts — the Clipboard holds it in between." />
      <div className="clipboard-demo">
        <div className="text-source"><DemoLabel>ORIGINAL DOCUMENT</DemoLabel><div className={`source-note ${action === 'cut' ? 'cut-done' : ''}`}><span className="selection-handle" /><strong>Project deadline</strong><p>Send the final report by Friday.</p><span className="selection-handle bottom" /></div><div className="source-actions"><button onClick={() => setAction('cut')}><span>✂</span> Cut <kbd>Ctrl X</kbd></button><button onClick={() => setAction('copy')}><span>▢</span> Copy <kbd>Ctrl C</kbd></button></div></div>
        <div className="clipboard-center"><div className={`flight-paper ${action ? 'in-flight' : ''}`}>Aa</div><div className={`clipboard-box ${action ? 'has-contents' : ''}`}><span className="clipboard-icon">▤</span><strong>CLIPBOARD</strong><small>{action ? 'Text ready to paste' : 'Waiting for text'}</small>{action && <span className="clip-preview">“Project deadline”</span>}</div><span className="flow-arrow">→</span></div>
        <div className="text-destination"><DemoLabel>NEW POSITION</DemoLabel><div className="target-page"><span>Meeting notes</span><div className="target-line" /><div className="target-line short" /><button className={action ? 'paste-ready' : ''} onClick={() => action && setAction(null)} disabled={!action}>＋ Paste <kbd>Ctrl V</kbd></button>{action && <div className="pasted-note"><strong>Project deadline</strong><p>Send the final report by Friday.</p></div>}</div></div>
      </div>
      <div className="demo-hint">Click Cut or Copy, then Paste to move or duplicate the text.</div>
    </div>
  )
}
