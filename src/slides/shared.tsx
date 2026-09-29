import type { ReactNode } from 'react'

export type SlideProps = { onNavigate?: (index: number) => void }

export function SlideHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <header className="slide-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  )
}

export function Panel({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`panel ${className}`}>{children}</div>
}

export function Chip({ children, tone = 'blue' }: { children: ReactNode; tone?: string }) {
  return <span className={`chip chip-${tone}`}>{children}</span>
}

export function Icon({ name }: { name: 'word' | 'excel' | 'database' | 'spark' }) {
  const symbols = {
    word: <><path d="M4 3.5h10l4 4v13H4z" /><path d="M14 3.5v4h4M7 11l1.2 6 2-4 2 4 1.2-6" /></>,
    excel: <><path d="M4 3.5h10l4 4v13H4z" /><path d="M14 3.5v4h4M7 11l5 6m0-6-5 6" /></>,
    database: <><ellipse cx="11" cy="5.5" rx="7" ry="3" /><path d="M4 5.5v11c0 1.7 3.1 3 7 3s7-1.3 7-3v-11M4 11c0 1.7 3.1 3 7 3s7-1.3 7-3" /></>,
    spark: <><path d="m11 2 1.9 6.1L19 10l-6.1 1.9L11 18l-1.9-6.1L3 10l6.1-1.9z" /><path d="m18 15 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z" /></>,
  }
  return (
    <svg className={`app-icon icon-${name}`} viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {symbols[name]}
    </svg>
  )
}

export function DemoLabel({ children }: { children: ReactNode }) {
  return <span className="demo-label"><span className="live-dot" /> {children}</span>
}
