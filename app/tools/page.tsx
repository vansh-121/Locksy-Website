import type { Metadata } from 'next'
import Header from "@/components/header"
import Footer from "@/components/footer"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"
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
      description: "Check if your email or username has been compromised in known security data breaches using 100% k-Anonymity privacy model.",
      icon: "⚠️",
      url: "/tools/email-breach-checker",
      badge: "k-Anonymized",
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
              Empower your digital security with free client-side utilities. All calculations run strictly in your browser memory—zero data collection or server storage.
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
                <h3 className="font-bold text-foreground mb-1">100% Client-Side Execution</h3>
                <p className="text-xs text-muted-foreground">Calculations occur inside your browser via WebCrypto API. Zero data leaves your computer.</p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-2">🚀</div>
                <h3 className="font-bold text-foreground mb-1">Zero Registration</h3>
                <p className="text-xs text-muted-foreground">No email required, no subscriptions, and no paywalls. Free for personal and commercial use.</p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-2">🛡️</div>
                <h3 className="font-bold text-foreground mb-1">Backed by Locksy Architecture</h3>
                <p className="text-xs text-muted-foreground">Built on the same zero-knowledge encryption principles powering the Locksy Tab Locker extension.</p>
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
