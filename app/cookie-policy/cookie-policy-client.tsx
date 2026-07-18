"use client"

import Link from "next/link"
import {
    Cookie, Shield, Settings, Globe, BarChart3,
    Eye, Trash2, ArrowLeft, CheckCircle, XCircle, Info
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const COOKIE_TYPES = [
    {
        icon: Settings,
        name: "Essential Cookies",
        required: true,
        color: "from-blue-500 to-cyan-500",
        description: "These cookies are strictly necessary for the website to function properly. They enable core functionality such as page navigation, theme preference persistence, and security features. These cookies do not store any personally identifiable information.",
        examples: [
            { name: "Theme preference", purpose: "Remembers your light/dark mode selection", duration: "Persistent", provider: "Locksy (local)" },
            { name: "Cookie consent", purpose: "Stores your cookie consent preference", duration: "1 year", provider: "Locksy (local)" },
        ]
    },
    {
        icon: BarChart3,
        name: "Analytics Cookies",
        required: false,
        color: "from-purple-500 to-indigo-500",
        description: "Locksy does NOT use any analytics cookies. We do not use Google Analytics, Hotjar, Mixpanel, or any other analytics tracking service. We do not track your behavior, page views, click patterns, or session duration. We believe your browsing habits are your own business.",
        examples: []
    },
    {
        icon: Globe,
        name: "Third-Party Cookies",
        required: false,
        color: "from-amber-500 to-orange-500",
        description: "Some third-party services embedded on our website may set their own cookies. We minimize these as much as possible. The primary third-party content on our site is a YouTube video embed on the homepage, which may set cookies when played.",
        examples: [
            { name: "YouTube (Google)", purpose: "Video playback, view count tracking, recommendations", duration: "Varies", provider: "Google / YouTube" },
            { name: "Vercel Analytics", purpose: "Basic page performance metrics (no personal data)", duration: "Session", provider: "Vercel" },
        ]
    },
    {
        icon: Eye,
        name: "Advertising Cookies",
        required: false,
        color: "from-rose-500 to-pink-500",
        description: "We may display non-intrusive advertisements through the Google AdSense network to support the ongoing development and maintenance of Locksy. These advertising cookies are managed by Google and are used to show you relevant ads based on your browsing interests. You can opt out of personalized advertising at any time.",
        examples: [
            { name: "Google AdSense", purpose: "Display relevant advertisements to support the project", duration: "Varies", provider: "Google" },
        ]
    }
]

export default function CookiePolicyClient() {
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
                                <span className="text-foreground font-medium">Cookie Policy</span>
                            </nav>

                            <div className="text-center space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-sm font-medium text-amber-600 backdrop-blur-sm">
                                    <Cookie className="h-4 w-4" />
                                    Transparency
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black leading-tight">
                                    Cookie{" "}
                                    <span className="bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary bg-clip-text text-transparent">
                                        Policy
                                    </span>
                                </h1>
                                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                                    A clear and honest explanation of how cookies and similar technologies are used on the Locksy website.
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Last updated: April 28, 2026
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Quick Summary */}
                    <section className="py-8">
                        <div className="max-w-5xl mx-auto px-4 md:px-6">
                            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl p-8 md:p-10 backdrop-blur-sm shadow-2xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-green-500/20 p-3 rounded-2xl">
                                        <Shield className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-black">Quick Summary</h2>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {[
                                        { text: "No analytics tracking cookies", good: true },
                                        { text: "Minimal essential cookies only", good: true },
                                        { text: "No selling of cookie data", good: true },
                                        { text: "YouTube embed may set cookies", good: false },
                                        { text: "Full control to manage cookies", good: true },
                                        { text: "AdSense cookies for ads (opt-out available)", good: false },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-xl p-4">
                                            {item.good ? (
                                                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                                            ) : (
                                                <Info className="h-5 w-5 text-amber-500 flex-shrink-0" />
                                            )}
                                            <span className="font-semibold text-sm">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* What Are Cookies */}
                    <section className="py-12">
                        <div className="max-w-5xl mx-auto px-4 md:px-6">
                            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-lg border border-border">
                                <h2 className="text-3xl font-black mb-6">What Are Cookies?</h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>
                                        Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and supply information to the website owners.
                                    </p>
                                    <p>
                                        Cookies can be &quot;persistent&quot; (remaining on your device until they expire or you delete them) or &quot;session&quot; cookies (deleted when you close your browser). They can be set by the website you are visiting (&quot;first-party cookies&quot;) or by other websites that serve content on that page (&quot;third-party cookies&quot;).
                                    </p>
                                    <p>
                                        It is important to note that the <strong>Locksy browser extension itself does not use any cookies</strong>. This policy applies only to the Locksy marketing website (www.locksy.dev). The extension stores all data locally using the browser&apos;s built-in secure storage APIs (chrome.storage), which are completely separate from website cookies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Cookie Types */}
                    <section className="py-12">
                        <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-8">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl md:text-5xl font-black mb-4">
                                    Types of{" "}
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        Cookies We Use
                                    </span>
                                </h2>
                            </div>

                            {COOKIE_TYPES.map((type, idx) => {
                                const Icon = type.icon
                                return (
                                    <div
                                        key={idx}
                                        className="group relative bg-card rounded-3xl p-8 md:p-10 shadow-lg border border-border hover:shadow-2xl transition-all duration-300"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-3xl`} />
                                        <div className="relative">
                                            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                                                <div className="flex items-center gap-4">
                                                    <div className={`inline-flex w-14 h-14 items-center justify-center bg-gradient-to-br ${type.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                        <Icon className="h-7 w-7 text-white" />
                                                    </div>
                                                    <h3 className="font-bold text-2xl">{type.name}</h3>
                                                </div>
                                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${type.required
                                                    ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                                                    : 'bg-neutral-500/10 text-neutral-600 border border-neutral-500/20'
                                                    }`}>
                                                    {type.required ? 'Required' : 'Optional'}
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed mb-6">{type.description}</p>

                                            {type.examples.length > 0 && (
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-sm">
                                                        <thead>
                                                            <tr className="border-b border-border">
                                                                <th className="text-left py-3 px-4 font-bold">Cookie / Service</th>
                                                                <th className="text-left py-3 px-4 font-bold">Purpose</th>
                                                                <th className="text-left py-3 px-4 font-bold">Duration</th>
                                                                <th className="text-left py-3 px-4 font-bold">Provider</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {type.examples.map((example, eIdx) => (
                                                                <tr key={eIdx} className="border-b border-border/50">
                                                                    <td className="py-3 px-4 font-medium">{example.name}</td>
                                                                    <td className="py-3 px-4 text-muted-foreground">{example.purpose}</td>
                                                                    <td className="py-3 px-4 text-muted-foreground">{example.duration}</td>
                                                                    <td className="py-3 px-4 text-muted-foreground">{example.provider}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>

                    {/* Managing Cookies */}
                    <section className="py-12">
                        <div className="max-w-5xl mx-auto px-4 md:px-6">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl md:text-5xl font-black mb-4">
                                    Managing Your{" "}
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        Cookies
                                    </span>
                                </h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
                                    <Settings className="h-10 w-10 text-primary mb-4" />
                                    <h3 className="text-xl font-black mb-4">Browser Settings</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        Most web browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies, accept only certain cookies, or delete cookies when you close your browser.
                                    </p>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                            Chrome: Settings → Privacy and Security → Cookies
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                            Firefox: Settings → Privacy & Security → Cookies
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                            Edge: Settings → Cookies and site permissions
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
                                    <Trash2 className="h-10 w-10 text-primary mb-4" />
                                    <h3 className="text-xl font-black mb-4">Opt-Out Options</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        You can opt out of personalized advertising and manage your ad preferences through these industry tools:
                                    </p>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ad Settings</a>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                            <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Network Advertising Initiative</a>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                            <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Digital Advertising Alliance</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Note about disabling cookies */}
                            <div className="mt-8 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <Info className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-lg mb-2">Please Note</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Disabling essential cookies may affect the functionality of this website. For example, your theme preference (light/dark mode) may not persist between visits. The Locksy browser extension itself is unaffected by cookie settings as it uses separate browser storage APIs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact & Related */}
                    <section className="py-16">
                        <div className="max-w-5xl mx-auto px-4 md:px-6">
                            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 rounded-3xl p-8 md:p-10 text-center mb-10">
                                <h2 className="text-2xl md:text-3xl font-black mb-4">Questions About Our Cookie Policy?</h2>
                                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                                    If you have any questions or concerns about how we use cookies, please don&apos;t hesitate to reach out.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all hover:scale-105 font-bold text-lg"
                                >
                                    Contact Us
                                </Link>
                            </div>

                            {/* Related Pages */}
                            <div className="grid md:grid-cols-3 gap-6">
                                <Link href="/privacy-policy" className="group bg-card rounded-2xl p-6 shadow-lg border border-border hover:border-primary/30 hover:shadow-xl transition-all">
                                    <Shield className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                                    <h3 className="font-bold text-lg mb-2">Privacy Policy</h3>
                                    <p className="text-sm text-muted-foreground">Learn how we protect your data and privacy.</p>
                                </Link>
                                <Link href="/disclaimer" className="group bg-card rounded-2xl p-6 shadow-lg border border-border hover:border-primary/30 hover:shadow-xl transition-all">
                                    <Info className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                                    <h3 className="font-bold text-lg mb-2">Disclaimer</h3>
                                    <p className="text-sm text-muted-foreground">Read our legal disclaimer and limitations.</p>
                                </Link>
                                <Link href="/terms-of-service" className="group bg-card rounded-2xl p-6 shadow-lg border border-border hover:border-primary/30 hover:shadow-xl transition-all">
                                    <Globe className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                                    <h3 className="font-bold text-lg mb-2">Terms of Service</h3>
                                    <p className="text-sm text-muted-foreground">Read our terms and conditions of use.</p>
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
