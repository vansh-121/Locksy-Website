import type { Metadata } from 'next'
import Header from "@/components/header"
import Footer from "@/components/footer"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/metadata"
import Link from 'next/link'
import { Shield, Key, Eye, Lock, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata(
  "Free Browser Security & Privacy Tools Hub – Locksy",
  "Free, client-side browser security tools: Password Strength Checker, Cryptographic Password Generator, Browser Privacy Score Inspector, and Email Breach Checker.",
  "/tools",
  [
    "free browser security tools",
    "password strength checker online",
    "free password generator",
    "browser privacy score test",
    "email breach checker privacy"
  ]
)

export default function ToolsHubPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Free Security Tools', url: '/tools' }
  ])

  const faqSchema = generateFAQSchema([
    {
      question: 'Are the Locksy security tools really free?',
      answer: 'Free with no account, no usage limit and no paywall. The honest answer about motive: we build a browser extension, and people who care enough to audit their own passwords are the people most likely to find it useful. Nothing here is time-limited or degraded to push you toward a purchase.'
    },
    {
      question: 'Do I need to install the extension to use them?',
      answer: 'No. They are ordinary web pages and work in any modern browser with nothing installed. The extension solves a different problem — locking already-authenticated tabs against someone with physical access to your machine — and these tools do not depend on it.'
    },
    {
      question: 'Is it safe to type a real password into a website?',
      answer: 'As a general habit, no, and we would rather you kept the instinct. Verify the claim instead of trusting it: open your browser\'s network panel and watch for requests while you type. If you would prefer not to, test a password with the same length and character classes rather than the real one — the entropy calculation depends only on those, so the result is identical.'
    },
    {
      question: 'Which of these tools send data off my machine?',
      answer: 'The password strength checker and generator make no network requests at all. The privacy score makes two, both to Google: a probe for a known ad script to infer whether a content blocker is active, and a STUN request that the WebRTC leak test needs in order to work — that STUN server necessarily sees your public IP, which is the whole mechanism the test relies on. The email breach checker does send the address you type to a third-party public breach index, because that lookup cannot be performed locally.'
    },
    {
      question: 'Where did the Locksy security checker tool go?',
      answer: 'It duplicated the entropy calculation already in the strength checker, so the two were merged rather than maintained as near-identical pages. Its workstation exposure audit now lives on the password strength checker page, and the old address redirects there.'
    }
  ])

  const tools = [
    {
      title: "Password Strength Checker",
      description: "Calculate password entropy and test resistance against 600,000 PBKDF2 iterations with GPU brute-force time estimates.",
      icon: "🔑",
      url: "/tools/password-strength-checker",
      badge: "Popular Tool",
      gradient: "from-blue-500/10 via-indigo-500/10 to-purple-500/10",
      border: "border-blue-500/30"
    },
    {
      title: "Cryptographic Password Generator",
      description: "Generate high-entropy, cryptographically secure random passwords or passphrases with custom length and character sets.",
      icon: "🎲",
      url: "/tools/password-generator",
      badge: "100% Client-Side",
      gradient: "from-emerald-500/10 via-teal-500/10 to-cyan-500/10",
      border: "border-emerald-500/30"
    },
    {
      title: "Browser Privacy Score Inspector",
      description: "Run an instant audit on your browser's fingerprinting risk, WebRTC leaks, DNT status, and active privacy protections.",
      icon: "🛡️",
      url: "/tools/browser-privacy-score",
      badge: "Instant Audit",
      gradient: "from-violet-500/10 via-purple-500/10 to-fuchsia-500/10",
      border: "border-violet-500/30"
    },
    {
      title: "Email Breach Checker",
      description: "Look up whether your email address appears in publicly disclosed credential dumps, and see plainly what the result does and does not prove.",
      icon: "⚠️",
      url: "/tools/email-breach-checker",
      badge: "Public Breach Index",
      gradient: "from-amber-500/10 via-orange-500/10 to-red-500/10",
      border: "border-amber-500/30"
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <main className="min-h-screen bg-background relative overflow-hidden pt-28 pb-24">
        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/6 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-6">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              100% Free & Privacy-Preserving Web Tools
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              Free Online <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">Security & Privacy Tools</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Four free utilities for auditing your own security, each one documenting how it reaches its answer and
              where that answer stops being reliable. No account, no usage limits, and nothing stored.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {tools.map((tool, idx) => (
              <Link
                key={idx}
                href={tool.url}
                className={`group p-8 rounded-3xl bg-card/80 backdrop-blur-xl border ${tool.border} shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-card border border-border/80 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {tool.badge}
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h2>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-border/40 text-sm font-bold text-primary flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                  Launch Free Tool <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

          {/* Why Free Security Tools Section */}
          <section className="p-10 md:p-14 rounded-3xl bg-card/60 backdrop-blur-xl border border-border/60 shadow-xl mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Why Use Locksy Free Tools?</h2>
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="font-bold text-foreground mb-1">Runs In Your Browser</h3>
                <p className="text-xs text-muted-foreground">Three of the four tools do all their work in page memory. Nothing you type is transmitted or stored.</p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-2">🚀</div>
                <h3 className="font-bold text-foreground mb-1">Zero Registration</h3>
                <p className="text-xs text-muted-foreground">No email required, no subscriptions, and no paywalls. Free for personal and commercial use.</p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-2">🛡️</div>
                <h3 className="font-bold text-foreground mb-1">Methodology Published</h3>
                <p className="text-xs text-muted-foreground">Every tool documents its own formula and its own limits, so you can judge whether the number deserves your trust.</p>
              </div>
            </div>
          </section>

          {/* ── Which tool to reach for ─────────────────────────────────── */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">Which one should you use first?</h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              The four tools answer four different questions, and they are most useful in a particular order.
              Working through them takes about ten minutes and gives you a reasonably complete picture of where
              your day-to-day browsing is actually exposed.
            </p>

            <div className="space-y-4">
              <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">
                  Start with <Link href="/tools/email-breach-checker" className="text-primary hover:underline">the breach checker</Link> — it tells you whether damage has already happened
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Everything else on this page is preventative. This one is diagnostic: it looks for your address in
                  credential dumps that are already circulating. If it comes back with hits, that is your most urgent
                  work, because leaked pairs get replayed automatically against unrelated login pages.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">
                  Then measure what you already use with <Link href="/tools/password-strength-checker" className="text-primary hover:underline">the strength checker</Link>
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  It converts a password into bits of entropy and then into an estimated brute-force time, and shows
                  how dramatically that estimate shifts once a service applies key stretching. Most people are
                  surprised in both directions — their &ldquo;clever&rdquo; substitutions are worth less than they
                  assumed, and length is worth far more.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">
                  Replace the weak ones with <Link href="/tools/password-generator" className="text-primary hover:underline">the generator</Link>
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Human-chosen passwords cluster around predictable patterns, which is exactly what cracking
                  wordlists exploit. The generator draws from the operating system&apos;s cryptographic entropy pool
                  instead, so there is no pattern to learn. Store the output in a password manager rather than trying
                  to remember it.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">
                  Finish with <Link href="/tools/browser-privacy-score" className="text-primary hover:underline">the privacy score</Link> — passwords are only half the story
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Perfect credentials do not stop a site from reading your real IP address through a WebRTC leak, or
                  from identifying your browser by its hardware characteristics without ever setting a cookie. This
                  scan runs those checks live against your current browser and shows you what it found.
                </p>
              </div>
            </div>
          </section>

          {/* ── What client-side means here ─────────────────────────────── */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">What &ldquo;client-side&rdquo; means here, precisely</h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Plenty of sites describe themselves as client-side while quietly posting your input to an analytics
              endpoint. The claim is only worth anything if it is specific and checkable, so here is ours, tool by
              tool.
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              The password strength checker and the password generator make{' '}
              <strong className="text-foreground">no network requests at all</strong>. Every value stays in page
              memory and disappears on reload. You can confirm this yourself in about fifteen seconds: open your
              browser&apos;s developer tools, switch to the network panel, and interact with either tool. You should
              see nothing appear. The privacy score is different: it makes two outbound requests, both to Google. One
              probes for a known ad script to infer whether a content blocker is intercepting tracker traffic. The
              other is a STUN request that the WebRTC leak test cannot function without — and that STUN server sees
              your public IP address by design, because observing and reporting it back is exactly what STUN does.
              Neither result is stored or sent to us, but both requests are real and that page explains them in full.
            </p>

            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
              <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">The one genuine exception</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                The breach checker cannot work locally, because the answer lives in a breach index nobody can ship
                to a browser. It sends the address you type to a third-party public breach API. We do not store it,
                log it, or see it — but it does leave your machine, and that page says so plainly rather than hiding
                behind a general privacy badge. Some breach services offer a k-anonymity design, where only a short
                hash prefix is sent; the endpoint behind this tool does not, and pretending otherwise would be worse
                than the limitation itself.
              </p>
            </div>
          </section>

          {/* ── FAQ ────────────────────────────────────────────────────── */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">Common questions about these tools</h2>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Are they really free, and what is the catch?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Free with no account, no usage limit and no paywall. The honest answer about motive: we build a
                  browser extension, and people who care enough to audit their own passwords are the people most
                  likely to find it useful. That is the entire funnel. Nothing here is time-limited or degraded to
                  push you toward a purchase.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Do I need to install the extension to use them?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  No. They are ordinary web pages and work in any modern browser with nothing installed. The
                  extension solves a different problem — locking already-authenticated tabs against someone with
                  physical access to your machine — and these tools do not depend on it.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Is it safe to type a real password into a website?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  As a general habit, no — and we would rather you kept the instinct. Verify our claim instead of
                  trusting it: open the network panel and watch for requests while you type. If you would prefer not
                  to, test a password with the same structure and length rather than the real one; the entropy
                  calculation depends only on length and which character classes appear, so the result will be
                  identical.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Can I use these at work or in training material?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Yes. IT teams and educators are welcome to link to them in onboarding docs and security awareness
                  sessions — the published methodology on each page is there so you can check the numbers before
                  putting them in front of colleagues or students.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Where did the security checker tool go?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  It duplicated the entropy calculation already in the strength checker, so we merged the two rather
                  than maintain near-identical pages. Its workstation exposure audit now lives on the{' '}
                  <Link href="/tools/password-strength-checker" className="text-primary hover:underline font-semibold">password
                  strength checker</Link>, and the old address redirects there.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Banner */}
          <div className="p-10 rounded-3xl bg-gradient-to-r from-primary/15 via-purple-500/10 to-secondary/15 border border-primary/30 text-center">
            <h3 className="text-2xl font-bold mb-2">Protect Your Open Tabs with Locksy</h3>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-6">
              Combine these free tools with automatic PBKDF2 tab encryption and WebAuthn biometric unlock.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#download" className="btn-primary">
                Install Locksy Extension Free
              </Link>
              <Link href="/security" className="btn-secondary">
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
