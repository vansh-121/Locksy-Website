export default function Comparison() {
  const deviceLimitations = [
    ["All-or-nothing protection", "You must lock the entire system to hide one tab"],
    ["No protection while working", "When logged in, every tab is visible to anyone nearby"],
    ["Stops active work", "Can interrupt screen sharing, downloads, music, and other processes"],
    ["Slower for quick privacy", "Typically takes 5–10 seconds to lock or unlock"],
    ["Can't work and protect selectively", "Everything is accessible or the whole device is locked"],
    ["Too much for short breaks", "Overkill when you only need privacy for a brief moment"],
  ]
  const locksyAdvantages = [
    ["Protect individual tabs", "Lock sensitive tabs while continuing to work on others"],
    ["Works while you're logged in", "Keep sensitive tabs hidden from shoulder surfing"],
    ["Keeps workflows running", "Screen sharing, downloads, and music can continue"],
    ["Instant 1-click protection", "Hide a sensitive tab in about a second"],
    ["Choose what stays private", "Lock banking while keeping Gmail and YouTube accessible"],
    ["Great for quick privacy", "Protect tabs when someone walks by or you step away"],
  ]
  const rows = [
    ["Auto-blur sensitive information", true, false, false],
    ["Lock individual tabs", true, false, false],
    ["Automatically lock websites", true, false, false],
    ["Lock restored tabs on startup", true, false, false],
    ["Hide locked tabs with Stealth Mode", true, false, false],
    ["Capture failed intruder attempts", true, false, false],
    ["Custom lock-screen messages", true, false, false],
    ["Weekly privacy reports", true, false, false],
    ["Biometric unlock", true, false, false],
    ["Strong password hashing (PBKDF2)", true, false, false],
  ]
  const Mark = ({ yes }: { yes: boolean }) => <span aria-label={yes ? "Yes" : "No"} className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${yes ? "bg-green-500/20 text-green-600" : "bg-red-500/20 text-red-600"} font-bold`}>{yes ? "✓" : "×"}</span>

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-accent/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"><div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/8 dark:bg-primary/15 rounded-full blur-3xl animate-pulse" /><div className="absolute bottom-1/3 left-1/5 w-80 h-80 bg-secondary/8 dark:bg-secondary/15 rounded-full blur-3xl animate-pulse delay-1000" /></div>
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="section-title">Why Choose Locksy?</h2>
        <p className="section-subtitle">Protect the tabs that matter without locking down your entire computer.</p>
        <div className="mb-20 md:mb-28 max-w-6xl mx-auto">
          <div className="text-center mb-12"><h3 className="text-3xl md:text-4xl font-bold mb-4">Locksy vs Device Lock</h3><p className="text-muted-foreground text-lg max-w-3xl mx-auto">Windows Lock, macOS Lock, and similar device locks protect the whole system. Locksy gives you selective protection exactly where you need it.</p></div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative bg-background/80 backdrop-blur-sm border-2 border-red-200/50 dark:border-red-900/50 rounded-2xl p-8 shadow-xl"><div className="flex items-center gap-3 mb-6"><div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center text-2xl">❌</div><h4 className="text-xl md:text-2xl font-bold">Device Lock Limitations</h4></div><ul className="space-y-4">{deviceLimitations.map(([title, desc], idx) => <li key={idx} className="flex items-start gap-3"><span className="text-red-500 font-bold mt-1 text-lg">×</span><div><strong className="text-foreground block">{title}</strong><span className="text-sm text-muted-foreground">{desc}</span></div></li>)}</ul></div>
            <div className="relative bg-background/80 backdrop-blur-sm border-2 border-green-200/50 dark:border-green-900/50 rounded-2xl p-8 shadow-xl"><div className="flex items-center gap-3 mb-6"><div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-2xl">✅</div><h4 className="text-xl md:text-2xl font-bold">What Locksy Adds</h4></div><ul className="space-y-4">{locksyAdvantages.map(([title, desc], idx) => <li key={idx} className="flex items-start gap-3"><span className="text-green-600 font-bold mt-1 text-lg">✓</span><div><strong className="text-foreground block">{title}</strong><span className="text-sm text-muted-foreground">{desc}</span></div></li>)}</ul></div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto"><div className="text-center mb-12"><div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-sm font-medium backdrop-blur-sm mb-6"><span>⚡</span>Feature Comparison</div><h3 className="text-3xl md:text-4xl font-bold mb-4">Locksy vs Other Browser Solutions</h3></div><div className="relative bg-background/80 backdrop-blur-sm border-2 border-primary/10 rounded-2xl p-6 md:p-8 shadow-xl overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm md:text-base"><thead><tr className="border-b-2 border-primary/20"><th className="text-left py-5 px-4 md:px-6 font-bold text-lg">Feature</th><th className="text-center py-5 px-4 md:px-6 font-bold text-lg"><div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-lg">🔐 Locksy</div></th><th className="text-center py-5 px-4 md:px-6 font-bold text-muted-foreground">Browser<br />Profiles</th><th className="text-center py-5 px-4 md:px-6 font-bold text-muted-foreground">Tab<br />Managers</th></tr></thead><tbody>{rows.map(([label, locksy, profiles, managers], idx) => <tr key={idx} className="border-b border-border/50 hover:bg-accent/30 transition-colors"><td className="py-4 px-4 md:px-6 font-medium">{label}</td><td className="py-4 px-4 md:px-6 text-center"><Mark yes={Boolean(locksy)} /></td><td className="py-4 px-4 md:px-6 text-center"><Mark yes={Boolean(profiles)} /></td><td className="py-4 px-4 md:px-6 text-center"><Mark yes={Boolean(managers)} /></td></tr>)}</tbody></table></div></div></div>
      </div>
    </section>
  )
}
