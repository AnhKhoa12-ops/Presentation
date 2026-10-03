import { useState } from 'react'
import { Icon } from './shared'
import EpisodeTitle from '../components/EpisodeTitle'
import Mascot from '../components/Mascot.tsx'
const lines = [
    "Yoroshiku! Let's start the episode!",
    'I am Rimuru — today we study office software!',
    'Great Sage says: click me again~',
]

export default function Cover() {
    const [line, setLine] = useState(0)
    return (
        <div className="cover-slide">
            <span className="cover-kana" aria-hidden="true">ロード・ウィブ</span>
            <div className="cover-orb orb-one" />
            <div className="cover-orb orb-two" />

            <div className="cover-copy">
                <span className="cover-presents">LORD WIBU PRESENTS</span>
                <EpisodeTitle ep={1} />
                <h1>Work smarter<br />with <em>information.</em></h1>
                <p>Word processing, spreadsheets &amp; databases</p>
                <div className="cover-tags">
                    <span>#Word</span>
                    <span>#Spreadsheet</span>
                    <span>#Database</span>
                </div>
                <div className="cover-names">
                    <span>Directed by</span><strong>Lord Wibu</strong>
                    <span className="cover-date">SEASON 1 · UNIT 14 &amp; 15 · 2026</span>
                </div>
            </div>

            <div className="cover-art" aria-label="Word, spreadsheet and database icons">
                <div className="floating-card card-word"><Icon name="word" /><span>Documents</span></div>
                <div className="floating-card card-excel"><Icon name="excel" /><span>Spreadsheets</span></div>
                <div className="floating-card card-db"><Icon name="database" /><span>Databases</span></div>
                <div className="orbit orbit-a" /><div className="orbit orbit-b" />
                <div className="cover-mascot jelly" role="button" tabIndex={0} data-no-nav onClick={() => setLine((line + 1) % lines.length)}>
                    <div className="bubble">{lines[line]}</div>
                    <Mascot mood="happy" size={300} />
                </div>
            </div>
        </div>
    )
}
