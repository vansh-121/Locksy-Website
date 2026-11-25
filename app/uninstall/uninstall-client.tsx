"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
    AlertTriangle,
    ArrowLeftRight,
    ArrowRight,
    BellOff,
    BookOpen,
    CheckCircle2,
    Download,
    EyeOff,
    Fingerprint,
    Gauge,
    Github,
    Globe,
    HelpCircle,
    Lock,
    LockOpen,
    Mail,
    MessageCircle,
    RotateCcw,
    ShieldCheck,
    ShieldOff,
    Sparkles,
    Star,
    Check,
    X,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProUpgradeCard from "@/components/pro-upgrade-card"
import WhatsAppIcon from "@/components/whatsapp-icon"
import { WHATSAPP_CHANNEL_URL, openWhatsAppChannel } from "@/lib/social-links"
import { PRO_CHECKOUT_URL } from "@/lib/pro"
import SectionHeading from "@/components/section-heading"
import { PageHero, PageSection, IconTile } from "@/components/page-shell"
import { useVisitorBrowser, StoreNote } from "@/components/install-buttons"
import { orderedStores } from "@/lib/browsers"

// Store links and detection are shared with the rest of the site
// (lib/browsers.ts). Brave, Opera, Vivaldi and Arc resolve to the Chrome Web
// Store; Safari and iOS are flagged as unsupported.
// Every reason someone leaves, paired with the argument against it.
//
// This is the retention engine of the page. The visitor has *already*
// uninstalled by the time this loads, so an answer can't be an instruction —
// it has to be a rebuttal specific enough to be surprising. Vague reassurance
// ("we take privacy seriously") changes nobody's mind; naming the exact limit,
// the exact shortcut or the exact chapter does.
//
// `chapter` values are chapter ids from lib/guide-content.json.
const REASONS = [
    {
        id: "broken",
        icon: AlertTriangle,
        label: "It didn't work properly",
        headline: "Nine times out of ten, it's one permission.",
        body: "Locksy can't touch a tab the browser never granted it access to — and every browser silently withholds that on its own internal pages, its extension store, and built-in PDF viewers. Everywhere else it's a single toggle in your extension settings.",
        chapter: "troubleshooting",
        chapterTitle: "When something isn't working",
    },
    {
        id: "noisy",
        icon: BellOff,
        label: "Too many interruptions",
        headline: "Auto-lock has a dial. Yours was turned up.",
        body: "You can stretch the idle timer, limit locking to just the sites that actually matter, or switch auto-lock off completely and lock by hand with Alt+Shift+9. Most people who found it noisy never opened that panel.",
        chapter: "automatic",
        chapterTitle: "Lock tabs automatically",
    },
    {
        id: "confusing",
        icon: HelpCircle,
        label: "I couldn't figure it out",
        headline: "That's our fault, not yours.",
        body: "Locking a tab takes about thirty seconds once you've seen it done once. We wrote a full illustrated guide precisely because too many people hit this exact wall — chapter 2 is the only one you need.",
        chapter: "first-lock",
        chapterTitle: "Lock your first tab",
    },
    {
        id: "slow",
        icon: Gauge,
        label: "It slowed my browser down",
        headline: "Locksy makes zero network calls. Ever.",
        body: "Everything runs locally on your device, so there is nothing for it to wait on. If your browser genuinely felt heavier, that's a real bug and worth naming the sites — those get fixed fast.",
        chapter: "troubleshooting",
        chapterTitle: "When something isn't working",
    },
    {
        id: "privacy",
        icon: EyeOff,
        label: "I didn't trust it with my data",
        headline: "We never had your data to begin with.",
        body: "No account, no server, no analytics on your tabs. Your master password and encryption keys never leave your device — the guide's final chapter lists exactly what is stored and where, in plain English.",
        chapter: "privacy",
        chapterTitle: "How your data is handled",
    },
    {
        id: "limits",
        icon: Lock,
        label: "I hit the free limits",
        headline: "Pro lifts every one of them. $4.99, once.",
        body: "Three domain locks becomes unlimited. Five biometric unlocks a day becomes unlimited. Three intruder snapshots becomes unlimited. Plus stealth mode, custom timers and 1-click unlock all. One payment, no subscription, yours forever.",
        chapter: "free-vs-pro",
        chapterTitle: "What's free and what's Pro",
        pro: true,
    },
    {
        id: "switching",
        icon: ArrowLeftRight,
        label: "I found something better",
        headline: "Check the new one does all four of these.",
        body: "Whole-domain locking, fingerprint or face unlock, stealth-mode disguise, and a webcam snapshot of whoever tried to get in. Most tab lockers manage the first. Locksy does all four, and the majority of them free.",
        chapter: "free-vs-pro",
        chapterTitle: "What's free and what's Pro",
    },
    {
        id: "done",
        icon: CheckCircle2,
        label: "I just don't need it anymore",
        headline: "Fair enough — thanks for giving it a run.",
        body: "If you ever share a laptop, hand your screen to someone, or work somewhere public again, you know where to find us. No hard feelings either way.",
        chapter: null,
        chapterTitle: null,
    },
] as const

