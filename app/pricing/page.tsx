import { SmartInstallButton } from "@/components/install-buttons"
import type { Metadata } from "next"
import Link from "next/link"
import {
    ArrowRight,
    Check,
    CheckCircle2,
    CreditCard,
    Infinity as InfinityIcon,
    Laptop,
    Lock,
    Minus,
    Plus,
    Shield,
    ShieldCheck,
    Zap,
} from "lucide-react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Pricing from "@/components/pricing"
import SupportChatCTA from "@/components/support-chat-cta"
import SectionHeading from "@/components/section-heading"
import { IconTile, PageHero, PageSection } from "@/components/page-shell"
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/metadata"
import { PRO_CHECKOUT_URL, PRO_PRICE } from "@/lib/pro"

export const metadata: Metadata = generatePageMetadata(
    "Pricing — Free Core & $4.99 Lifetime Pro",
    "Locksy pricing: a free tier with core tab locking, biometric unlock and offline encryption, or a one-time $4.99 lifetime Pro licence that lifts every limit across 5 devices. No subscription, no account.",
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
                pro: "$4.99 Lifetime (Pay once)",
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
            "Locksy Pro is strictly a single, one-time payment of $4.99 for a lifetime license. There are zero recurring fees, no annual renewals, and no surprise charges. Once purchased, your license key is yours forever.",
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

function FreeCell({ type, value }: { type: string; value: string }) {
    if (type === "check") {
        return (
            <span className="inline-flex items-center gap-2 text-xs text-foreground sm:text-sm">
                <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-muted" aria-hidden="true">
                    <Check className="h-3 w-3 text-foreground" />
                </span>
                <span>{value}</span>
            </span>
        )
    }
    if (type === "limit") {
        return (
            <span className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                {value}
            </span>
        )
    }
    if (type === "cross") {
        return (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/70 sm:text-sm">
                <Minus className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>Not included</span>
            </span>
        )
    }
    return <span className="text-xs font-medium text-foreground sm:text-sm">{value}</span>
}

function ProCell({ type, value }: { type: string; value: string }) {
    if (type === "highlight") {
        return (
            <span className="inline-flex items-center rounded-full border border-highlight/25 bg-highlight/10 px-2.5 py-1 text-xs font-medium text-highlight">
                {value}
            </span>
        )
    }
    return (
        <span className="inline-flex items-center gap-2 text-xs font-medium text-foreground sm:text-sm">
            <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-highlight/15" aria-hidden="true">
                <Check className="h-3 w-3 text-highlight" />
            </span>
            <span>{value}</span>
        </span>
    )
}

const TRUST_STRIP = [
    {
        icon: InfinityIcon,
        title: "Lifetime Ownership",
        body: "No monthly fees or renewal traps. Pay once and keep your license forever.",
    },
    {
        icon: ShieldCheck,
        title: "Zero-Risk Free Tier",
        body: "Test tab locking, biometric unlock, and offline encryption with no time limit or card required.",
    },
    {
        icon: Laptop,
        title: "5 Device Manager",
        body: "Easily transfer or revoke seats directly in the extension when upgrading machines.",
    },
    {
        icon: Zap,
        title: "Instant Polar Checkout",
        body: "Fast, encrypted payment via Apple Pay, Google Pay, or Card. Instant license key.",
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
            <main className="min-h-screen bg-background">
                {/* ── Page Hero ─────────────────────────────────────────────── */}
                <PageHero
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
                    eyebrow="Zero Subscription Fatigue • Lifetime License"
                    title={
                        <>
                            Simple, Honest Pricing. <br />
                            <span className="text-highlight">Pay Once, Own Forever.</span>
                        </>
                    }
                    description={
                        <>
                            Get zero-knowledge tab protection with offline biometric unlock free forever.
                            Upgrade to Pro for just <strong className="font-medium text-foreground">{PRO_PRICE} once</strong> to lift every cap across up to 5 devices.
                            No subscriptions, no accounts, and zero tracking.
                        </>
                    }
                    meta={
                        <>
                            <span className="inline-flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-highlight" aria-hidden="true" />
                                {PRO_PRICE} One-Time Payment
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Laptop className="h-4 w-4 text-highlight" aria-hidden="true" />
                                Up to 5 Devices Included
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-highlight" aria-hidden="true" />
                                100% Offline &amp; Private
                            </span>
                        </>
                    }
                />

                {/* ── Pricing Cards (Shared Component, Header Suppressed) ───── */}
                <Pricing hideHeader className="relative scroll-mt-24 pb-12 md:pb-16" />

                {/* ── Trust & Guarantees Strip ──────────────────────────────── */}
                <PageSection className="!pt-0">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {TRUST_STRIP.map(({ icon, title, body }) => (
                            <div key={title} className="surface p-6">
                                <IconTile icon={icon} />
                                <h3 className="mt-5 text-[15px] font-semibold text-foreground">{title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                            </div>
                        ))}
                    </div>
                </PageSection>

                {/* ── Feature Comparison Matrix ─────────────────────────────── */}
                <PageSection id="compare">
                    <SectionHeading
                        eyebrow="Side-by-Side Comparison"
                        title="Compare Free Core vs. Locksy Pro"
                        description="Free is not a crippled demo — it uses identical cryptography and provides permanent tab locking. Here is the exact breakdown of features and caps."
                    />

                    <div className="surface mt-12 overflow-hidden md:mt-14">
                        {/* Mobile Swipe Indicator */}
                        <div className="flex items-center justify-between border-b border-border px-5 py-2.5 text-xs text-muted-foreground md:hidden">
                            <span>Feature Breakdown</span>
                            <span className="text-foreground">Swipe to compare &rarr;</span>
                        </div>

                        {/* Scrollable Container on Mobile */}
                        <div className="overflow-x-auto">
                            <div className="min-w-[620px] md:min-w-0">
                                {/* Table Header */}
                                <div className="grid grid-cols-12 border-b border-border px-6 py-4 text-sm">
                                    <div className="col-span-6 text-muted-foreground">Features &amp; Capabilities</div>
                                    <div className="col-span-3 text-center text-muted-foreground md:text-left">Free Core</div>
                                    <div className="col-span-3 text-center font-medium text-foreground md:text-left">Locksy Pro</div>
                                </div>

                                {/* Table Body Groups */}
                                <div>
                                    {FEATURE_CATEGORIES.map((category) => (
                                        <div key={category.name}>
                                            {/* Category Subheader */}
                                            <div className="border-b border-border bg-muted/40 px-6 py-3">
                                                <h3 className="text-sm font-medium text-foreground">{category.name}</h3>
                                                <p className="mt-0.5 text-xs text-muted-foreground">{category.description}</p>
                                            </div>

                                            {/* Category Rows */}
                                            {category.features.map((feature) => (
                                                <div
                                                    key={feature.name}
                                                    className="grid grid-cols-12 items-center border-b border-border px-6 py-4"
                                                >
                                                    {/* Feature Name & Description */}
                                                    <div className="col-span-6 pr-4">
                                                        <div className="text-sm font-medium text-foreground">{feature.name}</div>
                                                        <div className="mt-0.5 text-xs leading-normal text-muted-foreground">{feature.desc}</div>
                                                    </div>

                                                    {/* Free Column */}
                                                    <div className="col-span-3 flex items-center justify-center md:justify-start">
                                                        <FreeCell type={feature.freeType} value={feature.free} />
                                                    </div>

                                                    {/* Pro Column */}
                                                    <div className="col-span-3 flex items-center justify-center md:justify-start">
                                                        <ProCell type={feature.proType} value={feature.pro} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </PageSection>

                {/* ── What Both Tiers Share (Security Model) ────────────────── */}
                <PageSection>
                    <div className="surface p-6 sm:p-8 md:p-12">
                        <div className="max-w-2xl">
                            <span className="eyebrow">
                                <ShieldCheck className="h-3.5 w-3.5 text-highlight" aria-hidden="true" />
                                Foundational Security Model
                            </span>
                            <h2 className="mt-5 text-3xl font-semibold leading-[1.1] text-foreground md:text-4xl text-balance">
                                Cryptography is Never Compromised for Free Users
                            </h2>
                            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                                Paying for Pro unlocks productivity tools and lifts device/domain caps.
                                It does not buy &quot;better&quot; encryption. Both tiers run on the identical zero-knowledge architecture.
                            </p>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {SHARED_GUARANTEES.map(({ icon, title, body }) => (
                                <div key={title} className="rounded-2xl border border-border bg-background p-5 sm:p-6">
                                    <IconTile icon={icon} />
                                    <h3 className="mt-4 text-[15px] font-semibold text-foreground">{title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
                            <p className="text-center text-sm text-muted-foreground sm:text-left">
                                Want to inspect our cryptographic implementation details?
                            </p>
                            <Link
                                href="/security"
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                            >
                                Read our full Security Architecture <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </PageSection>

                {/* ── FAQ Section ──────────────────────────────────────────── */}
                <PageSection id="pricing-faq">
                    <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
                        <div className="lg:sticky lg:top-28 lg:self-start">
                            <SectionHeading
                                align="left"
                                eyebrow="Frequently Asked Questions"
                                title="Frequently Asked Pricing Questions"
                                description="Everything you need to know about the lifetime license, devices, and guarantees."
                            />
                        </div>

                        <div className="divide-y divide-border border-y border-border">
                            {PRICING_FAQ.map(({ question, answer }, idx) => (
                                <details key={question} open={idx === 0} className="group">
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                                        <span className="text-base font-medium text-foreground md:text-[17px]">{question}</span>
                                        <span
                                            aria-hidden="true"
                                            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform duration-200 group-open:rotate-45"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                        </span>
                                    </summary>
                                    <div className="pb-6 pr-12 text-[15px] leading-relaxed text-muted-foreground">{answer}</div>
                                </details>
                            ))}
                        </div>
                    </div>
                </PageSection>

                {/* ── Final Conversion CTA ─────────────────────────────────── */}
                <PageSection>
                    <div className="surface relative overflow-hidden px-6 py-14 text-center sm:px-10 md:py-20">
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                            <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,black,transparent)]" />
                            <div
                                className="absolute bottom-0 left-1/2 h-[320px] w-[720px] -translate-x-1/2 translate-y-1/3"
                                style={{ background: "radial-gradient(50% 50% at 50% 50%, var(--glow), transparent 70%)" }}
                            />
                        </div>
                        <div className="relative mx-auto max-w-2xl">
                            <span className="eyebrow">
                                <span className="eyebrow-dot" aria-hidden="true" />
                                Lifetime Upgrade Deal
                            </span>
                            <h2 className="mt-5 text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl md:text-5xl text-balance">
                                Ready to Lock Down Your Browser?
                            </h2>
                            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                                Protect your banking tabs, confidential client documents, and personal chats in under 30 seconds.
                            </p>

                            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <a
                                    href={PRO_CHECKOUT_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full sm:w-auto"
                                >
                                    Get Locksy Pro — {PRO_PRICE} Lifetime
                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                </a>
                                <SmartInstallButton label="Add to {name}, free" variant="secondary" arrow={false} className="w-full sm:w-auto" />
                            </div>

                            <p className="mt-6 text-xs text-muted-foreground">
                                One-time payment • Up to 5 devices included • 100% offline encryption
                            </p>
                        </div>
                    </div>
                </PageSection>
            </main>

            <SupportChatCTA />
            <Footer />
        </>
    )
}
