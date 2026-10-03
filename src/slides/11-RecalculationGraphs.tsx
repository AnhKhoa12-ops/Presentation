import { useRevealBlocks } from '../hooks/useSteps'
import { useState } from 'react'
import { DemoLabel, SlideHeading } from './shared'

export default function RecalculationGraphs() {
  useRevealBlocks(['.revenue-table', '.chart-panel'])
  const [sales, setSales] = useState([120, 180, 145, 220])
  const labels = ['North', 'South', 'East', 'West']
  const total = sales.reduce((sum, value) => sum + value, 0)
  return (
    <div className="content-slide">
      <SlideHeading eyebrow="02 / SPREADSHEETS" title="Change a value. Everything updates." subtitle="Formulas recalculate totals and charts as soon as the data changes." />
      <div className="recalc-demo">
        <div className="revenue-table"><div className="table-title"><span>▦</span> Annual revenue <DemoLabel>LIVE FORMULA</DemoLabel></div><div className="revenue-head"><span>Region</span><span>2007 (€k)</span><span>2008 (€k)</span></div>{labels.map((label, index) => <div className="revenue-row" key={label}><strong>{label}</strong><span>{[110, 165, 132, 190][index]}</span><label><input aria-label={`${label} 2008 revenue`} type="number" min="0" value={sales[index]} onChange={(event) => setSales((current) => current.map((value, i) => i === index ? Number(event.target.value) : value))} /><span>↵</span></label></div>)}<div className="revenue-total"><strong>Total</strong><span>597</span><strong>€{total}k <small>=SUM(C2:C5)</small></strong></div><div className="edit-tip">Edit any 2008 figure — total and graph recalculate instantly.</div></div>
        <div className="chart-panel"><div className="chart-heading"><div><strong>Revenue by region</strong><small>2007 vs 2008 · €k</small></div><DemoLabel>LIVE</DemoLabel></div><div className="chart-legend"><span><i className="legend-2007" />2007</span><span><i className="legend-2008" />2008</span></div><div className="bar-chart">{labels.map((label, index) => <div className="bar-group" key={label}><div className="bar-pair"><span className="bar bar-2007" style={{ height: `${([110, 165, 132, 190][index] / 240) * 100}%` }} /><span className="bar bar-2008" style={{ height: `${(sales[index] / 240) * 100}%` }} /></div><small>{label}</small></div>)}</div><div className="chart-axis"><span>0</span><span>100</span><span>200</span></div></div>
      </div>
    </div>
  )
}
