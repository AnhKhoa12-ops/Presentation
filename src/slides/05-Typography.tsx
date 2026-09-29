import { useState } from 'react'
import { DemoLabel, SlideHeading } from './shared'

export default function Typography() {
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)
  const [underline, setUnderline] = useState(false)
  const [font, setFont] = useState('Georgia')
  const [size, setSize] = useState('28')
  return (
    <div className="content-slide">
      <SlideHeading eyebrow="01 / WORD PROCESSING" title="Typography sets the tone" subtitle="Typeface, type style and type size all change how a message feels." />
      <div className="type-demo">
        <div className="type-controls">
          <DemoLabel>TRY THE FORMATTING</DemoLabel>
          <div className="format-row"><label>Typeface< select aria-label="Typeface" value={font} onChange={(event) => setFont(event.target.value)}><option>Georgia</option><option>Arial</option><option>Courier New</option><option>Verdana</option></select></label><label>Size<select aria-label="Type size" value={size} onChange={(event) => setSize(event.target.value)}><option value="20">20 pt</option><option value="24">24 pt</option><option value="28">28 pt</option><option value="36">36 pt</option></select></label></div>
          <div className="style-buttons"><button className={bold ? 'on' : ''} onClick={() => setBold(!bold)} aria-pressed={bold}><b>B</b><span>Bold</span></button><button className={italic ? 'on' : ''} onClick={() => setItalic(!italic)} aria-pressed={italic}><i>I</i><span>Italic</span></button><button className={underline ? 'on' : ''} onClick={() => setUnderline(!underline)} aria-pressed={underline}><u>U</u><span>Underline</span></button></div>
          <div className="type-legend"><span><b>Typeface</b> — design of the letters</span><span><b>Type style</b> — emphasis such as bold</span><span><b>Type size</b> — height, measured in points</span></div>
        </div>
        <div className="type-paper"><div className="paper-meta">DOCUMENT PREVIEW <span>•••</span></div><div className="editable-sample" style={{ fontFamily: font, fontSize: `${size}px`, fontWeight: bold ? 700 : 400, fontStyle: italic ? 'italic' : 'normal', textDecoration: underline ? 'underline' : 'none' }}>Ideas become clear when words are well presented.</div><p className="paper-note">The same sentence, styled your way.</p><div className="paper-footer"><span>PAGE 1 OF 1</span><span>100%</span></div></div>
      </div>
    </div>
  )
}
