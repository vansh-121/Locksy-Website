"use client"

import { useState } from "react"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "It works really well, and usually the extension lets you right in on other tab lockers, but this one always asks for your pin, making it my favorite one. Recommend it to all of the people that consider this.",
      author: "Anthony Moeller",
      role: "Chrome Web Store",
      rating: 5,
    },
    {
      quote: "It is really nice extension, happy to use it! Clean interface and works seamlessly across all my tabs. Highly recommended for anyone who values privacy.",
      author: "Sai Smruti Ranjan Das",
      role: "Chrome Web Store",
      rating: 5,
    },
    {
      quote: "Domain lock feature is really helpful for shared computers. The extension provides peace of mind knowing my personal tabs stay private. Great work by the developer!",
      author: "Avneet Singh",
      role: "Chrome Web Store",
      rating: 5,
    },
    {
      quote: "So now I do not have to worry about handing over my laptop :)",
      author: "Devansh Varshney",
      role: "Chrome Web Store",
      rating: 5,
    },
    {
      quote: "Amazing, Great Product. 100% Satisfied.",
      author: "Simran Singh",
      role: "Firefox Add-ons",
      rating: 5,
    },
    {
      quote: "10/10 for personal security.",
      author: "Ratanveer",
      role: "Microsoft Edge Add-ons",
      rating: 5,
    },
  ]

  const [currentIdx, setCurrentIdx] = useState(0)

  return (
    <section className="py-20 md:py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="section-title">Trusted by Privacy-Conscious Users Worldwide</h2>
        <p className="section-subtitle">See what real users are saying about Locksy.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="feature-card flex flex-col min-h-[240px]">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-neutral-700 mb-6 italic flex-grow">"{testimonial.quote}"</p>
              <div className="mt-auto pt-4 border-t border-neutral-200">
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-neutral-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-16 text-center">
          <div className="p-6 bg-white rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">5.0</div>
            <p className="text-neutral-600">Average Rating</p>
          </div>
          <div className="p-6 bg-white rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <p className="text-neutral-600">Privacy Score</p>
          </div>
          <div className="p-6 bg-white rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">0</div>
            <p className="text-neutral-600">Data Breaches</p>
          </div>
          <div className="p-6 bg-white rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">∞</div>
            <p className="text-neutral-600">Free Forever</p>
          </div>
        </div>
      </div>
    </section>
  )
}
