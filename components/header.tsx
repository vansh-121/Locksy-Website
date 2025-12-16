"use client"

import { useState, useEffect, useRef } from "react"

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
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 md:gap-3 group flex-shrink-0">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/locksy_-_new_logo-removebg-preview-A7nNuNJNkO21eb9DgcS0wIKSIINL9U.png"
              alt="Locksy"
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
            href="#features"
            className="text-foreground/80 hover:text-primary font-medium transition-all hover:scale-105 relative group"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#security"
            className="text-foreground/80 hover:text-primary font-medium transition-all hover:scale-105 relative group"
          >
            Security
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="#faq"
            className="text-foreground/80 hover:text-primary font-medium transition-all hover:scale-105 relative group"
          >
            FAQ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="https://github.com/vansh-121/Locksy/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/80 hover:text-primary font-medium transition-all hover:scale-105 relative group"
          >
            Report Issue
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </a>
          <a
            href="mailto:vansh.sethi98760@gmail.com"
            className="text-foreground/80 hover:text-primary font-medium transition-all hover:scale-105 relative group"
          >
            Contact Developer
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
          {/* Watch Demo Button */}
          <a
            href="https://www.youtube.com/watch?v=6uyd4sN5WiA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 xl:px-6 py-2.5 xl:py-3 bg-white border-2 border-primary/20 text-primary font-semibold rounded-xl hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white hover:border-transparent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg text-sm xl:text-base"
          >
            <svg className="w-4 h-4 xl:w-5 xl:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="hidden xl:inline">Watch Demo</span>
            <span className="xl:hidden">Demo</span>
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
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-border/50 overflow-hidden z-50">
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

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors flex-shrink-0"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-border/50 shadow-xl lg:hidden overflow-y-auto max-h-[calc(100vh-80px)]">
            <div className="flex flex-col gap-2 p-6">
              <a
                href="#features"
                className="text-foreground/80 hover:text-primary font-medium p-3 rounded-lg hover:bg-accent transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#security"
                className="text-foreground/80 hover:text-primary font-medium p-3 rounded-lg hover:bg-accent transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Security
              </a>
              <a
                href="https://www.youtube.com/watch?v=6uyd4sN5WiA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary font-medium p-3 rounded-lg hover:bg-accent transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Watch Demo
              </a>
              <a
                href="#faq"
                className="text-foreground/80 hover:text-primary font-medium p-3 rounded-lg hover:bg-accent transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
              <a
                href="https://github.com/vansh-121/Locksy/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary font-medium p-3 rounded-lg hover:bg-accent transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Report Issue
              </a>
              <a
                href="mailto:vansh.sethi98760@gmail.com"
                className="text-foreground/80 hover:text-primary font-medium p-3 rounded-lg hover:bg-accent transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Developer
              </a>
              <div className="mt-4 space-y-2">
                <div className="text-sm font-semibold text-foreground/70 mb-2">Install Extension</div>
                {/* Primary Browsers */}
                {PRIMARY_BROWSERS.map((browser) => (
                  <a
                    key={browser.name}
                    href={browser.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-center flex items-center justify-center gap-2"
                  >
                    <img src={browser.icon} alt={browser.name} className="w-5 h-5 object-contain" />
                    Get for {browser.name}
                  </a>
                ))}
                {/* Secondary Browsers Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {SECONDARY_BROWSERS.map((browser) => (
                    <a
                      key={browser.name}
                      href={browser.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-center flex items-center justify-center gap-2 py-2.5"
                    >
                      <img src={browser.icon} alt={browser.name} className="w-5 h-5 object-contain" />
                      <span className="text-sm">{browser.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
