// Typed access to the user guide.
//
// The guide itself lives in guide-content.json rather than in this file. That is
// deliberate: scripts/generate-guide-pdf.mjs reads the same JSON with a plain
// readFileSync, so the website and the downloadable PDF are rendered from one
// source and cannot drift apart. Edit the JSON, then run `npm run guide:pdf`.

import raw from "./guide-content.json"

/** A numbered sequence of instructions. */
export interface StepsBlock {
  type: "steps"
  items: { title: string; body: string }[]
}

/** A reference table. `head` and every row must have the same length. */
export interface TableBlock {
  type: "table"
  caption: string
  head: string[]
  rows: string[][]
}

/** A highlighted aside. `tone` picks the colour treatment on the page. */
export interface CalloutBlock {
  type: "callout"
  tone: "tip" | "warning" | "pro"
  title: string
  body: string
}

/** A plain paragraph. */
export interface ProseBlock {
  type: "prose"
  body: string
}

/** Question-and-answer pairs, also used to build FAQ structured data. */
export interface QaBlock {
  type: "qa"
  items: { q: string; a: string }[]
}

/** Browser store download links, rendered as icon+label button cards on the web page. */
export interface DownloadsBlock {
  type: "downloads"
  items: { name: string; store: string; url: string; icon: string }[]
}

export type GuideBlock = StepsBlock | TableBlock | CalloutBlock | ProseBlock | QaBlock | DownloadsBlock

export interface GuideChapter {
  /** Used as the heading's DOM id and the table-of-contents anchor. */
  id: string
  num: number
  title: string
  icon: string
  summary: string
  blocks: GuideBlock[]
}

export interface GuideDoc {
  /** Extension version this guide describes. */
  version: string
  /** ISO date the content was last reviewed. */
  updated: string
  title: string
  tagline: string
  chapters: GuideChapter[]
}

// JSON imports widen string literals to `string`, so the block union has to be
// reasserted here. The shape is validated by scripts/generate-guide-pdf.mjs,
// which fails loudly on an unknown block type.
export const guide = raw as unknown as GuideDoc

/** Every Q&A pair in the guide, flattened — used for FAQPage structured data. */
export const guideFaqItems: { question: string; answer: string }[] = guide.chapters.flatMap((chapter) =>
  chapter.blocks
    .filter((block): block is QaBlock => block.type === "qa")
    .flatMap((block) => block.items.map((item) => ({ question: item.q, answer: item.a })))
)

/** Chapter id/title/num triples for the table of contents. */
export const guideToc = guide.chapters.map(({ id, num, title, icon }) => ({ id, num, title, icon }))

/** Public path of the generated PDF, kept next to the content it mirrors. */
export const GUIDE_PDF_PATH = "/locksy-user-guide.pdf"
