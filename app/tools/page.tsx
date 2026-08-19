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
  "Free browser security tools: Password Strength Checker, Password Generator, Browser Privacy Score Inspector, and Email Breach Checker.",
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
      question: 'Are the Locksy security tools completely free to use?',
      answer: 'Yes. All tools are 100% free with no account creation, no usage limits, and no subscription required.'
    },
    {
      question: 'Do I need to install the Locksy extension to use these tools?',
      answer: 'No. These web tools work directly in any modern browser without requiring any software installation.'
    },
    {
      question: 'Are my passwords or inputs stored on your servers?',
      answer: 'No. The password strength checker and generator process your inputs directly on your device inside your browser memory.'
    },
    {
      question: 'Which browsers are supported?',
      answer: 'All modern desktop and mobile browsers are supported, including Chrome, Firefox, Safari, Edge, Brave, and Opera.'
    }
  ])

  const tools = [
    {
      title: "Password Strength Checker",
      description: "Test your password strength, entropy rating, and estimated brute-force resistance in real time.",
      icon: "🔑",
      url: "/tools/password-strength-checker",
      badge: "Popular Tool",
      gradient: "from-blue-500/10 via-indigo-500/10 to-purple-500/10",
      border: "border-blue-500/30"
    },
    {
      title: "Password Generator",
      description: "Instantly create strong, random, and secure passwords with customizable length and character sets.",
      icon: "🎲",
      url: "/tools/password-generator",
      badge: "100% Client-Side",
      gradient: "from-emerald-500/10 via-teal-500/10 to-cyan-500/10",
      border: "border-emerald-500/30"
    },
    {
      title: "Browser Privacy Score Inspector",
      description: "Scan your browser setup for tracker protection, WebRTC privacy, and active privacy headers.",
      icon: "🛡️",
      url: "/tools/browser-privacy-score",
      badge: "Instant Audit",
      gradient: "from-violet-500/10 via-purple-500/10 to-fuchsia-500/10",
      border: "border-violet-500/30"
    },
    {
      title: "Email Breach Checker",
      description: "Check if your email address has appeared in known public data breaches and security incidents.",
      icon: "⚠️",
      url: "/tools/email-breach-checker",
      badge: "Security Check",
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
              Explore our collection of free tools designed to help you secure your online presence, generate strong credentials, and protect your digital privacy.
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
                <h3 className="font-bold text-foreground mb-1">Privacy First</h3>
                <p className="text-xs text-muted-foreground">Tools operate safely inside your browser session without storing or logging your personal data.</p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-2">🚀</div>
                <h3 className="font-bold text-foreground mb-1">Instant & Free</h3>
                <p className="text-xs text-muted-foreground">No registration, credit cards, or signups required. Instant access whenever you need it.</p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-2">🛡️</div>
                <h3 className="font-bold text-foreground mb-1">Actionable Protection</h3>
                <p className="text-xs text-muted-foreground">Get clear recommendations to immediately strengthen your online security and browser defenses.</p>
              </div>
            </div>
          </section>

          {/* ── Security Best Practices Guide ─────────────────────────────────── */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">Recommended Security Routine</h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Maintaining strong online security is simple when you follow a few essential habits:
            </p>

            <div className="space-y-4">
              <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">
                  1. Check for Compromised Credentials with <Link href="/tools/email-breach-checker" className="text-primary hover:underline">Email Breach Checker</Link>
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Regularly verify if your email address has appeared in public security incidents so you can proactively update compromised passwords.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">
                  2. Evaluate Password Strength with <Link href="/tools/password-strength-checker" className="text-primary hover:underline">Password Strength Checker</Link>
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Ensure your master passwords and critical account credentials meet robust length and entropy standards.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">
                  3. Create Unique Passwords with <Link href="/tools/password-generator" className="text-primary hover:underline">Password Generator</Link>
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Generate unique, high-entropy passwords for every service so that a breach on one site never puts your other accounts at risk.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">
                  4. Audit Browser Privacy with <Link href="/tools/browser-privacy-score" className="text-primary hover:underline">Browser Privacy Score</Link>
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Check your browser configuration to ensure tracking prevention and privacy protections are functioning properly.
                </p>
              </div>
            </div>
          </section>

          {/* ── FAQ ────────────────────────────────────────────────────── */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">Frequently Asked Questions</h2>

            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Are these tools really free?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Yes, all our online security and privacy tools are completely free to use without any account creation or subscriptions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Do I need to install the extension to use them?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  No. These tools run directly on the web and work in any standard web browser without needing any extension or download.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Are my generated passwords stored anywhere?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  No. Passwords and strength checks are processed entirely locally on your device inside your browser. We never store, transmit, or log your passwords.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50">
                <h3 className="font-bold text-foreground mb-2 text-sm sm:text-base">Can I use these tools for team or organizational security?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Yes, individuals, developers, and organizations are welcome to use these tools for security audits and password hygiene.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Banner */}
          <div className="p-10 rounded-3xl bg-gradient-to-r from-primary/15 via-purple-500/10 to-secondary/15 border border-primary/30 text-center">
            <h3 className="text-2xl font-bold mb-2">Protect Your Open Tabs with Locksy</h3>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-6">
              Lock sensitive open tabs with password protection and biometric unlock.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#download" className="btn-primary">
                Install Locksy Extension Free
              </Link>
              <Link href="/security" className="btn-secondary">
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
