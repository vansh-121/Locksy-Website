"use client"

import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Shield, Lock, CheckCircle, XCircle, Database, Eye, AlertTriangle, FileText, Globe, Trash2, Clock, Server, Key, Camera, EyeOff } from "lucide-react"

interface PrivacyPolicyClientProps {
    lastUpdated: string
}

export default function PrivacyPolicyClient({ lastUpdated }: PrivacyPolicyClientProps) {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-background via-accent/30 to-background relative overflow-hidden">
                <Header />
                <section className="relative page-top-offset pb-20 md:pb-28 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl" />
                    </div>
                    <div className="relative max-w-7xl mx-auto px-4 md:px-6">
                        <div className="text-center space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                Last Updated: {lastUpdated}
                            </div>
                            <div>
                                <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                                    Privacy <span className="bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary bg-clip-text text-transparent">Policy</span>
                                </h1>
                                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                                    Comprehensive transparency on how Locksy handles, stores, and protects your data.
                                </p>
                            </div>

                            {/* TL;DR Summary */}
                            <div className="max-w-4xl mx-auto mt-12">
                                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl p-8 md:p-10 backdrop-blur-sm shadow-2xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="bg-green-500/20 p-3 rounded-2xl">
                                            <Lock className="h-8 w-8 text-green-600" />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-black">The Privacy Commitment</h2>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {[
                                            "Local-First: Extension data stays on YOUR device only",
                                            "PBKDF2 SHA-256 with 600,000 iterations for master passwords",
                                            "No selling, renting, or brokering of user data ever",
                                            "No telemetry, tracking, or ad trackers inside the extension",
                                            "Transient tab URLs deleted immediately upon unlock",
                                            "Offline-First: Pro licensing strictly verifies license keys"
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3 bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-xl p-4">
                                                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
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
                    <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-20">

                        {/* 1. Overview & Single Purpose */}
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                                    <FileText className="h-4 w-4" />
                                    Section 1
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-6">
                                    Overview &amp;{" "}
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        Single Purpose
                                    </span>
                                </h2>
                            </div>
                            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-xl border border-border space-y-5">
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Locksy (&quot;the Extension&quot;) has a single, focused purpose: <strong className="text-foreground">to allow users to lock, password-protect, and shield sensitive browser tabs, windows, and domain navigation.</strong>
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    We adhere to a strict local-first, privacy-by-design architecture. All core tab locking, biometric authentication, domain protection, and intruder detection algorithms execute strictly within your local browser sandbox.
                                </p>
                                <div className="p-4 bg-muted/40 rounded-2xl border border-border text-sm text-muted-foreground">
                                    <strong className="text-foreground">Important Scope Distinction:</strong> This Privacy Policy covers the <strong className="text-foreground">Locksy Browser Extension</strong> and its companion documentation on this website. The Extension operates locally on your machine. Our marketing website (<code className="text-primary font-mono font-semibold">locksy.dev</code>) is covered transparently in Section 7.
                                </div>
                            </div>
                        </div>

                        {/* 2. User Data Collection and Handling */}
                        <div>
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                                    <Database className="h-4 w-4" />
                                    Section 2
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-4">
                                    Data Collection &amp;{" "}
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        Handling
                                    </span>
                                </h2>
                                <p className="text-xl text-muted-foreground">
                                    What we collect, why we collect it, and how it is processed
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    {
                                        icon: <Key className="h-8 w-8 text-blue-500" />,
                                        title: "Master Password & PIN",
                                        collection: "User input during initial setup or password updates.",
                                        handling: "Cryptographically hashed using PBKDF2 with SHA-256 (600,000 iterations) with a unique salt. Plaintext passwords are NEVER stored, logged, or transmitted anywhere.",
                                        storage: "Stored locally in chrome.storage.local.",
                                        gradient: "from-blue-500 to-cyan-500"
                                    },
                                    {
                                        icon: <Eye className="h-8 w-8 text-green-500" />,
                                        title: "Locked Tab URLs & Tab IDs",
                                        collection: "Captured only when you explicitly lock a tab or trigger a domain rule.",
                                        handling: "Used solely to display the lock overlay and restore your destination page upon successful authentication. Deleted immediately upon tab unlock or closure.",
                                        storage: "Stored temporarily in chrome.storage.local.",
                                        gradient: "from-green-500 to-emerald-500"
                                    },
                                    {
                                        icon: <Shield className="h-8 w-8 text-purple-500" />,
                                        title: "Security State & Cooldown Timers",
                                        collection: "Generated during failed unlock attempts.",
                                        handling: "Maintains attempt counters and lockout timestamps to enforce brute-force protection against unauthorized guessing.",
                                        storage: "Stored in memory and chrome.storage.local.",
                                        gradient: "from-purple-500 to-pink-500"
                                    },
                                    {
                                        icon: <Camera className="h-8 w-8 text-amber-500" />,
                                        title: "Intruder Photo Capture (Optional)",
                                        collection: "Captured via webcam only if explicitly enabled by the user.",
                                        handling: "Snaps a local photo when repeated failed unlock attempts occur. Photos are stored locally and displayed only in the user's local Security Dashboard.",
                                        storage: "100% on-device storage. Never uploaded or transmitted.",
                                        gradient: "from-amber-500 to-orange-500"
                                    },
                                    {
                                        icon: <EyeOff className="h-8 w-8 text-teal-500" />,
                                        title: "Privacy Blur Shield Rules",
                                        collection: "Configured by user in the Privacy Blur Manager.",
                                        handling: "Applies CSS-based element masking (credit cards, passwords, emails) directly inside the page DOM via local content scripts.",
                                        storage: "Stored locally in chrome.storage.local.",
                                        gradient: "from-teal-500 to-cyan-500"
                                    },
                                    {
                                        icon: <Server className="h-8 w-8 text-indigo-500" />,
                                        title: "Pro License Key (Pro Users Only)",
                                        collection: "Entered by user upon purchasing Locksy Pro.",
                                        handling: "Transmitted securely over HTTPS to our license validation API proxy (locksy-api.vansh-sethi98760.workers.dev) to check validity with Polar.sh. Zero browsing data is sent.",
                                        storage: "Stored locally in chrome.storage.local.",
                                        gradient: "from-indigo-500 to-violet-500"
                                    }
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative bg-card rounded-3xl p-8 shadow-lg border border-border hover:shadow-2xl transition-all duration-300"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-3xl`} />
                                        <div className="relative space-y-3">
                                            <div className="inline-flex p-3 rounded-2xl bg-muted/60 border border-border">
                                                {item.icon}
                                            </div>
                                            <h3 className="font-bold text-xl">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground"><strong className="text-foreground">Collection:</strong> {item.collection}</p>
                                            <p className="text-sm text-muted-foreground"><strong className="text-foreground">Handling:</strong> {item.handling}</p>
                                            <p className="text-sm text-muted-foreground"><strong className="text-foreground">Storage:</strong> {item.storage}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* What We DO NOT Collect */}
                            <div className="mt-12 bg-gradient-to-br from-red-500/10 to-rose-500/10 border-2 border-red-500/20 rounded-3xl p-8 md:p-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-red-500/20 p-3 rounded-2xl">
                                        <XCircle className="h-8 w-8 text-red-600" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black">Data We DO NOT Collect</h3>
                                </div>
                                <div className="grid md:grid-cols-4 gap-4">
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
                                        <div key={idx} className="flex items-center gap-2 bg-card/60 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                                            <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                                            <span className="font-semibold text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 3. Storage, Retention, and Security */}
                        <div>
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                                    <Clock className="h-4 w-4" />
                                    Section 3
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-4">
                                    Storage, Retention &amp;{" "}
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        Security
                                    </span>
                                </h2>
                                <p className="text-xl text-muted-foreground">
                                    Clear timeframes for how long each data point is kept
                                </p>
                            </div>

                            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-xl border border-border overflow-x-auto mb-8">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-border text-sm font-bold text-foreground">
                                            <th className="pb-4 pr-4">Data Type</th>
                                            <th className="pb-4 px-4">Storage Location</th>
                                            <th className="pb-4 px-4">Retention Period</th>
                                            <th className="pb-4 pl-4">Deletion Trigger</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border text-sm text-muted-foreground">
                                        <tr>
                                            <td className="py-4 pr-4 font-semibold text-foreground">Locked Tab URLs &amp; IDs</td>
                                            <td className="py-4 px-4 font-mono text-xs">chrome.storage.local</td>
                                            <td className="py-4 px-4">Transient (Temporary)</td>
                                            <td className="py-4 pl-4 text-green-600 dark:text-green-400 font-medium">Deleted immediately upon unlock or tab closure</td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 pr-4 font-semibold text-foreground">Authentication Sessions</td>
                                            <td className="py-4 px-4 font-mono text-xs">Service Worker Memory</td>
                                            <td className="py-4 px-4">10 minutes of inactivity</td>
                                            <td className="py-4 pl-4 text-green-600 dark:text-green-400 font-medium">Auto-expires on timeout or browser shutdown</td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 pr-4 font-semibold text-foreground">Intruder Webcam Photos</td>
                                            <td className="py-4 px-4 font-mono text-xs">chrome.storage.local</td>
                                            <td className="py-4 px-4">Local persistent</td>
                                            <td className="py-4 pl-4 text-green-600 dark:text-green-400 font-medium">User clicks &quot;Clear Log&quot; or uninstalls extension</td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 pr-4 font-semibold text-foreground">Hashed Passwords &amp; Settings</td>
                                            <td className="py-4 px-4 font-mono text-xs">chrome.storage.local</td>
                                            <td className="py-4 px-4">Until changed by user</td>
                                            <td className="py-4 pl-4 text-green-600 dark:text-green-400 font-medium">User resets password, clears data, or uninstalls</td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 pr-4 font-semibold text-foreground">Cooldown Lockout Timers</td>
                                            <td className="py-4 px-4 font-mono text-xs">chrome.storage.local</td>
                                            <td className="py-4 px-4">Up to 30 minutes</td>
                                            <td className="py-4 pl-4 text-green-600 dark:text-green-400 font-medium">Automatically expires when cooldown ends</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 4. Data Sharing and Third Parties (Mandatory for Purple Nickel) */}
                        <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10 border-2 border-primary/20 rounded-3xl p-8 md:p-12">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                                    <Globe className="h-4 w-4" />
                                    Section 4
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black mb-4">
                                    Data Sharing &amp; Third Parties
                                </h2>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    Comprehensive disclosure of all parties data is shared with
                                </p>
                            </div>

                            <div className="space-y-6 max-w-4xl mx-auto">
                                <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
                                    <div className="flex items-center gap-3 mb-3">
                                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                                        <h3 className="font-bold text-lg">Strict No-Sale and No-Transfer Policy</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed pl-9">
                                        We do not sell, rent, trade, or monetize user data under any circumstances. User data is never transferred or shared with data brokers, advertisers, tracking networks, or credit reporting agencies.
                                    </p>
                                </div>

                                <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
                                    <h3 className="font-bold text-lg mb-4 flex items-center gap-3">
                                        <Server className="h-6 w-6 text-primary flex-shrink-0" />
                                        All Parties and Service Providers Involved:
                                    </h3>
                                    <div className="space-y-4 pl-0 md:pl-9">
                                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                                <span className="font-bold text-foreground">1. Cloudflare Workers (locksy-api.vansh-sethi98760.workers.dev)</span>
                                                <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">Pro License Validation</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Used exclusively as a secure, serverless API proxy when a user activates Locksy Pro. It relays the license key to Polar.sh to verify entitlement. <strong>No browsing URLs, passwords, or personal telemetry are transmitted.</strong>
                                            </p>
                                        </div>

                                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                                <span className="font-bold text-foreground">2. Polar.sh</span>
                                                <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">Merchant of Record</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Handles order processing and license generation for Pro purchases. Locksy queries the Polar API via our Cloudflare proxy to validate whether a key is active. All financial transactions occur on Polar.sh.
                                            </p>
                                        </div>

                                        <div className="p-4 rounded-xl bg-muted/50 border border-border">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                                <span className="font-bold text-foreground">3. Browser Native APIs (Google Chrome)</span>
                                                <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">Local Storage</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Locksy uses Chrome&apos;s sandboxed <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">chrome.storage.local</code> API. Data remains isolated within your local browser profile.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-sm text-green-700 dark:text-green-300 font-medium text-center">
                                    Free tier users experience zero external server communication. The free tier operates 100% offline.
                                </div>
                            </div>
                        </div>

                        {/* 5. Permissions Explained */}
                        <div>
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                                    <Eye className="h-4 w-4" />
                                    Section 5
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-4">
                                    Permissions{" "}
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        Justification
                                    </span>
                                </h2>
                                <p className="text-xl text-muted-foreground">
                                    Why each browser permission in manifest.json is required
                                </p>
                            </div>

                            <div className="space-y-4">
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
                                    <div
                                        key={idx}
                                        className="bg-card rounded-2xl p-6 shadow-lg border border-border hover:border-primary/30 transition-colors"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                                            <code className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-mono text-sm font-bold inline-block shrink-0">
                                                {perm.name}
                                            </code>
                                            <div className="flex-1">
                                                <p className="text-sm mb-1">
                                                    <strong>Purpose:</strong> <span className="text-muted-foreground">{perm.purpose}</span>
                                                </p>
                                                <p className="text-sm">
                                                    <strong>Data Scope:</strong> <span className="text-muted-foreground">{perm.note}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 6. User Control & Data Deletion */}
                        <div>
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                                    <Trash2 className="h-4 w-4" />
                                    Section 6
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-4">
                                    How to Delete{" "}
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        Your Data
                                    </span>
                                </h2>
                                <p className="text-xl text-muted-foreground">
                                    You have full control over your stored data at all times
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    {
                                        icon: "🗑️",
                                        title: "Uninstall Extension",
                                        desc: "Right-click the Locksy icon in Chrome, select 'Remove from Chrome'. Chrome immediately and permanently wipes all local storage and password hashes."
                                    },
                                    {
                                        icon: "🧹",
                                        title: "Clear Intruder Logs",
                                        desc: "Open Locksy -> Security Dashboard -> Click 'Clear Intruder Logs' to immediately delete all captured webcam photos and audit logs."
                                    },
                                    {
                                        icon: "💾",
                                        title: "Clear Extension Storage",
                                        desc: "Navigate to chrome://extensions/ -> Locksy -> Details -> Click 'Clear data' to restore the extension to a clean, fresh-install state."
                                    }
                                ].map((method, idx) => (
                                    <div key={idx} className="bg-card rounded-3xl p-6 shadow-lg border border-border space-y-3">
                                        <div className="text-4xl">{method.icon}</div>
                                        <h3 className="font-bold text-lg">{method.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{method.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 7. Website Privacy Disclosure (Separated clearly) */}
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                                    <Globe className="h-4 w-4" />
                                    Section 7
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-4">
                                    Website Privacy Policy (locksy.dev)
                                </h2>
                                <p className="text-lg text-muted-foreground">
                                    Transparent disclosure for visitors of our marketing and documentation site
                                </p>
                            </div>

                            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-xl border border-border space-y-5">
                                <p className="text-muted-foreground leading-relaxed">
                                    Our marketing website (<code className="text-primary font-mono font-semibold">locksy.dev</code>) operates independently from the Extension. Here is every third party involved in serving this site:
                                </p>

                                <div className="space-y-4">
                                    <div className="p-5 rounded-xl bg-muted/40 border border-border">
                                        <h3 className="font-bold mb-1.5">Hosting &amp; Delivery</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            The website is hosted on commercial cloud infrastructure (Vercel). Standard server logs (IP address, user agent, timestamp) are generated for operational security and DDoS protection.
                                        </p>
                                    </div>

                                    <div className="p-5 rounded-xl bg-muted/40 border border-border">
                                        <h3 className="font-bold mb-1.5">Cookieless Web Analytics</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            We use privacy-friendly Vercel Web Analytics to measure aggregated traffic and Core Web Vitals. It does not use cookies, does not log IP addresses, and does not build visitor profiles.
                                        </p>
                                    </div>

                                    <div className="p-5 rounded-xl bg-muted/40 border border-border">
                                        <h3 className="font-bold mb-1.5">Free Web Security Tools</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            The password generator and strength checker on our website execute 100% client-side in your browser. Nothing you type is transmitted to our servers.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 8. Legal Compliance */}
                        <div>
                            <div className="text-center mb-12">
                                <h2 className="text-4xl md:text-5xl font-black mb-4">
                                    Legal{" "}
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        Compliance
                                    </span>
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
                                    <h3 className="text-2xl font-black mb-4">🇪🇺 GDPR (EU / EEA)</h3>
                                    <p className="text-muted-foreground mb-4">For users in the European Union:</p>
                                    <ul className="space-y-2">
                                        {[
                                            "Local-first data processing",
                                            "Strict data minimization",
                                            "Instant local data erasure",
                                            "No profiling or automated decision making"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm">
                                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                <span className="text-muted-foreground">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
                                    <h3 className="text-2xl font-black mb-4">🇺🇸 CCPA / CPRA (California)</h3>
                                    <p className="text-muted-foreground mb-4">For California residents:</p>
                                    <ul className="space-y-2">
                                        {[
                                            "We do not sell personal information",
                                            "We do not share data with third parties for cross-context ads",
                                            "Right to know and right to delete guaranteed",
                                            "Full disclosure of data categories"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm">
                                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                <span className="text-muted-foreground">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 9. Contact Us */}
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-8">
                                <h2 className="text-4xl md:text-5xl font-black mb-4">
                                    Questions &amp;{" "}
                                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        Support
                                    </span>
                                </h2>
                            </div>

                            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-bold text-lg mb-2">GitHub Repository &amp; Issues</h3>
                                        <a
                                            href="https://github.com/vansh-121/Locksy/issues"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            github.com/vansh-121/Locksy/issues
                                        </a>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-2">Developer Contact</h3>
                                        <p className="text-muted-foreground">Vansh Sethi (vansh-121)</p>
                                    </div>
                                    <div className="pt-4 border-t">
                                        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                                            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="font-bold text-red-600 mb-1">Security Vulnerabilities</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Report privately via GitHub Security Advisories. Do not disclose publicly until patched.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
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
                                <Shield className="h-16 w-16 text-primary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black mb-4">
                                By installing and using Locksy, you acknowledge that you have read and understood this Privacy Policy.
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Effective as of November 12, 2026
                            </p>
                            <div className="pt-8 border-t border-border/50">
                                <p className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Your Tabs, Your Password, Your Privacy. ❤️
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    )
}
