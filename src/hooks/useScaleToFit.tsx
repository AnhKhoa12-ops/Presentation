import { useEffect, useState } from 'react'

export default function useScaleToFit(width: number, height: number): number {
    const calc = () => Math.min(window.innerWidth / width, window.innerHeight / height)
    const [scale, setScale] = useState<number>(calc)

    useEffect(() => {
        const onResize = () => setScale(calc())
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [width, height])

    return scale
}