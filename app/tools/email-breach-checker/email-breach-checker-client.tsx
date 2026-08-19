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

          {/* ── How the lookup works ──────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">What happens when you press check</h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Your browser sends the address you typed straight to the{' '}
              <a href="https://xposedornot.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">XposedOrNot</a>{' '}
              public breach API and renders whatever comes back. There is no server of ours in the middle: the
              request goes from your machine to theirs, the response is displayed, and nothing is written to a
              database, a log file or your browser&apos;s local storage. Reload the page and it is gone.
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              We would rather be precise than reassuring, so here is the part most breach checkers gloss over:
              this lookup transmits your <strong className="text-foreground">complete email address</strong> to a
              third-party service. Some breach APIs use a k-anonymity scheme, where your browser hashes the input
              and sends only the first few characters of the hash, so the service can return a bucket of candidate
              matches without ever learning what you searched for. This endpoint does not work that way. If sending
              your address to an external service is unacceptable in your threat model, do not use this tool — and
              be sceptical of any breach checker that does not tell you which of the two designs it uses.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">Step one</div>
                <h3 className="font-bold text-foreground mb-1.5 text-sm">Normalise</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The address is trimmed and lower-cased in the page, then URL-encoded. Anything without an{' '}
                  <code className="text-primary">@</code> is rejected before any request is made.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">Step two</div>
                <h3 className="font-bold text-foreground mb-1.5 text-sm">Query</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A single read-only request goes to the breach index, which holds records from publicly disclosed
                  credential dumps. No account, no API key, no rate-limit cookie.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">Step three</div>
                <h3 className="font-bold text-foreground mb-1.5 text-sm">Render</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Matching incident names are listed as-is. The list is the names of the breached services — never
                  the leaked passwords themselves, which the index does not return.
                </p>
              </div>
            </div>
          </section>

          {/* ── Reading the result ────────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">How to read your result</h2>

            <div className="space-y-4">
              <div className="p-5 sm:p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Found in one or more breaches</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                  This does not mean you were careless. It means a company you handed an address to was breached,
                  and their user table ended up in public circulation. The named incidents are the ones already
                  disclosed and indexed — a floor, not a total.
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  What actually matters is <em>what else</em> was in that record. If the password you used there is
                  a password you also used anywhere else, that combination is now sitting in credential-stuffing
                  lists, being tried automatically against every major login page. Change those first, starting with
                  your email account — whoever controls your inbox can reset almost everything else.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">No breaches found</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Encouraging, but weaker evidence than it looks. A clean result means this address does not appear
                  in the dumps this index has processed. Breaches routinely go undetected for months or years before
                  disclosure, plenty are never disclosed at all, and stolen data is often traded privately long
                  before it reaches a public corpus. Read it as &ldquo;nothing known yet,&rdquo; not
                  &ldquo;never exposed.&rdquo;
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-muted/20 border border-border/40">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">One caveat about failures</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  If the request itself fails — the API is down, or your network blocks it — this tool currently
                  shows the same clean result as a genuine miss. So if you get a clean result and you had reason to
                  expect otherwise, try again later rather than treating it as confirmation.
                </p>
              </div>
            </div>
          </section>

          {/* ── What to do next ──────────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">What to actually do about it</h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              In priority order, because the usual advice — &ldquo;change your passwords&rdquo; — is both too vague
              and too much work to act on all at once.
            </p>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">1. Secure the email account itself</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Your inbox is the master key to every account that offers a password reset. Give it a unique
                  password and the strongest second factor it supports, before touching anything else.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">2. Kill every instance of the reused password</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Credential stuffing works precisely because one leaked pair unlocks a dozen unrelated services.
                  If you can recall reusing a password anywhere, that is where the real exposure is — not the site
                  that got breached. Our{' '}
                  <Link href="/tools/password-generator" className="text-primary hover:underline font-semibold">password generator</Link>{' '}
                  produces a fresh high-entropy replacement locally, and the{' '}
                  <Link href="/tools/password-strength-checker" className="text-primary hover:underline font-semibold">strength checker</Link>{' '}
                  shows how long each one would survive a brute-force attempt.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">3. Add a second factor where it counts</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Email, banking, cloud storage, password manager, domain registrar. A leaked password stops being
                  sufficient the moment a second factor is required — prefer an authenticator app or a hardware key
                  over SMS, which is vulnerable to number porting.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">4. Expect the phishing to get better</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Leaked records often carry names, phone numbers and purchase history alongside the address. That
                  detail is what turns generic spam into a convincing message that cites a real order you actually
                  placed. Treat unexpected mail referencing genuine specifics with more suspicion, not less.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">5. Remember what a password never protected</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Every fix above defends the login. None of it helps once you are already logged in and walk away
                  from an unlocked machine — your inbox, your admin panels and your dashboards are sitting there in
                  open tabs, past every authentication step you just hardened. That is a different threat model, and
                  the one Locksy exists for.
                </p>
              </div>
            </div>
          </section>

          {/* ── FAQ ───────────────────────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Do you store the address I search for?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  We do not — there is no backend here to store it in, and nothing is written to local storage.
                  The address is, however, sent to the third-party breach API described above, which is what makes
                  the lookup possible at all.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Will this show me the leaked password?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  No, and you should distrust any free tool that offers to. The index returns the names of the
                  breached services only. A site willing to hand you plaintext credentials for an arbitrary address
                  is telling you something about its own ethics.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">A breach is listed from years ago. Do I still need to act?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  If the password from that era is genuinely dead everywhere, no. Old dumps stay in circulation
                  indefinitely and get re-tried whenever a new stuffing campaign spins up, so the only thing that
                  makes an old breach harmless is that the credentials no longer work anywhere.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Should I check my other addresses too?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Yes — results are per-address, and an old account you have not touched in a decade is often the
                  one holding a password you reused back when you reused passwords. Work-issued addresses are worth
                  checking as well, though your IT team may already monitor them centrally.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Does using aliases or a catch-all domain help?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  It helps a great deal. A distinct address per service means a breach exposes one alias rather than
                  the identifier that ties all your accounts together, and it tells you exactly which company leaked
                  your data. It does not protect the password, so treat it as compartmentalisation rather than a
                  substitute for unique credentials.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/20 text-center">
            <h3 className="text-xl font-bold mb-2">Protect Your Logged-In Browser Sessions with Locksy</h3>
            <p className="text-xs text-muted-foreground mb-6 max-w-lg mx-auto">
              Locksy prevents unauthorized physical workstation access to active open tabs with PBKDF2 (600,000 iterations) and biometric unlock.
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
