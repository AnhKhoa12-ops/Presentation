import { useState } from 'react'
import { DemoLabel, Icon, SlideHeading } from './shared'

export default function DatabaseIntro() {
  const [digitised, setDigitised] = useState(false)
  return (
    <div className="content-slide">
      <SlideHeading eyebrow="03 / DATABASES" title="From filing cabinet to database" subtitle="A database stores related information so it can be organised and found fast." />
      <div className={`database-transform ${digitised ? 'digitised' : ''}`}>
        <div className="cabinet-scene"><DemoLabel>PAPER RECORDS</DemoLabel><div className="filing-cabinet"><div className="cabinet-top" /><div className="cabinet-drawer"><span>CLIENTS</span><i /><b>▱</b></div><div className="cabinet-drawer"><span>ORDERS</span><i /><b>▱</b></div><div className="cabinet-drawer"><span>STAFF</span><i /><b>▱</b></div><div className="cabinet-feet" /></div><p>One cabinet. Lots of folders.</p></div>
        <button className="transform-button" onClick={() => setDigitised(!digitised)}>{digitised ? '← Back to paper' : 'Digitise records →'}</button>
        <div className="electronic-scene"><DemoLabel>DIGITAL DATABASE</DemoLabel><div className="database-screen"><div className="db-screen-top"><Icon name="database" /><span>Company database</span><b>●●●</b></div><div className="db-screen-stats"><div><small>RECORDS</small><strong>2,486</strong></div><div><small>TABLES</small><strong>08</strong></div></div><div className="db-screen-row head"><span>NAME</span><span>TYPE</span><span>UPDATED</span></div><div className="db-screen-row"><span>Clients</span><span>Table</span><span>Today</span></div><div className="db-screen-row"><span>Orders</span><span>Table</span><span>Today</span></div><div className="db-screen-row"><span>Staff</span><span>Table</span><span>Yesterday</span></div><div className="db-screen-search">⌕ &nbsp; Search records… <span>↵</span></div></div><p>Store · organise · search · sort</p></div>
      </div>
      <div className="database-footnote"><span><b>DBMS</b> = Database Management System</span><span><b>One organised source</b> · many ways to use the information</span></div>
    </div>
  )
}
