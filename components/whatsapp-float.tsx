"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ExternalLink, Smartphone, X } from "lucide-react"
import WhatsAppIcon from "./whatsapp-icon"
import { WHATSAPP_CHANNEL_URL } from "@/lib/social-links"
import { onConsentDecided } from "@/lib/consent"

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)
  // Hidden until the cookie choice is made and the visitor has scrolled past
  // the first screen, so the hero isn't crowded by floating buttons.
  const [consented, setConsented] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => onConsentDecided(() => setConsented(true)), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const visible = consented && (scrolled || isOpen)

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleClick = (e: React.MouseEvent) => {
    // Detect mobile devices
    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768

    if (!isMobile) {
      // On desktop, toggle the floating QR popover
      e.preventDefault()
      setIsOpen((prev) => !prev)
    }
    // On mobile, native link navigates directly to WhatsApp
  }

  return (
    <div
      ref={containerRef}
      aria-hidden={!visible}
      className={`fixed bottom-4 left-4 z-40 transition-all duration-300 print:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      {/* Floating QR Popover (Desktop) */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="WhatsApp Channel QR Code"
          className="absolute bottom-14 left-0 w-72 rounded-2xl border border-border bg-popover/95 p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl animate-in fade-in-0 zoom-in-95 duration-200"
        >

          {/* Header */}
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#25D366] text-white">
                <WhatsAppIcon className="h-4 w-4" />
              </div>
              <div className="text-left leading-tight">
                <h4 className="font-sans text-xs font-medium tracking-normal text-foreground">Locksy Channel</h4>
                <p className="text-[10px] text-muted-foreground">Official WhatsApp broadcast</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close popover"
              className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* QR Code */}
          <div className="my-3 flex flex-col items-center">
            <div className="rounded-xl bg-white p-2.5">
              <Image
                src="/whatsapp-channel-qr.svg"
                alt="Locksy WhatsApp Channel QR Code"
                width={150}
                height={150}
                priority
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-md block"
              />
            </div>

            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-muted-foreground text-center">
              <Smartphone className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Scan with your phone to join in 1 tap</span>
            </div>
          </div>

          {/* Direct Join Link / Button for Desktop Users */}
          <div className="space-y-1.5 pt-1">
            <a
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-3 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>Open in WhatsApp Web</span>
              <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>

            <p className="text-[10px] text-center text-muted-foreground">
              Already logged into WhatsApp Web? Click above.
            </p>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <a
        tabIndex={visible ? undefined : -1}
        href={WHATSAPP_CHANNEL_URL}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow the Locksy Support channel on WhatsApp"
        title="Follow Locksy Support on WhatsApp"
        className={`group flex h-11 items-center rounded-full border border-border bg-popover/90 px-3 text-foreground shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${isOpen ? "bg-muted" : ""}`}
      >
        <WhatsAppIcon className="h-5 w-5 flex-shrink-0 text-[#25D366]" />
        <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[12rem] group-hover:opacity-100">
          Join our WhatsApp Channel
        </span>
      </a>
    </div>
  )
}
