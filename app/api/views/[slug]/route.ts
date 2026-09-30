// app/api/views/[slug]/route.ts
//
// Per-post view counter endpoint. POST increments (one genuine page view),
// GET reads without incrementing. Node runtime is required by @upstash/redis.
// force-dynamic keeps these responses out of the static/full-route cache so a
// count is never frozen at build time.

import { incrementView, getViews } from '@/lib/views'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
        },
    })

export async function POST(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params
    const views = await incrementView(slug)
    // null means Upstash isn't configured (or the slug was invalid). Report it
    // honestly with 200 + views:null so the client hides the widget rather than
    // surfacing a fabricated number or a console error.
    return json({ slug, views })
}

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params
    const views = await getViews(slug)
    return json({ slug, views })
}
