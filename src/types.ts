import type { ComponentType } from 'react'

export type Section = 'intro' | 'word' | 'sheet' | 'db' | 'end'

export interface SlideDef {
    id: string
    title: string
    section: Section
    Component: ComponentType
}