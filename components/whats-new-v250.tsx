"use client"

import { useState, useEffect } from "react"

/* ─── Context Menu Demo ─────────────────────────────────────── */
const MENU_ITEMS = [
  { icon: "🔒", label: "Lock this tab", shortcut: "", desc: "Protect the current tab instantly" },
  { icon: "🌐", label: "Lock this domain", shortcut: "", desc: "Add the entire site to auto-lock" },
  { icon: "📂", label: "Lock all tabs", shortcut: "", desc: "Bulk-lock every tab in the window" },
  { icon: "👁️", label: "Toggle Stealth Mode", shortcut: "", desc: "Flip stealth on/off" },
]

const CONTEXT_TARGETS = [
  "Available on pages",
  "Available on links",
  "Available on images",
  "Available on selected text",
]

/* ─── Stealth Features ──────────────────────────────────────── */
const STEALTH_FEATURES = [
  { icon: "🚫", title: "Lock screen disguised", desc: "Locked tabs show a fake \"This site can't be reached\" page" },
  { icon: "🔕", title: "Badge counter disappears", desc: "Extension icon shows no lock count" },
  { icon: "🔇", title: "Notifications silenced", desc: "All browser notifications muted" },
  { icon: "🎛️", title: "Three toggle methods", desc: "Popup button · Alt+Shift+7 · Right-click" },
  { icon: "💾", title: "Preference persists", desc: "Survives browser restarts & updates" },
  { icon: "🔓", title: "Tabs still accessible", desc: "Alt+U or triple-click to unlock anytime" },
]

/* ─── Theme Features ────────────────────────────────────────── */
const THEME_FEATURES = [
  { icon: "☀️", label: "Light Mode", desc: "Clean, bright interface" },
  { icon: "🌙", label: "Dark Mode", desc: "Easy on the eyes at night" },
]

