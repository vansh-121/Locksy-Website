"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false)

    useEffect(() => {
        // Check if user has already made a cookie consent choice
        const consent = localStorage.getItem("locksy-cookie-consent")
        if (!consent) {
            // Small delay so banner doesn't flash on page load
            const timer = setTimeout(() => setShowBanner(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const acceptAll = () => {
        localStorage.setItem("locksy-cookie-consent", "accepted")
        setShowBanner(false)
    }

    const acceptEssential = () => {
        localStorage.setItem("locksy-cookie-consent", "essential-only")
        setShowBanner(false)
    }

    if (!showBanner) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-in slide-in-from-bottom-5 duration-500">
            <div className="max-w-4xl mx-auto bg-card/95 backdrop-blur-xl border-2 border-border/50 rounded-2xl shadow-2xl shadow-black/20 p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    {/* Icon & Text */}
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🍪</span>
                            <h3 className="font-bold text-lg">Cookie Consent</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            We use essential cookies to make this site work properly, and optional cookies from third-party embeds (YouTube, Google AdSense).
                            We do <strong>not</strong> use analytics tracking cookies.{" "}
                            <Link href="/cookie-policy" className="text-primary hover:underline font-medium">
                                Read our Cookie Policy
                            </Link>
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
                        <button
                            onClick={acceptEssential}
                            className="px-6 py-3 text-sm font-semibold text-foreground bg-accent border border-border rounded-xl hover:bg-accent/80 transition-all"
                        >
                            Essential Only
                        </button>
                        <button
                            onClick={acceptAll}
                            className="px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-primary to-secondary rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-0.5"
                        >
                            Accept All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
