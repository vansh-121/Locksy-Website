"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Fingerprint,
  ShieldCheck,
  Link2,
  KeyRound,
  Check,
  Lock,
  Laptop,
  Monitor,
  Smartphone,
  TabletSmartphone,
  Usb,
  ArrowRight,
  Cpu,
} from "lucide-react"

// Facts below are checked against lib/guide-content.json (chapter "biometric")
// and the extension's docs/CHANGELOG.md (v2.3.0, v2.6.0, v3.7.0).

const POINTS = [
  {
    icon: Cpu,
    title: "Your fingerprint never leaves your device",
    desc: "Your computer or phone checks it. Locksy only stores a public key and never sees the scan.",
  },
  {
    icon: ShieldCheck,
    title: "Built on WebAuthn",
    desc: "The same FIDO2 standard browsers use for passkeys and hardware sign-in.",
  },
  {
    icon: Link2,
    title: "Can't be replayed",
    desc: "Each unlock is signed against a fresh, single-use challenge and verified by Locksy in the background.",
  },
  {
    icon: KeyRound,
    title: "Your password still works",
    desc: "Biometrics are a shortcut. Your master password is always there as a fallback.",
  },
]

const PLATFORMS = [
  { icon: Laptop, label: "Touch ID", sub: "Mac" },
  { icon: Monitor, label: "Windows Hello", sub: "Fingerprint or face" },
  { icon: TabletSmartphone, label: "Face ID / Touch ID", sub: "iPhone & iPad" },
  { icon: Smartphone, label: "Android", sub: "Fingerprint or face" },
  { icon: Usb, label: "Security key", sub: "YubiKey, SoloKey, Titan" },
]

type DemoState = "locked" | "scanning" | "unlocked"

function UnlockDemo() {
  const [state, setState] = useState<DemoState>("locked")
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const ran = useRef(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const run = () => {
    if (state === "scanning") return
    clear()
    setState("scanning")
    setProgress(0)
    const steps = 20
    for (let i = 1; i <= steps; i++) {
      timers.current.push(setTimeout(() => setProgress((i / steps) * 100), i * 55))
    }
    timers.current.push(setTimeout(() => setState("unlocked"), steps * 55 + 120))
    timers.current.push(
      setTimeout(() => {
        setState("locked")
        setProgress(0)
      }, steps * 55 + 3200),
    )
  }

  // Play once when it scrolls into view (skipped for reduced-motion users).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !ran.current) {
          ran.current = true
          timers.current.push(setTimeout(run, 700))
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      clear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const unlocked = state === "unlocked"

  return (
    <div ref={ref} className="surface relative overflow-hidden p-2 md:p-3">
      <div className="overflow-hidden rounded-[1.25rem] border border-border bg-background">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          </div>
          <div className="flex flex-1 items-center gap-1.5 truncate rounded-full bg-muted px-3 py-1 text-[11px] text-muted-foreground">
            {unlocked ? <Check className="h-3 w-3 text-emerald-500" /> : <Lock className="h-3 w-3 text-highlight" />}
            mybank.com
          </div>
        </div>

        <div
          className="flex min-h-[360px] flex-col items-center justify-center gap-5 px-8 py-10 text-center"
          style={{ background: "radial-gradient(70% 60% at 50% 40%, var(--glow), transparent 70%)" }}
          aria-live="polite"
        >
          <div className="relative flex h-20 w-20 items-center justify-center">
            {/* Progress ring */}
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
              <circle cx="40" cy="40" r="37" fill="none" stroke="var(--border)" strokeWidth="2" />
              <circle
                cx="40"
                cy="40"
                r="37"
                fill="none"
                stroke={unlocked ? "#10b981" : "var(--highlight)"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 37}
                strokeDashoffset={2 * Math.PI * 37 * (1 - (unlocked ? 100 : progress) / 100)}
                style={{ transition: "stroke-dashoffset 80ms linear" }}
              />
            </svg>
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card">
              {unlocked ? (
                <Check className="h-6 w-6 text-emerald-500" aria-hidden="true" />
              ) : (
                <Fingerprint className="h-7 w-7 text-highlight" aria-hidden="true" />
              )}
            </span>
          </div>

          <div>
            <p className="font-display text-lg font-semibold text-foreground">
              {state === "locked" && "This tab is locked"}
              {state === "scanning" && "Verifying…"}
              {unlocked && "Unlocked"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {state === "locked" && "Touch your fingerprint sensor to continue"}
              {state === "scanning" && "Your device is checking your fingerprint"}
              {unlocked && "Verified with Windows Hello"}
            </p>
          </div>

          <div className="w-full max-w-[260px] space-y-2.5">
            <button
              type="button"
              onClick={run}
              disabled={state === "scanning"}
              className="btn-primary h-10 w-full disabled:opacity-60"
            >
              <Fingerprint className="h-4 w-4" aria-hidden="true" />
              {unlocked ? "Run the demo again" : "Unlock with fingerprint"}
            </button>
            <div className="flex h-10 items-center justify-center rounded-full border border-border text-xs text-muted-foreground" aria-hidden="true">
              Use password instead
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground">Simulated demo. No real biometric data is used.</p>
        </div>
      </div>
    </div>
  )
}

/** Homepage spotlight for biometric unlock, laid out like the reference's two-column privacy section. */
export default function BiometricUnlock() {
  return (
    <section id="biometric-unlock" className="relative scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              Biometric unlock
            </span>
            <h2 className="mt-5 text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl md:text-5xl text-balance">
              Unlock with a touch instead of a password
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              If your computer or phone already unlocks with your fingerprint or face, Locksy can use the same sensor, so
              there&apos;s nothing to type on the lock screen.
            </p>

            <ul className="mt-8 space-y-5">
              {POINTS.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-muted">
                    <Icon className="h-4 w-4 text-highlight" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[15px] font-medium text-foreground">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <UnlockDemo />
        </div>

        {/* Platforms + setup */}
        <div className="mt-12 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="surface p-6 md:p-7">
            <p className="text-sm font-medium text-foreground">Works with the hardware you already have</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {PLATFORMS.map(({ icon: Icon, label, sub }) => (
                <li key={label} className="rounded-xl border border-border bg-background p-3">
                  <Icon className="h-4 w-4 text-highlight" aria-hidden="true" />
                  <p className="mt-3 text-[13px] font-medium leading-snug text-foreground">{label}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{sub}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface flex flex-col p-6 md:p-7">
            <p className="text-sm font-medium text-foreground">Set it up once</p>
            <ol className="mt-5 space-y-4">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-border font-mono text-[11px] text-foreground">
                  1
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Open Locksy&apos;s settings, switch on <span className="text-foreground">Biometric Unlock</span>, and confirm once
                  with your fingerprint, face or key.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-border font-mono text-[11px] text-foreground">
                  2
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  On any lock screen, press the fingerprint button instead of typing.
                </p>
              </li>
            </ol>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
              <p className="text-xs text-muted-foreground">Free: 5 unlocks a day · Pro: unlimited</p>
              <Link href="/guide#biometric" className="inline-flex items-center gap-1 text-sm text-foreground hover:underline underline-offset-4">
                Setup guide <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
