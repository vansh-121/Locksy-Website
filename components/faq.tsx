"use client"

import { useState } from "react"

export default function FAQ() {
  const faqs = [
    {
      q: "Is Locksy really free?",
      a: "Yes, 100% free with no hidden fees, premium tiers, or subscriptions. It will always be free.",
    },
    {
      q: "Do I need to create an account?",
      a: "No account needed! Just install the extension, set your password, and start locking tabs.",
    },
    {
      q: "What happens if I forget my password?",
      a: "For security reasons, passwords cannot be recovered. You'll need to reset your password, which will unlock all currently locked tabs.",
    },
    {
      q: "Does it work in incognito mode?",
      a: 'Yes! Just enable "Allow in Incognito" in your browser\'s extension settings. Your master password works in both normal and incognito windows.',
    },
    {
      q: "Is my password safe?",
      a: "Absolutely. We use SHA-256 encryption (military-grade) and never store your actual password - only an encrypted hash.",
    },
    {
      q: "Can someone bypass the lock?",
      a: "No. Locksy has 8+ security layers that prevent all known bypass methods, including DevTools inspection and DOM tampering.",
    },
    {
      q: "Which browsers are supported?",
      a: "Locksy works on all Chromium-based browsers including Google Chrome, Microsoft Edge, Brave, Opera, Comet, Vivaldi, Arc, and many more. You can install it from the Chrome Web Store or Edge Add-ons store.",
    },
  ]

  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 md:py-32 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-neutral-300 text-center mb-12">Everything you need to know about Locksy.</p>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-neutral-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between hover:bg-neutral-700/50 transition"
              >
                <span className="font-semibold text-lg">{faq.q}</span>
                <span className={`text-2xl transition-transform ${openIdx === idx ? "rotate-45" : ""}`}>+</span>
              </button>
              {openIdx === idx && <div className="px-6 pb-6 text-neutral-300 border-t border-neutral-700">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
