"use client"

// Sticky table of contents with scroll-spy highlighting.
//
// This is the only client component on the guide page. It renders the complete
// link list as its initial state — never null — so the navigation is present in
// the server HTML and works before hydration. The guide body itself stays a
// server component, which keeps 100% of the prose in the initial response.

import { useEffect, useState } from "react"

interface TocEntry {
  id: string
  num: number
  title: string
  icon: string
}

export default function GuideToc({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>(entries[0]?.id ?? "")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Highlight the chapter nearest the top of the viewport. rootMargin pulls the
    // detection line down from the header and up from the bottom, so a heading
    // counts as "current" while its section fills the screen rather than only
    // during the instant it crosses the very top.
    const observer = new IntersectionObserver(
      (observations) => {
        const visible = observations
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    )

    for (const entry of entries) {
      const el = document.getElementById(entry.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [entries])

  const links = (
    <ol className="space-y-1">
      {entries.map((entry) => {
        const isActive = entry.id === activeId
        return (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              onClick={() => setIsOpen(false)}
              aria-current={isActive ? "location" : undefined}
              className={`flex items-start gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
              }`}
            >
              <span
                className={`mt-px w-5 flex-shrink-0 text-right text-xs font-bold tabular-nums ${
                  isActive ? "text-primary" : "text-muted-foreground/60"
                }`}
              >
                {entry.num}
              </span>
              <span className="leading-snug">{entry.title}</span>
            </a>
          </li>
        )
      })}
    </ol>
  )

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav
        aria-label="Guide contents"
        className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm"
      >
        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Contents
        </p>
        {links}
      </nav>

      {/* Mobile: collapsible panel above the content */}
      <div className="lg:hidden mb-8 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        >
          <span className="font-semibold text-foreground">
            Contents
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              {entries.length} chapters
            </span>
          </span>
          <span
            aria-hidden="true"
            className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
          >
            ▾
          </span>
        </button>
        {isOpen && <div className="border-t border-border/60 p-3">{links}</div>}
      </div>
    </>
  )
}
