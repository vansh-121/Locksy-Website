import { NextRequest, NextResponse } from 'next/server'
import { CHROME_STORE_URL, EDGE_STORE_URL, FIREFOX_STORE_URL } from '@/lib/browsers'

/**
 * Universal smart redirect: /install
 * Sends the visitor straight to the right extension store.
 *
 * - Edge -> Edge Add-ons. Firefox (desktop or Android) -> Firefox Add-ons.
 * - Brave, Opera, Vivaldi, Arc, Comet and Chrome -> Chrome Web Store.
 *   Brave is identified from the Sec-CH-UA client hint, since its user agent
 *   matches Chrome's; either way it lands on the Chrome Web Store.
 * - Android browsers other than Firefox -> Firefox Add-ons, because on Android
 *   Locksy runs in Firefox.
 * - iPhone/iPad and desktop Safari can't run Locksy -> the homepage install
 *   section, which explains the options instead of opening a dead-end store page.
 */
export function GET(request: NextRequest) {
    const ua = request.headers.get('user-agent') || ''
    const hints = request.headers.get('sec-ch-ua') || ''

    // iPhone/iPad and DuckDuckGo can't run extensions.
    const isIOS = /iPhone|iPad|iPod/i.test(ua)
    if (isIOS || /\bDdg\/|DuckDuckGo\//i.test(ua)) return NextResponse.redirect(new URL('/#download', request.url), 307)

    if (/Edg\//i.test(ua) || /Microsoft Edge/i.test(hints)) return NextResponse.redirect(EDGE_STORE_URL, 307)
    if (/Firefox\//i.test(ua)) return NextResponse.redirect(FIREFOX_STORE_URL, 307)
    if (/Android/i.test(ua)) return NextResponse.redirect(FIREFOX_STORE_URL, 307)

    const isChromium = /Chrome\/|Chromium\//i.test(ua) || /Chromium|Brave|Opera/i.test(hints)
    if (!isChromium && /Safari\//i.test(ua)) return NextResponse.redirect(new URL('/#download', request.url), 307)

    return NextResponse.redirect(CHROME_STORE_URL, 307)
}
