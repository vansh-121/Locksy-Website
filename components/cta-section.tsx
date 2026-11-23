import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PRIMARY_BROWSERS } from "@/lib/browsers"

/** Closing call-to-action, shared by the homepage, guide, security and tools pages. */
export default function CTASection() {
  return (
    <section className="relative py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="surface relative overflow-hidden px-6 py-16 text-center md:px-12 md:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,black,transparent)]" />
            <div
              className="absolute inset-x-0 bottom-0 h-[70%]"
              style={{ background: "radial-gradient(55% 80% at 50% 100%, var(--glow), transparent 70%)" }}
            />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl md:text-5xl text-balance">
              Keep your private tabs private, starting today
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-muted-foreground md:text-lg">
              Install Locksy for free and lock your first tab in about 30 seconds. No account, no card.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {PRIMARY_BROWSERS.map((b, i) => (
                <a
                  key={b.id}
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${i === 0 ? "btn-primary" : "btn-secondary"} w-full sm:w-auto`}
                >
                  <img src={b.icon} alt="" className="h-5 w-5 object-contain" />
                  Add to {b.name}
                  {i === 0 && <ArrowRight className="h-4 w-4" />}
                </a>
              ))}
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Also works on Brave, Opera, Vivaldi, Comet, Arc and other Chromium browsers.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact support</Link>
              <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy policy</Link>
              <a
                href="https://github.com/sponsors/vansh-121"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
                title="Sponsoring helps cover Apple's $99/year developer fee for a Safari version"
              >
                Sponsor a Safari version
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
