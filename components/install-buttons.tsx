"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Info } from "lucide-react"
import {
  DEFAULT_VISITOR,
  detectVisitor,
  orderedStores,
  usesChromeStore,
  type BrowserLink,
  type VisitorBrowser,
} from "@/lib/browsers"

/**
 * Detects the visitor's browser after mount. The server and the first client
 * render both use Chrome, so hydration always matches; the buttons then
 * reorder themselves. Detection runs once per page and is shared.
 */
let cached: VisitorBrowser | null = null

export function useVisitorBrowser(): VisitorBrowser {
  const [visitor, setVisitor] = useState<VisitorBrowser>(DEFAULT_VISITOR)
  useEffect(() => {
    if (!cached) cached = detectVisitor()
    setVisitor(cached)
  }, [])
  return visitor
}

/**
 * One install button that always points at the visitor's store, for places
 * with a single call to action. Keeps the caller's label; adds the browser icon.
 */
export function SmartInstallButton({
  label = "Add to {name}",
  variant = "primary",
  size = "default",
  className = "",
  arrow = true,
}: {
  label?: string
  variant?: "primary" | "secondary"
  size?: "default" | "lg" | "sm"
  className?: string
  arrow?: boolean
}) {
  const { browser } = useVisitorBrowser()
  const sizeClass = size === "lg" ? "btn-lg" : size === "sm" ? "btn-sm" : ""
  return (
    <a
      href={browser.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variant === "primary" ? "btn-primary btn-glow" : "btn-secondary"} ${sizeClass} ${className}`}
      data-browser={browser.id}
    >
      <img src={browser.icon} alt="" className="h-5 w-5 object-contain" />
      {label.replace("{name}", browser.name)}
      {arrow && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
    </a>
  )
}

/** Just the browser link, for components that only need the URL and name. */
export function useDetectedBrowser(): BrowserLink {
  return useVisitorBrowser().browser
}

function StoreNote({ visitor, className = "" }: { visitor: VisitorBrowser; className?: string }) {
  if (visitor.note) {
    return (
      <p className={`flex items-start justify-center gap-1.5 text-xs text-muted-foreground ${className}`}>
        <Info className="mt-px h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
        <span>{visitor.note}</span>
      </p>
    )
  }
  if (usesChromeStore(visitor.browser)) {
    const unnamed = visitor.browser.name === "your browser"
    return (
      <p className={`text-xs text-muted-foreground ${className}`}>
        {unnamed
          ? "Your browser installs Locksy from the Chrome Web Store."
          : `${visitor.browser.name} installs Locksy from the Chrome Web Store.`}
      </p>
    )
  }
  return null
}

interface InstallButtonsProps {
  /** "row": primary + every other store as buttons. "single": just the primary. */
  variant?: "row" | "single"
  size?: "default" | "lg" | "sm"
  /** Label for the primary button. `{name}` is replaced with the browser name. */
  primaryLabel?: string
  /** Label for the other buttons. */
  secondaryLabel?: string
  align?: "center" | "start"
  /** Show the "installs from the Chrome Web Store" / unsupported-browser note. */
  showNote?: boolean
  fullWidthOnMobile?: boolean
  className?: string
}

/**
 * The install buttons used everywhere on the site: the visitor's own browser
 * first, highlighted with a glow, then the other stores beside it.
 */
export default function InstallButtons({
  variant = "row",
  size = "default",
  primaryLabel = "Add to {name}",
  secondaryLabel = "Add to {name}",
  align = "center",
  showNote = true,
  fullWidthOnMobile = true,
  className = "",
}: InstallButtonsProps) {
  const visitor = useVisitorBrowser()
  const stores = orderedStores(visitor.browser)
  const [primary, ...others] = stores
  const sizeClass = size === "lg" ? "btn-lg" : size === "sm" ? "btn-sm" : ""
  const width = fullWidthOnMobile ? "w-full sm:w-auto" : ""
  const label = (tpl: string, b: BrowserLink) => tpl.replace("{name}", b.name)

  return (
    <div className={className}>
      <div
        className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${
          align === "center" ? "items-center justify-center" : "items-start"
        }`}
      >
        <a
          href={primary.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-primary btn-glow ${sizeClass} ${width}`}
          data-browser={primary.id}
        >
          <img src={primary.icon} alt="" className="h-5 w-5 object-contain" />
          {label(primaryLabel, primary)}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
        {variant === "row" &&
          others.map((b) => (
            <a
              key={b.id}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-secondary ${sizeClass} ${width}`}
              data-browser={b.id}
            >
              <img src={b.icon} alt="" className="h-5 w-5 object-contain" />
              {label(secondaryLabel, b)}
            </a>
          ))}
      </div>
      {showNote && <StoreNote visitor={visitor} className={`mt-3 ${align === "center" ? "text-center" : ""}`} />}
    </div>
  )
}

/**
 * Inline "also on" text links to the other stores, for places where one
 * primary button is enough (sidebars, blog callouts).
 */
export function OtherStoreLinks({ className = "", label = "Also for:" }: { className?: string; label?: string }) {
  const visitor = useVisitorBrowser()
  const [, ...others] = orderedStores(visitor.browser)
  return (
    <span className={`inline-flex flex-wrap items-center gap-1.5 ${className}`}>
      <span>{label}</span>
      {others.map((b, i) => (
        <span key={b.id} className="inline-flex items-center gap-1.5">
          <a
            href={b.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
          >
            {b.name}
          </a>
          {i < others.length - 1 && <span aria-hidden="true">·</span>}
        </span>
      ))}
    </span>
  )
}

export { StoreNote }
