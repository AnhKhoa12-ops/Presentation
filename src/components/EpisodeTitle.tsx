import { episodes } from '../data/episodes'

export default function EpisodeTitle({ ep }: { ep: number }) {
    const data = episodes[ep - 1]
    if (!data) return null
    return (
        <div className="episode">
            <span className="ep-tag">EPISODE {String(ep).padStart(2, '0')}</span>
            <span className="ep-jp">{data.jp}</span>
            <span className="ep-sub">{data.subtitle}</span>
        </div>
    )
}