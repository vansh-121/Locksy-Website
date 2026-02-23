import Header from "@/components/header"
import Hero from "@/components/hero"
import AutomationFeatures from "@/components/automation-features"
import DomainLock from "@/components/domain-lock"
import BiometricUnlock from "@/components/biometric-unlock"
import ProblemStatement from "@/components/problem-statement"
import Features from "@/components/features"
import KeyboardShortcuts from "@/components/keyboard-shortcuts"
import HowItWorks from "@/components/how-it-works"
import Security from "@/components/security"
import Comparison from "@/components/comparison"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import PageLoader from "@/components/page-loader"
import { jsonLdFAQPage } from "@/lib/metadata"

export default function Home() {
  return (
    <>
      {/* FAQ Schema for rich snippets in search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQPage) }}
      />

      <PageLoader>
        <main className="w-full" itemScope itemType="https://schema.org/WebPage">
          <Header />
          <Hero />

          {/* Establish the problem first */}
          <ProblemStatement />

          {/* Show why Locksy is better than alternatives */}
          <Comparison />

          {/* NEW v2.3.0 — Biometric Unlock */}
          <BiometricUnlock />

          {/* Showcase NEW v2.2.0 automation features prominently */}
          <AutomationFeatures />

          {/* Another major feature - Domain Lock */}
          <div id="domain-lock">
            <DomainLock />
          </div>

          {/* Comprehensive features overview */}
          <Features />

          {/* How easy it is to use */}
          <HowItWorks />

          {/* Power user feature */}
          <KeyboardShortcuts />

          {/* Technical credibility and trust */}
          <Security />

          {/* Social proof */}
          <Testimonials />

          {/* Handle objections and questions */}
          <FAQ />

          {/* Support and final CTAs */}
          <SupportChatCTA />
          <CTASection />
          <Footer />
        </main>
      </PageLoader>
    </>
  )
}
