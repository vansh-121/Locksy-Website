import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SupportChatCTA from "@/components/support-chat-cta"
import CTASection from "@/components/cta-section"
import {
  generatePageMetadata,
  generateBreadcrumbSchema,
  generateFAQSchema,
  jsonLdHowToInstall,
} from "@/lib/metadata"
import { guide, guideToc, guideFaqItems, GUIDE_PDF_PATH } from "@/lib/guide-data"
import GuideToc from "./guide-toc"
import GuideBlocks from "./guide-blocks"

export const metadata: Metadata = generatePageMetadata(
  "Locksy User Guide — How to Lock, Auto-Lock & Unlock Browser Tabs",
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

      <main className="min-h-screen bg-background pt-28 pb-24">
        {/* ── Page header ─────────────────────────────────────────────── */}
        <div className="relative overflow-hidden border-b border-border/50">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20" />
            <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-secondary/10 blur-3xl dark:bg-secondary/20" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 pb-14 md:px-6">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <span className="text-foreground">User Guide</span>
            </nav>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
              <span aria-hidden="true">📖</span>
              {guide.chapters.length} chapters · v{guide.version}
            </div>

            <h1 className="text-4xl font-black leading-tight text-foreground md:text-6xl">
              {guide.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {guide.tagline}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={GUIDE_PDF_PATH}
                download
                className="btn-primary inline-flex items-center justify-center gap-2 text-base"
              >
                <span aria-hidden="true">⬇️</span>
                Download as PDF
              </a>
              <a
                href="#install"
                className="btn-secondary inline-flex items-center justify-center gap-2 text-base"
              >
                Start reading
              </a>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              Last updated {lastUpdated}. Covers Locksy v{guide.version}.
            </p>
          </div>
        </div>

        {/* ── Contents + chapters ─────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-4 pt-12 md:px-6">
          <div className="gap-12 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
            <GuideToc entries={guideToc} />

            <div className="min-w-0 space-y-16">
              {guide.chapters.map((chapter) => (
                <section key={chapter.id} aria-labelledby={chapter.id} className="scroll-mt-28">
                  <div className="mb-5 flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-2xl shadow-lg">
                      <span aria-hidden="true">{chapter.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                        Chapter {chapter.num}
                      </p>
                      <h2
                        id={chapter.id}
                        className="mt-1 text-2xl font-black leading-tight text-foreground md:text-3xl"
                      >
                        {chapter.title}
                      </h2>
                    </div>
                  </div>

                  <p className="mb-6 border-l-2 border-primary/30 pl-4 text-lg leading-relaxed text-muted-foreground">
                    {chapter.summary}
                  </p>

                  <GuideBlocks blocks={chapter.blocks} />
                </section>
              ))}

              {/* Closing CTA at the end of the reading flow */}
              <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 text-center">
                <h2 className="text-2xl font-black text-foreground">Still have a question?</h2>
                <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
                  Take the guide with you as a PDF, or get in touch and we&apos;ll walk you through it.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a href={GUIDE_PDF_PATH} download className="btn-primary text-base">
                    Download the PDF
                  </a>
                  <Link href="/contact" className="btn-secondary text-base">
                    Contact support
                  </Link>
                </div>
              </div>
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
