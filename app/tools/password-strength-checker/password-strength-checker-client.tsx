"use client"

import { useState } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import Link from 'next/link'
import { Eye, EyeOff, Sparkles, Check, X, AlertCircle } from 'lucide-react'

export default function PasswordStrengthCheckerClient() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Workstation exposure checklist — ported from the retired /tools/security-checker page
  const [checklist, setChecklist] = useState({
    sharedComputer: false,
    unattendedTabs: true,
    autoLockTimer: false,
    biometrics: false,
    stealthMode: false
  })

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

  // Workstation Health Score
  const healthScore = (() => {
    let score = 100
    if (checklist.sharedComputer) score -= 20
    if (checklist.unattendedTabs) score -= 30
    if (!checklist.autoLockTimer) score -= 25
    if (!checklist.biometrics) score -= 15
    if (!checklist.stealthMode) score -= 10
    return Math.max(score, 0)
  })()

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

            <div className="mt-6 text-[11px] text-muted-foreground italic border-t border-border/40 pt-4">
              🔒 Nothing you type here is saved, logged, or sent over the network. The entropy maths runs in
              JavaScript on this page and the value is discarded the moment you close the tab.
            </div>

          </div>

          {/* ── How the score is calculated ───────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">How this calculator works</h2>

            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                Most strength meters hand you a vague colour bar. This one shows the actual number it is reasoning
                about, so you can check the arithmetic yourself. The calculation has two steps.
              </p>

              <p>
                <strong className="text-foreground">Step one: measure the search space.</strong> The tool inspects
                which character classes your password draws on and adds up the corresponding alphabet sizes —
                lowercase adds 26, uppercase adds 26, digits add 10, and symbols add 32. That total is the
                <em> pool</em>. A password using lowercase, uppercase and digits has a pool of 62 possible
                characters in every position.
              </p>

              <div className="p-5 rounded-2xl bg-muted/30 border border-border/40 font-mono text-xs sm:text-sm text-foreground my-6">
                entropy (bits) = length × log₂(pool)
              </div>

              <p>
                A 16-character password over a 62-character pool works out to 16 × log₂(62) ≈ <strong className="text-foreground">95 bits</strong>.
                Each additional bit doubles the number of guesses an attacker must make, which is why length moves
                the needle far more than sprinkling in punctuation. Going from 12 to 20 characters buys you more
                than adding a single <code className="text-primary">!</code> to the end ever will.
              </p>

              <p>
                <strong className="text-foreground">Step two: convert bits into time.</strong> The tool assumes a
                well-funded attacker running roughly <strong className="text-foreground">10 billion guesses per
                second</strong> — a realistic figure for a rented multi-GPU rig attacking a fast, unsalted hash
                such as MD5 or SHA-1. That produces the left-hand number. The right-hand number divides that rate
                by 600,000 to model what happens when the same password is stretched through PBKDF2 at Locksy&apos;s
                iteration count.
              </p>

              <p>
                That division is the entire point of key stretching. The attacker&apos;s hardware has not changed;
                the cost of testing a single candidate has. Six hundred thousand rounds of HMAC-SHA-256 makes each
                guess about 600,000 times more expensive, which turns an afternoon into a geological era without
                you having to memorise a longer password.
              </p>
            </div>
          </section>

          {/* ── Reading your result ───────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">How to read your result</h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              The four bands below are the exact thresholds the meter uses. They are deliberately conservative:
              a password scoring &ldquo;Strong&rdquo; here is comfortably beyond what opportunistic attacks will
              chew through.
            </p>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-red-500/30">
                <div className="flex items-baseline justify-between gap-4 mb-1.5">
                  <h3 className="font-bold text-red-500">Very Weak — under 30 bits</h3>
                  <span className="text-[11px] font-mono text-muted-foreground flex-shrink-0">entropy &lt; 30</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Falls in minutes to a laptop, never mind a GPU. Short passwords and anything containing a
                  recognisable dictionary word land here. Do not use one of these as a master password — it is
                  the single key protecting everything else.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-amber-500/30">
                <div className="flex items-baseline justify-between gap-4 mb-1.5">
                  <h3 className="font-bold text-amber-500">Moderate — 30 to 54 bits</h3>
                  <span className="text-[11px] font-mono text-muted-foreground flex-shrink-0">30 ≤ entropy &lt; 55</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Survives casual guessing but not a targeted, funded attempt. Acceptable for a throwaway forum
                  login. Not acceptable for email, banking, or anything that can be used to reset other accounts.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-blue-500/30">
                <div className="flex items-baseline justify-between gap-4 mb-1.5">
                  <h3 className="font-bold text-blue-500">Strong — 55 to 79 bits</h3>
                  <span className="text-[11px] font-mono text-muted-foreground flex-shrink-0">55 ≤ entropy &lt; 80</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  The sensible target for everyday accounts. Brute force stops being the cheapest way in, which
                  means an attacker will switch to phishing or malware instead — a useful sign that your password
                  is no longer the weak link.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-emerald-500/30">
                <div className="flex items-baseline justify-between gap-4 mb-1.5">
                  <h3 className="font-bold text-emerald-500">Maximum — 80 bits and above</h3>
                  <span className="text-[11px] font-mono text-muted-foreground flex-shrink-0">entropy ≥ 80</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Brute force is off the table for the foreseeable future, even before key stretching is applied.
                  Aim here for a master password. A four or five word passphrase reaches this range easily and is
                  far easier to type than random characters.
                </p>
              </div>
            </div>
          </section>

          {/* ── Workstation audit (ported from /tools/security-checker) ─ */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">Workstation exposure audit</h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              A perfect password protects the moment you log in. It does nothing about the hours afterwards, when
              the session is already open and authenticated on your screen. Tick whatever describes your setup to
              see how exposed your <em>logged-in</em> tabs are.
            </p>

            <div className="p-6 sm:p-8 rounded-3xl bg-card/80 backdrop-blur-xl border border-border/60 shadow-xl">
              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/30 border border-border/40 cursor-pointer text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    checked={checklist.sharedComputer}
                    onChange={(e) => setChecklist({ ...checklist, sharedComputer: e.target.checked })}
                    className="rounded text-primary focus:ring-0"
                  />
                  <span>This is a shared computer or an open-plan office workstation</span>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/30 border border-border/40 cursor-pointer text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    checked={checklist.unattendedTabs}
                    onChange={(e) => setChecklist({ ...checklist, unattendedTabs: e.target.checked })}
                    className="rounded text-primary focus:ring-0"
                  />
                  <span>I leave tabs open when I step away for coffee or a meeting</span>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/30 border border-border/40 cursor-pointer text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    checked={checklist.autoLockTimer}
                    onChange={(e) => setChecklist({ ...checklist, autoLockTimer: e.target.checked })}
                    className="rounded text-primary focus:ring-0"
                  />
                  <span>An inactivity auto-lock timer is already active on my browser</span>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/30 border border-border/40 cursor-pointer text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    checked={checklist.biometrics}
                    onChange={(e) => setChecklist({ ...checklist, biometrics: e.target.checked })}
                    className="rounded text-primary focus:ring-0"
                  />
                  <span>I can unlock with biometrics (Touch ID, Windows Hello, security key)</span>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/30 border border-border/40 cursor-pointer text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    checked={checklist.stealthMode}
                    onChange={(e) => setChecklist({ ...checklist, stealthMode: e.target.checked })}
                    className="rounded text-primary focus:ring-0"
                  />
                  <span>Sensitive tabs are disguised so titles and favicons do not give them away</span>
                </label>
              </div>

              <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 text-center">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  Workstation Exposure Score
                </div>
                <div className={`text-4xl font-black mb-1 ${healthScore > 75 ? 'text-emerald-500' : healthScore > 50 ? 'text-amber-500' : 'text-red-500'}`}>
                  {healthScore} / 100
                </div>
                <div className="text-xs text-muted-foreground">
                  {healthScore > 75
                    ? 'Solid. Your open sessions are not the easiest way into your accounts.'
                    : 'Your logged-in tabs are reachable by anyone who touches this keyboard.'}
                </div>
              </div>

              <p className="mt-5 text-[11px] text-muted-foreground italic">
                This score is a self-assessment aid, not a scan. It weights the answers you gave — unattended tabs
                cost the most, a missing auto-lock timer next — and nothing is transmitted anywhere.
              </p>
            </div>
          </section>

          {/* ── Limitations ───────────────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">What this tool cannot tell you</h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Any meter that claims to score a password perfectly is overselling itself. Here is where this one
              stops, stated plainly so you can weigh the number appropriately.
            </p>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-muted/20 border border-border/40">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">Entropy assumes randomness you may not have</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  The formula treats every position as an independent random draw. Human-chosen passwords are not
                  random — <code className="text-primary">Summer2026!</code> scores 72 bits on paper but a cracking
                  rule that appends a year and a punctuation mark to a season will find it almost immediately. The
                  bit count is an upper bound on strength, not a guarantee of it.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-muted/20 border border-border/40">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">The dictionary check is deliberately tiny</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  The warning triggers on a short list of notorious strings such as <code className="text-primary">password</code> and
                  <code className="text-primary"> qwerty</code>. Checking against a real corpus of billions of leaked
                  passwords would mean shipping a huge wordlist to your browser or sending your password to a
                  server, and we are not willing to do the second one. A quiet result here does not prove your
                  password is absent from a breach — for that, use our <Link href="/tools/email-breach-checker" className="text-primary hover:underline font-semibold">email breach checker</Link>,
                  which uses k-anonymity so your address never leaves in full.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-muted/20 border border-border/40">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">Crack times are estimates, not promises</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  The 10-billion-guesses-per-second figure is a reasonable 2026 benchmark for consumer GPUs against
                  a fast hash. A nation-state with custom silicon does better; a service using a slow, salted hash
                  makes the attacker do far worse. Treat the numbers as orders of magnitude.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-muted/20 border border-border/40">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">Brute force is rarely how accounts fall</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Credential reuse, phishing pages and malware account for far more real-world compromises than
                  guessing. A 120-bit password typed into a convincing fake login page is worth nothing. Strength
                  is necessary, not sufficient — which is why unique passwords per site and a healthy suspicion of
                  login prompts matter just as much.
                </p>
              </div>
            </div>
          </section>

          {/* ── FAQ ───────────────────────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Is it safe to type my real password here?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  The page never transmits it — there is no form submission, no analytics call carrying the value,
                  and no server involved in scoring. It lives in a React state variable and disappears when you
                  navigate away. That said, the habit of typing real passwords into websites is one worth breaking,
                  so testing a structurally similar variant is a reasonable precaution.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Why does adding length help more than adding symbols?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Length multiplies; character variety only adds. Each extra character multiplies the search space
                  by the whole pool size, whereas adding the symbol class grows the pool from 62 to 94 — a single
                  fixed gain. Eight more lowercase letters beats one exclamation mark by a wide margin.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Is a passphrase better than random characters?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  For anything you must memorise, usually yes. Four or five genuinely random words reach the same
                  bit range as a shorter random string while being far easier to recall and type accurately. The
                  catch is &ldquo;genuinely random&rdquo; — a memorable phrase from a song or film is not. Our
                  <Link href="/tools/password-generator" className="text-primary hover:underline font-semibold"> password generator</Link> draws
                  from the operating system&apos;s cryptographic entropy source rather than anything you could guess.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">What does PBKDF2 with 600,000 iterations actually do?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  It repeatedly re-hashes your password — 600,000 rounds of HMAC-SHA-256 — before the result is used
                  as an encryption key. You wait a fraction of a second once. An attacker pays that cost on every
                  single guess across billions of attempts, which is what makes offline cracking uneconomical. The
                  count exceeds OWASP&apos;s current recommendation for PBKDF2-HMAC-SHA256, and the reasoning is
                  laid out in our <Link href="/security" className="text-primary hover:underline font-semibold">security architecture page</Link>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">My password scored well. Am I done?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Not quite. Two questions remain: is it unique to this one account, and what happens to the
                  session after you have logged in? A strong password reused across services fails the moment any
                  one of them is breached, and no password protects a tab that is already open on an unattended
                  screen. The audit above covers the second gap.
                </p>
              </div>
            </div>
          </section>

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
