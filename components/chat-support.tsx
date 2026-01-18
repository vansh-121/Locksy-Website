"use client"

import { useEffect } from "react"

export default function ChatSupport() {
  useEffect(() => {
    // Load Crisp Chat widget
    // Replace 'YOUR_WEBSITE_ID' with your actual Crisp Website ID
    // Get it from https://app.crisp.chat/website/[website_id]/settings/setup/
    
    if (typeof window !== "undefined") {
      (window as any).$crisp = []
      ;(window as any).CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID || ""

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
    }
  }, [])

  return null
}
