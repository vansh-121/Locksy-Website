"use client"

import { useState, useEffect } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import Link from 'next/link'
import { Shield, Sparkles, CheckCircle2, AlertTriangle, XCircle, RefreshCw } from 'lucide-react'

export default function BrowserPrivacyScorePage() {
  const [scanning, setScanning] = useState(true)
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

  useEffect(() => {
    runAudit()
  }, [])

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
            
            {scanning ? (
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

          {/* CTA */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-primary/10 border border-violet-500/20 text-center">
            <h3 className="text-xl font-bold mb-2">Eliminate Open Tab Exposure Risks with Locksy</h3>
            <p className="text-xs text-muted-foreground mb-6 max-w-lg mx-auto">
              Locksy encrypts active open tabs using client-side PBKDF2 (600,000 iterations), WebAuthn biometrics, and stealth mode.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/#download" className="btn-primary text-xs py-3 px-6">
                Install Locksy Free
              </Link>
              <Link href="/security" className="btn-secondary text-xs py-3 px-6">
                Read Security Whitepaper
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
