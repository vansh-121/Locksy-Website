"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("locksy-cookie-consent")
    if (!consent) {
      // Small delay so the banner doesn't flash on page load
      const timer = setTimeout(() => setShowBanner(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const choose = (value: "accepted" | "essential-only") => {
    localStorage.setItem("locksy-cookie-consent", value)
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-3 z-[100] animate-in fade-in slide-in-from-bottom-3 duration-300 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[380px]"
    >
      <div className="rounded-2xl border border-border bg-popover/95 p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <p className="text-sm font-medium text-foreground">Cookies</p>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          We use essential cookies to run the site, plus optional ones from YouTube and Google AdSense embeds. No analytics
          tracking cookies.{" "}
          <Link href="/cookie-policy" className="text-foreground underline underline-offset-4">
            Cookie policy
          </Link>
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => choose("essential-only")}
            className="h-9 rounded-full border border-border text-[13px] font-medium text-foreground hover:bg-muted transition-colors"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="h-9 rounded-full bg-foreground text-[13px] font-medium text-background hover:opacity-90 transition-opacity"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}
