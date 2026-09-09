// A single compact band pointing newcomers at the full user guide.
//
// Deliberately not a full section: the homepage was recently simplified for
// first-time visitors, so this earns its place with one line of copy and two
// links rather than another block of content. Rendered on the server.

import Link from "next/link"
import { guide, GUIDE_PDF_PATH } from "@/lib/guide-data"

export default function GuideBanner() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-secondary/5 p-7 md:p-9">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4 md:items-center">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-3xl shadow-lg">
                <span aria-hidden="true">📖</span>
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-black text-foreground md:text-2xl">
                  New to Locksy? Read the full guide.
                </h2>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">
                  {guide.chapters.length} short chapters covering every feature — setting up, locking tabs,
                  shortcuts, automatic locking and troubleshooting.
                </p>
              </div>
            </div>

            <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <Link
                href="/guide"
                className="btn-primary inline-flex items-center justify-center whitespace-nowrap text-sm"
              >
                Open the guide
              </Link>
              <a
                href={GUIDE_PDF_PATH}
                download
                className="btn-secondary inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm"
              >
                <span aria-hidden="true">⬇️</span>
                PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
