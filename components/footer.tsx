"use client"

import Image from "next/image"
import Link from "next/link"
import WhatsAppIcon from "./whatsapp-icon"
import { WHATSAPP_CHANNEL_URL, openWhatsAppChannel } from "@/lib/social-links"
import { CHROME_STORE_URL, EDGE_STORE_URL, FIREFOX_STORE_URL, LOCKSY_LOGO_URL } from "@/lib/browsers"

type FooterLink = { label: string; href: string; external?: boolean; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Chrome Web Store", href: CHROME_STORE_URL, external: true },
      { label: "Firefox Add-ons", href: FIREFOX_STORE_URL, external: true },
      { label: "Edge Add-ons", href: EDGE_STORE_URL, external: true },
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
      { label: "Demo video", href: "https://www.youtube.com/watch?v=mZxIBLo9ezY", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "User guide", href: "/guide" },
      { label: "Security", href: "/security" },
      { label: "Free tools", href: "/tools" },
      { label: "Blog", href: "/blog" },
      { label: "Best tab lockers 2026", href: "/blog/best-tab-locking-extensions-2026" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "support@locksy.dev", href: "mailto:support@locksy.dev" },
      { label: "WhatsApp channel", href: WHATSAPP_CHANNEL_URL, external: true, onClick: openWhatsAppChannel },
      { label: "FAQ", href: "/#faq" },
      { label: "Report an issue", href: "https://github.com/vansh-121/Locksy/issues/new?template=bug_report.md", external: true },
      { label: "Discussions", href: "https://github.com/vansh-121/Locksy/discussions", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of service", href: "/terms-of-service" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Cookie policy", href: "/cookie-policy" },
      { label: "Refund policy", href: "/refund-policy" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "License", href: "https://github.com/vansh-121/Locksy/blob/main/LICENSE", external: true },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 md:px-6 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src={LOCKSY_LOGO_URL} alt="" width={36} height={36} className="h-8 w-8" />
              <span className="font-display text-lg font-semibold tracking-tight text-foreground">Locksy</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Password protection for your browser tabs. Private by design, fully offline, no account needed.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href={WHATSAPP_CHANNEL_URL}
                onClick={openWhatsAppChannel}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow Locksy on WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/watch?v=mZxIBLo9ezY"
                target="_blank"
                rel="noopener noreferrer"
                title="Watch the demo on YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://github.com/vansh-121/Locksy"
                target="_blank"
                rel="noopener noreferrer"
                title="Locksy on GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="font-sans text-sm font-medium tracking-normal text-foreground">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        onClick={l.onClick}
                        {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors break-words"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Supported browsers */}
        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-8 text-xs text-muted-foreground">
          <span>Works on</span>
          {[
            ["chrome", "Chrome"],
            ["edge", "Edge"],
            ["firefox", "Firefox"],
            ["brave", "Brave"],
            ["opera", "Opera"],
            ["vivaldi", "Vivaldi"],
            ["arc", "Arc"],
          ].map(([id, name]) => (
            <span key={id} className="inline-flex items-center gap-1.5">
              <img src={`/browsers/${id}.png`} alt="" className="h-4 w-4 object-contain opacity-80" />
              {name}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">© 2025–2026 Locksy. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://peerpush.com/p/locksy-tab-locker-and-password-protection"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 transition-opacity"
              title="Locksy on PeerPush"
            >
              <img
                src="https://peerpush.com/p/locksy-tab-locker-and-password-protection/badge.png"
                alt="Locksy on PeerPush"
                style={{ height: "32px", width: "auto" }}
              />
            </a>
            <a
              href="https://sellwithboost.com"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 transition-opacity"
              title="Listed on Sell With Boost"
            >
              <img src="https://sellwithboost.com/badge/listing-dark.svg" alt="Listed on Sell With Boost" style={{ height: "32px", width: "auto" }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
