/**
 * Store listings for every browser Locksy supports, plus visitor detection.
 *
 * Only three stores exist: Chrome Web Store, Edge Add-ons and Firefox Add-ons.
 * Chromium browsers without their own store (Brave, Opera, Vivaldi, Arc, Comet)
 * install from the Chrome Web Store.
 */

export const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
export const EDGE_STORE_URL =
  "https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn"
export const FIREFOX_STORE_URL = "https://addons.mozilla.org/en-US/firefox/addon/locksy/"

export type BrowserId = "chrome" | "edge" | "firefox" | "brave" | "opera" | "vivaldi" | "arc" | "comet"

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

export const getBrowser = (id: BrowserId) => ALL_BROWSERS.find((b) => b.id === id)!

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

  // iPhone and iPad: every browser is Safari underneath and can't run Locksy.
  if (isIOS) {
    return done(
      "chrome",
      false,
      "Locksy isn't available on iPhone or iPad. Open this page on your computer to install it in Chrome, Edge or Firefox.",
    )
  }

  // Firefox, including Firefox for Android (supported since v3.4.0).
  if (/Firefox\//.test(ua)) return done("firefox")

  if (isAndroid) {
    return done(
      "firefox",
      true,
      "On Android, Locksy runs in Firefox. Open this page in Firefox for Android, or install it on your computer.",
    )
  }

  if (/Edg\//.test(ua)) return done("edge")
  if (/OPR\//.test(ua)) return done("opera")
  if (/Vivaldi/.test(ua)) return done("vivaldi")
  if (nav.brave) return done("brave")
  // Arc sets its palette as CSS variables on the root element.
  try {
    if (getComputedStyle(document.documentElement).getPropertyValue("--arc-palette-title")) return done("arc")
  } catch {
    /* not in a document yet */
  }
  if (/Chrome\//.test(ua) || /Chromium\//.test(ua)) return done("chrome")

  // Desktop Safari and anything else.
  if (/Safari\//.test(ua)) {
    return done("chrome", false, "Safari isn't supported yet. Locksy works in Chrome, Edge, Firefox, Brave and other Chromium browsers.")
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
