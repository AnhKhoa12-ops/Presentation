import type { ReactNode } from 'react'

interface SageNoteProps {
    children: ReactNode
    label?: string
}

export default function SageNote({ children, label = 'GREAT SAGE' }: SageNoteProps) {
    return (
        <div className="sage" role="note">
            <span className="sage-label">{label} ▸</span>
            <span className="sage-text">{children}</span>
        </div>
    )
}