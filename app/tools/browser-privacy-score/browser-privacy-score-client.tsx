"use client"

import { useState, useEffect } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import Link from 'next/link'
import { Shield, Sparkles, CheckCircle2, AlertTriangle, XCircle, RefreshCw } from 'lucide-react'

export default function BrowserPrivacyScoreClient() {
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

          {/* ── What each check does ──────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">What each check actually measures</h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              This is a live diagnostic, not a quiz — every result above comes from calling a real browser API on
              your machine when the page loaded. Here is precisely what each one asks, and what a failing result
              means in practice.
            </p>

            <div className="space-y-4">
              <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">WebRTC IP candidate leak</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                  The scan opens an <code className="text-primary">RTCPeerConnection</code> against a public STUN
                  server, creates a throwaway data channel, and reads the ICE candidates the browser offers up. Each
                  candidate string can contain an IP address — and historically that included your real address even
                  when you were behind a VPN, because WebRTC negotiates peer-to-peer paths outside the proxy tunnel.
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  A <strong className="text-foreground">Secure</strong> result means no usable address was surfaced
                  within the scan window. A <strong className="text-foreground">Leaking</strong> result shows the
                  address a video-call site could read without asking permission. This is the single most consequential
                  check here, which is why it carries the largest score weight — a VPN that leaks your IP through
                  WebRTC is providing far less protection than you think it is.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Global Privacy Control and Do Not Track</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Reads <code className="text-primary">navigator.globalPrivacyControl</code> and{' '}
                  <code className="text-primary">navigator.doNotTrack</code>. GPC is the meaningful one: unlike the
                  largely ignored DNT header, it carries legal weight under several privacy regimes, and companies
                  covered by them are required to treat it as a valid opt-out request. Enabling it costs nothing and
                  is a genuine legal signal rather than a polite suggestion. Most browsers expose it as a
                  &ldquo;Send a Do Not Track / opt-out request&rdquo; toggle in privacy settings.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Ad and tracking script blocking</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Issues a <code className="text-primary">HEAD</code> request for a well-known ad-network script and
                  watches whether it fails. If the request is blocked, something in your stack — an extension, a
                  filtering DNS resolver, your browser&apos;s built-in shields — is intercepting tracker traffic.
                  Content blockers cut off a large share of third-party tracking at the network layer, which is a
                  more reliable defence than any per-site preference.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Hardware fingerprint entropy</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                  Collects screen geometry, device pixel ratio, colour depth and reported CPU core count — four
                  attributes any page can read silently, with no permission prompt and no cookie involved. Taken
                  individually they are unremarkable. Combined, they narrow you down sharply, and adding the usual
                  extras (fonts, timezone, GPU renderer string, audio stack) is often enough to single out one
                  browser among millions.
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  This item is deliberately reported as a warning rather than pass or fail, because there is no
                  configuration that makes it pass. Fingerprinting is the tracking technique that survives clearing
                  your cookies, using private browsing, and switching to a VPN. Only browsers that actively
                  randomise or standardise these values push back on it.
                </p>
              </div>
            </div>
          </section>

          {/* ── Score model + honest limits ───────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">How the score is weighted — and where it falls short</h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              The number is a weighted tally, not a scientific measurement. Every browser starts at a baseline of
              40, and each protection adds points: no WebRTC leak is worth 20, an active GPC signal 15, a detected
              content blocker 15, and a restricted referrer 10. We would rather show you the formula than present a
              figure you have to take on faith.
            </p>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-muted/20 border border-border/40">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">The referrer check reflects this visit only</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  It inspects <code className="text-primary">document.referrer</code> for the page load that just
                  happened. Arriving here from a search engine produces a different result than typing the URL
                  directly, so treat it as a single data point rather than a verdict on your browser&apos;s referrer
                  policy in general.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-muted/20 border border-border/40">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">Blocker detection can misfire in both directions</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  A corporate firewall or a flaky connection can make the probe fail even with no blocker installed,
                  and a blocker configured to return an empty response rather than reject the request can slip past
                  it. The check tells you whether that one request succeeded — nothing more.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-muted/20 border border-border/40">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">A clean scan is not the same as being private</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  These four checks cover network-level exposure. They say nothing about what you are logged into,
                  which extensions can read the pages you visit, or how much your browser profile is syncing to the
                  cloud. A perfect 100 here is compatible with being thoroughly tracked by services you signed into
                  voluntarily.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-muted/20 border border-border/40">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">Nothing is recorded</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Every value stays in the page. No result — including any IP address the WebRTC probe surfaces — is
                  sent to us, stored, or logged. Reload and the scan starts from scratch. The one outbound request is
                  the ad-script probe described above, and it is discarded immediately.
                </p>
              </div>
            </div>
          </section>

          {/* ── Improving the score ───────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">Improving your result</h2>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">Close the WebRTC leak first</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  It carries the heaviest weight for good reason. Firefox exposes{' '}
                  <code className="text-primary">media.peerconnection.ice.default_address_only</code> in{' '}
                  <code className="text-primary">about:config</code>; Chromium-based browsers need an extension that
                  restricts ICE candidate policy. Do not simply disable WebRTC outright unless you never use browser
                  video calls, as it will break them. Our{' '}
                  <Link href="/blog/webrtc-ip-leak-how-video-calls-expose-your-real-ip-address-through-the-browser" className="text-primary hover:underline font-semibold">deep
                  dive on WebRTC IP leaks</Link> walks through the mechanism properly.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">Turn on GPC — it takes one click</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Look for the &ldquo;Send a Do Not Track request&rdquo; or opt-out toggle in your browser&apos;s
                  privacy settings. It has no downside and, unlike DNT alone, carries actual legal force with
                  companies subject to modern privacy law.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">Install a content blocker, then audit your extensions</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  A reputable blocker removes a large fraction of third-party tracking. Then look critically at
                  everything else you have installed — an extension with permission to read every page you visit has
                  deeper access than any tracker it might be blocking. We covered how to evaluate that in{' '}
                  <Link href="/blog/browser-extension-permissions-the-hidden-security-risk-youre-ignoring" className="text-primary hover:underline font-semibold">the
                  hidden risk of extension permissions</Link>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-1.5 text-sm sm:text-base">Accept that fingerprinting needs a different answer</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  You cannot configure your way out of having a screen resolution. Browsers that fight
                  fingerprinting do it by lying — reporting standardised values so that everyone looks alike.
                  Resisting it properly means using one of those, and accepting the occasional layout quirk that
                  comes with it.
                </p>
              </div>
            </div>
          </section>

          {/* ── FAQ ───────────────────────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">Frequently asked questions</h2>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Does this scan send my IP address anywhere?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  No. Any address the WebRTC probe surfaces is displayed on your screen and held in page memory
                  until you navigate away. It is never transmitted to us — there is no endpoint here that receives
                  scan results.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">I use a VPN but my real IP still shows. Why?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  That is the classic WebRTC leak, and it is exactly what this check exists to catch. WebRTC
                  gathers candidate network paths at the operating-system level to enable direct peer-to-peer
                  connections, which can sidestep the VPN tunnel entirely. Your traffic is still routed through the
                  VPN; your address is simply being advertised alongside it.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Why is my score capped even in private browsing mode?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Private windows discard cookies and history when closed. They do not change your screen
                  resolution, your CPU core count, or how WebRTC negotiates connections — so the fingerprint and
                  leak checks return the same results. Private browsing hides your activity from other people using
                  your computer, not from the sites you visit.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Should blocked cookies count in my favour?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Blocking cookies wholesale breaks most logins, so it is not advice we would give. The distinction
                  worth caring about is first-party versus third-party: your bank setting a session cookie is
                  necessary, an ad network setting one across two hundred sites is not. Modern browsers let you
                  block the second without breaking the first.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">What does this have to do with locking tabs?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Everything above is about remote observers — networks, trackers, sites. There is a second threat
                  model this scan cannot see: the person who sits down at your desk while a dozen authenticated
                  sessions are open on screen. No privacy setting addresses that, which is the gap Locksy fills.
                </p>
              </div>
            </div>
          </section>

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
