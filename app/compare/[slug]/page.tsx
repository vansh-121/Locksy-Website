import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Check, X, Minus, ArrowUpRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CTASection from "@/components/cta-section"
import { PageHero, PageSection, RelatedLinks } from "@/components/page-shell"
import SectionHeading from "@/components/section-heading"
import { COMPARISONS, getComparison } from "@/lib/comparisons"
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/metadata"

export const dynamicParams = false

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const c = getComparison(slug)
  if (!c) return {}
  return generatePageMetadata(c.metaTitle, c.metaDescription, `/compare/${c.slug}`, c.keywords)
}

function Mark({ win }: { win?: boolean }) {
  if (win === true) return <Check className="h-4 w-4 flex-shrink-0 text-highlight" aria-label="Locksy is better here" />
  if (win === false) return <X className="h-4 w-4 flex-shrink-0 text-muted-foreground" aria-label="The alternative is better here" />
  return <Minus className="h-4 w-4 flex-shrink-0 text-muted-foreground" aria-label="Similar" />
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = getComparison(slug)
  if (!c) notFound()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Compare", url: "/compare" },
    { name: c.title, url: `/compare/${c.slug}` },
  ])
  const faqSchema = generateFAQSchema(c.faq)
  const others = COMPARISONS.filter((o) => o.slug !== c.slug)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main>
        <PageHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Compare", href: "/compare" }, { label: c.title }]}
          eyebrow="Comparison"
          title={c.title}
          description={c.intro}
        />

        <PageSection width="narrow" className="!pt-0">
          <div className="surface p-6 md:p-8">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">The short answer</p>
            <p className="mt-3 text-[17px] leading-relaxed text-foreground">{c.verdict}</p>
          </div>
        </PageSection>

        <PageSection>
          <SectionHeading align="left" title="Side by side" />
          <div className="surface mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="w-[30%] px-5 py-4 text-left font-normal text-muted-foreground">Feature</th>
                  <th scope="col" className="px-5 py-4 text-left font-medium text-foreground">Locksy</th>
                  <th scope="col" className="px-5 py-4 text-left font-normal text-muted-foreground">
                    {c.other.charAt(0).toUpperCase() + c.other.slice(1)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.rows.map((r) => (
                  <tr key={r.feature} className="border-b border-border last:border-b-0 align-top">
                    <th scope="row" className="px-5 py-4 text-left font-normal text-foreground">{r.feature}</th>
                    <td className="px-5 py-4">
                      <span className="flex gap-2.5 text-foreground">
                        <Mark win={r.locksyWins} />
                        {r.locksy}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{r.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageSection>

        <PageSection>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="surface p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground">Choose {c.other} when</h2>
              <ul className="mt-5 space-y-3">
                {c.otherBetterWhen.map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface p-6 md:p-8 ring-1 ring-highlight/30">
              <h2 className="text-xl font-semibold text-foreground">Choose Locksy when</h2>
              <ul className="mt-5 space-y-3">
                {c.locksyBetterWhen.map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-foreground/90">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-highlight" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-[15px] leading-relaxed text-muted-foreground">{c.together}</p>
        </PageSection>

        <PageSection width="narrow">
          <SectionHeading align="left" title="Questions" />
          <div className="mt-6 divide-y divide-border border-y border-border">
            {c.faq.map((f) => (
              <details key={f.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-medium text-foreground">
                  {f.question}
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 pr-12 text-[15px] leading-relaxed text-muted-foreground">{f.answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            More detail on how Locksy protects tabs is in the{" "}
            <Link href="/security" className="text-foreground underline underline-offset-4">
              security deep dive
            </Link>{" "}
            and the{" "}
            <Link href="/guide" className="text-foreground underline underline-offset-4">
              user guide
            </Link>
            .
          </p>
        </PageSection>

        <PageSection>
          <RelatedLinks
            title="Other comparisons"
            links={others.map((o) => ({ href: `/compare/${o.slug}`, title: o.title, description: o.metaDescription }))}
          />
          <div className="mt-6">
            <Link href="/compare" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              All comparisons <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </PageSection>

        <CTASection />
      </main>
      <Footer />
    </>
  )
}
