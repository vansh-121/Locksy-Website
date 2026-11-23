"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Shield, Lock, CheckCircle, XCircle, Database, Eye, AlertTriangle, FileText, Globe, Trash2, Clock, Server, Key, Camera, EyeOff, Scale, Mail, Eraser, HardDrive } from "lucide-react"
import { PageHero, DocLayout, DocSection, Callout, IconTile } from "@/components/page-shell"

interface PrivacyPolicyClientProps {
    lastUpdated: string
}

const TOC = [
    { id: "overview-single-purpose", label: "Overview & Single Purpose" },
    { id: "data-collection-handling", label: "Data Collection & Handling" },
    { id: "storage-retention-security", label: "Storage, Retention & Security" },
    { id: "data-sharing-third-parties", label: "Data Sharing & Third Parties" },
    { id: "permissions-justification", label: "Permissions Justification" },
    { id: "how-to-delete-your-data", label: "How to Delete Your Data" },
    { id: "website-privacy-policy", label: "Website Privacy Policy" },
    { id: "legal-compliance", label: "Legal Compliance" },
    { id: "questions-support", label: "Questions & Support" },
]

export default function PrivacyPolicyClient({ lastUpdated }: PrivacyPolicyClientProps) {
    return (
        <>
            <Header />

            <main className="relative">
                <PageHero
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
                    eyebrow="Legal"
                    title="Privacy Policy"
                    description="Comprehensive transparency on how Locksy handles, stores, and protects your data."
                    meta={<span>Last updated: {lastUpdated}</span>}
                />

                {/* TL;DR Summary */}
                <div className="mx-auto max-w-6xl px-4 pb-12 md:px-6 md:pb-16">
                    <div className="surface p-6 md:p-9">
                        <div className="flex items-center gap-4">
                            <IconTile icon={Lock} />
                            <h2 className="text-xl font-semibold leading-snug text-foreground md:text-2xl">The Privacy Commitment</h2>
                        </div>
                        <div className="mt-6 grid gap-3 md:grid-cols-2">
                            {[
                                "Local-First: Extension data stays on YOUR device only",
                                "PBKDF2 SHA-256 with 600,000 iterations for master passwords",
                                "No selling, renting, or brokering of user data ever",
                                "No telemetry, tracking, or ad trackers inside the extension",
                                "Transient tab URLs deleted immediately upon unlock",
                                "Offline-First: Pro licensing strictly verifies license keys"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-highlight" />
                                    <span className="text-sm font-medium text-foreground">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <DocLayout toc={TOC}>
                    {/* 1. Overview & Single Purpose */}
                    <DocSection id="overview-single-purpose" icon={FileText} title="Overview & Single Purpose">
                        <p>
                            Locksy (&quot;the Extension&quot;) has a single, focused purpose: <strong>to allow users to lock, password-protect, and shield sensitive browser tabs, windows, and domain navigation.</strong>
                        </p>
                        <p>
                            We adhere to a strict local-first, privacy-by-design architecture. All core tab locking, biometric authentication, domain protection, and intruder detection algorithms execute strictly within your local browser sandbox.
                        </p>
                        <Callout icon={FileText}>
                            <p>
                                <strong>Important Scope Distinction:</strong> This Privacy Policy covers the <strong>Locksy Browser Extension</strong> and its companion documentation on this website. The Extension operates locally on your machine. Our marketing website (<code>locksy.dev</code>) is covered transparently in Section 7.
                            </p>
                        </Callout>
                    </DocSection>

                    {/* 2. User Data Collection and Handling */}
                    <DocSection id="data-collection-handling" icon={Database} title="Data Collection & Handling">
                        <p>What we collect, why we collect it, and how it is processed</p>

                        <div className="grid gap-4 md:grid-cols-2">
                            {[
                                {
                                    icon: Key,
                                    title: "Master Password & PIN",
                                    collection: "User input during initial setup or password updates.",
                                    handling: "Cryptographically hashed using PBKDF2 with SHA-256 (600,000 iterations) with a unique salt. Plaintext passwords are NEVER stored, logged, or transmitted anywhere.",
                                    storage: "Stored locally in chrome.storage.local.",
                                },
                                {
                                    icon: Eye,
                                    title: "Locked Tab URLs & Tab IDs",
                                    collection: "Captured only when you explicitly lock a tab or trigger a domain rule.",
                                    handling: "Used solely to display the lock overlay and restore your destination page upon successful authentication. Deleted immediately upon tab unlock or closure.",
                                    storage: "Stored temporarily in chrome.storage.local.",
                                },
                                {
                                    icon: Shield,
                                    title: "Security State & Cooldown Timers",
                                    collection: "Generated during failed unlock attempts.",
                                    handling: "Maintains attempt counters and lockout timestamps to enforce brute-force protection against unauthorized guessing.",
                                    storage: "Stored in memory and chrome.storage.local.",
                                },
                                {
                                    icon: Camera,
                                    title: "Intruder Photo Capture (Optional)",
                                    collection: "Captured via webcam only if explicitly enabled by the user.",
                                    handling: "Snaps a local photo when repeated failed unlock attempts occur. Photos are stored locally and displayed only in the user's local Security Dashboard.",
                                    storage: "100% on-device storage. Never uploaded or transmitted.",
                                },
                                {
                                    icon: EyeOff,
                                    title: "Privacy Blur Shield Rules",
                                    collection: "Configured by user in the Privacy Blur Manager.",
                                    handling: "Applies CSS-based element masking (credit cards, passwords, emails) directly inside the page DOM via local content scripts.",
                                    storage: "Stored locally in chrome.storage.local.",
                                },
                                {
                                    icon: Server,
                                    title: "Pro License Key (Pro Users Only)",
                                    collection: "Entered by user upon purchasing Locksy Pro.",
                                    handling: "Transmitted securely over HTTPS to our license validation API proxy (locksy-api.vansh-sethi98760.workers.dev) to check validity with Polar.sh. Zero browsing data is sent.",
                                    storage: "Stored locally in chrome.storage.local.",
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="rounded-xl border border-border bg-background p-5">
                                    <IconTile icon={item.icon} />
                                    <h3 className="!mt-4">{item.title}</h3>
                                    <p className="mt-3 text-sm"><strong>Collection:</strong> {item.collection}</p>
                                    <p className="mt-2 text-sm"><strong>Handling:</strong> {item.handling}</p>
                                    <p className="mt-2 text-sm"><strong>Storage:</strong> {item.storage}</p>
                                </div>
                            ))}
                        </div>

                        {/* What We DO NOT Collect */}
                        <div className="rounded-xl border border-border bg-background p-5 md:p-6">
                            <div className="flex items-center gap-3">
                                <IconTile icon={XCircle} />
                                <h3 className="!mt-0">Data We DO NOT Collect</h3>
                            </div>
                            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                {[
                                    "Browsing history",
                                    "Search queries",
                                    "Form entries & inputs",
                                    "Credit card numbers",
                                    "Names, emails, phones",
                                    "Advertising identifiers",
                                    "Tracking cookies",
                                    "Behavioral analytics"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 rounded-xl border border-border bg-card p-3">
                                        <XCircle className="h-4 w-4 flex-shrink-0 text-red-500" />
                                        <span className="text-sm font-medium text-foreground">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DocSection>

                    {/* 3. Storage, Retention, and Security */}
                    <DocSection id="storage-retention-security" icon={Clock} title="Storage, Retention & Security">
                        <p>Clear timeframes for how long each data point is kept</p>

                        <div className="overflow-hidden rounded-2xl border border-border">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-left text-sm">
                                    <thead className="bg-muted/50 text-foreground">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">Data Type</th>
                                            <th className="px-4 py-3 font-medium">Storage Location</th>
                                            <th className="px-4 py-3 font-medium">Retention Period</th>
                                            <th className="px-4 py-3 font-medium">Deletion Trigger</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t border-border">
                                            <td className="px-4 py-3 font-medium text-foreground">Locked Tab URLs &amp; IDs</td>
                                            <td className="px-4 py-3 font-mono text-xs">chrome.storage.local</td>
                                            <td className="px-4 py-3">Transient (Temporary)</td>
                                            <td className="px-4 py-3">Deleted immediately upon unlock or tab closure</td>
                                        </tr>
                                        <tr className="border-t border-border">
                                            <td className="px-4 py-3 font-medium text-foreground">Authentication Sessions</td>
                                            <td className="px-4 py-3 font-mono text-xs">Service Worker Memory</td>
                                            <td className="px-4 py-3">10 minutes of inactivity</td>
                                            <td className="px-4 py-3">Auto-expires on timeout or browser shutdown</td>
                                        </tr>
                                        <tr className="border-t border-border">
                                            <td className="px-4 py-3 font-medium text-foreground">Intruder Webcam Photos</td>
                                            <td className="px-4 py-3 font-mono text-xs">chrome.storage.local</td>
                                            <td className="px-4 py-3">Local persistent</td>
                                            <td className="px-4 py-3">User clicks &quot;Clear Log&quot; or uninstalls extension</td>
                                        </tr>
                                        <tr className="border-t border-border">
                                            <td className="px-4 py-3 font-medium text-foreground">Hashed Passwords &amp; Settings</td>
                                            <td className="px-4 py-3 font-mono text-xs">chrome.storage.local</td>
                                            <td className="px-4 py-3">Until changed by user</td>
                                            <td className="px-4 py-3">User resets password, clears data, or uninstalls</td>
                                        </tr>
                                        <tr className="border-t border-border">
                                            <td className="px-4 py-3 font-medium text-foreground">Cooldown Lockout Timers</td>
                                            <td className="px-4 py-3 font-mono text-xs">chrome.storage.local</td>
                                            <td className="px-4 py-3">Up to 30 minutes</td>
                                            <td className="px-4 py-3">Automatically expires when cooldown ends</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </DocSection>

                    {/* 4. Data Sharing and Third Parties (Mandatory for Purple Nickel) */}
                    <DocSection id="data-sharing-third-parties" icon={Globe} title="Data Sharing & Third Parties">
                        <p>Comprehensive disclosure of all parties data is shared with</p>

                        <div className="rounded-xl border border-border bg-background p-5">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                                <h3 className="!mt-0">Strict No-Sale and No-Transfer Policy</h3>
                            </div>
                            <p className="mt-3 text-sm md:pl-8">
                                We do not sell, rent, trade, or monetize user data under any circumstances. User data is never transferred or shared with data brokers, advertisers, tracking networks, or credit reporting agencies.
                            </p>
                        </div>

                        <div className="rounded-xl border border-border bg-background p-5">
                            <h3 className="!mt-0 flex items-center gap-3">
                                <Server className="h-5 w-5 flex-shrink-0 text-highlight" />
                                All Parties and Service Providers Involved:
                            </h3>
                            <div className="mt-4 space-y-3 md:pl-8">
                                <div className="rounded-xl border border-border bg-card p-4">
                                    <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                        <span className="font-medium text-foreground">1. Cloudflare Workers (locksy-api.vansh-sethi98760.workers.dev)</span>
                                        <span className="w-fit rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">Pro License Validation</span>
                                    </div>
                                    <p className="text-sm leading-relaxed">
                                        Used exclusively as a secure, serverless API proxy when a user activates Locksy Pro. It relays the license key to Polar.sh to verify entitlement. <strong>No browsing URLs, passwords, or personal telemetry are transmitted.</strong>
                                    </p>
                                </div>

                                <div className="rounded-xl border border-border bg-card p-4">
                                    <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                        <span className="font-medium text-foreground">2. Polar.sh</span>
                                        <span className="w-fit rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">Merchant of Record</span>
                                    </div>
                                    <p className="text-sm leading-relaxed">
                                        Handles order processing and license generation for Pro purchases. Locksy queries the Polar API via our Cloudflare proxy to validate whether a key is active. All financial transactions occur on Polar.sh.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-border bg-card p-4">
                                    <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                        <span className="font-medium text-foreground">3. Browser Native APIs (Google Chrome)</span>
                                        <span className="w-fit rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">Local Storage</span>
                                    </div>
                                    <p className="text-sm leading-relaxed">
                                        Locksy uses Chrome&apos;s sandboxed <code>chrome.storage.local</code> API. Data remains isolated within your local browser profile.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Callout tone="success" icon={CheckCircle}>
                            <p>Free tier users experience zero external server communication. The free tier operates 100% offline.</p>
                        </Callout>
                    </DocSection>

                    {/* 5. Permissions Explained */}
                    <DocSection id="permissions-justification" icon={Eye} title="Permissions Justification">
                        <p>Why each browser permission in manifest.json is required</p>

                        <div className="space-y-3">
                            {[
                                {
                                    name: "storage",
                                    purpose: "Stores hashed password, user preferences, and locked tab records locally on your device.",
                                    note: "Data remains strictly on your computer."
                                },
                                {
                                    name: "tabs",
                                    purpose: "Identifies tab IDs and URLs of tabs you choose to lock, and restores the original URL upon successful unlock.",
                                    note: "Only accesses tabs you explicitly choose to lock or when domain auto-lock rules match."
                                },
                                {
                                    name: "activeTab",
                                    purpose: "Provides instant one-click locking of the currently active tab when you click the Locksy toolbar button.",
                                    note: "Only triggers upon explicit user interaction."
                                },
                                {
                                    name: "webNavigation",
                                    purpose: "Maintains lock persistence by detecting when a locked tab is refreshed or navigated, preventing bypass.",
                                    note: "Monitors navigation events to keep locks enforced."
                                },
                                {
                                    name: "notifications",
                                    purpose: "Displays desktop notifications for security events such as auto-lock triggers and lockout warnings.",
                                    note: "Used strictly for user feedback."
                                },
                                {
                                    name: "alarms",
                                    purpose: "Powers auto-lock timers, session timeout checks, and scheduled locking intervals in the background.",
                                    note: "Local timer triggers only."
                                },
                                {
                                    name: "contextMenus",
                                    purpose: "Adds 'Lock this tab' and 'Lock this domain' shortcuts to your right-click context menu.",
                                    note: "Convenience shortcut."
                                },
                                {
                                    name: "idle",
                                    purpose: "Detects when your computer is locked or enters an idle state to trigger auto-lock if configured.",
                                    note: "Operates completely locally."
                                },
                                {
                                    name: "<all_urls>",
                                    purpose: "Required to display the lock screen overlay on any website you choose to lock and to inject Privacy Blur masks on pages with sensitive data fields.",
                                    note: "Locksy never logs or scrapes page content across your browsing."
                                },
                                {
                                    name: "https://locksy-api.vansh-sethi98760.workers.dev/*",
                                    purpose: "Endpoint used exclusively by Pro users for license key activation and subscription status checks.",
                                    note: "Only queries license key validity; sends no browsing data."
                                },
                                {
                                    name: "https://locksy.dev/*",
                                    purpose: "Provides in-product documentation links and release notes.",
                                    note: "Standard documentation link access."
                                }
                            ].map((perm, idx) => (
                                <div key={idx} className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4 md:flex-row md:items-center md:gap-5">
                                    <code className="inline-block w-fit shrink-0 break-all">{perm.name}</code>
                                    <div className="flex-1 text-sm">
                                        <p className="mb-1">
                                            <strong>Purpose:</strong> {perm.purpose}
                                        </p>
                                        <p>
                                            <strong>Data Scope:</strong> {perm.note}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DocSection>

                    {/* 6. User Control & Data Deletion */}
                    <DocSection id="how-to-delete-your-data" icon={Trash2} title="How to Delete Your Data">
                        <p>You have full control over your stored data at all times</p>

                        <div className="grid gap-4 md:grid-cols-3">
                            {[
                                {
                                    icon: Trash2,
                                    title: "Uninstall Extension",
                                    desc: "Right-click the Locksy icon in Chrome, select 'Remove from Chrome'. Chrome immediately and permanently wipes all local storage and password hashes."
                                },
                                {
                                    icon: Eraser,
                                    title: "Clear Intruder Logs",
                                    desc: "Open Locksy -> Security Dashboard -> Click 'Clear Intruder Logs' to immediately delete all captured webcam photos and audit logs."
                                },
                                {
                                    icon: HardDrive,
                                    title: "Clear Extension Storage",
                                    desc: "Navigate to chrome://extensions/ -> Locksy -> Details -> Click 'Clear data' to restore the extension to a clean, fresh-install state."
                                }
                            ].map((method, idx) => (
                                <div key={idx} className="rounded-xl border border-border bg-background p-5">
                                    <IconTile icon={method.icon} />
                                    <h3 className="!mt-4">{method.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed">{method.desc}</p>
                                </div>
                            ))}
                        </div>
                    </DocSection>

                    {/* 7. Website Privacy Disclosure (Separated clearly) */}
                    <DocSection id="website-privacy-policy" icon={Globe} title="Website Privacy Policy (locksy.dev)">
                        <p>Transparent disclosure for visitors of our marketing and documentation site</p>
                        <p>
                            Our marketing website (<code>locksy.dev</code>) operates independently from the Extension. Here is every third party involved in serving this site:
                        </p>

                        <div className="space-y-3">
                            <div className="rounded-xl border border-border bg-background p-5">
                                <h3 className="!mt-0">Hosting &amp; Delivery</h3>
                                <p className="mt-1.5 text-sm leading-relaxed">
                                    The website is hosted on commercial cloud infrastructure (Vercel). Standard server logs (IP address, user agent, timestamp) are generated for operational security and DDoS protection.
                                </p>
                            </div>

                            <div className="rounded-xl border border-border bg-background p-5">
                                <h3 className="!mt-0">Cookieless Web Analytics</h3>
                                <p className="mt-1.5 text-sm leading-relaxed">
                                    We use privacy-friendly Vercel Web Analytics to measure aggregated traffic and Core Web Vitals. It does not use cookies, does not log IP addresses, and does not build visitor profiles.
                                </p>
                            </div>

                            <div className="rounded-xl border border-border bg-background p-5">
                                <h3 className="!mt-0">Free Web Security Tools</h3>
                                <p className="mt-1.5 text-sm leading-relaxed">
                                    The password generator and strength checker on our website execute 100% client-side in your browser. Nothing you type is transmitted to our servers.
                                </p>
                            </div>
                        </div>
                    </DocSection>

                    {/* 8. Legal Compliance */}
                    <DocSection id="legal-compliance" icon={Scale} title="Legal Compliance">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-border bg-background p-5">
                                <h3 className="!mt-0">GDPR (EU / EEA)</h3>
                                <p className="mt-2">For users in the European Union:</p>
                                <ul className="mt-3 text-sm">
                                    {[
                                        "Local-first data processing",
                                        "Strict data minimization",
                                        "Instant local data erasure",
                                        "No profiling or automated decision making"
                                    ].map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-xl border border-border bg-background p-5">
                                <h3 className="!mt-0">CCPA / CPRA (California)</h3>
                                <p className="mt-2">For California residents:</p>
                                <ul className="mt-3 text-sm">
                                    {[
                                        "We do not sell personal information",
                                        "We do not share data with third parties for cross-context ads",
                                        "Right to know and right to delete guaranteed",
                                        "Full disclosure of data categories"
                                    ].map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </DocSection>

                    {/* 9. Contact Us */}
                    <DocSection id="questions-support" icon={Mail} title="Questions & Support">
                        <h3 className="!mt-0">GitHub Repository &amp; Issues</h3>
                        <p className="!mt-1">
                            <a
                                href="https://github.com/vansh-121/Locksy/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                github.com/vansh-121/Locksy/issues
                            </a>
                        </p>
                        <h3>Developer Contact</h3>
                        <p className="!mt-1">Vansh Sethi (vansh-121)</p>
                        <Callout tone="danger" icon={AlertTriangle} title="Security Vulnerabilities">
                            <p>
                                Report privately via GitHub Security Advisories. Do not disclose publicly until patched.
                            </p>
                        </Callout>
                    </DocSection>

                    {/* Final Notice */}
                    <Callout icon={Shield} title="By installing and using Locksy, you acknowledge that you have read and understood this Privacy Policy.">
                        <p>Effective as of November 12, 2026</p>
                        <p className="mt-2">Your Tabs, Your Password, Your Privacy.</p>
                    </Callout>
                </DocLayout>
            </main>

            <Footer />
        </>
    )
}
