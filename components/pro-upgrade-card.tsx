import Link from "next/link"
import {
  Blend,
  Camera,
  Clock,
  EyeOff,
  Fingerprint,
  Globe,
  KeyRound,
  LayoutDashboard,
  ScreenShare,
  ShieldCheck,
  Laptop,
  Calendar,
  Zap,
} from "lucide-react"

import { PRO_CHECKOUT_URL, PRO_PRICE } from "@/lib/pro"

/**
 * Every Pro unlock that maps onto a free-tier limit, ordered so the `was`
 * column tells the story. Both columns trace to components/pricing.tsx; if a
 * free limit changes there, change it here too.
 */
const PRO_UNLOCKS = [
  { icon: Laptop, label: "Use on up to 5 devices", was: "1 device on free" },
  { icon: Globe, label: "Unlimited domain locks", was: "3 on free" },
  { icon: Fingerprint, label: "Unlimited biometric unlocks", was: "5 a day on free" },
  { icon: Camera, label: "Unlimited intruder snapshots", was: "3 on free" },
  { icon: KeyRound, label: "1-click lock & unlock all", was: "3 total uses on free" },
  { icon: Clock, label: "Custom auto-lock timers", was: "10 minutes on free" },
  { icon: Blend, label: "Full privacy blur manager", was: "Basic blur on free" },
  { icon: ScreenShare, label: "Automatic screen share shield", was: "Manual toggle on free" },
  { icon: EyeOff, label: "Stealth-mode disguise", was: "Not on free" },
  { icon: Calendar, label: "Scheduled locking", was: "Not on free" },
  { icon: Zap, label: "Startup session lock", was: "Not on free" },
  { icon: LayoutDashboard, label: "Weekly privacy reports", was: "Not on free" },
]

interface ProUpgradeCardProps {
  /** Small label above the heading. Override it to match the page's context. */
  eyebrow?: string
  /** Adds the brand ring, for pages where the reader has shown interest in Pro. */
  highlighted?: boolean
  /** Extra classes on the outer <section>. */
  className?: string
}

/** The lifetime Pro offer as a drop-in section. Server component, no client JS. */
export default function ProUpgradeCard({
  eyebrow = "Locksy Pro",
  highlighted = false,
  className = "relative py-14 md:py-20",
}: ProUpgradeCardProps) {
  return (
    <section className={className}>
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className={`surface relative overflow-hidden ${highlighted ? "ring-1 ring-highlight/40" : ""}`}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full blur-3xl"
            style={{ background: "var(--glow)" }}
          />

          <div className="relative grid gap-10 p-7 md:p-12 lg:grid-cols-[1fr_280px] lg:gap-14">
            <div>
              <span className="eyebrow">
                <span className="eyebrow-dot" aria-hidden="true" />
                {eyebrow}
              </span>
              <h2 className="mt-5 max-w-md text-3xl font-semibold leading-[1.1] text-foreground md:text-4xl text-balance">
                Every limit removed, for {PRO_PRICE} once
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                No subscription and no trial. One payment unlocks everything, for good.
              </p>

              <ul className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {PRO_UNLOCKS.map(({ icon: Icon, label, was }) => (
                  <li key={label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-highlight" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-snug text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{was}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center rounded-2xl border border-border bg-background/60 p-6 text-center">
              <p className="text-sm text-muted-foreground">Lifetime license</p>
              <p className="mt-2 font-display text-5xl font-semibold tracking-tight text-foreground">{PRO_PRICE}</p>
              <p className="mt-1 text-sm text-muted-foreground">One-time · up to 5 devices</p>
              <a href={PRO_CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full">
                Get Locksy Pro
              </a>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                Secure payment via Polar.sh
              </p>
              <Link href="/pricing" className="mt-3 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">
                Compare free and Pro
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
