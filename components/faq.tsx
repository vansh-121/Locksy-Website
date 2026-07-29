"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { faqData } from "@/lib/faq-data"

// The full question list is long enough that rendering all of it pushes the rest
// of the page far down, so only the first few are listed until the visitor asks
// for more. Every answer stays collapsed until its question is clicked.
const INITIAL_VISIBLE = 6

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  const visibleFaqs = showAll ? faqData : faqData.slice(0, INITIAL_VISIBLE)
  const hiddenCount = faqData.length - INITIAL_VISIBLE

  function toggleList() {
    // Collapsing the list shouldn't leave an open answer that is about to be
    // hidden — reset it so reopening the list starts from a clean state.
    if (showAll && openIdx !== null && openIdx >= INITIAL_VISIBLE) {
      setOpenIdx(null)
    }
    setShowAll(!showAll)
  }

  return (
    <section
      id="faq"
      className="py-20 md:py-32 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white relative overflow-hidden"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 right-1/5 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-300" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-neutral-300 text-center mb-12">Everything you need to know about Locksy.</p>

        <div className="space-y-3">
          {visibleFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx

            return (
              <div
                key={faq.question}
                className="border border-neutral-700 rounded-lg overflow-hidden"
              >
                <button
                  type="button"
                  id={`faq-question-${idx}`}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full p-6 flex items-center justify-between gap-4 text-left hover:bg-neutral-700/50 transition"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className={`text-2xl leading-none flex-shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    className="px-6 pt-4 pb-6 text-neutral-300 border-t border-neutral-700"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {hiddenCount > 0 && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={toggleList}
              aria-expanded={showAll}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-600 bg-neutral-800/60 font-semibold hover:bg-neutral-700/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition"
            >
              {showAll ? "Show fewer questions" : `Show all questions`}
              <ChevronDown
                aria-hidden="true"
                className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`}
              />
            </button>
            {!showAll && (
              <p className="mt-3 text-sm text-neutral-400">
                {hiddenCount} more {hiddenCount === 1 ? "question" : "questions"} available
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
