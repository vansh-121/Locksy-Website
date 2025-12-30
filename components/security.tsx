export default function Security() {
  const guarantees = [
    { icon: "✓", title: "No Account Required", desc: "Start using Locksy immediately without sign-up" },
    { icon: "✓", title: "Zero Data Collection", desc: "We never see, store, or transmit your browsing data" },
    // { icon: "✓", title: "Local Storage Only", desc: "Everything stays on your device, under your control" },
    { icon: "✓", title: "Open Source Code", desc: "Inspect the code yourself on GitHub" },
    { icon: "✓", title: "PBKDF2 with 600k Iterations", desc: "120 years crack resistance with timing attack protection" },
    { icon: "✓", title: "Rate Limiting & Brute-Force Protection", desc: "Advanced protection against automated cracking attempts" },
    { icon: "✓", title: "No Admin Backdoors", desc: "Only you can unlock your tabs" },
  ]

  return (
    <section id="security" className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="section-title">Your Privacy is Our Priority</h2>
        <p className="section-subtitle">Built with security-first principles. Zero compromises.</p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {guarantees.map((item, idx) => (
            <div key={idx} className="flex gap-4 p-6 bg-white rounded-lg">
              <div className="text-2xl font-bold text-primary flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-neutral-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/vansh-121/Secure-Tab-Extension"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-block"
            >
              View Full Source Code
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
