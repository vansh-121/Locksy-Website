"use client"

import { useEffect } from "react"

export default function ChatSupport() {
  useEffect(() => {
    const crispWebsiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID

    if (!crispWebsiteId) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Crisp Website ID is not set. Chat support will be disabled.")
      }
      return
    }

    // Load Crisp Chat widget
    (window as any).$crisp = []
    ;(window as any).CRISP_WEBSITE_ID = crispWebsiteId

    const script = document.createElement("script")
    script.src = "https://client.crisp.chat/l.js"
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return null
}
