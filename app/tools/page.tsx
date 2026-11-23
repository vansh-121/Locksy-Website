import type { Metadata } from 'next'
import Header from "@/components/header"
import Footer from "@/components/footer"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import ProUpgradeCard from "@/components/pro-upgrade-card"
import { PageHero, PageSection, IconTile } from "@/components/page-shell"
import SectionHeading from "@/components/section-heading"
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/metadata"
import Link from 'next/link'
import { ArrowUpRight, KeyRound, Shuffle, ScanSearch, MailWarning, Lock, Zap, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata(
  // Brand omitted — generatePageMetadata feeds this into `title`, which the root
  // layout templates to "%s | Locksy". Was "... Hub – Locksy | Locksy".
  "Free Browser Security & Privacy Tools",
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
      icon: KeyRound,
      url: "/tools/password-strength-checker",
      badge: "Popular Tool",
    },
    {
      title: "Password Generator",
      description: "Instantly create strong, random, and secure passwords with customizable length and character sets.",
      icon: Shuffle,
      url: "/tools/password-generator",
      badge: "100% Client-Side",
    },
    {
      title: "Browser Privacy Score Inspector",
      description: "Scan your browser setup for tracker protection, WebRTC privacy, and active privacy headers.",
      icon: ScanSearch,
      url: "/tools/browser-privacy-score",
      badge: "Instant Audit",
    },
    {
      title: "Email Breach Checker",
      description: "Check if your email address has appeared in known public data breaches and security incidents.",
      icon: MailWarning,
      url: "/tools/email-breach-checker",
      badge: "Security Check",
    }
  ]

  const reasons = [
    {
      icon: Lock,
      title: "Privacy First",
      text: "Tools operate safely inside your browser session without storing or logging your personal data.",
    },
    {
      icon: Zap,
      title: "Instant & Free",
      text: "No registration, credit cards, or signups required. Instant access whenever you need it.",
    },
    {
      icon: ShieldCheck,
      title: "Actionable Protection",
      text: "Get clear recommendations to immediately strengthen your online security and browser defenses.",
    },
  ]

  const routine = [
    {
      icon: MailWarning,
      lead: "1. Check for Compromised Credentials with",
      href: "/tools/email-breach-checker",
      label: "Email Breach Checker",
      text: "Regularly verify if your email address has appeared in public security incidents so you can proactively update compromised passwords.",
    },
    {
      icon: KeyRound,
      lead: "2. Evaluate Password Strength with",
      href: "/tools/password-strength-checker",
      label: "Password Strength Checker",
      text: "Ensure your master passwords and critical account credentials meet robust length and entropy standards.",
    },
    {
      icon: Shuffle,
      lead: "3. Create Unique Passwords with",
      href: "/tools/password-generator",
      label: "Password Generator",
      text: "Generate unique, high-entropy passwords for every service so that a breach on one site never puts your other accounts at risk.",
    },
    {
      icon: ScanSearch,
      lead: "4. Audit Browser Privacy with",
      href: "/tools/browser-privacy-score",
      label: "Browser Privacy Score",
      text: "Check your browser configuration to ensure tracking prevention and privacy protections are functioning properly.",
    },
  ]

  const faqs = [
    {
      q: "Are these tools really free?",
      a: "Yes, all our online security and privacy tools are completely free to use without any account creation or subscriptions.",
    },
    {
      q: "Do I need to install the extension to use them?",
      a: "No. These tools run directly on the web and work in any standard web browser without needing any extension or download.",
    },
    {
      q: "Are my generated passwords stored anywhere?",
      a: "No. Passwords and strength checks are processed entirely locally on your device inside your browser. We never store, transmit, or log your passwords.",
    },
    {
      q: "Can I use these tools for team or organizational security?",
      a: "Yes, individuals, developers, and organizations are welcome to use these tools for security audits and password hygiene.",
    },
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

      <main className="min-h-screen bg-background">
        <PageHero
          eyebrow="100% Free & Privacy-Preserving Web Tools"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools" }]}
          title={
            <>
              Free Online <span className="text-highlight">Security &amp; Privacy Tools</span>
            </>
          }
          description="Explore our collection of free tools designed to help you secure your online presence, generate strong credentials, and protect your digital privacy."
        />

        {/* Tools Grid */}
        <section className="relative pb-12 md:pb-16">
          <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 md:px-6">
            {tools.map(({ title, description, icon: Icon, url, badge }) => (
              <Link
                key={url}
                href={url}
                className="surface group flex flex-col p-6 transition-colors hover:border-foreground/20 md:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <IconTile icon={Icon} />
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                      {badge}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" aria-hidden="true" />
                  </div>
                </div>

                <h2 className="mt-6 text-xl font-semibold text-foreground">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>

                <span className="mt-auto pt-6 text-sm font-medium text-foreground">
                  Launch Free Tool <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Free Security Tools Section */}
        <PageSection>
          <SectionHeading title="Why Use Locksy Free Tools?" />
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {reasons.map(({ icon, title, text }) => (
              <div key={title} className="surface p-6">
                <IconTile icon={icon} />
                <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </PageSection>

        {/* ── Security Best Practices Guide ─────────────────────────────────── */}
        <PageSection>
          <SectionHeading
            align="left"
            title="Recommended Security Routine"
            description="Maintaining strong online security is simple when you follow a few essential habits:"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {routine.map(({ icon, lead, href, label, text }) => (
              <div key={href} className="surface flex gap-4 p-6">
                <IconTile icon={icon} />
                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-snug text-foreground">
                    {lead}{" "}
                    <Link href={href} className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground">
                      {label}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </PageSection>

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        <PageSection>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <span className="eyebrow">
                <span className="eyebrow-dot" aria-hidden="true" />
                FAQ
              </span>
              <h2 className="mt-5 text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl text-balance">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {faqs.map(({ q, a }) => (
                <div key={q} className="py-5">
                  <h3 className="font-sans text-base font-medium tracking-normal text-foreground">{q}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </PageSection>

        {/* CTA Banner */}
        <PageSection>
          <div className="surface px-6 py-12 text-center md:px-12">
            <h3 className="text-2xl font-semibold text-foreground md:text-3xl text-balance">Protect Your Open Tabs with Locksy</h3>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Lock sensitive open tabs with password protection and biometric unlock.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/#download" className="btn-primary">
                Install Locksy Extension Free
              </Link>
              <Link href="/security" className="btn-secondary">
                Read Security Overview
              </Link>
            </div>
          </div>
        </PageSection>
      </main>

      {/* Free tool -> paid extension. Same card as /uninstall and /guide, with an
          eyebrow that bridges from "these pages were free" to the price. */}
      <ProUpgradeCard
        eyebrow="These tools are free. So is most of Locksy."
        className="relative overflow-hidden border-t border-border/60 py-16 md:py-20"
      />

      <SupportChatCTA />
      <CTASection />
      <Footer />
    </>
  )
}
