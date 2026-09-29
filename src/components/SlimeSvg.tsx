export type Mood = 'happy' | 'wow' | 'think'

interface MascotProps {
    mood?: Mood
    size?: number
}

const INK = '#0b2a4a'

export default function SlimeSvg({ mood = 'happy', size = 220 }: MascotProps) {
    return (
        <svg
            className={`mascot mascot-${mood}`}
            width={size}
            height={size}
            viewBox="0 0 200 200"
            role="img"
            aria-label="Puru-chan, the slime mascot"
        >
            <defs>
                <radialGradient id="slime-body" cx="40%" cy="30%" r="80%">
                    <stop offset="0%" stopColor="#c9f1ff" />
                    <stop offset="55%" stopColor="#6ec9ff" />
                    <stop offset="100%" stopColor="#3aa0f0" />
                </radialGradient>
            </defs>

            {/* Thân slime hình giọt nước */}
            <path
                d="M100 22 C 92 50 60 78 46 112 C 32 148 54 180 100 180 C 146 180 168 148 154 112 C 140 78 108 50 100 22 Z"
                fill="url(#slime-body)"
                stroke={INK}
                strokeWidth="6"
                strokeLinejoin="round"
            />
            {/* Bóng sáng như thạch */}
            <ellipse cx="72" cy="104" rx="12" ry="20" fill="#fff" opacity=".7" transform="rotate(20 72 104)" />
            <circle cx="84" cy="68" r="5" fill="#fff" opacity=".7" />
            {/* Má hồng */}
            <ellipse cx="60" cy="140" rx="11" ry="6" fill="#ff8fb8" opacity=".6" />
            <ellipse cx="140" cy="140" rx="11" ry="6" fill="#ff8fb8" opacity=".6" />

            {mood === 'happy' && (
                <>
                    <path d="M66 120 Q78 104 90 120" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
                    <path d="M110 120 Q122 104 134 120" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
                    <path d="M90 140 Q100 154 110 140" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
                </>
            )}

            {mood === 'wow' && (
                <>
                    <circle cx="78" cy="118" r="14" fill="#fff" stroke={INK} strokeWidth="5" />
                    <circle cx="122" cy="118" r="14" fill="#fff" stroke={INK} strokeWidth="5" />
                    <circle cx="78" cy="120" r="7" fill={INK} />
                    <circle cx="122" cy="120" r="7" fill={INK} />
                    <circle cx="75" cy="116" r="3" fill="#fff" />
                    <circle cx="119" cy="116" r="3" fill="#fff" />
                    <ellipse cx="100" cy="148" rx="7" ry="9" fill={INK} />
                </>
            )}

            {mood === 'think' && (
                <>
                    <ellipse cx="78" cy="120" rx="9" ry="13" fill={INK} />
                    <ellipse cx="122" cy="120" rx="9" ry="13" fill={INK} />
                    <circle cx="75" cy="115" r="3.5" fill="#fff" />
                    <circle cx="119" cy="115" r="3.5" fill="#fff" />
                    <path d="M91 146 L109 146" stroke={INK} strokeWidth="5" strokeLinecap="round" />
                    <path d="M164 58 Q172 72 164 80 Q156 72 164 58 Z" fill="#e6f8ff" stroke={INK} strokeWidth="4" />
                </>
            )}
        </svg>
    )
}