"use client"

import { useState } from "react"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Finally! A simple way to lock tabs without switching profiles. Exactly what I needed for my banking tabs.",
      author: "Sarah M.",
      role: "Financial Analyst",
      rating: 5,
    },
    {
      quote: "Perfect for when I'm working at coffee shops. I can step away without worrying about my open tabs.",
      author: "Jake T.",
      role: "Freelance Developer",
      rating: 5,
    },
    {
      quote: "The incognito mode support is a game changer. Same password works everywhere. Simple and effective.",
      author: "Anonymous User",
      role: "Privacy Enthusiast",
      rating: 5,
    },
    {
      quote:
        "As a security professional, I appreciate the multiple protection layers. This is how you build secure extensions.",
      author: "Alex K.",
      role: "Cybersecurity Engineer",
      rating: 5,
    },
    {
      quote: "My family shares a computer and this gives everyone their privacy. Easy for everyone to use!",
      author: "Maria L.",
      role: "Teacher",
      rating: 5,
    },
  ]

  const [currentIdx, setCurrentIdx] = useState(0)

  return (
    <section className="py-20 md:py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="section-title">Trusted by Privacy-Conscious Users Worldwide</h2>
        <p className="section-subtitle">See what real users are saying about Locksy.</p>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="feature-card">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-neutral-700 mb-4 italic">"{testimonial.quote}"</p>
              <div>
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
