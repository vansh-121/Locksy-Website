import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { RELEASES, formatReleaseDate } from "@/lib/changelog"

/**
 * Homepage "Recently shipped" strip: the three newest releases from
 * lib/changelog.ts, linking through to the full /changelog page.
 */
export default function WhatsNew() {
  const recent = RELEASES.slice(0, 3)

  return (
    <section id="whats-new" className="relative scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              What&apos;s new
            </span>
            <h2 className="mt-5 text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl md:text-5xl text-balance">
              Updated every few weeks
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              {RELEASES.length} releases since {formatReleaseDate(RELEASES[RELEASES.length - 1].date)}. Here&apos;s what shipped most
              recently.
            </p>
          </div>
          <Link href="/changelog" className="btn-secondary h-10 flex-shrink-0 px-5">
            Full changelog <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {recent.map((r, i) => (
            <li key={r.version}>
              <Link
                href={`/changelog#v${r.version.replace(/\./g, "-")}`}
                className={`surface group flex h-full flex-col p-6 transition-colors hover:border-foreground/20 ${
                  i === 0 ? "ring-1 ring-highlight/30" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-foreground">v{r.version}</span>
                  <time dateTime={r.date} className="text-xs text-muted-foreground">
                    {formatReleaseDate(r.date)}
                  </time>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">{r.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{r.summary}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Read release notes
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
