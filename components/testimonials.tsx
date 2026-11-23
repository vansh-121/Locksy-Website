import { Star } from "lucide-react"
import SectionHeading from "@/components/section-heading"
import { CHROME_STORE_URL, EDGE_STORE_URL, FIREFOX_STORE_URL } from "@/lib/browsers"

const STORES = {
  chrome: { label: "Chrome Web Store", icon: "/browsers/chrome.png" },
  firefox: { label: "Firefox Add-ons", icon: "/browsers/firefox.png" },
  edge: { label: "Edge Add-ons", icon: "/browsers/edge.png" },
} as const

// Verbatim reviews from the public store listings.
const REVIEWS: { quote: string; author: string; store: keyof typeof STORES }[] = [
  {
    quote:
      "It works really well, and usually the extension lets you right in on other tab lockers, but this one always asks for your pin, making it my favorite one. Recommend it to all of the people that consider this.",
    author: "Anthony Moeller",
    store: "chrome",
  },
  {
    quote:
      "It is really nice extension, happy to use it! Clean interface and works seamlessly across all my tabs. Highly recommended for anyone who values privacy.",
    author: "Sai Smruti Ranjan Das",
    store: "chrome",
  },
  {
    quote:
      "Domain lock feature is really helpful for shared computers. The extension provides peace of mind knowing my personal tabs stay private. Great work by the developer!",
    author: "Avneet Singh",
    store: "chrome",
  },
  { quote: "So now I do not have to worry about handing over my laptop :)", author: "Devansh Varshney", store: "chrome" },
  { quote: "Amazing, Great Product. 100% Satisfied.", author: "Simran Singh", store: "firefox" },
  { quote: "10/10 for personal security.", author: "Ratanveer", store: "edge" },
]

const COLUMNS = [
  [REVIEWS[0], REVIEWS[3]],
  [REVIEWS[1], REVIEWS[4]],
  [REVIEWS[2], REVIEWS[5]],
]

function ReviewCard({ quote, author, store }: (typeof REVIEWS)[number]) {
  const s = STORES[store]
  const initials = author
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
  return (
    <figure className="surface p-6">
      <div className="flex gap-0.5" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="mt-4 text-[15px] leading-relaxed text-foreground">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">
          {initials}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-foreground">{author}</span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <img src={s.icon} alt="" className="h-3.5 w-3.5 object-contain" />
            {s.label}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Reviews"
          title="What people say about Locksy"
          description="Real reviews from the Chrome, Firefox and Edge stores."
        />

        {/* Rating summary */}
        <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-display text-3xl font-semibold text-foreground">4.4</span>
            <span className="text-muted-foreground">
              average rating
              <br />
              across 3 stores
            </span>
          </div>
          <span className="hidden h-10 w-px bg-border sm:block" />
          <div className="flex items-center gap-3">
            {[
              { href: CHROME_STORE_URL, ...STORES.chrome },
              { href: FIREFOX_STORE_URL, ...STORES.firefox },
              { href: EDGE_STORE_URL, ...STORES.edge },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={`Read reviews on ${s.label}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card hover:bg-muted transition-colors"
              >
                <img src={s.icon} alt={s.label} className="h-5 w-5 object-contain" />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile: simple stack. Desktop: slow vertical marquee per column. */}
        <div className="mt-12 grid gap-4 md:hidden">
          {REVIEWS.map((r) => (
            <ReviewCard key={r.author} {...r} />
          ))}
        </div>

        <div className="marquee-paused relative mt-12 hidden h-[560px] overflow-hidden md:grid md:grid-cols-3 md:gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
          {COLUMNS.map((col, ci) => (
            <div key={ci} className="overflow-hidden">
              <div
                className="animate-marquee-up flex flex-col gap-4"
                style={{ animationDuration: `${34 + ci * 8}s`, animationDirection: ci === 1 ? "reverse" : "normal" }}
              >
                {/* Repeated so the -50% translate loops seamlessly */}
                {[...col, ...col, ...col, ...col].map((r, i) => (
                  <div key={`${r.author}-${i}`} aria-hidden={i >= col.length ? true : undefined}>
                    <ReviewCard {...r} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
