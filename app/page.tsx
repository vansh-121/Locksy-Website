import Header from "@/components/header"
import Hero from "@/components/hero"
import ProblemStatement from "@/components/problem-statement"
import Features from "@/components/features"
import HowItWorks from "@/components/how-it-works"
import Security from "@/components/security"
import Comparison from "@/components/comparison"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="w-full">
      <Header />
      <Hero />
      <ProblemStatement />
      <Features />
      <HowItWorks />
      <Security />
      <Comparison />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  )
}
