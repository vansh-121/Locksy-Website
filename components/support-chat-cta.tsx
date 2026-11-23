"use client"

import Link from "next/link"
import { MessageCircle, Mail, BookOpen } from "lucide-react"
import WhatsAppIcon from "@/components/whatsapp-icon"
import { WHATSAPP_CHANNEL_URL, openWhatsAppChannel } from "@/lib/social-links"

/** "Still have questions?" band with the real support channels. */
export default function SupportChatCTA() {
  const openChat = () => {
    if (typeof window !== "undefined" && (window as any).$crisp) {
      ;(window as any).$crisp.push(["do", "chat:open"])
    }
  }

  const channels = [
    { icon: BookOpen, title: "User guide", desc: "Step-by-step setup for every feature.", href: "/guide" },
    { icon: Mail, title: "Email", desc: "support@locksy.dev, answered by the developer.", href: "mailto:support@locksy.dev" },
    { icon: MessageCircle, title: "Contact form", desc: "Bug reports, feature ideas and licence help.", href: "/contact" },
  ]

  return (
    <section className="relative py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="surface grid gap-10 p-7 md:p-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              Support
            </span>
            <h2 className="mt-5 text-3xl font-semibold leading-[1.1] text-foreground md:text-4xl text-balance">
              Still have questions?
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Locksy is built and supported by its developer. Ask about setup, troubleshooting or your Pro licence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={openChat} className="btn-primary">
                <MessageCircle className="h-4 w-4" />
                Start a chat
              </button>
              <a
                href={WHATSAPP_CHANNEL_URL}
                onClick={openWhatsAppChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp channel
              </a>
            </div>
          </div>

          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
            {channels.map(({ icon: Icon, title, desc, href }) => (
              <li key={title}>
                <Link href={href} className="flex items-center gap-4 bg-background/40 p-5 hover:bg-muted transition-colors">
                  <Icon className="h-5 w-5 flex-shrink-0 text-highlight" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-[15px] font-medium text-foreground">{title}</span>
                    <span className="block text-sm text-muted-foreground">{desc}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
