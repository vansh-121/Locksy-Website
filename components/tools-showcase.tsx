import Link from "next/link"
import { Sparkles, ArrowRight, Shield, Key, Eye, AlertTriangle } from "lucide-react"

export default function ToolsShowcase() {
  const tools = [
    {
      title: "Password Strength Meter",
      description: "Test password entropy against 600,000 PBKDF2 iterations and GPU brute-force speed estimates.",
      icon: "🔑",
      url: "/tools/password-strength-checker",
      badge: "Popular"
    },
    {
      title: "Password Generator",
      description: "Generate cryptographically secure, high-entropy passwords with custom lengths and symbols.",
      icon: "🎲",
      url: "/tools/password-generator",
      badge: "100% Private"
    },
    {
      title: "Browser Privacy Inspector",
      description: "Run a live audit on WebRTC IP leaks, Global Privacy Control headers, and fingerprint entropy.",
      icon: "🛡️",
      url: "/tools/browser-privacy-score",
      badge: "Real-Time"
    },
    {
      title: "Email Breach Inspector",
      description: "Check if your email address has appeared in public security data dumps across the web.",
      icon: "⚠️",
      url: "/tools/email-breach-checker",
      badge: "Live API"
    }
  ]

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            100% Free Web Utilities
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Free Online <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">Security & Privacy Tools</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            No signup required. All calculations execute locally inside your browser memory with zero server telemetry.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tools.map((tool, idx) => (
            <Link
              key={idx}
              href={tool.url}
              className="group p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/60 hover:border-primary/40 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{tool.icon}</span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {tool.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {tool.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border/40 text-xs font-bold text-primary flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                Try Free Tool <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Hub CTA */}
        <div className="text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border hover:border-primary/40 text-foreground font-bold text-sm shadow-md hover:shadow-lg transition-all"
          >
            Explore Full Free Tools Hub <ArrowRight className="w-4 h-4 text-primary" />
          </Link>
        </div>

      </div>
    </section>
  )
}
