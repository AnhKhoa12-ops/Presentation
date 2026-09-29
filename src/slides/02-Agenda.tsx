import { SlideHeading, type SlideProps } from './shared'
import EpisodeTitle from '../components/EpisodeTitle'

const sections = [
    { label: 'Word Processing', range: '03—09', icon: 'W', color: 'violet', index: 2 },
    { label: 'Spreadsheets', range: '10—12', icon: 'X', color: 'green', index: 9 },
    { label: 'Databases', range: '13—16', icon: 'D', color: 'blue', index: 12 },
    { label: 'Language work', range: '17—18', icon: 'Aa', color: 'orange', index: 16 },
]

export default function Agenda({ onNavigate }: SlideProps) {
    return (
        <div className="content-slide">
            <EpisodeTitle ep={2} />
            <SlideHeading
                eyebrow="QUEST MAP"
                title="Choose your path"
                subtitle="Four stops, one goal: choose the right tool for the task."
            />
            <div className="agenda-grid">
                {sections.map((section) => (
                    <button
                        key={section.label}
                        className={`agenda-card ${section.color}`}
                        onClick={() => onNavigate?.(section.index)}
                    >
                        <span className="agenda-icon">{section.icon}</span>
                        <span className="agenda-info">
              <strong>{section.label}</strong>
              <small>LV.{section.range}</small>
            </span>
                        <span className="agenda-arrow">↗</span>
                    </button>
                ))}
            </div>
            <div className="agenda-note">
                <span className="note-icon">✦</span>
                <span><strong>Language work</strong> · giving instructions, plurals &amp; pronunciation</span>
                <span className="note-range">17—18</span>
            </div>
        </div>
    )
}