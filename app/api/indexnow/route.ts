import { blogPosts } from '@/lib/blog-data'

const SITE_URL = 'https://www.locksy.dev'
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || ''
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`

// IndexNow endpoints for search engines
const INDEXNOW_ENDPOINTS = [
    'https://api.indexnow.org/indexnow',        // Bing, Yandex, Seznam.cz, Naver
    'https://www.bing.com/indexnow',             // Direct Bing
    'https://yandex.com/indexnow',               // Direct Yandex
]

export async function POST(request: Request) {
    // Verify Vercel cron secret or manual trigger
    const authHeader = request.headers.get('Authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return new Response('Unauthorized', { status: 401 })
    }

    if (!INDEXNOW_KEY) {
        return new Response('INDEXNOW_KEY environment variable not set', { status: 500 })
    }

    const results: { step: string; status: string; detail?: string }[] = []

    // 1. Submit all blog URLs via IndexNow (batch API)
    const allUrls = [
        `${SITE_URL}/`,
        `${SITE_URL}/blog`,
        ...blogPosts.map(post => `${SITE_URL}/blog/${post.slug}`),
    ]

    for (const endpoint of INDEXNOW_ENDPOINTS) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body: JSON.stringify({
                    host: 'www.locksy.dev',
                    key: INDEXNOW_KEY,
                    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
                    urlList: allUrls,
                }),
            })

            results.push({
                step: `IndexNow → ${new URL(endpoint).hostname}`,
                status: response.ok || response.status === 202 ? 'ok' : 'failed',
                detail: `HTTP ${response.status}`,
            })
        } catch (error) {
            results.push({
                step: `IndexNow → ${new URL(endpoint).hostname}`,
                status: 'error',
                detail: String(error),
            })
        }
    }

    // Note: Google deprecated their sitemap ping endpoint in early 2024 (it now returns 404),
    // so we rely on Google reading our robots.txt and sitemap.xml normally,
    // or through Google Search Console submissions.

    // 3. Ping PubSubHubbub for RSS readers
    try {
        const hubBody = new URLSearchParams({
            'hub.mode': 'publish',
            'hub.url': `${SITE_URL}/feed.xml`,
        })
        const hubResponse = await fetch('https://pubsubhubbub.appspot.com/publish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: hubBody.toString(),
        })
        results.push({
            step: 'PubSubHubbub Ping',
            status: hubResponse.ok ? 'ok' : 'failed',
            detail: `HTTP ${hubResponse.status}`,
        })
    } catch (error) {
        results.push({
            step: 'PubSubHubbub Ping',
            status: 'error',
            detail: String(error),
        })
    }

    const allOk = results.every(r => r.status === 'ok')

    return new Response(
        JSON.stringify({
            success: allOk,
            urlsSubmitted: allUrls.length,
            results,
            timestamp: new Date().toISOString(),
        }),
        {
            status: allOk ? 200 : 207,
            headers: { 'Content-Type': 'application/json' },
        }
    )
}

// Also support GET for easy manual triggering from browser
export async function GET(request: Request) {
    // For GET, require the key as a query param for minimal auth
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (key !== INDEXNOW_KEY) {
        return new Response('Forbidden', { status: 403 })
    }

    // Reuse POST handler
    const fakeRequest = new Request(request.url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.CRON_SECRET || ''}` },
    })

    return POST(fakeRequest)
}
