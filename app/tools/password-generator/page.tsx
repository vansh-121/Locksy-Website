"use client"

import { useState, useCallback } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import Link from 'next/link'
import { Copy, Check, RefreshCw, Sparkles, Shield, Key } from 'lucide-react'

export default function PasswordGeneratorPage() {
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
