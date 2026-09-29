import { useState } from 'react'
import { slides } from '../slides'
import useKeyboardNav from '../hooks/useKeyboardNav'
import SlideFrame from './SlideFrame'

export default function Deck() {
    const [index, setIndex] = useState<number>(0)
    const lastIndex = slides.length - 1

    useKeyboardNav({
        next: () => setIndex(i => Math.min(i + 1, lastIndex)),
        prev: () => setIndex(i => Math.max(i - 1, 0)),
        first: () => setIndex(0),
        last: () => setIndex(lastIndex),
    })

    const { Component, id } = slides[index]

    return (
        <SlideFrame>
            <Component key={id} />
            <div className="progress" style={{ width: `${(index / lastIndex) * 100}%` }} />
            <div className="counter">{index + 1} / {slides.length}</div>
        </SlideFrame>
    )
}