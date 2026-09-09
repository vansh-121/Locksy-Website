/**
 * Locksy User Guide → PDF
 *
 * Renders lib/guide-content.json to public/locksy-user-guide.pdf. That JSON is
 * the same file app/guide/page.tsx renders, so the download and the web page
 * can never disagree — edit the JSON, then re-run this.
 *
 * Usage:
 *   npm run guide:pdf
 */

import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import React from 'react'
import { Document, Page, Text, View, Link, StyleSheet, renderToFile } from '@react-pdf/renderer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CONTENT_PATH = join(__dirname, '..', 'lib', 'guide-content.json')
const OUT_PATH = join(__dirname, '..', 'public', 'locksy-user-guide.pdf')

const h = React.createElement

// ── Brand palette ─────────────────────────────────────────────────
// Hex equivalents of the oklch tokens in app/globals.css. --primary-on-light is
// documented there as #063ad7; the rest are the light-theme values.
const COLOR = {
    primary: '#063ad7',
    secondary: '#8b31d9',
    text: '#171717',
    muted: '#5c5c5c',
    faint: '#8a8a8a',
    rule: '#e2e2e6',
    tint: '#f4f5fb',
    warnBg: '#fdf6e7',
    warnEdge: '#e0a92a',
    tipBg: '#eef6fd',
    tipEdge: '#3a90d0',
    proBg: '#f6f0fd',
    proEdge: '#8b31d9',
}

// The built-in PDF fonts only cover WinAnsi, and react-pdf does not reliably map
// the punctuation the site uses into it — an em dash comes out as a replacement
// glyph. Swap those for print-safe equivalents rather than shipping a 400 KB
// font file into the repo just to render dashes.
const TRANSLITERATE = [
    [/[—–]/g, '-'],
    [/→/g, '>'],
    [/[‘’]/g, "'"],
    [/[“”]/g, '"'],
    [/…/g, '...'],
    [/·/g, '-'],
    [/[✓✅]/g, 'Yes'],
    [/[✗❌]/g, 'No'],
]

// Anything still non-ASCII after transliteration would render as a blank or a
// replacement glyph. Collect it and report at the end so new content can't
// silently ship a broken PDF.
const unmapped = new Set()

function clean(value) {
    let out = String(value)
    for (const [pattern, replacement] of TRANSLITERATE) out = out.replace(pattern, replacement)

    return out.replace(/[^\x20-\x7E\n]/g, (char) => {
        unmapped.add(char)
        return ''
    })
}

