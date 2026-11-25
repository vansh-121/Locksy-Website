"use client"

import { useState, useRef, useEffect } from "react"
import { Check, Minus, ChevronDown, ArrowUpRight, ShieldCheck } from "lucide-react"
import { PRO_CHECKOUT_URL, PRO_PRICE } from "@/lib/pro"
import { ALL_BROWSERS } from "@/lib/browsers"
import { useVisitorBrowser } from "@/components/install-buttons"
import SectionHeading from "@/components/section-heading"

interface PricingProps {
  hideHeader?: boolean
  className?: string
}

const INITIAL_VISIBLE_COUNT = 7

const FREE_FEATURES: { title: string; included: boolean }[] = [
  { title: "Lock any tab with a password", included: true },
  { title: "Auto-lock up to 3 websites", included: true },
  { title: "5 biometric unlocks per day", included: true },
  { title: "1 device / browser", included: true },
  { title: "Auto re-lock after 10 minutes", included: true },
  { title: "Lock All Tabs (3 total uses)", included: true },
  { title: "Basic Privacy Blur Shield", included: true },
  { title: "Manual Screen Share Shield", included: true },
  { title: "Up to 3 stored intruder photos", included: true },
  { title: "Classic Light & Dark themes", included: true },
  { title: "Scheduled locking", included: false },
  { title: "Startup session lock", included: false },
  { title: "Stealth mode disguise", included: false },
  { title: "Weekly privacy reports", included: false },
  { title: "Custom lock screen messages", included: false },
]

const PRO_FEATURES = [
  "Unlimited website auto-locks",
  "Unlimited biometric unlocks",
  "Use on up to 5 devices",
  "Custom auto-lock timers up to 8 hours",
  "Unlimited Lock All + 1-click Unlock All",
  "Full Privacy Blur manager with whitelists",
  "Automatic Screen Share Shield",
  "Unlimited intruder photos",
  "Scheduled locking",
  "Startup session lock",
  "Stealth mode disguise",
  "Weekly privacy reports",
  "Custom lock screen messages",
  "All 6 themes",
]

export default function Pricing({ hideHeader = false, className = "" }: PricingProps = {}) {
  const [showAll, setShowAll] = useState(false)
  const [showInstallMenu, setShowInstallMenu] = useState(false)
  const installRef = useRef<HTMLDivElement>(null)
  const { browser } = useVisitorBrowser()
  // The visitor's browser first in the store menu.
  const storeList = [browser, ...ALL_BROWSERS.filter((b) => b.id !== browser.id)]

  useEffect(() => {
    if (!showInstallMenu) return
    const onDown = (e: MouseEvent) => {
      if (installRef.current && !installRef.current.contains(e.target as Node)) setShowInstallMenu(false)
    }
    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [showInstallMenu])

  const free = showAll ? FREE_FEATURES : FREE_FEATURES.slice(0, INITIAL_VISIBLE_COUNT)
  const pro = showAll ? PRO_FEATURES : PRO_FEATURES.slice(0, INITIAL_VISIBLE_COUNT)

  return (
    <section id="pricing" className={className || "relative scroll-mt-24 py-14 md:py-20"}>
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        {!hideHeader && (
          <SectionHeading
            eyebrow="Pricing"
            title="Free forever. Pro costs less than a coffee."
            description="The free plan covers everyday tab locking. Pro is a one-time payment with no subscription."
            className="mb-14"
          />
        )}

        <div className="grid items-stretch gap-4 md:grid-cols-2">
          {/* Free */}
          <div className="surface flex flex-col p-7 md:p-9">
            <p className="text-sm font-medium text-muted-foreground">Free</p>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-5xl font-semibold tracking-tight text-foreground">$0</span>
              <span className="text-sm text-muted-foreground">forever</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">No credit card, no account.</p>

            <div className="relative mt-8" ref={installRef}>
              <button
                type="button"
                onClick={() => setShowInstallMenu((v) => !v)}
                aria-expanded={showInstallMenu}
                className="btn-secondary w-full"
              >
                <img src={browser.icon} alt="" className="h-4 w-4 object-contain" />
                Add to {browser.name}
                <ChevronDown className={`h-4 w-4 transition-transform ${showInstallMenu ? "rotate-180" : ""}`} />
              </button>
              {showInstallMenu && (
                <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-border bg-popover p-1.5 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150">
                  {storeList.map((b, i) => (
                    <a
                      key={b.id}
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowInstallMenu(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${i === 0 ? "bg-highlight/10 ring-1 ring-highlight/30" : "hover:bg-muted"}`}
                    >
                      <img src={b.icon} alt="" className="h-5 w-5 object-contain" />
                      <span className="flex-1 text-sm text-foreground">{b.name === "your browser" ? "This browser" : b.name}</span>
                      <span className="text-xs text-muted-foreground">{b.store}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="my-8 h-px bg-border" />
            <ul className="space-y-3.5">
              {free.map((f) => (
                <li key={f.title} className={`flex items-start gap-3 text-sm ${f.included ? "text-foreground" : "text-muted-foreground"}`}>
                  {f.included ? (
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-foreground/70" aria-hidden="true" />
                  ) : (
                    <Minus className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  )}
                  <span>
                    {f.title}
                    {!f.included && <span className="sr-only"> (not included)</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="surface relative flex flex-col overflow-hidden p-7 md:p-9 ring-1 ring-highlight/40">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-24 h-64"
              style={{ background: "radial-gradient(60% 60% at 50% 0%, var(--glow), transparent 70%)" }}
            />
            <div className="relative flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Locksy Pro</p>
              <span className="rounded-full border border-highlight/30 bg-highlight/10 px-2.5 py-0.5 text-[11px] font-medium text-highlight">
                Lifetime license
              </span>
            </div>
            <p className="relative mt-4 flex items-baseline gap-2">
              <span className="font-display text-5xl font-semibold tracking-tight text-foreground">{PRO_PRICE}</span>
              <span className="text-sm text-muted-foreground">one-time</span>
            </p>
            <p className="relative mt-2 text-sm text-muted-foreground">Pay once, use on up to 5 devices for life.</p>

            <a
              href={PRO_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary relative mt-8 w-full"
            >
              Get Locksy Pro for {PRO_PRICE}
            </a>

            <div className="relative my-8 h-px bg-border" />
            <ul className="relative space-y-3.5">
              {pro.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-highlight" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {showAll ? "Show fewer features" : "Compare all features"}
            <ChevronDown className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
          </button>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Secure checkout via Polar.sh · See our{" "}
            <a href="/refund-policy" className="underline underline-offset-4 hover:text-foreground">
              refund policy
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
