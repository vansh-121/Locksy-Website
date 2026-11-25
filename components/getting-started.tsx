"use client"

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Download,
  Lock,
  MousePointerClick,
  Pin,
  Puzzle,
  Keyboard,
} from "lucide-react"
import { type BrowserLink } from "@/lib/browsers"
import { useVisitorBrowser } from "@/components/install-buttons"
import { GUIDE_PDF_PATH } from "@/lib/guide-paths"
import ProductShot from "@/components/product-shot"

/*
 * First-run walkthrough for people who have never used a browser extension
 * like this. Every step mirrors chapters 1–2 of the user guide
 * (lib/guide-content.json: "install" and "first-lock"), so the wording and the
 * order match what the extension actually shows.
 */

// ── Small mock UI pieces ─────────────────────────────────────────────────────

function Window({ children, url = "example.com" }: { children: ReactNode; url?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        </div>
        <div className="flex-1 truncate rounded-full bg-muted px-3 py-1 text-[11px] text-muted-foreground">{url}</div>
      </div>
      {children}
    </div>
  )
}

function Popup({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-2xl border border-border bg-card p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-highlight/15">
          <Lock className="h-3.5 w-3.5 text-highlight" aria-hidden="true" />
        </span>
        <span className="text-sm font-medium text-foreground">Locksy</span>
      </div>
      {children}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] text-muted-foreground">{label}</p>
      <div className="flex h-9 items-center rounded-lg border border-border bg-background px-3 text-sm tracking-[0.25em] text-muted-foreground">
        {value}
      </div>
    </div>
  )
}

// ── Steps ────────────────────────────────────────────────────────────────────

interface Step {
  id: string
  title: string
  short: string
  body: ReactNode
  visual: (browser: BrowserLink) => ReactNode
}