const styles = StyleSheet.create({
    page: { paddingTop: 54, paddingBottom: 64, paddingHorizontal: 52, fontSize: 10.5, color: COLOR.text, lineHeight: 1.55, fontFamily: 'Helvetica' },
    coverPage: { padding: 0, color: COLOR.text, fontFamily: 'Helvetica' },
    coverBand: { backgroundColor: COLOR.primary, paddingHorizontal: 52, paddingTop: 130, paddingBottom: 54 },
    coverKicker: { color: '#c3d2fb', fontSize: 10, letterSpacing: 2, fontFamily: 'Helvetica-Bold' },
    coverTitle: { color: '#ffffff', fontSize: 40, fontFamily: 'Helvetica-Bold', marginTop: 16, lineHeight: 1.15 },
    coverTagline: { color: '#dbe4fc', fontSize: 12.5, marginTop: 18, lineHeight: 1.6, maxWidth: 400 },
    coverBody: { paddingHorizontal: 52, paddingTop: 40 },
    coverMetaLabel: { fontSize: 8.5, letterSpacing: 1.4, color: COLOR.faint, fontFamily: 'Helvetica-Bold' },
    coverMetaValue: { fontSize: 11.5, color: COLOR.text, marginTop: 4 },

    h1: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: COLOR.text, lineHeight: 1.25 },
    chapterKicker: { fontSize: 8.5, letterSpacing: 1.4, color: COLOR.primary, fontFamily: 'Helvetica-Bold', marginBottom: 6 },
    summary: { fontSize: 11, color: COLOR.muted, marginTop: 10, marginBottom: 18, paddingLeft: 12, borderLeftWidth: 2, borderLeftColor: COLOR.primary, lineHeight: 1.6 },
    prose: { color: COLOR.muted, marginBottom: 12 },

    stepRow: { flexDirection: 'row', marginBottom: 11 },
    stepNum: { width: 20, fontFamily: 'Helvetica-Bold', color: COLOR.primary, fontSize: 11 },
    stepTitle: { fontFamily: 'Helvetica-Bold', color: COLOR.text, marginBottom: 2 },
    stepBody: { color: COLOR.muted },

    tableCaption: { fontSize: 9, color: COLOR.faint, fontFamily: 'Helvetica-Bold', letterSpacing: 0.6, marginBottom: 6 },
    table: { borderWidth: 1, borderColor: COLOR.rule, borderRadius: 4, marginBottom: 14, overflow: 'hidden' },
    tHeadRow: { flexDirection: 'row', backgroundColor: COLOR.tint, borderBottomWidth: 1, borderBottomColor: COLOR.rule },
    tHeadCell: { paddingVertical: 7, paddingHorizontal: 9, fontSize: 8.5, letterSpacing: 0.7, fontFamily: 'Helvetica-Bold', color: COLOR.muted },
    tRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: COLOR.rule },
    tRowLast: { flexDirection: 'row' },
    tCell: { paddingVertical: 7, paddingHorizontal: 9, fontSize: 9.5, color: COLOR.muted, lineHeight: 1.45 },
    tCellFirst: { fontFamily: 'Helvetica-Bold', color: COLOR.text },

    callout: { borderLeftWidth: 3, borderRadius: 3, padding: 11, marginBottom: 14 },
    calloutLabel: { fontSize: 8, letterSpacing: 1.2, fontFamily: 'Helvetica-Bold', marginBottom: 4 },
    calloutTitle: { fontFamily: 'Helvetica-Bold', color: COLOR.text, marginBottom: 3 },
    calloutBody: { color: COLOR.muted, fontSize: 10 },

    qa: { marginBottom: 13 },
    qaQ: { fontFamily: 'Helvetica-Bold', color: COLOR.text, marginBottom: 3 },
    qaA: { color: COLOR.muted },

    tocRow: { flexDirection: 'row', paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: COLOR.rule },
    tocNum: { width: 26, fontFamily: 'Helvetica-Bold', color: COLOR.primary },
    tocTitle: { flexGrow: 1, fontFamily: 'Helvetica-Bold', color: COLOR.text },
    tocSummary: { color: COLOR.faint, fontSize: 9, marginTop: 2 },

    footer: { position: 'absolute', bottom: 28, left: 52, right: 52, flexDirection: 'row', justifyContent: 'space-between', fontSize: 8.5, color: COLOR.faint, borderTopWidth: 1, borderTopColor: COLOR.rule, paddingTop: 8 },
})

const CALLOUT_TONE = {
    tip: { label: 'TIP', bg: COLOR.tipBg, edge: COLOR.tipEdge },
    warning: { label: 'IMPORTANT', bg: COLOR.warnBg, edge: COLOR.warnEdge },
    pro: { label: 'PLANS', bg: COLOR.proBg, edge: COLOR.proEdge },
}

/** Column widths as percentages. Tables in the guide are all 2 or 3 columns. */
function columnWidths(count) {
    if (count === 2) return ['40%', '60%']
    if (count === 3) return ['32%', '24%', '44%']
    return Array.from({ length: count }, () => `${100 / count}%`)
}

