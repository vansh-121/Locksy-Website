const FEED_URL = 'https://www.locksy.dev/feed.xml'
const HUB_URL = 'https://pubsubhubbub.appspot.com/publish'

export async function POST(request: Request) {
    // Verify Vercel cron secret to prevent unauthorized pings
    const authHeader = request.headers.get('Authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return new Response('Unauthorized', { status: 401 })
    }

    try {
        const body = new URLSearchParams({
            'hub.mode': 'publish',
            'hub.url': FEED_URL,
        })

        const response = await fetch(HUB_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body.toString(),
        })

        if (!response.ok) {
            const text = await response.text()
            return new Response(`Hub ping failed: ${text}`, { status: 502 })
        }

        return new Response('Hub pinged successfully', { status: 200 })
    } catch (error) {
        return new Response('Failed to ping hub', { status: 500 })
    }
}
