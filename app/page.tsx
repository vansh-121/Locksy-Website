import Header from "@/components/header"
import Hero from "@/components/hero"
import ProblemStatement from "@/components/problem-statement"
import HowItWorks from "@/components/how-it-works"
import Features from "@/components/features"
import DomainLock from "@/components/domain-lock"
import Security from "@/components/security"
import Comparison from "@/components/comparison"
import Testimonials from "@/components/testimonials"
import MilestoneBanner from "@/components/milestone-banner"
import Pricing from "@/components/pricing"
import WhatsNew from "@/components/whats-new"
import FAQ from "@/components/faq"
import ToolsShowcase from "@/components/tools-showcase"
import LatestBlogPosts from "@/components/latest-blog-posts"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
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
        <ProblemStatement />
        <HowItWorks />
        <Features />
        <div id="domain-lock">
          <DomainLock />
        </div>
        <Security />
        <Comparison />
        <Testimonials />
        <MilestoneBanner />
        <Pricing />
        <WhatsNew />
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
