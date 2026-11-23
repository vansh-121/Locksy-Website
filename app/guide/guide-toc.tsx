"use client"

// Sticky table of contents with scroll-spy highlighting.
//
// This is the only client component on the guide page. It renders the complete
// link list as its initial state — never null — so the navigation is present in
// the server HTML and works before hydration. The guide body itself stays a
// server component, which keeps 100% of the prose in the initial response.

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

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
    <ol className="space-y-0.5 border-l border-border">
      {entries.map((entry) => {
        const isActive = entry.id === activeId
        return (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              onClick={() => setIsOpen(false)}
              aria-current={isActive ? "location" : undefined}
              className={`-ml-px flex items-start gap-2.5 border-l py-1.5 pl-4 text-sm leading-snug transition-colors ${
                isActive
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              <span
                className={`mt-px w-5 flex-shrink-0 font-mono text-xs tabular-nums ${
                  isActive ? "text-highlight" : "text-muted-foreground/70"
                }`}
              >
                {String(entry.num).padStart(2, "0")}
              </span>
              <span>{entry.title}</span>
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
        className="hidden lg:block sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pb-4"
      >
        <p className="mb-4 text-xs font-medium text-muted-foreground">Contents</p>
        {links}
      </nav>

      {/* Mobile: collapsible panel above the content */}
      <div className="lg:hidden mb-8 rounded-2xl border border-border bg-card">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        >
          <span className="text-sm font-medium text-foreground">
            Contents
            <span className="ml-2 font-normal text-muted-foreground">
              {entries.length} chapters
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isOpen && <div className="border-t border-border px-5 py-4">{links}</div>}
      </div>
    </>
  )
}
