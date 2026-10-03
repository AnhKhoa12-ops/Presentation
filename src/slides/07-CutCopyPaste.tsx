import { useState, type DragEvent } from 'react'
import { DemoLabel, SlideHeading } from './shared'

type Zone = 'cut' | 'copy' | 'paste'
type Held = 'source' | 'clip' | null

const TEXT = 'Send the final report by Friday.'

export default function CutCopyPaste() {
  const [inSource, setInSource] = useState(true)
  const [clip, setClip] = useState<'cut' | 'copy' | null>(null)
  const [pasted, setPasted] = useState(0)
  const [held, setHeld] = useState<Held>(null)
  const [over, setOver] = useState<Zone | null>(null)

  const drop = (zone: Zone, from: Held) => {
    if (zone !== 'paste' && from === 'source' && inSource) {
      setClip(zone)
      if (zone === 'cut') setInSource(false)
    } else if (zone === 'paste' && from === 'clip' && clip) {
      setPasted((p) => Math.min(p + 1, 3))
    }
    setHeld(null)
    setOver(null)
  }

  const grab = (from: Held) => (e: DragEvent) => {
    e.dataTransfer.setData('text/plain', from ?? '')
    e.dataTransfer.effectAllowed = 'move'
    setHeld(from)
  }

  // Kéo-thả trên máy tính; trên màn hình cảm ứng: chạm câu chữ rồi chạm vùng đích
  const zoneProps = (zone: Zone) => ({
    onDragOver: (e: DragEvent) => { e.preventDefault(); setOver(zone) },
    onDragLeave: () => setOver(null),
    onDrop: (e: DragEvent) => { e.preventDefault(); drop(zone, e.dataTransfer.getData('text/plain') as Held) },
    onClick: () => { if (held) drop(zone, held) },
  })

  const reset = () => { setInSource(true); setClip(null); setPasted(0); setHeld(null); setOver(null) }

  const status = !clip
    ? 'Step 1 · Drag the sentence onto CUT or COPY.'
    : pasted === 0
      ? 'Step 2 · Drag it from the Clipboard onto the new page.'
      : 'Pasted! Paste again, or reset to replay.'

  return (
    <div className="content-slide">
      <SlideHeading
        eyebrow="01 / WORD PROCESSING"
        title="Move and reuse text"
        subtitle="Cut removes, copy duplicates, paste inserts — the Clipboard holds it in between."
      />
      <div className="predator" data-no-nav>
        <section className="pd-col">
          <DemoLabel>ORIGINAL DOCUMENT</DemoLabel>
          <div className="pd-page">
            <strong>Project deadline</strong>
            {inSource ? (
              <div
                className={`pd-chip${held === 'source' ? ' held' : ''}`}
                draggable
                onDragStart={grab('source')}
                onClick={() => setHeld(held === 'source' ? null : 'source')}
              >
                {TEXT}
              </div>
            ) : (
              <div className="pd-gap">— text removed —</div>
            )}
          </div>
        </section>

        <section className="pd-col pd-mid">
          <div className={`pd-zone cut jelly${over === 'cut' ? ' over' : ''}`} {...zoneProps('cut')}>
            <span>✂</span><div><b>CUT</b><small>removes it</small></div>
          </div>
          <div className={`pd-zone copy jelly${over === 'copy' ? ' over' : ''}`} {...zoneProps('copy')}>
            <span>⧉</span><div><b>COPY</b><small>keeps the original</small></div>
          </div>
          <div className="pd-clip">
            <b>CLIPBOARD</b>
            {clip ? (
              <div
                className={`pd-chip${held === 'clip' ? ' held' : ''}`}
                draggable
                onDragStart={grab('clip')}
                onClick={() => setHeld(held === 'clip' ? null : 'clip')}
              >
                {TEXT}
              </div>
            ) : (
              <small>empty</small>
            )}
          </div>
        </section>

        <section className="pd-col">
          <DemoLabel>NEW POSITION</DemoLabel>
          <div className={`pd-page pd-dest${over === 'paste' ? ' over' : ''}`} {...zoneProps('paste')}>
            <strong>Meeting notes</strong>
            {Array.from({ length: pasted }, (_, i) => (
              <p key={i} className="pd-pasted">{TEXT}</p>
            ))}
            {pasted === 0 && <small>Drop here to paste</small>}
          </div>
        </section>
      </div>

      <div className="pd-foot" data-no-nav>
        <span>{status}</span>
        <button className="jelly" onClick={reset}>↺ Reset</button>
      </div>
    </div>
  )
}
