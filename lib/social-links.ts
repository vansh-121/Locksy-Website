import type React from "react"

/**
 * Shared social destinations.
 *
 * The WhatsApp channel is linked from several places (floating side button,
 * footer, contact page, support CTA), so the URL lives here rather than being
 * pasted into each component.
 */

/** Locksy Support broadcast channel on WhatsApp. */
export const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029VbCs1RyD8SE0bWBHjM3f"

/**
 * Helper for WhatsApp channel interactions across the site.
 * - On Mobile: allows standard navigation so the native WhatsApp app opens directly.
 * - On Desktop: prevents page navigation and dispatches an event to open the QR modal
 *   so desktop users don't get stuck on an unauthenticated WhatsApp Web login screen.
 */
export function openWhatsAppChannel(e?: React.MouseEvent) {
  if (typeof window === "undefined") return

  const isMobile =
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768

  if (!isMobile) {
    if (e) {
      e.preventDefault()
    }
    window.dispatchEvent(new CustomEvent("locksy-open-whatsapp-modal"))
  }
}
