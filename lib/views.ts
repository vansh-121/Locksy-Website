// lib/views.ts
//
// Real, cross-visitor, cross-deploy blog view counts backed by Upstash Redis.
//
// Design constraints:
//  - Counts must be REAL page views, never fabricated (site claims are checked
//    by an AdSense reviewer — see the AdSense remediation memory).
//  - No cookies, no localStorage, no PII. We store a single integer per slug
//    under the key `views:<slug>`. That is the entire data model.
//  - Graceful degradation: if the Upstash env vars are absent (local dev, CI,
//    a fork without secrets), every helper returns null instead of throwing, so
//    `next build` and `next dev` keep working and the UI simply hides the count.

import { Redis } from '@upstash/redis'

// Slugs come from the URL and are used to build a Redis key. Validate them the
// same way the generator sanitizes filenames (see scripts/generate-blog.mjs) so
// a hostile path segment can never reach Redis as a wildcard or an odd key.
const SLUG_RE = /^[a-z0-9-]+$/

function isValidSlug(slug: string): boolean {
    return typeof slug === 'string' && slug.length > 0 && slug.length <= 200 && SLUG_RE.test(slug)
}

// Singleton client. `Redis.fromEnv()` would also work, but reading the vars
// explicitly lets us detect "not configured" and degrade instead of throwing at
// import time (which would break the static build).
let client: Redis | null = null
let initialized = false

function getClient(): Redis | null {
    if (initialized) return client
    initialized = true

    const url = process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.UPSTASH_REDIS_REST_TOKEN

    if (!url || !token) {
        client = null
        return null
    }

    try {
        client = new Redis({ url, token })
    } catch {
        client = null
    }
    return client
}

const keyFor = (slug: string) => `views:${slug}`

/**
 * Atomically increment and return the view count for a post. Call once per
 * genuine page view. Returns null if Upstash is not configured or the slug is
 * invalid — callers treat null as "no count available" and render nothing.
 */
export async function incrementView(slug: string): Promise<number | null> {
    if (!isValidSlug(slug)) return null
    const redis = getClient()
    if (!redis) return null

    try {
        return await redis.incr(keyFor(slug))
    } catch (error) {
        console.error('[views] incr failed:', error)
        return null
    }
}

/**
 * Read the current view count without incrementing. Returns null if unavailable.
 */
export async function getViews(slug: string): Promise<number | null> {
    if (!isValidSlug(slug)) return null
    const redis = getClient()
    if (!redis) return null

    try {
        const value = await redis.get<number>(keyFor(slug))
        return typeof value === 'number' ? value : Number(value ?? 0)
    } catch (error) {
        console.error('[views] get failed:', error)
        return null
    }
}

/**
 * Batch-read view counts for the listing page in a single round trip. Invalid
 * slugs are dropped. Returns an empty object if Upstash is not configured, so
 * the listing renders normally with no counts.
 */
export async function getViewsBatch(slugs: string[]): Promise<Record<string, number>> {
    const valid = Array.from(new Set(slugs.filter(isValidSlug)))
    if (valid.length === 0) return {}

    const redis = getClient()
    if (!redis) return {}

    try {
        const values = await redis.mget<(number | null)[]>(...valid.map(keyFor))
        const out: Record<string, number> = {}
        valid.forEach((slug, i) => {
            const v = values[i]
            if (v != null) out[slug] = typeof v === 'number' ? v : Number(v)
        })
        return out
    } catch (error) {
        console.error('[views] mget failed:', error)
        return {}
    }
}
