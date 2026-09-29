import { useState } from 'react'
import { DemoLabel, SlideHeading } from './shared'

export default function NetworkSecurity() {
  const [password, setPassword] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [message, setMessage] = useState('')
  function unlock() {
    if (password === 'learn') {
      setUnlocked(true)
      setMessage('Salary field unlocked for this demo.')
    } else {
      setMessage('Try the demo password: learn')
    }
  }
  return (
    <div className="content-slide">
      <SlideHeading eyebrow="03 / DATABASES" title="Share data. Protect sensitive fields." subtitle="Network access lets teams collaborate; permissions keep private information safe." />
      <div className="security-demo"><div className="team-card"><DemoLabel>SHARED DATABASE</DemoLabel><div className="team-avatars"><span>MC</span><span>NP</span><span>AM</span><span>LW</span></div><strong>One team, one source of truth</strong><p>Authorised users can view and update shared records.</p><div className="team-status"><span className="live-dot" /> 4 users online <span>●●●</span></div><div className="security-permissions"><div><span>✓</span> Read employee records</div><div><span>✓</span> Update contact details</div><div><span className="lock-mini">▣</span> Salary field restricted</div></div></div><div className={`salary-card ${unlocked ? 'unlocked' : ''}`}><div className="salary-card-top"><span>🔒</span><DemoLabel>RESTRICTED FIELD</DemoLabel><span className="salary-badge">{unlocked ? 'UNLOCKED' : 'LOCKED'}</span></div><div className="salary-record"><div><small>EMPLOYEE</small><strong>Maya Chen</strong></div><div><small>ROLE</small><strong>Designer</strong></div><div className="salary-value"><small>ANNUAL SALARY</small><strong>{unlocked ? '€48,500' : '•••••••'}</strong></div></div><div className="unlock-form"><label htmlFor="demo-password">Authorised access password</label><div><input id="demo-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && unlock()} placeholder="Enter password" disabled={unlocked} /><button onClick={unlock} disabled={unlocked}>{unlocked ? '✓' : 'Unlock'}</button></div><small>{message || 'Demo only — password: learn'}</small></div><div className="security-footer"><span>🔐 Encrypted connection</span><span>Access logged</span></div></div></div>
    </div>
  )
}
