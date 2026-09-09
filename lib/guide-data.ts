import guideJson from './guide-content.json'

export interface GuideStep {
  title: string
  body: string
}

export interface GuideQA {
  q: string
  a: string
}

export type GuideBlock =
  | { type: 'steps'; items: GuideStep[] }
  | { type: 'table'; caption: string; head: string[]; rows: string[][] }
  | { type: 'callout'; tone: 'tip' | 'warning' | 'pro'; title: string; body: string }
  | { type: 'prose'; body: string }
  | { type: 'qa'; items: GuideQA[] }

export interface GuideChapter {
  id: string
  num: number
  title: string
  icon: string
  intro: string
  blocks: GuideBlock[]
}

export interface GuideDoc {
  version: string
  updated: string
  chapters: GuideChapter[]
}

export const guideContent = guideJson as GuideDoc
