import type { ComponentType } from 'react'
import type { SlideProps } from './shared'
import Cover from './01-Cover'
import Agenda from './02-Agenda'
import WordProcessing from './03-WordProcessing'
import WordInterface from './04-WordInterface'
import Typography from './05-Typography'
import Layout from './06-Layout'
import CutCopyPaste from './07-CutCopyPaste'
import UndoFindReplace from './08-UndoFindReplace'
import ProofingTools from './09-ProofingTools'
import SpreadsheetFundamentals from './10-SpreadsheetFundamentals'
import RecalculationGraphs from './11-RecalculationGraphs'
import InvoiceLetterFax from './12-InvoiceLetterFax'
import DatabaseIntro from './13-DatabaseIntro'
import FieldRecordFileIndex from './14-FieldRecordFileIndex'
import RelationalQuery from './15-RelationalQuery'
import NetworkSecurity from './16-NetworkSecurity'
import Instructions from './17-Instructions'
import PluralsPronunciation from './18-PluralsPronunciation'
import SummaryQuiz from './19-SummaryQuiz'

export type SectionName =
    | 'START'
    | 'WORD PROCESSING'
    | 'SPREADSHEETS'
    | 'DATABASES'
    | 'LANGUAGE WORK'
    | 'WRAP-UP'

export interface SlideDef {
    title: string
    section: SectionName
    component: ComponentType<SlideProps>
}

export const slides: SlideDef[] = [
    { title: 'Cover', section: 'START', component: Cover },
    { title: 'Agenda', section: 'START', component: Agenda },
    { title: 'What is word processing?', section: 'WORD PROCESSING', component: WordProcessing },
    { title: 'The Word interface', section: 'WORD PROCESSING', component: WordInterface },
    { title: 'Typography', section: 'WORD PROCESSING', component: Typography },
    { title: 'Page layout', section: 'WORD PROCESSING', component: Layout },
    { title: 'Cut, copy & paste', section: 'WORD PROCESSING', component: CutCopyPaste },
    { title: 'Undo, find & replace', section: 'WORD PROCESSING', component: UndoFindReplace },
    { title: 'Proofing tools', section: 'WORD PROCESSING', component: ProofingTools },
    { title: 'Spreadsheet fundamentals', section: 'SPREADSHEETS', component: SpreadsheetFundamentals },
    { title: 'Recalculation & graphs', section: 'SPREADSHEETS', component: RecalculationGraphs },
    { title: 'Invoice, letter & fax', section: 'SPREADSHEETS', component: InvoiceLetterFax },
    { title: 'Introduction to databases', section: 'DATABASES', component: DatabaseIntro },
    { title: 'Field, record, file & index', section: 'DATABASES', component: FieldRecordFileIndex },
    { title: 'Relational databases & queries', section: 'DATABASES', component: RelationalQuery },
    { title: 'Network access & security', section: 'DATABASES', component: NetworkSecurity },
    { title: 'Giving & following instructions', section: 'LANGUAGE WORK', component: Instructions },
    { title: 'Plurals & pronunciation', section: 'LANGUAGE WORK', component: PluralsPronunciation },
    { title: 'Summary & Q&A', section: 'WRAP-UP', component: SummaryQuiz },
]

export const SECTION_META: Record<SectionName, { arc: string; jp: string }> = {
        START:        { arc: 'PROLOGUE',  jp: '転生' },
    'WORD PROCESSING': { arc: 'ARC 1', jp: 'ワード処理' },
    SPREADSHEETS: { arc: 'ARC 2', jp: '表計算' },
    DATABASES: { arc: 'ARC 3', jp: 'データベース' },
    'LANGUAGE WORK': { arc: 'BONUS ARC', jp: '英語' },
'WRAP-UP':    { arc: 'EVOLUTION', jp: '進化' },
}