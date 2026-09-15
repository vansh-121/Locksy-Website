"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ExternalLink, Smartphone, X } from "lucide-react"
import WhatsAppIcon from "./whatsapp-icon"
import { WHATSAPP_CHANNEL_URL } from "@/lib/social-links"

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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
    <div ref={containerRef} className="fixed bottom-4 left-4 z-40 print:hidden">
      {/* Floating QR Popover (Desktop) */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="WhatsApp Channel QR Code"
          className="absolute bottom-16 left-0 w-72 sm:w-80 rounded-2xl bg-card/95 border border-emerald-500/30 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in-0 zoom-in-95 duration-200"
        >
          {/* Top Accent Line */}
          <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-emerald-500 via-[#25D366] to-teal-400 rounded-full" />

          {/* Header */}
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#25D366] text-white">
                <WhatsAppIcon className="h-4 w-4" />
              </div>
              <div className="text-left leading-tight">
                <h4 className="text-xs font-bold text-foreground">Locksy Channel</h4>
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
            <div className="p-2.5 bg-white rounded-xl border border-emerald-500/20 shadow-md">
              <Image
                src="/whatsapp-channel-qr.svg"
                alt="Locksy WhatsApp Channel QR Code"
                width={150}
                height={150}
                priority
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-md block"
              />
            </div>

            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium text-center">
              <Smartphone className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span>Scan with your phone to join in 1 tap</span>
            </div>
          </div>

          {/* Direct Join Link / Button for Desktop Users */}
          <div className="space-y-1.5 pt-1">
            <a
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-xs py-2.5 px-3 shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
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
        href={WHATSAPP_CHANNEL_URL}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow the Locksy Support channel on WhatsApp"
        title="Follow Locksy Support on WhatsApp"
        className={`group flex items-center rounded-full bg-[#25D366] p-3 text-white shadow-lg shadow-black/20 transition-all duration-300 hover:bg-[#1ebe5b] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] ${
          isOpen ? "ring-4 ring-emerald-400/40 scale-105" : ""
        }`}
      >
        <WhatsAppIcon className="h-6 w-6 flex-shrink-0" />
        <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[12rem] group-hover:opacity-100">
          Join our WhatsApp Channel
        </span>
      </a>
    </div>
  )
}
