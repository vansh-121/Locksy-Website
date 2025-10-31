"use client"

import { useState, useEffect } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/locksy_-_new_logo-removebg-preview-A7nNuNJNkO21eb9DgcS0wIKSIINL9U.png"
              alt="Locksy"
              className="relative h-12 w-auto"
            />
          </div>
          <span className="font-black text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Locksy
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
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

        {/* CTA Button with Dropdown */}
        <div className="hidden md:relative md:inline-block">
          <button
            onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
            onBlur={() => setTimeout(() => setShowDownloadDropdown(false), 200)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 group"
          >
            Install Now
            <svg
              className={`w-4 h-4 transition-transform ${showDownloadDropdown ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDownloadDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-border/50 overflow-hidden z-50">
              <a
                href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-4 hover:bg-accent transition-colors border-b border-border/30"
              >
                <img
                  src="/browsers/chrome.png"
                  alt="Chrome"
                  className="w-8 h-8 object-contain"
                />
                <div className="flex-1">
                  <div className="font-semibold text-foreground">Chrome</div>
                  <div className="text-xs text-muted-foreground">Chrome Web Store</div>
                </div>
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-4 hover:bg-accent transition-colors"
              >
                <img
                  src="/browsers/edge.png"
                  alt="Edge"
                  className="w-8 h-8 object-contain"
                />
                <div className="flex-1">
                  <div className="font-semibold text-foreground">Edge</div>
                  <div className="text-xs text-muted-foreground">Edge Add-ons</div>
                </div>
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
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
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-border/50 shadow-xl md:hidden">
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
                Report / Request
              </a>
              <a
                href="mailto:vansh.sethi98760@gmail.com"
                className="text-foreground/80 hover:text-primary font-medium p-3 rounded-lg hover:bg-accent transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Developer
              </a>
              <div className="mt-4 space-y-2">
                <a
                  href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center flex items-center justify-center gap-2"
                >
                  <img
                    src="/browsers/chrome.png"
                    alt="Chrome"
                    className="w-5 h-5 object-contain"
                  />
                  Get for Chrome
                </a>
                <a
                  href="https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center flex items-center justify-center gap-2"
                >
                  <img
                    src="/browsers/edge.png"
                    alt="Edge"
                    className="w-5 h-5 object-contain"
                  />
                  Get for Edge
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
