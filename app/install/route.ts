import { NextRequest, NextResponse } from 'next/server'

const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim'
const EDGE_STORE_URL = 'https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn'
const FIREFOX_STORE_URL = 'https://addons.mozilla.org/en-US/firefox/addon/locksy/'

/**
 * Universal smart redirect endpoint: /install
 * Detects visitor user-agent on the server side and forwards directly to the right browser store.
 */
export function GET(request: NextRequest) {
    const userAgent = request.headers.get('user-agent') || ''

    if (/Edg\//i.test(userAgent)) {
        return NextResponse.redirect(EDGE_STORE_URL, 307)
    }

    if (/Firefox\//i.test(userAgent)) {
        return NextResponse.redirect(FIREFOX_STORE_URL, 307)
    }

    // Chrome, Brave, Opera, Vivaldi, and generic desktop/mobile default to Chrome Web Store
    return NextResponse.redirect(CHROME_STORE_URL, 307)
}