const STEPS: Step[] = [
  {
    id: "install",
    title: "Add Locksy to your browser",
    short: "Free, and no account needed.",
    body: (
      <>
        Open your browser&apos;s extension store and click <strong>Add</strong>. Chrome, Edge and Firefox each have their own store.
        Brave, Opera, Vivaldi, Arc, Comet, Yandex and other Chromium browsers install from the Chrome Web Store; Zen, LibreWolf, Floorp and Waterfox use Firefox Add-ons.
      </>
    ),
    visual: (browser) => (
      <Window url={new URL(browser.url).hostname}>
        <div className="flex flex-col items-center gap-4 px-6 py-10 text-center">
          <img src={browser.icon} alt="" className="h-10 w-10 object-contain" />
          <div>
            <p className="font-display text-base font-semibold text-foreground">Locksy: Tab Locker</p>
            <p className="mt-1 text-xs text-muted-foreground">{browser.store}</p>
          </div>
          <a href={browser.url} target="_blank" rel="noopener noreferrer" className="btn-primary btn-glow h-10 px-5">
            Add to {browser.name}
          </a>
        </div>
      </Window>
    ),
  },
  {
    id: "pin",
    title: "Pin it to your toolbar",
    short: "So the Locksy icon is always one click away.",
    body: (
      <>
        Click the <strong>puzzle-piece</strong> icon in your toolbar, find Locksy and click the <strong>pin</strong>. The icon also shows a
        live count of how many tabs are locked.
      </>
    ),
    visual: () => (
      <Window>
        <div className="flex items-center justify-end gap-2 border-b border-border px-4 py-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-md bg-highlight/15">
            <Lock className="h-3.5 w-3.5 text-highlight" aria-hidden="true" />
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-semibold text-white">
              2
            </span>
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-highlight/50 bg-muted">
            <Puzzle className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          </span>
        </div>
        <div className="flex justify-end px-4 py-4">
          <div className="w-60 rounded-xl border border-border bg-card p-2 text-sm">
            <p className="px-2 pb-2 pt-1 text-[11px] text-muted-foreground">Extensions</p>
            <div className="flex items-center justify-between rounded-lg bg-muted px-2 py-2">
              <span className="flex items-center gap-2 text-foreground">
                <Lock className="h-3.5 w-3.5 text-highlight" aria-hidden="true" />
                Locksy
              </span>
              <Pin className="h-3.5 w-3.5 fill-current text-highlight" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Window>
    ),
  },
  {
    id: "password",
    title: "Create your master password",
    short: "One password locks and unlocks every tab.",
    body: (
      <>
        The first time you open Locksy it asks for one password. It never leaves your device and can&apos;t be sent back to you, so
        pick something you&apos;ll remember.
      </>
    ),
    visual: () => (
      <div className="py-4">
        <Popup>
          <p className="text-sm font-medium text-foreground">Set your master password</p>
          <div className="mt-4 space-y-3">
            <Field label="Password" value="••••••••••" />
            <Field label="Confirm password" value="••••••••••" />
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted" aria-hidden="true">
            <div className="h-full w-4/5 rounded-full bg-emerald-500" />
          </div>
          <p className="mt-1.5 text-[11px] text-muted-foreground">Strong password</p>
          <div className="mt-4 flex h-9 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background">
            Save password
          </div>
        </Popup>
      </div>
    ),
  },
  {
    id: "recovery",
    title: "Save your recovery key",
    short: "Your only way back in if you forget the password.",
    body: (
      <>
        Locksy shows a 16-character <strong>Master Recovery Key</strong>. Copy it or download it, and keep it somewhere away from this
        computer. It resets a forgotten password, completely offline.
      </>
    ),
    visual: () => (
      <figure className="mx-auto max-w-[300px]">
        <div className="overflow-hidden rounded-2xl border border-border">
          <ProductShot
            name="recovery"
            alt="Locksy's Emergency Recovery Key screen with Copy Key, Download Key and I've Saved It buttons"
            className="h-auto w-full"
          />
        </div>
        <figcaption className="mt-3 text-center text-xs text-muted-foreground">
          The real screen, with a demo key. Yours is unique and shown only once.
        </figcaption>
      </figure>
    ),
  },
  {
    id: "lock",
    title: "Lock your first tab",
    short: "Three ways, all doing the same thing.",
    body: (
      <>
        Click the Locksy icon and choose <strong>Lock Current Tab</strong>, press <strong>Alt+Shift+9</strong> (Option+Shift+9 on a Mac),
        or right-click the page and pick <strong>Locksy → Lock this tab</strong>.
      </>
    ),
    visual: () => (
      <div className="grid items-start gap-4 sm:grid-cols-[1fr_200px]">
        <div className="grid gap-2.5">
          {[
            { icon: MousePointerClick, title: "Locksy icon", detail: <span className="text-xs text-muted-foreground">Current Tab</span> },
            {
              icon: Keyboard,
              title: "Shortcut",
              detail: (
                <span className="flex gap-1">
                  <kbd className="kbd">Alt</kbd>
                  <kbd className="kbd">Shift</kbd>
                  <kbd className="kbd">9</kbd>
                </span>
              ),
            },
            { icon: MousePointerClick, title: "Right-click", detail: <span className="text-xs text-muted-foreground">Lock this tab</span> },
          ].map(({ icon: Icon, title, detail }) => (
            <div key={title} className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background px-4 py-3.5">
              <span className="flex items-center gap-3 text-sm text-foreground">
                <Icon className="h-4 w-4 text-highlight" aria-hidden="true" />
                {title}
              </span>
              {detail}
            </div>
          ))}
          <p className="px-1 text-xs leading-relaxed text-muted-foreground">
            The page is taken off the screen and a small red padlock appears on the tab.
          </p>
        </div>
        <div className="mx-auto w-full max-w-[220px] overflow-hidden rounded-2xl border border-border">
          <ProductShot name="popup" alt="The Locksy popup with Current Tab, All Tabs, Unlock All Tabs and Domain Lock buttons" className="h-auto w-full" />
        </div>
      </div>
    ),
  },
  {
    id: "unlock",
    title: "Unlock when you're back",
    short: "Type your password, or use your fingerprint.",
    body: (
      <>
        Enter your master password on the lock screen and Locksy returns you to the exact page you were on. With several tabs locked,
        <strong> Unlock All</strong> in the popup opens them all with one password.
      </>
    ),
    visual: () => (
      <Window url="mail.example.com">
        <ProductShot
          name="locked"
          alt="Locksy's lock screen: Tab Secured, with a password field and Unlock Tab button"
          className="h-auto w-full"
        />
      </Window>
    ),
  },
]

