import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CTASection from "@/components/cta-section"
import { PageHero, PageSection } from "@/components/page-shell"
import { COMPARISONS } from "@/lib/comparisons"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"

export const metadata: Metadata = generatePageMetadata(
  "Compare Locksy: Lock Screen, Profiles, Password Managers",
  "How Locksy compares with your OS lock screen, browser profiles, password managers and overlay-style tab lockers, including when each one is the better choice.",
  "/compare",
  ["locksy comparison", "tab locker comparison", "best way to lock browser tabs"],
)

export default function CompareIndexPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Compare", url: "/compare" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main>
        <PageHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Compare" }]}
          eyebrow="Compare"
          title="Is Locksy the right tool?"
          description="Locksy does one job: it locks browser tabs. Here's how it compares with the other ways people keep their screens private, including when you don't need it."
        />
        <PageSection className="!pt-0">
          <div className="grid gap-4 md:grid-cols-2">
            {COMPARISONS.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="surface group flex flex-col p-6 md:p-8 transition-colors hover:border-foreground/20"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="text-xl font-semibold text-foreground">{c.title}</span>
                  <ArrowUpRight className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </span>
                <span className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{c.verdict}</span>
              </Link>
            ))}
          </div>
        </PageSection>
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