function renderTable(block, key) {
    const widths = columnWidths(block.head.length)

    return h(View, { key, wrap: false }, [
        h(Text, { key: 'cap', style: styles.tableCaption }, clean(block.caption).toUpperCase()),
        h(View, { key: 'tbl', style: styles.table }, [
            h(
                View,
                { key: 'head', style: styles.tHeadRow },
                block.head.map((cell, i) =>
                    h(Text, { key: i, style: [styles.tHeadCell, { width: widths[i] }] }, clean(cell).toUpperCase())
                )
            ),
            ...block.rows.map((row, rowIdx) =>
                h(
                    View,
                    {
                        key: rowIdx,
                        style: rowIdx === block.rows.length - 1 ? styles.tRowLast : styles.tRow,
                        wrap: false,
                    },
                    row.map((cell, cellIdx) =>
                        h(
                            Text,
                            {
                                key: cellIdx,
                                style: [
                                    styles.tCell,
                                    { width: widths[cellIdx] },
                                    cellIdx === 0 ? styles.tCellFirst : null,
                                ],
                            },
                            clean(cell)
                        )
                    )
                )
            ),
        ]),
    ])
}

function renderBlock(block, key) {
    switch (block.type) {
        case 'prose':
            return h(Text, { key, style: styles.prose }, clean(block.body))

        case 'steps':
            return h(
                View,
                { key },
                block.items.map((item, i) =>
                    h(View, { key: i, style: styles.stepRow, wrap: false }, [
                        h(Text, { key: 'n', style: styles.stepNum }, `${i + 1}.`),
                        h(View, { key: 'b', style: { flexGrow: 1, flexShrink: 1 } }, [
                            h(Text, { key: 't', style: styles.stepTitle }, clean(item.title)),
                            h(Text, { key: 'd', style: styles.stepBody }, clean(item.body)),
                        ]),
                    ])
                )
            )

        case 'table':
            return renderTable(block, key)

        case 'callout': {
            const tone = CALLOUT_TONE[block.tone]
            if (!tone) throw new Error(`Unknown callout tone: ${block.tone}`)
            return h(
                View,
                { key, style: [styles.callout, { backgroundColor: tone.bg, borderLeftColor: tone.edge }], wrap: false },
                [
                    h(Text, { key: 'l', style: [styles.calloutLabel, { color: tone.edge }] }, tone.label),
                    h(Text, { key: 't', style: styles.calloutTitle }, clean(block.title)),
                    h(Text, { key: 'b', style: styles.calloutBody }, clean(block.body)),
                ]
            )
        }

        case 'qa':
            return h(
                View,
                { key },
                block.items.map((item, i) =>
                    h(View, { key: i, style: styles.qa, wrap: false }, [
                        h(Text, { key: 'q', style: styles.qaQ }, clean(item.q)),
                        h(Text, { key: 'a', style: styles.qaA }, clean(item.a)),
                    ])
                )
            )

        case 'downloads':
            // Rendered as plain link rows in the PDF — browser icons can't be
            // embedded without shipping binary assets into the script.
            return h(
                View,
                { key, style: { marginBottom: 12 } },
                block.items.map((item, i) =>
                    h(View, { key: i, style: { flexDirection: 'row', marginBottom: 6 }, wrap: false }, [
                        h(Text, { key: 'n', style: { fontFamily: 'Helvetica-Bold', color: COLOR.text, width: '30%' } }, clean(item.name)),
                        h(Link, { key: 'u', src: item.url, style: { color: COLOR.primary, fontSize: 9.5, flexGrow: 1 } }, item.url),
                    ])
                )
            )

        default:
            throw new Error(`Unknown block type: ${block.type}`)
    }
}

