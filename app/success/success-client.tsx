"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
    CheckCircle2,
    Sparkles,
    Mail,
    Key,
    ShieldCheck,
    Download,
    Copy,
    Check,
    ArrowRight,
    HelpCircle,
    ExternalLink,
    Zap,
    Laptop,
    Lock,
    EyeOff,
    Camera,
    Calendar,
    Clock,
    Layers,
    Sliders,
    Globe,
    FileSpreadsheet,
    Terminal,
    Fingerprint,
    ShieldAlert
} from "lucide-react"

export default function SuccessClient() {
    const searchParams = useSearchParams()
    const checkoutId = searchParams.get("checkout_id") || searchParams.get("id")
    const [copiedId, setCopiedId] = useState(false)
    const [copiedShortcut, setCopiedShortcut] = useState(false)
    const [activeFeatureTab, setActiveFeatureTab] = useState<"all" | "protection" | "stealth" | "automation">("all")

    const copyCheckoutId = () => {
        if (!checkoutId) return
        navigator.clipboard.writeText(checkoutId)
        setCopiedId(true)
        setTimeout(() => setCopiedId(false), 2000)
    }

    const copyShortcut = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopiedShortcut(true)
        setTimeout(() => setCopiedShortcut(false), 2000)
    }

    const ACTIVATION_STEPS = [
        {
            step: "01",
            icon: Mail,
            title: "Check Your Email",
            description: "Polar.sh just sent your receipt and lifetime license key to your checkout email. Check your Inbox (or Spam folder)."
        },
        {
            step: "02",
            icon: Download,
            title: "Open Locksy in Browser",
            description: "Click the Locksy icon in your browser toolbar. If you haven't installed it yet, download it from your browser store below."
        },
        {
            step: "03",
            icon: Key,
            title: "Paste & Unlock Pro",
            description: "Click 'Activate License' (or Settings → License), paste your key, and click Activate. All Pro features unlock instantly on up to 5 devices."
        }
    ]

    const ALL_FEATURES = [
        {
            category: "protection",
            categoryName: "Tab & Domain Defense",
            icon: Globe,
            title: "Unlimited Domain Auto-Locks",
            tag: "Pro Unlimited",
            description: "Automatically lock specific domains (banking, personal email, medical portals, social networks) whenever visited with wildcard support (*.bank.com)."
        },
        {
            category: "protection",
            categoryName: "Tab & Domain Defense",
            icon: Lock,
            title: "Startup Session Lock",
            tag: "High Security",
            description: "Automatically re-locks previously restored tabs the instant your browser launches before sensitive content has a chance to render."
        },
        {
            category: "protection",
            categoryName: "Tab & Domain Defense",
            icon: Layers,
            title: "1-Click Unlock All Tabs",
            tag: "Workflow Speed",
            description: "Unlock all currently protected tabs across your active browser session simultaneously with a single master password prompt."
        },
        {
            category: "protection",
            categoryName: "Tab & Domain Defense",
            icon: ShieldAlert,
            title: "Panic Lock All Open Tabs",
            tag: "Instant Panic Hotkey",
            description: "Lock every open tab in the active window in a split second if someone unexpectedly walks into your office or workspace."
        },
        {
            category: "stealth",
            categoryName: "Privacy & Anti-Snooping",
            icon: EyeOff,
            title: "Stealth Mode Disguise",
            tag: "Undercover Security",
            description: "Disguise locked tabs as fake browser network errors (ERR_CONNECTION_TIMED_OUT) so snoops never even suspect the tab is password protected."
        },
        {
            category: "stealth",
            categoryName: "Privacy & Anti-Snooping",
            icon: Camera,
            title: "Unlimited Webcam Intruder Captures",
            tag: "Intruder Evidence",
            description: "Silently captures local webcam snapshots whenever an incorrect password is entered, giving you photographic evidence of tampering."
        },
        {
            category: "stealth",
            categoryName: "Privacy & Anti-Snooping",
            icon: Sliders,
            title: "Privacy Blur Shield Manager",
            tag: "Anti-Shoulder Surfing",
            description: "Automatically blurs tab contents the moment you switch windows or open password fields, with customizable blur intensity."
        },
        {
            category: "stealth",
            categoryName: "Privacy & Anti-Snooping",
            icon: FileSpreadsheet,
            title: "Weekly Security Health Reports",
            tag: "Local Audits",
            description: "Get detailed weekly breakdown dashboards of security events, failed unlock attempts, and tab safety scores stored 100% locally."
        },
        {
            category: "automation",
            categoryName: "Automation & Devices",
            icon: Calendar,
            title: "Scheduled Automated Locking",
            tag: "Smart Scheduling",
            description: "Automate tab locks based on time of day, work shifts, or specific days of the week so you never forget to secure sensitive pages."
        },
        {
            category: "automation",
            categoryName: "Automation & Devices",
            icon: Fingerprint,
            title: "Unlimited Biometric WebAuthn Unlock",
            tag: "FIDO2 / Touch ID",
            description: "Seamlessly unlock locked tabs with Apple Touch ID, Windows Hello (fingerprint & face recognition), or hardware FIDO2 security keys."
        },
        {
            category: "automation",
            categoryName: "Automation & Devices",
            icon: Laptop,
            title: "5 Personal Device Activations",
            tag: "Cross-Platform",
            description: "Use your single Pro license across 5 personal machines (macOS, Windows, Linux, Chromebook) with self-service device slot management."
        },
        {
            category: "automation",
            categoryName: "Automation & Devices",
            icon: Zap,
            title: "Lifetime Updates & Manifest V3",
            tag: "Future Proof",
            description: "No monthly or yearly renewals. You receive all future feature upgrades, performance optimizations, and browser compatibility patches forever."
        }
    ]

    const filteredFeatures = activeFeatureTab === "all"
        ? ALL_FEATURES
        : ALL_FEATURES.filter(f => f.category === activeFeatureTab)

    const SHORTCUTS = [
        { label: "Lock Active Tab", shortcut: "Alt + Shift + 9", desc: "Default instant tab lock shortcut" },
        { label: "Right-Click Context Menu", shortcut: "Right Click → Locksy", desc: "Lock any tab, link or domain via mouse" },
        { label: "Emergency Recovery", shortcut: "16-Char Key", desc: "Reset master password without data loss" },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-accent/30 to-background relative overflow-hidden flex flex-col justify-between" suppressHydrationWarning>
            {/* Ambient Background decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700 pointer-events-none" />

            <Header />

            <main className="relative flex-1 page-top-offset pb-20 md:pb-28">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    {/* Celebration Hero */}
                    <div className="text-center space-y-6 pt-6 md:pt-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-primary/10 border border-emerald-500/30 rounded-full text-sm font-semibold text-emerald-600 dark:text-emerald-400 backdrop-blur-sm shadow-xs">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Payment Confirmed • Lifetime License Active</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight text-foreground">
                            Welcome to{" "}
                            <span className="bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary bg-clip-text text-transparent">
                                Locksy Pro!
                            </span>
                        </h1>

                        <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                            Thank you for investing in your privacy. Your lifetime license key has been generated and dispatched to your email address.
                        </p>

                        {/* Order Reference Pill */}
                        {checkoutId && (
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-card border border-border shadow-xs text-xs md:text-sm">
                                <span className="text-muted-foreground">Order Reference:</span>
                                <code className="font-mono font-bold text-foreground bg-muted px-2 py-0.5 rounded-md">
                                    {checkoutId}
                                </code>
                                <button
                                    type="button"
                                    onClick={copyCheckoutId}
                                    title="Copy Order ID"
                                    className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {copiedId ? (
                                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                                    ) : (
                                        <Copy className="h-3.5 w-3.5" />
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Step-by-Step Activation Card */}
                    <div className="mt-12 md:mt-16 bg-card rounded-3xl p-8 md:p-10 border border-border shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-2xl bg-gradient-to-r from-primary/15 to-secondary/15 text-primary border border-primary/20">
                                        <Key className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-black text-foreground">
                                            How to Activate Your License
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            3 simple steps to unlock your Pro features right now:
                                        </p>
                                    </div>
                                </div>

                                <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-muted text-muted-foreground border border-border">
                                    <Laptop className="h-3.5 w-3.5 text-primary" />
                                    <span>Works across 5 devices</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {ACTIVATION_STEPS.map((step, idx) => {
                                    const Icon = step.icon
                                    return (
                                        <div
                                            key={idx}
                                            className="p-6 rounded-2xl bg-muted/40 border border-border/80 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-xs"
                                        >
                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="font-mono text-xs font-black text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                                                        Step {step.step}
                                                    </span>
                                                    <Icon className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <h3 className="font-bold text-foreground text-base mb-2">
                                                    {step.title}
                                                </h3>
                                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Browser Install Fallback */}
                            <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-center sm:text-left">
                                    <p className="font-bold text-foreground text-sm">
                                        Haven&apos;t installed Locksy on this browser yet?
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Install in 1-click from your official extension store:
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    <a
                                        href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-card hover:bg-accent border border-border hover:border-primary/40 text-xs font-bold text-foreground transition-all shadow-xs"
                                    >
                                        <span>Chrome Store</span>
                                        <ExternalLink className="h-3 w-3 text-primary" />
                                    </a>
                                    <a
                                        href="https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-card hover:bg-accent border border-border hover:border-primary/40 text-xs font-bold text-foreground transition-all shadow-xs"
                                    >
                                        <span>Edge Add-ons</span>
                                        <ExternalLink className="h-3 w-3 text-primary" />
                                    </a>
                                    <a
                                        href="https://addons.mozilla.org/en-US/firefox/addon/locksy/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-card hover:bg-accent border border-border hover:border-primary/40 text-xs font-bold text-foreground transition-all shadow-xs"
                                    >
                                        <span>Firefox Add-ons</span>
                                        <ExternalLink className="h-3 w-3 text-primary" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* All Pro Features Section - Highly Contentful & Rich */}
                    <div className="mt-16 md:mt-24 space-y-8">
                        <div className="text-center space-y-3">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 via-purple-500/10 to-secondary/10 border border-primary/20 rounded-full text-sm font-semibold text-primary backdrop-blur-sm shadow-xs">
                                <Sparkles className="h-4 w-4" />
                                <span>Complete Feature Arsenal</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-foreground">
                                Everything Unlocked in Your{" "}
                                <span className="bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary bg-clip-text text-transparent">
                                    Lifetime License
                                </span>
                            </h2>
                            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                                You now own every single military-grade tab security capability across 5 devices with zero subscription renewals.
                            </p>

                            {/* Category Filter Tabs */}
                            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setActiveFeatureTab("all")}
                                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${activeFeatureTab === "all" ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/25" : "bg-card hover:bg-muted text-muted-foreground border border-border"}`}
                                >
                                    All Features ({ALL_FEATURES.length})
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveFeatureTab("protection")}
                                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${activeFeatureTab === "protection" ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/25" : "bg-card hover:bg-muted text-muted-foreground border border-border"}`}
                                >
                                    Tab & Domain Defense
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveFeatureTab("stealth")}
                                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${activeFeatureTab === "stealth" ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/25" : "bg-card hover:bg-muted text-muted-foreground border border-border"}`}
                                >
                                    Privacy & Anti-Snooping
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveFeatureTab("automation")}
                                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${activeFeatureTab === "automation" ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/25" : "bg-card hover:bg-muted text-muted-foreground border border-border"}`}
                                >
                                    Automation & Devices
                                </button>
                            </div>
                        </div>

                        {/* Feature Cards Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredFeatures.map((feat, idx) => {
                                const Icon = feat.icon
                                return (
                                    <div
                                        key={idx}
                                        className="group rounded-2xl p-6 bg-card border border-border hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none" />

                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="p-3 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 text-primary group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all shadow-xs">
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                                    {feat.tag}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-foreground text-base mb-2 group-hover:text-primary transition-colors">
                                                {feat.title}
                                            </h3>
                                            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                                {feat.description}
                                            </p>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                                            <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                                            <span>Full Pro Access Unlocked</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Pro Quick Setup Cheat Sheet */}
                    <div className="mt-16 bg-card rounded-3xl p-8 md:p-10 border border-border shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl bg-gradient-to-r from-primary/15 to-secondary/15 text-primary">
                                <Terminal className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-black text-foreground">
                                    Quick Shortcuts & Controls
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    Master your daily workflow with these built-in controls:
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            {SHORTCUTS.map((item, idx) => (
                                <div key={idx} className="p-4 rounded-2xl bg-muted/50 border border-border/80 flex flex-col justify-between">
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground mb-1">{item.label}</p>
                                        <code className="text-sm font-black font-mono text-primary bg-background px-2.5 py-1 rounded-lg border border-border inline-block mb-2">
                                            {item.shortcut}
                                        </code>
                                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Support & Community CTA */}
                    <div className="mt-16 text-center space-y-6">
                        <h2 className="text-2xl md:text-4xl font-black text-foreground">
                            Need Any Assistance or Feature Guidance?
                        </h2>
                        <p className="text-muted-foreground text-base max-w-xl mx-auto">
                            Our developer is on standby to help you get the absolute most out of Locksy Pro.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <a
                                href="mailto:vanshsethi.me@gmail.com?subject=Need%20Help%20with%20Locksy%20Pro%20License"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary text-white font-bold text-sm shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <Mail className="h-4 w-4" />
                                <span>Email Founder Support</span>
                            </a>
                            <Link
                                href="/guide"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-card border border-border hover:border-primary/40 text-foreground font-bold text-sm hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                            >
                                <span>Open Full User Guide</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-muted hover:bg-accent text-foreground font-semibold text-sm transition-colors"
                            >
                                <span>Back to Homepage</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
