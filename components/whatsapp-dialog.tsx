"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ExternalLink, Smartphone, Sparkles } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import WhatsAppIcon from "@/components/whatsapp-icon"
import { WHATSAPP_CHANNEL_URL } from "@/lib/social-links"

export default function WhatsAppDialog() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener("locksy-open-whatsapp-modal", handleOpen)
    return () => {
      window.removeEventListener("locksy-open-whatsapp-modal", handleOpen)
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md p-6 bg-card border border-border shadow-2xl rounded-3xl overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-emerald-500 via-[#25D366] to-teal-400 rounded-full" />

        <DialogHeader className="text-center pt-2 space-y-2">
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold w-fit mx-auto border border-emerald-500/20">
            <WhatsAppIcon className="w-4 h-4" />
            <span>Official Locksy Channel</span>
          </div>

          <DialogTitle className="text-2xl font-black tracking-tight text-foreground">
            Join on WhatsApp
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground max-w-xs mx-auto">
            Scan with your phone to follow in 1 tap, or join directly via WhatsApp Web / Desktop.
          </DialogDescription>
        </DialogHeader>

        {/* QR Code Container */}
        <div className="my-3 flex flex-col items-center justify-center">
          <div className="relative p-3.5 bg-white rounded-2xl border-2 border-emerald-500/25 shadow-xl shadow-emerald-500/10 transition-transform duration-300 hover:scale-[1.02]">
            <Image
              src="/whatsapp-channel-qr.svg"
              alt="Locksy WhatsApp Channel QR Code"
              width={180}
              height={180}
              priority
              className="w-44 h-44 sm:w-48 sm:h-48 rounded-lg block"
            />
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
            <span>Point your phone camera or WhatsApp scanner</span>
          </div>
        </div>

        {/* Desktop Direct Join Action */}
        <div className="space-y-2 pt-2">
          <a
            href={WHATSAPP_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold py-3 px-4 shadow-md shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-sm group"
          >
            <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
            <span>Open in WhatsApp Web / Desktop</span>
            <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
          </a>

          <p className="text-[11px] text-center text-muted-foreground">
            Free to join • Instant security updates &amp; zero spam
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
