import { useEffect, useState, type CSSProperties } from 'react'

type Burst = { id: number; x: number; y: number }

// Bắn hạt magicule tại chỗ vừa bấm
export default function ClickBurst() {
  const [bursts, setBursts] = useState<Burst[]>([])

  useEffect(() => {
    let id = 0
    const onDown = (e: PointerEvent) => {
      const b = { id: id++, x: e.clientX, y: e.clientY }
      setBursts((list) => [...list, b])
      window.setTimeout(() => setBursts((list) => list.filter((i) => i.id !== b.id)), 700)
    }
    window.addEventListener('pointerdown', onDown)
    return () => window.removeEventListener('pointerdown', onDown)
  }, [])

  return (
    <div className="click-burst" aria-hidden="true">
      {bursts.map((b) => (
        <span key={b.id} className="burst" style={{ left: b.x, top: b.y }}>
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2
            return (
              <i
                key={i}
                style={{ '--dx': `${Math.cos(a) * 46}px`, '--dy': `${Math.sin(a) * 46}px` } as CSSProperties}
              />
            )
          })}
        </span>
      ))}
    </div>
  )
}
