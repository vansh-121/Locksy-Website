export default function Features() {
  const features = [
    {
      icon: "🛡️",
      title: "Privacy Blur Shield",
      desc: "Automatically masks passwords, credit cards, emails, and OTPs on web pages, plus instantly blurs the page overlay when switching windows or leaving your computer.",
      gradient: "from-indigo-500 to-purple-500",
    },
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
      desc: "Lock the current tab (Alt+Shift+9), open the manager (Alt+Shift+0), lock every tab (Alt+Shift+8, 3 free uses then Pro), or hide Locksy with Stealth Mode (Alt+Shift+7). All shortcuts are customizable, and locked tabs show a lock icon plus a live badge counter.",
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
      icon: "👆",
      title: "Biometric Unlock",
      desc: "Unlock protected tabs with your fingerprint or face — Touch ID, Windows Hello, Face ID, Android biometrics, or a USB security key. Your biometric data never leaves your device.",
      gradient: "from-violet-500 to-indigo-500",
    },
    {
      icon: "🖱️",
      title: "Right-Click Context Menus",
      desc: "Lock tabs instantly from the right-click menu — no popup needed. Lock this tab, lock a domain, lock all tabs, or toggle stealth. Works on pages, links, images, and selected text.",
      gradient: "from-indigo-500 to-violet-500",
    },
    {
      icon: "🕵️",
      title: "Stealth Mode",
      desc: "Make Locksy completely invisible. Badge counter vanishes, notifications go silent, and locked tabs show a fake \"connection refused\" error page. Toggle via popup, Alt+Shift+7, or right-click.",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      icon: "📸",
      title: "Webcam Intruder Capture",
      desc: "Silently captures a local-only webcam snapshot of snoopers trying to guess your password. Dedicated log page lets you review attempt histories and delete photos safely.",
      gradient: "from-rose-500 to-red-500",
    },
    {
      icon: "🚀",
      title: "Startup Session Lock",
      desc: "Automatically locks your session tabs when the browser launches, including tabs that restore a moment later. Requires Locksy Pro.",
      gradient: "from-amber-500 to-yellow-500",
    },
    {
      icon: "📊",
      title: "Weekly Privacy Reports",
      desc: "Local metrics dashboard tracking locks history, failed snooper attempts, and active security scores. 100% private and generated completely offline.",
      gradient: "from-violet-600 to-indigo-600",
    },
    {
      icon: "💬",
      title: "Custom Lock Screen Messages",
      desc: "Display personalized notes, reminders, or warning messages directly on the lock screen to deter snoopers.",
      gradient: "from-teal-500 to-emerald-500",
    },
    {
      icon: "🔓",
      title: "1-Click Unlock All",
      desc: "Unlock all currently protected tabs simultaneously by entering your master password once. Perfect for quick workflow resumption.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: "🚨",
      title: "Real-Time Intruder Alerts",
      desc: "Get instant browser notifications and visual warnings on the lock screen when someone attempts to access protected tabs.",
      gradient: "from-rose-500 to-red-500",
    },
    {
      icon: "🔒",
      title: "Strong Password Encryption",
      desc: "Your master password is protected with heavy-duty hashing (PBKDF2, 600k rounds, SHA-256) — the approach security experts recommend, with an estimated 120 years to crack.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "🛡️",
      title: "Brute-Force Protection",
      desc: "If someone keeps guessing your password, Locksy automatically slows them down with escalating delays — blocking automated cracking tools.",
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
