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
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProUpgradeCard from "@/components/pro-upgrade-card"
import WhatsAppIcon from "@/components/whatsapp-icon"
import { WHATSAPP_CHANNEL_URL } from "@/lib/social-links"
import { PRO_CHECKOUT_URL } from "@/lib/pro"

const BROWSERS = [
    {
        key: "chrome",
        name: "Chrome",
        icon: "/browsers/chrome.png",
        url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim",
    },
    {
        key: "edge",
        name: "Edge",
        icon: "/browsers/edge.png",
        url: "https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn",
    },
    {
        key: "firefox",
        name: "Firefox",
        icon: "/browsers/firefox.png",
        url: "https://addons.mozilla.org/en-US/firefox/addon/locksy/",
    },
] as const

type Browser = (typeof BROWSERS)[number]

// Which store to send this visitor to, so the hero can offer one button instead
// of three. Chromium forks (Brave, Opera, Vivaldi) all install from the Chrome
// Web Store, so falling through to "chrome" still sends them to the right place.
// Anything unrecognised returns null and the hero degrades to the browser picker
// further down the page — which is also what a visitor without JS gets.
function detectBrowser(): Browser | null {
    if (typeof navigator === "undefined") return null
    const ua = navigator.userAgent
    const key = /Edg\//.test(ua)
        ? "edge"
        : /Firefox\//.test(ua)
            ? "firefox"
            : /Chrome\//.test(ua)
                ? "chrome"
                : null
    return BROWSERS.find((b) => b.key === key) ?? null
}

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
        headline: "Pro lifts every one of them. $2.99, once.",
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
    const [browser, setBrowser] = useState<Browser | null>(null)
    const [selected, setSelected] = useState<string[]>([])
    const [feedback, setFeedback] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    // Detection has to happen after mount: reading navigator during render would
    // make the server and client markup disagree.
    useEffect(() => {
        setBrowser(detectBrowser())
    }, [])

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
            <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-accent via-background to-accent pt-28 pb-16 md:pt-36 md:pb-20">
                {/* Same wash as the marketing hero (components/hero.tsx) so the page
                    still reads as Locksy. The alarm is carried in red by the badge,
                    the headline and the unlocked-tabs mockup — the colour this site
                    already uses for "unprotected" in comparison.tsx and
                    see-it-in-action.tsx. */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20" />
                    <div className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl dark:bg-secondary/20" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                </div>

                <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
                    {/* Left: the pitch */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-600 backdrop-blur-sm dark:text-red-400">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                            </span>
                            Locksy has been removed
                        </div>

                        <div className="space-y-5">
                            <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                                Your tabs are{" "}
                                <span className="bg-gradient-to-r from-rose-500 to-red-600 bg-clip-text text-transparent">
                                    unprotected
                                </span>{" "}
                                now.
                            </h1>
                            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                                Every tab you were protecting — banking, email, work — is open to
                                anyone who picks up your device. Putting that back takes about thirty
                                seconds.
                            </p>
                        </div>

                        {/* Primary CTA. Until detection resolves it points at the browser
                            picker, so it still works with JS disabled. */}
                        <div className="space-y-4">
                            <a
                                href={restoreHref}
                                {...restoreProps}
                                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary px-5 py-4 text-base font-black text-white shadow-xl shadow-primary/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/40 sm:w-auto sm:gap-3 sm:px-8 sm:py-5 sm:text-lg"
                            >
                                {browser ? (
                                    <img src={browser.icon} alt="" aria-hidden="true" className="h-6 w-6" />
                                ) : (
                                    <RotateCcw className="h-5 w-5" />
                                )}
                                {browser ? `Restore Locksy to ${browser.name}` : "Restore Locksy"}
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </a>

                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-500" />
                                    Free forever
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-500" />
                                    No account
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-500" />
                                    Nothing leaves your device
                                </span>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                {browser ? "Different browser? " : "Chrome, Edge or Firefox — "}
                                <a href="#restore" className="font-semibold text-primary hover:underline">
                                    pick yours here
                                </a>
                                . Or{" "}
                                <a href="#why" className="font-semibold text-primary hover:underline">
                                    tell us what went wrong
                                </a>{" "}
                                first.
                            </p>
                        </div>
                    </div>

                    {/* Right: a browser mockup with the locks now open. The abstract
                        point ("you are less protected") lands harder as a picture of
                        three familiar tabs sitting wide open. */}
                    <div className="relative" aria-hidden="true">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-500/20 to-red-500/20 blur-2xl" />
                        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                            <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-3">
                                <span className="h-3 w-3 rounded-full bg-red-400" />
                                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                                <span className="h-3 w-3 rounded-full bg-green-400" />
                                <span className="ml-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                    <ShieldOff className="h-3.5 w-3.5 text-red-500" />
                                    Unprotected
                                </span>
                            </div>

                            <div className="space-y-3 p-4 sm:p-5">
                                {EXPOSED_TABS.map((tab) => (
                                    <div
                                        key={tab.host}
                                        className="flex items-center gap-3 rounded-xl border border-red-500/25 bg-red-500/5 px-4 py-3.5"
                                    >
                                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/15">
                                            <LockOpen className="h-4 w-4 text-red-500" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold">{tab.label}</p>
                                            <p className="truncate text-xs text-muted-foreground">{tab.host}</p>
                                        </div>
                                        <span className="flex-shrink-0 rounded-full bg-red-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
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
                </div>
            </section>

            {/* ══ 2. WHY — the reason picker that answers back ══════════════ */}
            <section id="why" className="relative scroll-mt-24 py-16 md:py-20">
                <div className="mx-auto max-w-5xl px-4 md:px-6">
                    <div className="mb-12 text-center">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary backdrop-blur-sm">
                            <MessageCircle className="h-4 w-4" />
                            One question
                        </div>
                        <h2 className="mb-4 text-3xl font-black tracking-tight md:text-5xl">
                            What made you remove it?
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            Pick whatever applies. We&apos;ll tell you straight away whether it was
                            something you could have fixed — and we read every one of these.
                        </p>
                    </div>

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
                                            className={`group flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-300 ${on
                                                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                                                    : "border-border bg-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                                                }`}
                                        >
                                            <span
                                                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-colors ${on
                                                        ? "bg-gradient-to-br from-primary to-secondary text-white"
                                                        : "bg-muted text-muted-foreground group-hover:text-primary"
                                                    }`}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </span>
                                            <span className="flex-1 text-sm font-semibold leading-snug sm:text-base">
                                                {reason.label}
                                            </span>
                                            <span
                                                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${on ? "border-primary bg-primary" : "border-border"
                                                    }`}
                                            >
                                                {on && <CheckCircle2 className="h-4 w-4 text-white" />}
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
                                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                            {answers.length === 1 ? "Our answer" : "Our answers"}
                                        </span>
                                        <div className="h-px flex-1 bg-border" />
                                    </div>

                                    {answers.map((reason) => {
                                        const Icon = reason.icon
                                        return (
                                            <div
                                                key={reason.id}
                                                className="overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card to-accent/40 shadow-sm"
                                            >
                                                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:p-6">
                                                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-md">
                                                        <Icon className="h-5 w-5 text-white" />
                                                    </div>
                                                    <div className="min-w-0 flex-1 space-y-2">
                                                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                            {reason.label}
                                                        </p>
                                                        <h3 className="text-lg font-bold leading-snug md:text-xl">
                                                            {reason.headline}
                                                        </h3>
                                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                                            {reason.body}
                                                        </p>

                                                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
                                                            {reason.chapter && (
                                                                <Link
                                                                    href={`/guide#${reason.chapter}`}
                                                                    className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                                                                >
                                                                    <BookOpen className="h-4 w-4 flex-shrink-0" />
                                                                    {reason.chapterTitle}
                                                                    <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
                                                                </Link>
                                                            )}
                                                            {"pro" in reason && reason.pro && (
                                                                <a
                                                                    href={PRO_CHECKOUT_URL}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-600 hover:underline dark:text-violet-400"
                                                                >
                                                                    <Sparkles className="h-4 w-4 flex-shrink-0" />
                                                                    Get Pro — $2.99 once
                                                                    <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    <div className="rounded-2xl border border-border bg-muted/40 p-5 text-center">
                                        <p className="text-sm text-muted-foreground">
                                            Changed your mind?{" "}
                                            <a
                                                href={restoreHref}
                                                {...restoreProps}
                                                className="font-bold text-primary hover:underline"
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
                            <div className="mt-10 space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-6">
                                <label htmlFor="feedback" className="block text-sm font-bold">
                                    Anything else?{" "}
                                    <span className="font-normal text-muted-foreground">(optional)</span>
                                </label>
                                <Textarea
                                    id="feedback"
                                    placeholder="The thing that annoyed you, the feature that was missing, the bug that made you give up…"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    rows={4}
                                    className="resize-none border-2 focus:border-primary"
                                />

                                {error && (
                                    <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || (selected.length === 0 && !feedback.trim())}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-4 font-bold text-background transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
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
                        <div className="rounded-3xl border-2 border-green-500/30 bg-green-500/5 p-8 text-center md:p-12">
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                                <CheckCircle2 className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="mb-3 text-3xl font-black">Got it — thank you.</h2>
                            <p className="mx-auto mb-8 max-w-md text-lg text-muted-foreground">
                                That goes straight to the developer, and it genuinely shapes what gets
                                built next. The door stays open.
                            </p>

                            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <a
                                    href={restoreHref}
                                    {...restoreProps}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
                                >
                                    <RotateCcw className="h-4 w-4" />
                                    {browser ? `Reinstall on ${browser.name}` : "Reinstall Locksy"}
                                </a>
                                <a
                                    href={WHATSAPP_CHANNEL_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5b] hover:shadow-xl sm:w-auto"
                                >
                                    <WhatsAppIcon className="h-4 w-4" />
                                    Get notified when it&apos;s fixed
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ══ 3. COMPARE — for anyone who left for an alternative ══════ */}
            <section className="px-4 py-16 md:px-6 md:py-20">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-8 text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:text-primary-on-dark">
                            <ArrowLeftRight className="h-4 w-4" />
                            Switching to something else?
                        </div>
                        <h2 className="mb-3 text-2xl font-black tracking-tight md:text-3xl">
                            Check the replacement does these six
                        </h2>
                        <p className="mx-auto max-w-xl text-muted-foreground">
                            The two things people usually move to instead are a separate browser
                            profile or a tab manager. Neither is built to keep one tab shut while
                            you keep working in the others.
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
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
                                        <th scope="col" className="px-5 py-4 font-bold">
                                            Feature
                                        </th>
                                        {COMPARE_COLUMNS.map((col, i) => (
                                            <th
                                                key={col}
                                                scope="col"
                                                className={`px-4 py-4 text-center font-bold ${i === 0
                                                    ? "text-primary dark:text-primary-on-dark"
                                                    : "font-semibold text-muted-foreground"
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
                                            className="border-b border-border/60 last:border-0 hover:bg-muted/30"
                                        >
                                            <th
                                                scope="row"
                                                className="px-5 py-4 text-left font-medium"
                                            >
                                                {feature}
                                            </th>
                                            {cells.map((has, i) => (
                                                <td key={i} className="px-4 py-4 text-center">
                                                    {has ? (
                                                        <span
                                                            role="img"
                                                            aria-label="Yes"
                                                            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-500/15 font-bold text-green-600 dark:text-green-400"
                                                        >
                                                            ✓
                                                        </span>
                                                    ) : (
                                                        <span
                                                            role="img"
                                                            aria-label="No"
                                                            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-500/15 font-bold text-red-600 dark:text-red-400"
                                                        >
                                                            ×
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
                            className="font-semibold text-primary hover:underline"
                        >
                            See the full comparison
                        </Link>
                        .
                    </p>
                </div>
            </section>

            {/* ══ 4. PROOF — what you're walking away from ═════════════════ */}
            <section className="border-y border-border/60 bg-muted/40 py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="mb-12 text-center">
                        <div className="mb-5 inline-flex items-center gap-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="ml-2 text-sm font-bold text-yellow-700 dark:text-yellow-300">
                                5.0 average
                            </span>
                        </div>
                        <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                            The people who stayed
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {PROOF.map((t) => (
                            <figure
                                key={t.author}
                                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                            >
                                <div className="mb-4 flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>
                                <figcaption className="mt-5 border-t border-border pt-4">
                                    <p className="text-sm font-bold">{t.author}</p>
                                    <p className="text-xs text-muted-foreground">{t.source}</p>
                                </figcaption>
                            </figure>
                        ))}
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
                        {[
                            { value: "5.0", label: "Average rating" },
                            { value: "0", label: "Data breaches" },
                            { value: "100%", label: "Runs offline" },
                            { value: "$0", label: "Core features, forever" },
                        ].map((s) => (
                            <div
                                key={s.label}
                                className="rounded-2xl border border-border bg-card p-6 text-center"
                            >
                                <div className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-black text-transparent md:text-4xl">
                                    {s.value}
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 5. PRO — the offer, for anyone who left over the limits ══ */}
            {/* `highlighted` lights the card when "I hit the free limits" is one
                of the ticked reasons — the offer is answering that person
                specifically. Same card runs on /guide and the /tools pages. */}
            <ProUpgradeCard
                eyebrow="If the free limits were the problem"
                highlighted={showsPro}
            />

            {/* ══ 6. AFTERMATH — the question nobody answers for them ═════ */}
            <section className="border-y border-border/60 bg-muted/40 px-4 py-16 md:px-6 md:py-20">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-10 text-center">
                        <h2 className="mb-3 text-2xl font-black tracking-tight md:text-3xl">
                            Now that it&apos;s gone, where is your data?
                        </h2>
                        <p className="mx-auto max-w-xl text-muted-foreground">
                            Worth knowing whether or not you come back.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {AFTERMATH.map((item) => {
                            const Icon = item.icon
                            const warn = item.tone === "warn"
                            return (
                                <div
                                    key={item.title}
                                    className={`rounded-2xl border p-6 ${warn
                                        ? "border-red-500/25 bg-red-500/5"
                                        : "border-border bg-card"
                                        }`}
                                >
                                    <span
                                        className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${warn
                                            ? "bg-red-500/15 text-red-600 dark:text-red-400"
                                            : "bg-green-500/15 text-green-600 dark:text-green-400"
                                            }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mb-2 text-base font-bold leading-snug">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
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
                            className="font-semibold text-primary hover:underline"
                        >
                            How your data is handled
                        </Link>{" "}
                        — or read our{" "}
                        <Link
                            href="/privacy-policy"
                            className="font-semibold text-primary hover:underline"
                        >
                            privacy policy
                        </Link>
                        .
                    </p>
                </div>
            </section>

            {/* ══ 7. RESTORE — the closing ask ════════════════════════════ */}
            <section id="restore" className="scroll-mt-24 px-4 pb-16 md:px-6 md:pb-20">
                <div className="relative mx-auto max-w-5xl">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary opacity-20 blur-2xl" />

                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-[oklch(0.50_0.23_282)] to-secondary p-8 text-center text-white shadow-2xl shadow-primary/20 md:p-10">
                        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                            <ShieldCheck className="h-6 w-6" />
                        </div>

                        <h2 className="mb-4 text-2xl font-black tracking-tight md:text-3xl">
                            Put the locks back on
                        </h2>
                        <p className="mx-auto mb-8 max-w-xl opacity-95">
                            Thirty seconds, no account, no card. Pick your browser and your tabs are
                            protected again.
                        </p>

                        <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-3">
                            {BROWSERS.map((b) => (
                                <a
                                    key={b.key}
                                    href={b.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group/btn flex items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 font-bold text-primary-on-light shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${browser?.key === b.key ? "ring-4 ring-white/60" : ""
                                        }`}
                                >
                                    <img src={b.icon} alt="" aria-hidden="true" className="h-6 w-6" />
                                    <span>{b.name}</span>
                                    <Download className="h-4 w-4 opacity-60 group-hover/btn:animate-bounce" />
                                </a>
                            ))}
                        </div>

                        <p className="mt-5 text-sm opacity-80">
                            Brave, Opera and Vivaldi install from the Chrome Web Store.
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/20 pt-6 text-sm md:grid-cols-4">
                            {["30-second install", "No credit card", "No account required", "100% offline"].map(
                                (b) => (
                                    <div key={b} className="flex items-center justify-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                                        <span>{b}</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 8. HELP — every way to reach a human ════════════════════ */}
            <section className="border-t border-border/60 bg-muted/40 py-16 md:py-20">
                <div className="mx-auto max-w-5xl px-4 md:px-6">
                    <div className="mb-10 text-center">
                        <h2 className="mb-3 text-2xl font-black tracking-tight md:text-3xl">
                            Still stuck on something?
                        </h2>
                        <p className="text-muted-foreground">
                            If you left because of a problem, we&apos;d still like to fix it — whether
                            you come back or not.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <button
                            type="button"
                            onClick={openChat}
                            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                        >
                            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
                                <MessageCircle className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-sm font-bold">Live chat</span>
                                <span className="block text-xs text-muted-foreground">
                                    Usually a few hours
                                </span>
                            </span>
                        </button>

                        <a
                            href={WHATSAPP_CHANNEL_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366]/50 hover:shadow-md"
                        >
                            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white">
                                <WhatsAppIcon className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-sm font-bold">WhatsApp channel</span>
                                <span className="block text-xs text-muted-foreground">
                                    Fixes &amp; updates first
                                </span>
                            </span>
                        </a>

                        <Link
                            href="/guide"
                            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                        >
                            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                                <BookOpen className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-sm font-bold">User guide</span>
                                <span className="block text-xs text-muted-foreground">
                                    {chapterCount} chapters, plain English
                                </span>
                            </span>
                        </Link>

                        <a
                            href={guidePdfPath}
                            download
                            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                        >
                            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 text-white">
                                <Download className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-sm font-bold">Guide as PDF</span>
                                <span className="block text-xs text-muted-foreground">Read it offline</span>
                            </span>
                        </a>

                        <a
                            href="https://github.com/vansh-121/locksy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                        >
                            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 text-white">
                                <Github className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-sm font-bold">Report a bug</span>
                                <span className="block text-xs text-muted-foreground">GitHub issues</span>
                            </span>
                        </a>

                        <a
                            href="mailto:vansh.sethi98760@gmail.com"
                            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                        >
                            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white">
                                <Mail className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-sm font-bold">Email the developer</span>
                                <span className="block text-xs text-muted-foreground">
                                    Straight to the inbox
                                </span>
                            </span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
