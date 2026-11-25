"use client"

import { ArrowUpRight } from "lucide-react"
import { useVisitorBrowser, StoreNote } from "@/components/install-buttons"
import { orderedStores } from "@/lib/browsers"

/**
 * Store cards for the user guide's install chapter. The visitor's browser is
 * listed first and highlighted. The guide JSON still lists the three stores,
 * but the URLs and order come from lib/browsers.ts.
 */
export default function GuideDownloads() {
  const visitor = useVisitorBrowser()
  const stores = orderedStores(visitor.browser)

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stores.map((b, i) => (
          <a
            key={b.id}
            href={b.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`surface group flex items-center gap-3 p-4 transition-colors hover:border-foreground/20 ${
              i === 0 ? "ring-1 ring-highlight/40 btn-glow" : ""
            }`}
          >
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-background">
              <img src={b.icon} alt="" className="h-7 w-7 object-contain" />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{i === 0 && visitor.detected ? "Your browser" : "Get it for"}</p>
              <p className="font-medium text-foreground">{b.name === "your browser" ? "This browser" : b.name}</p>
              <p className="truncate text-xs text-muted-foreground">{b.store}</p>
            </div>
            <ArrowUpRight
              aria-hidden="true"
              className="ml-auto h-4 w-4 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
            />
          </a>
        ))}
      </div>
      <StoreNote visitor={visitor} className="mt-3" />
    </div>
  )
}
