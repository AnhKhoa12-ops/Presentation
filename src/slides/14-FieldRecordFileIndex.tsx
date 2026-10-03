import { useRevealBlocks } from '../hooks/useSteps'
import { useState } from 'react'
import { DemoLabel, SlideHeading } from './shared'

const rows = [
  ['E104', 'Maya Chen', 'Design', 'Dublin'],
  ['E105', 'Noah Patel', 'Finance', 'Cork'],
  ['E106', 'Ava Murphy', 'Sales', 'Galway'],
  ['E107', 'Leo Walsh', 'Support', 'Dublin'],
]
export default function FieldRecordFileIndex() {
  useRevealBlocks(['.employee-table-wrap', '.structure-labels'])
  const [hovered, setHovered] = useState('')
  return (
    <div className="content-slide">
      <SlideHeading eyebrow="03 / DATABASES" title="Zoom in on data structure" subtitle="A field is one detail. A record is one complete row. A file is the whole table." />
      <div className="data-structure-demo">
        <div className="employee-table-wrap"><DemoLabel>EMPLOYEE FILE</DemoLabel><div className="employee-table"><div className="employee-row employee-head">{['Employee ID', 'Name', 'Department', 'Location'].map((item) => <span key={item} onMouseEnter={() => setHovered('field')} onMouseLeave={() => setHovered('')}>{item}</span>)}</div>{rows.map((row, rowIndex) => <div className={`employee-row ${hovered === `record-${rowIndex}` ? 'record-hover' : ''}`} key={row[0]} onMouseEnter={() => setHovered(`record-${rowIndex}`)} onMouseLeave={() => setHovered('')}>{row.map((item, cellIndex) => <span className={hovered === 'field' && rowIndex === 1 && cellIndex === 1 ? 'field-hover' : ''} key={item} onMouseEnter={() => setHovered('field')}>{item}</span>)}</div>)}</div><div className="index-strip"><span className="index-symbol">⌕</span><div><strong>INDEX · Employee ID</strong><small>Find a record quickly without scanning every row.</small></div><span className="index-speed">FAST LOOKUP ↗</span></div></div>
        <div className="structure-labels"><div className={`structure-card field-label ${hovered === 'field' ? 'active' : ''}`}><span className="structure-bracket">↖</span><small>SINGLE CELL</small><strong>Field</strong><p>One category of information</p></div><div className={`structure-card record-label ${hovered.startsWith('record') ? 'active' : ''}`}><span className="structure-bracket">←</span><small>ONE COMPLETE ROW</small><strong>Record</strong><p>All details about one employee</p></div><div className="structure-card file-label"><span className="structure-bracket">↙</span><small>THE ENTIRE TABLE</small><strong>File</strong><p>A collection of related records</p></div><div className="structure-index"><span>⌕</span><p><b>Index</b> helps sort and locate records using a chosen field.</p></div></div>
      </div>
    </div>
  )
}
