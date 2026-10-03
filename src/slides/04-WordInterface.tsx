import { useRevealBlocks } from '../hooks/useSteps'
import { useState } from 'react'
import { DemoLabel, SlideHeading } from './shared'

const tools = [
  { name: 'Menu Bar', vi: 'Thanh menu: mở các nhóm lệnh', icon: '☰' },
  { name: 'Standard Toolbar', vi: 'Thanh chuẩn: lưu, in, hoàn tác', icon: '▤' },
  { name: 'Formatting Toolbar', vi: 'Thanh định dạng: kiểu chữ, căn lề', icon: 'A' },
]

export default function WordInterface() {
  useRevealBlocks(['.word-window', '.interface-info'])
  const [active, setActive] = useState(0)
  return (
    <div className="content-slide">
      <SlideHeading eyebrow="01 / WORD PROCESSING" title="Meet the Word interface" subtitle="Click a toolbar card to highlight it in the demo. (Nhấn vào từng thanh công cụ để xem vị trí.)" />
      <div className="interface-demo">
        <div className="word-window">
          <div className="window-title"><span className="window-dot red" /><span className="window-dot yellow" /><span className="window-dot green" /><span className="window-name">Project brief — Word</span><span>− □ ×</span></div>
          <div className={`mock-menubar ${active === 0 ? 'is-active' : ''}`} onMouseEnter={() => setActive(0)}><span>File</span><b>Edit</b><b>View</b><b>Insert</b><b>Format</b><b>Tools</b><b>Table</b><b>Window</b><b>Help</b></div>
          <div className={`mock-toolbar ${active === 1 ? 'is-active' : ''}`} onMouseEnter={() => setActive(1)}><span>📄</span><span>📁</span><span>💾</span><i /><span>🖨</span><span>↶</span><span>↷</span><i /><span>🔍</span></div>
          <div className={`mock-toolbar formatting ${active === 2 ? 'is-active' : ''}`} onMouseEnter={() => setActive(2)}><span className="font-picker">Arial ▾</span><span className="size-picker">12 ▾</span><b>B</b><i>I</i><u>U</u><i /><span>≡</span><span>☷</span><span>▦</span><span>▤</span></div>
          <div className="word-page"><div className="fake-heading">Project brief</div><div className="fake-line wide" /><div className="fake-line" /><div className="fake-line short" /><div className="fake-space" /><div className="fake-line wide" /><div className="fake-line" /><div className="fake-line short" /></div>
        </div>
        <aside className="interface-info"><DemoLabel>EXPLORE THE TOOLBARS</DemoLabel>{tools.map((tool, index) => <button className={`tool-info ${active === index ? 'selected' : ''}`} key={tool.name} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} aria-pressed={active === index}><span className="tool-info-icon">{tool.icon}</span><span><strong>{tool.name}</strong><small>{tool.vi}</small></span><span className="tool-chevron">›</span></button>)}<div className="interface-tip"><span>TIP</span><p>Most commands are also available in the menus.</p></div></aside>
      </div>
    </div>
  )
}
