"use client"

import { useState } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import Link from 'next/link'
import { Shield, Search, AlertTriangle, CheckCircle2, Lock, Sparkles, ExternalLink } from 'lucide-react'

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

      <main className="min-h-screen bg-background relative overflow-hidden pt-28 pb-24">
        {/* Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/6 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-red-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Live Security Breach Inspector
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              Email Data Breach <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent font-black">Inspector</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Check if your email address has been compromised in public security data leaks.
            </p>
          </div>

          {/* Form Card */}
          <div className="p-5 sm:p-8 rounded-3xl bg-card/80 backdrop-blur-xl border border-border/60 shadow-2xl mb-12">
            <form onSubmit={handleCheck} className="space-y-4">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Type Your Email Address to Inspect:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="flex-1 px-5 py-4 rounded-2xl bg-muted/40 border border-border text-foreground font-mono text-sm focus:outline-none focus:border-amber-500 shadow-inner"
                />
                <button
                  type="submit"
                  disabled={checking}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-red-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm flex-shrink-0"
                >
                  {checking ? "Checking Databases..." : (
                    <>
                      <Search className="w-4 h-4" /> Check Email Breaches
                    </>
                  )}
                </button>
              </div>
              <div className="text-[11px] text-muted-foreground">
                🔒 Nothing is stored here — no database, no logs, no local storage. The lookup does send your address
                to a third-party breach index; see <em>What happens when you press check</em> below.
              </div>
            </form>

            {/* Results */}
            {searched && result && (
              <div className="mt-8 pt-8 border-t border-border/50">
                {result.breached ? (
                  <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-left">
                    <div className="flex items-center gap-3 text-red-500 font-bold text-lg mb-2">
                      <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                      <span>Warning: Email Found in {result.count} Security Breaches!</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">
                      This email address was compromised in third-party data leaks. Update your passwords immediately.
                    </p>

                    <div className="space-y-2 text-xs">
                      <strong className="text-foreground block mb-1">Compromised Incident Databases ({result.count}):</strong>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {result.breaches.map((b, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-600 dark:text-red-400 font-bold text-xs border border-red-500/30">
                            ⚠️ {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-left flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-1">Clean! 0 Exposure Hits in Breach Repositories</h3>
                      <p className="text-xs text-muted-foreground">
                        This email address was not detected in active public breach data dumps. Keep your open browser tabs protected with Locksy.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Understanding Breaches ─────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">Understanding Data Breaches</h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Data breaches occur when third-party services suffer unauthorized security intrusions resulting in public leaks of user account information.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">What Gets Exposed?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Breaches typically contain account identifiers such as email addresses, usernames, and associated password hashes from the compromised service.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">The Danger of Reused Passwords</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Attackers use automated credential-stuffing bots to try leaked email and password combinations across hundreds of unrelated platforms.
                </p>
              </div>
            </div>
          </section>

          {/* ── Recommended Next Steps ──────────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">Recommended Next Steps</h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              If your email has appeared in a breach, follow these essential remediation steps:
            </p>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">1. Secure Your Primary Email Account</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Your email inbox controls password resets for all other online services. Ensure it has a strong, unique password and two-factor authentication enabled.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">2. Replace Reused Passwords</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Update your passwords across all accounts where you may have reused credentials. Use our{' '}
                  <Link href="/tools/password-generator" className="text-primary hover:underline font-semibold">Password Generator</Link>{' '}
                  to create unique replacements.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">3. Enable Two-Factor Authentication (2FA)</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Add an authenticator app (such as Google Authenticator or Aegis) or hardware security key to protect your critical accounts even if a password leaks.
                </p>
              </div>
            </div>
          </section>

          {/* ── FAQ ───────────────────────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">Frequently Asked Questions</h2>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Do you store the email address I search for?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  No. We do not store, track, or record any email addresses searched on this tool.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Will this show me the leaked password?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  No. This tool only lists the names of services associated with known data incidents, never plain text passwords.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">A breach is listed from several years ago. Do I still need to act?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  If you have already changed the password for that service and never reused that password on other accounts, no further action is needed.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/20 text-center">
            <h3 className="text-xl font-bold mb-2">Protect Open Tabs from Local Exposure with Locksy</h3>
            <p className="text-xs text-muted-foreground mb-6 max-w-lg mx-auto">
              Locksy prevents unauthorized access to active open browser tabs with password encryption and biometric unlock.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/#download" className="btn-primary text-xs py-3 px-6">
                Install Locksy Free
              </Link>
              <Link href="/tools/password-generator" className="btn-secondary text-xs py-3 px-6">
                Generate Secure Passwords
              </Link>
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
