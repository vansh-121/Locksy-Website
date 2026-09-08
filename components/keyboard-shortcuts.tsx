"use client"

// Keyboard shortcuts, presented as a polished reference table.
//
// This is a client component so it can auto-detect macOS and show ⌥ Option
// instead of Alt. Important: it renders the Windows/Linux key set as its
// initial state (never null), so the full table — every shortcut, action and
// description — is present in the server-rendered HTML. The macOS swap happens
// after mount, and a manual toggle lets anyone see either key set regardless of
// what they're browsing on.
//
// A real <table> is used on desktop for genuine row/column semantics, with
// stacked cards on mobile where a multi-column table would be unreadable.

import { useEffect, useState } from "react"

type Platform = "win" | "mac"

const SHORTCUTS = [
  {
    winKeys: ["Alt", "Shift", "9"],
    macKeys: ["⌥ Option", "⇧ Shift", "9"],
    action: "Lock the current tab",
    description: "Instantly locks the tab you're looking at right now.",
    icon: "🔒",
    gradient: "from-blue-500 to-cyan-500",
    tier: null,
  },
  {
    winKeys: ["Alt", "Shift", "0"],
    macKeys: ["⌥ Option", "⇧ Shift", "0"],
    action: "Open the lock manager",
    description: "Jump straight to the panel where you manage locked sites.",
    icon: "🗂️",
    gradient: "from-violet-500 to-purple-500",
    tier: null,
  },
  {
    winKeys: ["Alt", "Shift", "8"],
    macKeys: ["⌥ Option", "⇧ Shift", "8"],
    action: "Lock every open tab",
    description: "Locks all compatible tabs in the window in one go.",
    // Note: deliberately not an amber/orange gradient — the ⚡ emoji is itself
    // yellow-orange and disappears against a warm background.
    icon: "⚡",
    gradient: "from-rose-500 to-red-600",
    tier: "3 free, then Pro",
  },
  {
    winKeys: ["Alt", "Shift", "7"],
    macKeys: ["⌥ Option", "⇧ Shift", "7"],
    action: "Toggle Stealth Mode",
    description: "Hides Locksy completely — badge, alerts, and lock screen.",
    icon: "🕵️",
    gradient: "from-emerald-500 to-teal-600",
    tier: null,
  },
]

// Shared keycap rendering so the table and the mobile cards stay identical.
// The heavier bottom border + inset highlight give the keys a physical feel.
function Keys({ keys }: { keys: string[] }) {
  return (
    <span className="inline-flex items-center gap-2 flex-wrap">
      {keys.map((key, i) => (
        <span key={key} className="inline-flex items-center gap-2">
          <kbd className="px-3 py-2 min-w-[3rem] text-center bg-gradient-to-b from-card to-muted border border-border/80 border-b-[3px] border-b-border rounded-lg text-sm font-bold text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_1px_2px_rgba(0,0,0,0.2)] whitespace-nowrap">
            {key}
          </kbd>
          {i < keys.length - 1 && (
            <span className="text-muted-foreground/60 text-xs font-bold">+</span>
          )}
        </span>
      ))}
    </span>
  )
}

function TierBadge({ tier }: { tier: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25 whitespace-nowrap">
      {tier}
    </span>
  )
}

export default function KeyboardShortcuts() {
  // Default to Windows/Linux so the server-rendered HTML has real content.
  const [platform, setPlatform] = useState<Platform>("win")

  useEffect(() => {
    const ua = navigator.userAgent
    if (/Mac|iPhone|iPad|iPod/.test(ua)) setPlatform("mac")
  }, [])

  const keysFor = (s: (typeof SHORTCUTS)[number]) =>
    platform === "mac" ? s.macKeys : s.winKeys

  return (
    <section
      id="keyboard-shortcuts"
      className="py-20 md:py-28 bg-gradient-to-b from-background via-accent/20 to-background relative overflow-hidden"
    >
      {/* Soft background glow, consistent with neighbouring sections */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/5 w-80 h-80 bg-primary/8 dark:bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/5 w-72 h-72 bg-secondary/8 dark:bg-secondary/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
            <span aria-hidden="true">⌨️</span>
            Keyboard shortcuts
          </div>
          <h2 className="section-title">Lock a Tab Without Touching Your Mouse</h2>
          <p className="section-subtitle">
            Four shortcuts cover everything. They work the moment you install Locksy, and you can
            change any of them in your browser's extension settings.
          </p>
        </div>

        {/* Platform switch — auto-set from your device, changeable by hand */}
        <div className="flex justify-center mb-8">
          <div
            role="group"
            aria-label="Show shortcuts for"
            className="inline-flex items-center p-1 rounded-xl bg-muted/70 border border-border/60 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => setPlatform("win")}
              aria-pressed={platform === "win"}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                platform === "win"
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Windows / Linux
            </button>
            <button
              type="button"
              onClick={() => setPlatform("mac")}
              aria-pressed={platform === "mac"}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                platform === "mac"
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              macOS
            </button>
          </div>
        </div>

        {/* ── Desktop: reference table ─────────────────────────────── */}
        <div className="hidden md:block rounded-2xl border border-border/60 bg-card shadow-xl shadow-primary/5 overflow-hidden">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Locksy keyboard shortcuts, the action each one performs, and what it does
            </caption>
            <thead>
              <tr className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border/60">
                <th
                  scope="col"
                  className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground w-[42%]"
                >
                  Press
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground"
                >
                  What happens
                </th>
              </tr>
            </thead>
            <tbody>
              {SHORTCUTS.map((s, idx) => (
                <tr
                  key={s.action}
                  className={`group transition-colors hover:bg-accent/40 ${
                    idx < SHORTCUTS.length - 1 ? "border-b border-border/40" : ""
                  }`}
                >
                  <td className="px-6 py-5 align-middle">
                    <Keys keys={keysFor(s)} />
                  </td>
                  <td className="px-6 py-5 align-middle">
                    <div className="flex items-start gap-3.5">
                      {/* Gradient icon tile — matches the Features grid treatment */}
                      <div
                        className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform duration-300`}
                      >
                        <span aria-hidden="true">{s.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-foreground">{s.action}</p>
                          {s.tier && <TierBadge tier={s.tier} />}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          {s.description}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Mobile: stacked cards ────────────────────────────────── */}
        <div className="md:hidden space-y-3.5">
          {SHORTCUTS.map((s) => (
            <div
              key={s.action}
              className="rounded-2xl border border-border/60 bg-card p-5 shadow-lg shadow-primary/5"
            >
              <div className="flex items-start gap-3.5 mb-4">
                <div
                  className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-xl shadow-md`}
                >
                  <span aria-hidden="true">{s.icon}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-foreground leading-snug">{s.action}</p>
                  {s.tier && (
                    <span className="inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                      {s.tier}
                    </span>
                  )}
                </div>
              </div>
              <Keys keys={keysFor(s)} />
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>

        {/* Supporting details: customization + the visual cues */}
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          {[
            {
              icon: "⚙️",
              title: "Change any of them",
              desc: "Remap every shortcut from your browser's extension shortcut settings.",
            },
            {
              icon: "🔒",
              title: "A lock on the tab",
              desc: "Locked tabs show a red lock over the favicon, so protected tabs stand out.",
            },
            {
              icon: "🔢",
              title: "A live counter",
              desc: "The Locksy icon shows how many tabs are locked right now.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm p-5 transition-all duration-300 hover:border-primary/30 hover:-translate-y-0.5"
            >
              <div className="text-2xl mb-2.5" aria-hidden="true">
                {item.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
