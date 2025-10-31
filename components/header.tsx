"use client"

import { useState, useEffect } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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
        </nav>

        {/* CTA Button */}
        <a
          href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 group"
        >
          Add to Chrome
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>

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
                href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
                className="btn-primary text-center mt-4"
              >
                Add to Chrome
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
