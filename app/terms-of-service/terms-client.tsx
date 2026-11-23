"use client"

import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Shield, FileText, Scale, AlertTriangle, CheckCircle, Users, Globe, Code2, Heart, BookOpen, Landmark } from "lucide-react"
import { PageHero, DocLayout, DocSection, Callout } from "@/components/page-shell"

export default function TermsOfServiceClient() {
    const sections = [
        {
            id: "acceptance-of-terms",
            icon: FileText,
            title: "Acceptance of Terms",
            content: [
                'By installing, accessing, or using the Locksy browser extension ("the Extension") or visiting the Locksy website ("the Website") at locksy.dev, you agree to be bound by these Terms of Service ("Terms").',
                "If you do not agree to these Terms, please do not use the Extension or Website. We reserve the right to update these Terms at any time, and continued use after changes constitutes acceptance of the revised Terms."
            ]
        },
        {
            id: "description-of-service",
            icon: Globe,
            title: "Description of Service",
            content: [
                "Locksy is a browser extension that provides password-based tab protection for all major browsers, including Chrome, Edge, Firefox, Brave, Opera, and Vivaldi. It is available in a Free Core version with an optional lifetime Pro upgrade.",
                "The Extension allows users to lock browser tabs with a master password, set auto-lock timers, schedule locking periods, lock entire domains, use biometric authentication (via WebAuthn/FIDO2), right-click context menus for quick locking, stealth mode to disguise locked tabs, and toggle between light and dark themes.",
                "All data processing occurs entirely on the user's device. No personal data, passwords, or browsing activity is transmitted to any external server."
            ]
        },
        {
            id: "eligibility",
            icon: Users,
            title: "Eligibility",
            content: [
                "There are no age or geographic restrictions for using Locksy. The Extension is available to anyone with a supported web browser. No account creation or personal information is required."
            ]
        },
        {
            id: "license-usage-rights",
            icon: Shield,
            title: "License & Usage Rights",
            content: [
                "Locksy is proprietary software. You are granted a non-exclusive, personal, non-transferable, revocable license to use the Extension for your personal, non-commercial security purposes subject to these Terms.",
                "You MAY NOT: lease, rent, redistribute, sell, or modify the Extension; attempt to reverse-engineer, decompile, or bypass the extension's security features; or misrepresent the origin of the software."
            ]
        },
        {
            id: "security-auditing",
            icon: Code2,
            title: "Security & Auditing",
            content: [
                "While the extension's source code is proprietary, Locksy is built with strict privacy constraints. No personal data, passwords, or browsing activity is ever transmitted to any external server.",
                "Users can verify that no network requests are initiated by the extension by auditing network activity logs locally using their browser's built-in developer tools."
            ]
        },
        {
            id: "disclaimer-of-warranties",
            icon: Scale,
            title: "Disclaimer of Warranties",
            content: [
                'THE EXTENSION IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.',
                "While we strive to provide robust tab protection using industry-standard cryptographic methods (PBKDF2 with 600,000 iterations), we do not guarantee that the Extension will be error-free, uninterrupted, or completely secure against all possible attack vectors.",
                "You acknowledge that no software can provide absolute security, and you use the Extension at your own risk."
            ]
        },
        {
            id: "limitation-of-liability",
            icon: AlertTriangle,
            title: "Limitation of Liability",
            content: [
                "To the maximum extent permitted by applicable law, the developer(s) of Locksy shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or data, arising out of or related to your use of the Extension or Website.",
                "This includes, but is not limited to, any data loss resulting from forgotten passwords (which cannot be recovered due to the zero-knowledge architecture), browser compatibility issues, or interactions with other extensions or browser updates."
            ]
        },
    ]

    const quickVersion = [
        "Free Core version with optional lifetime Pro Upgrade",
        "No monthly recurring fees or subscriptions",
        "Your data stays 100% on your device",
        "No account needed to use Locksy",
        "100% offline encryption and locking",
    ]

    const rights = [
        { title: "Free Forever", desc: "Locksy's core features are free forever — we'll never charge you to keep using them. Pro is an optional one-time upgrade, not a subscription or recurring paywall." },
        { title: "Data Ownership", desc: "All your data belongs to you and stays on your device. We never access or transmit it." },
        { title: "Uninstall Anytime", desc: "Remove the Extension at any time. All locally stored data is automatically deleted." },
        { title: "Full Transparency", desc: "Source code is public. Audit, inspect, and verify every claim we make." },
    ]

    const toc = [
        { id: "the-quick-version", label: "The Quick Version" },
        ...sections.map((s) => ({ id: s.id, label: s.title })),
        { id: "your-rights", label: "Your Rights" },
        { id: "website-content", label: "Website Content" },
        { id: "governing-law", label: "Governing Law" },
    ]

    return (
        <>
            <Header />

            <main className="relative">
                <PageHero
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
                    eyebrow="Legal"
                    title="Terms of Service"
                    description="Clear, fair, and transparent rules for using Locksy. No hidden catches."
                    meta={<span>Last updated: April 20, 2026</span>}
                />

                <DocLayout toc={toc}>
                    {/* TL;DR Summary */}
                    <DocSection id="the-quick-version" icon={CheckCircle} title="The Quick Version">
                        <div className="grid gap-3 sm:grid-cols-2">
                            {quickVersion.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-highlight" />
                                    <span className="text-sm font-medium text-foreground">{item}</span>
                                </div>
                            ))}
                        </div>
                    </DocSection>

                    {sections.map((section) => (
                        <DocSection key={section.id} id={section.id} icon={section.icon} title={section.title}>
                            {section.content.map((paragraph, pIdx) => (
                                <p key={pIdx}>{paragraph}</p>
                            ))}
                        </DocSection>
                    ))}

                    {/* Your Rights */}
                    <DocSection id="your-rights" icon={Heart} title="Your Rights">
                        <div className="grid gap-4 md:grid-cols-2">
                            {rights.map((right, idx) => (
                                <div key={idx} className="rounded-xl border border-border bg-background p-5">
                                    <h3 className="!mt-0">{right.title}</h3>
                                    <p className="mt-2">{right.desc}</p>
                                </div>
                            ))}
                        </div>
                    </DocSection>

                    {/* Website Content */}
                    <DocSection id="website-content" icon={BookOpen} title="Website Content">
                        <p>
                            All content on locksy.dev, including blog posts, guides, and documentation, is the intellectual property of the Locksy project unless otherwise stated.
                        </p>
                        <p>
                            You may share and reference our blog content with proper attribution and a link back to the original article. Reproducing entire articles without permission is not permitted.
                        </p>
                        <p>
                            Third-party trademarks (Chrome, Firefox, Edge, etc.) mentioned on this Website are the property of their respective owners and are used for informational purposes only.
                        </p>
                    </DocSection>

                    {/* Governing Law */}
                    <DocSection id="governing-law" icon={Landmark} title="Governing Law">
                        <p>
                            These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from or relating to these Terms or the use of Locksy shall be resolved through good-faith negotiation first, and if necessary, through appropriate legal channels.
                        </p>
                        <p>
                            If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
                        </p>
                    </DocSection>

                    {/* Contact */}
                    <div className="surface p-6 text-center md:p-9">
                        <h2 className="text-xl font-semibold leading-snug text-foreground md:text-2xl text-balance">Questions About These Terms?</h2>
                        <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                            If you have any questions about these Terms of Service, please reach out:
                        </p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                            <Link href="/contact" className="btn-primary">
                                Contact Us
                            </Link>
                            <a
                                href="https://github.com/vansh-121/Locksy/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary"
                            >
                                <Code2 className="h-4 w-4" />
                                GitHub Issues
                            </a>
                        </div>
                    </div>

                    {/* Final Notice */}
                    <Callout icon={Scale} title="By using Locksy, you acknowledge that you have read and agree to these Terms of Service.">
                        <p>Last updated: April 20, 2026</p>
                        <p className="mt-2">Fair, free, and transparent — always.</p>
                    </Callout>
                </DocLayout>
            </main>

            <Footer />
        </>
    )
}
