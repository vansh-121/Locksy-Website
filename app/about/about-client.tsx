"use client"

import Link from "next/link"
import {
    Shield, Lock, ArrowLeft, Github, Heart, Users, Code2,
    Globe, Sparkles, Target, Zap, Eye, Star, CheckCircle
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const MILESTONES = [
    { year: "Oct 2025", title: "Locksy Born", desc: "First release on Chrome Web Store with basic tab locking." },
    { year: "Nov 2025", title: "Multi-Browser", desc: "Expanded to Edge, Firefox, Brave, Opera, and Vivaldi." },
    { year: "Dec 2025", title: "v2.0 — Automation", desc: "Auto-lock timers and scheduled locking introduced." },
    { year: "Jan 2026", title: "v2.3 — Biometrics", desc: "WebAuthn/FIDO2 biometric unlock for fingerprint & face ID." },
    { year: "Feb 2026", title: "1,000 Users ⭐", desc: "Community milestone: 1,000 active users across all browsers." },
    { year: "Apr 2026", title: "v2.5 — Stealth Mode", desc: "Context menus, stealth mode, and persistent theme toggle." },
    { year: "May 2026", title: "v3.0 — Intruder Detection", desc: "Weekly privacy reports, startup session lock, and local-only webcam capture on failed unlocks." },
    { year: "Jun 2026", title: "v3.1 — Privacy Blur Shield", desc: "Automatic focus-loss blur, password and card field masking, and per-site blur rules." },
    { year: "Aug 2026", title: "v3.3 — Recovery & Sessions", desc: "Master Recovery Key for offline account reset, plus bounded sessions with re-auth on sensitive actions." },
]

const VALUES = [
    {
        icon: Lock,
        title: "Privacy First",
        desc: "Every line of code is written with a privacy-first mindset. We never collect, transmit, or store your personal data.",
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: Code2,
        title: "100% Local",
        desc: "Complete privacy. All encryption keys, databases, and logs stay strictly inside your browser sandbox.",
        color: "from-purple-500 to-indigo-500",
    },
    {
        icon: Heart,
        title: "Free Core Tier",
        desc: "Start for free without ads. Enjoy basic tab protection, and optionally upgrade to Pro for advanced features.",
        color: "from-rose-500 to-pink-500",
    },
    {
        icon: Zap,
        title: "Zero Compromise",
        desc: "Military-grade PBKDF2 encryption with 600k iterations. We don't cut corners on security.",
        color: "from-amber-500 to-orange-500",
    },
]

// The guide count is passed in from the server page rather than hardcoded, so it can't
// drift out of date — an inflated article count is trivially falsifiable.
const buildStats = (guideCount: number) => [
    { number: "5,000+", label: "Active Users" },
    { number: `${guideCount}`, label: "In-Depth Guides" },
    { number: "8+", label: "Security Layers" },
    { number: "7+", label: "Browsers Supported" },
]

export default function AboutClient({ guideCount }: { guideCount: number }) {
    const STATS = buildStats(guideCount)

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-background via-accent/30 to-background relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />

                <Header />

                <main className="relative">
                    {/* Hero */}
                    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
                        <div className="max-w-7xl mx-auto px-4 md:px-6">
                            <div className="text-center space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm">
                                    <Sparkles className="h-4 w-4" />
                                    Our Story
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black leading-tight">
                                    About{" "}
                                    <span className="bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary bg-clip-text text-transparent">
                                        Locksy
                                    </span>
                                </h1>
                                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                                    A powerful browser extension built to give you complete control over your tab privacy.
                                    No compromises, no tracking, and 100% offline.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Stats Bar */}
                    <section className="py-12 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-y border-border/50">
                        <div className="max-w-6xl mx-auto px-4 md:px-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {STATS.map((stat, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                            {stat.number}
                                        </div>
                                        <div className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Mission */}
                    <section className="py-20 md:py-28">
                        <div className="max-w-6xl mx-auto px-4 md:px-6">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                                    <Target className="h-4 w-4" />
                                    Our Mission
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-6">
                                    Why Locksy{" "}
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        Exists
                                    </span>
                                </h2>
                            </div>
                            <div className="max-w-4xl mx-auto">
                                <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border space-y-6">
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        Locksy was born out of a simple yet urgent need: <strong className="text-foreground">protecting sensitive browser tabs on shared computers</strong>.
                                        Whether you're a student in a library, an employee in an open office, or a parent sharing a family computer —
                                        there's always a risk of someone seeing tabs you'd rather keep private.
                                    </p>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        Existing solutions were either too complex, charged money for basic features, or collected user data.
                                        Locksy set out to be different: <strong className="text-foreground">100% free, completely offline, and privacy-first from day one</strong>.
                                    </p>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        Today, Locksy protects thousands of users across Chrome, Edge, Firefox, Brave, Opera, Vivaldi, and more —
                                        all while keeping your data entirely on your device.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Threat model */}
                    <section className="pb-20 md:pb-28">
                        <div className="max-w-4xl mx-auto px-4 md:px-6">
                            <h2 className="text-3xl md:text-4xl font-black mb-6">
                                The specific problem we set out to solve
                            </h2>
                            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    Browser security is overwhelmingly designed around remote attackers — phishing pages,
                                    malicious scripts, network eavesdroppers. Enormous engineering effort goes into
                                    stopping someone on the other side of the world from reading your session. Almost
                                    none goes into the far more mundane scenario that actually happens: you are already
                                    logged in, your screen is unlocked, and someone else is standing in front of it.
                                </p>
                                <p>
                                    That is the gap Locksy fills, and it is worth being precise about it. Once you have
                                    authenticated, your bank dashboard, your work email, your medical portal and your
                                    private messages are all sitting in tabs that require no further proof of identity.
                                    Every protection you configured has already been satisfied. A colleague borrowing
                                    your laptop for &ldquo;one quick thing,&rdquo; a family member on the shared desktop,
                                    a classmate on the next library machine — none of them need to defeat any encryption
                                    to read everything on your screen. They just need to switch tabs.
                                </p>
                                <p>
                                    The operating system&apos;s screen lock is the usual answer, and it is a good one when
                                    you remember to use it. But it is all-or-nothing and it is disruptive: locking your
                                    whole machine to hide one tab means abandoning everything else you were doing.
                                    In practice people simply do not do it for a two-minute absence, which is exactly
                                    the window in which this kind of exposure occurs. Locksy makes the protection
                                    granular enough that using it is not a decision you have to weigh each time — one
                                    tab, one domain, or every tab at once, locked in a keystroke and restored the same way.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Values */}
                    <section className="py-20 md:py-28 bg-gradient-to-b from-accent/30 to-background">
                        <div className="max-w-6xl mx-auto px-4 md:px-6">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                                    <Star className="h-4 w-4" />
                                    Core Values
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-4">
                                    What We{" "}
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        Stand For
                                    </span>
                                </h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                {VALUES.map((value, idx) => {
                                    const Icon = value.icon
                                    return (
                                        <div
                                            key={idx}
                                            className="group relative bg-card rounded-3xl p-8 shadow-lg border border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-3xl`} />
                                            <div className="relative">
                                                <div className={`inline-flex w-14 h-14 items-center justify-center bg-gradient-to-br ${value.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-6`}>
                                                    <Icon className="h-7 w-7 text-white" />
                                                </div>
                                                <h3 className="font-bold text-2xl mb-3">{value.title}</h3>
                                                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Developer */}
                    <section className="py-20 md:py-28">
                        <div className="max-w-6xl mx-auto px-4 md:px-6">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                                    <Users className="h-4 w-4" />
                                    The Developer
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-4">
                                    Meet the{" "}
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        Creator
                                    </span>
                                </h2>
                            </div>
                            <div className="max-w-4xl mx-auto">
                                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 rounded-3xl p-8 md:p-12">
                                    <div className="flex flex-col md:flex-row items-center gap-8">
                                        <div className="relative flex-shrink-0">
                                            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl">
                                                <span className="text-6xl font-black text-white">V</span>
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 border-4 border-background">
                                                <CheckCircle className="h-4 w-4 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1 text-center md:text-left space-y-4">
                                            <div>
                                                <h3 className="text-3xl font-black">Vansh Sethi</h3>
                                                <p className="text-primary font-semibold">Creator & Lead Developer</p>
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed">
                                                A passionate developer focused on building tools that respect user privacy.
                                                Vansh created Locksy with the belief that security should be accessible to everyone —
                                                free, transparent, and without compromise.
                                            </p>
                                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                                                <a
                                                    href="https://github.com/vansh-121"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors font-semibold text-sm"
                                                >
                                                    <Github className="h-4 w-4" />
                                                    GitHub
                                                </a>
                                                <a
                                                    href="https://www.linkedin.com/in/vansh-sethi-vs"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-sm"
                                                >
                                                    <Globe className="h-4 w-4" />
                                                    LinkedIn
                                                </a>
                                                <a
                                                    href="https://github.com/sponsors/vansh-121"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-xl transition-all font-semibold text-sm"
                                                >
                                                    <Heart className="h-4 w-4" />
                                                    Sponsor
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Timeline */}
                    <section className="py-20 md:py-28 bg-gradient-to-b from-accent/30 to-background">
                        <div className="max-w-4xl mx-auto px-4 md:px-6">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                                    <Sparkles className="h-4 w-4" />
                                    Journey
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-4">
                                    Our{" "}
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        Journey
                                    </span>
                                </h2>
                            </div>
                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/30" />
                                <div className="space-y-12">
                                    {MILESTONES.map((milestone, idx) => (
                                        <div
                                            key={idx}
                                            className={`relative flex flex-col md:flex-row items-start gap-6 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                                }`}
                                        >
                                            {/* Dot */}
                                            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-full border-4 border-background shadow-lg z-10" />
                                            {/* Content */}
                                            <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${idx % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"}`}>
                                                <div className="bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl hover:border-primary/20 transition-all">
                                                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                                        {milestone.year}
                                                    </span>
                                                    <h3 className="font-bold text-lg mt-3">{milestone.title}</h3>
                                                    <p className="text-sm text-muted-foreground mt-1">{milestone.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How it's built */}
                    <section className="py-20 md:py-28">
                        <div className="max-w-4xl mx-auto px-4 md:px-6">
                            <h2 className="text-3xl md:text-4xl font-black mb-6">
                                How it is built, and what &ldquo;offline&rdquo; actually means
                            </h2>
                            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    &ldquo;Privacy-first&rdquo; is a claim every extension makes, so here is the
                                    architecture rather than the adjective. Your master password is never stored. It is
                                    stretched with PBKDF2-HMAC-SHA256 at 600,000 iterations, and only the derived
                                    verifier is kept — inside your browser&apos;s own storage, on your own device. There
                                    is no account to create, no server to sign in to, and no endpoint that receives your
                                    password, because no such endpoint exists.
                                </p>
                                <p>
                                    The iteration count is the part worth understanding. Each attempt at guessing your
                                    password costs an attacker 600,000 hash operations rather than one, which is what
                                    turns a feasible offline attack into an infeasible one. It is also why unlocking
                                    takes a perceptible fraction of a second — that delay is the protection working, not
                                    a performance defect. Biometric unlock goes through WebAuthn, so a fingerprint or
                                    face scan is verified by your operating system&apos;s secure hardware and never
                                    travels through the extension at all.
                                </p>
                                <p>
                                    Because everything is local, there are consequences we would rather state up front
                                    than have you discover later. Nothing syncs between devices; each browser you
                                    install Locksy in keeps its own independent configuration. And since we hold no copy
                                    of your credentials, we cannot reset your password for you — which is precisely why
                                    version 3.3 introduced the Master Recovery Key, a 16-character code you export once
                                    and store somewhere safe. It is the only recovery path, and that is a deliberate
                                    trade: an account-recovery service would require us to hold something we have
                                    chosen not to hold.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Funding + limits */}
                    <section className="pb-20 md:pb-28">
                        <div className="max-w-4xl mx-auto px-4 md:px-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
                                    <h2 className="text-2xl font-black mb-4">How the project pays for itself</h2>
                                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                                        <p>
                                            A free security extension raises a fair question: what is the business model,
                                            and does it involve you? The answer is a Pro tier. Core tab locking, auto-lock
                                            timers, biometric unlock and stealth mode are free and stay free. Optional
                                            paid features — weekly privacy reports, intruder capture, custom blur rules,
                                            startup session lock — fund the work.
                                        </p>
                                        <p>
                                            What we do not do: sell data, embed third-party trackers in the extension, or
                                            show ads inside it. There is no analytics pipeline collecting your browsing
                                            history, for the straightforward reason that the extension has nowhere to send
                                            it. Sponsorship through GitHub covers part of the cost too, and it is
                                            genuinely optional.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
                                    <h2 className="text-2xl font-black mb-4">What Locksy deliberately does not do</h2>
                                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                                        <p>
                                            It is not a password manager, and it is not trying to become one. It does not
                                            store or fill your credentials — use a dedicated manager for that. It is not
                                            a VPN, an antivirus, or a tracker blocker, and it will not defend against
                                            malware that has already compromised your operating system.
                                        </p>
                                        <p>
                                            It defends one thing well: an authenticated browser session against someone
                                            with physical access to an unlocked machine. Security tools that claim to
                                            solve everything usually solve nothing thoroughly, so we would rather name
                                            the boundary than blur it. Our{' '}
                                            <Link href="/security" className="text-primary hover:underline font-semibold">
                                                security architecture page
                                            </Link>{' '}
                                            documents the cryptography in more detail, including the parts we consider
                                            open trade-offs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Editorial */}
                    <section className="pb-20 md:pb-28">
                        <div className="max-w-4xl mx-auto px-4 md:px-6">
                            <h2 className="text-3xl md:text-4xl font-black mb-6">About the guides on this site</h2>
                            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    Alongside the extension we publish {guideCount} long-form guides on browser
                                    security — key derivation and password hashing, WebRTC address leaks, referrer
                                    policy, extension permission models, passkeys, and the practical side of securing a
                                    shared machine. They are written and reviewed by the same person who writes the
                                    extension, which means the technical claims come from working on the problem rather
                                    than summarising other articles about it.
                                </p>
                                <p>
                                    Where a guide touches on something Locksy sells, we say so in the guide. Where a
                                    conclusion argues against using Locksy — and there are cases, like a threat model
                                    that calls for full-disk encryption instead — we say that too. Corrections are welcome
                                    and get made: if something on this site is wrong, please{' '}
                                    <Link href="/contact" className="text-primary hover:underline font-semibold">
                                        tell us
                                    </Link>{' '}
                                    and we will fix it. You can browse the full archive on the{' '}
                                    <Link href="/blog" className="text-primary hover:underline font-semibold">
                                        blog
                                    </Link>{' '}
                                    or try the{' '}
                                    <Link href="/tools" className="text-primary hover:underline font-semibold">
                                        free security tools
                                    </Link>{' '}
                                    that accompany them.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="py-20 md:py-28">
                        <div className="max-w-5xl mx-auto px-4 md:px-6">
                            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-3xl p-10 md:p-14 text-center">
                                <div className="inline-flex p-4 bg-primary/20 rounded-3xl mb-6">
                                    <Shield className="h-16 w-16 text-primary" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black mb-4">
                                    Ready to Protect Your Tabs?
                                </h2>
                                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                                    Join thousands of users who trust Locksy to keep their browser tabs safe.
                                    Free forever, no account needed.
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    <a
                                        href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all hover:scale-105 font-bold text-lg"
                                    >
                                        Install Locksy — Free
                                    </a>
                                    <a
                                        href="https://github.com/vansh-121/Locksy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-card border-2 border-primary/20 text-primary px-8 py-4 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all font-bold text-lg"
                                    >
                                        <Github className="h-5 w-5" />
                                        View Source
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    )
}
