import { blogPosts } from '@/lib/blog-data'

const SITE_URL = 'https://www.locksy.dev'
const SITE_TITLE = 'Locksy Blog'
const SITE_DESCRIPTION = 'Security tips, browser tricks, and password management guides from the Locksy team.'

export async function GET() {
    const sortedPosts = [...blogPosts].sort(
        (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )

    const items = sortedPosts
        .map((post) => {
            const url = `${SITE_URL}/blog/${post.slug}`
            const pubDate = new Date(post.publishDate).toUTCString()
            return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>noreply@locksy.dev (${post.author})</author>
      <category>${post.category}</category>
    </item>`
        })
        .join('')

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}/blog</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        },
    })
}
