import { useState } from 'react'
import { DemoLabel, SlideHeading } from './shared'

const tutors = [{ id: 'T01', name: 'Alex Green' }, { id: 'T02', name: 'Sam Rivera' }, { id: 'T03', name: 'Jamie Fox' }]
const courses = [{ course: 'Web Design', tutor: 'T01', spend: 12400 }, { course: 'Data Skills', tutor: 'T02', spend: 7600 }, { course: 'Digital Marketing', tutor: 'T01', spend: 9800 }, { course: 'Business English', tutor: 'T03', spend: 5400 }, { course: 'Cloud Basics', tutor: 'T02', spend: 15800 }]
export default function RelationalQuery() {
  const [threshold, setThreshold] = useState(8000)
  return (
    <div className="content-slide">
      <SlideHeading eyebrow="03 / DATABASES" title="Connect tables. Ask a question." subtitle="A shared key links related tables; a query returns only the records you need." />
      <div className="relational-demo"><div className="relational-tables"><div className="relation-table tutor-table"><DemoLabel>TUTORS</DemoLabel><div className="relation-head"><span>Tutor ID</span><span>Name</span></div>{tutors.map((tutor) => <div className={`relation-row ${tutor.id === 'T01' ? 'key-match' : ''}`} key={tutor.id}><strong>{tutor.id}</strong><span>{tutor.name}</span></div>)}<div className="primary-key">🔑 Primary key</div></div><div className="relation-link"><span>JOIN ON</span><b>Tutor ID</b><div className="link-line">········→</div></div><div className="relation-table course-table"><DemoLabel>COURSES</DemoLabel><div className="relation-head"><span>Course</span><span>Tutor ID</span><span>Spend</span></div>{courses.map((course) => <div className={`relation-row ${course.tutor === 'T01' ? 'key-match' : ''}`} key={course.course}><span>{course.course}</span><strong>{course.tutor}</strong><span>€{course.spend.toLocaleString()}</span></div>)}<div className="primary-key">↔ Matching foreign key</div></div></div><div className="query-panel"><div className="query-top"><span className="query-icon">⌕</span><div><small>QUERY BUILDER</small><strong>Find courses where spend is greater than…</strong></div><DemoLabel>LIVE FILTER</DemoLabel></div><div className="query-slider"><span>€0</span><input aria-label="Minimum spend" type="range" min="0" max="16000" step="500" value={threshold} onChange={(event) => setThreshold(Number(event.target.value))} /><span>€16k</span><strong>&gt; €{threshold.toLocaleString()}</strong></div><div className="query-results"><span>RESULTS · {courses.filter((course) => course.spend > threshold).length} courses</span>{courses.filter((course) => course.spend > threshold).map((course) => <span className="query-result" key={course.course}>{course.course}<b>€{course.spend.toLocaleString()}</b></span>)}</div></div></div>
    </div>
  )
}
