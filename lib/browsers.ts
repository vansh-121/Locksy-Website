/**
 * Store listings for every browser Locksy supports, plus visitor detection.
 *
 * Only three stores exist: Chrome Web Store, Edge Add-ons and Firefox Add-ons.
 * Chromium browsers without their own store (Brave, Opera, Vivaldi, Arc, Comet, Yandex�)
 * install from the Chrome Web Store.
 */

export const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
export const EDGE_STORE_URL =
  "https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn"
export const FIREFOX_STORE_URL = "https://addons.mozilla.org/en-US/firefox/addon/locksy/"

/** Minimum engine versions, from manifest.json (minimum_chrome_version) and
 *  manifest.firefox.json (gecko strict_min_version). */
export const MIN_CHROMIUM = 111
export const MIN_GECKO = 109

/**
 * Where Locksy runs, and where it doesn't. Used by the guide, FAQ, footer and
 * metadata. `tested` marks browsers that passed the end-to-end test (install,
 * set password, lock a real page, reject a wrong password, unlock) with the
 * v3.7.0 build. The rest are listed by engine compatibility.
 */
export const COMPATIBILITY = {
  chromium: {
    label: `Chromium-based browsers (Chromium ${MIN_CHROMIUM}+, desktop)`,
    store: "Chrome Web Store (Edge uses Edge Add-ons)",
    browsers: [
      { name: "Google Chrome", platforms: "Windows, macOS, Linux, ChromeOS", tested: true },
      { name: "Microsoft Edge", platforms: "Windows, macOS, Linux", tested: true },
      { name: "Brave", platforms: "Windows, macOS, Linux", tested: true },
      { name: "Opera & Opera GX", platforms: "Windows, macOS, Linux" },
      { name: "Vivaldi", platforms: "Windows, macOS, Linux" },
      { name: "Arc", platforms: "macOS, Windows" },
      { name: "Perplexity Comet", platforms: "Desktop" },
      { name: "Yandex Browser", platforms: "Desktop" },
      { name: "Chromium, Ungoogled Chromium, Thorium", platforms: "Desktop" },
      { name: "Other Chromium browsers with Chrome Web Store MV3 support (Sidekick, Wavebox, Shift…)", platforms: "Desktop" },
    ],
  },
  gecko: {
    label: `Firefox and Gecko-based browsers (Gecko ${MIN_GECKO}+)`,
    store: "Firefox Add-ons",
    browsers: [
      { name: "Mozilla Firefox", platforms: "Windows, macOS, Linux" },
      { name: "Firefox for Android", platforms: "Android" },
      { name: "Zen Browser", platforms: "Desktop" },
      { name: "LibreWolf", platforms: "Desktop" },
      { name: "Floorp", platforms: "Desktop" },
      { name: "Waterfox", platforms: "Desktop & Android" },
    ],
  },
  unsupported: [
    { name: "Safari", reason: "Needs a separate native Safari Web Extension built in Xcode. Not available yet." },
    { name: "Any browser on iPhone or iPad", reason: "iOS and iPadOS don't allow Chrome or Firefox extensions in Chrome, Edge, Firefox, Brave, Opera or Arc." },
    { name: "Chromium browsers on Android", reason: "Chrome, Brave, Opera, Vivaldi and Samsung Internet for Android don't install Chrome Web Store extensions. Use Firefox for Android." },
    { name: "DuckDuckGo Browser", reason: "Doesn't support browser extensions on desktop or mobile." },
    { name: `Chrome/Chromium older than ${MIN_CHROMIUM}, Firefox older than ${MIN_GECKO}`, reason: "Below the extension's minimum version. Update the browser." },
  ],
} as const

/** Number of browsers named as supported above (for the homepage stat). */
export const NAMED_SUPPORTED_COUNT = 18

export type BrowserId = "chrome" | "edge" | "firefox" | "brave" | "opera" | "vivaldi" | "arc" | "comet" | "yandex"

export interface BrowserLink {
  id: BrowserId
  name: string
  icon: string
  url: string
  store: string
}

export const PRIMARY_BROWSERS: BrowserLink[] = [
  { id: "chrome", name: "Chrome", icon: "/browsers/chrome.png", url: CHROME_STORE_URL, store: "Chrome Web Store" },
  { id: "edge", name: "Edge", icon: "/browsers/edge.png", url: EDGE_STORE_URL, store: "Edge Add-ons" },
  { id: "firefox", name: "Firefox", icon: "/browsers/firefox.png", url: FIREFOX_STORE_URL, store: "Firefox Add-ons" },
]

export const SECONDARY_BROWSERS: BrowserLink[] = [
  { id: "brave", name: "Brave", icon: "/browsers/brave.png", url: CHROME_STORE_URL, store: "Chrome Web Store" },
  { id: "opera", name: "Opera", icon: "/browsers/opera.png", url: CHROME_STORE_URL, store: "Chrome Web Store" },
  { id: "vivaldi", name: "Vivaldi", icon: "/browsers/vivaldi.png", url: CHROME_STORE_URL, store: "Chrome Web Store" },
  { id: "arc", name: "Arc", icon: "/browsers/arc.png", url: CHROME_STORE_URL, store: "Chrome Web Store" },
  { id: "comet", name: "Comet", icon: "/browsers/comet.png", url: CHROME_STORE_URL, store: "Chrome Web Store" },
]

export const ALL_BROWSERS: BrowserLink[] = [...PRIMARY_BROWSERS, ...SECONDARY_BROWSERS]

/** Detected-only browsers: supported, but without an icon in the browser lists. */
const DETECT_ONLY: BrowserLink[] = [
  { id: "yandex", name: "Yandex Browser", icon: "/browsers/chrome-web-store.png", url: CHROME_STORE_URL, store: "Chrome Web Store" },
]

