import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "Locksy - Password-Protect Browser Tabs | Available for Chrome & Edge",
  description:
    "Lock any browser tab with a password. Military-grade security, 100% offline, free forever. Protect sensitive tabs on shared computers. Available for Chrome and Microsoft Edge.",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={geist.className}>{children}</body>
    </html>
  )
}
