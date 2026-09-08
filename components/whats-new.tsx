// A single, compact replacement for the old stack of six "What's New" / feature
// announcement sections. Rendered entirely on the server (no tabs / client state),
// so every fact below is in the initial HTML — good for readers and for the
// rendered-word-count requirement. Each card keeps the substantive detail from the
// section it replaces, in plain language.
const updates = [
  {
    version: "v3.4.0",
    icon: "🔑",
    title: "Master Recovery Key",
    desc: "Create a 16-character emergency key so you can reset your master password offline if you ever forget it. It's hashed and stored safely on your own device.",
  },
  {
    version: "v3.4.0",
    icon: "⏳",
    title: "Smart Sessions",
    desc: "Decide how long Locksy waits before asking for your password again — from strict (every time) up to 60 minutes — with an extra check before sensitive actions.",
  },
  {
    version: "v3.1.0",
    icon: "🛡️",
    title: "Privacy Blur Shield & Manager",
    desc: "Automatically blurs passwords, card numbers and one-time codes, and hides the whole page when you switch windows. Pro adds custom blur strength, per-site rules, and a trusted-sites list.",
  },
  {
    version: "v3.0.0",
    icon: "📊",
    title: "Weekly Privacy Reports",
    desc: "A private, offline dashboard showing your locks, blocked snooping attempts, and a simple security score. Nothing is ever uploaded.",
  },
  {
    version: "v3.0.0",
    icon: "📸",
    title: "Startup Lock & Webcam Alerts",
    desc: "Re-locks your tabs when the browser reopens, and can quietly take a webcam photo of anyone who fails your password too many times — saved locally, only for you.",
  },
  {
    version: "v2.5.0",
    icon: "🕵️",
    title: "Stealth Mode",
    desc: "Makes Locksy invisible: the badge disappears and locked tabs look like an ordinary “this site can’t be reached” error. Toggle it with Alt+Shift+7 or the right-click menu.",
  },
  {
    version: "v2.5.0",
    icon: "🖱️",
    title: "Right-Click Menus & Themes",
    desc: "Lock a tab, a whole site, or every tab straight from the right-click menu — no popup needed. Plus a built-in light/dark theme switch.",
  },
  {
    version: "v2.2.0",
    icon: "⏱️",
    title: "Auto-Lock & Scheduled Locking",
    desc: "Locks your tabs automatically after you step away, or on a schedule you set by day and time (even overnight). Smart enough not to interrupt a video you're watching.",
  },
]

export default function WhatsNew() {
  return (
    <section
      id="whats-new"
      className="py-20 md:py-28 bg-gradient-to-b from-background via-accent/20 to-background relative overflow-hidden"
    >
      {/* Soft background glow to match the rest of the page */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-primary/6 dark:bg-primary/12 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/5 w-72 h-72 bg-secondary/6 dark:bg-secondary/12 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
            <span aria-hidden="true">✨</span>
            Always improving
          </div>
          <h2 className="section-title">Recently Added to Locksy</h2>
          <p className="section-subtitle">
            Locksy keeps getting better. Here are the newest ways it helps keep your tabs private —
            all included in the free version unless noted as Pro.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.map((item) => (
            <div
              key={item.title}
              className="relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/10 flex items-center justify-center text-2xl">
                  <span aria-hidden="true">{item.icon}</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                  {item.version}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
