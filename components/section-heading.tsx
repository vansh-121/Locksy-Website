import type { ReactNode } from "react"

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: "center" | "left"
  className?: string
}

/** Eyebrow pill + heading + optional lead paragraph, shared by homepage sections. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center"
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <span className="eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-5 text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl md:text-5xl text-balance">
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-base leading-relaxed text-muted-foreground md:text-lg text-pretty ${centered ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  )
}
