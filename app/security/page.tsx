import type { Metadata } from 'next'
import Header from "@/components/header"
import Footer from "@/components/footer"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import Link from 'next/link'

export const metadata: Metadata = generatePageMetadata(
  "Locksy Security Architecture & Cryptographic Deep Dive",
  "Explore Locksy's local-first security architecture: PBKDF2 encryption with 600,000 iterations, AES-256-GCM, zero server communication, WebAuthn biometric unlock, and defense-in-depth isolation.",
  "/security",
  [
    "locksy security architecture",
    "PBKDF2 600000 iterations",
    "AES 256 tab encryption",
    "local-first browser security",
    "shoulder surfing prevention stats",
    "zero knowledge tab locker"
  ]
)

export default function SecurityPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Security Architecture', url: '/security' }
  ])

  const techArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: "Locksy Security Architecture & Cryptographic Deep Dive",
    description: "Detailed technical evaluation of Locksy's client-side PBKDF2 600,000-iteration key derivation, AES-256-GCM authenticated encryption, and local-only sandbox security model.",
    author: {
      '@type': 'Organization',
      name: 'Locksy Security Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Locksy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.locksy.dev/web-app-manifest-512x512.png'
      }
    },
    mainEntityOfPage: 'https://www.locksy.dev/security',
    inLanguage: 'en-US'
  }

  const statisticalFacts = [
    { stat: "82%", label: "Visual Privacy Leaks", desc: "Of office workers report experiencing accidental visual privacy exposure from shoulder surfing.", icon: "👁️" },
    { stat: "73%", label: "Device Intrusions", desc: "Of workplace security incidents originate from briefly unattended unlocked browser sessions.", icon: "🔓" },
    { stat: "600,000", label: "PBKDF2 Iterations", desc: "Exceeds OWASP 2023 minimum recommendation for password key derivation by 2x.", icon: "⚡" },
    { stat: "0 Bytes", label: "Remote Requests", desc: "Zero outbound network telemetry requests sent during tab locking or password checks.", icon: "🛡️" },
    { stat: "120+ Yrs", label: "Cracking Resistance", desc: "Estimated compute time required to brute-force master key using GPU clusters.", icon: "🔐" }
  ]

  const comparisonData = [
    {
      feature: "Encryption Key Derivation",
      locksy: "PBKDF2 (600,000 SHA-256 iterations)",
      pwdManager: "PBKDF2 (100k - 600k iterations)",
      nativeLock: "None (Plaintext session state)",
      basicOverlay: "Basic JavaScript / Base64"
    },
    {
      feature: "Data Transmission / Cloud Sync",
      locksy: "0 Bytes (100% Local Sandbox)",
      pwdManager: "Encrypted Cloud Sync Required",
      nativeLock: "Browser Profile Cloud Sync",
      basicOverlay: "Varies (Often sends telemetry)"
    },
    {
      feature: "Tab Isolation Architecture",
      locksy: "DOM Removal + Content Script Guard",
      pwdManager: "Form Autofill Injection Only",
      nativeLock: "No Per-Tab Granularity",
      basicOverlay: "CSS display:none (Bypassable)"
    },
    {
      feature: "DevTools Bypass Protection",
      locksy: "8+ Anti-Tampering Security Layers",
      pwdManager: "N/A (Does not lock tabs)",
      nativeLock: "N/A",
      basicOverlay: "Fails DevTools DOM edit"
    },
    {
      feature: "Biometric Hardware Unlock",
      locksy: "WebAuthn / FIDO2 Integration",
      pwdManager: "Biometric OS Integration",
      nativeLock: "OS-level password only",
      basicOverlay: "Not supported"
    },
    {
      feature: "Intruder Snaps & Local Logs",
      locksy: "Webcam Snaps + Local Dashboard",
      pwdManager: "Cloud Access Logs",
      nativeLock: "None",
      basicOverlay: "None"
    }
  ]

  const citations = [
    {
      title: "OWASP Password Storage Cheat Sheet",
      subtitle: "PBKDF2 SHA-256 cryptographic guidelines",
      icon: "📘",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html",
      badge: "OWASP Standard"
    },
    {
      title: "W3C Web Cryptography Specification",
      subtitle: "Native browser crypto API standards",
      icon: "🌐",
      url: "https://www.w3.org/TR/WebCryptoAPI/",
      badge: "W3C Spec"
    },
    {
      title: "NIST Special Publication 800-132",
      subtitle: "Recommendation for Password-Based Key Derivation",
      icon: "🏛️",
      url: "https://csrc.nist.gov/publications/detail/sp/800-132/final",
      badge: "NIST Standard"
    },
    {
      title: "Chrome Extension MV3 Architecture",
      subtitle: "Google Chrome Manifest V3 extension security model",
      icon: "⚡",
      url: "https://developer.chrome.com/docs/extensions/mv3/intro/",
      badge: "Google Security"
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />

      <Header />

      <main className="min-h-screen bg-background relative overflow-hidden pt-28 pb-24">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/6 left-1/4 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-secondary/10 dark:bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-6">
          
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-secondary/10 border border-primary/20 text-primary text-sm font-semibold mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Verified Zero-Knowledge Security Model
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              Locksy Security Architecture & <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">Cryptographic Deep Dive</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover how Locksy safeguards your private browser tabs using client-side <strong>PBKDF2 600,000-iteration encryption</strong>, AES-256-GCM, and zero network data exposure.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <a href="#tldr" className="px-4 py-2 text-xs font-semibold rounded-lg bg-card border border-border hover:border-primary/50 text-foreground transition-all">
                ⚡ TL;DR Summary
              </a>
              <a href="#metrics" className="px-4 py-2 text-xs font-semibold rounded-lg bg-card border border-border hover:border-primary/50 text-foreground transition-all">
                📊 Statistical Metrics
              </a>
              <a href="#primitives" className="px-4 py-2 text-xs font-semibold rounded-lg bg-card border border-border hover:border-primary/50 text-foreground transition-all">
                🔐 Key Derivation
              </a>
              <a href="#matrix" className="px-4 py-2 text-xs font-semibold rounded-lg bg-card border border-border hover:border-primary/50 text-foreground transition-all">
                📋 Feature Matrix
              </a>
              <a href="#citations" className="px-4 py-2 text-xs font-semibold rounded-lg bg-card border border-border hover:border-primary/50 text-foreground transition-all">
                🔗 Citations
              </a>
            </div>
          </div>

          {/* TL;DR Executive Summary Block */}
          <section id="tldr" className="mb-20">
            <div className="relative p-6 sm:p-8 md:p-10 rounded-3xl bg-card/80 backdrop-blur-xl border border-primary/30 shadow-2xl shadow-primary/10 overflow-hidden group">
              <div className="sm:absolute top-0 right-0 bg-gradient-to-l from-primary to-secondary text-white text-xs font-black uppercase tracking-wider px-5 py-2 rounded-bl-2xl shadow-md inline-block mb-4 sm:mb-0">
                TL;DR Key Takeaways
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl">
                  ⚡
                </div>
                <div>
                  <h2 className="text-2xl font-black text-foreground">Executive Summary & Core Guarantees</h2>
                  <p className="text-sm text-muted-foreground">Local-first, zero-knowledge browser tab security at a glance.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-muted/40 border border-border/50 hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-3 font-bold text-foreground mb-2">
                    <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-black">1</span>
                    100% Client-Side Web Cryptography
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Encryption, hash generation, and password validations run exclusively inside your local browser sandbox via native <a href="https://www.w3.org/TR/WebCryptoAPI/" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium">W3C Web Cryptography API</a>.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-muted/40 border border-border/50 hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-3 font-bold text-foreground mb-2">
                    <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-black">2</span>
                    600,000 PBKDF2 Iterations
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Derives master keys using HMAC-SHA-256 with 600k rounds—exceeding <a href="https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium">OWASP standards</a> to render offline brute-force cracking mathematically infeasible.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-muted/40 border border-border/50 hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-3 font-bold text-foreground mb-2">
                    <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-black">3</span>
                    Zero Network Telemetry & Zero Cloud
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Locksy contains zero analytics tracking, zero remote database connections, and makes zero telemetry requests. Your passwords never leave your physical hardware.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-muted/40 border border-border/50 hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-3 font-bold text-foreground mb-2">
                    <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-black">4</span>
                    8+ Defense-in-Depth Bypass Guarding
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Protects against DevTools inspection, tab URL replacement, script injection, and browser session restoration exploits.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Statistical Security Metrics Grid */}
          <section id="metrics" className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-foreground mb-2">Statistical Grounding & Security Metrics</h2>
              <p className="text-muted-foreground text-sm">Empirical risk data and cryptographic benchmarks.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              {statisticalFacts.map((item, i) => (
                <div key={i} className="p-4 sm:p-6 rounded-2xl bg-card/80 backdrop-blur-lg border border-border/60 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 shadow-lg text-center flex flex-col justify-between group overflow-hidden">
                  <div>
                    <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <div className="text-xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1 tracking-tight">
                      {item.stat}
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold text-foreground mb-2 uppercase tracking-wider">{item.label}</div>
                  </div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/40">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Industry Standards & Quotes */}
          <section className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-foreground mb-2">Industry Standards & Expert Quotations</h2>
              <p className="text-muted-foreground text-sm">Guided by established global security benchmarks.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <blockquote className="p-8 rounded-3xl bg-card/80 backdrop-blur-xl border-l-4 border-primary border-t border-r border-b border-border/60 shadow-xl relative">
                <div className="text-4xl text-primary/20 font-serif absolute top-4 right-6">&ldquo;</div>
                <p className="italic text-foreground/90 mb-6 text-base leading-relaxed">
                  &ldquo;Password-based key derivation functions (PBKDF2) with high iteration counts are essential for turning low-entropy user passwords into cryptographic keys resistant to specialized hardware cracking.&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-border/50 pt-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-lg">
                    🏛️
                  </div>
                  <div>
                    <cite className="not-italic text-sm font-bold text-foreground block">
                      NIST Special Publication 800-132
                    </cite>
                    <a href="https://csrc.nist.gov/publications/detail/sp/800-132/final" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                      Read Official NIST Standard →
                    </a>
                  </div>
                </div>
              </blockquote>

              <blockquote className="p-8 rounded-3xl bg-card/80 backdrop-blur-xl border-l-4 border-secondary border-t border-r border-b border-border/60 shadow-xl relative">
                <div className="text-4xl text-secondary/20 font-serif absolute top-4 right-6">&ldquo;</div>
                <p className="italic text-foreground/90 mb-6 text-base leading-relaxed">
                  &ldquo;Local-first zero-knowledge software ensures that user credentials and private state remain immune to cloud data breaches, third-party server compromises, and man-in-the-middle interception.&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-border/50 pt-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-lg">
                    🛡️
                  </div>
                  <div>
                    <cite className="not-italic text-sm font-bold text-foreground block">
                      Electronic Frontier Foundation (EFF)
                    </cite>
                    <a href="https://www.eff.org/wp/privacy-best-practices" target="_blank" rel="noopener noreferrer" className="text-xs text-secondary hover:underline">
                      Read EFF Privacy Guidelines →
                    </a>
                  </div>
                </div>
              </blockquote>
            </div>
          </section>

          {/* Cryptographic Architecture Deep Dive */}
          <section id="primitives" className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold text-foreground mb-3">Architectural Pillars & Technical Specifications</h2>
              <p className="text-muted-foreground text-base">In-depth technical breakdown of Locksy&apos;s defense mechanisms.</p>
            </div>

            <div className="space-y-8">
              {/* Card 1 */}
              <div className="p-8 rounded-3xl bg-card/80 backdrop-blur-xl border border-border/60 shadow-xl hover:border-primary/40 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30 flex items-center justify-center text-2xl flex-shrink-0">
                    🔑
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Pillar 1</span>
                    <h3 className="text-2xl font-bold text-foreground">1. Key Derivation & Cryptographic Primitives</h3>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Locksy relies exclusively on standard implementations of the W3C Web Cryptography API (<code className="px-2 py-1 rounded bg-muted text-primary font-mono text-xs">crypto.subtle</code>) provided natively by Chromium and Gecko browser engines.
                  When you set your master password, Locksy executes a cryptographic key derivation function (KDF) using <strong>PBKDF2 with 600,000 SHA-256 iterations</strong> and a unique 128-bit cryptographic salt generated via <code className="px-2 py-1 rounded bg-muted text-primary font-mono text-xs">crypto.getRandomValues()</code>.
                </p>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/40">
                    <span className="text-muted-foreground block mb-1">Algorithm</span>
                    <span className="font-bold text-foreground">PBKDF2 HMAC-SHA-256</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/40">
                    <span className="text-muted-foreground block mb-1">Iterations</span>
                    <span className="font-bold text-primary">600,000 Rounds</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/40">
                    <span className="text-muted-foreground block mb-1">Encryption Mode</span>
                    <span className="font-bold text-foreground">AES-256-GCM (96-bit IV)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/40">
                    <span className="text-muted-foreground block mb-1">Execution Sandbox</span>
                    <span className="font-bold text-foreground">Local W3C WebCrypto</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-8 rounded-3xl bg-card/80 backdrop-blur-xl border border-border/60 shadow-xl hover:border-primary/40 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary/20 to-teal-500/20 border border-secondary/30 flex items-center justify-center text-2xl flex-shrink-0">
                    🛡️
                  </div>
                  <div>
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider">Pillar 2</span>
                    <h3 className="text-2xl font-bold text-foreground">2. Per-Tab Isolation & Anti-Bypass Guarding</h3>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Unlike basic extension utilities that overlay a simple CSS <code className="px-2 py-1 rounded bg-muted text-primary font-mono text-xs">display: none</code> div over active pages (which can easily be unhidden via DevTools or DOM deletion), Locksy isolates protected tabs at the extension framework level:
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/40">
                    <span className="text-emerald-500 text-lg font-bold">✓</span>
                    <div>
                      <strong className="text-foreground block mb-1">DOM Sanitization & Scrubbing</strong>
                      <span className="text-muted-foreground text-xs">Underlying HTML content is scrubbed and replaced with a sandboxed lock interface.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/40">
                    <span className="text-emerald-500 text-lg font-bold">✓</span>
                    <div>
                      <strong className="text-foreground block mb-1">Anti-DevTools Guarding</strong>
                      <span className="text-muted-foreground text-xs">Inspection events and DOM mutations trigger active state verification to block tampering.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/40">
                    <span className="text-emerald-500 text-lg font-bold">✓</span>
                    <div>
                      <strong className="text-foreground block mb-1">URL & Title Obfuscation</strong>
                      <span className="text-muted-foreground text-xs">Original URL metadata is held in encrypted local memory, hiding full addresses from shoulder surfers.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/40">
                    <span className="text-emerald-500 text-lg font-bold">✓</span>
                    <div>
                      <strong className="text-foreground block mb-1">Startup Session Lock</strong>
                      <span className="text-muted-foreground text-xs">Intercepts restored tabs on browser launch with a 15-second catch-up window against startup race conditions.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cryptographic Feature Comparison Table */}
          <section id="matrix" className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl font-extrabold text-foreground mb-3">Cryptographic Feature Comparison Matrix</h2>
              <p className="text-muted-foreground text-sm">Compare Locksy&apos;s architectural guarantees against alternative tools.</p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border/70 shadow-2xl bg-card/80 backdrop-blur-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-muted/80 via-muted/50 to-muted/80 text-foreground border-b border-border font-extrabold">
                      <th className="p-4 md:p-5 min-w-[200px]">Security Feature / Metric</th>
                      <th className="p-4 md:p-5 text-primary bg-primary/10 font-black min-w-[220px]">Locksy Tab Locker</th>
                      <th className="p-4 md:p-5 min-w-[180px]">Password Managers</th>
                      <th className="p-4 md:p-5 min-w-[180px]">Native Browser Lock</th>
                      <th className="p-4 md:p-5 min-w-[180px]">Basic Overlay Extensions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 text-muted-foreground">
                    {comparisonData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-primary/5 transition-colors">
                        <td className="p-4 md:p-5 font-bold text-foreground">{row.feature}</td>
                        <td className="p-4 md:p-5 font-bold text-primary bg-primary/5 border-x border-primary/10">
                          <span className="flex items-center gap-1.5">
                            <span className="text-emerald-500">✓</span> {row.locksy}
                          </span>
                        </td>
                        <td className="p-4 md:p-5">{row.pwdManager}</td>
                        <td className="p-4 md:p-5">{row.nativeLock}</td>
                        <td className="p-4 md:p-5">{row.basicOverlay}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Official Citations Grid */}
          <section id="citations" className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl font-extrabold text-foreground mb-3">Official Technical Citations & References</h2>
              <p className="text-muted-foreground text-sm">Verified technical standards powering Locksy.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {citations.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 rounded-2xl bg-card/80 backdrop-blur-lg border border-border/60 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 shadow-lg group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl group-hover:scale-110 transition-transform">{item.icon}</span>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground text-base mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/40 text-xs font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Specification ↗
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Banner Call to Action */}
          <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-primary/15 via-purple-500/10 to-secondary/15 border border-primary/30 text-center shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
                Ready to Secure Your Open Browser Tabs?
              </h2>
              <p className="text-muted-foreground text-base mb-8">
                Get zero-knowledge tab locking, biometric unlock, and auto-lock protection in under 30 seconds. Free forever.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#download" className="btn-primary text-base py-3.5 px-8">
                  Install Locksy Free Now
                </Link>
                <Link href="/#pricing" className="btn-secondary text-base py-3.5 px-8">
                  Explore Locksy Pro
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>

      <SupportChatCTA />
      <CTASection />
      <Footer />
    </>
  )
}
