import type { ReactNode } from 'react'
import useScaleToFit from '../hooks/useScaleToFit'

export default function SlideFrame({ children }: { children: ReactNode }) {
    const scale = useScaleToFit(1920, 1080)
    return (
        <div className="stage">
            <div className="frame" style={{ transform: `scale(${scale})` }}>
                {children}
            </div>
        </div>
    )
}