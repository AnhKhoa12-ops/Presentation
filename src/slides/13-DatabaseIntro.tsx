import { useRevealBlocks } from '../hooks/useSteps'
import { useState } from 'react'
import { DemoLabel, Icon, SlideHeading } from './shared'

export default function DatabaseIntro() {
  useRevealBlocks(['.cabinet-scene', '.transform-button'])
  const [digitised, setDigitised] = useState(false)
  return (
    <div className="content-slide">
      <SlideHeading eyebrow="03 / DATABASES" title="From filing cabinet to database" subtitle="A database stores related information so it can be organised and found fast." />
      <div className={`database-transform ${digitised ? 'digitised' : ''}`}>
        <div className="cabinet-scene">
          <DemoLabel>PAPER RECORDS</DemoLabel>
          <div className="filing-cabinet">
            <div className="cabinet-top" />
            <div className="cabinet-drawer"><span>CLIENTS</span><i /><b>▱</b></div>
            <div className="cabinet-drawer"><span>ORDERS</span><i /><b>▱</b></div>
            <div className="cabinet-drawer"><span>STAFF</span><i /><b>▱</b></div>
            <div className="cabinet-feet" />
          </div>
          <div className={`paper-record ${digitised ? 'is-digitised' : ''}`}>
            <strong>CLIENT RECORD</strong>
            <span><small>Name</small>Mina Tran</span>
            <span><small>Email</small>mina@example.com</span>
            {digitised && <b className="record-stamp">SCANNED</b>}
          </div>
        </div>
        <button
          className="transform-button"
          type="button"
          onClick={() => setDigitised((current) => !current)}
          aria-pressed={digitised}
        >
          {digitised ? '← Reset example' : 'Digitise this record →'}
        </button>
        <div className="electronic-scene">
          <DemoLabel>DIGITAL DATABASE</DemoLabel>
          <div className="database-screen">
            <div className="db-screen-top"><Icon name="database" /><span>Company database</span><b>●●●</b></div>
            <div className="db-screen-stats">
              <div><small>RECORDS</small><strong>{digitised ? '2,487' : '2,486'}</strong></div>
              <div><small>TABLES</small><strong>08</strong></div>
            </div>
            {digitised ? (
              <>
                <div className="db-screen-row head record-view"><span>ID</span><span>NAME</span><span>EMAIL</span></div>
                <div className="db-screen-row record-view record-added"><span>C-2487</span><span>Mina Tran</span><span>mina@example.com</span></div>
                <div className="db-screen-search record-confirmation">✓ &nbsp; Record added and ready to search <span>●</span></div>
              </>
            ) : (
              <>
                <div className="db-screen-row head"><span>NAME</span><span>TYPE</span><span>UPDATED</span></div>
                <div className="db-screen-row"><span>Clients</span><span>Table</span><span>Today</span></div>
                <div className="db-screen-row"><span>Orders</span><span>Table</span><span>Today</span></div>
                <div className="db-screen-row"><span>Staff</span><span>Table</span><span>Yesterday</span></div>
                <div className="db-screen-search">⌕ &nbsp; Search records… <span>↵</span></div>
              </>
            )}
          </div>
          <p>{digitised ? 'Paper fields become searchable digital data.' : 'Store · organise · search · sort'}</p>
        </div>
      </div>
      <div className="database-footnote"><span><b>DBMS</b> = Database Management System</span><span><b>One organised source</b> · many ways to use the information</span></div>
    </div>
  )
}
