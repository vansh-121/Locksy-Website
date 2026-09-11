import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, CreditCard, Infinity as InfinityIcon, ShieldCheck, Sparkles } from "lucide-react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Pricing from "@/components/pricing"
import SupportChatCTA from "@/components/support-chat-cta"
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/metadata"
import { PRO_PRICE } from "@/lib/pro"

export const metadata: Metadata = generatePageMetadata(
    // Brand omitted — generatePageMetadata feeds this into `title`, which the root
    // layout templates to "%s | Locksy".
    "Pricing — Free Core & $2.99 Lifetime Pro",
    "Locksy pricing: a free tier with core tab locking, biometric unlock and offline encryption, or a one-time $2.99 lifetime Pro licence that lifts every limit. No subscription, no account.",
    "/pricing",
    [
        "locksy pricing",
        "locksy pro price",
        "tab locker extension price",
        "browser tab locker free vs paid",
        "one time payment tab locker",
        "lifetime licence browser extension",
    ]
)

/**
 * Exactly where the free tier stops, stated as numbers rather than adjectives.
 *
 * Every figure traces to the `freeLimits`/`proFeatures` lists in
 * components/pricing.tsx, which are authoritative — if a cap moves there, it
 * moves here too. The same pairs also drive components/pro-upgrade-card.tsx, so
 * a change to any cap touches three files.
 */
const LIMITS = [
    { what: "Domain auto-locks", free: "3 domains", pro: "Unlimited" },
    { what: "Biometric unlocks", free: "5 per day", pro: "Unlimited" },
    { what: "Webcam intruder captures", free: "3 stored", pro: "Unlimited" },
    { what: "Lock All Tabs", free: "3 uses total", pro: "Unlimited, plus 1-click unlock all" },
    { what: "Auto re-lock timer", free: "Fixed at 10 minutes", pro: "Configurable up to 8 hours" },
    { what: "Privacy blur", free: "Basic auto-masking", pro: "Full manager, categories & whitelists" },
    { what: "Stealth mode, startup session lock, weekly reports", free: "Not included", pro: "Included" },
]

/**
 * Pricing-specific questions only, and the single source for both the visible
 * FAQ below and the FAQPage schema — so the two can't drift apart.
 *
 * The homepage already publishes the full 36-item set from lib/faq-data.ts.
 * Repeating those items here would put identical Q&A on two URLs, so these are
 * written fresh and answer things people ask on a pricing page and nowhere else.
 *
 * Nothing here states a refund position. The repo documents no refund policy —
 * the only related signal is `MerchantReturnNotPermitted` on the Offer schema,
 * which is not the same thing as a published customer-facing promise — and
 * inventing one would be exactly the sort of unverifiable claim that got the
 * site flagged before. Left out on purpose; worth writing once you decide it.
 */
const PRICING_FAQ = [
    {
        question: "Is Locksy free?",
        answer:
            "Yes. The free tier covers core password-locking for any tab, biometric unlock via WebAuthn, right-click context menus for instant locking, local intruder log viewing and fully offline encryption. It has caps rather than a countdown: 3 domain auto-locks, 5 biometric unlocks per day, 3 stored intruder captures and 3 total uses of Lock All Tabs.",
    },
    {
        question: "Is Locksy Pro a subscription?",
        answer:
            "No. Locksy Pro is a single payment of $2.99 for a lifetime licence. There is no recurring charge, no renewal, and no trial that converts into one.",
    },
    {
        question: "What does paying for Pro actually change?",
        answer:
            "It lifts the free tier's caps and adds features the free tier does not have. Domain auto-locks, biometric unlocks and webcam intruder captures become unlimited; the auto re-lock timer becomes configurable up to 8 hours; and stealth-mode disguise, startup session lock, custom lock-screen messages, the full privacy blur manager and weekly privacy reports are unlocked.",
    },
    {
        question: "Do I need an account to use Locksy?",
        answer:
            "No. Locksy needs no account and no sign-up on either tier. Your master password is never stored — only a PBKDF2-SHA256 hash at 600,000 iterations, with a random salt unique to your install, and it stays on your device.",
    },
    {
        question: "How is the payment processed?",
        answer:
            "Checkout is handled by Polar.sh, an external payment provider. The extension itself runs entirely offline and never sees or stores your payment details.",
    },
    {
        question: "Does the free tier expire?",
        answer:
            "No. The free tier is not a time-limited trial — it keeps working within its stated caps for as long as you use it. Pro is an optional one-time upgrade, not a deadline.",
    },
]

