"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Plus } from "lucide-react"
import { faqData } from "@/lib/faq-data"

// Only the first few questions show until the visitor asks for more, so the
// list doesn't push the rest of the page down.
const INITIAL_VISIBLE = 6

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const [showAll, setShowAll] = useState(false)

  const visibleFaqs = showAll ? faqData : faqData.slice(0, INITIAL_VISIBLE)
  const hiddenCount = faqData.length - INITIAL_VISIBLE

  function toggleList() {
    if (showAll && openIdx !== null && openIdx >= INITIAL_VISIBLE) setOpenIdx(null)
    setShowAll(!showAll)
  }

  return (
    <section id="faq" className="relative scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            FAQ
          </span>
          <h2 className="mt-5 text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl md:text-5xl text-balance">
            Frequently asked questions
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Everything about how Locksy works, what&apos;s free and what&apos;s in Pro. Can&apos;t find your answer?
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/guide" className="btn-secondary h-10 px-5">
              Read the user guide
            </Link>
            <Link href="/contact" className="inline-flex h-10 items-center px-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact support →
            </Link>
          </div>
        </div>

        <div>
          <div className="divide-y divide-border border-y border-border">
            {visibleFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx
              return (
                <div key={faq.question}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-question-${idx}`}
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span className="font-sans text-base font-medium tracking-normal text-foreground md:text-[17px]">
                        {faq.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform duration-200 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  </h3>
                  {isOpen && (
                    <div
                      id={`faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`faq-question-${idx}`}
                      className="pb-6 pr-12 text-[15px] leading-relaxed text-muted-foreground"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {hiddenCount > 0 && (
            <button
              type="button"
              onClick={toggleList}
              aria-expanded={showAll}
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {showAll ? "Show fewer questions" : `Show ${hiddenCount} more questions`}
              <ChevronDown className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
