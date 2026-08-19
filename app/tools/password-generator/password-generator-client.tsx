"use client"

import { useState, useCallback } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import Link from 'next/link'
import { Copy, Check, RefreshCw, Sparkles, Shield, Key } from 'lucide-react'

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

  const [passwords, setPasswords] = useState<string[]>(() => [
    generateSinglePassword(),
    generateSinglePassword(),
    generateSinglePassword(),
    generateSinglePassword(),
    generateSinglePassword()
  ])

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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Cryptographically Secure (Uint32 Array)
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              Random Password <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Generator</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Generate uncrackable, high-entropy passwords natively using <code className="text-primary font-mono text-xs">crypto.getRandomValues()</code>.
            </p>
          </div>

          {/* Controls Card */}
          <div className="p-5 sm:p-8 rounded-3xl bg-card/80 backdrop-blur-xl border border-border/60 shadow-2xl mb-8">
            
            {/* Length Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Password Length: <strong className="text-primary text-base font-black ml-1">{length} Characters</strong>
                </label>
                <span className="text-xs text-emerald-500 font-bold">High Entropy</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Options Checkboxes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/40 cursor-pointer text-xs font-bold">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="rounded text-primary focus:ring-0"
                />
                <span>Uppercase (A-Z)</span>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/40 cursor-pointer text-xs font-bold">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="rounded text-primary focus:ring-0"
                />
                <span>Lowercase (a-z)</span>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/40 cursor-pointer text-xs font-bold">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="rounded text-primary focus:ring-0"
                />
                <span>Numbers (0-9)</span>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/40 cursor-pointer text-xs font-bold">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="rounded text-primary focus:ring-0"
                />
                <span>Symbols (!@#$)</span>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/40 cursor-pointer text-xs font-bold sm:col-span-2">
                <input
                  type="checkbox"
                  checked={avoidAmbiguous}
                  onChange={(e) => setAvoidAmbiguous(e.target.checked)}
                  className="rounded text-primary focus:ring-0"
                />
                <span>Avoid Ambiguous Characters (l, 1, O, 0)</span>
              </label>
            </div>

            <button
              onClick={handleRegenerate}
              className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <RefreshCw className="w-4 h-4" /> Generate New Passwords
            </button>
          </div>

          {/* Generated List */}
          <div className="space-y-3 mb-12">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Generated Passwords (Click to Copy):</h2>
            {passwords.map((pwd, idx) => (
              <div
                key={idx}
                onClick={() => handleCopy(pwd, idx)}
                className="p-4 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/60 hover:border-emerald-500/50 transition-all flex items-center justify-between cursor-pointer group shadow-sm"
              >
                <code className="text-foreground font-mono text-sm sm:text-base font-bold tracking-wider break-all select-all">
                  {pwd}
                </code>
                <button
                  type="button"
                  className="ml-4 p-2 rounded-xl bg-muted group-hover:bg-emerald-500 group-hover:text-white transition-colors text-muted-foreground flex-shrink-0"
                >
                  {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-500 group-hover:text-white" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>

          {/* ── How it works ──────────────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">Where this randomness comes from</h2>

            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                Every password on this page is drawn from{' '}
                <code className="text-primary font-mono text-xs sm:text-sm">crypto.getRandomValues()</code>, the
                browser&apos;s cryptographically secure random number generator. It is seeded by your operating
                system&apos;s entropy pool — the same source that seeds TLS session keys — and it is specified to be
                unpredictable even to someone who has observed every previous output.
              </p>

              <p>
                That distinction matters more than it sounds. The obvious alternative,{' '}
                <code className="text-primary font-mono text-xs sm:text-sm">Math.random()</code>, is a fast
                pseudo-random generator built for shuffling arrays and jittering animations. It is seeded from a
                small internal state, and given enough consecutive outputs that state can be reconstructed — after
                which every future value is predictable. Plenty of &ldquo;random password&rdquo; pages on the web
                still use it. Generating a key with it is a bit like choosing a lock because it looks sturdy in the
                photograph.
              </p>

              <p>
                The generator requests a <code className="text-primary font-mono text-xs sm:text-sm">Uint32Array</code> of
                the length you asked for, then maps each 32-bit value onto your selected alphabet. Because it runs
                entirely in the page, no password is ever transmitted, logged, or stored — reload and the previous
                five are gone for good. There is no server-side generation to trust, which is the only satisfying
                answer to &ldquo;how do I know you are not keeping these?&rdquo;
              </p>

              <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/25 not-italic">
                <h3 className="font-bold text-foreground mb-2 text-sm">One honest caveat about the mapping</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Mapping a 32-bit integer onto an alphabet with the modulo operator introduces a theoretical bias,
                  because 2³² is not an exact multiple of 94. The lowest few characters in the set are very
                  marginally more likely than the rest — a relative skew on the order of one part in forty million.
                  Rejection sampling would remove it entirely. We mention it because a page about cryptographic
                  randomness ought to be precise, not because it affects you: the bias is many orders of magnitude
                  below anything that could help an attacker, and it is dwarfed by the effect of choosing a
                  password one character shorter.
                </p>
              </div>
            </div>
          </section>

          {/* ── Length guidance ───────────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">How long should it be?</h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              With all four character classes enabled the alphabet is 94 characters, worth about 6.55 bits per
              position. That makes the arithmetic straightforward — here is what the slider is actually buying you:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-border/60 mb-6">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-muted/40">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-bold text-foreground">Length</th>
                    <th className="px-4 py-3 font-bold text-foreground">Entropy</th>
                    <th className="px-4 py-3 font-bold text-foreground">Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold">8</td>
                    <td className="px-4 py-3 font-mono">≈ 52 bits</td>
                    <td className="px-4 py-3 text-muted-foreground">Below par in 2026. Fine for a disposable signup, nothing more.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold">12</td>
                    <td className="px-4 py-3 font-mono">≈ 79 bits</td>
                    <td className="px-4 py-3 text-muted-foreground">A sensible floor for ordinary accounts.</td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="px-4 py-3 font-mono font-bold">16</td>
                    <td className="px-4 py-3 font-mono">≈ 105 bits</td>
                    <td className="px-4 py-3 text-muted-foreground">The default here, and the right answer for almost everything.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold">20</td>
                    <td className="px-4 py-3 font-mono">≈ 131 bits</td>
                    <td className="px-4 py-3 text-muted-foreground">Comfortably past the point of diminishing returns.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold">32+</td>
                    <td className="px-4 py-3 font-mono">≈ 210 bits</td>
                    <td className="px-4 py-3 text-muted-foreground">Only worth it where a manager types it for you.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Past roughly 100 bits, brute force stops being the attack anyone would attempt — the password is no
              longer the cheapest way into the account, and effort shifts to phishing or malware. Pushing from 105
              bits to 210 bits does not make you meaningfully safer; it just makes the string harder to type on a
              phone. Spend the effort on making each password <em>unique</em> instead, which is the failure mode that
              actually causes breaches to cascade.
            </p>
          </section>

          {/* ── Using what you generate ───────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">What to do with the password you just made</h2>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">Do not try to memorise a random string</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  A 16-character random password is designed to be unmemorable — that is the whole point. Paste it
                  into a password manager and let the manager remember it. The one password you should commit to
                  memory is the master password guarding that vault, and for that a long passphrase of random words
                  beats random characters, because you will actually be able to type it correctly under pressure.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">Mind the clipboard</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Copying a password puts it somewhere other applications can read, and on some systems it
                  synchronises to your other devices. Paste it where it needs to go, then copy something harmless
                  over it. Be especially careful with clipboard-history utilities, which cheerfully keep a
                  searchable log of everything you have ever copied.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">Never reuse it, not even once</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Credential-stuffing attacks take username and password pairs from one breached service and try
                  them everywhere else. Strength offers no protection here — a 200-bit password that appears in a
                  leak is as compromised as <code className="text-primary">hunter2</code>. Generate a fresh one per
                  account; this page will happily produce five at a time.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">Remember what a password stops protecting</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Authentication ends the moment you are logged in. After that the session sits open in a tab,
                  fully decrypted, for as long as you leave it there — visible to anyone who walks past your screen
                  or gets a moment at your keyboard. That gap is what Locksy exists to close, and it is not
                  something a stronger password can help with.
                </p>
              </div>
            </div>
          </section>

          {/* ── FAQ ───────────────────────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Are these passwords sent to a server?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  No. Generation happens in your browser via the Web Crypto API. There is no network request
                  involved in producing or displaying them, and nothing is written to storage — which you can verify
                  yourself by opening your browser&apos;s network panel and clicking Generate.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Could two people get the same password?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  At 16 characters there are roughly 4 × 10³¹ possibilities. If every person alive generated a
                  password every second for the age of the universe, a collision would still be wildly improbable.
                  Each browser also draws from its own operating-system entropy pool, so there is no shared seed to
                  worry about.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Should I enable &ldquo;avoid ambiguous characters&rdquo;?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Only if you expect to read the password off a screen and retype it — the option removes{' '}
                  <code className="text-primary">l</code>, <code className="text-primary">1</code>,{' '}
                  <code className="text-primary">I</code>, <code className="text-primary">O</code> and{' '}
                  <code className="text-primary">0</code>, which are easy to confuse in many fonts. It shrinks the
                  alphabet from 94 to 89, costing about one bit at 16 characters. That is a rounding error, so
                  choose based on convenience rather than security.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">A site rejected my generated password. Now what?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Some services still impose short maximum lengths or ban particular symbols — usually a sign of
                  questionable password handling behind the scenes. Turn off the symbol class or shorten the length
                  until it is accepted. A 16-character alphanumeric password is still about 95 bits, which is
                  perfectly respectable.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">How do I check a password I already use?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Our <Link href="/tools/password-strength-checker" className="text-primary hover:underline font-semibold">password
                  strength checker</Link> shows its entropy and estimated crack time, and the{' '}
                  <Link href="/tools/email-breach-checker" className="text-primary hover:underline font-semibold">email breach
                  checker</Link> tells you whether your address has surfaced in a known breach. Both run
                  client-side.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-primary/10 border border-emerald-500/20 text-center">
            <h3 className="text-xl font-bold mb-2">Store Master Passwords Safely with Locksy</h3>
            <p className="text-xs text-muted-foreground mb-6 max-w-lg mx-auto">
              Use your generated password as your Locksy master password to lock browser tabs with 600,000 PBKDF2 iterations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/#download" className="btn-primary text-xs py-3 px-6">
                Install Locksy Free
              </Link>
              <Link href="/tools/password-strength-checker" className="btn-secondary text-xs py-3 px-6">
                Test Password Strength Meter
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
