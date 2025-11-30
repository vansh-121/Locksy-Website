export default function DomainLock() {
  const domainFeatures = [
    {
      icon: "🔒",
      title: "Lock Entire Domains",
      desc: "Lock all tabs matching a domain pattern like *.google.com or github.com with one action",
    },
    {
      icon: "🔄",
      title: "Persistent Protection",
      desc: "Domain locks persist across browser restarts and sessions—set it once, protected forever",
    },
    {
      icon: "🆕",
      title: "Auto-Lock New Tabs",
      desc: "New tabs matching locked domain patterns are automatically protected the moment they open",
    },
    {
      icon: "⚙️",
      title: "Unlock Preferences",
      desc: "Choose to unlock only the current tab or all tabs for a domain. Locksy remembers your choice",
    },
    {
      icon: "🎯",
      title: "Wildcard Support",
      desc: "Use *.example.com to lock all subdomains or example.com for exact domain matching",
    },
    {
      icon: "🛡️",
      title: "Domain Manager",
      desc: "Dedicated interface to view, manage, and configure all your locked domains in one place",
    },
  ]

  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm font-bold mb-6 shadow-lg animate-pulse">
            <span>🆕</span>
            NEW FEATURE
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Introducing Domain Lock
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Lock entire domains at once with intelligent patterns. The most powerful way to protect multiple tabs automatically.
          </p>
        </div>

        {/* Main demo visual */}
        <div className="mb-20 max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-2xl border-2 border-primary/20 p-8 md:p-12">
            {/* Browser-like window */}
            <div className="space-y-4">
              {/* Address bar example */}
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 border-2 border-primary/30">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 bg-white dark:bg-gray-800 rounded-md px-4 py-2 text-sm font-mono text-primary font-semibold">
                    *.google.com
                  </div>
                  <div className="text-2xl">🔒</div>
                </div>
              </div>
              
              {/* Locked tabs visualization */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { domain: "mail.google.com", title: "Gmail" },
                  { domain: "drive.google.com", title: "Google Drive" },
                  { domain: "docs.google.com", title: "Google Docs" },
                  { domain: "calendar.google.com", title: "Calendar" },
                ].map((tab, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-green-500/50 shadow-md">
                    <div className="text-2xl">🔒</div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{tab.title}</div>
                      <div className="text-xs text-muted-foreground font-mono">{tab.domain}</div>
                    </div>
                    <div className="text-green-500 font-bold text-sm">LOCKED</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-xl font-bold text-sm rotate-6">
              ✓ All Protected
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {domainFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}
