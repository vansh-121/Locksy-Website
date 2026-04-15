import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import {
  metadata as seoMetadata,
  jsonLdWebsite,
  jsonLdOrganization,
  jsonLdSoftwareApplication,
  jsonLdHowToInstall
} from "@/lib/metadata"
import ChatSupport from "@/components/chat-support"
import { ThemeProvider } from "@/components/theme-provider"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = seoMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <head>
        {/* RSS Feed Auto-Discovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Locksy Blog RSS Feed"
          href="https://www.locksy.dev/feed.xml"
        />
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowToInstall) }}
        />
      </head>
      <body className={`${geist.className} overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <ChatSupport />
        </ThemeProvider>
      </body>
    </html>
  )
}
