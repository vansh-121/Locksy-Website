"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
    CreditCard,
    XCircle,
    HelpCircle,
    ArrowRight,
    Mail,
    ChevronDown,
    Zap,
    Download,
    LifeBuoy
} from "lucide-react"
import { PageHero, DocLayout, DocSection, IconTile } from "@/components/page-shell"

export default function RefundPolicyClient() {
    const [openFaq, setOpenFaq] = useState<number | null>(0)

    const HIGHLIGHT_CARDS = [
        {
            icon: XCircle,
            title: "All Sales Are Final",
            description: "Because Locksy Pro delivers instant digital license activation, all purchases are non-refundable once completed.",
            badge: "Digital Goods",
        },
        {
            icon: Download,
            title: "Try Free Before Upgrading",
            description: "Locksy offers a robust, free-forever Core version so you can thoroughly test the extension before buying Pro.",
            badge: "100% Free Core",
        },
        {
            icon: CreditCard,
            title: "No Recurring Subscriptions",
            description: "Locksy Pro is a one-time lifetime payment. There are no automatic renewals, monthly bills, or recurring fees to cancel.",
            badge: "Zero Renewals",
        },
        {
            icon: LifeBuoy,
            title: "Billing Error Protection",
            description: "Accidental double-charges or duplicate payments caused by gateway timeouts are promptly reviewed and reversed.",
            badge: "Full Protection",
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

    const TOC = [
        { id: "digital-goods-all-sales-final", label: "Digital Goods & All Sales Final" },
        { id: "subscription-cancellation-policy", label: "Subscription Cancellation Policy" },
        { id: "evaluation-period-browser-compatibility", label: "Evaluation Period & Browser Compatibility" },
        { id: "duplicate-payments-billing-discrepancies", label: "Duplicate Payments & Billing Discrepancies" },
        { id: "dedicated-technical-support", label: "Dedicated Technical Support" },
        { id: "frequently-asked-questions", label: "Frequently Asked Questions" },
    ]

    return (
        <div suppressHydrationWarning>
            <Header />

            <main className="relative">
                {/* Hero Section */}
                <PageHero
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "Refund Policy" }]}
                    eyebrow="Legal"
                    title="Refund & Cancellation Policy"
                    description="Clear, honest, and transparent terms. Please review our policy before purchasing a Locksy Pro lifetime license."
                    meta={
                        <>
                            <span>Merchant: <strong className="font-medium text-foreground">Locksy Security</strong></span>
                            <span aria-hidden="true" className="text-border">/</span>
                            <span>Payment Processor: <strong className="font-medium text-foreground">Polar.sh & Stripe</strong></span>
                            <span aria-hidden="true" className="text-border">/</span>
                            <span>Policy Status: <strong className="font-medium text-foreground">All Sales Final</strong></span>
                        </>
                    }
                />

                <div className="mx-auto max-w-6xl space-y-4 px-4 pb-12 md:px-6 md:pb-16">
                    {/* 4 Core Pillars */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {HIGHLIGHT_CARDS.map((card, i) => (
                            <div key={i} className="surface flex flex-col p-6">
                                <div className="flex items-center justify-between gap-3">
                                    <IconTile icon={card.icon} />
                                    <span className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                                        {card.badge}
                                    </span>
                                </div>
                                <h2 className="mt-5 text-lg font-semibold text-foreground">
                                    {card.title}
                                </h2>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Try Before You Buy Banner */}
                    <div className="surface flex flex-col items-center justify-between gap-6 p-6 md:flex-row md:p-9">
                        <div className="space-y-2 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 text-xs font-medium text-highlight">
                                <Zap className="h-3.5 w-3.5" />
                                Risk-Free Testing
                            </div>
                            <h3 className="text-xl font-semibold leading-snug text-foreground md:text-2xl text-balance">
                                Try Locksy 100% Free Before Buying
                            </h3>
                            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                                We offer a generous Free Core version with zero time limits. Test all essential tab protection features and confirm full compatibility on your computer prior to purchasing Pro.
                            </p>
                        </div>
                        <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
                            <a
                                href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                            >
                                <Download className="h-4 w-4" />
                                <span>Install Free Extension</span>
                            </a>
                            <Link href="/pricing" className="btn-secondary">
                                <span>Compare Plans</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Detailed Terms */}
                <DocLayout toc={TOC}>
                    <div className="pb-4">
                        <span className="eyebrow">
                            <span className="eyebrow-dot" aria-hidden="true" />
                            Policy Terms
                        </span>
                        <h2 className="mt-5 text-3xl font-semibold leading-tight text-foreground md:text-4xl text-balance">
                            Detailed Terms & Conditions
                        </h2>
                        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                            In accordance with standard consumer protection regulations and digital merchant guidelines.
                        </p>
                    </div>

                    {/* Section 1: Non-Refundable Digital Goods */}
                    <DocSection id="digital-goods-all-sales-final" index={1} title="Digital Goods & All Sales Final">
                        <p>
                            Locksy Pro is an intangible, digital software product delivered immediately upon payment completion via Polar.sh and Stripe. Once a license key has been generated and dispatched, the digital good is deemed fully delivered and consumed.
                        </p>
                        <p>
                            Consequently, <strong>all sales are final and non-refundable</strong>. We do not provide refunds, exchanges, or returns for change of mind, perceived lack of features, or failure to review product documentation prior to checkout.
                        </p>
                    </DocSection>

                    {/* Section 2: Cancellation Policy */}
                    <DocSection id="subscription-cancellation-policy" index={2} title="Subscription Cancellation Policy">
                        <p>
                            Locksy Pro is sold strictly on a <strong>one-time lifetime purchase</strong> model.
                        </p>
                        <ul>
                            <li><strong>No recurring billing:</strong> There are no monthly or yearly subscriptions associated with your license.</li>
                            <li><strong>No cancellation required:</strong> Because no recurring payments exist, you do not need to cancel or modify any payment mandate after checkout.</li>
                            <li><strong>No hidden fees:</strong> Your single payment provides ongoing lifetime access with no renewal fees.</li>
                        </ul>
                    </DocSection>

                    {/* Section 3: Technical Incompatibility & Free Evaluation */}
                    <DocSection id="evaluation-period-browser-compatibility" index={3} title="Evaluation Period & Browser Compatibility">
                        <p>
                            To ensure customers can verify complete compatibility with their personal workstation and preferred browser (Chrome, Edge, Firefox, Brave, Opera, Vivaldi), Locksy provides an unmetered, fully functional Free Core edition.
                        </p>
                        <p>
                            By purchasing Locksy Pro, you acknowledge that you had the opportunity to evaluate Locksy Free beforehand and confirmed that it operates satisfactorily on your device.
                        </p>
                    </DocSection>

                    {/* Section 4: Billing Errors & Duplicate Charges */}
                    <DocSection id="duplicate-payments-billing-discrepancies" index={4} title="Duplicate Payments & Billing Discrepancies">
                        <p>
                            The only exceptions to our all-sales-final policy are genuine billing discrepancies, such as:
                        </p>
                        <ul>
                            <li>Accidental duplicate transactions resulting from a network timeout during checkout.</li>
                            <li>A payment gateway charge occurring without a license key being issued.</li>
                        </ul>
                        <p>
                            If you notice a duplicate charge, please contact <a href="mailto:support@locksy.dev">support@locksy.dev</a> within 14 days with your checkout receipt. Upon verification, any erroneous duplicate payment will be refunded directly to your original payment method.
                        </p>
                    </DocSection>

                    {/* Section 5: Technical Assistance */}
                    <DocSection id="dedicated-technical-support" index={5} title="Dedicated Technical Support">
                        <p>
                            While purchases are non-refundable, our technical support is committed to ensuring you enjoy Locksy Pro. If you experience unexpected bugs or difficulty activating your license, our development team is available to assist you directly.
                        </p>
                    </DocSection>

                    {/* FAQ Section */}
                    <DocSection id="frequently-asked-questions" icon={HelpCircle} title="Frequently Asked Questions">
                        <p>
                            Quick answers regarding our digital sales policy and billing practices.
                        </p>
                        <div className="space-y-3">
                            {FAQS.map((faq, idx) => {
                                const isOpen = openFaq === idx
                                return (
                                    <div
                                        key={idx}
                                        className="overflow-hidden rounded-xl border border-border bg-background"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                                            aria-expanded={isOpen}
                                            className="flex w-full items-center justify-between gap-4 p-5 text-left text-[15px] font-medium text-foreground transition-colors hover:text-foreground/80"
                                        >
                                            <span>{faq.q}</span>
                                            <ChevronDown
                                                className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                            />
                                        </button>
                                        {isOpen && (
                                            <div className="border-t border-border px-5 pb-5 pt-4 text-sm leading-relaxed text-muted-foreground">
                                                {faq.a}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </DocSection>

                    {/* Support CTA */}
                    <div className="surface p-6 text-center md:p-9">
                        <h2 className="text-xl font-semibold leading-snug text-foreground md:text-2xl text-balance">
                            Have questions before purchasing?
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                            We encourage you to reach out to us with any technical or feature questions before completing your purchase.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                            <a href="mailto:support@locksy.dev" className="btn-primary">
                                <Mail className="h-4 w-4" />
                                <span>Contact Developer</span>
                            </a>
                            <Link href="/contact" className="btn-secondary">
                                <span>Visit Support Page</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </DocLayout>
            </main>

            <Footer />
        </div>
    )
}
