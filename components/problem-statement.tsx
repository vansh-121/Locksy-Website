export default function ProblemStatement() {
  const painPoints = [
    { icon: "💳", title: "Banking", desc: "Banking websites left open on shared computers", color: "from-emerald-500 to-teal-500" },
    { icon: "📧", title: "Email", desc: "Private messages and confidential emails", color: "from-blue-500 to-cyan-500" },
    { icon: "💼", title: "Work", desc: "Work documents with sensitive information", color: "from-purple-500 to-pink-500" },
    { icon: "🛍️", title: "Shopping", desc: "Shopping history and payment details", color: "from-orange-500 to-red-500" },
    { icon: "👤", title: "Privacy", desc: "Personal browsing you'd rather keep private", color: "from-indigo-500 to-purple-500" },
    { icon: "🏠", title: "Family", desc: "Family using the same computer", color: "from-rose-500 to-pink-500" },
  ]

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background to-accent/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 border border-destructive/20 rounded-full text-sm font-medium text-destructive backdrop-blur-sm mb-6">
            <span>⚠️</span>
            The Problem
          </div>
          <h2 className="section-title">Ever Worry About Someone<br />Seeing Your Sensitive Tabs?</h2>
          <p className="section-subtitle">
            You're not alone. Millions of people share devices and work in public spaces.<br />
            Your private information is just one glance away from being exposed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {painPoints.map((point, idx) => (
            <div
              key={idx}
              className="group relative feature-card hover:border-destructive/20"
            >
              <div className="relative z-10">
                <div className={`inline-flex w-16 h-16 items-center justify-center text-4xl mb-6 bg-gradient-to-br ${point.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  {point.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 text-foreground">{point.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />

          <div className="relative bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary rounded-3xl p-12 md:p-16 text-white text-center shadow-2xl shadow-primary/20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl">
                ✨
              </div>
            </div>
            <h3 className="text-4xl md:text-5xl font-black mb-6">Locksy Solves This Problem</h3>
            <p className="text-xl md:text-2xl opacity-95 mb-8 max-w-3xl mx-auto">
              Lock any tab with a password in seconds. Simple. Secure. Private.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                Get for Chrome
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                Get for Edge
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