function footer(guide) {
    return h(View, { key: 'footer', style: styles.footer, fixed: true }, [
        h(Text, { key: 'l' }, `${clean(guide.title)}  -  v${guide.version}`),
        h(Text, {
            key: 'r',
            render: ({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`,
        }),
    ])
}

function buildDocument(guide) {
    const updated = new Date(guide.updated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    // Cover
    const cover = h(Page, { size: 'A4', style: styles.coverPage, key: 'cover' }, [
        h(View, { key: 'band', style: styles.coverBand }, [
            h(Text, { key: 'k', style: styles.coverKicker }, 'LOCKSY.DEV'),
            h(Text, { key: 't', style: styles.coverTitle }, clean(guide.title)),
            h(Text, { key: 'g', style: styles.coverTagline }, clean(guide.tagline)),
        ]),
        h(View, { key: 'meta', style: styles.coverBody }, [
            h(View, { key: 'r1', style: { flexDirection: 'row', marginBottom: 20 } }, [
                h(View, { key: 'a', style: { width: '33%' } }, [
                    h(Text, { key: 'l', style: styles.coverMetaLabel }, 'VERSION'),
                    h(Text, { key: 'v', style: styles.coverMetaValue }, `Locksy v${guide.version}`),
                ]),
                h(View, { key: 'b', style: { width: '33%' } }, [
                    h(Text, { key: 'l', style: styles.coverMetaLabel }, 'LAST UPDATED'),
                    h(Text, { key: 'v', style: styles.coverMetaValue }, updated),
                ]),
                h(View, { key: 'c', style: { width: '33%' } }, [
                    h(Text, { key: 'l', style: styles.coverMetaLabel }, 'CHAPTERS'),
                    h(Text, { key: 'v', style: styles.coverMetaValue }, String(guide.chapters.length)),
                ]),
            ]),
            h(Text, { key: 'link', style: { fontSize: 10, color: COLOR.muted } }, [
                'Always-current version online at ',
                h(Link, { key: 'a', src: 'https://www.locksy.dev/guide', style: { color: COLOR.primary } }, 'locksy.dev/guide'),
            ]),
        ]),
    ])

    // Contents
    const contents = h(Page, { size: 'A4', style: styles.page, key: 'toc' }, [
        h(Text, { key: 'h', style: styles.h1 }, 'Contents'),
        h(View, { key: 'l', style: { marginTop: 18 } },
            guide.chapters.map((chapter) =>
                h(View, { key: chapter.id, style: styles.tocRow, wrap: false }, [
                    h(Text, { key: 'n', style: styles.tocNum }, String(chapter.num)),
                    h(View, { key: 'b', style: { flexGrow: 1, flexShrink: 1 } }, [
                        h(Text, { key: 't', style: styles.tocTitle }, clean(chapter.title)),
                        h(Text, { key: 's', style: styles.tocSummary }, clean(chapter.summary)),
                    ]),
                ])
            )
        ),
        footer(guide),
    ])

    // One flow per chapter, each starting on a fresh page.
    const chapters = guide.chapters.map((chapter) =>
        h(Page, { size: 'A4', style: styles.page, key: chapter.id }, [
            h(Text, { key: 'k', style: styles.chapterKicker }, `CHAPTER ${chapter.num}`),
            h(Text, { key: 'h', style: styles.h1 }, clean(chapter.title)),
            h(Text, { key: 's', style: styles.summary }, clean(chapter.summary)),
            ...chapter.blocks.map((block, i) => renderBlock(block, `b${i}`)),
            footer(guide),
        ])
    )

    return h(Document, {
        title: guide.title,
        author: 'Locksy',
        subject: 'How to use the Locksy browser extension',
        creator: 'locksy.dev',
        producer: 'locksy.dev',
    }, [cover, contents, ...chapters])
}

const guide = JSON.parse(readFileSync(CONTENT_PATH, 'utf8'))
await renderToFile(buildDocument(guide), OUT_PATH)

const blockCount = guide.chapters.reduce((total, chapter) => total + chapter.blocks.length, 0)
console.log(`Wrote ${OUT_PATH}`)
console.log(`  ${guide.chapters.length} chapters, ${blockCount} blocks, Locksy v${guide.version}`)

if (unmapped.size > 0) {
    const chars = [...unmapped].map((c) => `${JSON.stringify(c)} (U+${c.codePointAt(0).toString(16).toUpperCase()})`)
    console.warn(`\n  Note: dropped ${unmapped.size} unmappable character(s): ${chars.join(', ')}`)
    console.warn('  Add a rule to TRANSLITERATE if any of these should appear in the PDF.')
}
