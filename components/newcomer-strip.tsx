import Link from "next/link"

// Store URLs kept in sync with hero.tsx and lib/guide-content.json.
const BROWSERS = [
  {
    name: "Chrome",
    url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim",
    icon: "/browsers/chrome.png",
  },
  {
    name: "Firefox",
    url: "https://addons.mozilla.org/en-US/firefox/addon/locksy/",
    icon: "/browsers/firefox.png",
  },
  {
    name: "Edge",
    url: "https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn",
    icon: "/browsers/edge.png",
  },
]

export default function NewcomerStrip() {
  return (
    <section
      aria-label="Get started with Locksy"
      className="border-b border-border/50 bg-gradient-to-r from-primary/5 via-background to-secondary/5 py-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 md:flex-row md:justify-between md:px-6">
        <p className="text-sm font-semibold text-foreground">
          New here?{" "}
          <span className="font-normal text-muted-foreground">Install Locksy free in one click:</span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {BROWSERS.map((b) => (
            <a
              key={b.name}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition hover:border-primary/40 hover:bg-primary/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.icon} alt="" aria-hidden="true" className="h-4 w-4 object-contain" />
              {b.name}
            </a>
          ))}

          <Link
            href="/guide"
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-2 text-sm font-medium text-primary transition hover:bg-primary/15"
          >
            <span aria-hidden="true">📖</span>
            Read the guide
          </Link>
        </div>
      </div>
    </section>
  )
}
