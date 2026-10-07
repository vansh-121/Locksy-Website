#!/usr/bin/env node
// scripts/indexnow-ping.mjs
//
// Ping IndexNow (Bing, Yandex, Seznam, Naver) with every indexable Locksy URL so
// new and updated pages get crawled in minutes instead of days. ChatGPT Search is
// powered by the Bing index, so fast Bing coverage is also a GEO (generative
// engine optimization) win.
//
// Usage (run after a production deploy, once the new pages are live):
//   node scripts/indexnow-ping.mjs
//
// It reads the live sitemap, extracts every <loc>, and POSTs the list to IndexNow
// using the key already hosted at /263e3ef6a5884f15867d71346faed712.txt.
//
// To automate: run this as a post-deploy step — e.g. a GitHub Action on push to
// main that waits for the Vercel deployment to succeed, or a Vercel Deploy Hook
// consumer. It is safe to run repeatedly; IndexNow de-dupes on its side.

const HOST = 'www.locksy.dev'
const KEY = '263e3ef6a5884f15867d71346faed712'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const SITEMAP_URL = `https://${HOST}/sitemap.xml`
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL, { headers: { 'User-Agent': 'locksy-indexnow/1.0' } })
  if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.status} ${res.statusText}`)
  const xml = await res.text()
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
  // IndexNow requires every submitted URL to live on the same host as the key.
  return [...new Set(locs)].filter((u) => {
    try {
      return new URL(u).host === HOST
    } catch {
      return false
    }
  })
}

async function main() {
  const urlList = await fetchSitemapUrls()
  if (urlList.length === 0) {
    console.error('No URLs found in sitemap; nothing to submit.')
    process.exit(1)
  }

  // IndexNow accepts up to 10,000 URLs per request.
  const BATCH = 10000
  for (let i = 0; i < urlList.length; i += BATCH) {
    const batch = urlList.slice(i, i + BATCH)
    const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: batch }
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    })
    // IndexNow returns 200 (accepted) or 202 (accepted, pending). 429 = rate
    // limited, 403 = key not valid/hosted, 422 = URLs don't match host/key.
    console.log(`IndexNow: submitted ${batch.length} URLs -> ${res.status} ${res.statusText}`)
    if (!res.ok && res.status !== 202) {
      const text = await res.text().catch(() => '')
      console.error(`IndexNow rejected the submission: ${res.status} ${text}`)
      process.exitCode = 1
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
