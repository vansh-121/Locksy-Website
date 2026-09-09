"use client"

import { useEffect, useState } from 'react'
import type { GuideChapter } from '@/lib/guide-data'

export default function GuideToc({ chapters }: { chapters: GuideChapter[] }) {
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? '')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const headings = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((element): element is HTMLElement => Boolean(element))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: 0 }
    )

    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [chapters])

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="User guide contents">
      <button
        type="button"
        className="lg:hidden w-full flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 font-semibold text-foreground"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>Guide contents</span>
        <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>

      <nav className={`${open ? 'block' : 'hidden'} lg:block mt-3 lg:mt-0 rounded-2xl border border-border bg-card/80 p-3 shadow-sm`}>
        <p className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">On this page</p>
        <ol className="space-y-1">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                onClick={() => setOpen(false)}
                className={`flex items-start gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeId === chapter.id
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                <span className="w-5 flex-shrink-0 text-right tabular-nums">{chapter.num}</span>
                <span>{chapter.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  )
}
