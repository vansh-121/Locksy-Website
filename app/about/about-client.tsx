"use client"

import { SmartInstallButton } from "@/components/install-buttons"
import Link from "next/link"
import { Shield, Lock, Github, Heart, Code2, Globe, Zap } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageHero, PageSection, IconTile } from "@/components/page-shell"
import SectionHeading from "@/components/section-heading"

const MILESTONES = [
    { year: "Oct 2025", title: "Locksy Born", desc: "First release on Chrome Web Store with basic tab locking." },
    { year: "Nov 2025", title: "Multi-Browser", desc: "Expanded to Edge, Firefox, Brave, Opera, and Vivaldi." },
    { year: "Dec 2025", title: "v2.0 — Automation", desc: "Auto-lock timers and scheduled locking introduced." },
    { year: "Jan 2026", title: "v2.3 — Biometrics", desc: "WebAuthn/FIDO2 biometric unlock for fingerprint & face ID." },
    { year: "Feb 2026", title: "1,000 Users", desc: "Community milestone: 1,000 active users across all browsers." },
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
    },
    {
        icon: Code2,
        title: "100% Local",
        desc: "Complete privacy. All encryption keys, databases, and logs stay strictly inside your browser sandbox.",
    },
    {
        icon: Heart,
        title: "Free Core Tier",
        desc: "Start for free without ads. Enjoy basic tab protection, and optionally upgrade to Pro for advanced features.",
    },
    {
        icon: Zap,
        title: "Zero Compromise",
        desc: "Standard-exceeding PBKDF2 key derivation with 600,000 iterations. We don't cut corners on cryptography.",
    },
]

// The guide count is passed in from the server page rather than hardcoded, so it can't
// drift out of date — an inflated article count is trivially falsifiable.
const buildStats = (guideCount: number) => [
    { number: "5,000+", label: "Active Users" },
    { number: `${guideCount}`, label: "In-Depth Guides" },
    { number: "8+", label: "Security Layers" },
    { number: "18+", label: "Browsers Supported" },
]

const inlineLink = "text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
const prose = "space-y-5 text-base leading-relaxed text-muted-foreground md:text-[17px]"

