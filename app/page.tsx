import Header from "@/components/header"
import Hero from "@/components/hero"
import StatsStrip from "@/components/stats-strip"
import SeeItInAction from "@/components/see-it-in-action"
import Features from "@/components/features"
import GettingStarted from "@/components/getting-started"
import BiometricUnlock from "@/components/biometric-unlock"
import WhatsNew from "@/components/whats-new"
import Security from "@/components/security"
import Comparison from "@/components/comparison"
import Testimonials from "@/components/testimonials"
import Pricing from "@/components/pricing"
import FAQ from "@/components/faq"
import ToolsShowcase from "@/components/tools-showcase"
import LatestBlogPosts from "@/components/latest-blog-posts"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import { jsonLdFAQPage } from "@/lib/metadata"
import { blogPostSummaries } from "@/lib/blog-data"

export default function Home() {
  return (
    <>
      {/* FAQ Schema for rich snippets in search results */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQPage) }} />

      <main className="w-full" itemScope itemType="https://schema.org/WebPage">
        <Header />
        <Hero />
        <StatsStrip />
        <SeeItInAction />
        {/* First-run walkthrough for new users (replaces the 3-step HowItWorks; keeps #how-it-works) */}
        <GettingStarted />
        <Features />
        <BiometricUnlock />
        <Security />
        <Comparison />
        <Testimonials />
        <Pricing />
        <WhatsNew />
        <FAQ />
        <ToolsShowcase />
        <LatestBlogPosts posts={blogPostSummaries.slice(0, 3)} />
        <CTASection />
        <Footer />
      </main>
    </>
  )
}
