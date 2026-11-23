"use client"

import { useState } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProUpgradeCard from "@/components/pro-upgrade-card"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import { PageHero, PageSection } from "@/components/page-shell"
import SectionHeading from "@/components/section-heading"
import Link from 'next/link'
import { Search, AlertTriangle, CheckCircle2, Lock } from 'lucide-react'

export default function EmailBreachCheckerClient() {
  const [email, setEmail] = useState("")
  const [checking, setChecking] = useState(false)
  const [searched, setSearched] = useState(false)
  const [result, setResult] = useState<{
    breached: boolean
    count: number
    breaches: string[]
  } | null>(null)

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    const input = email.trim().toLowerCase()
    if (!input || !input.includes("@")) return

    setChecking(true)
    setSearched(false)

    try {
      // Real Email Breach Search via XposedOrNot API
      const res = await fetch(`https://api.xposedornot.com/v1/check-email/${encodeURIComponent(input)}`)
      const data = await res.json()

      if (data && data.status === "success" && data.breaches && data.breaches.length > 0) {
        const breachList = Array.isArray(data.breaches[0]) ? data.breaches[0] : data.breaches
        setResult({
          breached: true,
          count: breachList.length,
          breaches: breachList
        })
      } else {
        setResult({
          breached: false,
          count: 0,
          breaches: []
        })
      }
    } catch (err) {
      setResult({
        breached: false,
        count: 0,
        breaches: []
      })
    } finally {
      setChecking(false)
      setSearched(true)
    }
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <PageHero
          eyebrow="Live Security Breach Inspector"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Email Breach Checker" },
          ]}
          title={
            <>
              Email Data Breach <span className="text-highlight">Inspector</span>
            </>
          }
          description="Check if your email address has been compromised in public security data leaks."
        />

        {/* Form Card */}
        <section className="relative pb-12 md:pb-16">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <div className="surface p-6 md:p-8">
              <form onSubmit={handleCheck}>
                <label htmlFor="breach-email-input" className="block text-sm font-medium text-foreground">
                  Type Your Email Address to Inspect:
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="breach-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="h-12 min-w-0 flex-1 rounded-xl border border-border bg-background px-4 font-mono text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <button
                    type="submit"
                    disabled={checking}
                    className="btn-primary flex-shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {checking ? "Checking Databases..." : (
                      <>
                        <Search className="h-4 w-4" aria-hidden="true" /> Check Email Breaches
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                  <Lock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-highlight" aria-hidden="true" />
                  <span>
                    Nothing is stored here — no database, no logs, no local storage. The lookup does send your address
                    to a third-party breach index; see <em>What happens when you press check</em> below.
                  </span>
                </p>
              </form>

              {/* Results */}
              {searched && result && (
                <div className="mt-8 border-t border-border pt-8" aria-live="polite">
                  {result.breached ? (
                    <div>
                      <div className="flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/10 p-4">
                        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
                        <div>
                          <div className="text-base font-semibold text-red-600 dark:text-red-400">
                            Warning: Email Found in {result.count} Security Breaches!
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            This email address was compromised in third-party data leaks. Update your passwords immediately.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="flex items-baseline justify-between gap-4">
                          <strong className="text-sm font-medium text-foreground">Compromised Incident Databases ({result.count}):</strong>
                          <span className="font-display text-3xl font-semibold leading-none text-foreground">{result.count}</span>
                        </div>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {result.breaches.map((b, i) => (
                            <li
                              key={i}
                              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden="true" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      <div>
                        <h3 className="text-base font-semibold text-emerald-600 dark:text-emerald-400">Clean! 0 Exposure Hits in Breach Repositories</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          This email address was not detected in active public breach data dumps. Keep your open browser tabs protected with Locksy.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Understanding Breaches ─────────────────────────────────── */}
        <PageSection width="narrow">
          <SectionHeading
            align="left"
            title="Understanding Data Breaches"
            description="Data breaches occur when third-party services suffer unauthorized security intrusions resulting in public leaks of user account information."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="surface p-6">
              <h3 className="text-lg font-semibold text-foreground">What Gets Exposed?</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Breaches typically contain account identifiers such as email addresses, usernames, and associated password hashes from the compromised service.
              </p>
            </div>

            <div className="surface p-6">
              <h3 className="text-lg font-semibold text-foreground">The Danger of Reused Passwords</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Attackers use automated credential-stuffing bots to try leaked email and password combinations across hundreds of unrelated platforms.
              </p>
            </div>
          </div>
        </PageSection>

        {/* ── Recommended Next Steps ──────────────────────────────────────── */}
        <PageSection width="narrow">
          <SectionHeading
            align="left"
            title="Recommended Next Steps"
            description="If your email has appeared in a breach, follow these essential remediation steps:"
          />

          <div className="mt-8 grid gap-4">
            <div className="surface p-6">
              <h3 className="text-lg font-semibold text-foreground">1. Secure Your Primary Email Account</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Your email inbox controls password resets for all other online services. Ensure it has a strong, unique password and two-factor authentication enabled.
              </p>
            </div>

            <div className="surface p-6">
              <h3 className="text-lg font-semibold text-foreground">2. Replace Reused Passwords</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Update your passwords across all accounts where you may have reused credentials. Use our{' '}
                <Link href="/tools/password-generator" className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground">Password Generator</Link>{' '}
                to create unique replacements.
              </p>
            </div>

            <div className="surface p-6">
              <h3 className="text-lg font-semibold text-foreground">3. Enable Two-Factor Authentication (2FA)</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Add an authenticator app (such as Google Authenticator or Aegis) or hardware security key to protect your critical accounts even if a password leaks.
              </p>
            </div>
          </div>
        </PageSection>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <PageSection width="narrow">
          <SectionHeading align="left" eyebrow="FAQ" title="Frequently Asked Questions" />

          <div className="mt-8 divide-y divide-border border-y border-border">
            {[
              {
                q: "Do you store the email address I search for?",
                a: "No. We do not store, track, or record any email addresses searched on this tool.",
              },
              {
                q: "Will this show me the leaked password?",
                a: "No. This tool only lists the names of services associated with known data incidents, never plain text passwords.",
              },
              {
                q: "A breach is listed from several years ago. Do I still need to act?",
                a: "If you have already changed the password for that service and never reused that password on other accounts, no further action is needed.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="py-5">
                <h3 className="font-sans text-base font-medium tracking-normal text-foreground">{q}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </PageSection>

        {/* CTA */}
        <PageSection width="narrow">
          <div className="surface px-6 py-10 text-center md:px-10">
            <h3 className="text-2xl font-semibold text-foreground text-balance">Protect Open Tabs from Local Exposure with Locksy</h3>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              Locksy prevents unauthorized access to active open browser tabs with password encryption and biometric unlock.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/#download" className="btn-primary">
                Install Locksy Free
              </Link>
              <Link href="/tools/password-generator" className="btn-secondary">
                Generate Secure Passwords
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
