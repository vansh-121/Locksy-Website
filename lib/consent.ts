/**
 * Cookie-consent state shared by the floating widgets, so only one thing
 * competes for the bottom corners at a time: the cookie card first, then the
 * chat launcher and WhatsApp button once a choice has been made.
 */

export const CONSENT_KEY = "locksy-cookie-consent"
export const CONSENT_EVENT = "locksy-consent-decided"

export type ConsentChoice = "accepted" | "essential-only"

export function getConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === "accepted" || v === "essential-only" ? v : null
  } catch {
    return null
  }
}

export function setConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice)
  } catch {
    /* storage can be disabled; the banner simply shows again next visit */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }))
}

/** Calls `cb` once a consent choice exists (immediately if it already does). Returns an unsubscribe. */
export function onConsentDecided(cb: () => void): () => void {
  if (getConsent()) {
    cb()
    return () => {}
  }
  const handler = () => cb()
  window.addEventListener(CONSENT_EVENT, handler, { once: true })
  return () => window.removeEventListener(CONSENT_EVENT, handler)
}
