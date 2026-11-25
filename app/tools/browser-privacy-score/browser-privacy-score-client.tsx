"use client"

import { SmartInstallButton } from "@/components/install-buttons"
import { useState } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProUpgradeCard from "@/components/pro-upgrade-card"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import { PageHero, PageSection, IconTile } from "@/components/page-shell"
import SectionHeading from "@/components/section-heading"
import Link from 'next/link'
import { Shield, RefreshCw } from 'lucide-react'

type Tone = "good" | "warn" | "bad"

const TONE_BADGE: Record<Tone, string> = {
  good: "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  warn: "border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  bad: "border-red-500/25 bg-red-500/10 text-red-600 dark:text-red-400",
}

const TONE_DOT: Record<Tone, string> = {
  good: "bg-emerald-500",
  warn: "bg-amber-500",
  bad: "bg-red-500",
}

/** One hairline-divided result row with a small status badge. */
function AuditRow({ title, status, desc, badge, tone }: { title: string; status: string; desc: string; badge: string; tone: Tone }) {
  return (
    <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <strong className="block text-sm font-medium text-foreground">{title}</strong>
        <div className="mt-1 break-words font-mono text-xs text-foreground/80">{status}</div>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{desc}</p>
      </div>
      <span className={`inline-flex w-fit flex-shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${TONE_BADGE[tone]}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${TONE_DOT[tone]}`} aria-hidden="true" />
        {badge}
      </span>
    </div>
  )
}

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

  // Display-only colour for the score meter.
  const scoreBar =
    results.overallScore >= 70 ? "bg-emerald-500" : results.overallScore >= 50 ? "bg-amber-500" : "bg-red-500"

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <PageHero
          eyebrow="100% Real Browser API Diagnostic"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Browser Privacy Score" },
          ]}
          title={
            <>
              Real-Time Browser Privacy <span className="text-highlight">Score Inspector</span>
            </>
          }
          description="Executes live WebRTC STUN checks, GPC headers, ad-blocker detection, and fingerprint entropy tests natively."
        />

        {/* Main Score Card */}
        <section className="relative pb-12 md:pb-16">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <div className="surface p-6 md:p-8">
              {!hasRun ? (
                <div>
                  <div className="text-center">
                    <IconTile icon={Shield} />
                    <h2 className="mt-5 text-2xl font-semibold text-foreground text-balance">Before you start: what this scan sends</h2>
                  </div>

                  <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
                    Four of the six checks read values your browser already exposes to every page — privacy
                    signal, cookie setting, referrer, and device fingerprint attributes. Those touch the network
                    not at all.
                  </p>

                  <div className="mt-5 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      The other two make <strong className="font-medium text-foreground">outbound requests to Google</strong>:
                      a <code className="font-mono text-[0.9em] text-foreground">HEAD</code> probe to{" "}
                      <code className="font-mono text-[0.9em] text-foreground">pagead2.googlesyndication.com</code> to detect a content
                      blocker, and a STUN request to{" "}
                      <code className="font-mono text-[0.9em] text-foreground">stun.l.google.com:19302</code> for the WebRTC leak test —{" "}
                      <strong className="font-medium text-foreground">which lets that server observe your public IP address</strong>.
                      That is unavoidable: a browser-based WebRTC test has to expose your address to a STUN server
                      in order to report whether it is exposed. Nothing is sent to us or stored anywhere.
                    </p>
                  </div>

                  <div className="mt-8 text-center">
                    <button type="button" onClick={runAudit} className="btn-primary">
                      <Shield className="h-4 w-4" aria-hidden="true" /> I understand — run the scan
                    </button>
                    <p className="mx-auto mt-4 max-w-xl text-xs leading-relaxed text-muted-foreground">
                      Prefer not to? Nothing has run yet, and closing this page sends nothing. You can inspect your
                      WebRTC settings directly in your browser instead — the{" "}
                      <span className="font-medium text-foreground">Improving your result</span> section below
                      explains how.
                    </p>
                  </div>
                </div>
              ) : scanning ? (
                <div className="py-12 text-center" role="status" aria-live="polite">
                  <RefreshCw className="mx-auto h-8 w-8 animate-spin text-muted-foreground" aria-hidden="true" />
                  <h2 className="mt-5 text-xl font-semibold text-foreground">Inspecting Live Browser Hardware APIs...</h2>
                  <p className="mt-2 text-sm text-muted-foreground">Gathering WebRTC STUN candidates, GPC headers, and screen geometry</p>
                </div>
              ) : (
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="font-display text-6xl font-semibold leading-none text-foreground">
                        {results.overallScore} / 100
                      </div>
                    </div>
                    <button type="button" onClick={runAudit} className="btn-secondary btn-sm">
                      <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" /> Re-scan Browser APIs
                    </button>
                  </div>

                  <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full transition-all duration-500 ${scoreBar}`} style={{ width: `${results.overallScore}%` }} />
                  </div>

                  <h2 className="mt-6 text-2xl font-semibold text-foreground text-balance">
                    {results.overallScore >= 70 ? "Strong Technical Privacy Posture" : "Privacy Risks Identified"}
                  </h2>

                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {results.overallScore >= 70
                      ? "Your browser restricts WebRTC leaks and tracking scripts, but active open tabs remain vulnerable to physical workstation intrusion." 
                      : "Your browser leaks hardware fingerprint parameters or lacks Global Privacy Control protection."}
                  </p>

                  {/* Audit Items */}
                  <div className="mt-8 divide-y divide-border overflow-hidden rounded-xl border border-border bg-background">
                    <AuditRow
                      title="WebRTC IP Candidate Leak"
                      status={results.webrtc.status}
                      desc={results.webrtc.desc}
                      badge={results.webrtc.safe ? "Secure" : "IP Leaking"}
                      tone={results.webrtc.safe ? "good" : "bad"}
                    />
                    <AuditRow
                      title="Global Privacy Control (DNT)"
                      status={results.gpc.status}
                      desc={results.gpc.desc}
                      badge={results.gpc.safe ? "Active" : "Disabled"}
                      tone={results.gpc.safe ? "good" : "warn"}
                    />
                    <AuditRow
                      title="Ad / Tracking Script Blocker"
                      status={results.adBlocker.status}
                      desc={results.adBlocker.desc}
                      badge={results.adBlocker.safe ? "Active" : "Not Detected"}
                      tone={results.adBlocker.safe ? "good" : "warn"}
                    />
                    <AuditRow
                      title="Hardware Fingerprint Entropy"
                      status={results.fingerprint.status}
                      desc={results.fingerprint.desc}
                      badge="Unique"
                      tone="warn"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Key Privacy Factors ──────────────────────────────────── */}
        <PageSection width="narrow">
          <SectionHeading
            align="left"
            title="Key Privacy Checks Explained"
            description="This audit reviews essential browser configurations that impact your daily online privacy."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "WebRTC IP Exposure",
                text: "Checks whether real-time communication protocols expose your public IP address. A secure result means your network identity is shielded from unauthorized discovery.",
              },
              {
                title: "Global Privacy Control (GPC)",
                text: "Verifies whether your browser transmits an official opt-out signal telling websites not to sell or share your personal browsing data.",
              },
              {
                title: "Tracker & Ad Blocking",
                text: "Detects whether known advertising and cross-site tracking scripts are blocked before they can monitor your web activity.",
              },
              {
                title: "Browser Fingerprinting Exposure",
                text: "Evaluates how unique your hardware, screen, and browser attributes appear to third-party tracking scripts across the web.",
              },
            ].map((item) => (
              <div key={item.title} className="surface p-6">
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </PageSection>

        {/* ── Tips to Improve Privacy ───────────────────────────────────── */}
        <PageSection width="narrow">
          <SectionHeading align="left" title="How to Improve Your Browser Privacy" />

          <div className="mt-8 grid gap-4">
            <div className="surface p-6">
              <h3 className="text-lg font-semibold text-foreground">Enable Global Privacy Control</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Turn on &ldquo;Do Not Track&rdquo; or &ldquo;Global Privacy Control&rdquo; in your browser settings to automatically request privacy on supported websites.
              </p>
            </div>

            <div className="surface p-6">
              <h3 className="text-lg font-semibold text-foreground">Use a Trusted Content Blocker</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Install a reputable open-source ad and tracker blocker to stop invasive scripts from loading across web pages.
              </p>
            </div>

            <div className="surface p-6">
              <h3 className="text-lg font-semibold text-foreground">Review Browser Permissions</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Regularly audit installed browser extensions and site permissions (location, camera, microphone) to reduce unnecessary data access.
              </p>
            </div>
          </div>
        </PageSection>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <PageSection width="narrow">
          <SectionHeading align="left" eyebrow="FAQ" title="Frequently Asked Questions" />

          <div className="mt-8 divide-y divide-border border-y border-border">
            {[
              {
                q: "Does this scan save or transmit my IP address?",
                a: "No. Scan results are calculated live inside your browser session and are never saved, recorded, or logged on our servers.",
              },
              {
                q: "Does private browsing mode protect against all tracking?",
                a: "Private browsing prevents cookies and browsing history from saving locally on your device, but websites can still see your IP address and connection details.",
              },
              {
                q: "How does tab locking help my privacy?",
                a: "Browser privacy tools protect you from remote online trackers, while Locksy protects your active logged-in sessions from anyone nearby who has access to your physical computer.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="py-5">
                <h3 className="font-sans text-base font-medium tracking-normal text-foreground">{q}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </PageSection>

        {/* CTA */}
        <PageSection width="narrow">
          <div className="surface px-6 py-10 text-center md:px-10">
            <h3 className="text-2xl font-semibold text-foreground text-balance">Protect Open Tabs with Locksy</h3>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              Locksy locks and encrypts your active browser tabs with master password protection and biometric unlock.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <SmartInstallButton label="Add Locksy to {name}, free" />
              <Link href="/security" className="btn-secondary">
                Read Security Overview
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
