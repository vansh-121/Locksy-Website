"use client"

import { useState, useRef, useEffect } from "react"
import { CheckCircle2, Zap, Shield, Sparkles, LayoutDashboard, Camera, ShieldAlert, Key, Globe, EyeOff, Clock, Fingerprint, ShieldCheck, Laptop, Calendar, ChevronDown, ExternalLink } from "lucide-react"
import { PRO_CHECKOUT_URL } from "@/lib/pro"

interface PricingProps {
  hideHeader?: boolean
  className?: string
}

const INITIAL_VISIBLE_COUNT = 6

const BROWSER_DOWNLOADS = [
  {
    name: "Google Chrome",
    store: "Chrome Web Store",
    icon: "/browsers/chrome.png",
    url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim",
  },
  {
    name: "Microsoft Edge",
    store: "Edge Add-ons",
    icon: "/browsers/edge.png",
    url: "https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn",
  },
  {
    name: "Mozilla Firefox",
    store: "Firefox Add-ons",
    icon: "/browsers/firefox.png",
    url: "https://addons.mozilla.org/en-US/firefox/addon/locksy/",
  },
  {
    name: "Brave / Opera / Vivaldi",
    store: "Chrome Web Store",
    icon: "/browsers/brave.png",
    url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim",
  },
]

