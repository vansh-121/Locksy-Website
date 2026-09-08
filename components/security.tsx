export default function Security() {
  const guarantees = [
    { icon: "✓", title: "No Account Required", desc: "Start using Locksy right away — no sign-up, no email, no login." },
    { icon: "✓", title: "Zero Data Collection", desc: "We never see, store, or send your browsing data anywhere." },
    { icon: "✓", title: "Everything Stays on Your Device", desc: "All password checks and locking happen locally inside your browser — nothing is uploaded." },
    { icon: "✓", title: "Only You Can Unlock", desc: "Your password is secured with heavy-duty hashing (PBKDF2, 600k iterations) — an estimated 120 years to crack, with timing-attack protection." },
    { icon: "✓", title: "Stops Password Guessing", desc: "Repeated wrong guesses are slowed and blocked automatically (rate limiting & brute-force protection)." },
    { icon: "✓", title: "No Admin Backdoors", desc: "There's no master override — only you can unlock your tabs." },
  ]

  return (
    <section id="security" className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="section-title">Your Privacy is Our Priority</h2>
        <p className="section-subtitle">Built with security-first principles. Zero compromises.</p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {guarantees.map((item, idx) => (
            <div key={idx} className="flex gap-4 p-6 bg-card rounded-lg border border-border/50">
              <div className="text-2xl font-bold text-primary flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/security"
              className="btn-primary inline-block"
            >
              🛡️ Read Security Deep Dive
            </a>
            <a
              href="/privacy-policy"
              className="btn-secondary inline-block"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
