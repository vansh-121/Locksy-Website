"use client"

import { useEffect } from "react"
import { onConsentDecided } from "@/lib/consent"

export default function ChatSupport() {
  useEffect(() => {
    const crispWebsiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID

    if (!crispWebsiteId) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Crisp Website ID is not set. Chat support will be disabled.")
      }
      return
    }

    let script: HTMLScriptElement | null = null

    // Wait for the cookie choice so the chat launcher never sits on top of the
    // cookie card in the same corner. "Open chat" buttons still work before
    // then, because $crisp queues commands until the widget loads.
    ;(window as any).$crisp = (window as any).$crisp || []
    ;(window as any).CRISP_WEBSITE_ID = crispWebsiteId

    const unsubscribe = onConsentDecided(() => {
      if (document.querySelector('script[src="https://client.crisp.chat/l.js"]')) return
      script = document.createElement("script")
      script.src = "https://client.crisp.chat/l.js"
      script.async = true
      document.head.appendChild(script)
    })

    return () => {
      unsubscribe()
      if (script && document.head.contains(script)) document.head.removeChild(script)
    }
  }, [])

  return null
}
