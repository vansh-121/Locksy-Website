/**
 * Generate the downloadable Locksy user guide PDF from the shared JSON source.
 * Usage: npm run guide:pdf
 */

import { readFileSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import React from 'react'
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer'

const root = path.dirname(fileURLToPath(import.meta.url))
const guide = JSON.parse(readFileSync(path.join(root, '../lib/guide-content.json'), 'utf8'))
const output = path.join(root, '../public/locksy-user-guide.pdf')

const styles = StyleSheet.create({
  page: { padding: 42, paddingBottom: 48, fontFamily: 'Helvetica', color: '#171717', fontSize: 9, lineHeight: 1.45 },
  cover: { justifyContent: 'center', backgroundColor: '#fafafa' },
  logo: { fontSize: 14, fontWeight: 'bold', color: '#6d28d9', marginBottom: 18 },
  coverTitle: { fontSize: 30, fontWeight: 'bold', marginBottom: 14 },
  coverText: { fontSize: 12, color: '#525252', maxWidth: 430, lineHeight: 1.6 },
  stamp: { marginTop: 30, fontSize: 10, color: '#737373' },
  tocTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  tocRow: { flexDirection: 'row', marginBottom: 8 },
  tocNum: { width: 26, fontWeight: 'bold', color: '#6d28d9' },
  chapter: { marginBottom: 20 },
  chapterTitle: { fontSize: 20, fontWeight: 'bold', color: '#171717', marginBottom: 8 },
  intro: { fontSize: 10, color: '#525252', marginBottom: 13, lineHeight: 1.55 },
  step: { flexDirection: 'row', marginBottom: 9, padding: 9, border: '1 solid #e5e5e5', borderRadius: 6 },
  stepNum: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#6d28d9', color: '#fff', textAlign: 'center', paddingTop: 5, marginRight: 9, fontSize: 8, fontWeight: 'bold' },
  stepBody: { flex: 1 },
  bold: { fontWeight: 'bold', marginBottom: 3 },
  muted: { color: '#525252' },
  prose: { marginBottom: 10, color: '#525252', lineHeight: 1.6 },
  callout: { padding: 10, marginBottom: 10, borderRadius: 6, backgroundColor: '#f5f3ff', border: '1 solid #ddd6fe' },
  warning: { backgroundColor: '#fffbeb', border: '1 solid #fde68a' },
  pro: { backgroundColor: '#faf5ff', border: '1 solid #e9d5ff' },
  table: { marginBottom: 12, border: '1 solid #d4d4d4', borderRadius: 5 },
  tableTitle: { padding: 8, fontWeight: 'bold', backgroundColor: '#f5f5f5' },
  row: { flexDirection: 'row', borderTop: '1 solid #e5e5e5' },
  cell: { flex: 1, padding: 7, color: '#404040' },
  head: { fontWeight: 'bold', color: '#171717', backgroundColor: '#fafafa' },
  qa: { marginBottom: 9 },
  footer: { position: 'absolute', bottom: 22, left: 42, right: 42, flexDirection: 'row', justifyContent: 'space-between', fontSize: 8, color: '#737373' }
})

function Block({ block }) {
  if (block.type === 'steps') return block.items.map((item, i) => React.createElement(View, { key: item.title, style: styles.step, wrap: false },
    React.createElement(Text, { style: styles.stepNum }, String(i + 1)),
    React.createElement(View, { style: styles.stepBody }, React.createElement(Text, { style: styles.bold }, item.title), React.createElement(Text, { style: styles.muted }, item.body))))
  if (block.type === 'prose') return React.createElement(Text, { style: styles.prose }, block.body)
  if (block.type === 'callout') return React.createElement(View, { style: [styles.callout, block.tone === 'warning' ? styles.warning : block.tone === 'pro' ? styles.pro : null], wrap: false }, React.createElement(Text, { style: styles.bold }, block.title), React.createElement(Text, { style: styles.muted }, block.body))
  if (block.type === 'qa') return block.items.map(item => React.createElement(View, { key: item.q, style: styles.qa, wrap: false }, React.createElement(Text, { style: styles.bold }, item.q), React.createElement(Text, { style: styles.muted }, item.a)))
  return React.createElement(View, { style: styles.table, wrap: false },
    React.createElement(Text, { style: styles.tableTitle }, block.caption),
    React.createElement(View, { style: styles.row }, block.head.map((cell, i) => React.createElement(Text, { key: i, style: [styles.cell, styles.head] }, cell))),
    block.rows.map((row, i) => React.createElement(View, { key: i, style: styles.row, wrap: false }, row.map((cell, j) => React.createElement(Text, { key: j, style: styles.cell }, cell))))
  )
}

function GuidePdf() {
  return React.createElement(Document, { title: 'Locksy User Guide', author: 'Locksy', subject: 'Complete Locksy user guide' },
    React.createElement(Page, { size: 'A4', style: [styles.page, styles.cover] },
      React.createElement(Text, { style: styles.logo }, 'LOCKSY'),
      React.createElement(Text, { style: styles.coverTitle }, 'Locksy User Guide'),
      React.createElement(Text, { style: styles.coverText }, 'A complete, step-by-step guide to installing Locksy, protecting tabs, automating locks, securing domains, using biometrics, catching snoopers, and understanding the local-first security model.'),
      React.createElement(Text, { style: styles.stamp }, `Version ${guide.version} · Updated ${guide.updated}`),
      React.createElement(View, { style: styles.footer }, React.createElement(Text, null, 'locksy.dev/guide'), React.createElement(Text, { render: ({ pageNumber }) => String(pageNumber) }))
    ),
    React.createElement(Page, { size: 'A4', style: styles.page },
      React.createElement(Text, { style: styles.tocTitle }, 'Contents'),
      ...guide.chapters.map(chapter => React.createElement(View, { key: chapter.id, style: styles.tocRow }, React.createElement(Text, { style: styles.tocNum }, `${chapter.num}.`), React.createElement(Text, null, chapter.title))),
      React.createElement(View, { style: styles.footer }, React.createElement(Text, null, `Locksy User Guide · v${guide.version}`), React.createElement(Text, { render: ({ pageNumber }) => String(pageNumber) }))
    ),
    ...guide.chapters.map(chapter => React.createElement(Page, { key: chapter.id, size: 'A4', style: styles.page },
      React.createElement(View, { style: styles.chapter },
        React.createElement(Text, { style: styles.chapterTitle }, `${chapter.num}. ${chapter.icon} ${chapter.title}`),
        React.createElement(Text, { style: styles.intro }, chapter.intro),
        ...chapter.blocks.map((block, i) => React.createElement(Block, { key: i, block }))
      ),
      React.createElement(View, { style: styles.footer }, React.createElement(Text, null, `Locksy User Guide · v${guide.version}`), React.createElement(Text, { render: ({ pageNumber }) => String(pageNumber) }))
    ))
  )
}

const buffer = await pdf(React.createElement(GuidePdf)).toBuffer()
await writeFile(output, buffer)
console.log(`Wrote ${output}`)
