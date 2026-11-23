"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Smartphone } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import WhatsAppIcon from "@/components/whatsapp-icon"
import { WHATSAPP_CHANNEL_URL } from "@/lib/social-links"

export default function WhatsAppDialog() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener("locksy-open-whatsapp-modal", handleOpen)
    return () => window.removeEventListener("locksy-open-whatsapp-modal", handleOpen)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-sm rounded-3xl border border-border bg-popover p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        <DialogHeader className="space-y-2 text-center sm:text-center">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-muted">
            <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
          </span>
          <DialogTitle className="pt-2 text-xl font-semibold text-foreground">Locksy on WhatsApp</DialogTitle>
          <DialogDescription className="mx-auto max-w-xs text-sm text-muted-foreground">
            Follow the official channel for release notes and security updates. Scan with your phone, or open it on desktop.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex flex-col items-center">
          <div className="rounded-2xl bg-white p-3">
            <Image
              src="/whatsapp-channel-qr.svg"
              alt="Locksy WhatsApp channel QR code"
              width={180}
              height={180}
              priority
              className="block h-44 w-44 rounded-lg"
            />
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
            Point your phone camera at the code
          </p>
        </div>

        <a href={WHATSAPP_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-2 h-11 w-full">
          Open in WhatsApp Web
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <p className="text-center text-[11px] text-muted-foreground">Free to join. Updates only, no spam.</p>
      </DialogContent>
    </Dialog>
  )
}