export default function WhatsNewV250() {
  // Context menu demo state
  const [highlightedItem, setHighlightedItem] = useState(0)
  const [menuVisible, setMenuVisible] = useState(true)

  // Stealth demo state
  const [stealthOn, setStealthOn] = useState(false)

  // Theme demo state
  const [demoTheme, setDemoTheme] = useState<"light" | "dark">("light")

  // Context menu hover animation
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedItem((prev) => (prev + 1) % MENU_ITEMS.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  // Stealth mode auto-toggle demo
  useEffect(() => {
    const interval = setInterval(() => {
      setStealthOn((prev) => !prev)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  // Theme auto-toggle demo
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoTheme((prev) => (prev === "light" ? "dark" : "light"))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="whats-new-v250"
      className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-rose-500/5 via-violet-500/5 to-cyan-500/5"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-violet-500/8 dark:bg-violet-500/15 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] bg-cyan-500/8 dark:bg-cyan-500/15 rounded-full blur-[100px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* ── Section Header ──────────────────────────────────────── */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white rounded-full text-xs sm:text-sm font-bold mb-6 shadow-xl shadow-violet-500/20 animate-pulse">
            <span>🚀</span>
            WHAT'S NEW IN v2.5.0
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 dark:from-violet-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent leading-tight">
            Faster. Stealthier.
            <br className="hidden sm:block" />
            More Beautiful.
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Three headline features that make Locksy more powerful and invisible than ever — right-click convenience,&nbsp;
            <strong className="text-foreground">complete stealth</strong>, and a brand-new theme switcher.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            FEATURE 1 — RIGHT-CLICK CONTEXT MENUS
           ═══════════════════════════════════════════════════════════ */}
        <div className="mb-20 md:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">
            {/* Left — Info */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 rounded-full text-xs sm:text-sm font-bold text-indigo-700 dark:text-indigo-400 mb-5">
                <span>🖱️</span> Right-Click Context Menus
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-foreground leading-tight">
                Lock tabs without{" "}
                <span className="bg-gradient-to-r from-indigo-500 to-violet-500 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                  opening the popup
                </span>
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                Right-click any page, link, image, or selected text to instantly access Locksy's full power.
                No more hunting for the extension icon.
              </p>

              {/* Menu items as feature cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MENU_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-500 ${
                      idx === highlightedItem
                        ? "bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border-indigo-500/30 shadow-lg shadow-indigo-500/10 scale-[1.02]"
                        : "bg-card/60 border-border/50 hover:border-indigo-500/20"
                    }`}
                  >
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Context targets */}
              <div className="flex flex-wrap gap-2 mt-5">
                {CONTEXT_TARGETS.map((target, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-card/70 border border-border/50 rounded-full text-xs font-medium text-muted-foreground"
                  >
                    {target}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Interactive Context Menu Demo */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/15 to-violet-400/15 dark:from-indigo-400/25 dark:to-violet-400/25 rounded-3xl blur-2xl" />

                {/* Browser window mock */}
                <div className="relative bg-card/90 backdrop-blur-xl rounded-3xl border border-border shadow-2xl overflow-hidden">
                  {/* Chrome bar */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-muted/80 border-b border-border">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-2 bg-background rounded-md px-3 py-1 text-xs text-muted-foreground border border-border truncate">
                      🌐 example.com/dashboard
                    </div>
                  </div>

                  {/* Page content background */}
                  <div className="relative p-6 min-h-[340px] bg-gradient-to-br from-muted/30 to-muted/10">
                    {/* Fake page content lines */}
                    <div className="space-y-3 opacity-40 mb-4">
                      <div className="h-3 bg-foreground/10 rounded w-3/4" />
                      <div className="h-3 bg-foreground/10 rounded w-1/2" />
                      <div className="h-3 bg-foreground/10 rounded w-5/6" />
                      <div className="h-3 bg-foreground/10 rounded w-2/3" />
                    </div>

                    {/* Context menu overlay */}
                    <div
                      className={`absolute top-16 left-1/2 -translate-x-1/2 w-64 bg-card border border-border rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ${
                        menuVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }`}
                    >
                      {/* Menu header */}
                      <div className="px-3 py-2 border-b border-border bg-muted/50">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-sm flex items-center justify-center">
                            <span className="text-[8px] text-white font-bold">L</span>
                          </div>
                          <span className="text-xs font-semibold text-foreground">Locksy</span>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="py-1">
                        {MENU_ITEMS.map((item, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-2.5 px-3 py-2.5 cursor-default transition-all duration-300 ${
                              idx === highlightedItem
                                ? "bg-gradient-to-r from-primary/15 to-secondary/10 text-primary"
                                : "text-foreground hover:bg-muted/50"
                            }`}
                          >
                            <span className="text-base flex-shrink-0">{item.icon}</span>
                            <span className="text-xs font-medium">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cursor icon */}
                    <div
                      className="absolute transition-all duration-700 ease-in-out"
                      style={{
                        top: `${76 + highlightedItem * 36}px`,
                        left: "calc(50% + 80px)",
                      }}
                    >
                      <svg className="w-5 h-5 text-foreground drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full shadow-xl font-bold text-xs rotate-6">
                  v2.5.0
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            FEATURE 2 — STEALTH MODE
           ═══════════════════════════════════════════════════════════ */}
        <div className="mb-20 md:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">
            {/* Left — Stealth Demo: Browser Tab Before/After */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Glow */}
                <div
                  className={`absolute inset-0 rounded-3xl blur-2xl transition-all duration-700 ${
                    stealthOn
                      ? "bg-gradient-to-br from-slate-600/20 to-slate-800/20 dark:from-slate-400/15 dark:to-slate-600/15"
                      : "bg-gradient-to-br from-violet-400/15 to-indigo-400/15 dark:from-violet-400/25 dark:to-indigo-400/25"
                  }`}
                />

                {/* Browser window mock */}
                <div className="relative bg-card/90 backdrop-blur-xl rounded-3xl border border-border shadow-2xl overflow-hidden">
                  {/* Chrome bar */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-muted/80 border-b border-border">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-2 bg-background rounded-md px-3 py-1 text-xs text-muted-foreground border border-border truncate flex items-center gap-1.5">
                      <span className="transition-all duration-500">
                        {stealthOn ? "🌐" : "🔒"}
                      </span>
                      <span className="transition-all duration-500">
                        {stealthOn
                          ? "github.com"
                          : "🔒 github.com · protected by Locksy"}
                      </span>
                    </div>
                    {/* Extension icon area */}
                    <div className="relative flex-shrink-0">
                      <div className="w-6 h-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded flex items-center justify-center">
                        <span className="text-[10px]">🔒</span>
                      </div>
                      {/* Badge count - hidden in stealth */}
                      <div
                        className={`absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center transition-all duration-500 ${
                          stealthOn ? "opacity-0 scale-0" : "opacity-100 scale-100"
                        }`}
                      >
                        <span className="text-[7px] text-white font-bold">3</span>
                      </div>
                    </div>
                  </div>

                  {/* Page content area — crossfade between lock screen and error page */}
                  <div className="relative min-h-[360px] overflow-hidden">
                    {/* ── STATE A: Normal Locksy Lock Screen (stealth OFF) ── */}
                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-[#1a1a2e] dark:to-[#16213e] transition-all duration-700 ${
                        stealthOn ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
                      }`}
                    >
                      {/* Lock icon */}
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg shadow-primary/20">
                        🔒
                      </div>
                      <h4 className="text-lg font-bold text-foreground mb-1">This Tab is Locked</h4>
                      <p className="text-xs text-muted-foreground mb-5 text-center">Enter your password to unlock this tab</p>

                      {/* Password field mock */}
                      <div className="w-full max-w-[240px] space-y-3">
                        <div className="flex items-center gap-2 px-3 py-2.5 bg-background border border-border rounded-lg">
                          <svg className="w-4 h-4 text-muted-foreground flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span className="text-xs text-muted-foreground">••••••••</span>
                        </div>
                        <div className="w-full py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-center text-xs font-semibold text-white">
                          Unlock Tab
                        </div>
                      </div>

                      {/* Locksy branding */}
                      <div className="mt-5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <span>Protected by</span>
                        <span className="font-bold text-primary">Locksy</span>
                      </div>
                    </div>

                    {/* ── STATE B: Fake Error Page (stealth ON) ── */}
                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-center p-8 bg-[#202124] transition-all duration-700 ${
                        stealthOn ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                      }`}
                    >
                      {/* Chrome error icon */}
                      <div className="mb-4">
                        <svg className="w-14 h-14 text-gray-500" viewBox="0 0 48 48" fill="none">
                          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" fill="none" />
                          <text x="24" y="32" textAnchor="middle" fill="currentColor" fontSize="24" fontFamily="Arial">?</text>
                        </svg>
                      </div>

                      <h4 className="text-[15px] font-normal text-[#e8eaed] mb-2">This site can't be reached</h4>
                      <p className="text-xs text-[#9aa0a6] mb-4">The connection was refused.</p>

                      <div className="text-left w-full max-w-[240px] mb-4">
                        <p className="text-xs text-[#9aa0a6] mb-2">Try:</p>
                        <ul className="space-y-1.5 text-xs text-[#8ab4f8]">
                          <li className="flex items-start gap-2">
                            <span className="text-[#9aa0a6] mt-0.5">•</span>
                            <span>Checking the connection</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#9aa0a6] mt-0.5">•</span>
                            <span>Checking the proxy and the firewall</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#9aa0a6] mt-0.5">•</span>
                            <span>Running Windows Network Diagnostics</span>
                          </li>
                        </ul>
                      </div>

                      <p className="text-[11px] text-[#9aa0a6] font-mono mb-4">ERR_CONNECTION_REFUSED</p>

                      <div className="flex gap-2">
                        <div className="px-4 py-1.5 bg-[#3c4043] text-[#e8eaed] text-xs rounded font-medium">← Back</div>
                        <div className="px-4 py-1.5 bg-[#8ab4f8] text-[#202124] text-xs rounded font-semibold">Reload</div>
                      </div>

                      {/* Hidden unlock hint */}
                      <p className="mt-4 text-[9px] text-[#9aa0a6]/60 italic">Press Alt+U or triple-click to unlock</p>
                    </div>
                  </div>
                </div>

                {/* Toggle button & status below */}
                <div className="mt-5 flex flex-col items-center gap-3">
                  {/* Stealth toggle */}
                  <button
                    onClick={() => setStealthOn(!stealthOn)}
                    className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold shadow-md transition-all duration-500 cursor-pointer hover:-translate-y-0.5 ${
                      stealthOn
                        ? "bg-slate-700 text-white hover:bg-slate-600"
                        : "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg"
                    }`}
                  >
                    <span>{stealthOn ? "🕵️" : "👁️"}</span>
                    {stealthOn ? "Stealth ON — click to reveal" : "Click to enable Stealth"}
                  </button>

                  {/* Status badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm backdrop-blur-sm transition-all duration-500 ${
                      stealthOn
                        ? "bg-slate-500/10 border border-slate-500/20 text-slate-600 dark:text-slate-400"
                        : "bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full animate-pulse ${
                        stealthOn ? "bg-slate-500" : "bg-violet-500"
                      }`}
                    />
                    {stealthOn ? "Visitors see a connection error — no trace of Locksy" : "Normal Locksy lock screen visible"}
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-slate-600 to-slate-800 text-white px-4 py-2 rounded-full shadow-xl font-bold text-xs rotate-6">
                  🕵️ Stealth
                </div>
              </div>
            </div>

            {/* Right — Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-full text-xs sm:text-sm font-bold text-purple-700 dark:text-purple-400 mb-5">
                <span>🕵️</span> Stealth Mode
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-foreground leading-tight">
                Completely{" "}
                <span className="bg-gradient-to-r from-purple-600 to-violet-600 dark:from-purple-400 dark:to-violet-400 bg-clip-text text-transparent">
                  invisible
                </span>
                .{" "}Fully functional.
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                Make Locksy completely undetectable — no one will know you're using it. Badge counter vanishes.
                Notifications go silent. But your locked tabs? Still bulletproof.
              </p>

              {/* Stealth feature list */}
              <div className="space-y-3">
                {STEALTH_FEATURES.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3.5 bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 hover:border-purple-500/20 transition-all duration-300 hover:shadow-md group"
                  >
                    <span className="text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </span>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{feature.title}</p>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            FEATURE 3 — LIGHT / DARK THEME TOGGLE
           ═══════════════════════════════════════════════════════════ */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">
            {/* Left — Info */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 rounded-full text-xs sm:text-sm font-bold text-violet-700 dark:text-violet-400 mb-5">
                <span>🎨</span> Light / Dark Theme Toggle
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-foreground leading-tight">
                Your look.{" "}
                <span className="bg-gradient-to-r from-cyan-500 to-violet-600 dark:from-cyan-400 dark:to-violet-400 bg-clip-text text-transparent">
                  Your choice.
                </span>
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                A brand-new persistent theme switcher built right into the popup header. Switch between light and dark modes
                seamlessly — your preference syncs across all Locksy pages instantly.
              </p>

              {/* Theme feature cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {THEME_FEATURES.map((theme, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                      (demoTheme === "light" && idx === 0) || (demoTheme === "dark" && idx === 1)
                        ? "bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 shadow-lg shadow-primary/10 scale-[1.02]"
                        : "bg-card/60 border-border/50 hover:border-primary/20"
                    }`}
                    onClick={() => setDemoTheme(idx === 0 ? "light" : "dark")}
                  >
                    <span className="text-3xl mb-2 block">{theme.icon}</span>
                    <p className="font-bold text-base text-foreground">{theme.label}</p>
                    <p className="text-xs text-muted-foreground">{theme.desc}</p>
                  </div>
                ))}
              </div>

              {/* Extra info pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  "Syncs instantly — no reload",
                  "Remembered across sessions",
                  "Works on lock screen too",
                ].map((text, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-card/70 border border-border/50 rounded-full text-xs font-medium text-muted-foreground"
                  >
                    <svg className="w-3 h-3 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {text}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Theme Demo */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Glow */}
                <div
                  className={`absolute inset-0 rounded-3xl blur-2xl transition-all duration-700 ${
                    demoTheme === "dark"
                      ? "bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
                      : "bg-gradient-to-br from-yellow-400/15 to-orange-400/15"
                  }`}
                />

                {/* Popup mock with theme */}
                <div
                  className={`relative rounded-3xl border shadow-2xl overflow-hidden transition-all duration-700 ${
                    demoTheme === "dark"
                      ? "bg-[#1a1a2e] border-[#30304a]"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {/* Header bar with theme toggle */}
                  <div
                    className={`px-5 py-4 flex items-center justify-between transition-all duration-700 ${
                      demoTheme === "dark"
                        ? "bg-gradient-to-r from-[#6d28d9] to-[#4f46e5]"
                        : "bg-gradient-to-r from-[#7c3aed] to-[#6366f1]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-sm">🔒</span>
                      </div>
                      <span className="text-white font-bold text-sm">Locksy</span>
                    </div>

                    {/* Theme toggle button */}
                    <button
                      onClick={() => setDemoTheme(demoTheme === "light" ? "dark" : "light")}
                      className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer"
                    >
                      <span className="text-sm transition-transform duration-500" style={{ display: "inline-block", transform: demoTheme === "dark" ? "rotate(360deg)" : "rotate(0deg)" }}>
                        {demoTheme === "dark" ? "🌙" : "☀️"}
                      </span>
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    {/* Lock status card */}
                    <div
                      className={`p-4 rounded-xl border transition-all duration-700 ${
                        demoTheme === "dark"
                          ? "bg-[#222240] border-[#3a3a5a]"
                          : "bg-gray-50 border-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`font-semibold text-sm transition-colors duration-700 ${
                            demoTheme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Protected Tabs
                        </span>
                        <span
                          className={`text-2xl font-black font-mono transition-colors duration-700 ${
                            demoTheme === "dark" ? "text-violet-400" : "text-violet-600"
                          }`}
                        >
                          3
                        </span>
                      </div>
                      {/* Fake tab list */}
                      {["github.com", "docs.google.com", "mail.google.com"].map((tab, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 py-1.5 ${
                            idx < 2
                              ? `border-b ${demoTheme === "dark" ? "border-[#3a3a5a]" : "border-gray-100"}`
                              : ""
                          }`}
                        >
                          <span className="text-xs">🔒</span>
                          <span
                            className={`text-xs transition-colors duration-700 ${
                              demoTheme === "dark" ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {tab}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action button */}
                    <button
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-700 ${
                        demoTheme === "dark"
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                          : "bg-gradient-to-r from-violet-500 to-indigo-500 text-white"
                      }`}
                    >
                      🔒 Lock Current Tab
                    </button>
                  </div>
                </div>

                {/* Theme label below */}
                <div className="mt-4 flex justify-center">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-card/80 border border-border rounded-full shadow-sm backdrop-blur-sm">
                    <button
                      onClick={() => setDemoTheme("light")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                        demoTheme === "light"
                          ? "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    >
                      ☀️ Light
                    </button>
                    <button
                      onClick={() => setDemoTheme("dark")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                        demoTheme === "dark"
                          ? "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400"
                          : "text-muted-foreground"
                      }`}
                    >
                      🌙 Dark
                    </button>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-xl font-bold text-xs rotate-6">
                  Persistent
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
