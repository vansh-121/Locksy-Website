"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
    FileText,
    CreditCard,
    CheckCircle2,
    XCircle,
    HelpCircle,
    ArrowRight,
    Mail,
    ChevronDown,
    Zap,
    Download,
    AlertTriangle,
    LifeBuoy
} from "lucide-react"

export default function RefundPolicyClient() {
    const [openFaq, setOpenFaq] = useState<number | null>(0)

    const HIGHLIGHT_CARDS = [
        {
            icon: XCircle,
            title: "All Sales Are Final",
            description: "Because Locksy Pro delivers instant digital license activation, all purchases are non-refundable once completed.",
            badge: "Digital Goods",
            gradient: "from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400"
        },
        {
            icon: Download,
            title: "Try Free Before Upgrading",
            description: "Locksy offers a robust, free-forever Core version so you can thoroughly test the extension before buying Pro.",
            badge: "100% Free Core",
            gradient: "from-primary/10 to-secondary/10 border-primary/20 text-primary"
        },
        {
            icon: CreditCard,
            title: "No Recurring Subscriptions",
            description: "Locksy Pro is a one-time lifetime payment. There are no automatic renewals, monthly bills, or recurring fees to cancel.",
            badge: "Zero Renewals",
            gradient: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
        },
        {
            icon: LifeBuoy,
            title: "Billing Error Protection",
            description: "Accidental double-charges or duplicate payments caused by gateway timeouts are promptly reviewed and reversed.",
            badge: "Full Protection",
            gradient: "from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400"
        }
    ]

    const FAQS = [
        {
            q: "Can I get a refund after purchasing Locksy Pro?",
            a: "No. All purchases of Locksy Pro are final and non-refundable. Because the product is an instantly delivered digital software license that permanently unlocks features across your devices, we cannot accept returns or issue refunds once a license has been issued."
        },
        {
            q: "Why does Locksy have a no-refund policy?",
            a: "Locksy operates on a local-first, zero-knowledge architecture. There is no cloud telemetry or invasive DRM tracking on your computer. To ensure fair access and prevent software piracy, digital license keys are non-returnable upon delivery. To make sure Locksy is right for you, we provide a complete Free Core version that you can use indefinitely before purchasing."
        },
        {
            q: "How can I evaluate Locksy before purchasing Pro?",
            a: "You can download Locksy for free from the Chrome Web Store, Firefox Add-ons, or Edge Add-ons! The free tier includes master password protection, biometric unlock, offline encryption, and auto-lock timers with no time limits. We strongly encourage all users to test the free version to ensure full compatibility with their workflow."
        },
        {
            q: "How do I cancel my subscription so I'm not billed again?",
            a: "Locksy Pro is NOT a subscription! It is a one-time payment for lifetime access. You will never be billed monthly, annually, or charged renewal fees. There is no recurring plan to cancel."
        },
        {
            q: "What if I was charged twice by accident?",
            a: "If a technical glitch or network timeout caused an accidental duplicate charge for the same license, please email us immediately at support@locksy.dev with your receipt details. We will gladly reverse the duplicate charge."
        },
        {
            q: "What if I experience a technical issue or bug?",
            a: "We want your experience with Locksy to be seamless. If you encounter any technical glitch or unexpected browser behavior, contact us at support@locksy.dev or open an issue on GitHub. We provide direct developer support to resolve technical problems promptly."
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-accent/30 to-background relative overflow-hidden" suppressHydrationWarning>
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700 pointer-events-none" />

            <Header />

            <main className="relative">
                {/* Hero Section */}
                <section className="page-top-offset pb-16 md:pb-24">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-foreground font-medium">Refund Policy</span>
                        </nav>

                        <div className="text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 via-purple-500/10 to-secondary/10 border border-primary/20 rounded-full text-sm font-semibold text-primary backdrop-blur-sm shadow-sm">
                                <AlertTriangle className="h-4 w-4" />
                                Non-Refundable Digital Products
                            </div>

                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight">
                                Refund & Cancellation{" "}
                                <span className="bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary bg-clip-text text-transparent">
                                    Policy
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                                Clear, honest, and transparent terms. Please review our policy before purchasing a Locksy Pro lifetime license.
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-muted-foreground pt-2">
                                <span>Merchant: <strong className="text-foreground">Locksy Security</strong></span>
                                <span>•</span>
                                <span>Payment Processor: <strong className="text-foreground">Polar.sh & Stripe</strong></span>
                                <span>•</span>
                                <span>Policy Status: <strong className="text-foreground">All Sales Final</strong></span>
                            </div>
                        </div>

                        {/* 4 Core Pillars */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
                            {HIGHLIGHT_CARDS.map((card, i) => {
                                const Icon = card.icon
                                return (
                                    <div
                                        key={i}
                                        className={`rounded-2xl p-6 bg-card/80 backdrop-blur-sm border shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${card.gradient}`}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-2.5 rounded-xl bg-background/80 shadow-xs">
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-background/70 border border-current">
                                                {card.badge}
                                            </span>
                                        </div>
                                        <h2 className="text-lg font-bold text-foreground mb-2">
                                            {card.title}
                                        </h2>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Try Before You Buy Banner */}
                <section className="py-12 bg-muted/40 border-y border-border">
                    <div className="max-w-5xl mx-auto px-4 md:px-6">
                        <div className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="space-y-2 text-center md:text-left relative z-10">
                                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                                    <Zap className="h-3.5 w-3.5" />
                                    Risk-Free Testing
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black">
                                    Try Locksy 100% Free Before{" "}
                                    <span className="bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary bg-clip-text text-transparent">
                                        Buying
                                    </span>
                                </h3>
                                <p className="text-muted-foreground text-sm max-w-xl">
                                    We offer a generous Free Core version with zero time limits. Test all essential tab protection features and confirm full compatibility on your computer prior to purchasing Pro.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 relative z-10">
                                <a
                                    href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary text-white font-bold text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <Download className="h-4 w-4" />
                                    <span>Install Free Extension</span>
                                </a>
                                <Link
                                    href="/pricing"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-card hover:bg-accent border border-border hover:border-primary/40 text-foreground font-bold text-sm shadow-xs hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <span>Compare Plans</span>
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Detailed Terms */}
                <section className="py-16 md:py-24">
                    <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-12">
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 via-purple-500/10 to-secondary/10 border border-primary/20 rounded-full text-sm font-semibold text-primary backdrop-blur-sm shadow-sm">
                                <FileText className="h-4 w-4" />
                                Policy Terms
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black">
                                Detailed Terms &{" "}
                                <span className="bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary bg-clip-text text-transparent">
                                    Conditions
                                </span>
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                In accordance with standard consumer protection regulations and digital merchant guidelines.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Section 1: Non-Refundable Digital Goods */}
                            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-md space-y-3">
                                <h3 className="text-xl font-bold flex items-center gap-3">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary/15 to-secondary/15 text-primary border border-primary/20 text-sm font-black">
                                        1
                                    </span>
                                    Digital Goods & All Sales Final
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Locksy Pro is an intangible, digital software product delivered immediately upon payment completion via Polar.sh and Stripe. Once a license key has been generated and dispatched, the digital good is deemed fully delivered and consumed. 
                                </p>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Consequently, <strong>all sales are final and non-refundable</strong>. We do not provide refunds, exchanges, or returns for change of mind, perceived lack of features, or failure to review product documentation prior to checkout.
                                </p>
                            </div>

                            {/* Section 2: Cancellation Policy */}
                            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-md space-y-3">
                                <h3 className="text-xl font-bold flex items-center gap-3">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary/15 to-secondary/15 text-primary border border-primary/20 text-sm font-black">
                                        2
                                    </span>
                                    Subscription Cancellation Policy
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Locksy Pro is sold strictly on a <strong>one-time lifetime purchase</strong> model.
                                </p>
                                <ul className="list-disc pl-6 space-y-1.5 text-sm text-muted-foreground">
                                    <li><strong>No recurring billing:</strong> There are no monthly or yearly subscriptions associated with your license.</li>
                                    <li><strong>No cancellation required:</strong> Because no recurring payments exist, you do not need to cancel or modify any payment mandate after checkout.</li>
                                    <li><strong>No hidden fees:</strong> Your single payment provides ongoing lifetime access with no renewal fees.</li>
                                </ul>
                            </div>

                            {/* Section 3: Technical Incompatibility & Free Evaluation */}
                            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-md space-y-3">
                                <h3 className="text-xl font-bold flex items-center gap-3">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary/15 to-secondary/15 text-primary border border-primary/20 text-sm font-black">
                                        3
                                    </span>
                                    Evaluation Period & Browser Compatibility
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    To ensure customers can verify complete compatibility with their personal workstation and preferred browser (Chrome, Edge, Firefox, Brave, Opera, Vivaldi), Locksy provides an unmetered, fully functional Free Core edition.
                                </p>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    By purchasing Locksy Pro, you acknowledge that you had the opportunity to evaluate Locksy Free beforehand and confirmed that it operates satisfactorily on your device.
                                </p>
                            </div>

                            {/* Section 4: Billing Errors & Duplicate Charges */}
                            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-md space-y-3">
                                <h3 className="text-xl font-bold flex items-center gap-3">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary/15 to-secondary/15 text-primary border border-primary/20 text-sm font-black">
                                        4
                                    </span>
                                    Duplicate Payments & Billing Discrepancies
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    The only exceptions to our all-sales-final policy are genuine billing discrepancies, such as:
                                </p>
                                <ul className="list-disc pl-6 space-y-1.5 text-sm text-muted-foreground">
                                    <li>Accidental duplicate transactions resulting from a network timeout during checkout.</li>
                                    <li>A payment gateway charge occurring without a license key being issued.</li>
                                </ul>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    If you notice a duplicate charge, please contact <a href="mailto:support@locksy.dev" className="text-primary hover:underline font-semibold">support@locksy.dev</a> within 14 days with your checkout receipt. Upon verification, any erroneous duplicate payment will be refunded directly to your original payment method.
                                </p>
                            </div>

                            {/* Section 5: Technical Assistance */}
                            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-md space-y-3">
                                <h3 className="text-xl font-bold flex items-center gap-3">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary/15 to-secondary/15 text-primary border border-primary/20 text-sm font-black">
                                        5
                                    </span>
                                    Dedicated Technical Support
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    While purchases are non-refundable, our technical support is committed to ensuring you enjoy Locksy Pro. If you experience unexpected bugs or difficulty activating your license, our development team is available to assist you directly.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 md:py-24 bg-accent/20 border-t border-border">
                    <div className="max-w-4xl mx-auto px-4 md:px-6">
                        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 via-purple-500/10 to-secondary/10 border border-primary/20 rounded-full text-sm font-semibold text-primary backdrop-blur-sm shadow-sm">
                                <HelpCircle className="h-4 w-4" />
                                Common Inquiries
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black">
                                Frequently Asked{" "}
                                <span className="bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary bg-clip-text text-transparent">
                                    Questions
                                </span>
                            </h2>
                            <p className="text-muted-foreground text-sm md:text-base">
                                Quick answers regarding our digital sales policy and billing practices.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {FAQS.map((faq, idx) => {
                                const isOpen = openFaq === idx
                                return (
                                    <div
                                        key={idx}
                                        className="bg-card rounded-2xl border border-border shadow-xs overflow-hidden transition-colors"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                                            className="w-full flex items-center justify-between p-6 text-left font-bold text-foreground text-base md:text-lg hover:text-primary transition-colors gap-4"
                                        >
                                            <span>{faq.q}</span>
                                            <ChevronDown
                                                className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 text-muted-foreground ${isOpen ? "rotate-180 text-primary" : ""}`}
                                            />
                                        </button>
                                        {isOpen && (
                                            <div className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed border-t border-border/40 pt-4">
                                                {faq.a}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Support CTA */}
                <section className="py-20 md:py-28">
                    <div className="max-w-4xl mx-auto px-4 md:px-6 text-center space-y-6">
                        <h2 className="text-3xl md:text-5xl font-black">
                            Have questions before{" "}
                            <span className="bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary bg-clip-text text-transparent">
                                purchasing?
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            We encourage you to reach out to us with any technical or feature questions before completing your purchase.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                            <a
                                href="mailto:support@locksy.dev"
                                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary text-white font-bold hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5 shadow-xl shadow-primary/25 text-base"
                            >
                                <Mail className="h-5 w-5" />
                                <span>Contact Developer</span>
                            </a>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-card border border-border hover:border-primary/40 hover:bg-accent font-bold text-foreground transition-all duration-300 hover:-translate-y-0.5 shadow-sm text-base"
                            >
                                <span>Visit Support Page</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
