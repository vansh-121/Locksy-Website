import { RELEASES } from '@/lib/changelog'

// Built from static data, so it can be generated once at build time.
export const dynamic = 'force-static'

const SITE_URL = 'https://www.locksy.dev'

const escapeXml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const KIND_LABEL = { new: 'New', improved: 'Improved', fixed: 'Fixed', security: 'Security' } as const

export function GET() {
    const items = RELEASES.map((r) => {
        const anchor = `v${r.version.replace(/\./g, '-')}`
        const url = `${SITE_URL}/changelog#${anchor}`
        const list = r.changes
            .map((c) => `<li><strong>${KIND_LABEL[c.kind]}:</strong> ${escapeXml(c.text)}${c.pro ? ' (Pro)' : ''}</li>`)
            .join('')
        return `
    <item>
      <title>${escapeXml(`Locksy v${r.version}: ${r.title}`)}</title>
      <link>${url}</link>
      <guid isPermaLink="false">locksy-release-${r.version}</guid>
      <pubDate>${new Date(`${r.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description><![CDATA[<p>${escapeXml(r.summary)}</p><ul>${list}</ul>]]></description>
    </item>`
    }).join('')

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Locksy Changelog</title>
    <link>${SITE_URL}/changelog</link>
    <description>New features, fixes and security updates in every Locksy release.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(`${RELEASES[0].date}T00:00:00Z`).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/changelog/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, must-revalidate',
        },
    })
}
