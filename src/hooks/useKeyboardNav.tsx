import { useEffect } from 'react'

interface Handlers {
    next: () => void
        prev: () => void
        first: () => void
        last: () => void
}

export default function useKeyboardNav({ next, prev, first, last }: Handlers) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) {
                e.preventDefault(); next()
            } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
                e.preventDefault(); prev()
            } else if (e.key === 'Home') first()
            else if (e.key === 'End') last()
            else if (e.key === 'f' || e.key === 'F') document.documentElement.requestFullscreen?.()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [next, prev, first, last])
}