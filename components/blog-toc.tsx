'use client'

// Table of contents for a blog post, with scroll-spy highlighting.
//
// Adapted from app/guide/guide-toc.tsx. It renders the complete link list as
// its initial state — never null — so the navigation is present in the server
// HTML and works before hydration (a rendered-word-count release criterion:
// see the AdSense remediation memory).
//
// Entries are derived from the post's markdown headings using the same slugify
// as the article's heading renderers, so anchors always match.

import { useEffect, useState } from 'react'
import { List } from 'lucide-react'
import { slugify } from '@/lib/utils'

export interface TocHeading {
    id: string
    text: string
    level: 2 | 3
}

// Parse ## and ### headings out of markdown. Fenced code blocks are skipped so
// a commented "## foo" inside a snippet doesn't become a TOC entry.
export function extractHeadings(markdown: string): TocHeading[] {
    const lines = markdown.split('\n')
    const headings: TocHeading[] = []
    const seen = new Map<string, number>()
    let inFence = false

    for (const line of lines) {
        if (/^\s*(```|~~~)/.test(line)) {
            inFence = !inFence
            continue
        }
        if (inFence) continue

        const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line)
        if (!match) continue

        const level = match[1].length as 2 | 3
        const text = match[2].replace(/[*_`]/g, '').trim()
        if (!text) continue

        let id = slugify(text)
        if (!id) continue
        // De-dupe repeated headings so every anchor is unique.
        const count = seen.get(id) ?? 0
        seen.set(id, count + 1)
        if (count > 0) id = `${id}-${count}`

        headings.push({ id, text, level })
    }

    return headings
}

export default function BlogToc({ headings }: { headings: TocHeading[] }) {
    const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '')
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (observations) => {
                const visible = observations
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

                if (visible[0]) setActiveId(visible[0].target.id)
            },
            { rootMargin: '-96px 0px -70% 0px', threshold: 0 }
        )

        for (const heading of headings) {
            const el = document.getElementById(heading.id)
            if (el) observer.observe(el)
        }

        return () => observer.disconnect()
    }, [headings])

    if (headings.length === 0) return null

    const links = (
        <ol className="space-y-1">
            {headings.map((heading) => {
                const isActive = heading.id === activeId
                return (
                    <li key={heading.id}>
                        <a
                            href={`#${heading.id}`}
                            onClick={() => setIsOpen(false)}
                            aria-current={isActive ? 'location' : undefined}
                            className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                                heading.level === 3 ? 'pl-6' : ''
                            } ${
                                isActive
                                    ? 'bg-primary/10 font-semibold text-primary'
                                    : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
                            }`}
                        >
                            <span className="leading-snug">{heading.text}</span>
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
                aria-label="Table of contents"
                className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm"
            >
                <p className="mb-3 flex items-center gap-2 px-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    <List className="h-3.5 w-3.5" />
                    On this page
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
                    <span className="flex items-center gap-2 font-semibold text-foreground">
                        <List className="h-4 w-4" />
                        On this page
                        <span className="ml-1 text-sm font-normal text-muted-foreground">
                            {headings.length} sections
                        </span>
                    </span>
                    <span
                        aria-hidden="true"
                        className={`text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    >
                        ▾
                    </span>
                </button>
                {isOpen && <div className="border-t border-border/60 p-3">{links}</div>}
            </div>
        </>
    )
}