export const getBrowser = (id: BrowserId) => [...ALL_BROWSERS, ...DETECT_ONLY].find((b) => b.id === id)!

const majorVersion = (ua: string, token: RegExp) => {
  const m = token.exec(ua)
  return m ? parseInt(m[1], 10) : NaN
}

export interface VisitorBrowser {
  /** The store link to offer first. Always a real, installable listing. */
  browser: BrowserLink
  /** False until detection has run (server render, or first client render). */
  detected: boolean
  /** False on browsers Locksy can't run in (Safari, iPhone/iPad, most mobile browsers). */
  supported: boolean
  /** Plain-language explanation shown when `supported` is false. */
  note?: string
}

export const DEFAULT_VISITOR: VisitorBrowser = { browser: PRIMARY_BROWSERS[0], detected: false, supported: true }

/**
 * Work out which store this visitor should see first. Client-side only.
 *
 * Order matters: Edge, Opera and Vivaldi all include "Chrome/" in their user
 * agent, and Brave and Arc are indistinguishable from Chrome by user agent, so
 * the specific checks come before the Chrome fallback.
 */
export function detectVisitor(): VisitorBrowser {
  if (typeof navigator === "undefined") return DEFAULT_VISITOR
  const ua = navigator.userAgent
  const nav = navigator as Navigator & { brave?: { isBrave?: () => unknown } }
  const isIOS = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
  const isAndroid = /Android/.test(ua)
  const done = (id: BrowserId, supported = true, note?: string): VisitorBrowser => ({
    browser: getBrowser(id),
    detected: true,
    supported,
    note,
  })

  // iPhone and iPad: every browser is WebKit underneath and can't run extensions.
  if (isIOS) {
    return done(
      "chrome",
      false,
      "Locksy isn't available on iPhone or iPad. Open this page on your computer to install it in Chrome, Edge, Firefox or another supported browser.",
    )
  }

  // DuckDuckGo doesn't support extensions on any platform.
  if (/\bDdg\//.test(ua) || /DuckDuckGo\//.test(ua)) {
    return done("chrome", false, "DuckDuckGo Browser doesn't support extensions. Locksy works in Chrome, Edge, Firefox, Brave and other supported browsers.")
  }

  // Firefox and Gecko forks (Zen, LibreWolf, Floorp, Waterfox), desktop or Android.
  if (/Firefox\//.test(ua)) {
    const v = majorVersion(ua, /Firefox\/(\d+)/)
    if (v < MIN_GECKO) return done("firefox", false, `Locksy needs Firefox ${MIN_GECKO} or newer. Update your browser, then install it from Firefox Add-ons.`)
    return done("firefox")
  }

  // Chromium browsers on Android (Chrome, Brave, Opera, Vivaldi, Samsung Internet)
  // can't install Chrome Web Store extensions. Firefox for Android can.
  if (isAndroid) {
    return done(
      "firefox",
      true,
      "On Android, Locksy runs in Firefox for Android (or Waterfox). Open this page there, or install it on your computer.",
    )
  }

  const chromiumVersion = majorVersion(ua, /(?:Chrome|Chromium)\/(\d+)/)
  if (!Number.isNaN(chromiumVersion) && chromiumVersion < MIN_CHROMIUM) {
    const id: BrowserId = /Edg\//.test(ua) ? "edge" : "chrome"
    return done(id, false, `Locksy needs a browser based on Chromium ${MIN_CHROMIUM} or newer. Update your browser first.`)
  }

  if (/Edg\//.test(ua)) return done("edge")
  if (/OPR\//.test(ua)) {
    return done("opera", true, "Opera installs Locksy from the Chrome Web Store. If Opera asks, add its \"Install Chrome Extensions\" helper first.")
  }
  if (/YaBrowser\//.test(ua)) return done("yandex")
  if (/Vivaldi/.test(ua)) return done("vivaldi")
  if (nav.brave) return done("brave")
  // Arc sets its palette as CSS variables on the root element.
  try {
    if (getComputedStyle(document.documentElement).getPropertyValue("--arc-palette-title")) return done("arc")
  } catch {
    /* not in a document yet */
  }
  // Chrome, Chromium, Ungoogled Chromium, Thorium, Comet and other Chromium browsers.
  if (!Number.isNaN(chromiumVersion)) return done("chrome")

  // Desktop Safari and anything else.
  if (/Safari\//.test(ua)) {
    return done(
      "chrome",
      false,
      "Safari isn't supported yet. Locksy works in Chrome, Edge, Firefox, Brave, Opera, Vivaldi, Arc and other Chromium or Firefox-based browsers.",
    )
  }
  return { ...DEFAULT_VISITOR, detected: true }
}
/** Backwards-compatible helper: just the browser link. */
export function detectBrowser(): BrowserLink {
  return detectVisitor().browser
}

/**
 * The visitor's browser first, then the other stores. Browsers that share a
 * store with the first one are dropped, so Brave shows "Brave, Edge, Firefox"
 * rather than offering the Chrome Web Store twice.
 */
export function orderedStores(first: BrowserLink): BrowserLink[] {
  return [first, ...PRIMARY_BROWSERS.filter((b) => b.url !== first.url)]
}

/** True for browsers that install from another browser's store. */
export function usesChromeStore(b: BrowserLink) {
  return b.url === CHROME_STORE_URL && b.id !== "chrome"
}

/** Shared logo URL used across header, hero and footer. */
export const LOCKSY_LOGO_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/locksy_-_new_logo-removebg-preview-A7nNuNJNkO21eb9DgcS0wIKSIINL9U.png"
