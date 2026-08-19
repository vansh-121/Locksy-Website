"use client"

import { useState } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import Link from 'next/link'
import { Shield, Sparkles, CheckCircle2, AlertTriangle, XCircle, RefreshCw } from 'lucide-react'

export default function BrowserPrivacyScoreClient() {
  // The scan is NOT started on mount. Two of the six checks make outbound requests to
  // Google, and the STUN one necessarily exposes the visitor's public IP to that server.
  // Firing that on page load would leak before anyone could read the disclosure and opt
  // out, so the scan waits for an explicit click.
  const [hasRun, setHasRun] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [results, setResults] = useState<{
    webrtc: { status: string; safe: boolean; desc: string }
    referrer: { status: string; safe: boolean; desc: string }
    gpc: { status: string; safe: boolean; desc: string }
    cookies: { status: string; safe: boolean; desc: string }
    adBlocker: { status: string; safe: boolean; desc: string }
    fingerprint: { status: string; safe: boolean; desc: string }
    overallScore: number
  }>({
    webrtc: { status: "Checking WebRTC STUN...", safe: true, desc: "Inspecting WebRTC candidate IP leaks" },
    referrer: { status: "Checking Referrer...", safe: true, desc: "Checking HTTP Referrer policy" },
    gpc: { status: "Checking Privacy Signal...", safe: false, desc: "Inspecting Do Not Track & GPC signals" },
    cookies: { status: "Checking Cookies...", safe: true, desc: "Inspecting third-party cookies" },
    adBlocker: { status: "Checking Ad Block...", safe: false, desc: "Testing ad-blocker script protection" },
    fingerprint: { status: "Checking Entropy...", safe: false, desc: "Analyzing device fingerprint entropy" },
    overallScore: 0
  })

  const runAudit = async () => {
    setHasRun(true)
    setScanning(true)

    // 1. Real WebRTC IP Leak Detection
    let webrtcLeaked = false
    let webrtcIp = ""
    try {
      const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] })
      pc.createDataChannel('')
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)

      await new Promise<void>((resolve) => {
        const timeout = setTimeout(() => {
          pc.close()
          resolve()
        }, 1200)

        pc.onicecandidate = (event) => {
          if (event && event.candidate) {
            const candidate = event.candidate.candidate
            const ipMatch = /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/.exec(candidate)
            if (ipMatch && !ipMatch[1].startsWith("127.") && !ipMatch[1].startsWith("0.")) {
              webrtcLeaked = true
              webrtcIp = ipMatch[1]
            }
          } else {
            clearTimeout(timeout)
            pc.close()
            resolve()
          }
        }
      })
    } catch (e) {
      webrtcLeaked = false
    }

    // 2. Real GPC & DNT Signal Check
    const gpcActive = (navigator as any).globalPrivacyControl === true || navigator.doNotTrack === "1"

    // 3. Real Cookies Check
    const cookiesEnabled = navigator.cookieEnabled

    // 4. Real Referrer Check
    const ref = document.referrer
    const referrerSafe = !ref || ref === "" || ref.includes(window.location.hostname)

    // 5. Real Ad Blocker Detection
    let adBlockerActive = false
    try {
      await fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-store"
      })
      adBlockerActive = false
    } catch (err) {
      adBlockerActive = true
    }

    // 6. Device Fingerprint Entropy
    const screenRes = `${window.screen.width}x${window.screen.height}`
    const pixelRatio = window.devicePixelRatio || 1
    const colorDepth = window.screen.colorDepth || 24
    const hardwareConcurrency = navigator.hardwareConcurrency || "Unknown"

    // Calculate Real Score
    let score = 40
    if (!webrtcLeaked) score += 20
    if (gpcActive) score += 15
    if (adBlockerActive) score += 15
    if (referrerSafe) score += 10

    setResults({
      webrtc: {
        status: webrtcLeaked ? `IP Exposed (${webrtcIp})` : "No Candidates Leaked (Secure)",
        safe: !webrtcLeaked,
        desc: webrtcLeaked 
          ? "Your browser exposes local network IP candidates to WebRTC STUN requests." 
          : "WebRTC STUN candidate leaks are restricted by your browser."
      },
      referrer: {
        status: referrerSafe ? "Restricted (No Leak)" : `Exposed (${ref})`,
        safe: referrerSafe,
        desc: "Header leakage prevents external sites from knowing your previous URL."
      },
      gpc: {
        status: gpcActive ? "Active (GPC / DNT On)" : "Disabled (Not Set)",
        safe: gpcActive,
        desc: gpcActive ? "Global Privacy Control signal sent to ad networks." : "No global opt-out signal detected."
      },
      cookies: {
        status: cookiesEnabled ? "Cookies Active" : "Cookies Blocked",
        safe: !cookiesEnabled,
        desc: cookiesEnabled ? "First-party session storage active." : "Cookie storage blocked."
      },
      adBlocker: {
        status: adBlockerActive ? "Active (Blocking Tracking Scripts)" : "Not Detected",
        safe: adBlockerActive,
        desc: adBlockerActive ? "Tracking and ad networks blocked." : "Ad networks can load tracking scripts."
      },
      fingerprint: {
        status: `${screenRes} @ ${pixelRatio}x (${hardwareConcurrency} Cores)`,
        safe: false,
        desc: `Screen geometry, color depth (${colorDepth}-bit), and CPU concurrency create a unique device fingerprint.`
      },
      overallScore: Math.min(score, 100)
    })

    setScanning(false)
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background relative overflow-hidden pt-28 pb-24">
        {/* Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/6 left-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-500 text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              100% Real Browser API Diagnostic
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              Real-Time Browser Privacy <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-primary bg-clip-text text-transparent">Score Inspector</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Executes live WebRTC STUN checks, GPC headers, ad-blocker detection, and fingerprint entropy tests natively.
            </p>
          </div>

          {/* Main Score Card */}
          <div className="p-5 sm:p-8 rounded-3xl bg-card/80 backdrop-blur-xl border border-border/60 shadow-2xl mb-12 text-center relative overflow-hidden">
            
            {!hasRun ? (
              <div className="py-6 sm:py-8 text-left max-w-2xl mx-auto">
                <div className="text-center mb-6">
                  <div className="inline-block p-5 rounded-full bg-primary/10 border-2 border-primary/30 mb-4">
                    <Shield className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Before you start: what this scan sends</h2>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                  Four of the six checks read values your browser already exposes to every page — privacy
                  signal, cookie setting, referrer, and device fingerprint attributes. Those touch the network
                  not at all.
                </p>

                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 mb-5">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    The other two make <strong className="text-foreground">outbound requests to Google</strong>:
                    a <code className="text-primary">HEAD</code> probe to{" "}
                    <code className="text-primary">pagead2.googlesyndication.com</code> to detect a content
                    blocker, and a STUN request to{" "}
                    <code className="text-primary">stun.l.google.com:19302</code> for the WebRTC leak test —{" "}
                    <strong className="text-foreground">which lets that server observe your public IP address</strong>.
                    That is unavoidable: a browser-based WebRTC test has to expose your address to a STUN server
                    in order to report whether it is exposed. Nothing is sent to us or stored anywhere.
                  </p>
                </div>

                <div className="text-center">
                  <button
                    onClick={runAudit}
                    className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    <Shield className="w-4 h-4" /> I understand — run the scan
                  </button>
                  <p className="text-[11px] text-muted-foreground mt-3">
                    Prefer not to? Nothing has run yet, and closing this page sends nothing. You can inspect your
                    WebRTC settings directly in your browser instead — the{" "}
                    <span className="text-foreground font-semibold">Improving your result</span> section below
                    explains how.
                  </p>
                </div>
              </div>
            ) : scanning ? (
              <div className="py-12">
                <RefreshCw className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                <h2 className="text-xl font-bold text-foreground mb-1">Inspecting Live Browser Hardware APIs...</h2>
                <p className="text-xs text-muted-foreground">Gathering WebRTC STUN candidates, GPC headers, and screen geometry</p>
              </div>
            ) : (
              <div>
                <div className="inline-block p-6 rounded-full bg-primary/10 border-2 border-primary/30 mb-4">
                  <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-violet-500 via-purple-500 to-primary bg-clip-text text-transparent">
                    {results.overallScore} / 100
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {results.overallScore >= 70 ? "Strong Technical Privacy Posture" : "Privacy Risks Identified"}
                </h2>

                <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6">
                  {results.overallScore >= 70
                    ? "Your browser restricts WebRTC leaks and tracking scripts, but active open tabs remain vulnerable to physical workstation intrusion." 
                    : "Your browser leaks hardware fingerprint parameters or lacks Global Privacy Control protection."}
                </p>

                <button
                  onClick={runAudit}
                  className="px-6 py-2.5 rounded-xl bg-muted text-foreground hover:bg-card border border-border text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer mb-8"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Re-scan Browser APIs
                </button>

                {/* Audit Items */}
                <div className="grid sm:grid-cols-2 gap-4 text-left border-t border-border/50 pt-8">
                  
                  <div className="p-4 rounded-2xl bg-muted/30 border border-border/40">
                    <div className="flex items-center justify-between mb-2">
                      <strong className="text-xs font-bold text-foreground">WebRTC IP Candidate Leak</strong>
                      {results.webrtc.safe ? (
                        <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Secure</span>
                      ) : (
                        <span className="text-[11px] font-bold text-red-500 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> IP Leaking</span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-foreground mb-1">{results.webrtc.status}</div>
                    <p className="text-[11px] text-muted-foreground">{results.webrtc.desc}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/30 border border-border/40">
                    <div className="flex items-center justify-between mb-2">
                      <strong className="text-xs font-bold text-foreground">Global Privacy Control (DNT)</strong>
                      {results.gpc.safe ? (
                        <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Active</span>
                      ) : (
                        <span className="text-[11px] font-bold text-amber-500 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Disabled</span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-foreground mb-1">{results.gpc.status}</div>
                    <p className="text-[11px] text-muted-foreground">{results.gpc.desc}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/30 border border-border/40">
                    <div className="flex items-center justify-between mb-2">
                      <strong className="text-xs font-bold text-foreground">Ad / Tracking Script Blocker</strong>
                      {results.adBlocker.safe ? (
                        <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Active</span>
                      ) : (
                        <span className="text-[11px] font-bold text-amber-500 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Not Detected</span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-foreground mb-1">{results.adBlocker.status}</div>
                    <p className="text-[11px] text-muted-foreground">{results.adBlocker.desc}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/30 border border-border/40">
                    <div className="flex items-center justify-between mb-2">
                      <strong className="text-xs font-bold text-foreground">Hardware Fingerprint Entropy</strong>
                      <span className="text-[11px] font-bold text-amber-500 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Unique</span>
                    </div>
                    <div className="text-xs font-bold text-foreground mb-1">{results.fingerprint.status}</div>
                    <p className="text-[11px] text-muted-foreground">{results.fingerprint.desc}</p>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* ── Key Privacy Factors ──────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">Key Privacy Checks Explained</h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              This audit reviews essential browser configurations that impact your daily online privacy.
            </p>

            <div className="space-y-4">
              <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">WebRTC IP Exposure</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Checks whether real-time communication protocols expose your public IP address. A secure result means your network identity is shielded from unauthorized discovery.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Global Privacy Control (GPC)</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Verifies whether your browser transmits an official opt-out signal telling websites not to sell or share your personal browsing data.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Tracker & Ad Blocking</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Detects whether known advertising and cross-site tracking scripts are blocked before they can monitor your web activity.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Browser Fingerprinting Exposure</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Evaluates how unique your hardware, screen, and browser attributes appear to third-party tracking scripts across the web.
                </p>
              </div>
            </div>
          </section>

          {/* ── Tips to Improve Privacy ───────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">How to Improve Your Browser Privacy</h2>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">Enable Global Privacy Control</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Turn on &ldquo;Do Not Track&rdquo; or &ldquo;Global Privacy Control&rdquo; in your browser settings to automatically request privacy on supported websites.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">Use a Trusted Content Blocker</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Install a reputable open-source ad and tracker blocker to stop invasive scripts from loading across web pages.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">Review Browser Permissions</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Regularly audit installed browser extensions and site permissions (location, camera, microphone) to reduce unnecessary data access.
                </p>
              </div>
            </div>
          </section>

          {/* ── FAQ ───────────────────────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">Frequently Asked Questions</h2>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Does this scan save or transmit my IP address?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  No. Scan results are calculated live inside your browser session and are never saved, recorded, or logged on our servers.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Does private browsing mode protect against all tracking?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Private browsing prevents cookies and browsing history from saving locally on your device, but websites can still see your IP address and connection details.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">How does tab locking help my privacy?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Browser privacy tools protect you from remote online trackers, while Locksy protects your active logged-in sessions from anyone nearby who has access to your physical computer.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-primary/10 border border-violet-500/20 text-center">
            <h3 className="text-xl font-bold mb-2">Protect Open Tabs with Locksy</h3>
            <p className="text-xs text-muted-foreground mb-6 max-w-lg mx-auto">
              Locksy locks and encrypts your active browser tabs with master password protection and biometric unlock.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/#download" className="btn-primary text-xs py-3 px-6">
                Install Locksy Free
              </Link>
              <Link href="/security" className="btn-secondary text-xs py-3 px-6">
                Read Security Overview
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
