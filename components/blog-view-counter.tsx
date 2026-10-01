'use client'

// Real view counter for blog posts.
//
// On a post page (mode="increment", the default) it POSTs once per genuine load
// to record the view, then shows the returned count. On listing cards
// (mode="display") it shows a count passed in from the batch fetch and never
// increments.
//
// Privacy: no cookies, no localStorage, no PII — the server stores only an
// integer per slug. If the API returns views:null (Upstash not configured) the
// widget renders nothing, so the feature degrades cleanly in dev/CI.

import { useEffect, useRef, useState } from 'react'
import { Eye } from 'lucide-react'

interface BlogViewCounterProps {
    slug: string
    mode?: 'increment' | 'display'
    // For mode="display": the count already fetched by the parent (listing).
    // undefined = still loading; null = unavailable (render nothing).
    count?: number | null
    className?: string
}

function formatCount(n: number): string {
    if (n < 1000) return String(n)
    if (n < 1_000_000) return `${(n / 1000).toFixed(n % 1000 >= 100 ? 1 : 0).replace(/\.0$/, '')}K`
    return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
}

export default function BlogViewCounter({ slug, mode = 'increment', count, className }: BlogViewCounterProps) {
    // For increment mode we own the count in state; for display mode it comes
    // from props.
    const [views, setViews] = useState<number | null | undefined>(
        mode === 'display' ? count : undefined
    )
    const posted = useRef(false)

    useEffect(() => {
        if (mode === 'display') {
            setViews(count)
            return
        }

        // Guard against React StrictMode's double-invoke in dev so a single load
        // counts once. This is per-mount, in-memory only — no persistence.
        if (posted.current) return
        posted.current = true

        let cancelled = false
        fetch(`/api/views/${encodeURIComponent(slug)}`, { method: 'POST' })
            .then(res => (res.ok ? res.json() : null))
            .then(data => {
                if (!cancelled) setViews(data && typeof data.views === 'number' ? data.views : null)
            })
            .catch(() => {
                if (!cancelled) setViews(null)
            })

        return () => {
            cancelled = true
        }
    }, [slug, mode, count])

    // Unavailable (no Upstash / invalid slug): render nothing so we never show a
    // fake or zeroed number.
    if (views === null) return null

    const label = views === undefined ? 'Loading view count' : `${views.toLocaleString('en-US')} views`

    return (
        <span
            className={`flex items-center gap-1 ${className ?? ''}`}
            title={views === undefined ? undefined : `${views.toLocaleString('en-US')} views`}
            aria-label={label}
        >
            <Eye className="h-4 w-4" aria-hidden="true" />
            {views === undefined ? (
                // Fixed-width skeleton to avoid layout shift while loading.
                <span className="inline-block h-3.5 w-8 animate-pulse rounded bg-muted-foreground/20" aria-hidden="true" />
            ) : (
                <span>{formatCount(views)}</span>
            )}
        </span>
    )
}
