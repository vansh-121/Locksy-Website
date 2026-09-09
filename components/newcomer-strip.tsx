import Link from "next/link"

export default function NewcomerStrip() {
  return (
    <section
      aria-label="New to Locksy?"
      className="border-b border-border/50 bg-gradient-to-r from-primary/5 via-background to-secondary/5 py-4"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row md:px-6">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">New to Locksy?</span>
          {" "}Not sure how to get started or what everything does?
        </p>
        <Link
          href="/guide"
          className="btn-primary inline-flex flex-shrink-0 items-center gap-2 text-sm"
        >
          <span aria-hidden="true">📖</span>
          Read the User Guide
        </Link>
      </div>
    </section>
  )
}
