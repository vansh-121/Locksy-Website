"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"

const PRIMARY_BROWSERS = [
  {
    name: "Chrome",
    icon: "/browsers/chrome.png",
    url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim",
    storeName: "Chrome Web Store",
  },
  {
    name: "Edge",
    icon: "/browsers/edge.png",
    url: "https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn",
    storeName: "Edge Add-ons",
  },
  {
    name: "Firefox",
    icon: "/browsers/firefox.png",
    url: "https://addons.mozilla.org/en-US/firefox/addon/locksy/",
    storeName: "Firefox Add-ons",
  },
]

const SECONDARY_BROWSERS = [
  {
    name: "Brave",
    icon: "/browsers/brave.png",
    url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim",
  },
  {
    name: "Opera",
    icon: "/browsers/opera.png",
    url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim",
  },
  {
    name: "Comet",
    icon: "/browsers/comet.png",
    url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim",
  },
  {
    name: "Vivaldi",
    icon: "/browsers/vivaldi.png",
    url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim",
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false)
  const [saleTimeLeft, setSaleTimeLeft] = useState<{ days: number; hours: number; mins: number; secs: number } | null>(null)
  
  // Always initialize to true so SSR HTML matches client initial render (avoids hydration error)
  const [isBannerVisible, setIsBannerVisible] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Clear any legacy cross-tab cookie so dismissal is strictly per-tab
      try {
        if (document.cookie.includes("locksy_banner_dismissed")) {
          document.cookie = "locksy_banner_dismissed=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        }
      } catch {}

      const isDismissed =
        sessionStorage.getItem("locksy_banner_dismissed") === "true" ||
        document.documentElement.classList.contains("banner-dismissed")
      if (isDismissed) {
        setIsBannerVisible(false)
      }
    }
  }, [])

  const handleDismissBanner = () => {
    setIsBannerVisible(false)
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("locksy_banner_dismissed", "true")
        document.documentElement.classList.add("banner-dismissed")
        let style = document.getElementById("banner-dismiss-style")
        if (!style) {
          style = document.createElement("style")
          style.id = "banner-dismiss-style"
          document.head.appendChild(style)
        }
        style.textContent =
          "#top-announcement-banner { display: none !important; } html.banner-dismissed #hero-section { padding-top: 7rem !important; } @media (min-width: 768px) { html.banner-dismissed #hero-section { padding-top: 8rem !important; } } @media (min-width: 1024px) { html.banner-dismissed #hero-section { padding-top: 8rem !important; } }"
        window.dispatchEvent(new CustomEvent("locksy-banner-dismissed"))
      } catch {}
    }
  }

  useEffect(() => {
    // Target: 1 Oct 12:00 AM UTC (00:00:00 UTC)
    const targetYear = new Date().getUTCFullYear()
    let targetTime = Date.UTC(targetYear, 9, 1, 0, 0, 0)
    if (Date.now() > targetTime) {
      targetTime = Date.UTC(targetYear + 1, 9, 1, 0, 0, 0)
    }

    const tick = () => {
      const diff = Math.max(0, targetTime - Date.now())
      setSaleTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleOpenDropdown = () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
      setShowDownloadDropdown(true)
    }
    window.addEventListener("open-install-dropdown", handleOpenDropdown)
    return () => window.removeEventListener("open-install-dropdown", handleOpenDropdown)
  }, [])

  // Click outside handler for dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDownloadDropdown(false)
      }
    }

    if (showDownloadDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showDownloadDropdown])

  return (
    <header
      suppressHydrationWarning
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5"
        : "bg-transparent"
        }`}
    >
      {/* Early Bird Sale Top Announcement Banner */}
      {isBannerVisible && (
        <div
          id="top-announcement-banner"
          suppressHydrationWarning
          className="relative overflow-hidden bg-gradient-to-r from-violet-950 via-purple-900 to-fuchsia-950 border-b border-violet-500/25 text-white py-2 sm:py-2.5 pl-3 pr-9 sm:px-12 shadow-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/15 to-cyan-500/10 pointer-events-none" />

          {/* Mobile View (< sm: 640px) - Single sleek, compact line */}
          <div className="relative z-10 flex sm:hidden items-center justify-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 font-bold text-violet-200">
              <span>🔥</span>
              <span>Locksy Pro for <strong className="text-white font-extrabold text-xs">$2.99</strong></span>
            </span>
            <a
              href="/pricing"
              className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full bg-white text-violet-950 font-black text-[11px] shadow-xs hover:bg-violet-100 active:scale-95 transition-all flex-shrink-0"
            >
              <span>Claim</span>
              <span>&rarr;</span>
            </a>
          </div>

          {/* Tablet & Desktop View (>= sm: 640px) - Full single-line row without wrapping */}
          <div className="relative z-10 hidden sm:flex items-center justify-center gap-x-3 md:gap-x-5 lg:gap-x-8 text-xs sm:text-sm">
            {/* Tag & Offer */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-violet-500/25 text-violet-200 border border-violet-400/35 shadow-xs flex-shrink-0">
                🔥 Early-Bird Sale
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-violet-100">
                  Locksy Pro for <strong className="text-white font-extrabold text-sm">$2.99</strong>
                </span>
                <span className="hidden xl:inline text-violet-300/80 text-xs">
                  (Increases to $4.99 on Oct 1)
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block h-3.5 w-px bg-white/20" />

            {/* Action Area: Countdown & CTA Button */}
            <div className="flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
              {/* Segmented Countdown */}
              {saleTimeLeft && (
                <div className="flex items-center gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/40 border border-white/20 backdrop-blur-md text-[11px] sm:text-xs shadow-inner">
                  <span className="text-violet-300/90 text-[10px] font-bold uppercase tracking-wider hidden md:inline">Ends in</span>
                  <div className="flex items-center gap-1 font-mono font-bold tracking-tight">
                    <span className="bg-white/10 px-1.5 py-0.5 rounded text-white font-black">{saleTimeLeft.days}d</span>
                    <span className="text-violet-400 font-black">:</span>
                    <span className="bg-white/10 px-1.5 py-0.5 rounded text-white font-black">{String(saleTimeLeft.hours).padStart(2, "0")}h</span>
                    <span className="text-violet-400 font-black">:</span>
                    <span className="bg-white/10 px-1.5 py-0.5 rounded text-white font-black">{String(saleTimeLeft.mins).padStart(2, "0")}m</span>
                    <span className="text-violet-400 font-black">:</span>
                    <span className="bg-fuchsia-500/30 text-fuchsia-200 px-1.5 py-0.5 rounded font-black">{String(saleTimeLeft.secs).padStart(2, "0")}s</span>
                  </div>
                </div>
              )}

              {/* Claim Button */}
              <a
                href="/pricing"
                className="inline-flex items-center gap-1 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white text-violet-950 hover:bg-violet-100 text-xs font-black shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 group flex-shrink-0"
              >
                <span>Claim Deal</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Close / Dismiss Button */}
          <button
            type="button"
            onClick={handleDismissBanner}
            aria-label="Dismiss banner"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-violet-300/80 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 md:gap-3 group flex-shrink-0">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/locksy_-_new_logo-removebg-preview-A7nNuNJNkO21eb9DgcS0wIKSIINL9U.png"
              alt="Locksy"
              width={48}
              height={48}
              priority
              className="relative h-10 md:h-12 w-auto"
            />
          </div>
          <span className="font-black text-xl md:text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Locksy
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
          <a
            href="/#features"
            className="text-foreground/80 hover:text-primary font-medium transition-all hover:scale-105 relative group"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="/guide"
            className="text-foreground/80 hover:text-primary font-medium transition-all hover:scale-105 relative group"
          >
            Guide
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="/security"
            className="text-foreground/80 hover:text-primary font-medium transition-all hover:scale-105 relative group"
          >
            Security
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="/pricing"
            className="text-foreground/80 hover:text-primary font-medium transition-all hover:scale-105 relative group"
          >
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="/#faq"
            className="text-foreground/80 hover:text-primary font-medium transition-all hover:scale-105 relative group"
          >
            FAQ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="/tools"
            className="text-foreground/80 hover:text-primary font-medium transition-all hover:scale-105 relative group"
          >
            Tools
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="/blog"
            className="text-foreground/80 hover:text-primary font-medium transition-all hover:scale-105 relative group"
          >
            Blog
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </a>
          {/* <a
            href="/about"
            className="text-foreground/80 hover:text-primary font-medium transition-all hover:scale-105 relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </a> */}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Pro Upgrade Button */}
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-4 xl:px-6 py-2.5 xl:py-3 bg-card border-2 border-primary/20 text-primary font-semibold rounded-xl hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white hover:border-transparent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg text-sm xl:text-base cursor-pointer"
          >
            <span aria-hidden="true">💎</span>
            <span className="hidden xl:inline">Get Pro</span>
            <span className="xl:hidden">Pro</span>
          </a>

          {/* Install Now Button with Dropdown */}
          <div ref={dropdownRef} className="relative inline-block">
            <button
              onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
              className="inline-flex items-center gap-2 px-4 xl:px-6 py-2.5 xl:py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 group text-sm xl:text-base"
            >
              <span className="hidden xl:inline">Install Now</span>
              <span className="xl:hidden">Install</span>
              <svg
                className={`w-4 h-4 transition-transform ${showDownloadDropdown ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDownloadDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-card rounded-xl shadow-2xl border border-border/50 overflow-hidden z-50">
                {/* Primary Browsers */}
                {PRIMARY_BROWSERS.map((browser) => (
                  <a
                    key={browser.name}
                    href={browser.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors border-b border-border/30"
                  >
                    <img src={browser.icon} alt={browser.name} className="w-8 h-8 object-contain" />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{browser.name}</div>
                      <div className="text-xs text-muted-foreground">{browser.storeName}</div>
                    </div>
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
                {/* Secondary Browsers */}
                {SECONDARY_BROWSERS.map((browser, index) => (
                  <a
                    key={browser.name}
                    href={browser.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors ${index < SECONDARY_BROWSERS.length - 1 ? "border-b border-border/30" : ""
                      }`}
                  >
                    <img src={browser.icon} alt={browser.name} className="w-8 h-8 object-contain" />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{browser.name}</div>
                      <div className="text-xs text-muted-foreground">Chrome Web Store</div>
                    </div>
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile: Get Pro + Theme Toggle + Menu Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <a
            href="/pricing"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <span aria-hidden="true">💎</span>
            <span>Get Pro</span>
          </a>
          <ThemeToggle />
          <button
            className="p-2 rounded-lg hover:bg-accent transition-colors flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-xl lg:hidden overflow-y-auto max-h-[calc(100vh-80px)]">
            <div className="flex flex-col p-6">
              {/* Navigation Section */}
              <div className="space-y-1 mb-2">
                <a
                  href="/#features"
                  className="text-foreground/80 hover:text-primary font-medium p-3 rounded-lg hover:bg-accent transition-all block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="/guide"
                  className="text-foreground/80 hover:text-primary font-medium p-3 rounded-lg hover:bg-accent transition-all block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Guide
                </a>
                <a
                  href="/security"
                  className="text-foreground/80 hover:text-primary font-medium p-3 rounded-lg hover:bg-accent transition-all block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Security
                </a>
                <a
                  href="/pricing"
                  className="text-foreground/80 hover:text-primary font-medium p-3 rounded-lg hover:bg-accent transition-all block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </a>
                <a
                  href="/#faq"
                  className="text-foreground/80 hover:text-primary font-medium p-3 rounded-lg hover:bg-accent transition-all block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </a>
                <a
                  href="/tools"
                  className="text-foreground/80 hover:text-primary font-medium p-3 rounded-lg hover:bg-accent transition-all block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tools
                </a>
                <a
                  href="/blog"
                  className="text-foreground/80 hover:text-primary font-medium p-3 rounded-lg hover:bg-accent transition-all block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </a>
                <a
                  href="/contact"
                  className="text-foreground/80 hover:text-primary font-medium p-3 rounded-lg hover:bg-accent transition-all block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </div>

              {/* Divider */}
              <div className="h-px bg-border/50 my-2" />

              {/* CTA Section */}
              <div className="space-y-2.5 mb-2">
                <a
                  href="/pricing"
                  className="flex items-center justify-center gap-2 p-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span aria-hidden="true">💎</span> Get Pro
                </a>

                <a
                  href="https://github.com/sponsors/vansh-121"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 border border-primary/20 text-primary font-semibold rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  Sponsor Project
                </a>
              </div>

            </div>
          </div>
        )}
      </div>
    </header>
  )
}
