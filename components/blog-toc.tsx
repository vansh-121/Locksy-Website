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
import { ChevronDown, List } from 'lucide-react'
import { slugify } from '@/lib/utils'
import { TocInstallWidget } from './browser-install-cta'

export interface TocHeading {
    id: string
    text: string
    level: 2 | 3
    /** 1-based line in the markdown source; matches ReactMarkdown's node.position.start.line. */
    line: number
}

// Parse ## and ### headings out of markdown. Fenced code blocks are skipped so
// a commented "## foo" inside a snippet doesn't become a TOC entry.
export function extractHeadings(markdown: string): TocHeading[] {
    const lines = markdown.split('\n')
    const headings: TocHeading[] = []
    const seen = new Map<string, number>()
    let inFence = false

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
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

        headings.push({ id, text, level, line: i + 1 })
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
        <ol className="space-y-0.5 border-l border-border">
            {headings.map((heading) => {
                const isActive = heading.id === activeId
                return (
                    <li key={heading.id}>
                        <a
                            href={`#${heading.id}`}
                            onClick={() => setIsOpen(false)}
                            aria-current={isActive ? 'location' : undefined}
                            className={`-ml-px block border-l py-1.5 text-sm leading-snug transition-colors ${
                                heading.level === 3 ? 'pl-7 text-[13px]' : 'pl-4'
                            } ${
                                isActive
                                    ? 'border-foreground text-foreground'
                                    : 'border-transparent text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                            }`}
                        >
                            {heading.text}
                        </a>
                    </li>
                )
            })}
        </ol>
    )

    return (
        <>
            {/* Desktop: sticky sidebar (lg and up) */}
            <nav
                aria-label="Table of contents"
                className="hidden lg:block sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pb-4"
            >
                <p className="mb-4 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <List className="h-3.5 w-3.5" aria-hidden="true" />
                    On this page
                </p>
                {links}
                <TocInstallWidget />
            </nav>

            {/* Mobile / Tablet: collapsible panel above the content */}
            <div className="lg:hidden rounded-2xl border border-border bg-card">
                <button
                    type="button"
                    onClick={() => setIsOpen((open) => !open)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                    <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <List className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        On this page
                        <span className="ml-1 font-normal text-muted-foreground">
                            {headings.length} sections
                        </span>
                    </span>
                    <ChevronDown
                        aria-hidden="true"
                        className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>
                {isOpen && <div className="border-t border-border px-5 py-4">{links}</div>}
            </div>
        </>
    )
}
