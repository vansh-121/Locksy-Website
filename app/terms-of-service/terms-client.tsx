"use client"

import Link from "next/link"
import { Shield, FileText, Scale, AlertTriangle, CheckCircle, ArrowLeft, Users, Globe, Code2, Heart } from "lucide-react"

export default function TermsOfServiceClient() {
    const sections = [
        {
            icon: FileText,
            badge: "Acceptance",
            title: "Acceptance of Terms",
            content: [
                'By installing, accessing, or using the Locksy browser extension ("the Extension") or visiting the Locksy website ("the Website") at locksy.dev, you agree to be bound by these Terms of Service ("Terms").',
                "If you do not agree to these Terms, please do not use the Extension or Website. We reserve the right to update these Terms at any time, and continued use after changes constitutes acceptance of the revised Terms."
            ]
        },
        {
            icon: Globe,
            badge: "Description",
            title: "Description of Service",
            content: [
                "Locksy is a free, open-source browser extension that provides password-based tab protection for all major browsers, including Chrome, Edge, Firefox, Brave, Opera, and Vivaldi.",
                "The Extension allows users to lock browser tabs with a master password, set auto-lock timers, schedule locking periods, lock entire domains, use biometric authentication (via WebAuthn/FIDO2), right-click context menus for quick locking, stealth mode to disguise locked tabs, and toggle between light and dark themes.",
                "All data processing occurs entirely on the user's device. No personal data, passwords, or browsing activity is transmitted to any external server."
            ]
        },
        {
            icon: Users,
            badge: "Eligibility",
            title: "Eligibility",
            content: [
                "There are no age or geographic restrictions for using Locksy. The Extension is available to anyone with a supported web browser. No account creation or personal information is required."
            ]
        },
        {
            icon: Shield,
            badge: "License",
            title: "License & Usage Rights",
            content: [
                "Locksy is distributed under the MIT License. You are permitted to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to the MIT License conditions.",
                "You are granted a non-exclusive, worldwide, royalty-free license to use the Extension for any lawful purpose.",
                "You MAY NOT: use the Extension for any illegal activity, attempt to reverse-engineer security features to bypass protections for malicious purposes, redistribute the Extension under a different name without proper attribution, or misrepresent the origin of the software."
            ]
        },
        {
            icon: Code2,
            badge: "Open Source",
            title: "Open Source & Contributions",
            content: [
                "Locksy's source code is publicly available on GitHub (github.com/vansh-121/Locksy). Community contributions are welcome and subject to the project's contribution guidelines.",
                "By submitting contributions (pull requests, issues, or suggestions), you agree that your contributions will be licensed under the same MIT License as the project."
            ]
        },
        {
            icon: Scale,
            badge: "Disclaimer",
            title: "Disclaimer of Warranties",
            content: [
                'THE EXTENSION IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.',
                "While we strive to provide robust tab protection using industry-standard cryptographic methods (PBKDF2 with 600,000 iterations), we do not guarantee that the Extension will be error-free, uninterrupted, or completely secure against all possible attack vectors.",
                "You acknowledge that no software can provide absolute security, and you use the Extension at your own risk."
            ]
        },
        {
            icon: AlertTriangle,
            badge: "Liability",
            title: "Limitation of Liability",
            content: [
                "To the maximum extent permitted by applicable law, the developer(s) of Locksy shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or data, arising out of or related to your use of the Extension or Website.",
                "This includes, but is not limited to, any data loss resulting from forgotten passwords (which cannot be recovered due to the zero-knowledge architecture), browser compatibility issues, or interactions with other extensions or browser updates."
            ]
        },
    ]

    return (
        <>
            <div className="min-h-screen">
                {/* Header */}
                <header className="sticky top-0 z-50 transition-all duration-300 bg-white/80 dark:bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex items-center justify-between gap-4">
                        <Link href="/" className="flex items-center gap-2 md:gap-3 group flex-shrink-0">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
                                <img
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/locksy_-_new_logo-removebg-preview-A7nNuNJNkO21eb9DgcS0wIKSIINL9U.png"
                                    alt="Locksy"
                                    className="relative h-10 md:h-12 w-auto"
                                />
                            </div>
                            <span className="hidden sm:block font-black text-xl md:text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Locksy
                            </span>
                        </Link>
                        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">Back to Home</span>
                            <span className="sm:hidden">Back</span>
                        </Link>
                    </div>
                </header>

                {/* Hero */}
                <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-accent via-background to-accent">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
                    </div>
                    <div className="relative max-w-7xl mx-auto px-4 md:px-6">
                        <div className="text-center space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm">
                                <Scale className="h-4 w-4" />
                                Legal
                            </div>
                            <div>
                                <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                                    Terms of{" "}
                                    <span className="bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary bg-clip-text text-transparent">
                                        Service
                                    </span>
                                </h1>
                                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                                    Clear, fair, and transparent rules for using Locksy. No hidden catches.
                                </p>
                            </div>

                            {/* TL;DR Summary */}
                            <div className="max-w-4xl mx-auto mt-12">
                                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-3xl p-8 md:p-10 backdrop-blur-sm shadow-2xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="bg-blue-500/20 p-3 rounded-2xl">
                                            <CheckCircle className="h-8 w-8 text-blue-600" />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-black">The Quick Version</h2>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {[
                                            "100% free, forever — no hidden fees",
                                            "Open source under MIT License",
                                            "Your data stays on your device",
                                            "No account needed to use Locksy",
                                            "You can modify & redistribute",
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3 bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-xl p-4">
                                                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                                <span className="font-semibold text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-20 md:py-32 bg-gradient-to-b from-background via-accent/30 to-background">
                    <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-16">
                        {sections.map((section, idx) => {
                            const Icon = section.icon
                            return (
                                <div key={idx}>
                                    <div className="text-center mb-8">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                                            <Icon className="h-4 w-4" />
                                            {section.badge}
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-black">
                                            {section.title.split(" ").slice(0, -1).join(" ")}{" "}
                                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                                {section.title.split(" ").slice(-1)}
                                            </span>
                                        </h2>
                                    </div>
                                    <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-10 shadow-xl border border-border space-y-4">
                                        {section.content.map((paragraph, pIdx) => (
                                            <p key={pIdx} className="text-muted-foreground leading-relaxed">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}

                        {/* Additional Sections */}
                        <div>
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                                    <Heart className="h-4 w-4" />
                                    User Rights
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black">
                                    Your{" "}
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        Rights
                                    </span>
                                </h2>
                            </div>
                            <div className="max-w-4xl mx-auto">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        { title: "Free Forever", desc: "Locksy will never charge you. No premium tiers, no subscriptions, no paywalls." },
                                        { title: "Data Ownership", desc: "All your data belongs to you and stays on your device. We never access or transmit it." },
                                        { title: "Uninstall Anytime", desc: "Remove the Extension at any time. All locally stored data is automatically deleted." },
                                        { title: "Full Transparency", desc: "Source code is public. Audit, inspect, and verify every claim we make." },
                                    ].map((right, idx) => (
                                        <div key={idx} className="bg-card rounded-3xl p-8 shadow-lg border border-border hover:border-primary/30 transition-colors">
                                            <h3 className="font-bold text-xl mb-3">{right.title}</h3>
                                            <p className="text-muted-foreground leading-relaxed">{right.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Website Content */}
                        <div>
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-black">
                                    Website{" "}
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        Content
                                    </span>
                                </h2>
                            </div>
                            <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-10 shadow-xl border border-border space-y-4">
                                <p className="text-muted-foreground leading-relaxed">
                                    All content on locksy.dev, including blog posts, guides, and documentation, is the intellectual property of the Locksy project unless otherwise stated.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    You may share and reference our blog content with proper attribution and a link back to the original article. Reproducing entire articles without permission is not permitted.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Third-party trademarks (Chrome, Firefox, Edge, etc.) mentioned on this Website are the property of their respective owners and are used for informational purposes only.
                                </p>
                            </div>
                        </div>

                        {/* Governing Law */}
                        <div>
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-black">
                                    Governing{" "}
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        Law
                                    </span>
                                </h2>
                            </div>
                            <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-10 shadow-xl border border-border space-y-4">
                                <p className="text-muted-foreground leading-relaxed">
                                    These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from or relating to these Terms or the use of Locksy shall be resolved through good-faith negotiation first, and if necessary, through appropriate legal channels.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
                                </p>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-black">
                                    Questions About These{" "}
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        Terms?
                                    </span>
                                </h2>
                            </div>
                            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border text-center space-y-4">
                                <p className="text-muted-foreground leading-relaxed">
                                    If you have any questions about these Terms of Service, please reach out:
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all hover:scale-105 font-bold"
                                    >
                                        Contact Us
                                    </Link>
                                    <a
                                        href="https://github.com/vansh-121/Locksy/issues"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-card border-2 border-primary/20 text-primary px-6 py-3 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all font-bold"
                                    >
                                        <Code2 className="h-5 w-5" />
                                        GitHub Issues
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final Notice */}
                <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
                    <div className="max-w-5xl mx-auto px-4 md:px-6">
                        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-3xl p-10 md:p-14 text-center">
                            <div className="inline-flex p-4 bg-primary/20 rounded-3xl mb-6">
                                <Scale className="h-16 w-16 text-primary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black mb-4">
                                By using Locksy, you acknowledge that you have read and agree to these Terms of Service.
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Last updated: April 20, 2026
                            </p>
                            <div className="pt-8 border-t border-border/50">
                                <p className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Fair, free, and transparent — always. ⚖️
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-neutral-300 py-12">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                    <div className="relative max-w-7xl mx-auto px-4 md:px-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/locksy_-_new_logo-removebg-preview-A7nNuNJNkO21eb9DgcS0wIKSIINL9U.png"
                                    alt="Locksy"
                                    className="h-10 w-auto"
                                />
                                <span className="font-black text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Locksy
                                </span>
                                <span className="text-muted-foreground">• Fair & Transparent</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <Link href="/" className="hover:text-primary transition-colors">
                                    Home
                                </Link>
                                <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                                <a
                                    href="https://github.com/vansh-121/Locksy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors"
                                >
                                    GitHub
                                </a>
                            </div>
                        </div>
                        <div className="mt-8 text-center text-sm text-muted-foreground">
                            <p>© 2025–2026 Locksy. Open source and privacy-focused.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
