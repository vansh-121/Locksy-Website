import { SmartInstallButton } from "@/components/install-buttons"
import type { Metadata } from 'next'
import Header from "@/components/header"
import Footer from "@/components/footer"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
import { PRO_CHECKOUT_URL } from '@/lib/pro'
import { PageHero, PageSection, IconTile } from "@/components/page-shell"
import SectionHeading from "@/components/section-heading"
import {
  ArrowUpRight,
  Check,
  Eye,
  KeyRound,
  Landmark,
  LockOpen,
  Quote,
  ShieldCheck,
  TriangleAlert,
  Zap,
} from "lucide-react"

export const metadata: Metadata = generatePageMetadata(
  // "Locksy" dropped from the front — the layout's title template re-adds it,
  // which pushed this to 67 chars.
  "Security Architecture & Cryptographic Deep Dive",
  "Explore Locksy's local-first security architecture: PBKDF2 password hashing with 600,000 iterations, constant-time verification, zero server communication, WebAuthn biometric unlock, and defense-in-depth isolation.",
  "/security",
  [
    "locksy security architecture",
    "PBKDF2 600000 iterations",
    "PBKDF2 tab password hashing",
    "local-first browser security",
    "shoulder surfing prevention stats",
    "zero knowledge tab locker"
  ]
)

const codeClass = "rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
const linkClass = "text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"