export default function AboutClient({ guideCount }: { guideCount: number }) {
    const STATS = buildStats(guideCount)

    return (
        <>
            <div className="min-h-screen bg-background">
                <Header />

                <main className="relative">
                    {/* Hero */}
                    <PageHero
                        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
                        eyebrow="Our Story"
                        title={
                            <>
                                About <span className="text-highlight">Locksy</span>
                            </>
                        }
                        description={
                            <>
                                A powerful browser extension built to give you complete control over your tab privacy.
                                No compromises, no tracking, and 100% offline.
                            </>
                        }
                    />

                    {/* Stats Bar */}
                    <section className="pb-12 md:pb-16">
                        <div className="mx-auto max-w-6xl px-4 md:px-6">
                            {/* gap-px over a border-coloured background draws the hairline grid */}
                            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
                                {STATS.map((stat, idx) => (
                                    <div key={idx} className="bg-background p-6 md:p-8">
                                        <dt className="sr-only">{stat.label}</dt>
                                        <dd>
                                            <span className="block font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                                                {stat.number}
                                            </span>
                                            <span className="mt-2 block text-sm text-muted-foreground">{stat.label}</span>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </section>

                    {/* Mission */}
                    <PageSection>
                        <SectionHeading eyebrow="Our Mission" title="Why Locksy Exists" />
                        <div className="mx-auto mt-12 max-w-3xl">
                            <div className="surface space-y-6 p-8 md:p-12">
                                <p className="text-base leading-relaxed text-muted-foreground md:text-[17px]">
                                    Locksy was born out of a simple yet urgent need: <strong className="font-medium text-foreground">protecting sensitive browser tabs on shared computers</strong>.
                                    Whether you're a student in a library, an employee in an open office, or a parent sharing a family computer —
                                    there's always a risk of someone seeing tabs you'd rather keep private.
                                </p>
                                <p className="text-base leading-relaxed text-muted-foreground md:text-[17px]">
                                    Existing solutions were either too complex, charged money for basic features, or collected user data.
                                    Locksy set out to be different: <strong className="font-medium text-foreground">100% free, completely offline, and privacy-first from day one</strong>.
                                </p>
                                <p className="text-base leading-relaxed text-muted-foreground md:text-[17px]">
                                    Today, Locksy protects thousands of users across Chrome, Edge, Firefox, Brave, Opera, Vivaldi, Arc, Zen and other Chromium and Firefox-based browsers —
                                    all while keeping your data entirely on your device.
                                </p>
                            </div>
                        </div>
                    </PageSection>

                    {/* Threat model */}
                    <PageSection width="narrow">
                        <h2 className="text-3xl font-semibold leading-[1.1] text-foreground md:text-4xl text-balance">
                            The specific problem we set out to solve
                        </h2>
                        <div className={`mt-6 ${prose}`}>
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
                    </PageSection>

                    {/* Values */}
                    <PageSection>
                        <SectionHeading eyebrow="Core Values" title="What We Stand For" />
                        <div className="mt-12 grid gap-4 md:grid-cols-2">
                            {VALUES.map((value, idx) => (
                                <div key={idx} className="surface p-6 md:p-8">
                                    <IconTile icon={value.icon} />
                                    <h3 className="mt-6 text-lg font-semibold text-foreground">{value.title}</h3>
                                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </PageSection>

                    {/* Developer */}
                    <PageSection>
                        <SectionHeading eyebrow="The Developer" title="Meet the Creator" />
                        <div className="mx-auto mt-12 max-w-3xl">
                            <div className="surface p-8 md:p-10">
                                <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                                    <div
                                        className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full border border-border bg-muted"
                                        aria-hidden="true"
                                    >
                                        <span className="font-display text-4xl font-semibold text-foreground">V</span>
                                    </div>
                                    <div className="flex-1 space-y-4 text-center md:text-left">
                                        <div>
                                            <h3 className="text-2xl font-semibold text-foreground">Vansh Sethi</h3>
                                            <p className="mt-1 text-sm text-muted-foreground">Creator & Lead Developer</p>
                                        </div>
                                        <p className="text-[15px] leading-relaxed text-muted-foreground">
                                            A passionate developer focused on building tools that respect user privacy.
                                            Vansh created Locksy with the belief that security should be accessible to everyone —
                                            free, transparent, and without compromise.
                                        </p>
                                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 md:justify-start">
                                            <a
                                                href="https://github.com/vansh-121"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-secondary btn-sm"
                                            >
                                                <Github className="h-4 w-4" />
                                                GitHub
                                            </a>
                                            <a
                                                href="https://www.linkedin.com/in/vansh-sethi-vs"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-secondary btn-sm"
                                            >
                                                <Globe className="h-4 w-4" />
                                                LinkedIn
                                            </a>
                                            <a
                                                href="https://github.com/sponsors/vansh-121"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-secondary btn-sm"
                                            >
                                                <Heart className="h-4 w-4 text-highlight" />
                                                Sponsor
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PageSection>

                    {/* Timeline */}
                    <PageSection width="narrow">
                        <SectionHeading eyebrow="Journey" title="Our Journey" />
                        <ol className="relative mt-12 space-y-4">
                            {/* Timeline hairline */}
                            <span aria-hidden="true" className="absolute bottom-4 left-4 top-4 w-px bg-border" />
                            {MILESTONES.map((milestone, idx) => (
                                <li key={idx} className="relative flex gap-5">
                                    <span className="relative z-10 mt-5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border bg-background font-mono text-[11px] text-foreground">
                                        {String(idx + 1).padStart(2, "0")}
                                    </span>
                                    <div className="surface min-w-0 flex-1 p-5 md:p-6">
                                        <span className="text-xs font-medium text-highlight">{milestone.year}</span>
                                        <h3 className="mt-1.5 text-lg font-semibold text-foreground">{milestone.title}</h3>
                                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{milestone.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </PageSection>

                    {/* How it's built */}
                    <PageSection width="narrow">
                        <h2 className="text-3xl font-semibold leading-[1.1] text-foreground md:text-4xl text-balance">
                            How it is built, and what &ldquo;offline&rdquo; actually means
                        </h2>
                        <div className={`mt-6 ${prose}`}>
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
                    </PageSection>

                    {/* Funding + limits */}
                    <PageSection>
                        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
                            <div className="surface p-8">
                                <h2 className="text-xl font-semibold leading-snug text-foreground md:text-2xl">How the project pays for itself</h2>
                                <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
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

                            <div className="surface p-8">
                                <h2 className="text-xl font-semibold leading-snug text-foreground md:text-2xl">What Locksy deliberately does not do</h2>
                                <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
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
                                        <Link href="/security" className={inlineLink}>
                                            security architecture page
                                        </Link>{' '}
                                        documents the cryptography in more detail, including the parts we consider
                                        open trade-offs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </PageSection>

                    {/* Editorial */}
                    <PageSection width="narrow">
                        <h2 className="text-3xl font-semibold leading-[1.1] text-foreground md:text-4xl text-balance">About the guides on this site</h2>
                        <div className={`mt-6 ${prose}`}>
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
                                <Link href="/contact" className={inlineLink}>
                                    tell us
                                </Link>{' '}
                                and we will fix it. You can browse the full archive on the{' '}
                                <Link href="/blog" className={inlineLink}>
                                    blog
                                </Link>{' '}
                                or try the{' '}
                                <Link href="/tools" className={inlineLink}>
                                    free security tools
                                </Link>{' '}
                                that accompany them.
                            </p>
                        </div>
                    </PageSection>

                    {/* CTA */}
                    <PageSection className="pb-20 md:pb-28">
                        <div className="surface relative mx-auto max-w-5xl overflow-hidden px-6 py-12 text-center md:px-14 md:py-16">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[700px] -translate-x-1/2 -translate-y-1/2"
                                style={{ background: "radial-gradient(50% 50% at 50% 50%, var(--glow), transparent 70%)" }}
                            />
                            <div className="relative">
                                <IconTile icon={Shield} className="h-12 w-12" />
                                <h2 className="mt-6 text-3xl font-semibold leading-[1.1] text-foreground md:text-4xl text-balance">
                                    Ready to Protect Your Tabs?
                                </h2>
                                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                                    Join thousands of users who trust Locksy to keep their browser tabs safe.
                                    Free forever, no account needed.
                                </p>
                                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                                    {/* Points at the visitor's own store */}
                                    <SmartInstallButton label="Add to {name}, it's free" size="lg" />
                                    <a
                                        href="https://github.com/vansh-121/Locksy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-secondary btn-lg"
                                    >
                                        <Github className="h-5 w-5" />
                                        View Source
                                    </a>
                                </div>
                            </div>
                        </div>
                    </PageSection>
                </main>

                <Footer />
            </div>
        </>
    )
}
