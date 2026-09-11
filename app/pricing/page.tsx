import type { Metadata } from "next"
import Link from "next/link"
import {
    ArrowRight,
    Check,
    CheckCircle2,
    CreditCard,
    ExternalLink,
    HelpCircle,
    Infinity as InfinityIcon,
    Laptop,
    Lock,
    Minus,
    RefreshCw,
    Shield,
    ShieldAlert,
    ShieldCheck,
    Sparkles,
    Zap,
} from "lucide-react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Pricing from "@/components/pricing"
import SupportChatCTA from "@/components/support-chat-cta"
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/metadata"
import { PRO_CHECKOUT_URL, PRO_PRICE } from "@/lib/pro"

export const metadata: Metadata = generatePageMetadata(
    "Pricing — Free Core & $2.99 Lifetime Pro",
    "Locksy pricing: a free tier with core tab locking, biometric unlock and offline encryption, or a one-time $2.99 lifetime Pro licence that lifts every limit across 5 devices. No subscription, no account.",
    "/pricing",
    [
        "locksy pricing",
        "locksy pro price",
        "tab locker extension price",
        "browser tab locker free vs paid",
        "one time payment tab locker",
        "lifetime licence browser extension",
        "chrome tab lock extension price",
    ]
)

/**
 * Categorized feature comparison matrix.
 * Accurately represents both free limits and Pro unlocks.
 */
const FEATURE_CATEGORIES = [
    {
        name: "Core Security & Authentication",
        description: "Zero-knowledge encryption and local biometric access",
        features: [
            {
                name: "Master Password Protection",
                desc: "PBKDF2 with 600,000 SHA-256 iterations and random salt",
                free: "Included",
                freeType: "check",
                pro: "Included",
                proType: "check",
            },
            {
                name: "Biometric Unlock (WebAuthn / FIDO2)",
                desc: "Touch ID, Windows Hello (fingerprint & face), and security keys",
                free: "5 unlocks / day",
                freeType: "limit",
                pro: "Unlimited",
                proType: "highlight",
            },
            {
                name: "100% Offline Operation",
                desc: "No telemetry, no remote servers, keys never leave your machine",
                free: "Included",
                freeType: "check",
                pro: "Included",
                proType: "check",
            },
            {
                name: "Emergency Recovery Key",
                desc: "16-character offline recovery key for password resets",
                free: "Included",
                freeType: "check",
                pro: "Included",
                proType: "check",
            },
            {
                name: "Incognito & Private Windows",
                desc: "Full tab and domain protection in private browsing",
                free: "Included",
                freeType: "check",
                pro: "Included",
                proType: "check",
            },
        ],
    },
    {
        name: "Tab & Domain Protection",
        description: "Rules for locking specific pages, full domains, and groups",
        features: [
            {
                name: "Single Tab Locking (Alt+Shift+9)",
                desc: "Lock active tabs instantly via keyboard shortcut or right-click",
                free: "Unlimited",
                freeType: "check",
                pro: "Unlimited",
                proType: "check",
            },
            {
                name: "Domain Auto-Locks",
                desc: "Automatically lock websites (e.g. your banking or email portal)",
                free: "3 domains",
                freeType: "limit",
                pro: "Unlimited domains",
                proType: "highlight",
            },
            {
                name: "Lock All Open Tabs",
                desc: "Instant panic hotkey to protect all tabs in the active window",
                free: "3 total uses",
                freeType: "limit",
                pro: "Unlimited uses",
                proType: "highlight",
            },
            {
                name: "1-Click Unlock All Tabs",
                desc: "Unlock all currently secured tabs simultaneously with one password prompt",
                free: "Not included",
                freeType: "cross",
                pro: "Included",
                proType: "check",
            },
            {
                name: "Scheduled Locking",
                desc: "Automate tab locks based on time of day, work hours, or custom schedules",
                free: "Not included",
                freeType: "cross",
                pro: "Included",
                proType: "check",
            },
            {
                name: "Startup Session Lock",
                desc: "Instantly re-locks restored tabs upon browser launch before content renders",
                free: "Not included",
                freeType: "cross",
                pro: "Included",
                proType: "check",
            },
        ],
    },
    {
        name: "Privacy & Anti-Snooping",
        description: "Shield sensitive screen contents from shoulder surfers and snoops",
        features: [
            {
                name: "Privacy Blur Shield",
                desc: "Blur tabs on window blur or password field detection",
                free: "Basic auto-masking",
                freeType: "limit",
                pro: "Full Manager & custom blur",
                proType: "highlight",
            },
            {
                name: "Webcam Intruder Captures",
                desc: "Silently take local webcam snapshots upon failed unlock attempts",
                free: "3 stored snapshots",
                freeType: "limit",
                pro: "Unlimited captures",
                proType: "highlight",
            },
            {
                name: "Stealth Mode Disguise",
                desc: "Disguise locked tabs as fake browser error (ERR_CONNECTION_FAILED) screens",
                free: "Not included",
                freeType: "cross",
                pro: "Included",
                proType: "check",
            },
            {
                name: "Custom Lock Screen Messages",
                desc: "Display custom warnings or personal notes on locked screens",
                free: "Not included",
                freeType: "cross",
                pro: "Included",
                proType: "check",
            },
            {
                name: "Weekly Privacy Reports",
                desc: "Local breakdown of security events, intruder alerts, and lock history",
                free: "Not included",
                freeType: "cross",
                pro: "Included",
                proType: "check",
            },
        ],
    },
    {
        name: "Licensing & Devices",
        description: "Coverage, activation limits, and update guarantees",
        features: [
            {
                name: "Simultaneous Device Activations",
                desc: "Active browser installations covered under one license",
                free: "1 browser/device",
                freeType: "limit",
                pro: "Up to 5 devices",
                proType: "highlight",
            },
            {
                name: "Built-in Device Manager",
                desc: "Inspect, release, and transfer device seats directly inside the extension",
                free: "Not applicable",
                freeType: "cross",
                pro: "Included",
                proType: "check",
            },
            {
                name: "Payment Model",
                desc: "Recurring subscription vs. one-off ownership",
                free: "Free Forever ($0)",
                freeType: "badge",
                pro: "$2.99 Lifetime (Pay once)",
                proType: "highlight",
            },
            {
                name: "Future Updates & Support",
                desc: "Continuous browser compatibility, security patches, and new features",
                free: "Included",
                freeType: "check",
                pro: "All Pro updates included",
                proType: "check",
            },
        ],
    },
]