// ── Component ───────────────────────────────────────────────────────────────

export default function GettingStarted() {
  const [active, setActive] = useState(0)
  const { browser } = useVisitorBrowser()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])


  const go = (i: number, focus = false) => {
    const next = (i + STEPS.length) % STEPS.length
    setActive(next)
    if (focus) tabRefs.current[next]?.focus()
  }

  // Arrow keys move between steps (WAI-ARIA tabs pattern).
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault()
      go(i + 1, true)
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault()
      go(i - 1, true)
    } else if (e.key === "Home") {
      e.preventDefault()
      go(0, true)
    } else if (e.key === "End") {
      e.preventDefault()
      go(STEPS.length - 1, true)
    }
  }

  const step = STEPS[active]
  const isLast = active === STEPS.length - 1

  return (
    <section id="how-it-works" className="relative scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            New to Locksy?
          </span>
          <h2 className="mt-5 text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl md:text-5xl text-balance">
            Get set up in six short steps
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Never used a tab locker before? Follow along. It takes about a minute, and you can&apos;t break anything.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          {/* Step list */}
          <div role="tablist" aria-label="Setup steps" aria-orientation="vertical" className="surface p-2">
            {STEPS.map((s, i) => {
              const selected = i === active
              const done = i < active
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  role="tab"
                  id={`gs-tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls={`gs-panel-${s.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => go(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`flex w-full items-start gap-4 rounded-2xl px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    selected ? "bg-muted" : "hover:bg-muted/60"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-colors ${
                      selected
                        ? "border-foreground bg-foreground text-background"
                        : done
                          ? "border-highlight/40 bg-highlight/10 text-highlight"
                          : "border-border text-muted-foreground"
                    }`}
                  >
                    {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-[15px] font-medium ${selected ? "text-foreground" : "text-foreground/80"}`}>
                      {s.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{s.short}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Active step */}
          <div
            role="tabpanel"
            id={`gs-panel-${step.id}`}
            aria-labelledby={`gs-tab-${step.id}`}
            className="surface flex flex-col p-6 md:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-xs text-muted-foreground">
                Step {active + 1} of {STEPS.length}
              </p>
              <div className="flex h-1 w-32 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                <div
                  className="h-full rounded-full bg-highlight transition-[width] duration-300"
                  style={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="mt-5 text-2xl font-semibold text-foreground">{step.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground [&_strong]:font-medium [&_strong]:text-foreground">
              {step.body}
            </p>

            <div className="mt-6 flex-1">{step.visual(browser)}</div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
              <button
                type="button"
                onClick={() => go(active - 1)}
                disabled={active === 0}
                className="btn-secondary h-10 px-4 disabled:pointer-events-none disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back
              </button>
              {isLast ? (
                <Link href="/guide" className="btn-primary h-10 px-5">
                  Explore the full guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : (
                <button type="button" onClick={() => go(active + 1)} className="btn-primary h-10 px-5">
                  Next step
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Guide links */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row sm:gap-6">
          <Link href="/guide" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Read the full user guide
          </Link>
          <a href={GUIDE_PDF_PATH} download className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Download className="h-4 w-4" aria-hidden="true" />
            Download it as a PDF
          </a>
        </div>
      </div>
    </section>
  )
}