/** Identical on both tiers — the things paying does not change. */
const SHARED = [
    {
        title: "The same encryption",
        body: "PBKDF2 with 600,000 rounds of SHA-256 on both tiers. Paying does not buy better cryptography; there is only one implementation.",
    },
    {
        title: "No account, ever",
        body: "Neither tier asks you to sign up, because there is no server to hold an account on.",
    },
    {
        title: "Fully offline",
        body: "Locks, password hashes and intruder captures are computed and stored on your device. Nothing is transmitted.",
    },
    {
        title: "Incognito support",
        body: "Protection works in private browsing windows on the free tier, not just the paid one.",
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

            <main className="min-h-screen bg-background pt-28">
                {/* ── Page header ─────────────────────────────────────────────── */}
                <div className="relative overflow-hidden border-b border-border/50">
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
                        <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-secondary/10 blur-[120px]" />
                    </div>

                    <div className="relative mx-auto max-w-4xl px-4 pb-14 md:px-6">
                        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
                            <Link href="/" className="hover:text-primary">
                                Home
                            </Link>
                            <span className="mx-2" aria-hidden="true">
                                /
                            </span>
                            <span className="text-foreground">Pricing</span>
                        </nav>

                        <div className="text-center">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                                <Sparkles className="h-4 w-4" />
                                One price, paid once
                            </div>

                            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
                                Locksy{" "}
                                <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                                    Pricing
                                </span>
                            </h1>

                            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                                Core tab locking is free — with caps, not a countdown. Pro is a
                                single {PRO_PRICE} payment that lifts every one of them and stays
                                yours. No subscription, no account, no trial clock.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-muted-foreground">
                                <span className="inline-flex items-center gap-2">
                                    <CreditCard className="h-4 w-4 flex-shrink-0 text-violet-500" />
                                    One-time payment
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <InfinityIcon className="h-4 w-4 flex-shrink-0 text-violet-500" />
                                    Lifetime licence
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                                    Works fully offline
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The same component the homepage renders at /#pricing — shared
                    rather than forked so the two URLs can never quote different
                    prices. A price that disagrees with itself across two pages is
                    worse than having only one page. */}
                <Pricing />

                <div className="mx-auto max-w-4xl px-4 pb-24 md:px-6">
                    {/* ── Where free stops ─────────────────────────────────────── */}
                    <section className="mb-16">
                        <h2 className="mb-5 text-2xl font-black tracking-tight sm:text-3xl">
                            Where the free tier stops
                        </h2>
                        <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                            Free is not a crippled demo — it locks tabs with the same encryption Pro
                            does. What it has instead are caps. Here are the exact numbers, so you
                            can tell before installing whether you would ever reach them:
                        </p>

                        <div className="overflow-x-auto rounded-2xl border border-border/60">
                            <table className="w-full text-left text-sm">
                                <caption className="sr-only">
                                    Locksy free tier limits compared with Locksy Pro
                                </caption>
                                <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 font-bold">
                                            Feature
                                        </th>
                                        <th scope="col" className="px-4 py-3 font-bold">
                                            Free Core
                                        </th>
                                        <th scope="col" className="px-4 py-3 font-bold">
                                            Locksy Pro
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {LIMITS.map(({ what, free, pro }) => (
                                        <tr key={what} className="border-t border-border/50">
                                            <th
                                                scope="row"
                                                className="px-4 py-3 text-left font-bold text-foreground"
                                            >
                                                {what}
                                            </th>
                                            <td className="px-4 py-3 text-muted-foreground">{free}</td>
                                            <td className="px-4 py-3 font-semibold text-violet-600 dark:text-violet-400">
                                                {pro}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                            The things that matter most are identical on both tiers: the encryption
                            is the same, nothing is transmitted, no account exists, and{" "}
                            <Link href="/security" className="text-primary hover:underline">
                                the security model
                            </Link>{" "}
                            does not change when you pay.
                        </p>
                    </section>

                    {/* ── What both tiers share ────────────────────────────────── */}
                    <section className="mb-16">
                        <h2 className="mb-5 text-2xl font-black tracking-tight sm:text-3xl">
                            What you get on either tier
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {SHARED.map(({ title, body }) => (
                                <div
                                    key={title}
                                    className="rounded-2xl border border-border/50 bg-card/60 p-5 backdrop-blur-xl"
                                >
                                    <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground sm:text-base">
                                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                                        {title}
                                    </h3>
                                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                        {body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── FAQ ──────────────────────────────────────────────────── */}
                    <section className="mb-16">
                        <h2 className="mb-5 text-2xl font-black tracking-tight sm:text-3xl">
                            Pricing questions
                        </h2>
                        <div className="space-y-3">
                            {PRICING_FAQ.map(({ question, answer }) => (
                                <div
                                    key={question}
                                    className="rounded-2xl border border-border/50 bg-card/60 p-5 backdrop-blur-xl"
                                >
                                    <h3 className="mb-2 text-sm font-bold text-foreground sm:text-base">
                                        {question}
                                    </h3>
                                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                        {answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── Where to go next ─────────────────────────────────────── */}
                    <section>
                        <h2 className="mb-5 text-2xl font-black tracking-tight sm:text-3xl">
                            Still deciding?
                        </h2>
                        <div className="space-y-3">
                            {[
                                {
                                    href: "/guide",
                                    title: "Read the user guide first",
                                    blurb: "Every feature walked through, including which tier each one needs.",
                                },
                                {
                                    href: "/blog/how-to-password-protect-browser-tabs",
                                    title: "How to password protect browser tabs",
                                    blurb: "The method itself, across Chrome, Edge and Firefox — nothing to buy to follow along.",
                                },
                                {
                                    href: "/tools",
                                    title: "Try the free tools",
                                    blurb: "Password strength checker, generator, breach checker and privacy audit — no install, no payment.",
                                },
                            ].map(({ href, title, blurb }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="group flex items-center justify-between gap-4 rounded-2xl border border-border/50 bg-card/60 p-5 backdrop-blur-xl transition-colors hover:border-primary/40"
                                >
                                    <span>
                                        <span className="block text-sm font-bold text-foreground sm:text-base">
                                            {title}
                                        </span>
                                        <span className="text-xs text-muted-foreground sm:text-sm">
                                            {blurb}
                                        </span>
                                    </span>
                                    <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            {/* Deliberately no ProUpgradeCard or CTASection here: <Pricing /> above
                already carries both the free-download and Upgrade-to-Pro buttons,
                and stacking three more full-width CTAs under them is the pattern
                that makes /guide end in a wall. */}
            <SupportChatCTA />
            <Footer />
        </>
    )
}