/**
 * Pricing questions matching the FAQ Schema exactly.
 */
const PRICING_FAQ = [
    {
        question: "How many devices does one Locksy Pro license cover?",
        answer:
            "Each Locksy Pro license covers up to 5 active browser or computer installations simultaneously. You can use it across your personal laptop, desktop, and work machine. An inline Device Manager inside the extension allows you to view active installations and release slots whenever you switch computers.",
    },
    {
        question: "Is Locksy Pro really a one-time payment or a subscription?",
        answer:
            "Locksy Pro is strictly a single, one-time payment of $2.99 for a lifetime license. There are zero recurring fees, no annual renewals, and no surprise charges. Once purchased, your license key is yours forever.",
    },
    {
        question: "Can I try Locksy before upgrading to Pro?",
        answer:
            "Yes. Locksy has a permanent free tier that includes core password tab locking, biometric unlock, and offline encryption. You can use it without any time limit or credit card to verify that it fits your workflow before choosing to purchase Pro.",
    },
    {
        question: "Do I need to create an account or sign up to use Locksy?",
        answer:
            "No. Locksy requires no account creation, no email sign-up, and no centralized database. All cryptographic keys and hashed master passwords remain 100% locally on your machine using PBKDF2-SHA256 at 600,000 iterations.",
    },
    {
        question: "How is my payment processed and when do I get my license key?",
        answer:
            "Checkout is securely processed by Polar.sh, supporting Apple Pay, Google Pay, Visa, Mastercard, and American Express. Your Pro license key is delivered instantly on the confirmation screen and sent to your email immediately.",
    },
    {
        question: "Does the free tier expire after a trial period?",
        answer:
            "No. The free tier never expires. It is not a time-limited trial — it provides permanent password protection, biometric unlock, and offline encryption with generous caps (3 domains, 5 biometrics/day, 3 intruder captures). Pro is an optional upgrade whenever you need unlimited caps.",
    },
    {
        question: "What happens if I switch to a new laptop or reinstall my browser?",
        answer:
            "You can easily activate your license on your new device using your original license key. If you reach the 5-device limit, the extension's Device Manager lets you release your old device with a single click to free up a slot.",
    },
]

