"use client"

import { SmartInstallButton } from "@/components/install-buttons"
import { useState } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProUpgradeCard from "@/components/pro-upgrade-card"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import { PageHero, PageSection } from "@/components/page-shell"
import SectionHeading from "@/components/section-heading"
import Link from 'next/link'
import { Eye, EyeOff, Check, X, AlertCircle, Lock } from 'lucide-react'

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
    return { label: "Exceptional (Maximum)", color: "bg-emerald-500", text: "text-emerald-500", width: 100 }
  }

  const rating = getScoreRating()

  // Display-only colours for the meter, derived from the rating band above.
  const meter =
    rating.width === 100
      ? { bar: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400" }
      : rating.width === 75
        ? { bar: "bg-highlight", text: "text-highlight" }
        : rating.width === 50
          ? { bar: "bg-amber-500", text: "text-amber-600 dark:text-amber-400" }
          : rating.width === 25
            ? { bar: "bg-red-500", text: "text-red-600 dark:text-red-400" }
            : { bar: "bg-muted", text: "text-muted-foreground" }

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

  const healthBar = healthScore > 75 ? "bg-emerald-500" : healthScore > 50 ? "bg-amber-500" : "bg-red-500"
  const healthText =
    healthScore > 75
      ? "text-emerald-600 dark:text-emerald-400"
      : healthScore > 50
        ? "text-amber-600 dark:text-amber-400"
        : "text-red-600 dark:text-red-400"

  const complexity = [
    { ok: hasLower, label: "Lowercase" },
    { ok: hasUpper, label: "Uppercase" },
    { ok: hasNumber, label: "Numbers" },
    { ok: hasSymbol, label: "Symbols" },
    { ok: isLongEnough, label: "12+ Chars" },
  ]

  const checklistItems: { key: keyof typeof checklist; label: string }[] = [
    { key: "sharedComputer", label: "This is a shared computer or an open-plan office workstation" },
    { key: "unattendedTabs", label: "I leave tabs open when I step away for coffee or a meeting" },
    { key: "autoLockTimer", label: "An inactivity auto-lock timer is already active on my browser" },
    { key: "biometrics", label: "I can unlock with biometrics (Touch ID, Windows Hello, security key)" },
    { key: "stealthMode", label: "Sensitive tabs are disguised so titles and favicons do not give them away" },
  ]

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <PageHero
          eyebrow="100% Client-Side Memory Calculation"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Password Strength Checker" },
          ]}
          title={
            <>
              Password Strength &amp; <span className="text-highlight">Entropy Meter</span>
            </>
          }
          description={
            <>
              Test your password&apos;s brute-force resistance against standard attacks vs{" "}
              <strong className="font-medium text-foreground">600,000 PBKDF2 iterations</strong>.
            </>
          }
        />

        {/* Main Card */}
        <section className="relative pb-12 md:pb-16">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <div className="surface p-6 md:p-8">
              {/* Input */}
              <label htmlFor="strength-password-input" className="block text-sm font-medium text-foreground">
                Type or Paste Test Password:
              </label>
              <div className="relative mt-2">
                <input
                  id="strength-password-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your master password or phrase..."
                  autoComplete="off"
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-12 font-mono text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Gauge */}
              <div className="mt-8">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Entropy Score:</div>
                    <div className="mt-1 font-display text-5xl font-semibold leading-none text-foreground">
                      {entropy} <span className="text-lg font-medium text-muted-foreground">Bits</span>
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${meter.text}`}>{rating.label}</span>
                </div>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${meter.bar}`}
                    style={{ width: `${rating.width}%` }}
                  />
                </div>
              </div>

              {/* Crack Time Comparison Grid */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-background p-5">
                  <div className="text-xs text-muted-foreground">Standard MD5 / SHA-1 Crack Time</div>
                  <div className="mt-2 font-display text-2xl font-semibold text-foreground">{standardTime}</div>
                  <div className="mt-1 text-xs text-muted-foreground">Unprotected single-hash brute force</div>
                </div>

                <div className="rounded-xl border border-highlight/30 bg-highlight/10 p-5">
                  <div className="text-xs text-highlight">Locksy PBKDF2 600,000 Iteration Time</div>
                  <div className="mt-2 font-display text-2xl font-semibold text-foreground">{pbkdf2Time}</div>
                  <div className="mt-1 text-xs text-muted-foreground">High-entropy key derivation protection</div>
                </div>
              </div>

              {/* Character Complexity Checklist */}
              <ul className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
                {complexity.map(({ ok, label }) => (
                  <li
                    key={label}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
                      ok
                        ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    {ok ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <X className="h-3.5 w-3.5" aria-hidden="true" />}
                    <span>{label}</span>
                  </li>
                ))}
              </ul>

              {isCommon && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span><strong>Warning:</strong> This password matches common leaked dictionary words. Avoid using it for your master password.</span>
                </div>
              )}

              <p className="mt-6 flex items-start gap-2 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
                <Lock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-highlight" aria-hidden="true" />
                <span>
                  Nothing you type here is saved, logged, or sent over the network. The entropy maths runs in
                  JavaScript on this page and the value is discarded the moment you close the tab.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* ── How the score is calculated ───────────────────────────── */}
        <PageSection width="narrow">
          <SectionHeading align="left" title="How this calculator works" />

          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Most strength meters hand you a vague colour bar. This one shows the actual number it is reasoning
              about, so you can check the arithmetic yourself. The calculation has two steps.
            </p>

            <p>
              <strong className="font-medium text-foreground">Step one: measure the search space.</strong> The tool inspects
              which character classes your password draws on and adds up the corresponding alphabet sizes —
              lowercase adds 26, uppercase adds 26, digits add 10, and symbols add 32. That total is the
              <em> pool</em>. A password using lowercase, uppercase and digits has a pool of 62 possible
              characters in every position.
            </p>

            <div className="rounded-xl border border-border bg-card px-5 py-4 font-mono text-sm text-foreground">
              entropy (bits) = length × log₂(pool)
            </div>

            <p>
              A 16-character password over a 62-character pool works out to 16 × log₂(62) ≈ <strong className="font-medium text-foreground">95 bits</strong>.
              Each additional bit doubles the number of guesses an attacker must make, which is why length moves
              the needle far more than sprinkling in punctuation. Going from 12 to 20 characters buys you more
              than adding a single <code className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">!</code> to the end ever will.
            </p>

            <p>
              <strong className="font-medium text-foreground">Step two: convert bits into time.</strong> The tool assumes a
              well-funded attacker running roughly <strong className="font-medium text-foreground">10 billion guesses per
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
        </PageSection>

        {/* ── Reading your result ───────────────────────────────────── */}
        <PageSection width="narrow">
          <SectionHeading
            align="left"
            title="How to read your result"
            description={
              <>
                The four bands below are the exact thresholds the meter uses. They are deliberately conservative:
                a password scoring &ldquo;Strong&rdquo; here is comfortably beyond what opportunistic attacks will
                chew through.
              </>
            }
          />

          <div className="surface mt-8 divide-y divide-border overflow-hidden">
            {[
              {
                dot: "bg-red-500",
                title: "Very Weak — under 30 bits",
                range: "entropy < 30",
                text: "Falls in minutes to a laptop, never mind a GPU. Short passwords and anything containing a recognisable dictionary word land here. Do not use one of these as a master password — it is the single key protecting everything else.",
              },
              {
                dot: "bg-amber-500",
                title: "Moderate — 30 to 54 bits",
                range: "30 ≤ entropy < 55",
                text: "Survives casual guessing but not a targeted, funded attempt. Acceptable for a throwaway forum login. Not acceptable for email, banking, or anything that can be used to reset other accounts.",
              },
              {
                dot: "bg-highlight",
                title: "Strong — 55 to 79 bits",
                range: "55 ≤ entropy < 80",
                text: "The sensible target for everyday accounts. Brute force stops being the cheapest way in, which means an attacker will switch to phishing or malware instead — a useful sign that your password is no longer the weak link.",
              },
              {
                dot: "bg-emerald-500",
                title: "Maximum — 80 bits and above",
                range: "entropy ≥ 80",
                text: "Brute force is off the table for the foreseeable future, even before key stretching is applied. Aim here for a master password. A four or five word passphrase reaches this range easily and is far easier to type than random characters.",
              },
            ].map((band) => (
              <div key={band.title} className="p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                    <span className={`h-2 w-2 flex-shrink-0 rounded-full ${band.dot}`} aria-hidden="true" />
                    {band.title}
                  </h3>
                  <span className="flex-shrink-0 font-mono text-xs text-muted-foreground">{band.range}</span>
                </div>
                <p className="mt-2 pl-[18px] text-sm leading-relaxed text-muted-foreground">{band.text}</p>
              </div>
            ))}
          </div>
        </PageSection>

        {/* ── Workstation audit (ported from /tools/security-checker) ─ */}
        <PageSection width="narrow">
          <SectionHeading
            align="left"
            title="Workstation exposure audit"
            description={
              <>
                A perfect password protects the moment you log in. It does nothing about the hours afterwards, when
                the session is already open and authenticated on your screen. Tick whatever describes your setup to
                see how exposed your <em>logged-in</em> tabs are.
              </>
            }
          />

          <div className="surface mt-8 p-6 md:p-8">
            <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-background">
              {checklistItems.map(({ key, label }) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-center gap-3 px-4 py-3.5 text-sm text-foreground transition-colors hover:bg-muted/50"
                >
                  <input
                    type="checkbox"
                    checked={checklist[key]}
                    onChange={(e) => setChecklist({ ...checklist, [key]: e.target.checked })}
                    className="h-4 w-4 flex-shrink-0 cursor-pointer rounded accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-border bg-background p-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="text-xs text-muted-foreground">Workstation Exposure Score</div>
                  <div className={`mt-1 font-display text-4xl font-semibold leading-none ${healthText}`}>
                    {healthScore} / 100
                  </div>
                </div>
              </div>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className={`h-full rounded-full transition-all duration-500 ${healthBar}`} style={{ width: `${healthScore}%` }} />
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                {healthScore > 75
                  ? 'Solid. Your open sessions are not the easiest way into your accounts.'
                  : 'Your logged-in tabs are reachable by anyone who touches this keyboard.'}
              </div>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              This score is a self-assessment aid, not a scan. It weights the answers you gave — unattended tabs
              cost the most, a missing auto-lock timer next — and nothing is transmitted anywhere.
            </p>
          </div>
        </PageSection>

        {/* ── Password Security Tips ───────────────────────────────────── */}
        <PageSection width="narrow">
          <SectionHeading align="left" title="Tips for Creating Strong Passwords" />

          <div className="mt-8 grid gap-4">
            {[
              {
                title: "Length is Your Best Defense",
                text: "Every additional character drastically increases the number of combinations an attacker must test. Aim for at least 16 characters for critical master passwords.",
              },
              {
                title: "Consider Using a Passphrase",
                text: "Combining 4 to 5 random words creates a password that is virtually impossible to brute-force while remaining significantly easier to remember and type.",
              },
              {
                title: "Avoid Common Patterns and Personal Info",
                text: "Never use dictionary words, birthdates, predictable replacements (such as @ for a), or repeated sequences that automated password crackers test first.",
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
            {[
              {
                q: "Is it safe to test my password here?",
                a: "Yes. Calculations run locally inside your browser memory. Your password is never sent across the internet, saved, or logged.",
              },
              {
                q: "Why is length better than adding symbols?",
                a: "Length exponentially multiplies the total search space, whereas adding a symbol only slightly increases the pool of characters.",
              },
              {
                q: "What is PBKDF2 encryption?",
                a: "PBKDF2 is an industry-standard key stretching function that makes brute-force guessing attacks exponentially slower and computationally expensive for attackers.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="py-5">
                <h3 className="font-sans text-base font-medium tracking-normal text-foreground">{q}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </PageSection>

        {/* Call to Action */}
        <PageSection width="narrow">
          <div className="surface px-6 py-10 text-center md:px-10">
            <h3 className="text-2xl font-semibold text-foreground text-balance">Protect Open Tabs with Locksy</h3>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              Lock and encrypt active browser tabs with PBKDF2 encryption, master password security, and biometric unlock.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <SmartInstallButton label="Add Locksy to {name}, free" />
              <Link href="/tools/password-generator" className="btn-secondary">
                Generate Secure Password
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
