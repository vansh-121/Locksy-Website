"use client"

import Link from "next/link"
import {
    Cookie, Shield, Settings, Globe, BarChart3,
    Eye, Trash2, CheckCircle, Info, SlidersHorizontal
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageHero, DocLayout, DocSection, RelatedLinks, Callout, IconTile } from "@/components/page-shell"

const COOKIE_TYPES = [
    {
        icon: Settings,
        name: "Essential Cookies",
        required: true,
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
        description: "We do not use Google Analytics, Hotjar, Mixpanel, or invasive behavioural profiling tools, and we set no analytics cookies. We do not track your individual click patterns or personal browsing habits across sites. For website performance, we use cookieless Vercel Web Analytics to measure aggregated traffic and Web Vitals without storing IP addresses, alongside an anonymous per-article view tally on our blog. Neither sets tracking cookies or stores personal data.",
        examples: []
    },
    {
        icon: Globe,
        name: "Third-Party Cookies",
        required: false,
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
        description: "We may display non-intrusive advertisements through the Google AdSense network to support the ongoing development and maintenance of Locksy. These advertising cookies are managed by Google and are used to show you relevant ads based on your browsing interests. You can opt out of personalized advertising at any time.",
        examples: [
            { name: "Google AdSense", purpose: "Display relevant advertisements to support the project", duration: "Varies", provider: "Google" },
        ]
    }
]

const SUMMARY_ITEMS = [
    { text: "No analytics tracking cookies", good: true },
    { text: "Minimal essential cookies only", good: true },
    { text: "No selling of cookie data", good: true },
    { text: "YouTube embed may set cookies", good: false },
    { text: "Full control to manage cookies", good: true },
    { text: "AdSense cookies for ads (opt-out available)", good: false },
]

const TOC = [
    { id: "quick-summary", label: "Quick Summary" },
    { id: "what-are-cookies", label: "What Are Cookies?" },
    { id: "types-of-cookies-we-use", label: "Types of Cookies We Use" },
    { id: "managing-your-cookies", label: "Managing Your Cookies" },
]

