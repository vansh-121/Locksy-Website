// Renderers for the five guide block types. Server components — no client state,
// so every word ends up in the initial HTML.
//
// Block shapes are defined in lib/guide-data.ts and the content lives in
// lib/guide-content.json.

import { Lightbulb, Sparkles, TriangleAlert } from "lucide-react"
import type { GuideBlock } from "@/lib/guide-data"
import GuideDownloads from "@/components/guide-downloads"

// Same look as the shared `Callout` in components/page-shell.tsx, but rendered
// here so the callout title can stay an <h3> (Callout renders its title as <p>).
const CALLOUT_STYLES = {
  tip: { icon: Lightbulb, color: "text-highlight", label: "Tip" },
  warning: { icon: TriangleAlert, color: "text-amber-500", label: "Important" },
  pro: { icon: Sparkles, color: "text-highlight", label: "Plans" },
} as const

// Matches cells like "Alt + Shift + 9" / "Option + Shift + 0" so they render as keys.
const SHORTCUT_RE = /^(?:(?:Alt|Shift|Option|Ctrl|Control|Cmd|Command|Meta)\s*\+\s*)+[A-Za-z0-9]+$/i

function CellContent({ value }: { value: string }) {
  if (!SHORTCUT_RE.test(value)) return <>{value}</>
  const keys = value.split("+").map((k) => k.trim())
  return (
    <span className="inline-flex flex-wrap items-center gap-1" aria-label={value}>
      {keys.map((k, i) => (
        <span key={`${k}-${i}`} className="inline-flex items-center gap-1" aria-hidden="true">
          {i > 0 && <span className="text-xs text-muted-foreground">+</span>}
          <kbd className="kbd">{k}</kbd>
        </span>
      ))}
    </span>
  )
}

function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, idx) => (
        <li key={item.title} className="surface flex gap-5 p-6">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border bg-background font-mono text-xs text-foreground">
            {String(idx + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 pt-1.5">
            <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function Table({ caption, head, rows }: { caption: string; head: string[]; rows: string[][] }) {
  return (
    <div>
      {/* Desktop: a real table. Mobile gets the stacked cards below instead,
          because a 3-column table at 375px is unreadable either way. */}
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-card md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {head.map((cell) => (
                <th key={cell} scope="col" className="px-5 py-3.5 text-xs font-medium text-muted-foreground">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={row[0]} className={rowIdx < rows.length - 1 ? "border-b border-border" : undefined}>
                {row.map((cell, cellIdx) => (
                  <td
                    key={`${row[0]}-${head[cellIdx]}`}
                    className={`px-5 py-4 align-top text-sm leading-relaxed ${
                      cellIdx === 0 ? "font-medium text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <CellContent value={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {rows.map((row) => (
          <div key={row[0]} className="rounded-2xl border border-border bg-card p-4">
            <p className="font-medium text-foreground">
              <CellContent value={row[0]} />
            </p>
            <dl className="mt-2 space-y-1.5">
              {row.slice(1).map((cell, idx) => (
                <div key={head[idx + 1]} className="flex gap-2 text-sm">
                  <dt className="flex-shrink-0 text-muted-foreground/80">{head[idx + 1]}:</dt>
                  <dd className="text-muted-foreground">
                    <CellContent value={cell} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function GuideBlocks({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "prose":
            return (
              <p key={idx} className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
                {block.body}
              </p>
            )

          case "steps":
            return <Steps key={idx} items={block.items} />

          case "downloads":
            // Reordered client-side so the visitor's browser comes first.
            return <GuideDownloads key={idx} />

          case "table":
            return <Table key={idx} caption={block.caption} head={block.head} rows={block.rows} />

          case "callout": {
            const style = CALLOUT_STYLES[block.tone]
            const Icon = style.icon
            return (
              <aside key={idx} className="flex gap-3 rounded-2xl border border-border bg-muted/50 p-5">
                <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${style.color}`} aria-hidden="true" />
                <div className="min-w-0 text-sm leading-relaxed text-muted-foreground">
                  <p className="text-xs text-muted-foreground">{style.label}</p>
                  <h3 className="mt-0.5 font-sans text-[15px] font-medium tracking-normal text-foreground">{block.title}</h3>
                  <p className="mt-1">{block.body}</p>
                </div>
              </aside>
            )
          }

          case "qa":
            return (
              <dl key={idx} className="divide-y divide-border border-y border-border">
                {block.items.map((item) => (
                  <div key={item.q} className="py-5">
                    <dt className="font-medium text-foreground">{item.q}</dt>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{item.a}</dd>
                  </div>
                ))}
              </dl>
            )
        }
      })}
    </div>
  )
}
