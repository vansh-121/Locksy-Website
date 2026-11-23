import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import ProUpgradeCard from "@/components/pro-upgrade-card"
import {
  generatePageMetadata,
  generateBreadcrumbSchema,
  generateFAQSchema,
  jsonLdHowToInstall,
} from "@/lib/metadata"
import { guide, guideToc, guideFaqItems, GUIDE_PDF_PATH } from "@/lib/guide-data"
import GuideToc from "./guide-toc"
import GuideBlocks from "./guide-blocks"
import { PageHero } from "@/components/page-shell"
import { Download } from "lucide-react"

export const metadata: Metadata = generatePageMetadata(
  // 77 chars with the layout's " | Locksy" template — the longest on the site
  // and well past Google's truncation point. "Locksy" dropped from the front
  // since the template re-adds it; "Unlock" dropped as redundant with "Lock".
  "User Guide — How to Lock & Auto-Lock Browser Tabs",
  "Step-by-step guide to every Locksy feature: locking tabs, keyboard shortcuts, auto-lock timers, domain locks, biometric unlock, stealth mode and troubleshooting. Free PDF download.",
  "/guide",
  [
    "locksy user guide",
    "how to use locksy",
    "how to lock a browser tab",
    "lock chrome tab tutorial",
    "browser tab locker guide",
    "auto lock browser tabs setup",
    "domain lock wildcard pattern",
    "locksy keyboard shortcuts",
    "locksy pdf manual",
  ]
)

export default function GuidePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "User Guide", url: "/guide" },
  ])

  // Reuses the Q&A pairs already written into chapters 10 and 11 rather than
  // maintaining a second copy for structured data.
  const faqSchema = generateFAQSchema(guideFaqItems)

  const lastUpdated = new Date(guide.updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowToInstall) }}
      />

      <Header />

      <main className="min-h-screen bg-background pb-24">
        {/* ── Page header ─────────────────────────────────────────────── */}
        <PageHero
          align="left"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "User Guide" }]}
          eyebrow={`${guide.chapters.length} chapters · v${guide.version}`}
          title={guide.title}
          description={guide.tagline}
          meta={<span>Last updated {lastUpdated}. Covers Locksy v{guide.version}.</span>}
        >
          <a href={GUIDE_PDF_PATH} download className="btn-primary">
            <Download className="h-4 w-4" aria-hidden="true" />
            Download as PDF
          </a>
          <a href="#install" className="btn-secondary">
            Start reading
          </a>
        </PageHero>

        {/* ── Contents + chapters ─────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl border-t border-border px-4 pt-12 md:px-6 md:pt-16">
          <div className="gap-16 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
            <GuideToc entries={guideToc} />

            <div className="min-w-0 max-w-3xl space-y-20">
              {guide.chapters.map((chapter) => (
                <section key={chapter.id} aria-labelledby={chapter.id} className="scroll-mt-28">
                  <div className="mb-5 flex items-start gap-4">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border bg-background font-mono text-xs text-foreground">
                      {String(chapter.num).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted-foreground">
                        Chapter {chapter.num}
                      </p>
                      <h2
                        id={chapter.id}
                        className="mt-1 scroll-mt-28 text-2xl font-semibold leading-tight text-foreground md:text-3xl text-balance"
                      >
                        {chapter.title}
                      </h2>
                    </div>
                  </div>

                  <p className="mb-8 border-l-2 border-highlight pl-4 text-base leading-relaxed text-foreground/80 md:text-lg">
                    {chapter.summary}
                  </p>

                  <GuideBlocks blocks={chapter.blocks} />
                </section>
              ))}

            </div>
          </div>
        </div>

        {/* Straight after the last chapter — including "What's free and what's
            Pro", so the reader has just been told exactly what the limits are. */}
        <ProUpgradeCard
          eyebrow="You've just read what Pro unlocks"
          className="relative overflow-hidden pt-16 md:pt-20"
        />

        {/* Closing CTA — full width, outside the two-column grid.
            Heading is deliberately about the PDF, not "questions": SupportChatCTA
            immediately below already owns "Still Have Questions?", and the two
            collided. This block's real job is the offline copy of the guide. */}
        <div className="mx-auto max-w-2xl px-4 pt-16 md:px-6">
          <div className="surface p-8 text-center md:p-10">
            <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Prefer it offline?</h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
              Take the guide with you as a PDF, or get in touch, we&apos;ll walk you through it.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={GUIDE_PDF_PATH} download className="btn-primary">
                <Download className="h-4 w-4" aria-hidden="true" />
                Download the PDF
              </a>
              <Link href="/contact" className="btn-secondary">
                Contact support
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SupportChatCTA />
      <CTASection />
      <Footer />
    </>
  )
}
