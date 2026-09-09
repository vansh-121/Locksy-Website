import Header from "@/components/header"
import Hero from "@/components/hero"
import AutomationFeatures from "@/components/automation-features"
import DomainLock from "@/components/domain-lock"
import BiometricUnlock from "@/components/biometric-unlock"
import WhatsNewV330 from "@/components/whats-new-v330"
import WhatsNewV310 from "@/components/whats-new-v310"
import WhatsNewV300 from "@/components/whats-new-v300"
import WhatsNewV250 from "@/components/whats-new-v250"
import ProblemStatement from "@/components/problem-statement"
import Features from "@/components/features"
import KeyboardShortcuts from "@/components/keyboard-shortcuts"
import HowItWorks from "@/components/how-it-works"
import Security from "@/components/security"
import Comparison from "@/components/comparison"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import LatestBlogPosts from "@/components/latest-blog-posts"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import Pricing from "@/components/pricing"
import Footer from "@/components/footer"
import MilestoneBanner from "@/components/milestone-banner"
import ToolsShowcase from "@/components/tools-showcase"
import { jsonLdFAQPage } from "@/lib/metadata"
import { filteredBlogPosts } from "@/lib/blog-data"

function GuideBanner() {
  return (
    <section className="border-y border-primary/10 bg-primary/5 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left md:px-6">
        <div>
          <h2 className="font-bold text-foreground">New to Locksy?</h2>
          <p className="text-sm text-muted-foreground">Follow the complete step-by-step guide to get the most from every feature.</p>
        </div>
        <a href="/guide" className="btn-primary btn-sm inline-flex flex-shrink-0 items-center gap-2">📖 Read the User Guide</a>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQPage) }} />
      <main className="w-full" itemScope itemType="https://schema.org/WebPage">
        <Header />
        <Hero />
        <MilestoneBanner />
        <Pricing />
        <ProblemStatement />
        <Comparison />
        <BiometricUnlock />
        <AutomationFeatures />
        <WhatsNewV330 />
        <WhatsNewV310 />
        <WhatsNewV300 />
        <WhatsNewV250 />
        <div id="domain-lock"><DomainLock /></div>
        <Features />
        <HowItWorks />
        <KeyboardShortcuts />
        <GuideBanner />
        <Security />
        <Testimonials />
        <FAQ />
        <ToolsShowcase />
        <LatestBlogPosts posts={filteredBlogPosts} />
        <SupportChatCTA />
        <CTASection />
        <Footer />
      </main>
    </>
  )
}