// The three tabs in the hero mockup — the everyday ones people actually lock.
const EXPOSED_TABS = [
    { label: "Online Banking", host: "your-bank.com" },
    { label: "Inbox — Personal", host: "mail.google.com" },
    { label: "Work Dashboard", host: "app.yourcompany.com" },
]

const PROOF = [
    {
        quote: "So now I do not have to worry about handing over my laptop :)",
        author: "Devansh Varshney",
        source: "Chrome Web Store",
    },
    {
        quote:
            "Usually the extension lets you right in on other tab lockers, but this one always asks for your pin, making it my favorite one.",
        author: "Anthony Moeller",
        source: "Chrome Web Store",
    },
    {
        quote:
            "Domain lock feature is really helpful for shared computers. Peace of mind knowing my personal tabs stay private.",
        author: "Avneet Singh",
        source: "Chrome Web Store",
    },
]

// Rows and columns lifted from components/comparison.tsx, trimmed to the six
// that matter most to someone who left for an alternative.
//
// The columns are deliberately the two *categories* people actually switch to,
// not "other tab lockers" — we can verify what a browser profile and a tab
// manager do; we can't verify a claim about every competing extension.
const COMPARE_COLUMNS = ["Locksy", "Browser profiles", "Tab managers"] as const
const COMPARE_ROWS: Array<[string, boolean, boolean, boolean]> = [
    ["Lock one tab, keep the rest usable", true, false, false],
    ["Auto-lock a whole website", true, false, false],
    ["Fingerprint / face unlock", true, false, false],
    ["Hide that a tab is locked at all", true, false, false],
    ["Webcam photo of whoever tried", true, false, false],
    ["Re-lock everything on browser startup", true, false, false],
]

// The question every departing user has and no page on the site answers.
// Every claim here traces to the "How your data is handled" chapter in
// lib/guide-content.json — no servers, no accounts, local-only storage.
const AFTERMATH = [
    {
        icon: Globe,
        tone: "ok" as const,
        title: "There is nothing of yours to delete",
        body: "Locksy has no servers, no accounts and no analytics. It made zero network requests while it was installed, so nothing about your tabs ever left the machine you're reading this on.",
    },
    {
        icon: Lock,
        tone: "ok" as const,
        title: "Your master password was never stored",
        body: "Only a PBKDF2-SHA256 hash at 600,000 rounds — roughly twice the 2023 OWASP recommendation — with a random salt unique to your install. It can't be turned back into your password by us or anyone else.",
    },
    {
        icon: AlertTriangle,
        tone: "warn" as const,
        title: "Tabs that were locked when you removed it stay closed",
        body: "A lock unloads the page rather than covering it, and the extension is what reopens it. Reinstalling protects you from here on, but it can't bring back a session that was locked at the moment you uninstalled.",
    },
]

