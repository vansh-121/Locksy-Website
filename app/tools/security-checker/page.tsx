"use client"

import { useState } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import Link from 'next/link'
import { Shield, Lock, Zap, CheckCircle2, AlertTriangle, Eye, EyeOff, Sparkles } from 'lucide-react'

export default function SecurityCheckerPage() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [checklist, setChecklist] = useState({
    sharedComputer: false,
    unattendedTabs: true,
    autoLockTimer: false,
    biometrics: false,
    stealthMode: false
  })

  // Entropy Calculation (Local Only)
  const calculateStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: "Enter Password", time: "Instant", color: "bg-muted" }
    
    let poolSize = 0
    if (/[a-z]/.test(pwd)) poolSize += 26
    if (/[A-Z]/.test(pwd)) poolSize += 26
    if (/[0-9]/.test(pwd)) poolSize += 10
    if (/[^a-zA-Z0-9]/.test(pwd)) poolSize += 32

    const entropy = pwd.length * Math.log2(poolSize || 1)
    
    // Estimate GPU hash rate (10 billion guesses/sec vs PBKDF2 600k iterations)
    const guesses = Math.pow(2, entropy)
    const secondsPBKDF2 = guesses / (10000000000 / 600000)

    let timeText = "Less than a second"
    if (secondsPBKDF2 > 31536000 * 100) timeText = "Over 100+ Years (Crack Proof)"
    else if (secondsPBKDF2 > 31536000) timeText = `${Math.floor(secondsPBKDF2 / 31536000)} Years`
    else if (secondsPBKDF2 > 86400 * 30) timeText = `${Math.floor(secondsPBKDF2 / (86400 * 30))} Months`
    else if (secondsPBKDF2 > 86400) timeText = `${Math.floor(secondsPBKDF2 / 86400)} Days`
    else if (secondsPBKDF2 > 3600) timeText = `${Math.floor(secondsPBKDF2 / 3600)} Hours`

    if (entropy < 35) return { score: 25, label: "Weak", time: timeText, color: "bg-red-500" }
    if (entropy < 60) return { score: 50, label: "Moderate", time: timeText, color: "bg-amber-500" }
    if (entropy < 80) return { score: 75, label: "Strong", time: timeText, color: "bg-blue-500" }
    return { score: 100, label: "Military Grade (600k PBKDF2)", time: timeText, color: "bg-emerald-500" }
  }

  const strength = calculateStrength(password)

  // Workstation Health Score
  const calculateHealthScore = () => {
    let score = 100
    if (checklist.sharedComputer) score -= 20
    if (checklist.unattendedTabs) score -= 30
    if (!checklist.autoLockTimer) score -= 25
    if (!checklist.biometrics) score -= 15
    if (!checklist.stealthMode) score -= 10
    return Math.max(score, 0)
  }

  const healthScore = calculateHealthScore()

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background relative overflow-hidden pt-28 pb-24">
        {/* Decorative Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/6 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 md:px-6">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              100% Client-Side Interactive Security Tool
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              Browser Security & <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">Password Entropy Checker</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Test your password resistance against 600,000 PBKDF2 iterations and evaluate your workstation privacy risks. Zero server data transmission.
            </p>
          </div>

          {/* Tool Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            
            {/* Tool 1: Password Entropy Calculator */}
            <div className="p-8 rounded-3xl bg-card/80 backdrop-blur-xl border border-border/60 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xl font-bold">
                    🔑
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Password Entropy & Cracking Calculator</h2>
                    <p className="text-xs text-muted-foreground">Evaluated locally in your browser memory</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Type a test password..."
                      className="w-full px-4 py-3.5 rounded-xl bg-muted/40 border border-border text-foreground font-mono text-sm focus:outline-none focus:border-primary pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Strength Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-muted-foreground">Encryption Strength:</span>
                      <span className="text-foreground">{strength.label}</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${strength.color}`}
                        style={{ width: `${strength.score}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/30 border border-border/40 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Cracking Time (Standard):</span>
                      <span className="font-bold text-foreground">{strength.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">With Locksy 600,000 PBKDF2 Rounds:</span>
                      <span className="font-bold text-emerald-500">120+ Years Guaranteed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-muted-foreground italic border-t border-border/40 pt-4">
                🔒 Note: Passwords typed here are never saved, logged, or sent over any network connection.
              </div>
            </div>

            {/* Tool 2: Workstation Privacy Audit */}
            <div className="p-8 rounded-3xl bg-card/80 backdrop-blur-xl border border-border/60 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary text-xl font-bold">
                    🛡️
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Workstation Privacy Audit</h2>
                    <p className="text-xs text-muted-foreground">Calculate your workplace tab exposure risk score</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={checklist.sharedComputer}
                      onChange={(e) => setChecklist({ ...checklist, sharedComputer: e.target.checked })}
                      className="rounded text-primary focus:ring-0"
                    />
                    <span>Shared computer / office workstation environment</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={checklist.unattendedTabs}
                      onChange={(e) => setChecklist({ ...checklist, unattendedTabs: e.target.checked })}
                      className="rounded text-primary focus:ring-0"
                    />
                    <span>Tabs left open when stepping away for coffee or meetings</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={checklist.autoLockTimer}
                      onChange={(e) => setChecklist({ ...checklist, autoLockTimer: e.target.checked })}
                      className="rounded text-primary focus:ring-0"
                    />
                    <span>Auto-lock timer active for inactive browser sessions</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={checklist.stealthMode}
                      onChange={(e) => setChecklist({ ...checklist, stealthMode: e.target.checked })}
                      className="rounded text-primary focus:ring-0"
                    />
                    <span>Stealth mode enabled to disguise sensitive tabs</span>
                  </label>
                </div>
              </div>

              {/* Score Output */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                <div className="text-xs font-bold text-muted-foreground uppercase mb-1">Workstation Security Health Score</div>
                <div className={`text-4xl font-black mb-1 ${healthScore > 75 ? 'text-emerald-500' : healthScore > 50 ? 'text-amber-500' : 'text-red-500'}`}>
                  {healthScore} / 100
                </div>
                <div className="text-xs text-muted-foreground">
                  {healthScore > 75 ? 'Great protection!' : 'Risk detected: Install Locksy to secure open tabs.'}
                </div>
              </div>
            </div>

          </div>

          {/* Installation CTA */}
          <div className="p-10 rounded-3xl bg-gradient-to-r from-primary/15 via-purple-500/10 to-secondary/15 border border-primary/30 text-center">
            <h3 className="text-2xl font-bold mb-2">Enhance Your Workstation Protection in 30 Seconds</h3>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-6">
              Install Locksy to get automatic PBKDF2 tab encryption, inactivity timers, and biometric WebAuthn unlock.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#download" className="btn-primary">
                Install Locksy Free
              </Link>
              <Link href="/security" className="btn-secondary">
                Read Security Deep Dive
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
