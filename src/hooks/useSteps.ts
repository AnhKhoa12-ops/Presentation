import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type Handler = { next: () => boolean; prev: () => boolean }

let handler: Handler | null = null
// App đặt cờ này khi quay lại slide trước → slide hiện đủ nội dung ngay
export const arrival = { fromPrev: false }

// App gọi trước khi chuyển slide: true = slide đã tự xử lý (hiện/ẩn 1 bước)
export const consumeStep = () => handler?.next() ?? false
export const retreatStep = () => handler?.prev() ?? false

/** Hiện nội dung từng bước. Trả về số bước đã hiện (0..total). */
export function useSteps(total: number, min = 0): number {
  const [step, setStep] = useState(arrival.fromPrev ? total : min)
  const ref = useRef(step)

  useEffect(() => {
    const h: Handler = {
      next: () => {
        if (ref.current >= total) return false
        ref.current += 1
        setStep(ref.current)
        return true
      },
      prev: () => {
        if (ref.current <= min) return false
        ref.current -= 1
        setStep(ref.current)
        return true
      },
    }
    handler = h
    return () => {
      if (handler === h) handler = null
    }
  }, [total, min])

  return step
}

/** Điều khiển một state có sẵn bằng click/phím (vd. slide 17): value chạy từ min đến max. */
export function useStepControl(value: number, set: (n: number) => void, max: number, min = 0) {
  const ref = useRef(value)
  useEffect(() => { ref.current = value })
  useEffect(() => {
    const h: Handler = {
      next: () => { if (ref.current >= max) return false; ref.current += 1; set(ref.current); return true },
      prev: () => { if (ref.current <= min) return false; ref.current -= 1; set(ref.current); return true },
    }
    handler = h
    return () => { if (handler === h) handler = null }
  }, [max, min, set])
}

/** Mỗi click hiện thêm một khối (theo selector CSS, đúng thứ tự). Không cần sửa JSX của slide. */
export function useRevealBlocks(selectors: string[]): number {
  const step = useSteps(selectors.length, 1) // luôn hiện sẵn khối đầu tiên, slide không bao giờ trống
  useLayoutEffect(() => {
    const root = document.querySelector('.slide-viewport')
    if (!root) return
    selectors.forEach((sel, i) => {
      root.querySelectorAll(sel).forEach((el) => {
        el.classList.add('reveal')
        el.classList.toggle('on', step > i)
      })
    })
    let hint = root.querySelector('.step-hint')
    if (!hint) {
      hint = document.createElement('div')
      hint.className = 'step-hint'
      root.appendChild(hint)
    }
    hint.textContent = step < selectors.length ? `Click to reveal · ${step}/${selectors.length}` : 'Click to continue →'
  })
  useEffect(() => () => { document.querySelector('.slide-viewport .step-hint')?.remove() }, [])
  return step
}