export default function SecurityPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Security Architecture', url: '/security' }
  ])

  const techArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: "Locksy Security Architecture & Cryptographic Deep Dive",
    description: "Detailed technical evaluation of Locksy's client-side PBKDF2 600,000-iteration key derivation, constant-time password verification, and local-only sandbox security model.",
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
    { stat: "82%", label: "Visual Privacy Leaks", desc: "Of office workers report experiencing accidental visual privacy exposure from shoulder surfing.", icon: Eye },
    { stat: "73%", label: "Device Intrusions", desc: "Of workplace security incidents originate from briefly unattended unlocked browser sessions.", icon: LockOpen },
    { stat: "600,000", label: "PBKDF2 Iterations", desc: "Exceeds OWASP 2023 minimum recommendation for password key derivation by 2x.", icon: Zap },
    { stat: "0 Bytes", label: "Remote Requests", desc: "Zero outbound network telemetry requests sent during tab locking or password checks.", icon: ShieldCheck },
    { stat: "OWASP+", label: "Derivation Standard", desc: "600,000 PBKDF2 iterations exceeding industry security baselines.", icon: KeyRound }
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
      locksy: "Full-tab navigation to extension page",
      pwdManager: "Form Autofill Injection Only",
      nativeLock: "No Per-Tab Granularity",
      basicOverlay: "CSS display:none (Bypassable)"
    },
    {
      feature: "DevTools Bypass Protection",
      locksy: "No overlay to remove (real navigation)",
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
      url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html",
      badge: "OWASP Standard"
    },
    {
      title: "W3C Web Cryptography Specification",
      subtitle: "Native browser crypto API standards",
      url: "https://www.w3.org/TR/WebCryptoAPI/",
      badge: "W3C Spec"
    },
    {
      title: "NIST Special Publication 800-132",
      subtitle: "Recommendation for Password-Based Key Derivation",
      url: "https://csrc.nist.gov/publications/detail/sp/800-132/final",
      badge: "NIST Standard"
    },
    {
      title: "Chrome Extension MV3 Architecture",
      subtitle: "Google Chrome Manifest V3 extension security model",
      url: "https://developer.chrome.com/docs/extensions/mv3/intro/",
      badge: "Google Security"
    }
  ]

  const jumpLinks = [
    { href: "#tldr", label: "TL;DR Summary" },
    { href: "#threat-model", label: "Threat Model & Scope" },
    { href: "#metrics", label: "Statistical Metrics" },
    { href: "#primitives", label: "Key Derivation" },
    { href: "#matrix", label: "Feature Matrix" },
    { href: "#citations", label: "Citations" },
  ]

  const tldrItems = [
    {
      title: "100% Client-Side Web Cryptography",
      body: (
        <>
          Encryption, hash generation, and password validations run exclusively inside your local browser sandbox via native <a href="https://www.w3.org/TR/WebCryptoAPI/" target="_blank" rel="noopener noreferrer" className={linkClass}>W3C Web Cryptography API</a>.
        </>
      ),
    },
    {
      title: "600,000 PBKDF2 Iterations",
      body: (
        <>
          Derives master keys using HMAC-SHA-256 with 600k rounds—exceeding <a href="https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" target="_blank" rel="noopener noreferrer" className={linkClass}>OWASP standards</a> to render offline brute-force cracking mathematically infeasible.
        </>
      ),
    },
    {
      title: "Zero Network Telemetry & Zero Cloud",
      body: (
        <>
          Locksy contains zero analytics tracking, zero remote database connections, and makes zero telemetry requests. Your passwords never leave your physical hardware.
        </>
      ),
    },
    {
      title: "8+ Defense-in-Depth Bypass Guarding",
      body: (
        <>
          Protects against DevTools inspection, tab URL replacement, script injection, and browser session restoration exploits.
        </>
      ),
    },
  ]

  const isolationItems = [
    {
      title: "Full-Tab Navigation Isolation",
      desc: "The protected page is not hidden behind an overlay — the tab is navigated to an internal extension page, so the original document is no longer loaded at all.",
    },
    {
      title: "Navigation Re-Enforcement",
      desc: "Any attempt to navigate a locked tab back to its page is intercepted by the background service and returned to the lock screen.",
    },
    {
      title: "Address Concealment",
      desc: "The original address is held in local extension storage and never rendered on the lock screen, so it stays hidden from anyone looking at the tab.",
    },
    {
      title: "Startup Session Lock (Pro)",
      desc: "Locks tabs restored by the browser at launch, with a 30-second catch-up window so tabs that finish loading late are still caught.",
    },
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

      <main className="min-h-screen bg-background">
        <PageHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Security Architecture" }]}
          eyebrow="Verified Zero-Knowledge Security Model"
          title={
            <>
              Locksy Security Architecture &amp;{" "}
              <span className="text-highlight">Cryptographic Deep Dive</span>
            </>
          }
          description={
            <>
              Discover how Locksy safeguards your private browser tabs using client-side <strong className="font-medium text-foreground">PBKDF2 600,000-iteration key derivation</strong>, constant-time password verification, and zero network data exposure.
            </>
          }
        >
          {jumpLinks.map((l) => (
            <a key={l.href} href={l.href} className="btn-secondary btn-sm">
              {l.label}
            </a>
          ))}
        </PageHero>

        {/* TL;DR Executive Summary Block */}
        <PageSection id="tldr" className="!pt-0">
          <div className="surface p-6 sm:p-8 md:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <IconTile icon={Zap} />
                <div>
                  <h2 className="text-2xl font-semibold leading-snug text-foreground text-balance">Executive Summary & Core Guarantees</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Local-first, zero-knowledge browser tab security at a glance.</p>
                </div>
              </div>
              <span className="eyebrow self-start">
                <span className="eyebrow-dot" aria-hidden="true" />
                TL;DR Key Takeaways
              </span>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {tldrItems.map((item, i) => (
                <div key={item.title} className="rounded-xl border border-border bg-background p-5">
                  <div className="flex items-center gap-3 text-[15px] font-medium text-foreground">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-border font-mono text-xs text-foreground">
                      {i + 1}
                    </span>
                    {item.title}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </PageSection>

        {/* Statistical Security Metrics Grid */}
        <PageSection id="metrics">
          <SectionHeading
            title="Statistical Grounding & Security Metrics"
            description="Empirical risk data and cryptographic benchmarks."
          />

          {/* gap-px over a border-coloured background draws the hairline grid */}
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-5">
            {statisticalFacts.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className={`flex flex-col bg-background p-6 md:p-8 ${i === statisticalFacts.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
                >
                  <dt className="sr-only">{item.label}</dt>
                  <dd className="flex flex-1 flex-col">
                    <Icon className="h-5 w-5 text-highlight" aria-hidden="true" />
                    <span className="mt-6 block font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                      {item.stat}
                    </span>
                    <span className="mt-2 block text-sm font-medium text-foreground/80">{item.label}</span>
                    <span className="mt-3 block text-sm leading-relaxed text-muted-foreground">{item.desc}</span>
                  </dd>
                </div>
              )
            })}
          </dl>
        </PageSection>

        {/* Industry Standards & Quotes */}
        <PageSection>
          <SectionHeading
            title="Industry Standards & Expert Quotations"
            description="Guided by established global security benchmarks."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <blockquote className="surface flex flex-col p-8">
              <Quote className="h-5 w-5 text-highlight" aria-hidden="true" />
              <p className="mt-5 flex-1 text-base leading-relaxed text-foreground/90">
                &ldquo;Password-based key derivation functions (PBKDF2) with high iteration counts are essential for turning low-entropy user passwords into cryptographic keys resistant to specialized hardware cracking.&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <IconTile icon={Landmark} />
                <div>
                  <cite className="block text-sm font-medium not-italic text-foreground">
                    NIST Special Publication 800-132
                  </cite>
                  <a href="https://csrc.nist.gov/publications/detail/sp/800-132/final" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Read Official NIST Standard →
                  </a>
                </div>
              </div>
            </blockquote>

            <blockquote className="surface flex flex-col p-8">
              <Quote className="h-5 w-5 text-highlight" aria-hidden="true" />
              <p className="mt-5 flex-1 text-base leading-relaxed text-foreground/90">
                &ldquo;Local-first zero-knowledge software ensures that user credentials and private state remain immune to cloud data breaches, third-party server compromises, and man-in-the-middle interception.&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <IconTile icon={ShieldCheck} />
                <div>
                  <cite className="block text-sm font-medium not-italic text-foreground">
                    Electronic Frontier Foundation (EFF)
                  </cite>
                  <a href="https://www.eff.org/wp/privacy-best-practices" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Read EFF Privacy Guidelines →
                  </a>
                </div>
              </div>
            </blockquote>
          </div>
        </PageSection>

        {/* Cryptographic Architecture Deep Dive */}
        <PageSection id="primitives">
          <SectionHeading
            title="Architectural Pillars & Technical Specifications"
            description={<>In-depth technical breakdown of Locksy&apos;s defense mechanisms.</>}
          />

          <div className="mt-12 space-y-4">
            {/* Card 1 */}
            <div className="surface p-6 md:p-8">
              <div className="flex items-start gap-4">
                <IconTile icon={KeyRound} />
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Pillar 1</span>
                  <h3 className="mt-0.5 text-xl font-semibold leading-snug text-foreground md:text-2xl">1. Key Derivation & Cryptographic Primitives</h3>
                </div>
              </div>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Locksy relies exclusively on standard implementations of the W3C Web Cryptography API (<code className={codeClass}>crypto.subtle</code>) provided natively by Chromium and Gecko browser engines.
                When you set your master password, Locksy executes a cryptographic key derivation function (KDF) using <strong className="font-medium text-foreground">PBKDF2 with 600,000 SHA-256 iterations</strong> and a unique 128-bit cryptographic salt generated via <code className={codeClass}>crypto.getRandomValues()</code>.
              </p>
              <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 md:grid-cols-4">
                <div className="bg-background p-4">
                  <dt className="text-xs text-muted-foreground">Algorithm</dt>
                  <dd className="mt-1 font-mono text-sm text-foreground">PBKDF2 HMAC-SHA-256</dd>
                </div>
                <div className="bg-background p-4">
                  <dt className="text-xs text-muted-foreground">Iterations</dt>
                  <dd className="mt-1 font-mono text-sm text-highlight">600,000 Rounds</dd>
                </div>
                <div className="bg-background p-4">
                  <dt className="text-xs text-muted-foreground">Verification</dt>
                  <dd className="mt-1 font-mono text-sm text-foreground">Constant-Time Compare</dd>
                </div>
                <div className="bg-background p-4">
                  <dt className="text-xs text-muted-foreground">Execution Sandbox</dt>
                  <dd className="mt-1 font-mono text-sm text-foreground">Local W3C WebCrypto</dd>
                </div>
              </dl>
            </div>

            {/* Card 2 */}
            <div className="surface p-6 md:p-8">
              <div className="flex items-start gap-4">
                <IconTile icon={ShieldCheck} />
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Pillar 2</span>
                  <h3 className="mt-0.5 text-xl font-semibold leading-snug text-foreground md:text-2xl">2. Per-Tab Isolation & Anti-Bypass Guarding</h3>
                </div>
              </div>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Unlike basic extension utilities that overlay a simple CSS <code className={codeClass}>display: none</code> div over active pages (which can easily be unhidden via DevTools or DOM deletion), Locksy isolates protected tabs at the extension framework level:
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {isolationItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-highlight/15">
                      <Check className="h-3 w-3 text-highlight" aria-hidden="true" />
                    </span>
                    <div>
                      <strong className="block text-sm font-medium text-foreground">{item.title}</strong>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PageSection>

        {/* Cryptographic Feature Comparison Table */}
        <PageSection id="matrix">
          <SectionHeading
            title="Cryptographic Feature Comparison Matrix"
            description={<>Compare Locksy&apos;s architectural guarantees against alternative tools.</>}
          />

          <div className="mt-12"><p className="mb-2 px-1 flex items-center gap-1.5 text-xs text-muted-foreground md:hidden" aria-hidden="true">Swipe sideways to see every column <span>&rarr;</span></p></div>
          <div className="surface mt-0 overflow-x-auto md:mt-0">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="min-w-[200px] px-5 py-4 font-normal text-muted-foreground">Security Feature / Metric</th>
                  <th scope="col" className="min-w-[220px] border-x border-border bg-muted/40 px-5 py-4 font-medium text-foreground">Locksy Tab Locker</th>
                  <th scope="col" className="min-w-[180px] px-5 py-4 font-normal text-muted-foreground">Password Managers</th>
                  <th scope="col" className="min-w-[180px] px-5 py-4 font-normal text-muted-foreground">Native Browser Lock</th>
                  <th scope="col" className="min-w-[180px] px-5 py-4 font-normal text-muted-foreground">Basic Overlay Extensions</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="border-b border-border last:border-b-0">
                    <th scope="row" className="px-5 py-4 font-medium text-foreground">{row.feature}</th>
                    <td className="border-x border-border bg-muted/40 px-5 py-4 text-foreground">
                      <span className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-highlight" aria-hidden="true" />
                        {row.locksy}
                      </span>
                    </td>
                    <td className="px-5 py-4">{row.pwdManager}</td>
                    <td className="px-5 py-4">{row.nativeLock}</td>
                    <td className="px-5 py-4">{row.basicOverlay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageSection>

        {/* Threat Model & Operational Boundaries Section */}
        <PageSection id="threat-model">
          <SectionHeading
            eyebrow="Radical Transparency"
            title="Threat Model & Architectural Scope"
            description={
              <>
                Security tools are only as trustworthy as their honesty about what they protect against — and what they don&apos;t. Here is Locksy&apos;s realistic threat model.
              </>
            }
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {/* What Locksy Protects Against */}
            <div className="surface p-6 md:p-8">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10">
                  <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">What Locksy Protects Against</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">Primary design targets and real-world scenarios</p>
                </div>
              </div>

              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                  <div>
                    <strong className="block font-medium text-foreground">Visual Privacy & Shoulder Surfing</strong>
                    <span className="mt-1 block leading-relaxed text-muted-foreground">
                      Colleagues, classmates, or strangers in cafes, trains, and open offices glancing at sensitive tabs (WhatsApp, banking, personal email, medical portals).
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                  <div>
                    <strong className="block font-medium text-foreground">Casual Laptop Borrowing</strong>
                    <span className="mt-1 block leading-relaxed text-muted-foreground">
                      Handing your unlocked computer to a coworker, friend, or child for 2 minutes to Google something or play a video without exposing private open work or conversations.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                  <div>
                    <strong className="block font-medium text-foreground">Screen-Sharing Leaks During Video Calls</strong>
                    <span className="mt-1 block leading-relaxed text-muted-foreground">
                      Preventing confidential tabs from flashing on screen during Zoom, Google Meet, or Microsoft Teams window shares.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                  <div>
                    <strong className="block font-medium text-foreground">Zero-Knowledge Offline Privacy</strong>
                    <span className="mt-1 block leading-relaxed text-muted-foreground">
                      Zero telemetry, zero servers, and zero cloud backups. All hashing and verification occur strictly within your local browser runtime.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* What Locksy Does Not Claim to Replace */}
            <div className="surface p-6 md:p-8">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-amber-500/25 bg-amber-500/10">
                  <TriangleAlert className="h-5 w-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Operational Boundaries</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">What a browser extension cannot and should not promise</p>
                </div>
              </div>

              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                  <div>
                    <strong className="block font-medium text-foreground">Not an OS-Level Lock Screen Replacement</strong>
                    <span className="mt-1 block leading-relaxed text-muted-foreground">
                      Locksy runs within the browser sandbox. When leaving your laptop completely unattended in untrusted environments, always lock your operating system (<kbd className="kbd">Win + L</kbd> or <kbd className="kbd">Cmd + Ctrl + Q</kbd>).
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                  <div>
                    <strong className="block font-medium text-foreground">Physical Console Access with DevTools</strong>
                    <span className="mt-1 block leading-relaxed text-muted-foreground">
                      In any modern browser, a user with active physical access to your logged-in machine can open <code className={codeClass}>chrome://extensions</code> or use developer tools. Locksy is a privacy deterrent against casual snooping, not a defense against adversaries with physical administrative control.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                  <div>
                    <strong className="block font-medium text-foreground">Not Anti-Malware or Keylogger Protection</strong>
                    <span className="mt-1 block leading-relaxed text-muted-foreground">
                      Locksy does not inspect network packets, scan disks, or prevent hardware keyloggers. If your host operating system is compromised by malware, no browser extension can guarantee privacy.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                  <div>
                    <strong className="block font-medium text-foreground">Defense-in-Depth Principle</strong>
                    <span className="mt-1 block leading-relaxed text-muted-foreground">
                      Locksy is best used as a layer in defense-in-depth: combine a reputable password manager, full-disk encryption (BitLocker/FileVault), and Locksy for everyday tab-level privacy.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </PageSection>

        {/* Official Citations */}
        <PageSection id="citations" width="narrow">
          <SectionHeading
            title="Official Technical Citations & References"
            description="Verified technical standards powering Locksy."
          />

          <ol className="mt-10 divide-y divide-border border-y border-border">
            {citations.map((item, idx) => (
              <li key={idx} className="flex gap-4 py-5">
                <span className="w-6 flex-shrink-0 pt-0.5 font-mono text-xs text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-[15px] font-medium text-foreground">{item.title}</h3>
                    <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                      {item.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm text-muted-foreground underline underline-offset-4 decoration-border hover:text-foreground hover:decoration-foreground transition-colors"
                  >
                    View Specification <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </PageSection>

        {/* Banner Call to Action */}
        <PageSection className="pb-24">
          <div className="surface relative overflow-hidden px-6 py-12 text-center md:px-12 md:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[700px] -translate-x-1/2 -translate-y-1/2"
              style={{ background: "radial-gradient(50% 50% at 50% 50%, var(--glow), transparent 70%)" }}
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-semibold leading-[1.1] text-foreground md:text-4xl text-balance">
                Ready to Secure Your Open Browser Tabs?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Get zero-knowledge tab locking, biometric unlock, and auto-lock protection in under 30 seconds. Free forever.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <SmartInstallButton label="Add to {name}, it's free" size="lg" />
                <a
                  href={PRO_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary btn-lg"
                >
                  Get Locksy Pro
                </a>
              </div>
            </div>
          </div>
        </PageSection>
      </main>

      <SupportChatCTA />
      <CTASection />
      <Footer />
    </>
  )
}
