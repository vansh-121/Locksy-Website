"use client"

import { useState } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import Link from 'next/link'
import { Shield, Key, Eye, EyeOff, Sparkles, Check, X, AlertCircle } from 'lucide-react'

export default function PasswordStrengthCheckerPage() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Character analysis
  const hasLower = /[a-z]/.test(password)
  const hasUpper = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSymbol = /[^a-zA-Z0-9]/.test(password)
  const isLongEnough = password.length >= 12

  // Common dictionary check
  const commonWeak = ["123456", "password", "12345678", "qwerty", "abc123", "admin", "locksy"]
  const isCommon = commonWeak.some(w => password.toLowerCase().includes(w))

  const calculateEntropy = (pwd: string) => {
    if (!pwd) return 0
    let pool = 0
    if (/[a-z]/.test(pwd)) pool += 26
    if (/[A-Z]/.test(pwd)) pool += 26
    if (/[0-9]/.test(pwd)) pool += 10
    if (/[^a-zA-Z0-9]/.test(pwd)) pool += 32
    return Math.floor(pwd.length * Math.log2(pool || 1))
  }

  const entropy = calculateEntropy(password)

  // Compute crack time
  const getCrackTime = (entropyBits: number, iterations: number = 1) => {
    if (entropyBits === 0) return "Instant"
    const guesses = Math.pow(2, entropyBits)
    // 10 Billion guesses per sec for GPU rig
    const seconds = guesses / ((10000000000) / iterations)

    if (seconds > 31536000 * 10000) return "10,000+ Years (Crack-Proof)"
    if (seconds > 31536000 * 100) return "100+ Years"
    if (seconds > 31536000) return `${Math.floor(seconds / 31536000)} Years`
    if (seconds > 86400 * 30) return `${Math.floor(seconds / (86400 * 30))} Months`
    if (seconds > 86400) return `${Math.floor(seconds / 86400)} Days`
    if (seconds > 3600) return `${Math.floor(seconds / 3600)} Hours`
    if (seconds > 60) return `${Math.floor(seconds / 60)} Minutes`
    return "A Few Seconds"
  }

  const standardTime = getCrackTime(entropy, 1)
  const pbkdf2Time = getCrackTime(entropy, 600000)

  const getScoreRating = () => {
    if (!password) return { label: "Enter a password", color: "bg-muted", text: "text-muted-foreground", width: 0 }
    if (isCommon || entropy < 30) return { label: "Very Weak (Dangerous)", color: "bg-red-500", text: "text-red-500", width: 25 }
    if (entropy < 55) return { label: "Moderate (Basic)", color: "bg-amber-500", text: "text-amber-500", width: 50 }
    if (entropy < 80) return { label: "Strong (Recommended)", color: "bg-blue-500", text: "text-blue-500", width: 75 }
    return { label: "Military Grade (Maximum)", color: "bg-emerald-500", text: "text-emerald-500", width: 100 }
  }

  const rating = getScoreRating()

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background relative overflow-hidden pt-28 pb-24">
        {/* Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/6 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              100% Client-Side Memory Calculation
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              Password Strength & <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Entropy Meter</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Test your password&apos;s brute-force resistance against standard attacks vs <strong>600,000 PBKDF2 iterations</strong>.
            </p>
          </div>

          {/* Main Card */}
          <div className="p-5 sm:p-8 rounded-3xl bg-card/80 backdrop-blur-xl border border-border/60 shadow-2xl mb-12">
            
            {/* Input */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Type or Paste Test Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your master password or phrase..."
                  className="w-full px-5 py-4 rounded-2xl bg-muted/40 border border-border text-foreground font-mono text-base focus:outline-none focus:border-primary pr-14 shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Gauge */}
            <div className="mb-8">
              <div className="flex justify-between items-center text-sm font-bold mb-2">
                <span className="text-muted-foreground">Entropy Score: <strong className="text-foreground">{entropy} Bits</strong></span>
                <span className={rating.text}>{rating.label}</span>
              </div>
              <div className="w-full h-4 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${rating.color}`}
                  style={{ width: `${rating.width}%` }}
                />
              </div>
            </div>

            {/* Crack Time Comparison Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-2xl bg-muted/30 border border-border/40 text-center">
                <div className="text-xs text-muted-foreground font-bold uppercase mb-1">Standard MD5 / SHA-1 Crack Time</div>
                <div className="text-2xl font-black text-foreground mb-1">{standardTime}</div>
                <div className="text-[11px] text-muted-foreground">Unprotected single-hash brute force</div>
              </div>

              <div className="p-5 rounded-2xl bg-primary/10 border border-primary/30 text-center">
                <div className="text-xs text-primary font-bold uppercase mb-1">Locksy PBKDF2 600,000 Iteration Time</div>
                <div className="text-2xl font-black text-primary mb-1">{pbkdf2Time}</div>
                <div className="text-[11px] text-muted-foreground">Military-grade key derivation protection</div>
              </div>
            </div>

            {/* Character Complexity Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 border-t border-border/50 text-xs font-semibold">
              <div className={`flex items-center gap-2 p-2.5 rounded-xl border ${hasLower ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-muted/40 border-border/40 text-muted-foreground'}`}>
                {hasLower ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                <span>Lowercase</span>
              </div>
              <div className={`flex items-center gap-2 p-2.5 rounded-xl border ${hasUpper ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-muted/40 border-border/40 text-muted-foreground'}`}>
                {hasUpper ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                <span>Uppercase</span>
              </div>
              <div className={`flex items-center gap-2 p-2.5 rounded-xl border ${hasNumber ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-muted/40 border-border/40 text-muted-foreground'}`}>
                {hasNumber ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                <span>Numbers</span>
              </div>
              <div className={`flex items-center gap-2 p-2.5 rounded-xl border ${hasSymbol ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-muted/40 border-border/40 text-muted-foreground'}`}>
                {hasSymbol ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                <span>Symbols</span>
              </div>
              <div className={`flex items-center gap-2 p-2.5 rounded-xl border ${isLongEnough ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-muted/40 border-border/40 text-muted-foreground'}`}>
                {isLongEnough ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                <span>12+ Chars</span>
              </div>
            </div>

            {isCommon && (
              <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span><strong>Warning:</strong> This password matches common leaked dictionary words. Avoid using it for your master password.</span>
              </div>
            )}

          </div>

          {/* Call to Action */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-secondary/10 border border-primary/20 text-center">
            <h3 className="text-xl font-bold mb-2">Want 600,000 Iteration Security for Your Open Tabs?</h3>
            <p className="text-xs text-muted-foreground mb-6 max-w-lg mx-auto">
              Install Locksy to lock open Chrome, Edge, and Firefox tabs with PBKDF2 encryption and WebAuthn biometrics.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/#download" className="btn-primary text-xs py-3 px-6">
                Install Locksy Free
              </Link>
              <Link href="/tools/password-generator" className="btn-secondary text-xs py-3 px-6">
                Try Password Generator Tool
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