/** Identical on both tiers — foundational guarantees. */
const SHARED_GUARANTEES = [
    {
        icon: Lock,
        title: "Same Heavyweight Cryptography",
        body: "PBKDF2 with 600,000 rounds of SHA-256 and cryptographic salts on both tiers. Upgrading does not buy better encryption — security is never compromised on free.",
    },
    {
        icon: Shield,
        title: "Zero Accounts & Zero Telemetry",
        body: "Neither tier ever asks you to create an account or sign in. Locksy has no servers tracking your open tabs, domains, or passwords.",
    },
    {
        icon: ShieldCheck,
        title: "100% Offline-First Architecture",
        body: "Locks, password hashes, and intruder snapshots are processed and stored exclusively inside your browser's sandboxed local storage.",
    },
    {
        icon: CheckCircle2,
        title: "Full Incognito & Private Mode",
        body: "Protection runs seamlessly across private browsing and incognito sessions on both tiers with full hotkey and biometric support.",
    },
]

export default function PricingPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Pricing", url: "/pricing" },
    ])
    const faqSchema = generateFAQSchema(PRICING_FAQ)

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <Header />

            <main className="min-h-screen bg-background pt-24 md:pt-28">
                {/* ── Page Hero ─────────────────────────────────────────────── */}
                <div className="relative overflow-hidden pb-4 pt-6 md:pb-8 md:pt-10">
                    {/* Background glow effects */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute -top-24 left-1/2 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/15 via-fuchsia-500/10 to-cyan-500/15 blur-[140px]" />
                    </div>

                    <div className="relative mx-auto max-w-5xl px-4 md:px-6">
                        {/* Breadcrumbs */}
                        <nav aria-label="Breadcrumb" className="mb-8 text-xs sm:text-sm text-muted-foreground">
                            <Link href="/" className="transition-colors hover:text-primary">
                                Home
                            </Link>
                            <span className="mx-2 text-muted-foreground/50" aria-hidden="true">
                                /
                            </span>
                            <span className="text-foreground font-medium">Pricing</span>
                        </nav>

                        <div className="text-center">
                            {/* Eyebrow Badge */}
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-gradient-to-r from-violet-600/10 via-fuchsia-600/10 to-cyan-600/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 shadow-sm backdrop-blur-md">
                                <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                                <span>Zero Subscription Fatigue • Lifetime License</span>
                            </div>

                            {/* Main Title */}
                            <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
                                Simple, Honest Pricing. <br />
                                <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                                    Pay Once, Own Forever.
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                Get zero-knowledge tab protection with offline biometric unlock free forever.
                                Upgrade to Pro for just <strong className="text-foreground">{PRO_PRICE} once</strong> to lift every cap across up to 5 devices.
                                No subscriptions, no accounts, and zero tracking.
                            </p>

                            {/* Key Highlights Bar */}
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-semibold text-muted-foreground sm:text-sm">
                                <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-3.5 py-1.5 backdrop-blur-md">
                                    <CreditCard className="h-4 w-4 text-violet-500" />
                                    {PRO_PRICE} One-Time Payment
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-3.5 py-1.5 backdrop-blur-md">
                                    <Laptop className="h-4 w-4 text-violet-500" />
                                    Up to 5 Devices Included
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-3.5 py-1.5 backdrop-blur-md">
                                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                    100% Offline & Private
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Pricing Cards (Shared Component, Header Suppressed) ───── */}
                <div className="relative">
                    <Pricing hideHeader className="py-8 md:py-12 relative overflow-hidden" />
                </div>

                {/* ── Trust & Guarantees Strip ──────────────────────────────── */}
                <section className="mx-auto max-w-5xl px-4 py-8 md:px-6">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-xl transition-colors hover:border-violet-500/30">
                            <div className="mb-3 inline-flex rounded-xl bg-violet-500/10 p-2.5 text-violet-600 dark:text-violet-400">
                                <InfinityIcon className="h-5 w-5" />
                            </div>
                            <h3 className="text-sm font-bold text-foreground">Lifetime Ownership</h3>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                No monthly fees or renewal traps. Pay once and keep your license forever.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-xl transition-colors hover:border-emerald-500/30">
                            <div className="mb-3 inline-flex rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:text-emerald-400">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <h3 className="text-sm font-bold text-foreground">Zero-Risk Free Tier</h3>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                Test tab locking, biometric unlock, and offline encryption with no time limit or card required.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-xl transition-colors hover:border-cyan-500/30">
                            <div className="mb-3 inline-flex rounded-xl bg-cyan-500/10 p-2.5 text-cyan-600 dark:text-cyan-400">
                                <Laptop className="h-5 w-5" />
                            </div>
                            <h3 className="text-sm font-bold text-foreground">5 Device Manager</h3>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                Easily transfer or revoke seats directly in the extension when upgrading machines.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-xl transition-colors hover:border-fuchsia-500/30">
                            <div className="mb-3 inline-flex rounded-xl bg-fuchsia-500/10 p-2.5 text-fuchsia-600 dark:text-fuchsia-400">
                                <Zap className="h-5 w-5" />
                            </div>
                            <h3 className="text-sm font-bold text-foreground">Instant Polar Checkout</h3>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                Fast, encrypted payment via Apple Pay, Google Pay, or Card. Instant license key.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Feature Comparison Matrix ─────────────────────────────── */}
                <section className="mx-auto max-w-5xl px-4 py-16 md:px-6">
                    <div className="mb-12 text-center">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3.5 py-1 text-xs font-bold text-muted-foreground">
                            Side-by-Side Comparison
                        </div>
                        <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
                            Compare Free Core vs. Locksy Pro
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                            Free is not a crippled demo — it uses identical cryptography and provides permanent tab locking.
                            Here is the exact breakdown of features and caps.
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-border/70 bg-card/40 shadow-2xl backdrop-blur-2xl">
                        {/* Table Header */}
                        <div className="sticky top-20 z-20 grid grid-cols-12 border-b border-border/70 bg-card/95 px-6 py-5 backdrop-blur-xl">
                            <div className="col-span-6 md:col-span-6">
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    Features & Capabilities
                                </span>
                            </div>
                            <div className="col-span-3 md:col-span-3 text-center md:text-left">
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    Free Core
                                </span>
                            </div>
                            <div className="col-span-3 md:col-span-3 text-center md:text-left">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                                    <Sparkles className="h-3 w-3" /> Locksy Pro
                                </span>
                            </div>
                        </div>

                        {/* Table Body Groups */}
                        <div className="divide-y divide-border/50">
                            {FEATURE_CATEGORIES.map((category) => (
                                <div key={category.name} className="py-2">
                                    {/* Category Subheader */}
                                    <div className="bg-muted/40 px-6 py-3">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                                            {category.name}
                                        </h3>
                                        <p className="text-[11px] text-muted-foreground">{category.description}</p>
                                    </div>

                                    {/* Category Rows */}
                                    <div className="divide-y divide-border/30">
                                        {category.features.map((feature) => (
                                            <div
                                                key={feature.name}
                                                className="grid grid-cols-12 items-center px-6 py-4 transition-colors hover:bg-accent/40"
                                            >
                                                {/* Feature Name & Description */}
                                                <div className="col-span-6 md:col-span-6 pr-4">
                                                    <div className="text-sm font-semibold text-foreground">
                                                        {feature.name}
                                                    </div>
                                                    <div className="mt-0.5 text-xs text-muted-foreground leading-normal">
                                                        {feature.desc}
                                                    </div>
                                                </div>

                                                {/* Free Column */}
                                                <div className="col-span-3 md:col-span-3 flex items-center justify-center md:justify-start">
                                                    {feature.freeType === "check" && (
                                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
                                                            <Check className="h-4 w-4 text-emerald-500" />
                                                            <span className="hidden sm:inline">{feature.free}</span>
                                                        </span>
                                                    )}
                                                    {feature.freeType === "limit" && (
                                                        <span className="inline-flex items-center rounded-lg bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                                                            {feature.free}
                                                        </span>
                                                    )}
                                                    {feature.freeType === "cross" && (
                                                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/60">
                                                            <Minus className="h-4 w-4" />
                                                            <span className="hidden sm:inline">Not included</span>
                                                        </span>
                                                    )}
                                                    {feature.freeType === "badge" && (
                                                        <span className="text-xs font-semibold text-foreground">
                                                            {feature.free}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Pro Column */}
                                                <div className="col-span-3 md:col-span-3 flex items-center justify-center md:justify-start">
                                                    {feature.proType === "check" && (
                                                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400">
                                                            <Check className="h-4 w-4 text-violet-500" />
                                                            <span className="hidden sm:inline">{feature.pro}</span>
                                                        </span>
                                                    )}
                                                    {feature.proType === "highlight" && (
                                                        <span className="inline-flex items-center gap-1 rounded-lg border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-xs font-bold text-violet-600 dark:text-violet-400 shadow-sm">
                                                            <Sparkles className="h-3 w-3 text-violet-500" />
                                                            {feature.pro}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── What Both Tiers Share (Security Model) ────────────────── */}
                <section className="mx-auto max-w-5xl px-4 py-12 md:px-6">
                    <div className="rounded-3xl border border-border/70 bg-gradient-to-b from-card/80 to-card/40 p-8 md:p-12 backdrop-blur-xl">
                        <div className="max-w-2xl">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Foundational Security Model
                            </div>
                            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                                Cryptography is Never Compromised for Free Users
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                Paying for Pro unlocks productivity tools and lifts device/domain caps.
                                It does not buy "better" encryption. Both tiers run on the identical zero-knowledge architecture.
                            </p>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {SHARED_GUARANTEES.map(({ icon: Icon, title, body }) => (
                                <div
                                    key={title}
                                    className="rounded-2xl border border-border/50 bg-background/50 p-5 backdrop-blur-md transition-colors hover:border-primary/30"
                                >
                                    <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2 text-primary">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-sm font-bold text-foreground">{title}</h3>
                                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                        {body}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-xs text-muted-foreground">
                                Want to inspect our cryptographic implementation details?
                            </p>
                            <Link
                                href="/security"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                            >
                                Read our full Security Architecture <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ── Interactive FAQ Section ──────────────────────────────── */}
                <section className="mx-auto max-w-4xl px-4 py-16 md:px-6">
                    <div className="mb-12 text-center">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3.5 py-1 text-xs font-bold text-muted-foreground">
                            <HelpCircle className="h-3.5 w-3.5" />
                            Frequently Asked Questions
                        </div>
                        <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                            Frequently Asked Pricing Questions
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                            Everything you need to know about the lifetime license, devices, and guarantees.
                        </p>
                    </div>

                    <div className="space-y-3.5">
                        {PRICING_FAQ.map(({ question, answer }, idx) => (
                            <details
                                key={question}
                                open={idx === 0}
                                className="group rounded-2xl border border-border/60 bg-card/50 p-5 shadow-sm backdrop-blur-xl transition-all open:border-violet-500/40 open:bg-card/80"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-foreground sm:text-base">
                                    <span>{question}</span>
                                    <span className="ml-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-muted transition-transform duration-300 group-open:rotate-180">
                                        <ArrowRight className="h-3.5 w-3.5 rotate-90 text-muted-foreground" />
                                    </span>
                                </summary>
                                <div className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm pt-2 border-t border-border/30">
                                    {answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>

                {/* ── Final Conversion CTA ─────────────────────────────────── */}
                <section className="mx-auto max-w-5xl px-4 pb-24 md:px-6">
                    <div className="relative overflow-hidden rounded-[2.5rem] border border-violet-500/30 bg-gradient-to-br from-violet-600/10 via-fuchsia-600/10 to-cyan-600/10 p-8 text-center md:p-14 shadow-2xl backdrop-blur-2xl">
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-bold text-violet-600 dark:text-violet-400">
                                <Sparkles className="h-4 w-4" /> Lifetime Upgrade Deal
                            </div>
                            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
                                Ready to Lock Down Your Browser?
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                Protect your banking tabs, confidential client documents, and personal chats in under 30 seconds.
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href={PRO_CHECKOUT_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-bold text-white shadow-xl shadow-violet-500/25 transition-all hover:scale-105 hover:shadow-violet-500/40"
                                >
                                    Get Locksy Pro — {PRO_PRICE} Lifetime
                                    <Zap className="h-4 w-4" />
                                </a>
                                <Link
                                    href="/#download"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-border/80 bg-card/80 px-8 py-4 font-semibold text-foreground transition-all hover:bg-accent hover:border-primary/40"
                                >
                                    Install Free Extension
                                </Link>
                            </div>

                            <p className="mt-6 text-xs text-muted-foreground">
                                One-time payment • Up to 5 devices included • 100% offline encryption
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <SupportChatCTA />
            <Footer />
        </>
    )
}
