/**
 * Store listings for every browser Locksy supports. Chromium browsers without
 * their own store (Brave, Opera, Vivaldi, Comet, Arc) install from the Chrome
 * Web Store.
 */

export const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
export const EDGE_STORE_URL =
  "https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn"
export const FIREFOX_STORE_URL = "https://addons.mozilla.org/en-US/firefox/addon/locksy/"

export interface BrowserLink {
  id: "chrome" | "edge" | "firefox" | "brave" | "opera" | "vivaldi" | "comet"
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
  { id: "comet", name: "Comet", icon: "/browsers/comet.png", url: CHROME_STORE_URL, store: "Chrome Web Store" },
]

export const ALL_BROWSERS: BrowserLink[] = [...PRIMARY_BROWSERS, ...SECONDARY_BROWSERS]

/** Best-guess browser from the user agent. Runs client-side only. */
export function detectBrowser(): BrowserLink {
  if (typeof navigator === "undefined") return PRIMARY_BROWSERS[0]
  const ua = navigator.userAgent
  // Brave exposes navigator.brave; its UA is indistinguishable from Chrome.
  if ((navigator as Navigator & { brave?: unknown }).brave) return SECONDARY_BROWSERS[0]
  if (/Edg\//.test(ua)) return PRIMARY_BROWSERS[1]
  if (/Firefox\//.test(ua)) return PRIMARY_BROWSERS[2]
  if (/OPR\//.test(ua)) return SECONDARY_BROWSERS[1]
  if (/Vivaldi/.test(ua)) return SECONDARY_BROWSERS[2]
  return PRIMARY_BROWSERS[0]
}

/** Shared logo URL used across header, hero and footer. */
export const LOCKSY_LOGO_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/locksy_-_new_logo-removebg-preview-A7nNuNJNkO21eb9DgcS0wIKSIINL9U.png"