export default function Pricing({ hideHeader = false, className = "" }: PricingProps = {}) {
  const [billingCycle, setBillingCycle] = useState<"lifetime">("lifetime")
  const [showAllFeatures, setShowAllFeatures] = useState(false)
  const [showInstallMenu, setShowInstallMenu] = useState(false)
  const installDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (installDropdownRef.current && !installDropdownRef.current.contains(event.target as Node)) {
        setShowInstallMenu(false)
      }
    }
    if (showInstallMenu) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showInstallMenu])

  const proFeatures = [
    { title: "Unlimited Domain Auto-Locks", desc: "Lock any number of banking, work & private websites automatically", icon: <Globe className="w-4 h-4" /> },
    { title: "Unlimited Biometric Unlocks", desc: "Touch ID, Windows Hello & Face ID with zero daily limits", icon: <Fingerprint className="w-4 h-4" /> },
    { title: "Use on Up to 5 Devices", desc: "Simultaneous access across 5 computers with built-in Device Manager", icon: <Laptop className="w-4 h-4" /> },
    { title: "Custom Auto-Lock Timers", desc: "Configure custom inactivity re-lock intervals up to 8 hours", icon: <Clock className="w-4 h-4" /> },
    { title: "Unlimited Lock & 1-Click Unlock All", desc: "Unlimited panic hotkey + unlock all tabs simultaneously", icon: <Key className="w-4 h-4" /> },
    { title: "Full Privacy Blur Manager", desc: "Custom blur levels (Light to Solid), site categories & whitelists", icon: <EyeOff className="w-4 h-4" /> },
    { title: "Unlimited Webcam Captures", desc: "Unlimited local snapshots of unauthorized access attempts", icon: <Camera className="w-4 h-4" /> },
    { title: "Scheduled Locking Included", desc: "Automate tab locks by schedule (work hours, night, or custom days)", icon: <Calendar className="w-4 h-4" /> },
    { title: "Startup Session Lock Included", desc: "Instantly lock all session-restored tabs on launch before rendering", icon: <Zap className="w-4 h-4" /> },
    { title: "Stealth Mode Disguise Included", desc: "Disguise locked tabs as fake browser error (ERR_CONNECTION) pages", icon: <EyeOff className="w-4 h-4" /> },
    { title: "Weekly Privacy Reports Included", desc: "Personalized offline dashboard & security score tracking", icon: <LayoutDashboard className="w-4 h-4" /> },
    { title: "Custom Lock Messages Included", desc: "Display personal notes or warnings on the lock screen", icon: <ShieldAlert className="w-4 h-4" /> },
  ]

  const freeLimits = [
    { title: "Domain Auto-Locks (Max 3)", desc: "Auto-lock up to 3 chosen websites (e.g. banking or email portal)", icon: <Globe className="w-4 h-4" /> },
    { title: "Biometric Prompts (Max 5 / day)", desc: "Fingerprint or face recognition unlock via Touch ID & Windows Hello", icon: <Fingerprint className="w-4 h-4" /> },
    { title: "Active Devices (1 device/browser)", desc: "Full protection on your primary personal or work computer", icon: <Laptop className="w-4 h-4" /> },
    { title: "Auto Re-Lock Timer (Fixed 10 min)", desc: "Locksy automatically locks inactive tabs after 10 minutes", icon: <Clock className="w-4 h-4" /> },
    { title: "Lock All Tabs (3 total uses)", desc: "Instant panic hotkey to lock all tabs with 3 total uses", icon: <Key className="w-4 h-4" /> },
    { title: "Privacy Blur Shield (Basic)", desc: "Auto-mask passwords/cards & window focus loss blur", icon: <EyeOff className="w-4 h-4" /> },
    { title: "Webcam Captures (Max 3 stored)", desc: "Store up to 3 local snapshots of failed access attempts", icon: <Camera className="w-4 h-4" /> },
    { title: "Scheduled Locking", desc: "Not included on free tier", icon: <Calendar className="w-4 h-4" /> },
    { title: "Startup Session Lock", desc: "Not included on free tier", icon: <Zap className="w-4 h-4" /> },
    { title: "Stealth Mode Disguise", desc: "Not included on free tier", icon: <EyeOff className="w-4 h-4" /> },
    { title: "Weekly Privacy Reports", desc: "Not included on free tier", icon: <LayoutDashboard className="w-4 h-4" /> },
    { title: "Custom Lock Screen Messages", desc: "Not included on free tier", icon: <ShieldAlert className="w-4 h-4" /> },
  ]

  const visibleFreeLimits = showAllFeatures ? freeLimits : freeLimits.slice(0, INITIAL_VISIBLE_COUNT)
  const visibleProFeatures = showAllFeatures ? proFeatures : proFeatures.slice(0, INITIAL_VISIBLE_COUNT)

  return (
    <section
      id="pricing"
      className={className || "py-24 md:py-32 relative overflow-hidden"}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] bg-gradient-to-tr from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        {!hideHeader && (
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 border border-violet-500/20 rounded-full text-sm font-bold text-violet-600 dark:text-violet-400 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              <Sparkles className="w-4 h-4" />
              Simple Transparent Pricing
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent tracking-tight">
              Choose Your Level of <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">Protection</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Start with our powerful core features for free, or unlock the ultimate privacy suite with a one-time lifetime license.
            </p>
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
          {/* FREE PLAN */}
          <div className="group relative flex flex-col justify-between bg-card/20 backdrop-blur-xl rounded-[2.5rem] border border-border/50 p-8 md:p-10 shadow-2xl transition-all duration-300 hover:border-border hover:shadow-3xl hover:bg-card/40">
            <div>
              <div className="flex items-center justify-between mb-6 h-8">
                <span className="text-xl font-black text-foreground tracking-tight">Free Core</span>
                <span className="text-xs px-3 py-1.5 bg-muted text-muted-foreground rounded-full font-bold uppercase tracking-wider">Free Tier</span>
              </div>
              <div className="mb-8 h-24 flex flex-col justify-end">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-black text-foreground tracking-tight">$0</span>
                </div>
                <p className="text-muted-foreground mt-2 font-medium text-sm">Free forever, no credit card required.</p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

              {/* Checklist */}
              <ul className={`space-y-4 ${showAllFeatures ? "" : "min-h-[420px]"}`}>
                {visibleFreeLimits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 min-h-[54px]">
                    <div className="mt-0.5 p-1 rounded-full bg-muted/50 border border-border/50 text-muted-foreground group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <strong className="text-sm font-bold text-foreground block mb-0.5">{item.title}</strong>
                      <span className="text-xs sm:text-sm text-muted-foreground leading-snug line-clamp-2">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Expand / Collapse Button */}
              <button
                type="button"
                onClick={() => setShowAllFeatures(!showAllFeatures)}
                className="mt-6 flex items-center justify-center gap-2 w-full h-11 px-4 rounded-xl border border-border/60 bg-muted/30 hover:bg-muted/60 text-xs font-bold text-foreground transition-all duration-200 group/expand cursor-pointer"
              >
                <span>
                  {showAllFeatures
                    ? "Show fewer features"
                    : `+${freeLimits.length - INITIAL_VISIBLE_COUNT} more features`}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground group-hover/expand:text-foreground transition-transform duration-300 ${
                    showAllFeatures ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <div className="mt-10 space-y-4 relative" ref={installDropdownRef}>
              <button
                type="button"
                onClick={() => setShowInstallMenu((prev) => !prev)}
                className="w-full h-14 bg-muted text-foreground hover:bg-foreground hover:text-background font-bold rounded-2xl text-center flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-[0.98] cursor-pointer text-sm sm:text-base shadow-sm"
              >
                <span>Download Free Version</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showInstallMenu ? "rotate-180" : ""}`} />
              </button>

              {/* Inline Browser Options Popover */}
              {showInstallMenu && (
                <div className="absolute bottom-full left-0 right-0 mb-3 bg-card/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-border/80 overflow-hidden z-50 p-2 space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/40">
                    Choose Your Browser
                  </div>
                  {BROWSER_DOWNLOADS.map((browser) => (
                    <a
                      key={browser.name}
                      href={browser.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent transition-colors group/store"
                      onClick={() => setShowInstallMenu(false)}
                    >
                      <img src={browser.icon} alt={browser.name} className="w-6 h-6 object-contain flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <div className="text-xs font-bold text-foreground group-hover/store:text-primary transition-colors">{browser.name}</div>
                        <div className="text-[10px] text-muted-foreground">{browser.store}</div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover/store:text-primary transition-colors flex-shrink-0" />
                    </a>
                  ))}
                </div>
              )}

              <div className="h-5 flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                100% Free Forever • No Account Required
              </div>
            </div>
          </div>

          {/* PRO PLAN */}
          <div className="group relative flex flex-col justify-between bg-card/60 backdrop-blur-2xl rounded-[2.5rem] border-2 border-violet-500/40 p-8 md:p-10 shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:shadow-[0_0_60px_rgba(139,92,246,0.25)] transition-all duration-300 z-10 overflow-hidden">

            {/* Animated Glow Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-cyan-500/5 pointer-events-none" />

            {/* Ribbon */}
            <div className="absolute top-8 right-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)] font-bold text-xs uppercase tracking-wider animate-pulse">
              Most Popular
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6 h-8">
                <span className="text-xl font-black bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent tracking-tight">Locksy Pro</span>
              </div>
              <div className="mb-8 h-24 flex flex-col justify-end">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-black text-foreground tracking-tight">$2.99</span>
                </div>
                <p className="text-violet-600 dark:text-violet-400 mt-2 font-bold text-sm">One-time payment. Valid on up to 5 devices forever.</p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-transparent mb-8" />

              {/* Checklist */}
              <ul className={`space-y-4 ${showAllFeatures ? "" : "min-h-[420px]"}`}>
                {visibleProFeatures.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 min-h-[54px]">
                    <div className="mt-0.5 p-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-fuchsia-500 group-hover:text-white dark:group-hover:text-white transition-all duration-300 shadow-sm shadow-violet-500/10 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <strong className="text-sm font-bold text-foreground block mb-0.5">{item.title}</strong>
                      <span className="text-xs sm:text-sm text-muted-foreground leading-snug line-clamp-2">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Expand / Collapse Button */}
              <button
                type="button"
                onClick={() => setShowAllFeatures(!showAllFeatures)}
                className="mt-6 flex items-center justify-center gap-2 w-full h-11 px-4 rounded-xl border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 text-xs font-bold text-violet-600 dark:text-violet-400 transition-all duration-200 group/expand cursor-pointer"
              >
                <span>
                  {showAllFeatures
                    ? "Show fewer features"
                    : `+${proFeatures.length - INITIAL_VISIBLE_COUNT} more features`}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showAllFeatures ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <div className="mt-10 space-y-4 relative z-10">
              <a
                href={PRO_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full h-14 bg-foreground text-background font-black rounded-2xl text-center flex items-center justify-center overflow-hidden transform transition-all duration-300 active:scale-[0.98] group/btn hover:shadow-xl hover:shadow-violet-500/20 text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-white transition-colors duration-300">
                  Upgrade to Pro Now <Zap className="w-5 h-5 animate-pulse" />
                </span>
              </a>
              <div className="h-5 flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Secure payment via Polar.sh · 5 device slots included
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

