// Renderers for the five guide block types. Server components — no client state,
// so every word ends up in the initial HTML.
//
// Block shapes are defined in lib/guide-data.ts and the content lives in
// lib/guide-content.json.

import type { GuideBlock } from "@/lib/guide-data"

const CALLOUT_STYLES = {
  tip: {
    wrapper: "border-sky-500/30 bg-sky-500/5",
    badge: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
    icon: "💡",
    label: "Tip",
  },
  warning: {
    wrapper: "border-amber-500/40 bg-amber-500/5",
    badge: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    icon: "⚠️",
    label: "Important",
  },
  pro: {
    wrapper: "border-violet-500/30 bg-violet-500/5",
    badge: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
    icon: "💎",
    label: "Plans",
  },
} as const

function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="space-y-4">
      {items.map((item, idx) => (
        <li
          key={item.title}
          className="flex gap-4 rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm"
        >
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white shadow-md">
            {idx + 1}
          </span>
          <div className="min-w-0">
            <h3 className="font-bold text-foreground">{item.title}</h3>
            <p className="mt-1 leading-relaxed text-muted-foreground">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function Downloads({ items }: { items: { name: string; store: string; url: string; icon: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10"
        >
          <img src={item.icon} alt={item.name} className="h-10 w-10 flex-shrink-0 object-contain" />
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground">Get it for</p>
            <p className="font-bold text-foreground">{item.name}</p>
            <p className="truncate text-xs text-muted-foreground">{item.store}</p>
          </div>
          <svg
            aria-hidden="true"
            className="ml-auto h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      ))}
    </div>
  )
}

function Table({ caption, head, rows }: { caption: string; head: string[]; rows: string[][] }) {
  return (
    <div>
      {/* Desktop: a real table. Mobile gets the stacked cards below instead,
          because a 3-column table at 375px is unreadable either way. */}
      <div className="hidden overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg shadow-primary/5 md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-border/60 bg-gradient-to-r from-primary/10 to-secondary/10">
              {head.map((cell) => (
                <th
                  key={cell}
                  scope="col"
                  className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={row[0]}
                className={rowIdx < rows.length - 1 ? "border-b border-border/40" : undefined}
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={`${row[0]}-${head[cellIdx]}`}
                    className={`px-5 py-4 align-top text-sm leading-relaxed ${
                      cellIdx === 0 ? "font-semibold text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {rows.map((row) => (
          <div key={row[0]} className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
            <p className="font-bold text-foreground">{row[0]}</p>
            <dl className="mt-2 space-y-1.5">
              {row.slice(1).map((cell, idx) => (
                <div key={head[idx + 1]} className="flex gap-2 text-sm">
                  <dt className="flex-shrink-0 font-medium text-muted-foreground/80">
                    {head[idx + 1]}:
                  </dt>
                  <dd className="text-muted-foreground">{cell}</dd>
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
              <p key={idx} className="leading-relaxed text-muted-foreground">
                {block.body}
              </p>
            )

          case "steps":
            return <Steps key={idx} items={block.items} />

          case "downloads":
            return <Downloads key={idx} items={block.items} />

          case "table":
            return <Table key={idx} caption={block.caption} head={block.head} rows={block.rows} />

          case "callout": {
            const style = CALLOUT_STYLES[block.tone]
            return (
              <aside key={idx} className={`rounded-2xl border p-5 ${style.wrapper}`}>
                <div className="mb-2 flex items-center gap-2">
                  <span aria-hidden="true">{style.icon}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${style.badge}`}
                  >
                    {style.label}
                  </span>
                </div>
                <h3 className="font-bold text-foreground">{block.title}</h3>
                <p className="mt-1 leading-relaxed text-muted-foreground">{block.body}</p>
              </aside>
            )
          }

          case "qa":
            return (
              <dl key={idx} className="space-y-5">
                {block.items.map((item) => (
                  <div
                    key={item.q}
                    className="rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm"
                  >
                    <dt className="font-bold text-foreground">{item.q}</dt>
                    <dd className="mt-1.5 leading-relaxed text-muted-foreground">{item.a}</dd>
                  </div>
                ))}
              </dl>
            )
        }
      })}
    </div>
  )
}
