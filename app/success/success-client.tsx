"use client"

import InstallButtons from "@/components/install-buttons"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { IconTile, PageHero, PageSection } from "@/components/page-shell"
import {
    CheckCircle2,
    Mail,
    Key,
    Download,
    Copy,
    Check,
    ArrowRight,
    Zap,
    Laptop,
    Lock,
    EyeOff,
    Camera,
    Calendar,
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

    const FILTER_TABS: { id: "all" | "protection" | "stealth" | "automation"; label: string }[] = [
        { id: "all", label: `All Features (${ALL_FEATURES.length})` },
        { id: "protection", label: "Tab & Domain Defense" },
        { id: "stealth", label: "Privacy & Anti-Snooping" },
        { id: "automation", label: "Automation & Devices" },
    ]


    return (
        <div className="flex min-h-screen flex-col justify-between bg-background" suppressHydrationWarning>
            <Header />

            <main className="relative flex-1 pb-8 md:pb-12">
                {/* Celebration Hero */}
                <PageHero
                    eyebrow="Payment Confirmed • Lifetime License Active"
                    title={
                        <>
                            Welcome to <span className="text-highlight">Locksy Pro!</span>
                        </>
                    }
                    description="Thank you for investing in your privacy. Your lifetime license key has been generated and dispatched to your email address."
                >
                    {/* Order Reference Pill */}
                    {checkoutId && (
                        <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 text-xs md:text-sm">
                            <span className="text-muted-foreground">Order Reference:</span>
                            <code className="rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-foreground">
                                {checkoutId}
                            </code>
                            <button
                                type="button"
                                onClick={copyCheckoutId}
                                title="Copy Order ID"
                                aria-label="Copy Order ID"
                                className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                {copiedId ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                                ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                )}
                            </button>
                        </div>
                    )}
                </PageHero>

                {/* Step-by-Step Activation Card */}
                <PageSection className="!pt-0">
                    <div className="surface p-6 sm:p-8 md:p-10">
                        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-center">
                            <div className="flex items-center gap-4">
                                <IconTile icon={Key} />
                                <div>
                                    <h2 className="text-2xl font-semibold leading-tight text-foreground md:text-3xl">
                                        How to Activate Your License
                                    </h2>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        3 simple steps to unlock your Pro features right now:
                                    </p>
                                </div>
                            </div>

                            <span className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground md:self-auto">
                                <Laptop className="h-3.5 w-3.5 text-highlight" aria-hidden="true" />
                                <span>Works across 5 devices</span>
                            </span>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {ACTIVATION_STEPS.map((step, idx) => {
                                const Icon = step.icon
                                return (
                                    <div key={idx} className="rounded-2xl border border-border bg-background p-6">
                                        <div className="mb-5 flex items-center justify-between">
                                            <span className="font-mono text-xs text-muted-foreground">
                                                Step {step.step}
                                            </span>
                                            <Icon className="h-5 w-5 text-highlight" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Browser Install Fallback */}
                        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
                            <div className="text-center sm:text-left">
                                <p className="text-sm font-medium text-foreground">
                                    Haven&apos;t installed Locksy on this browser yet?
                                </p>
                                <p className="mt-0.5 text-sm text-muted-foreground">
                                    Install in 1-click from your official extension store:
                                </p>
                            </div>

                            {/* Visitor's browser first (with glow), other stores beside it */}
                            <InstallButtons size="sm" primaryLabel="{name}" secondaryLabel="{name}" fullWidthOnMobile={false} />

                        </div>
                    </div>
                </PageSection>

                {/* All Pro Features Section */}
                <PageSection>
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="eyebrow">
                            <span className="eyebrow-dot" aria-hidden="true" />
                            Complete Feature Arsenal
                        </span>
                        <h2 className="mt-5 text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl md:text-5xl text-balance">
                            Everything Unlocked in Your <span className="text-highlight">Lifetime License</span>
                        </h2>
                        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                            You now own every single premium tab privacy and security feature across 5 devices with zero subscription renewals.
                        </p>
                    </div>

                    {/* Category Filter Tabs */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                        {FILTER_TABS.map((tab) => {
                            const active = activeFeatureTab === tab.id
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveFeatureTab(tab.id)}
                                    aria-pressed={active}
                                    className={`inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                        active
                                            ? "bg-foreground text-background"
                                            : "border border-border bg-card text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            )
                        })}
                    </div>

                    {/* Feature Cards Grid */}
                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredFeatures.map((feat, idx) => (
                            <div key={idx} className="surface flex flex-col justify-between p-6 transition-colors hover:border-foreground/15">
                                <div>
                                    <div className="mb-5 flex items-center justify-between gap-3">
                                        <IconTile icon={feat.icon} />
                                        <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground">
                                            {feat.tag}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground">{feat.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feat.description}</p>
                                </div>

                                <div className="mt-5 flex items-center gap-1.5 border-t border-border pt-4 text-xs text-foreground">
                                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-highlight" aria-hidden="true" />
                                    <span>Full Pro Access Unlocked</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </PageSection>

                {/* Pro Quick Setup Cheat Sheet */}
                <PageSection>
                    <div className="surface p-6 sm:p-8 md:p-10">
                        <div className="mb-6 flex items-center gap-4">
                            <IconTile icon={Terminal} />
                            <div>
                                <h3 className="text-xl font-semibold text-foreground md:text-2xl">
                                    Quick Shortcuts &amp; Controls
                                </h3>
                                <p className="mt-0.5 text-sm text-muted-foreground">
                                    Master your daily workflow with these built-in controls:
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {SHORTCUTS.map((item, idx) => (
                                <div key={idx} className="rounded-xl border border-border bg-background p-5">
                                    <p className="mb-2 text-xs text-muted-foreground">{item.label}</p>
                                    <code className="kbd mb-2 h-8 px-2.5 text-xs">{item.shortcut}</code>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </PageSection>

                {/* Support & Community CTA */}
                <PageSection>
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-semibold leading-[1.1] text-foreground md:text-4xl text-balance">
                            Need Any Assistance or Feature Guidance?
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                            Our developer is on standby to help you get the absolute most out of Locksy Pro.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            <a
                                href="mailto:support@locksy.dev?subject=Need%20Help%20with%20Locksy%20Pro%20License"
                                className="btn-primary"
                            >
                                <Mail className="h-4 w-4" aria-hidden="true" />
                                <span>Email Founder Support</span>
                            </a>
                            <Link href="/guide" className="btn-secondary">
                                <span>Open Full User Guide</span>
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex h-12 items-center px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <span>Back to Homepage</span>
                            </Link>
                        </div>
                    </div>
                </PageSection>
            </main>

            <Footer />
        </div>
    )
}