export default function UninstallClient({
    chapterCount,
    guidePdfPath,
}: {
    chapterCount: number
    guidePdfPath: string
}) {
    const visitor = useVisitorBrowser()
    // null until detection has run, so the first render matches the server.
    const browser = visitor.detected && visitor.supported ? visitor.browser : null
    const restoreStores = orderedStores(visitor.browser)
    const [selected, setSelected] = useState<string[]>([])
    const [feedback, setFeedback] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")


    const toggle = (id: string) =>
        setSelected((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]))

    // Rebuttals for whatever is ticked, in the order the reasons are listed
    // rather than the order they were clicked, so the panel doesn't reshuffle
    // itself as more boxes go on.
    const answers = REASONS.filter((r) => selected.includes(r.id))
    const showsPro = answers.some((r) => "pro" in r && r.pro)

    const handleSubmit = async () => {
        setIsSubmitting(true)
        setError("")

        try {
            // Web3Forms is designed for client-side use, so this posts directly.
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
                    subject: "Locksy Extension Uninstall Feedback",
                    from_name: "Locksy Uninstall Page",
                    reasons: answers.map((r) => r.label).join(", ") || "None selected",
                    browser: browser?.name ?? "Unknown",
                    feedback: feedback || "No additional feedback provided",
                    timestamp: new Date().toISOString(),
                }),
            })

            const data = await response.json()
            if (data.success) setSubmitted(true)
            else setError("Failed to submit feedback. Please try again.")
        } catch (err) {
            setError("Network error. Please check your connection and try again.")
            console.error("Submission error:", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const openChat = () => {
        if (typeof window !== "undefined" && (window as any).$crisp) {
            ; (window as any).$crisp.push(["do", "chat:open"])
        }
    }

    // Reused by the hero, the rebuttal panel and the thank-you state.
    const restoreHref = browser ? browser.url : "#restore"
    const restoreProps = browser
        ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
        : ({} as const)

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* ══ 1. HERO — the loss, stated as a present-tense fact ═════════ */}
            <PageHero
                eyebrow="Locksy has been removed"
                title="Your tabs are unprotected now."
                description="Every tab you were protecting — banking, email, work — is open to anyone who picks up your device. Putting that back takes about thirty seconds."
            >
                {/* Primary CTA. Until detection resolves it points at the browser
                    picker, so it still works with JS disabled. */}
                <a
                    href={restoreHref}
                    {...restoreProps}
                    className="btn-primary btn-glow btn-lg group w-full sm:w-auto"
                >
                    {browser ? (
                        <img src={browser.icon} alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
                    ) : (
                        <RotateCcw className="h-4 w-4" />
                    )}
                    {browser ? `Restore Locksy to ${browser.name}` : "Restore Locksy"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>

                <div className="flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <Check className="h-4 w-4 flex-shrink-0 text-highlight" />
                        Free forever
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Check className="h-4 w-4 flex-shrink-0 text-highlight" />
                        No account
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Check className="h-4 w-4 flex-shrink-0 text-highlight" />
                        Nothing leaves your device
                    </span>
                </div>

                <p className="w-full text-sm text-muted-foreground">
                    {browser ? "Different browser? " : "Chrome, Edge or Firefox — "}
                    <a href="#restore" className="text-foreground underline underline-offset-4">
                        pick yours here
                    </a>
                    . Or{" "}
                    <a href="#why" className="text-foreground underline underline-offset-4">
                        tell us what went wrong
                    </a>{" "}
                    first.
                </p>
            </PageHero>

            {/* A browser mockup with the locks now open. The abstract point
                ("you are less protected") lands harder as a picture of three
                familiar tabs sitting wide open. */}
            <div className="mx-auto max-w-2xl px-4 pb-4 md:px-6" aria-hidden="true">
                <div className="surface overflow-hidden">
                    <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                        <span className="ml-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                            <ShieldOff className="h-3.5 w-3.5 text-red-500" />
                            Unprotected
                        </span>
                    </div>

                    <div className="space-y-2.5 p-4 sm:p-5">
                        {EXPOSED_TABS.map((tab) => (
                            <div
                                key={tab.host}
                                className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3"
                            >
                                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                                    <LockOpen className="h-4 w-4 text-red-500" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-foreground">{tab.label}</p>
                                    <p className="truncate font-mono text-xs text-muted-foreground">{tab.host}</p>
                                </div>
                                <span className="flex-shrink-0 rounded-full border border-red-500/25 bg-red-500/10 px-2.5 py-0.5 text-[11px] font-medium text-red-600 dark:text-red-400">
                                    Open
                                </span>
                            </div>
                        ))}

                        <div className="flex items-center gap-2 rounded-xl border border-dashed border-border px-4 py-3 text-xs text-muted-foreground">
                            <ShieldOff className="h-4 w-4 flex-shrink-0" />
                            No tab protection active on this browser
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ 2. WHY — the reason picker that answers back ══════════════ */}
            <PageSection id="why" width="narrow" className="md:pt-20">
                <SectionHeading
                    eyebrow="One question"
                    title="What made you remove it?"
                    description={
                        <>
                            Pick whatever applies. We&apos;ll tell you straight away whether it was
                            something you could have fixed — and we read every one of these.
                        </>
                    }
                />

                <div className="mt-12">
                    {!submitted ? (
                        <>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {REASONS.map((reason) => {
                                    const Icon = reason.icon
                                    const on = selected.includes(reason.id)
                                    return (
                                        <button
                                            key={reason.id}
                                            type="button"
                                            onClick={() => toggle(reason.id)}
                                            aria-pressed={on}
                                            className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${on
                                                ? "border-foreground/40 bg-muted ring-1 ring-highlight/40"
                                                : "border-border bg-card hover:border-foreground/20"
                                                }`}
                                        >
                                            <IconTile icon={Icon} />
                                            <span className="flex-1 text-sm font-medium leading-snug text-foreground sm:text-[15px]">
                                                {reason.label}
                                            </span>
                                            <span
                                                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-colors ${on ? "border-highlight/50 bg-highlight/10" : "border-border"
                                                    }`}
                                            >
                                                {on && <Check className="h-3.5 w-3.5 text-highlight" />}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>

                            {/* The rebuttals — the part that actually has to change a mind,
                                so each one leads with a claim rather than an apology. */}
                            {answers.length > 0 && (
                                <div className="mt-10 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-px flex-1 bg-border" />
                                        <span className="text-xs font-medium text-muted-foreground">
                                            {answers.length === 1 ? "Our answer" : "Our answers"}
                                        </span>
                                        <div className="h-px flex-1 bg-border" />
                                    </div>

                                    {answers.map((reason) => {
                                        const Icon = reason.icon
                                        return (
                                            <div key={reason.id} className="surface p-5 sm:p-6">
                                                <div className="flex flex-col gap-4 sm:flex-row">
                                                    <IconTile icon={Icon} />
                                                    <div className="min-w-0 flex-1 space-y-2">
                                                        <p className="text-xs font-medium text-muted-foreground">
                                                            {reason.label}
                                                        </p>
                                                        <h3 className="text-lg font-semibold leading-snug text-foreground">
                                                            {reason.headline}
                                                        </h3>
                                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                                            {reason.body}
                                                        </p>

                                                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
                                                            {reason.chapter && (
                                                                <Link
                                                                    href={`/guide#${reason.chapter}`}
                                                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-4"
                                                                >
                                                                    <BookOpen className="h-4 w-4 flex-shrink-0 text-highlight" />
                                                                    {reason.chapterTitle}
                                                                    <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
                                                                </Link>
                                                            )}
                                                            {"pro" in reason && reason.pro && (
                                                                <a
                                                                    href={PRO_CHECKOUT_URL}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-highlight underline underline-offset-4"
                                                                >
                                                                    <Sparkles className="h-4 w-4 flex-shrink-0" />
                                                                    Get Pro — $4.99 once
                                                                    <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    <div className="rounded-2xl border border-border bg-muted/50 p-5 text-center">
                                        <p className="text-sm text-muted-foreground">
                                            Changed your mind?{" "}
                                            <a
                                                href={restoreHref}
                                                {...restoreProps}
                                                className="font-medium text-foreground underline underline-offset-4"
                                            >
                                                {browser
                                                    ? `Put Locksy back on ${browser.name}`
                                                    : "Put Locksy back"}
                                            </a>{" "}
                                            — or finish telling us below, it genuinely helps.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Free text + submit */}
                            <div className="surface mt-10 space-y-4 p-5 sm:p-6">
                                <label htmlFor="feedback" className="block text-sm font-medium text-foreground">
                                    Anything else?{" "}
                                    <span className="font-normal text-muted-foreground">(optional)</span>
                                </label>
                                <textarea
                                    id="feedback"
                                    placeholder="The thing that annoyed you, the feature that was missing, the bug that made you give up…"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    rows={4}
                                    className="block w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />

                                {error && (
                                    <div className="rounded-xl border border-destructive/25 bg-destructive/10 p-4 text-sm text-destructive">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || (selected.length === 0 && !feedback.trim())}
                                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    {isSubmitting ? "Sending…" : "Send feedback"}
                                    {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                                </button>
                                <p className="text-center text-xs text-muted-foreground">
                                    Goes straight to the developer. No mailing list, no follow-up spam.
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="surface p-8 text-center md:p-12">
                            <IconTile icon={CheckCircle2} className="mx-auto" />
                            <h2 className="mt-6 text-2xl font-semibold leading-tight text-foreground md:text-3xl text-balance">
                                Got it — thank you.
                            </h2>
                            <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted-foreground">
                                That goes straight to the developer, and it genuinely shapes what gets
                                built next. The door stays open.
                            </p>

                            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <a
                                    href={restoreHref}
                                    {...restoreProps}
                                    className="btn-primary w-full sm:w-auto"
                                >
                                    <RotateCcw className="h-4 w-4" />
                                    {browser ? `Reinstall on ${browser.name}` : "Reinstall Locksy"}
                                </a>
                                <a
                                    href={WHATSAPP_CHANNEL_URL}
                                    onClick={openWhatsAppChannel}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary w-full sm:w-auto"
                                >
                                    <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                                    Get notified when it&apos;s fixed
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </PageSection>

            {/* ══ 3. COMPARE — for anyone who left for an alternative ══════ */}
            <PageSection width="narrow">
                <SectionHeading
                    eyebrow="Switching to something else?"
                    title="Check the replacement does these six"
                    description="The two things people usually move to instead are a separate browser profile or a tab manager. Neither is built to keep one tab shut while you keep working in the others."
                />

                <div className="surface mt-10 overflow-hidden">
                    {/* min-w is what makes the overflow-x-auto above actually
                        engage. With `w-full` alone the table just squashes four
                        columns into a 375px viewport instead of scrolling. */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[560px] text-left text-sm">
                            <caption className="sr-only">
                                Locksy compared with browser profiles and tab managers
                            </caption>
                            <thead>
                                <tr className="border-b border-border bg-muted/50">
                                    <th scope="col" className="px-5 py-4 font-medium text-muted-foreground">
                                        Feature
                                    </th>
                                    {COMPARE_COLUMNS.map((col, i) => (
                                        <th
                                            key={col}
                                            scope="col"
                                            className={`px-4 py-4 text-center font-medium ${i === 0 ? "text-foreground" : "text-muted-foreground"
                                                }`}
                                        >
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARE_ROWS.map(([feature, ...cells]) => (
                                    <tr
                                        key={feature}
                                        className="border-b border-border last:border-0"
                                    >
                                        <th
                                            scope="row"
                                            className="px-5 py-4 text-left font-normal text-foreground"
                                        >
                                            {feature}
                                        </th>
                                        {cells.map((has, i) => (
                                            <td key={i} className="px-4 py-4 text-center">
                                                {has ? (
                                                    <span
                                                        role="img"
                                                        aria-label="Yes"
                                                        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-highlight/10"
                                                    >
                                                        <Check className="h-4 w-4 text-highlight" aria-hidden="true" />
                                                    </span>
                                                ) : (
                                                    <span
                                                        role="img"
                                                        aria-label="No"
                                                        className="inline-flex h-7 w-7 items-center justify-center rounded-full"
                                                    >
                                                        <X className="h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
                                                    </span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <p className="mt-4 text-center text-sm text-muted-foreground">
                    Most of these are free.{" "}
                    <Link
                        href="/#comparison"
                        className="text-foreground underline underline-offset-4"
                    >
                        See the full comparison
                    </Link>
                    .
                </p>
            </PageSection>

            {/* ══ 4. PROOF — what you're walking away from ═════════════════ */}
            <PageSection>
                <div className="mx-auto max-w-2xl text-center">
                    <span className="eyebrow">
                        <span className="flex gap-0.5" aria-hidden="true">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            ))}
                        </span>
                        4.4 average (30 reviews)
                    </span>
                    <h2 className="mt-5 text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl md:text-5xl text-balance">
                        The people who stayed
                    </h2>
                </div>

                <div className="mt-12 grid gap-4 md:grid-cols-3">
                    {PROOF.map((t) => (
                        <figure key={t.author} className="surface flex flex-col p-6">
                            <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                                ))}
                            </div>
                            <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/90">
                                &ldquo;{t.quote}&rdquo;
                            </blockquote>
                            <figcaption className="mt-5 border-t border-border pt-4">
                                <p className="text-sm font-medium text-foreground">{t.author}</p>
                                <p className="text-xs text-muted-foreground">{t.source}</p>
                            </figcaption>
                        </figure>
                    ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {[
                        { value: "4.4", label: "Average rating" },
                        { value: "0", label: "Data breaches" },
                        { value: "100%", label: "Runs offline" },
                        { value: "$0", label: "Core features, forever" },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="rounded-2xl border border-border bg-card p-6 text-center"
                        >
                            <div className="text-3xl font-semibold text-foreground md:text-4xl">
                                {s.value}
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                        </div>
                    ))}
                </div>
            </PageSection>

            {/* ══ 5. PRO — the offer, for anyone who left over the limits ══ */}
            {/* `highlighted` lights the card when "I hit the free limits" is one
                of the ticked reasons — the offer is answering that person
                specifically. Same card runs on /guide and the /tools pages. */}
            <ProUpgradeCard
                eyebrow="If the free limits were the problem"
                highlighted={showsPro}
            />

            {/* ══ 6. AFTERMATH — the question nobody answers for them ═════ */}
            <PageSection>
                <SectionHeading
                    title={<>Now that it&apos;s gone, where is your data?</>}
                    description="Worth knowing whether or not you come back."
                />

                <div className="mt-12 grid gap-4 md:grid-cols-3">
                    {AFTERMATH.map((item) => {
                        const Icon = item.icon
                        const warn = item.tone === "warn"
                        return (
                            <div key={item.title} className="surface p-6">
                                {warn ? (
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/25 bg-red-500/10">
                                        <Icon className="h-5 w-5 text-red-600 dark:text-red-400" />
                                    </span>
                                ) : (
                                    <IconTile icon={Icon} />
                                )}
                                <h3 className="mt-5 text-lg font-semibold leading-snug text-foreground">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    {item.body}
                                </p>
                            </div>
                        )
                    })}
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    The full detail is in{" "}
                    <Link
                        href="/guide#privacy"
                        className="text-foreground underline underline-offset-4"
                    >
                        How your data is handled
                    </Link>{" "}
                    — or read our{" "}
                    <Link
                        href="/privacy-policy"
                        className="text-foreground underline underline-offset-4"
                    >
                        privacy policy
                    </Link>
                    .
                </p>
            </PageSection>

            {/* ══ 7. RESTORE — the closing ask ════════════════════════════ */}
            <section id="restore" className="relative scroll-mt-24 py-14 md:py-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="surface relative overflow-hidden px-6 py-16 text-center md:px-12 md:py-20">
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                            <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,black,transparent)]" />
                            <div
                                className="absolute inset-x-0 bottom-0 h-[70%]"
                                style={{ background: "radial-gradient(55% 80% at 50% 100%, var(--glow), transparent 70%)" }}
                            />
                        </div>

                        <div className="relative mx-auto max-w-2xl">
                            <IconTile icon={ShieldCheck} className="mx-auto" />

                            <h2 className="mt-6 text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl md:text-5xl text-balance">
                                Put the locks back on
                            </h2>
                            <p className="mx-auto mt-5 max-w-lg text-muted-foreground md:text-lg">
                                Thirty seconds, no account, no card. Pick your browser and your tabs are
                                protected again.
                            </p>

                            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                {restoreStores.map((b, i) => (
                                    <a
                                        key={b.id}
                                        href={b.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${i === 0 ? "btn-primary btn-glow" : "btn-secondary"} w-full sm:w-auto`}
                                    >
                                        <img src={b.icon} alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
                                        <span>{b.name}</span>
                                        {i === 0 && visitor.detected && (
                                            <span className="sr-only"> (your browser)</span>
                                        )}
                                        <Download className="h-4 w-4 opacity-60" />
                                    </a>
                                ))}
                            </div>

                            <StoreNote visitor={visitor} className="mt-6 text-center" />
                            {!visitor.note && (
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Brave, Opera, Vivaldi, Arc, Comet and Yandex install from the Chrome Web Store. Zen, LibreWolf, Floorp and Waterfox install from Firefox Add-ons.
                                </p>
                            )}

                            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:grid-cols-4">
                                {["30-second install", "No credit card", "No account required", "100% offline"].map(
                                    (b) => (
                                        <div key={b} className="flex items-center justify-center gap-2">
                                            <Check className="h-4 w-4 flex-shrink-0 text-highlight" />
                                            <span>{b}</span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 8. HELP — every way to reach a human ════════════════════ */}
            <PageSection className="pb-20 md:pb-24">
                <SectionHeading
                    title="Still stuck on something?"
                    description={
                        <>
                            If you left because of a problem, we&apos;d still like to fix it — whether
                            you come back or not.
                        </>
                    }
                />

                <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <button
                        type="button"
                        onClick={openChat}
                        className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 text-left transition-colors hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <IconTile icon={MessageCircle} />
                        <span className="min-w-0">
                            <span className="block text-sm font-medium text-foreground">Live chat</span>
                            <span className="block text-xs text-muted-foreground">
                                Usually a few hours
                            </span>
                        </span>
                    </button>

                    <a
                        href={WHATSAPP_CHANNEL_URL}
                        onClick={openWhatsAppChannel}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20"
                    >
                        <IconTile icon={WhatsAppIcon} />
                        <span className="min-w-0">
                            <span className="block text-sm font-medium text-foreground">WhatsApp channel</span>
                            <span className="block text-xs text-muted-foreground">
                                Fixes &amp; updates first
                            </span>
                        </span>
                    </a>

                    <Link
                        href="/guide"
                        className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20"
                    >
                        <IconTile icon={BookOpen} />
                        <span className="min-w-0">
                            <span className="block text-sm font-medium text-foreground">User guide</span>
                            <span className="block text-xs text-muted-foreground">
                                {chapterCount} chapters, plain English
                            </span>
                        </span>
                    </Link>

                    <a
                        href={guidePdfPath}
                        download
                        className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20"
                    >
                        <IconTile icon={Download} />
                        <span className="min-w-0">
                            <span className="block text-sm font-medium text-foreground">Guide as PDF</span>
                            <span className="block text-xs text-muted-foreground">Read it offline</span>
                        </span>
                    </a>

                    <a
                        href="https://github.com/vansh-121/locksy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20"
                    >
                        <IconTile icon={Github} />
                        <span className="min-w-0">
                            <span className="block text-sm font-medium text-foreground">Report a bug</span>
                            <span className="block text-xs text-muted-foreground">GitHub issues</span>
                        </span>
                    </a>

                    <a
                        href="mailto:support@locksy.dev"
                        className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20"
                    >
                        <IconTile icon={Mail} />
                        <span className="min-w-0">
                            <span className="block text-sm font-medium text-foreground">Email the developer</span>
                            <span className="block text-xs text-muted-foreground">
                                Straight to the inbox
                            </span>
                        </span>
                    </a>
                </div>
            </PageSection>

            <Footer />
        </div>
    )
}
