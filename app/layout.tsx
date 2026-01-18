import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { 
  metadata as seoMetadata, 
  jsonLdWebsite, 
  jsonLdOrganization, 
  jsonLdSoftwareApplication 
} from "@/lib/metadata"
import ChatSupport from "@/components/chat-support"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = seoMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
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
      </head>
      <body className={`${geist.className} overflow-x-hidden`}>
        {children}
        <ChatSupport />
      </body>
    </html>
  )
}
