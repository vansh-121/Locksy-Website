import type { Metadata } from "next"
import Link from "next/link"
import { Sparkles, Wrench, Bug, ShieldCheck } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CTASection from "@/components/cta-section"
import { PageHero } from "@/components/page-shell"
import { RELEASES, formatReleaseDate, type ChangeKind } from "@/lib/changelog"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/metadata"

export const metadata: Metadata = generatePageMetadata(
  "Changelog: What's New in Locksy",
  "Every Locksy release, newest first: themes, screen share shield, URL path locking, biometric unlock, recovery keys and the security fixes behind them.",
  "/changelog",
  ["locksy changelog", "locksy release notes", "locksy updates"],
)

const KIND: Record<ChangeKind, { label: string; icon: typeof Sparkles; className: string }> = {
  new: { label: "New", icon: Sparkles, className: "text-highlight" },
  improved: { label: "Improved", icon: Wrench, className: "text-muted-foreground" },
  fixed: { label: "Fixed", icon: Bug, className: "text-muted-foreground" },
  security: { label: "Security", icon: ShieldCheck, className: "text-emerald-600 dark:text-emerald-400" },
}

export default function ChangelogPage() {
  const latest = RELEASES[0]
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Changelog", url: "/changelog" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main>
        <PageHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Changelog" }]}
          eyebrow={`Latest: v${latest.version}`}
          title="Changelog"
          description="Every Locksy release, newest first. Small patch releases are folded into the version they fixed."
          meta={
            <>
              <span>{RELEASES.length} releases</span>
              <span aria-hidden="true">·</span>
              <span>First release {formatReleaseDate(RELEASES[RELEASES.length - 1].date)}</span>
            </>
          }
        />

        <section className="pb-16 md:pb-24">
          <div className="mx-auto max-w-5xl px-4 md:px-6">
            <ol className="relative">
              {/* Vertical timeline rule (desktop) */}
              <div aria-hidden="true" className="absolute bottom-0 left-[180px] top-2 hidden w-px bg-border md:block" />

              {RELEASES.map((r, i) => (
                <li
                  key={r.version}
                  id={`v${r.version.replace(/\./g, "-")}`}
                  className="relative scroll-mt-28 pb-10 md:grid md:grid-cols-[180px_1fr] md:gap-10 md:pb-12"
                >
                  {/* Version + date */}
                  <div className="mb-4 md:mb-0 md:pt-7 md:pr-8 md:text-right">
                    <a
                      href={`#v${r.version.replace(/\./g, "-")}`}
                      className="font-mono text-sm text-foreground hover:underline underline-offset-4"
                    >
                      v{r.version}
                    </a>
                    <time dateTime={r.date} className="mt-1 block text-xs text-muted-foreground">
                      {formatReleaseDate(r.date)}
                    </time>
                  </div>

                  {/* Dot on the rule */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-[180px] top-8 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full ring-4 ring-background md:block ${
                      i === 0 ? "bg-highlight" : "bg-border"
                    }`}
                  />

                  <article className={`surface p-6 md:p-8 ${i === 0 ? "ring-1 ring-highlight/30" : ""}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold text-foreground md:text-2xl">{r.title}</h2>
                      {i === 0 && (
                        <span className="rounded-full border border-highlight/30 bg-highlight/10 px-2.5 py-0.5 text-[11px] font-medium text-highlight">
                          Latest
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{r.summary}</p>

                    <ul className="mt-6 space-y-3 border-t border-border pt-6">
                      {r.changes.map((c) => {
                        const k = KIND[c.kind]
                        const Icon = k.icon
                        return (
                          <li key={c.text} className="flex gap-3 text-sm leading-relaxed">
                            <span className={`mt-0.5 inline-flex w-[88px] flex-shrink-0 items-center gap-1.5 text-xs font-medium ${k.className}`}>
                              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                              {k.label}
                            </span>
                            <span className="text-foreground/90">
                              {c.text}
                              {c.pro && (
                                <span className="ml-2 inline-flex rounded-full border border-border px-2 py-px align-middle text-[10px] font-medium text-muted-foreground">
                                  Pro
                                </span>
                              )}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </article>
                </li>
              ))}
            </ol>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Get new releases in your feed reader:{" "}
              <a href="/changelog/feed.xml" className="text-foreground underline underline-offset-4">
                changelog RSS
              </a>
            </p>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Found a bug or want a feature?{" "}
              <a
                href="https://github.com/vansh-121/Locksy/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                Open an issue on GitHub
              </a>{" "}
              or{" "}
              <Link href="/contact" className="text-foreground underline underline-offset-4">
                contact us
              </Link>
              .
            </p>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  )
}
