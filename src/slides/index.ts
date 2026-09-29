import type { SlideDef } from '../types'
import S01Cover from './01-Cover'
import S02Agenda from './02-Agenda'

export const slides: SlideDef[] = [
    { id: 'cover', title: 'Cover', section: 'intro', Component: S01Cover },
    { id: 'agenda', title: 'Agenda', section: 'intro', Component: S02Agenda },
]