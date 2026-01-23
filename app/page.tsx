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
          <Comparison />
          <div id="domain-lock">
            <DomainLock />
          </div>
          <ProblemStatement />
          <Features />
          <KeyboardShortcuts />
          <HowItWorks />
          <Security />
          <Testimonials />
          <FAQ />
          <SupportChatCTA />
          <CTASection />
          <Footer />
        </main>
      </PageLoader>
    </>
  )
}
