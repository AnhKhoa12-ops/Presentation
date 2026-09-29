import { useMemo, type CSSProperties } from 'react'

interface Particle {
    left: number
    size: number
    duration: number
    delay: number
    drift: number
}

export default function MagiculeField({ count = 28 }: { count?: number }) {
    const particles = useMemo<Particle[]>(
        () =>
            Array.from({ length: count }, () => ({
                left: Math.random() * 100,
                size: 6 + Math.random() * 16,
                duration: 10 + Math.random() * 10,
                delay: -Math.random() * 20,
                drift: (Math.random() - 0.5) * 10,
            })),
        [count],
    )

    return (
        <div className="magicule-field" aria-hidden="true">
            {particles.map((p, i) => (
                <span
                    key={i}
                    className="magicule"
                    style={
                        {
                            left: `${p.left}%`,
                            width: p.size,
                            height: p.size,
                            animationDuration: `${p.duration}s`,
                            animationDelay: `${p.delay}s`,
                            '--drift': `${p.drift}vw`,
                        } as CSSProperties
                    }
                />
            ))}
        </div>
    )
}