import { useState } from 'react'
import { SlideHeading } from './shared'

const alignments = [{ label: 'Left', icon: '≡', value: 'left' }, { label: 'Centre', icon: '☰', value: 'center' }, { label: 'Right', icon: '≣', value: 'right' }, { label: 'Justify', icon: '☷', value: 'justify' }]

export default function Layout() {
  const [align, setAlign] = useState('left')
  const [indent, setIndent] = useState(false)
  const [header, setHeader] = useState(true)
  const [footer, setFooter] = useState(false)
  return (
    <div className="content-slide">
      <SlideHeading eyebrow="01 / WORD PROCESSING" title="Give the page structure" subtitle="Alignment, indentation and headers make long documents easier to scan." />
      <div className="layout-demo">
        <div className="layout-tools">
          <span className="control-label">ALIGNMENT</span><div className="align-options">{alignments.map((item) => <button className={align === item.value ? 'chosen' : ''} key={item.value} onClick={() => setAlign(item.value)} aria-label={`Align ${item.label}`}><span>{item.icon}</span><small>{item.label}</small></button>)}</div>
          <span className="control-label">PAGE ELEMENTS</span><button className={`toggle-row ${header ? 'checked' : ''}`} onClick={() => setHeader(!header)}><span className="toggle-check">{header ? '✓' : ''}</span><span><b>Header</b><small>Content at the top of each page</small></span></button><button className={`toggle-row ${footer ? 'checked' : ''}`} onClick={() => setFooter(!footer)}><span className="toggle-check">{footer ? '✓' : ''}</span><span><b>Footer</b><small>Page number or notes at the bottom</small></span></button>
          <span className="control-label">FIRST LINE INDENT</span><button className={`indent-control ${indent ? 'enabled' : ''}`} onClick={() => setIndent(!indent)}><span>↦</span> {indent ? 'Indent on' : 'Indent off'} <span className="indent-value">{indent ? '0.5 in' : '0 in'}</span></button>
        </div>
        <div className="mini-page"><div className="page-ruler"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div><div className="mini-page-content">{header && <div className="page-header">UNIT 14 · WORD PROCESSING<span>1</span></div>}<h3>Clear writing, clear thinking</h3><p style={{ textAlign: align, textIndent: indent ? '2em' : '0' }}>A well organised page helps readers find the information they need. Choose an alignment that suits the content and use indentation to show where a new paragraph begins.</p><p style={{ textAlign: align, textIndent: indent ? '2em' : '0' }}>Headers and footers repeat useful details without interrupting the main text.</p>{footer && <div className="page-footer">TRAINING NOTES <span>1</span></div>}</div></div>
      </div>
    </div>
  )
}
