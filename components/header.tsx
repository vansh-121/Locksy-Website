"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { PRO_CHECKOUT_URL } from "@/lib/pro"
import { ALL_BROWSERS, LOCKSY_LOGO_URL, type BrowserLink } from "@/lib/browsers"
import { useVisitorBrowser } from "@/components/install-buttons"

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Security", href: "/security" },
  { label: "Pricing", href: "/pricing" },
  { label: "Guide", href: "/guide" },
  { label: "Tools", href: "/tools" },
  { label: "Blog", href: "/blog" },
]

function InstallMenu({ onSelect, current }: { onSelect?: () => void; current: BrowserLink }) {
  // The visitor's browser first, then everything else.
  const list = [current, ...ALL_BROWSERS.filter((b) => b.id !== current.id)]
  return (
    <div className="p-1.5">
      <p className="px-3 pt-2 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Choose your browser
      </p>
      {list.map((b, i) => (
        <a
          key={b.id}
          href={b.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onSelect}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
            i === 0 ? "bg-highlight/10 ring-1 ring-highlight/30 hover:bg-highlight/15" : "hover:bg-muted"
          }`}
        >
          <img src={b.icon} alt="" className="h-6 w-6 object-contain" />
          <span className="flex-1 min-w-0">
            <span className="flex items-center gap-2 text-sm font-medium text-foreground">
              {b.name === "your browser" ? "This browser" : b.name}
              {i === 0 && b.name !== "your browser" && (
                <span className="rounded-full bg-highlight/15 px-1.5 py-px text-[10px] font-medium text-highlight">
                  Your browser
                </span>
              )}
            </span>
            <span className="block text-xs text-muted-foreground">{b.store}</span>
          </span>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
        </a>
      ))}
    </div>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showInstall, setShowInstall] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { browser } = useVisitorBrowser()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Other components dispatch this to open the install menu (e.g. "Install" CTAs).
  useEffect(() => {
    const open = () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
      setShowInstall(true)
    }
    window.addEventListener("open-install-dropdown", open)
    return () => window.removeEventListener("open-install-dropdown", open)
  }, [])

  useEffect(() => {
    if (!showInstall) return
    const onDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowInstall(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowInstall(false)
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [showInstall])

  return (
    <header suppressHydrationWarning className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border px-3 py-2 pl-4 transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? "border-border bg-background/75 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="Locksy home">
          <Image src={LOCKSY_LOGO_URL} alt="" width={36} height={36} priority className="h-8 w-8" />
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">Locksy</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />
          <a
            href={PRO_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Get Pro
          </a>
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setShowInstall((v) => !v)}
              aria-expanded={showInstall}
              aria-haspopup="menu"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground pl-3.5 pr-4 text-sm font-medium text-background hover:opacity-90 transition-opacity"
            >
              <img src={browser.icon} alt="" className="h-4 w-4 object-contain" />
              Add to {browser.name}
              <ChevronDown className={`h-4 w-4 transition-transform ${showInstall ? "rotate-180" : ""}`} />
            </button>
            {showInstall && (
              <div className="absolute right-0 mt-2 w-72 overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150">
                <InstallMenu current={browser} onSelect={() => setShowInstall(false)} />
              </div>
            )}
          </div>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mx-auto mt-2 max-w-6xl overflow-y-auto rounded-3xl border border-border bg-background/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden max-h-[calc(100vh-6rem)] animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col" aria-label="Mobile">
            {[...NAV_LINKS, { label: "FAQ", href: "/#faq" }, { label: "Contact", href: "/contact" }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-[15px] text-foreground hover:bg-muted transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="my-2 h-px bg-border" />
          <InstallMenu current={browser} onSelect={() => setIsMenuOpen(false)} />
          <div className="mt-2 grid grid-cols-2 gap-2 p-1.5">
            <a
              href={PRO_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary h-11"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Pro
            </a>
            <a
              href="https://github.com/sponsors/vansh-121"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary h-11"
              onClick={() => setIsMenuOpen(false)}
            >
              Sponsor
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
