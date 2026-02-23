"use client"

import { useState, useEffect } from "react"

type UnlockState = "locked" | "scanning" | "success" | "idle"

const PLATFORMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
        <path d="M3 12C3 7.03 7.03 3 12 3s9 4.03 9 9-4.03 9-9 9-9-4.03-9-9zm9-7C8.13 5 5 8.13 5 12s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm0 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z"/>
      </svg>
    ),
    label: "Windows Hello",
    sublabel: "Face & Fingerprint",
    gradient: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-500/20",
    iconColor: "text-blue-500",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-700",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.44c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.39-1.32 2.76-2.53 3.95zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
      </svg>
    ),
    label: "Touch ID",
    sublabel: "macOS & iOS",
    gradient: "from-neutral-400/10 to-neutral-600/10",
    border: "border-neutral-400/20",
    iconColor: "text-neutral-600",
    badgeBg: "bg-neutral-100",
    badgeText: "text-neutral-700",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
        <path d="M9 3C6.25 3 4 5.25 4 8s2.25 5 5 5 5-2.25 5-5-2.25-5-5-5zm0 2c1.65 0 3 1.35 3 3S10.65 11 9 11 6 9.65 6 8s1.35-3 3-3zm0 10c-3.87 0-7 1.57-7 3.5V20h14v-1.5C16 14.57 12.87 13 9 13zm6.54.35C16.7 14.23 18 15.36 18 16.5V20h2v-3.5c0-1.58-2.25-2.9-4.46-3.15zM15 3.12A5 5 0 0 1 15 13a5 5 0 0 0 0-9.88z"/>
      </svg>
    ),
    label: "Face ID",
    sublabel: "iPhone & iPad",
    gradient: "from-neutral-400/10 to-neutral-600/10",
    border: "border-neutral-400/20",
    iconColor: "text-neutral-600",
    badgeBg: "bg-neutral-100",
    badgeText: "text-neutral-700",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
        <path d="M6 2a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6zm6 18a1.5 1.5 0 0 1 0-3 1.5 1.5 0 0 1 0 3zM7 7.5A4.5 4.5 0 0 1 11.5 3v1A3.5 3.5 0 0 0 8 7.5H7zM11.5 5V3A4.5 4.5 0 0 1 16 7.5h-1A3.5 3.5 0 0 0 11.5 5z"/>
      </svg>
    ),
    label: "Android Biometrics",
    sublabel: "Fingerprint & Face",
    gradient: "from-green-500/10 to-emerald-500/10",
    border: "border-green-500/20",
    iconColor: "text-green-600",
    badgeBg: "bg-green-500/10",
    badgeText: "text-green-700",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
        <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72a.499.499 0 0 1-.373-.836C5.272 6.53 8.542 5 12.014 5c3.472 0 6.741 1.53 8.887 3.884a.5.5 0 1 1-.747.666C18.163 7.387 15.203 6 12.014 6 8.824 6 5.864 7.387 3.87 9.55a.497.497 0 0 1-.37.17zm3.93 3.81a.5.5 0 0 1-.31-.88A8.01 8.01 0 0 1 12 11a8 8 0 0 1 4.873 1.66.5.5 0 0 1-.619.789A7.012 7.012 0 0 0 12 12a7.01 7.01 0 0 0-4.255 1.451.5.5 0 0 1-.315.089zM12 17c-1.38 0-2.5-1.12-2.5-2.5S10.62 12 12 12s2.5 1.12 2.5 2.5S13.38 17 12 17zm0-4c-.83 0-1.5.67-1.5 1.5S11.17 16 12 16s1.5-.67 1.5-1.5S12.83 13 12 13z"/>
      </svg>
    ),
    label: "USB Security Keys",
    sublabel: "YubiKey & FIDO2",
    gradient: "from-amber-500/10 to-orange-500/10",
    border: "border-amber-500/20",
    iconColor: "text-amber-600",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-700",
  },
]

const SECURITY_POINTS = [
  {
    icon: "🔒",
    title: "Zero Biometric Data Stored",
    desc: "Your fingerprint or face scan never leaves your device — not even to our servers. WebAuthn keeps everything local.",
  },
  {
    icon: "🌐",
    title: "W3C WebAuthn / FIDO2 Standard",
    desc: "Built on the open web standard trusted by Google, Apple, and Microsoft. No proprietary lock-in.",
  },
  {
    icon: "🛡️",
    title: "Phishing-Resistant by Design",
    desc: "Credentials are cryptographically bound to the Locksy origin — they simply cannot be replayed on a fake site.",
  },
  {
    icon: "🔑",
    title: "Fallback to Master Password",
    desc: "Biometrics are a convenience layer. Your master password is always the backup if hardware is unavailable.",
  },
]

