import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"

/**
 * Shared building blocks for every inner page, so they all match the homepage:
 * near-black surfaces, hairline borders, one brand-blue highlight, DM Sans
 * headings, no gradient text, no glowing blobs, no emoji icons.
 */

export interface Crumb {
  label: string
  href?: string
}

/** Top-of-page hero: breadcrumb, eyebrow pill, H1, lead paragraph, optional meta/actions. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  meta,
  children,
  align = "center",
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  breadcrumbs?: Crumb[]
  meta?: ReactNode
  children?: ReactNode
  align?: "center" | "left"
}) {
  const centered = align === "center"
  return (
    <section className="page-top-offset relative overflow-hidden pb-14 md:pb-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_65%_60%_at_50%_0%,black,transparent)]" />
        <div
          className="absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/3"
          style={{ background: "radial-gradient(50% 50% at 50% 50%, var(--glow), transparent 70%)" }}
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} centered={centered} />}
        <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
          {eyebrow && (
            <span className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-6 text-4xl font-semibold leading-[1.06] text-foreground sm:text-5xl md:text-6xl text-balance">
            {title}
          </h1>
          {description && (
            <p
              className={`mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg text-pretty ${
                centered ? "mx-auto" : ""
              }`}
            >
              {description}
            </p>
          )}
          {meta && (
            <div className={`mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground ${centered ? "justify-center" : ""}`}>
              {meta}
            </div>
          )}
          {children && <div className={`mt-9 ${centered ? "flex flex-wrap justify-center gap-3" : "flex flex-wrap gap-3"}`}>{children}</div>}
        </div>
      </div>
    </section>
  )
}

export function Breadcrumbs({ items, centered = true }: { items: Crumb[]; centered?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`mb-8 flex ${centered ? "justify-center" : ""}`}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        {items.map((c, i) => (
          <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true" className="text-border">/</span>}
            {c.href ? (
              <Link href={c.href} className="hover:text-foreground transition-colors">
                {c.label}
              </Link>
            ) : (
              <span className="text-foreground" aria-current="page">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Standard section wrapper with consistent vertical rhythm and width. */
export function PageSection({
  children,
  id,
  className = "",
  width = "default",
}: {
  children: ReactNode
  id?: string
  className?: string
  width?: "narrow" | "default" | "wide"
}) {
  const max = width === "narrow" ? "max-w-3xl" : width === "wide" ? "max-w-7xl" : "max-w-6xl"
  return (
    <section id={id} className={`relative scroll-mt-28 py-12 md:py-16 ${className}`}>
      <div className={`mx-auto ${max} px-4 md:px-6`}>{children}</div>
    </section>
  )
}

/** Card surface used everywhere instead of ad-hoc shadowed/gradient boxes. */
export function Panel({
  children,
  className = "",
  as: Tag = "div",
  id,
}: {
  children: ReactNode
  className?: string
  as?: "div" | "article" | "section" | "aside" | "li"
  id?: string
}) {
  return (
    <Tag id={id} className={`surface p-6 md:p-8 ${className}`}>
      {children}
    </Tag>
  )
}

/** Small square icon tile used in front of card headings. */
export function IconTile({ icon: Icon, className = "" }: { icon: React.ComponentType<{ className?: string }>; className?: string }) {
  return (
    <span className={`inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-muted ${className}`}>
      <Icon className="h-5 w-5 text-highlight" />
    </span>
  )
}

/**
 * Long-form document layout for legal/policy pages: sticky table of contents on
 * the left, numbered sections on the right.
 */
export function DocLayout({
  toc,
  children,
}: {
  toc: { id: string; label: string }[]
  children: ReactNode
}) {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 md:px-6 md:pb-24 lg:grid-cols-[220px_1fr] lg:gap-16">
      <aside className="hidden lg:block">
        <nav aria-label="On this page" className="sticky top-28">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">On this page</p>
          <ol className="mt-4 space-y-2 border-l border-border">
            {toc.map((t, i) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className="-ml-px flex gap-2 border-l border-transparent py-0.5 pl-4 text-sm text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
                >
                  <span className="font-mono text-xs text-muted-foreground/70">{String(i + 1).padStart(2, "0")}</span>
                  {t.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>
      <div className="min-w-0 space-y-4">{children}</div>
    </div>
  )
}

/** One numbered section inside DocLayout. */
export function DocSection({
  id,
  index,
  title,
  icon,
  children,
}: {
  id: string
  index?: number
  title: ReactNode
  icon?: React.ComponentType<{ className?: string }>
  children: ReactNode
}) {
  return (
    <section id={id} className="surface scroll-mt-28 p-6 md:p-9">
      <div className="flex items-start gap-4">
        {icon ? (
          <IconTile icon={icon} />
        ) : index !== undefined ? (
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border font-mono text-xs text-foreground">
            {String(index).padStart(2, "0")}
          </span>
        ) : null}
        <h2 className="pt-1.5 text-xl font-semibold leading-snug text-foreground md:text-2xl">{title}</h2>
      </div>
      <div className="doc-body mt-6">{children}</div>
    </section>
  )
}

/** Row of cards linking to related pages, used at the bottom of inner pages. */
export function RelatedLinks({
  title = "Related pages",
  links,
}: {
  title?: string
  links: { href: string; title: string; description: string; external?: boolean }[]
}) {
  return (
    <div className="pt-8">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="surface group flex flex-col p-6 transition-colors hover:border-foreground/20"
          >
            <span className="flex items-center justify-between">
              <span className="text-[15px] font-medium text-foreground">{l.title}</span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </span>
            <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.description}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

/** Neutral callout for notes/warnings. `tone` only changes the small icon dot colour. */
export function Callout({
  title,
  children,
  tone = "info",
  icon: Icon,
}: {
  title?: ReactNode
  children: ReactNode
  tone?: "info" | "warning" | "success" | "danger"
  icon?: React.ComponentType<{ className?: string }>
}) {
  const color =
    tone === "warning"
      ? "text-amber-500"
      : tone === "success"
        ? "text-emerald-500"
        : tone === "danger"
          ? "text-red-500"
          : "text-highlight"
  return (
    <div className="flex gap-3 rounded-2xl border border-border bg-muted/50 p-5">
      {Icon && <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${color}`} />}
      <div className="min-w-0 text-sm leading-relaxed text-muted-foreground">
        {title && <p className="mb-1 font-medium text-foreground">{title}</p>}
        {children}
      </div>
    </div>
  )
}
