export default function Features() {
  const features = [
    {
      icon: "⏱️",
      title: "Auto-Lock Timer",
      desc: "Automatic protection after inactivity. Set your timeout duration (1-480 min) and let Locksy lock your tabs automatically when you step away. Smart activity detection won't interrupt video playback.",
      gradient: "from-indigo-500 to-violet-500",
    },
    {
      icon: "📅",
      title: "Scheduled Locking",
      desc: "Time-based security on autopilot. Lock tabs during specific hours and days automatically—perfect for work hours or sleep time. Overnight schedule support included.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: "⌨️",
      title: "Keyboard Shortcuts",
      desc: "Lock tabs instantly with Alt+Shift+9, open manager with Alt+Shift+0, or lock all tabs with Alt+Shift+8. Fully customizable shortcuts.",
      gradient: "from-violet-500 to-purple-500",
    },
    // {
    //   icon: "🎨",
    //   title: "Visual Lock Indicators",
    //   desc: "Red lock icon on tab favicons and real-time badge counter on extension icon. Always know which tabs are protected at a glance.",
    //   gradient: "from-rose-500 to-pink-500",
    // },
    {
      icon: "🌐",
      title: "Domain Lock",
      desc: "Lock entire domains with wildcard patterns. Auto-lock new tabs matching locked domains with persistent protection.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "🔐",
      title: "One-Click Locking",
      desc: "Lock any tab instantly with a single click. No complex setup needed.",
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      icon: "👆",
      title: "Biometric Unlock (v2.3.0)",
      desc: "Unlock protected tabs with Touch ID, Windows Hello, Face ID, or Android biometrics. WebAuthn / FIDO2 — no biometric data ever leaves your device.",
      gradient: "from-violet-500 to-indigo-500",
    },
    {
      icon: "🖱️",
      title: "Right-Click Context Menus (v2.5.0)",
      desc: "Lock tabs instantly from the right-click menu — no popup needed. Lock this tab, lock a domain, lock all tabs, or toggle stealth. Works on pages, links, images, and selected text.",
      gradient: "from-indigo-500 to-violet-500",
    },
    {
      icon: "🕵️",
      title: "Stealth Mode (v2.5.0)",
      desc: "Make Locksy completely invisible. Badge counter vanishes, notifications go silent, and locked tabs show a fake \"connection refused\" error page. Toggle via popup, Alt+Shift+7, or right-click.",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      icon: "🎨",
      title: "Light / Dark Theme (v2.5.0)",
      desc: "Persistent theme switcher built into the popup header. Choose light or dark mode — syncs instantly across all Locksy pages without reload. Works on the lock screen too.",
      gradient: "from-cyan-500 to-violet-500",
    },
    {
      icon: "🔒",
      title: "PBKDF2 Key Derivation",
      desc: "600k iterations with SHA-256 - OWASP 2023 compliant. Military-grade password hashing with 120 years crack resistance.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "🛡️",
      title: "Rate Limiting & Brute-Force Protection",
      desc: "Advanced timing attack protection with exponential backoff. Prevents automated password cracking attempts.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: "🔑",
      title: "Incognito Mode Support",
      desc: "Works seamlessly in private browsing windows with same security.",
      gradient: "from-green-500 to-emerald-500",
    },
    // {
    //   icon: "🪶",
    //   title: "Ultra Lightweight",
    //   desc: "Zero performance impact on your browser. Optimized for speed.",
    //   gradient: "from-yellow-500 to-orange-500",
    // },
    {
      icon: "🔐",
      title: "8+ Security Layers",
      desc: "Multiple protection mechanisms prevent bypass attempts.",
      gradient: "from-red-500 to-rose-500",
    },
    {
      icon: "📴",
      title: "100% Offline",
      desc: "Everything stored locally on your device. No data sent to servers.",
      gradient: "from-indigo-500 to-blue-500",
    },
    // {
    //   icon: "🎨",
    //   title: "Modern UI",
    //   desc: "Beautiful gradient interface with smooth animations.",
    //   gradient: "from-pink-500 to-purple-500",
    // },
    // {
    //   icon: "🔄",
    //   title: "Smart Unlock Preferences",
    //   desc: "Choose to unlock just the current tab or all tabs for a domain. Locksy remembers your preference.",
    //   gradient: "from-teal-500 to-cyan-500",
    // },
    {
      icon: "🚫",
      title: "No Account Required",
      desc: "Install and start protecting tabs in 30 seconds.",
      gradient: "from-orange-500 to-red-500",
    },
  ]

  return (
    <section id="features" className="py-24 md:py-32 bg-gradient-to-b from-background via-accent/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      {/* Animated glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-primary/8 dark:bg-primary/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/8 dark:bg-secondary/15 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-2/3 left-1/2 w-72 h-72 bg-violet-500/6 dark:bg-violet-500/12 rounded-full blur-3xl animate-pulse delay-300" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
            <span aria-hidden="true">✨</span>
            Powerful Features
          </div>
          <h2 className="section-title">Everything You Need.<br />Nothing You Don't.</h2>
          <p className="section-subtitle">
            Built with security and simplicity in mind. Protect your sensitive tabs without compromising on performance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group feature-card relative overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className={`inline-flex w-16 h-16 items-center justify-center text-4xl mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <span aria-hidden="true">{feature.icon}</span>
                </div>
                <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>

              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
