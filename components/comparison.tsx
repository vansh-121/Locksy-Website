export default function Comparison() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-accent/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="section-title">Why Choose Locksy?</h2>
        <p className="section-subtitle">The only extension designed specifically for tab protection.</p>

        {/* Locksy vs OS/Device Lock Comparison */}
        <div className="mb-20 md:mb-32">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium backdrop-blur-sm mb-6">
                <span className="text-2xl">🔐</span>
                <span>The Core Difference</span>
              </div> */}
              <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent">
                Locksy vs Device Lock
              </h3>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Device locks (Windows Lock, macOS Lock, etc.) protect your entire system, but <strong>Locksy gives you instant, selective protection</strong> exactly where you need it.
              </p>
            </div>

            {/* Two Column Comparison */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Device Lock Limitations */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-background/80 backdrop-blur-sm border-2 border-red-200/50 dark:border-red-900/50 rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div aria-hidden="true" className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center text-2xl">
                      ❌
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold">Device Lock Limitations</h4>
                  </div>
                  <ul className="space-y-4">
                    {[
                      { title: "All-or-nothing approach", desc: "Must lock ENTIRE system to hide ONE tab" },
                      { title: "No protection while working", desc: "When logged in, all tabs are visible to anyone nearby" },
                      { title: "Kills active workflows", desc: "Stops screen sharing, downloads, music, and all processes" },
                      { title: "Too slow for quick privacy", desc: "5-10 seconds to lock/unlock vs instant tab protection" },
                      { title: "Can't work & protect simultaneously", desc: "Either everything is accessible or nothing is" },
                      { title: "Inconvenient for brief moments", desc: "Overkill to lock device for 30-second coffee breaks" },
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 group/item">
                        <span className="text-red-500 font-bold mt-1 text-lg">×</span>
                        <div>
                          <strong className="text-foreground block">{item.title}</strong>
                          <span className="text-sm text-muted-foreground">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Locksy Advantages */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-background/80 backdrop-blur-sm border-2 border-green-200/50 dark:border-green-900/50 rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-2xl">
                      ✅
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold">Locksy Solutions</h4>
                  </div>
                  <ul className="space-y-4">
                    {[
                      { title: "Tab-level protection", desc: "Lock sensitive tabs while actively working on others" },
                      { title: "Works while logged in", desc: "Protect tabs from shoulder surfing even when using your PC" },
                      { title: "Zero workflow disruption", desc: "Keep working, screen sharing, downloads all continue" },
                      { title: "Instant 1-click protection", desc: "Hide sensitive tabs in 1 second, not 10" },
                      { title: "Selective access control", desc: "Lock banking tab, keep Gmail and YouTube accessible" },
                      { title: "Perfect for quick privacy", desc: "Ideal for brief moments away or someone walking by" },
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 group/item">
                        <span className="text-green-600 font-bold mt-1 text-lg">✓</span>
                        <div>
                          <strong className="text-foreground block">{item.title}</strong>
                          <span className="text-sm text-muted-foreground">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Real-World Scenarios */}
            {/* <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-background/80 backdrop-blur-sm border-2 border-primary/20 rounded-2xl p-8 md:p-10 shadow-xl">
                <div className="flex items-center gap-3 mb-8 justify-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg">
                    💡
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-center">Real-World Scenarios</h4>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: "�", title: "Shoulder surfing", desc: "Someone walking by your desk can't peek at locked tabs" },
                    { icon: "🖥️", title: "Screen sharing", desc: "Share your screen during meetings without exposing private tabs" },
                    { icon: "☕", title: "Quick breaks", desc: "Lock tabs in 1 second for coffee runs, no need to lock entire PC" },
                    { icon: "👨‍👩‍👧", title: "Shared computers", desc: "Family/roommate using PC can't access your locked tabs" },
                    { icon: "💼", title: "Open office", desc: "Work with confidence knowing sensitive tabs are protected" },
                    { icon: "📹", title: "Live demos", desc: "Present or record tutorials while keeping research tabs locked" },
                  ].map((scenario, idx) => (
                    <div key={idx} className="group/card relative">
                      <div className="feature-card h-full hover:border-primary/40 transition-all">
                        <div className="text-4xl mb-3">{scenario.icon}</div>
                        <h5 className="font-bold text-lg mb-2">{scenario.title}</h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">{scenario.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Comparison with Other Extensions */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-sm font-medium backdrop-blur-sm mb-6">
              <span>⚡</span>
              <span>Feature Comparison</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Locksy vs Other Browser Solutions
            </h3>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl blur-xl" />
            <div className="relative bg-background/80 backdrop-blur-sm border-2 border-primary/10 rounded-2xl p-6 md:p-8 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base">
                  <thead>
                    <tr className="border-b-2 border-primary/20">
                      <th className="text-left py-5 px-4 md:px-6 font-bold text-lg">Feature</th>
                      <th className="text-center py-5 px-4 md:px-6 font-bold text-lg">
                        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-lg">
                          <span>🔐</span>
                          <span>Locksy</span>
                        </div>
                      </th>
                      <th className="text-center py-5 px-4 md:px-6 font-bold text-muted-foreground">Browser<br />Profiles</th>
                      <th className="text-center py-5 px-4 md:px-6 font-bold text-muted-foreground">Tab<br />Managers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Lock Individual Tabs", true, false, false],
                      ["Domain-Wide Lock (Wildcard)", true, false, false],
                      ["Keyboard Shortcuts", true, false, false],
                      // ["Visual Lock Indicators", true, false, false],
                      // ["One-Click Operation", true, false, false],
                      // ["Smart Unlock Preferences", true, false, false],
                      ["PBKDF2 Encryption", true, false, false],
                      ["Brute-Force Protection", true, false, false],
                      ["8+ Security Layers", true, false, false],
                      ["No Account Required", true, true, false],
                      ["100% Offline", true, true, false],
                      ["Incognito Support", true, true, false],
                      // ["Ultra Lightweight", true, false, false],
                      ["Free Forever", true, true, false],
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                        <td className="py-4 px-4 md:px-6 font-medium">{row[0]}</td>
                        <td className="py-4 px-4 md:px-6 text-center">
                          {row[1] ? (
                            <span aria-label="Yes" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-600 font-bold">✓</span>
                          ) : (
                            <span aria-label="No" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 text-red-600 font-bold">×</span>
                          )}
                        </td>
                        <td className="py-4 px-4 md:px-6 text-center">
                          {row[2] ? (
                            <span aria-label="Yes" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-600 font-bold">✓</span>
                          ) : (
                            <span aria-label="No" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 text-red-600 font-bold">×</span>
                          )}
                        </td>
                        <td className="py-4 px-4 md:px-6 text-center">
                          {row[3] ? (
                            <span aria-label="Yes" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-600 font-bold">✓</span>
                          ) : (
                            <span aria-label="No" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 text-red-600 font-bold">×</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
