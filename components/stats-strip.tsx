import { NAMED_SUPPORTED_COUNT } from "@/lib/browsers"

const STATS = [
  { value: "5,000+", label: "People protecting their tabs" },
  { value: "4.4 / 5", label: "Average store rating" },
  { value: `${NAMED_SUPPORTED_COUNT}+`, label: "Browsers it runs in" },
  { value: "600k", label: "PBKDF2 hashing rounds" },
  { value: "0", label: "Accounts or sign-ups" },
  { value: "30 sec", label: "From install to first lock" },
]

/** "What we do" statement + key numbers, modeled on the reference's stat grid. */
export default function StatsStrip() {
  return (
    <section className="relative py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16 items-start">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              What Locksy does
            </span>
          </div>
          <p className="font-display text-2xl font-medium leading-snug tracking-tight text-foreground md:text-[2rem] text-balance">
            We keep the tabs you care about private, whether someone walks past your desk, borrows
            your laptop, or watches your shared screen.{" "}
            <span className="text-muted-foreground">No cloud, no account, nothing to trust but your own browser.</span>
          </p>
        </div>

        {/* gap-px over a border-coloured background draws the hairline grid */}
        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="bg-background p-6 md:p-8">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                  {s.value}
                </span>
                <span className="mt-2 block text-sm text-muted-foreground">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
