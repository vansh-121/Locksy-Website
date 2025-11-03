"use client"

import { useState } from "react"
import { faqData } from "@/lib/faq-data"

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section 
      id="faq" 
      className="py-20 md:py-32 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white"
      itemScope 
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-neutral-300 text-center mb-12">Everything you need to know about Locksy.</p>

        <div className="space-y-3">
          {faqData.map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-neutral-700 rounded-lg overflow-hidden"
              itemScope 
              itemProp="mainEntity" 
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between hover:bg-neutral-700/50 transition"
              >
                <span className="font-semibold text-lg" itemProp="name">{faq.question}</span>
                <span className={`text-2xl transition-transform ${openIdx === idx ? "rotate-45" : ""}`}>+</span>
              </button>
              {openIdx === idx && (
                <div 
                  className="px-6 pb-6 text-neutral-300 border-t border-neutral-700"
                  itemScope 
                  itemProp="acceptedAnswer" 
                  itemType="https://schema.org/Answer"
                >
                  <div itemProp="text">{faq.answer}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
