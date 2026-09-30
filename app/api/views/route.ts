// app/api/views/route.ts
//
// Batch read-only view counts for the blog listing page:
//   GET /api/views?slugs=slug-a,slug-b,slug-c
// Never increments — the listing must not inflate counts. Node runtime for
// @upstash/redis; force-dynamic so counts are always current.

import { getViewsBatch } from '@/lib/views'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Cap the batch so a crafted query string can't ask for an unbounded MGET.
const MAX_SLUGS = 100

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const raw = searchParams.get('slugs') ?? ''

    const slugs = raw
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .slice(0, MAX_SLUGS)

    const views = await getViewsBatch(slugs)

    return new Response(JSON.stringify({ views }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
        },
    })
}
