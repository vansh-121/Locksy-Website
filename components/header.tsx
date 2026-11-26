"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X, ArrowUpRight, Wrench, BookOpen, LifeBuoy, History, Info, HelpCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { PRO_CHECKOUT_URL } from "@/lib/pro"
import { ALL_BROWSERS, LOCKSY_LOGO_URL, type BrowserLink } from "@/lib/browsers"
import { useVisitorBrowser } from "@/components/install-buttons"

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Security", href: "/security" },
  { label: "Pricing", href: "/pricing" },
  { label: "Compare", href: "/compare" },
  { label: "Blog", href: "/blog" },
]

const RESOURCE_LINKS = [
  { label: "Tools", href: "/tools", description: "Password & privacy utilities", icon: Wrench },
  { label: "Guide", href: "/guide", description: "Setup & feature walkthrough", icon: BookOpen },
  { label: "Changelog", href: "/changelog", description: "Release notes & what's new", icon: History },
  { label: "About", href: "/about", description: "Story, mission & open source", icon: Info },
  { label: "FAQ", href: "/#faq", description: "Answers to common questions", icon: HelpCircle },
  { label: "Support", href: "/contact", description: "Help, feedback & contact", icon: LifeBuoy },
]

const MOBILE_LINKS = [
  ...NAV_LINKS,
  { label: "Tools", href: "/tools" },
  { label: "Support", href: "/contact" },
]

function isLinkActive(href: string, pathname: string) {
  if (href.startsWith("/#")) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

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
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${i === 0 ? "bg-highlight/10 ring-1 ring-highlight/30 hover:bg-highlight/15" : "hover:bg-muted"
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
  const [showResources, setShowResources] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const resourcesRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname() ?? ""
  const isResourceActive = RESOURCE_LINKS.some((item) => isLinkActive(item.href, pathname))
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
      setShowResources(false)
      setShowInstall(true)
    }
    window.addEventListener("open-install-dropdown", open)
    return () => window.removeEventListener("open-install-dropdown", open)
  }, [])

  useEffect(() => {
    if (!showInstall && !showResources) return
    const onDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowInstall(false)
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) setShowResources(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowInstall(false)
        setShowResources(false)
      }
    }
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [showInstall, showResources])

  return (
    <header suppressHydrationWarning className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border px-3 py-2 pl-4 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 ${isScrolled || isMenuOpen
          ? "border-black/[0.08] bg-white/75 shadow-[0_10px_34px_rgba(0,0,0,0.10),inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-white/[0.14] dark:bg-[#0d0f14]/70 dark:shadow-[0_12px_36px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.14)]"
          : "border-black/[0.05] bg-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] dark:border-white/[0.09] dark:bg-[#0d0f14]/45 dark:shadow-[0_4px_24px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.10)]"
          }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="Locksy home">
          <Image src={LOCKSY_LOGO_URL} alt="" width={36} height={36} priority className="h-8 w-8" />
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">Locksy</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden min-[1180px]:flex items-center gap-0.5 min-[1280px]:gap-1" aria-label="Main">
          {NAV_LINKS.map((l) => {
            const active = isLinkActive(l.href, pathname)
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 xl:px-3.5 py-2 text-sm transition-colors whitespace-nowrap ${
                  active ? "bg-muted/70 font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            )
          })}
          <div ref={resourcesRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setShowInstall(false)
                setShowResources((v) => !v)
              }}
              aria-expanded={showResources}
              aria-haspopup="menu"
              className={`inline-flex items-center gap-1 rounded-full px-3 xl:px-3.5 py-2 text-sm transition-colors whitespace-nowrap ${
                isResourceActive || showResources
                  ? "bg-muted/70 font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Resources
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showResources ? "rotate-180" : ""}`} />
            </button>
            {showResources && (
              <div className="absolute left-0 mt-2 w-64 overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/[0.14] dark:bg-[#101218] dark:shadow-[0_20px_48px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)] animate-in fade-in slide-in-from-top-1 duration-150">
                {RESOURCE_LINKS.map((item) => {
                  const Icon = item.icon
                  const active = isLinkActive(item.href, pathname)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setShowResources(false)}
                      className={`flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                        active ? "bg-muted/80" : "hover:bg-muted"
                      }`}
                    >
                      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${active ? "text-foreground" : "text-muted-foreground"}`} />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-foreground">{item.label}</span>
                        <span className="block text-xs text-muted-foreground">{item.description}</span>
                      </span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Desktop actions */}
        <div className="hidden min-[1180px]:flex items-center gap-2">
          <ThemeToggle />
          <a
            href={PRO_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Get Pro
          </a>
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setShowResources(false)
                setShowInstall((v) => !v)
              }}
              aria-expanded={showInstall}
              aria-haspopup="menu"
              className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-foreground pl-3.5 pr-4 text-sm font-medium text-background hover:opacity-90 transition-opacity"
            >
              <img src={browser.icon} alt="" className="h-4 w-4 object-contain" />
              Add to {browser.name}
              <ChevronDown className={`h-4 w-4 transition-transform ${showInstall ? "rotate-180" : ""}`} />
            </button>
            {showInstall && (
              <div className="absolute right-0 mt-2 w-72 overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/[0.14] dark:bg-[#101218] dark:shadow-[0_20px_48px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)] animate-in fade-in slide-in-from-top-1 duration-150">
                <InstallMenu current={browser} onSelect={() => setShowInstall(false)} />
              </div>
            )}
          </div>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1.5 min-[1180px]:hidden">
          {/* Tablets have room for the install button next to the menu */}
          <a
            href={browser.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 items-center gap-2 whitespace-nowrap rounded-full bg-foreground pl-3 pr-4 text-sm font-medium text-background hover:opacity-90 transition-opacity sm:inline-flex"
          >
            <img src={browser.icon} alt="" className="h-4 w-4 object-contain" />
            Add to {browser.name}
          </a>
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
        <div className="mx-auto mt-2 max-w-5xl overflow-y-auto rounded-3xl border border-black/[0.08] bg-white/85 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/[0.14] dark:bg-[#101218]/80 dark:shadow-[0_20px_48px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)] min-[1180px]:hidden max-h-[calc(100vh-6rem)] animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col" aria-label="Mobile">
            {MOBILE_LINKS.map((l) => {
              const active = isLinkActive(l.href, pathname)
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-2xl px-4 py-2.5 text-[15px] transition-colors ${
                    active ? "bg-muted font-medium text-foreground" : "text-foreground hover:bg-muted"
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>
          <div className="my-2 h-px bg-border" />
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
