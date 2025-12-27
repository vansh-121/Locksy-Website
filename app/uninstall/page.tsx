"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Lock, Zap, Heart, ArrowRight, CheckCircle2, Download, Star, Frown } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"

const PRIMARY_BROWSERS = [
    {
        name: "Chrome",
        icon: "/browsers/chrome.png",
        url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim",
    },
    {
        name: "Edge",
        icon: "/browsers/edge.png",
        url: "https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn",
    },
    {
        name: "Firefox",
        icon: "/browsers/firefox.png",
        url: "https://addons.mozilla.org/en-US/firefox/addon/locksy/",
    },
]

const REASONS = [
    "It didn't work as expected",
    "Too many notifications/interruptions",
    "Didn't understand how to use it",
    "Performance issues",
    "Privacy concerns",
    "Switching to another tool",
    "No longer needed",
]

export default function UninstallPage() {
    const [selectedReasons, setSelectedReasons] = useState<string[]>([])
    const [feedback, setFeedback] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    const handleReasonToggle = (reason: string) => {
        setSelectedReasons((prev) =>
            prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]
        )
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        setError("")

        try {
            // Call Web3Forms directly (they're designed for client-side use)
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
                    subject: "Locksy Extension Uninstall Feedback",
                    from_name: "Locksy Uninstall Page",
                    reasons: selectedReasons.join(", "),
                    feedback: feedback || "No additional feedback provided",
                    timestamp: new Date().toISOString(),
                }),
            })

            const data = await response.json()

            if (data.success) {
                setSubmitted(true)
            } else {
                setError("Failed to submit feedback. Please try again.")
            }
        } catch (err) {
            setError("Network error. Please check your connection and try again.")
            console.error("Submission error:", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-accent/30 to-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />

            {/* Header */}
            <Header />

            <main className="relative max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
                {/* Hero Section */}
                <div className="text-center space-y-6 mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg mb-4">
                        <Frown className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        We're Sorry to See You Go
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        Your feedback helps us build a better Locksy for everyone
                    </p>

                    {/* Quick Reinstall Option */}
                    <div className="flex flex-col items-center gap-4 pt-6">
                        <p className="text-base text-muted-foreground">
                            Uninstalled by mistake? Changed your mind? No worries!
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {PRIMARY_BROWSERS.map((browser) => (
                                <a
                                    key={browser.name}
                                    href={browser.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <img
                                        src={browser.icon}
                                        alt={browser.name}
                                        className="h-5 w-5"
                                    />
                                    <span>Reinstall for {browser.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Feedback Section */}
                <div className="max-w-4xl mx-auto mb-20">
                    {!submitted ? (
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                            <Card className="relative border-2 border-primary/20 bg-card/50 backdrop-blur-sm shadow-xl">
                                <CardContent className="pt-8 pb-8 space-y-8">
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm">
                                            <span>💭</span>
                                            Help Us Improve
                                        </div>
                                        <h2 className="text-3xl font-bold">What made you uninstall?</h2>
                                        <p className="text-lg text-muted-foreground">
                                            Select all that apply — your feedback is invaluable to us
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-3 pt-4">
                                            {REASONS.map((reason) => (
                                                <div key={reason} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-accent/50 transition-all cursor-pointer">
                                                    <Checkbox
                                                        id={reason}
                                                        checked={selectedReasons.includes(reason)}
                                                        onCheckedChange={() => handleReasonToggle(reason)}
                                                    />
                                                    <label
                                                        htmlFor={reason}
                                                        className="text-sm font-medium leading-relaxed cursor-pointer flex-1"
                                                    >
                                                        {reason}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label htmlFor="feedback" className="text-sm font-semibold flex items-center gap-2">
                                            <span>📝</span>
                                            Additional Feedback (Optional)
                                        </label>
                                        <Textarea
                                            id="feedback"
                                            placeholder="Tell us what we could do better, or what feature you were missing..."
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            rows={5}
                                            className="resize-none border-2 focus:border-primary"
                                        />
                                    </div>

                                    {error && (
                                        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                                            {error}
                                        </div>
                                    )}

                                    <Button
                                        onClick={handleSubmit}
                                        className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                                        size="lg"
                                        disabled={isSubmitting || (selectedReasons.length === 0 && !feedback.trim())}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="animate-spin mr-2">⏳</span>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                Submit Feedback
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl opacity-50" />
                            <Card className="relative border-2 border-green-500/30 bg-green-500/5 backdrop-blur-sm shadow-xl">
                                <CardContent className="pt-8 pb-8">
                                    <div className="text-center space-y-6">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                                            <CheckCircle2 className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-3xl font-bold">Thank You! 🙏</h3>
                                        <p className="text-lg text-muted-foreground max-w-md mx-auto">
                                            Your feedback helps us make Locksy better for everyone. We truly appreciate you taking the time.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>

                {/* What You'll Miss */}
                <div className="space-y-12 mb-20">
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 border border-destructive/20 rounded-full text-sm font-medium text-destructive backdrop-blur-sm">
                            <span>😢</span>
                            You'll Be Missing Out
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold">What You're Leaving Behind</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Locksy provides security features you won't find in standard browsers
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="group feature-card relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <div className="inline-flex w-16 h-16 items-center justify-center mb-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <Shield className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Military-Grade Protection</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    SHA-256 encryption with 8+ security layers protecting your sensitive banking, email, and work tabs from unauthorized access.
                                </p>
                            </div>
                        </div>

                        <div className="group feature-card relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <div className="inline-flex w-16 h-16 items-center justify-center mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <Lock className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Smart Domain Locking</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Automatically lock entire domains with wildcard patterns. One-time setup protects all current and future tabs from that domain.
                                </p>
                            </div>
                        </div>

                        <div className="group feature-card relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <div className="inline-flex w-16 h-16 items-center justify-center mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <Zap className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Lightning Fast Access</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Lock/unlock with Alt+Shift+9 keyboard shortcut. Ultra-lightweight with zero performance impact on your browser.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center pt-4">
                        <div className="inline-flex items-center gap-6 flex-wrap justify-center text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span>100% Offline Privacy</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span>Works Incognito</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span>No Account Needed</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Common Issues Resolution */}
                <div className="mb-20">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 blur-2xl opacity-50" />
                        <Card className="relative border-2 border-primary/20 bg-muted/50 backdrop-blur-sm shadow-lg">
                            <CardContent className="pt-8 pb-8 space-y-6">
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-4">
                                        <span>💡</span>
                                        Quick Solutions
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-2">Common Issues? We've Got Fixes</h2>
                                    <p className="text-muted-foreground">Most problems have simple solutions</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3 p-6 rounded-xl bg-background/50 border border-border hover:border-primary/30 transition-all">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                                                1
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg mb-2">Too many interruptions?</h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    Customize which domains trigger locks. Whitelist trusted sites or disable auto-lock in settings. You have full control.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 p-6 rounded-xl bg-background/50 border border-border hover:border-primary/30 transition-all">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                                                2
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg mb-2">Confused about setup?</h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    Watch our 2-minute video tutorial. Basics: lock tabs with Alt+Shift+9, manage domains in the popup. It's that simple!
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 p-6 rounded-xl bg-background/50 border border-border hover:border-primary/30 transition-all">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                                                3
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg mb-2">Performance worries?</h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    Locksy uses minimal resources (&lt;1MB RAM) and works entirely locally. No cloud processing means zero lag.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 p-6 rounded-xl bg-background/50 border border-border hover:border-primary/30 transition-all">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                                                4
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg mb-2">Privacy concerns?</h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    Everything stays on your device. We never collect, transmit, or store your data. Open-source and transparent. Check our{" "}
                                                    <Link href="/privacy-policy" className="text-primary hover:underline font-semibold">
                                                        privacy policy
                                                    </Link>.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Reinstall CTA - Big Hero Section */}
                <div className="relative group mb-20">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />

                    <div className="relative bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary rounded-3xl p-12 md:p-16 text-white text-center shadow-2xl shadow-primary/20">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl animate-bounce">
                                🚀
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6">Ready to Come Back?</h2>
                        <p className="text-xl md:text-2xl opacity-95 mb-10 max-w-3xl mx-auto">
                            We're constantly improving based on feedback like yours. Give Locksy another chance — we'd love to earn your trust back.
                        </p>

                        <div className="space-y-6">
                            <p className="text-lg font-semibold opacity-90">
                                Reinstall for your browser:
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
                                {PRIMARY_BROWSERS.map((browser) => (
                                    <a
                                        key={browser.name}
                                        href={browser.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                                    >
                                        <img
                                            src={browser.icon}
                                            alt={browser.name}
                                            className="h-6 w-6"
                                        />
                                        <span>Get for {browser.name}</span>
                                        <Download className="h-5 w-5 group-hover/btn:animate-bounce" />
                                    </a>
                                ))}
                            </div>

                            <div className="pt-6">
                                <Link href="/">
                                    <button className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300">
                                        Learn More About Locksy
                                        <ArrowRight className="h-5 w-5" />
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 text-sm mt-12 pt-8 border-t border-white/20">
                            <div className="flex items-center justify-center gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                <span>30-Second Install</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                <span>No Credit Card</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                <span>No Account Required</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                <span>100% Private</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Support Section */}
                <div className="max-w-4xl mx-auto">
                    <Card className="border-2 border-primary/20 bg-gradient-to-br from-accent to-background shadow-lg">
                        <CardContent className="pt-8 pb-8 text-center space-y-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg mb-2">
                                <Heart className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold">We're Here to Help</h3>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Encountered an issue? Have questions? Our team is ready to assist you.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 pt-4">
                                <Link href="/#faq">
                                    <Button variant="outline" size="lg" className="gap-2">
                                        <span>📚</span>
                                        View FAQ
                                    </Button>
                                </Link>
                                <a
                                    href="https://github.com/vansh-121/locksy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button variant="outline" size="lg" className="gap-2">
                                        <span>💬</span>
                                        GitHub Support
                                    </Button>
                                </a>
                                <a href="mailto:support@locksy.dev">
                                    <Button variant="outline" size="lg" className="gap-2">
                                        <span>✉️</span>
                                        Email Support
                                    </Button>
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative border-t py-12 mt-16 bg-background/50 backdrop-blur-sm">
                <div className="container text-center space-y-6">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <span>Made with</span>
                        <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                        <span>by the Locksy team</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                            Privacy Policy
                        </Link>
                        <Link href="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                            Home
                        </Link>
                        <a
                            href="https://github.com/vansh-121/locksy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors font-medium"
                        >
                            GitHub
                        </a>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Locksy. Protecting your privacy, one tab at a time.
                    </p>
                </div>
            </footer>
        </div>
    )
}
