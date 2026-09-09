import Header from "@/components/header"
import Hero from "@/components/hero"
import DomainLock from "@/components/domain-lock"
import BiometricUnlock from "@/components/biometric-unlock"
import WhatsNew from "@/components/whats-new"
import ProblemStatement from "@/components/problem-statement"
import Features from "@/components/features"
import KeyboardShortcuts from "@/components/keyboard-shortcuts"
import GuideBanner from "@/components/guide-banner"
import HowItWorks from "@/components/how-it-works"
import SeeItInAction from "@/components/see-it-in-action"
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

        {/* Why you'd want this — the everyday problem, in plain terms */}
        <ProblemStatement />

        {/* How simple it is to use */}
        <HowItWorks />

        {/* See it: the same tab exposed vs. locked, side by side */}
        <SeeItInAction />

        {/* What you get — the full feature overview */}
        <Features />

        {/* A standout feature — lock entire websites */}
        <div id="domain-lock">
          <DomainLock />
        </div>

        {/* Unlock with your fingerprint or face instead of typing a password */}
        <BiometricUnlock />

        {/* Quick reference for the four keyboard shortcuts */}
        <KeyboardShortcuts />

        {/* One compact band pointing newcomers at the full user guide */}
        <GuideBanner />

        {/* Why it's safe — privacy & security guarantees */}
        <Security />

        {/* How it compares to the alternatives */}
        <Comparison />

        {/* Social proof */}
        <MilestoneBanner />
        <Testimonials />

        {/* Pricing — after visitors know what Locksy does */}
        <Pricing />

        {/* Everything that's been added recently, in one compact place */}
        <WhatsNew />

        {/* Handle objections and questions */}
        <FAQ />

        {/* Free Security Tools Showcase */}
        <ToolsShowcase />

        {/* Latest blog articles — editorial content for SEO value */}
        <LatestBlogPosts posts={filteredBlogPosts} />

        {/* Support and final CTAs */}
        <SupportChatCTA />
        <CTASection />
        <Footer />
      </main>
    </>
  )
}
