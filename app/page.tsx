import Header from "@/components/header"
import Hero from "@/components/hero"
import DomainLock from "@/components/domain-lock"
import ProblemStatement from "@/components/problem-statement"
import Features from "@/components/features"
import KeyboardShortcuts from "@/components/keyboard-shortcuts"
import HowItWorks from "@/components/how-it-works"
import Security from "@/components/security"
import Comparison from "@/components/comparison"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import { jsonLdFAQPage } from "@/lib/metadata"

export default function Home() {
  return (
    <>
      {/* FAQ Schema for rich snippets in search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQPage) }}
      />

      <main className="w-full" itemScope itemType="https://schema.org/WebPage">
        <Header />
        <Hero />
        <div id="domain-lock">
          <DomainLock />
        </div>
        <ProblemStatement />
        <Features />
        <KeyboardShortcuts />
        <HowItWorks />
        <Security />
        <Comparison />
        <Testimonials />
        <FAQ />
        <CTASection />
        <Footer />
      </main>
    </>
  )
}
