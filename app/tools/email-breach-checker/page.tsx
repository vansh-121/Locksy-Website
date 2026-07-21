"use client"

import { useState } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import Link from 'next/link'
import { Shield, Search, AlertTriangle, CheckCircle2, Lock, Sparkles, ExternalLink } from 'lucide-react'

export default function EmailBreachCheckerPage() {
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
                🔒 Privacy Guarantee: Your email address is queried securely via direct API endpoint and is never saved or logged on our servers.
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