export default function CookiePolicyClient() {
    return (
        <>
            <Header />

            <main className="relative">
                <PageHero
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "Cookie Policy" }]}
                    eyebrow="Legal"
                    title="Cookie Policy"
                    description="A clear and honest explanation of how cookies and similar technologies are used on the Locksy website."
                    meta={<span>Last updated: April 28, 2026</span>}
                />

                <DocLayout toc={TOC}>
                    {/* Quick Summary */}
                    <DocSection id="quick-summary" icon={Shield} title="Quick Summary">
                        <div className="grid gap-3 sm:grid-cols-2">
                            {SUMMARY_ITEMS.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                                    {item.good ? (
                                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                                    ) : (
                                        <Info className="h-4 w-4 flex-shrink-0 text-amber-500" />
                                    )}
                                    <span className="text-sm font-medium text-foreground">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </DocSection>

                    {/* What Are Cookies */}
                    <DocSection id="what-are-cookies" icon={Cookie} title="What Are Cookies?">
                        <p>
                            Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and supply information to the website owners.
                        </p>
                        <p>
                            Cookies can be &quot;persistent&quot; (remaining on your device until they expire or you delete them) or &quot;session&quot; cookies (deleted when you close your browser). They can be set by the website you are visiting (&quot;first-party cookies&quot;) or by other websites that serve content on that page (&quot;third-party cookies&quot;).
                        </p>
                        <p>
                            It is important to note that the <strong>Locksy browser extension itself does not use any cookies</strong>. This policy applies only to the Locksy marketing website (www.locksy.dev). The extension stores all data locally using the browser&apos;s built-in secure storage APIs (chrome.storage), which are completely separate from website cookies.
                        </p>
                    </DocSection>

                    {/* Cookie Types */}
                    <DocSection id="types-of-cookies-we-use" icon={Info} title="Types of Cookies We Use">
                        <div className="space-y-4">
                            {COOKIE_TYPES.map((type, idx) => (
                                <div key={idx} className="rounded-xl border border-border bg-background p-5 md:p-6">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <IconTile icon={type.icon} />
                                            <h3 className="!mt-0">{type.name}</h3>
                                        </div>
                                        <span
                                            className={`rounded-full border px-3 py-1 text-xs font-medium ${type.required
                                                ? "border-highlight/30 bg-highlight/10 text-highlight"
                                                : "border-border bg-muted text-muted-foreground"
                                                }`}
                                        >
                                            {type.required ? "Required" : "Optional"}
                                        </span>
                                    </div>
                                    <p className="mt-4">{type.description}</p>

                                    {type.examples.length > 0 && (
                                        <div className="mt-5 overflow-hidden rounded-2xl border border-border">
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm">
                                                    <thead className="bg-muted/50 text-foreground">
                                                        <tr>
                                                            <th className="px-4 py-3 text-left font-medium">Cookie / Service</th>
                                                            <th className="px-4 py-3 text-left font-medium">Purpose</th>
                                                            <th className="px-4 py-3 text-left font-medium">Duration</th>
                                                            <th className="px-4 py-3 text-left font-medium">Provider</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {type.examples.map((example, eIdx) => (
                                                            <tr key={eIdx} className="border-t border-border">
                                                                <td className="px-4 py-3 font-medium text-foreground">{example.name}</td>
                                                                <td className="px-4 py-3">{example.purpose}</td>
                                                                <td className="px-4 py-3">{example.duration}</td>
                                                                <td className="px-4 py-3">{example.provider}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </DocSection>

                    {/* Managing Cookies */}
                    <DocSection id="managing-your-cookies" icon={SlidersHorizontal} title="Managing Your Cookies">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-border bg-background p-5 md:p-6">
                                <div className="flex items-center gap-3">
                                    <IconTile icon={Settings} />
                                    <h3 className="!mt-0">Browser Settings</h3>
                                </div>
                                <p className="mt-4">
                                    Most web browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies, accept only certain cookies, or delete cookies when you close your browser.
                                </p>
                                <ul className="mt-4 text-sm">
                                    <li>Chrome: Settings → Privacy and Security → Cookies</li>
                                    <li>Firefox: Settings → Privacy &amp; Security → Cookies</li>
                                    <li>Edge: Settings → Cookies and site permissions</li>
                                </ul>
                            </div>

                            <div className="rounded-xl border border-border bg-background p-5 md:p-6">
                                <div className="flex items-center gap-3">
                                    <IconTile icon={Trash2} />
                                    <h3 className="!mt-0">Opt-Out Options</h3>
                                </div>
                                <p className="mt-4">
                                    You can opt out of personalized advertising and manage your ad preferences through these industry tools:
                                </p>
                                <ul className="mt-4 text-sm">
                                    <li><a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a></li>
                                    <li><a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer">Network Advertising Initiative</a></li>
                                    <li><a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Note about disabling cookies */}
                        <Callout tone="warning" icon={Info} title="Please Note">
                            <p>
                                Disabling essential cookies may affect the functionality of this website. For example, your theme preference (light/dark mode) may not persist between visits. The Locksy browser extension itself is unaffected by cookie settings as it uses separate browser storage APIs.
                            </p>
                        </Callout>
                    </DocSection>

                    {/* Contact */}
                    <div className="surface p-6 text-center md:p-9">
                        <h2 className="text-xl font-semibold leading-snug text-foreground md:text-2xl text-balance">Questions About Our Cookie Policy?</h2>
                        <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                            If you have any questions or concerns about how we use cookies, please don&apos;t hesitate to reach out.
                        </p>
                        <div className="mt-6 flex justify-center">
                            <Link href="/contact" className="btn-primary">
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    {/* Related Pages */}
                    <RelatedLinks
                        links={[
                            { href: "/privacy-policy", title: "Privacy Policy", description: "Learn how we protect your data and privacy." },
                            { href: "/disclaimer", title: "Disclaimer", description: "Read our legal disclaimer and limitations." },
                            { href: "/terms-of-service", title: "Terms of Service", description: "Read our terms and conditions of use." },
                        ]}
                    />
                </DocLayout>
            </main>

            <Footer />
        </>
    )
}
