"use client"

import { SmartInstallButton } from "@/components/install-buttons"
import { useState, useCallback, useEffect } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProUpgradeCard from "@/components/pro-upgrade-card"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import { PageHero, PageSection } from "@/components/page-shell"
import SectionHeading from "@/components/section-heading"
import Link from 'next/link'
import { Copy, Check, RefreshCw } from 'lucide-react'

export default function PasswordGeneratorClient() {
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const generateSinglePassword = useCallback(() => {
    let chars = ""
    if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz"
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeNumbers) chars += "0123456789"
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (avoidAmbiguous) {
      chars = chars.replace(/[l1IO0]/g, "")
    }

    if (!chars) return "Select at least one character type"

    const array = new Uint32Array(length)
    crypto.getRandomValues(array)
    
    let result = ""
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length]
    }
    return result
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, avoidAmbiguous])

  // Generate only in the browser. Generating during server render put real
  // passwords into the cached HTML (identical for every visitor) and caused a
  // hydration mismatch because the client then generated different ones.
  const [passwords, setPasswords] = useState<string[]>([])
  useEffect(() => {
    setPasswords(Array.from({ length: 5 }, () => generateSinglePassword()))
    // Initial fill only; later changes go through the Generate button.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRegenerate = () => {
    setPasswords([
      generateSinglePassword(),
      generateSinglePassword(),
      generateSinglePassword(),
      generateSinglePassword(),
      generateSinglePassword()
    ])
  }

  const handleCopy = (pwd: string, index: number) => {
    navigator.clipboard.writeText(pwd)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const options = [
    { label: "Uppercase (A-Z)", checked: includeUppercase, set: setIncludeUppercase },
    { label: "Lowercase (a-z)", checked: includeLowercase, set: setIncludeLowercase },
    { label: "Numbers (0-9)", checked: includeNumbers, set: setIncludeNumbers },
    { label: "Symbols (!@#$)", checked: includeSymbols, set: setIncludeSymbols },
    { label: "Avoid Ambiguous Characters (l, 1, O, 0)", checked: avoidAmbiguous, set: setAvoidAmbiguous },
  ]

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <PageHero
          eyebrow="Cryptographically Secure (Uint32 Array)"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Password Generator" },
          ]}
          title={
            <>
              Random Password <span className="text-highlight">Generator</span>
            </>
          }
          description={
            <>
              Generate uncrackable, high-entropy passwords natively using{" "}
              <code className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">crypto.getRandomValues()</code>.
            </>
          }
        />

        {/* Controls Card */}
        <section className="relative pb-12 md:pb-16">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <div className="surface p-6 md:p-8">
              {/* Length Slider */}
              <div>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <label htmlFor="password-length" className="block">
                    <span className="text-xs text-muted-foreground">Password Length:</span>
                    <strong className="mt-1 block font-display text-4xl font-semibold leading-none text-foreground">
                      {length} <span className="text-base font-medium text-muted-foreground">Characters</span>
                    </strong>
                  </label>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                    High Entropy
                  </span>
                </div>
                <input
                  id="password-length"
                  type="range"
                  min="8"
                  max="64"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="mt-5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-card [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-solid [&::-moz-range-thumb]:border-card [&::-moz-range-thumb]:bg-foreground [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:border-card [&::-webkit-slider-thumb]:bg-foreground"
                />
                <div className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground">
                  <span>8</span>
                  <span>64</span>
                </div>
              </div>

              {/* Options Checkboxes */}
              <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-background">
                {options.map(({ label, checked, set }) => (
                  <label
                    key={label}
                    className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3.5 text-sm text-foreground transition-colors hover:bg-muted/50"
                  >
                    <span>{label}</span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => set(e.target.checked)}
                      className="h-4 w-4 flex-shrink-0 cursor-pointer rounded accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </label>
                ))}
              </div>

              <button type="button" onClick={handleRegenerate} className="btn-primary mt-6 w-full">
                <RefreshCw className="h-4 w-4" aria-hidden="true" /> Generate New Passwords
              </button>

              {/* Generated List */}
              <div className="mt-8 border-t border-border pt-6">
                <h2 className="font-sans text-sm font-medium tracking-normal text-muted-foreground">Generated Passwords (Click to Copy):</h2>
                <div className="mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border bg-background">
                  {passwords.map((pwd, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleCopy(pwd, idx)}
                      className="group flex cursor-pointer items-center justify-between gap-4 px-4 py-3.5 transition-colors hover:bg-muted/50"
                    >
                      <code className="break-all font-mono text-sm text-foreground select-all sm:text-base">
                        {pwd}
                      </code>
                      <button
                        type="button"
                        aria-label={copiedIndex === idx ? "Copied" : "Copy password"}
                        className={`inline-flex h-8 flex-shrink-0 items-center justify-center rounded-full border px-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                          copiedIndex === idx
                            ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "border-border text-muted-foreground group-hover:bg-muted group-hover:text-foreground"
                        }`}
                      >
                        {copiedIndex === idx ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Password Security Guidelines ───────────────────────── */}
        <PageSection width="narrow">
          <SectionHeading
            align="left"
            title="Password Security Guidelines"
            description="Creating strong, unique passwords is one of the most effective ways to defend your online accounts against unauthorized access and data breaches."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="surface p-6">
              <h3 className="text-lg font-semibold text-foreground">Use 16+ Characters</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Longer passwords exponentially increase the time required for automated tools to guess your credentials.
              </p>
            </div>
            <div className="surface p-6">
              <h3 className="text-lg font-semibold text-foreground">Mix Character Types</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Include lowercase letters, uppercase letters, digits, and special symbols to maximize password complexity.
              </p>
            </div>
          </div>
        </PageSection>

        {/* ── Length guidance ───────────────────────────────────────── */}
        <PageSection width="narrow">
          <SectionHeading
            align="left"
            title="Recommended Password Length"
            description="Use this quick reference guide to select the right length for your security needs:"
          />

          <div className="surface mt-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="px-5 py-3.5 text-xs font-medium text-muted-foreground">Length</th>
                  <th className="px-5 py-3.5 text-xs font-medium text-muted-foreground">Complexity</th>
                  <th className="px-5 py-3.5 text-xs font-medium text-muted-foreground">Recommended Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { len: "8–10 chars", dot: "bg-amber-500", level: "Basic", use: "Temporary or disposable signups.", recommended: false },
                  { len: "12–14 chars", dot: "bg-highlight", level: "Good", use: "Standard everyday accounts and non-critical services.", recommended: false },
                  { len: "16–20 chars", dot: "bg-emerald-500", level: "Strong (Recommended)", use: "Recommended for primary email, financial portals, and work tools.", recommended: true },
                  { len: "24+ chars", dot: "bg-foreground", level: "Maximum Security", use: "Master passwords, password vault master keys, and root accounts.", recommended: false },
                ].map((row) => (
                  <tr key={row.len} className={row.recommended ? "bg-highlight/5" : ""}>
                    <td className="whitespace-nowrap px-5 py-3.5 font-mono text-foreground">{row.len}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-2 text-foreground">
                        <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${row.dot}`} aria-hidden="true" />
                        {row.level}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageSection>

        {/* ── Best Practices ────────────────────────────────────────── */}
        <PageSection width="narrow">
          <SectionHeading align="left" title="Password Hygiene Best Practices" />

          <div className="mt-8 grid gap-4">
            {[
              {
                title: "Use a Password Manager",
                text: "Avoid memorizing complex passwords. Let a dedicated password manager securely store and autofill them across your devices.",
              },
              {
                title: "Never Reuse Passwords",
                text: "Always use a unique password for each website. If one service is compromised, your other accounts will remain completely safe.",
              },
              {
                title: "Protect Active Sessions",
                text: "A strong password protects the login screen, but active tabs remain open while you work. Use Locksy to lock open tabs whenever you step away from your workstation.",
              },
            ].map((tip) => (
              <div key={tip.title} className="surface p-6">
                <h3 className="text-lg font-semibold text-foreground">{tip.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tip.text}</p>
              </div>
            ))}
          </div>
        </PageSection>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <PageSection width="narrow">
          <SectionHeading align="left" eyebrow="FAQ" title="Frequently Asked Questions" />

          <div className="mt-8 divide-y divide-border border-y border-border">
            <div className="py-5">
              <h3 className="font-sans text-base font-medium tracking-normal text-foreground">Are these passwords sent to a server?</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                No. All generation happens locally inside your browser memory. Nothing is sent over the internet or logged on any server.
              </p>
            </div>

            <div className="py-5">
              <h3 className="font-sans text-base font-medium tracking-normal text-foreground">Should I enable &ldquo;Avoid ambiguous characters&rdquo;?</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                Enable this setting if you plan to write down or manually re-type the password. It excludes lookalike characters like &ldquo;1&rdquo; and &ldquo;l&rdquo;, or &ldquo;0&rdquo; and &ldquo;O&rdquo;.
              </p>
            </div>

            <div className="py-5">
              <h3 className="font-sans text-base font-medium tracking-normal text-foreground">How do I test the strength of an existing password?</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                You can use our free <Link href="/tools/password-strength-checker" className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground">Password Strength Checker</Link> to inspect entropy and estimated crack times.
              </p>
            </div>
          </div>
        </PageSection>

        {/* CTA */}
        <PageSection width="narrow">
          <div className="surface px-6 py-10 text-center md:px-10">
            <h3 className="text-2xl font-semibold text-foreground text-balance">Protect Your Logged-In Browser Sessions with Locksy</h3>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              Lock and encrypt sensitive open browser tabs with master password protection and biometric unlock.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <SmartInstallButton label="Add Locksy to {name}, free" />
              <Link href="/tools/password-strength-checker" className="btn-secondary">
                Test Password Strength Meter
              </Link>
            </div>
          </div>
        </PageSection>
      </main>

      {/* Free tool -> paid extension. Same card as /uninstall and /guide, with an
          eyebrow that bridges from "this page was free" to the price. */}
      <ProUpgradeCard
        eyebrow="This tool is free. So is most of Locksy."
        className="relative overflow-hidden border-t border-border/60 py-16 md:py-20"
      />

      <SupportChatCTA />
      <CTASection />
      <Footer />
    </>
  )
}
