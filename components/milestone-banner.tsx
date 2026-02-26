"use client"

import { useEffect, useRef, useState } from "react"

const PARTICLE_COUNT = 30

function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
    color: ["#a78bfa", "#818cf8", "#c084fc", "#60a5fa", "#f472b6"][Math.floor(Math.random() * 5)],
  }))
}

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

export default function MilestoneBanner() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [animating, setAnimating] = useState(false)
  const [particles] = useState(generateParticles)
  const count = useCountUp(1000, 2200, animating)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimating(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-20"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.45 0.24 264 / 0.06) 0%, oklch(0.99 0 0) 40%, oklch(0.55 0.22 300 / 0.08) 100%)",
      }}
    >
      {/* Animated floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full opacity-0"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              animation: animating
                ? `milestoneFloat ${p.duration}s ${p.delay}s ease-in-out infinite alternate`
                : "none",
            }}
          />
        ))}

        {/* Big soft glow orbs */}
        <div
          className="absolute -left-24 top-1/2 -translate-y-1/2 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{ background: "oklch(0.45 0.24 264)" }}
        />
        <div
          className="absolute -right-24 top-1/2 -translate-y-1/2 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{ background: "oklch(0.55 0.22 300)" }}
        />
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 h-48 w-[600px] rounded-full opacity-10 blur-3xl"
          style={{ background: "linear-gradient(90deg, oklch(0.45 0.24 264), oklch(0.55 0.22 300))" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6">
        {/* Pill badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{
              borderColor: "oklch(0.45 0.24 264 / 0.3)",
              background: "oklch(0.45 0.24 264 / 0.08)",
              color: "oklch(0.45 0.24 264)",
            }}>
            <span
              className="flex h-2 w-2 rounded-full"
              style={{
                background: "oklch(0.45 0.24 264)",
                boxShadow: "0 0 6px oklch(0.45 0.24 264)",
                animation: "pulse 2s infinite",
              }}
            />
            Milestone Reached
          </span>
        </div>

        {/* Main card */}
        <div
          className="relative mx-auto max-w-3xl rounded-3xl p-px overflow-hidden"
          style={{
            background: "linear-gradient(135deg, oklch(0.45 0.24 264 / 0.5), oklch(0.55 0.22 300 / 0.5), oklch(0.45 0.24 264 / 0.3))",
          }}
        >
          {/* Inner card */}
          <div
            className="relative rounded-[calc(1.5rem-1px)] px-5 py-8 sm:px-8 sm:py-10 md:px-14 md:py-14 text-center overflow-hidden"
            style={{ background: "oklch(0.99 0 0 / 0.96)" }}
          >
            {/* Radial shimmer */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 0%, oklch(0.45 0.24 264 / 0.07), transparent 70%)",
              }}
              aria-hidden="true"
            />

            {/* Stars row */}
            <div className="flex justify-center gap-1 mb-5">
              {["⭐","⭐","⭐","⭐","⭐"].map((s, i) => (
                <span
                  key={i}
                  className="text-lg md:text-xl"
                  style={{
                    animation: animating
                      ? `milestoneStarPop 0.4s ${0.2 + i * 0.1}s both`
                      : "none",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Counter */}
            <div className="flex items-end justify-center gap-2 mb-4">
              <span
                className="font-black tabular-nums"
                style={{
                  fontSize: "clamp(4rem, 12vw, 7rem)",
                  lineHeight: 1,
                  background: "linear-gradient(135deg, oklch(0.45 0.24 264), oklch(0.50 0.23 282), oklch(0.55 0.22 300))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 2px 16px oklch(0.45 0.24 264 / 0.25))",
                }}
              >
                {count.toLocaleString()}
              </span>
              <span
                className="font-black pb-2 md:pb-3"
                style={{
                  fontSize: "clamp(2rem, 6vw, 4rem)",
                  lineHeight: 1,
                  background: "linear-gradient(135deg, oklch(0.45 0.24 264), oklch(0.55 0.22 300))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                +
              </span>
            </div>

            <h3
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ color: "oklch(0.09 0 0)" }}
            >
              Users Trust Locksy
            </h3>
            <p
              className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ color: "oklch(0.50 0 0)" }}
            >
              Over <strong>1,000 privacy-conscious people</strong> have chosen Locksy to protect
              their tabs. Join a growing community that values real browser-level privacy.
            </p>

            {/* Stats row */}
            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
              {[
                { value: "1000+", label: "Active Users" },
                { value: "5★", label: "Avg. Rating" },
                { value: "3", label: "Stores" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <span
                    className="text-base sm:text-xl md:text-2xl font-black"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.45 0.24 264), oklch(0.55 0.22 300))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {value}
                  </span>
                  <span className="text-[10px] sm:text-xs md:text-sm font-medium leading-tight" style={{ color: "oklch(0.55 0 0)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA — per-browser install buttons */}
            <div className="mt-8 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-center" style={{ color: "oklch(0.55 0 0)" }}>
                Add to your browser — free
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { name: "Chrome", icon: "/browsers/chrome.png", url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim" },
                  { name: "Edge",   icon: "/browsers/edge.png",   url: "https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn" },
                  { name: "Firefox",icon: "/browsers/firefox.png",url: "https://addons.mozilla.org/en-US/firefox/addon/locksy/" },
                ].map((b) => (
                  <a
                    key={b.name}
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex flex-col items-center justify-center gap-1 sm:gap-1.5 py-2.5 sm:py-3 px-1 sm:px-2 hover:-translate-y-0.5 transition-all duration-300 group min-w-0"
                  >
                    <img src={b.icon} alt={b.name} className="w-6 h-6 sm:w-7 sm:h-7 object-contain flex-shrink-0" />
                    <span className="text-[10px] sm:text-xs font-semibold text-foreground group-hover:text-white transition-colors truncate w-full text-center">{b.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom trust logos strip */}
        <p className="mt-6 text-center text-xs font-medium" style={{ color: "oklch(0.60 0 0)" }}>
          Available on Chrome · Edge · Firefox · Brave · Opera · Vivaldi · Comet
        </p>
      </div>

      {/* Keyframes injected as a style tag */}
      <style>{`
        @keyframes milestoneFloat {
          0%   { opacity: 0.15; transform: translateY(0px) scale(1); }
          100% { opacity: 0.6;  transform: translateY(-18px) scale(1.3); }
        }
        @keyframes milestoneStarPop {
          0%   { opacity: 0; transform: scale(0.3) rotate(-20deg); }
          70%  { transform: scale(1.3) rotate(5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </section>
  )
}
