"use client"

import Link from "next/link"
import {
    AlertTriangle, Shield, ExternalLink, FileText, Scale,
    Info, BookOpen, ArrowLeft, CheckCircle
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const DISCLAIMER_SECTIONS = [
    {
        icon: Info,
        title: "General Information",
        color: "from-blue-500 to-cyan-500",
        content: [
            "The information provided on the Locksy website (www.locksy.dev) and associated browser extension is for general informational purposes only. While we strive to keep all information accurate, complete, and up to date, we make no representations or warranties of any kind — express or implied — about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on this website.",
            "Any reliance you place on such information is therefore strictly at your own risk. In no event shall Locksy, its developer, or contributors be liable for any loss or damage, including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website or the Locksy extension."
        ]
    },
    {
        icon: Shield,
        title: "Security Claims",
        color: "from-purple-500 to-indigo-500",
        content: [
            "Locksy uses PBKDF2 with 600,000 iterations for password hashing, which meets and exceeds current OWASP 2023 recommendations. However, no security measure is 100% infallible. While we implement industry-standard encryption and multiple security layers, we cannot guarantee absolute protection against all possible attack vectors.",
            "Users are responsible for maintaining the confidentiality of their master password. If you forget your password, it cannot be recovered due to the zero-knowledge architecture of the extension. We strongly recommend using a unique, strong password and keeping a secure backup.",
            "The term \"military-grade encryption\" used throughout this website refers to PBKDF2 with SHA-256 hashing at 600,000 iterations — a key-derivation standard recognized by NIST and widely used in defense and financial applications. It is not a certification or endorsement by any military organization."
        ]
    },
    {
        icon: ExternalLink,
        title: "External Links & Third-Party Services",
        color: "from-green-500 to-emerald-500",
        content: [
            "This website contains links to external websites and services, including but not limited to the Chrome Web Store, Firefox Add-ons, Microsoft Edge Add-ons, GitHub, YouTube, and Product Hunt. These links are provided for your convenience and informational purposes only.",
            "Locksy does not control these external sites and is not responsible for their content, privacy practices, or availability. The inclusion of any external link does not imply endorsement, recommendation, or affiliation with the linked website or its operators.",
            "We encourage you to review the privacy policy and terms of service of any third-party website you visit through links on our site."
        ]
    },
    {
        icon: BookOpen,
        title: "Blog & Educational Content",
        color: "from-amber-500 to-orange-500",
        content: [
            "The blog posts and educational articles published on the Locksy website are written to inform and educate readers about browser security, privacy best practices, and related topics. This content is based on publicly available information, industry standards, and the professional knowledge of our contributors.",
            "Blog content should not be considered as professional security consulting, legal advice, or a substitute for qualified professional guidance. The cybersecurity landscape evolves rapidly, and information may become outdated. We recommend verifying critical security decisions with a qualified professional.",
            "Product comparisons, benchmarks, and security assessments presented in our blog articles reflect information available at the time of publication and may not reflect subsequent updates to competing products."
        ]
    },
    {
        icon: Scale,
        title: "Limitation of Liability",
        color: "from-rose-500 to-pink-500",
        content: [
            "To the fullest extent permitted by applicable law, Locksy, its developer (Vansh Sethi), and any contributors shall not be held liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of (or inability to use) the Locksy browser extension or this website.",
            "This includes, but is not limited to, damages for loss of profits, goodwill, data, or other intangible losses, even if Locksy has been advised of the possibility of such damages.",
            "Locksy is provided \"as is\" and \"as available\" without any warranties of any kind. The entire risk arising out of the use of the extension remains with you."
        ]
    },
    {
        icon: FileText,
        title: "Intellectual Property",
        color: "from-violet-500 to-purple-500",
        content: [
            "The Locksy name, logo, and associated branding are the intellectual property of the Locksy project. The Locksy browser extension source code is licensed under the MIT License and is available on GitHub for public review, audit, and contribution.",
            "Content on this website, including but not limited to text, graphics, images, blog posts, and documentation, is the property of Locksy unless otherwise stated. Unsplash images used in blog posts are used under the Unsplash License and are credited to their respective photographers.",
            "You may share or reference our content for non-commercial educational purposes with proper attribution and a link back to the original page on www.locksy.dev."
        ]
    }
]

export default function DisclaimerClient() {
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
                    <section className="pt-32 pb-16 md:pt-40 md:pb-24">
                        <div className="max-w-7xl mx-auto px-4 md:px-6">
                            {/* Breadcrumb */}
                            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                                <span>/</span>
                                <span className="text-foreground font-medium">Disclaimer</span>
                            </nav>

                            <div className="text-center space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-sm font-medium text-amber-600 backdrop-blur-sm">
                                    <AlertTriangle className="h-4 w-4" />
                                    Legal Notice
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black leading-tight">
                                    <span className="bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary bg-clip-text text-transparent">
                                        Disclaimer
                                    </span>
                                </h1>
                                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                                    Important legal information about the use of the Locksy website and browser extension. Please read this disclaimer carefully before using our services.
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Last updated: April 28, 2026
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Content */}
                    <section className="py-16 md:py-24">
                        <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-12">
                            {DISCLAIMER_SECTIONS.map((section, idx) => {
                                const Icon = section.icon
                                return (
                                    <div
                                        key={idx}
                                        className="group relative bg-card rounded-3xl p-8 md:p-10 shadow-lg border border-border hover:shadow-2xl transition-all duration-300"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-3xl`} />
                                        <div className="relative">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className={`inline-flex w-14 h-14 items-center justify-center bg-gradient-to-br ${section.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                    <Icon className="h-7 w-7 text-white" />
                                                </div>
                                                <h2 className="font-bold text-2xl md:text-3xl">{section.title}</h2>
                                            </div>
                                            <div className="space-y-4">
                                                {section.content.map((paragraph, pIdx) => (
                                                    <p key={pIdx} className="text-muted-foreground leading-relaxed">
                                                        {paragraph}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            {/* Acceptance & Changes Notice */}
                            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 rounded-3xl p-8 md:p-10">
                                <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-3">
                                    <CheckCircle className="h-8 w-8 text-primary" />
                                    Acceptance & Changes
                                </h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>
                                        By using the Locksy website or browser extension, you acknowledge that you have read, understood, and agree to be bound by this Disclaimer. If you do not agree with any part of this disclaimer, please discontinue use of our website and extension.
                                    </p>
                                    <p>
                                        We reserve the right to update or modify this Disclaimer at any time without prior notice. Changes will be posted on this page with an updated revision date. Your continued use of the website and extension after any changes constitutes your acceptance of the revised Disclaimer.
                                    </p>
                                    <p>
                                        If you have any questions or concerns about this Disclaimer, please <Link href="/contact" className="text-primary hover:underline font-semibold">contact us</Link> or visit our <a href="https://github.com/vansh-121/Locksy/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">GitHub Issues</a> page.
                                    </p>
                                </div>
                            </div>

                            {/* Related Pages */}
                            <div className="grid md:grid-cols-3 gap-6">
                                <Link href="/privacy-policy" className="group bg-card rounded-2xl p-6 shadow-lg border border-border hover:border-primary/30 hover:shadow-xl transition-all">
                                    <Shield className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                                    <h3 className="font-bold text-lg mb-2">Privacy Policy</h3>
                                    <p className="text-sm text-muted-foreground">Learn how we protect your data and privacy.</p>
                                </Link>
                                <Link href="/terms-of-service" className="group bg-card rounded-2xl p-6 shadow-lg border border-border hover:border-primary/30 hover:shadow-xl transition-all">
                                    <FileText className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                                    <h3 className="font-bold text-lg mb-2">Terms of Service</h3>
                                    <p className="text-sm text-muted-foreground">Read our terms and conditions of use.</p>
                                </Link>
                                <Link href="/contact" className="group bg-card rounded-2xl p-6 shadow-lg border border-border hover:border-primary/30 hover:shadow-xl transition-all">
                                    <Info className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                                    <h3 className="font-bold text-lg mb-2">Contact Us</h3>
                                    <p className="text-sm text-muted-foreground">Have questions? Reach out to our team.</p>
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    )
}
