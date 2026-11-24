import type React from "react"
import { Inter, DM_Sans, Geist_Mono } from "next/font/google"
import "./globals.css"
import {
  metadata as seoMetadata,
  jsonLdWebsite,
  jsonLdSiteNavigation,
  jsonLdOrganization,
  jsonLdSoftwareApplication,
  jsonLdProduct,
  jsonLdHowToInstall
} from "@/lib/metadata"
import ChatSupport from "@/components/chat-support"
import WhatsAppFloat from "@/components/whatsapp-float"
import WhatsAppDialog from "@/components/whatsapp-dialog"
import CookieConsent from "@/components/cookie-consent"
import SocialProofToast from "@/components/social-proof-toast"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })

export const metadata = seoMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <head>
        {/* Prevent flash of dismissed sale banner & maintain hero spacing before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.cookie='locksy_banner_dismissed=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';if(sessionStorage.getItem('locksy_banner_dismissed')==='true'||Date.now()>=1790812800000){document.documentElement.classList.add('banner-dismissed');document.write('<style id="banner-dismiss-style">#top-announcement-banner{display:none!important;}</style>');}}catch(e){}`,
          }}
        />
        {/* RSS Feed Auto-Discovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Locksy Blog RSS Feed"
          href="https://www.locksy.dev/feed.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Locksy Changelog RSS Feed"
          href="https://www.locksy.dev/changelog/feed.xml"
        />
        {/* LLM & AI Context Auto-Discovery */}
        <link
          rel="alternate"
          type="text/markdown"
          title="Locksy LLM Documentation Summary"
          href="https://www.locksy.dev/llms.txt"
        />
        <link
          rel="alternate"
          type="text/markdown"
          title="Locksy Extended LLM Full Specification"
          href="https://www.locksy.dev/llms-full.txt"
        />
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSiteNavigation) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApplication) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowToInstall) }}
        />

      </head>
      <body
        className={`${inter.variable} ${dmSans.variable} ${geistMono.variable} font-sans overflow-x-hidden`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <SocialProofToast />
          <WhatsAppFloat />
          <WhatsAppDialog />
          <ChatSupport />
          <CookieConsent />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
