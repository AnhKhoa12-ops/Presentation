import { useRevealBlocks } from '../hooks/useSteps'
import { useState } from 'react'
import { DemoLabel, SlideHeading } from './shared'

const columns = ['A', 'B', 'C', 'D', 'E', 'F']
export default function SpreadsheetFundamentals() {
  useRevealBlocks(['.fundamentals-window', '.cell-guide'])
  const [hover, setHover] = useState('B5')
  const col = hover.replace(/[0-9]/g, '')
  const row = hover.replace(/[A-Z]/g, '')
  return (
    <div className="content-slide">
      <SlideHeading eyebrow="02 / SPREADSHEETS" title="A spreadsheet is a grid" subtitle="Columns run down, rows run across — where they meet is a cell." />
      <div className="sheet-fundamentals">
        <div className="sheet-window fundamentals-window"><div className="sheet-bar"><span className="sheet-app-icon">▦</span> Workbook 1 <span className="sheet-bar-right">−　□　×</span></div><div className="formula-bar"><span className="cell-name">{hover}</span><span>fx</span><span>{hover === 'B5' ? '€8,500' : `Value in ${hover}`}</span></div><div className="sheet-grid"><div className="corner-cell" /><div className="column-head empty" />{columns.map((letter) => <div className={`column-head ${col === letter ? 'highlight' : ''}`} key={letter}>{letter}</div>)}{Array.from({ length: 8 }, (_, r) => <div className="sheet-row" key={r}><div className={`row-head ${row === String(r + 1) ? 'highlight' : ''}`}>{r + 1}</div>{columns.map((letter, c) => <div key={`${letter}${r + 1}`} className={`grid-cell ${letter === col ? 'col-highlight' : ''} ${r + 1 === Number(row) ? 'row-highlight' : ''} ${hover === `${letter}${r + 1}` ? 'active-cell' : ''}`} onMouseEnter={() => setHover(`${letter}${r + 1}`)} onFocus={() => setHover(`${letter}${r + 1}`)} tabIndex={0}>{r === 0 && c === 1 ? 'Product' : r === 0 && c === 2 ? 'Region' : r === 0 && c === 3 ? 'Sales' : r === 4 && c === 1 ? 'Widget A' : r === 4 && c === 2 ? 'North' : r === 4 && c === 3 ? '€8,500' : ''}</div>)}</div>)}</div></div>
        <aside className="cell-guide"><DemoLabel>EXPLORE THE GRID</DemoLabel><div className="guide-item"><span className="guide-marker column-marker">B</span><div><strong>Column</strong><small>Vertical — A, B, C …</small></div></div><div className="guide-item"><span className="guide-marker row-marker">5</span><div><strong>Row</strong><small>Horizontal — 1, 2, 3 …</small></div></div><div className="guide-item"><span className="guide-marker cell-marker">{hover}</span><div><strong>Cell</strong><small>Column + row = cell address</small></div></div><div className="cell-types"><strong>What can a cell hold?</strong><span>ABC <small>Text</small></span><span>123 <small>Numbers</small></span><span>=fx <small>Formulas</small></span></div></aside>
      </div>
    </div>
  )
}