const STEPS = [
  { num: 1, icon: "⚙️", title: "Enable in Settings", desc: 'Open Locksy → Settings → Security → toggle "Biometric Unlock".' },
  { num: 2, icon: "👆", title: "Register Your Biometric", desc: "Your browser or OS prompts you once to verify with Touch ID, Windows Hello, or Face ID." },
  { num: 3, icon: "⚡", title: "Instant Unlock", desc: "Next time a tab is locked, just use your biometric — no master password typing needed." },
]

export default function BiometricUnlock() {
  const [unlockState, setUnlockState] = useState<UnlockState>("idle")
  const [scanProgress, setScanProgress] = useState(0)
  const [autoDemo, setAutoDemo] = useState(true)

  // Run a looping demo automatically
  useEffect(() => {
    if (!autoDemo) return

    let timeout: ReturnType<typeof setTimeout>

    const runCycle = () => {
      setUnlockState("locked")
      setScanProgress(0)

      timeout = setTimeout(() => {
        setUnlockState("scanning")
        let progress = 0
        const progressInterval = setInterval(() => {
          progress += 4
          setScanProgress(Math.min(progress, 100))
          if (progress >= 100) {
            clearInterval(progressInterval)
            setUnlockState("success")
            timeout = setTimeout(() => {
              setUnlockState("idle")
              timeout = setTimeout(runCycle, 1200)
            }, 2200)
          }
        }, 60)
      }, 1800)
    }

    timeout = setTimeout(runCycle, 600)
    return () => clearTimeout(timeout)
  }, [autoDemo])

  const handleManualTrigger = () => {
    if (unlockState === "scanning") return
    setAutoDemo(false)

    setUnlockState("locked")
    setScanProgress(0)

    setTimeout(() => {
      setUnlockState("scanning")
      let progress = 0
      const progressInterval = setInterval(() => {
        progress += 5
        setScanProgress(Math.min(progress, 100))
        if (progress >= 100) {
          clearInterval(progressInterval)
          setUnlockState("success")
          setTimeout(() => {
            setUnlockState("locked")
            setScanProgress(0)
            setAutoDemo(true)
          }, 2500)
        }
      }, 50)
    }, 400)
  }

  return (
    <section
      id="biometric-unlock"
      className="py-24 md:py-32 bg-gradient-to-br from-violet-500/5 via-indigo-500/5 to-purple-500/5 relative overflow-hidden"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/5 w-80 h-80 bg-violet-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-0 right-1/3 w-64 h-64 bg-purple-500/6 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">

        {/* ── Section Header ───────────────────────────────────────── */}
        <div className="text-center mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full text-xs sm:text-sm font-bold mb-6 shadow-lg">
            <span>🆕</span>
            NEW IN v2.3.0
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Unlock with a Touch.<br className="hidden sm:block" /> No Password Typing.
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Locksy now supports{" "}
            <strong className="text-foreground">WebAuthn / FIDO2 biometric authentication</strong>
            {" "}— use your fingerprint, face, or security key to unlock protected tabs instantly. Your biometric data never leaves your device.
          </p>
        </div>

        {/* ── Main Demo + Features Grid ────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-20">

          {/* Left — Interactive Mock UI */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">

              {/* Glow ring behind card */}
              <div
                className={`absolute inset-0 rounded-3xl blur-2xl transition-all duration-700 ${
                  unlockState === "success"
                    ? "bg-gradient-to-br from-emerald-400/30 to-teal-400/30 scale-105"
                    : unlockState === "scanning"
                    ? "bg-gradient-to-br from-indigo-400/25 to-violet-400/25 scale-102"
                    : "bg-gradient-to-br from-violet-400/15 to-indigo-400/15"
                }`}
              />

              {/* Card */}
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-white/60 shadow-2xl overflow-hidden">

                {/* Browser chrome bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-neutral-100/80 border-b border-neutral-200/60">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-2 bg-white rounded-md px-3 py-1 text-xs text-neutral-400 border border-neutral-200 truncate">
                    🔒 github.com · protected by Locksy
                  </div>
                </div>

                {/* Lock overlay content */}
                <div className="px-6 py-8 flex flex-col items-center gap-5 min-h-[320px] justify-center">

                  {/* Biometric icon with pulse ring */}
                  <div className="relative flex items-center justify-center">
                    {/* Outer pulse rings */}
                    {unlockState === "scanning" && (
                      <>
                        <div className="absolute w-28 h-28 rounded-full border-2 border-indigo-400/40 animate-ping" />
                        <div className="absolute w-20 h-20 rounded-full border-2 border-violet-400/60 animate-ping delay-150" />
                      </>
                    )}
                    {unlockState === "success" && (
                      <div className="absolute w-28 h-28 rounded-full bg-emerald-400/20 animate-ping" />
                    )}

                    {/* Main icon circle */}
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all duration-500 shadow-lg ${
                        unlockState === "success"
                          ? "bg-gradient-to-br from-emerald-400 to-teal-500 scale-110"
                          : unlockState === "scanning"
                          ? "bg-gradient-to-br from-indigo-500 to-violet-600 scale-105"
                          : "bg-gradient-to-br from-violet-500 to-indigo-600"
                      }`}
                    >
                      {unlockState === "success" ? "✓" : "👆"}
                    </div>
                  </div>

                  {/* Status text */}
                  <div className="text-center space-y-1">
                    <p
                      className={`font-bold text-lg transition-colors duration-300 ${
                        unlockState === "success"
                          ? "text-emerald-600"
                          : unlockState === "scanning"
                          ? "text-indigo-600"
                          : "text-foreground"
                      }`}
                    >
                      {unlockState === "idle" && "Tab Locked"}
                      {unlockState === "locked" && "Touch to Unlock"}
                      {unlockState === "scanning" && "Verifying…"}
                      {unlockState === "success" && "Tab Unlocked!"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {unlockState === "idle" && "Use your biometric or master password"}
                      {unlockState === "locked" && "WebAuthn prompt will appear"}
                      {unlockState === "scanning" && "Biometric check in progress"}
                      {unlockState === "success" && "\u2714 Authenticated via Windows Hello"}
                    </p>
                  </div>

                  {/* Progress bar (visible when scanning) */}
                  <div
                    className={`w-full transition-opacity duration-300 ${
                      unlockState === "scanning" ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="w-full bg-indigo-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-100"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-2 w-full">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">or</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  {/* Trigger button */}
                  <button
                    onClick={handleManualTrigger}
                    disabled={unlockState === "scanning"}
                    aria-label="Demo biometric unlock"
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      unlockState === "success"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-wait"
                    }`}
                  >
                    {unlockState === "success" ? "✓ Unlocked" : "👆 Try Biometric Demo"}
                  </button>

                  <p className="text-[10px] text-muted-foreground text-center">
                    No real biometric data used · Simulated demo
                  </p>
                </div>
              </div>

              {/* WebAuthn badge below card */}
              <div className="mt-4 flex justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 border border-violet-200 rounded-full text-xs text-violet-700 font-medium shadow-sm backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                  Secured by W3C WebAuthn / FIDO2
                </div>
              </div>
            </div>
          </div>

          {/* Right — Security guarantees */}
          <div className="space-y-4">
            {SECURITY_POINTS.map((point, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 bg-white/70 backdrop-blur-sm rounded-2xl border border-primary/10 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
              >
                <div className="text-2xl flex-shrink-0 mt-0.5">{point.icon}</div>
                <div>
                  <h3 className="font-semibold text-base mb-1">{point.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Platform Support ─────────────────────────────────────── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Works with Your Device's Built-In Security</h3>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              No external hardware required. Locksy leverages the authenticator already in your laptop, phone, or security key.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PLATFORMS.map((platform, i) => (
              <div
                key={i}
                className={`group flex flex-col items-center gap-3 p-5 bg-gradient-to-br ${platform.gradient} rounded-2xl border ${platform.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default`}
              >
                <div className={`${platform.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                  {platform.icon}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm">{platform.label}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${platform.badgeBg} ${platform.badgeText} font-medium`}>
                    {platform.sublabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── How it Works ─────────────────────────────────────────── */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-primary/10 p-8 md:p-12 shadow-sm">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Set It Up in 3 Steps</h3>
            <p className="text-muted-foreground text-sm sm:text-base">Enable biometric unlock in under a minute.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {STEPS.map((step, i) => (
              <div key={i} className="relative text-center group">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-[-50%] h-px bg-gradient-to-r from-primary/30 to-transparent" />
                )}
                <div className="bg-gradient-to-br from-primary to-secondary text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
                  {step.icon}
                </div>
                <div className="inline-flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-xs font-bold mb-2">
                  {step.num}
                </div>
                <h4 className="font-bold text-base mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-lg inline-flex items-center justify-center gap-2"
            >
              <img src="/browsers/chrome.png" alt="Chrome" className="w-5 h-5 flex-shrink-0" />
              Get Locksy v2.3.0
            </a>
            <a
              href="https://github.com/vansh-121/Locksy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-lg inline-flex items-center justify-center gap-2"
            >
              View Source on GitHub
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
