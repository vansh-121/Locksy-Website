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
        title: "Open Source",
        desc: "Full transparency. The entire codebase is public on GitHub so anyone can audit, verify, and contribute.",
        color: "from-purple-500 to-indigo-500",
    },
    {
        icon: Heart,
        title: "Free Forever",
        desc: "No premium tiers, no subscriptions, no ads in the extension. Locksy is and always will be completely free.",
        color: "from-rose-500 to-pink-500",
    },
    {
        icon: Zap,
        title: "Zero Compromise",
        desc: "Military-grade PBKDF2 encryption with 600k iterations. We don't cut corners on security.",
        color: "from-amber-500 to-orange-500",
    },
]

const STATS = [
    { number: "5,000+", label: "Active Users" },
    { number: "48+", label: "Blog Articles" },
    { number: "8+", label: "Security Layers" },
    { number: "7+", label: "Browsers Supported" },
]

export default function AboutClient() {
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
                                    A free, open-source browser extension built to give you complete control over your tab privacy.
                                    No compromises, no tracking, no cost.
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
