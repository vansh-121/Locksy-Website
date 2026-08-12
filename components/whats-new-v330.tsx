"use client"

import { useState } from "react"
import { Sparkles, Key, Clock, ShieldCheck, Download, Check, Lock } from "lucide-react"

interface FeatureItem {
  id: string
  badge: string
  title: string
  tagline: string
  description: string
  icon: React.ReactNode
  highlights: string[]
}

const V330_FEATURES: FeatureItem[] = [
  {
    id: "recovery-key",
    badge: "v3.3.0 Major Feature",
    title: "Master Recovery Key",
    tagline: "16-character emergency account recovery & offline export",
    description: "Never worry about locked account lockout again. Locksy automatically generates a 16-character emergency recovery key (LOCKSY-XXXX-XXXX-XXXX) protected by PBKDF2-SHA256 cryptographic hashing. Easily copy it or save it as a local text file for safe offline vault backup.",
    icon: <Key className="w-5 h-5" />,
    highlights: [
      "Emergency 16-character recovery key (LOCKSY-XXXX-XXXX-XXXX)",
      "PBKDF2-SHA256 hashed verification — stored 100% offline",
      "1-Click clipboard copy & text file download (locksy-recovery-key.txt)",
      "Interactive 'Forgot Password?' account reset modal in popup"
    ]
  },
  {
    id: "smart-sessions",
    badge: "v3.3.0 Pro Feature",
    title: "Smart Sessions & Re-Auth",
    tagline: "Bounded session timing & sensitive action prompts",
    description: "Stay signed in between popup opens instead of retyping your master password, while critical operations (unlocking tabs, removing domain locks, toggling stealth mode) still ask for password or biometric re-authentication. Choose your preferred window from Strict to 60 minutes.",
    icon: <Clock className="w-5 h-5" />,
    highlights: [
      "Configurable session timeout window (Strict, 2m, 5m, 10m default, custom up to 60m)",
      "Sensitive action re-auth for unlocking tabs & changing security rules",
      "Native biometric (Touch ID, Face ID, Windows Hello) re-auth support",
      "Strict Mode (0 min) for instant session expiration on popup close"
    ]
  }
]

export default function WhatsNewV330() {
  const [activeTab, setActiveTab] = useState<string>("recovery-key")
  const activeFeature = V330_FEATURES.find(f => f.id === activeTab) || V330_FEATURES[0]

  return (
    <section id="whats-new-v330" className="py-20 md:py-32 bg-gradient-to-b from-background via-violet-500/5 to-background border-y border-border/40 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 dark:bg-violet-500/20 border border-violet-500/30 text-violet-600 dark:text-violet-400 text-sm font-semibold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-violet-500" />
            <span>NEW IN VERSION 3.3.0</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Master Recovery Key <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 dark:from-violet-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">&amp; Smart Sessions</span>
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Emergency password recovery keys, offline vault backups, and bounded session re-authentication timing.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5 mb-10">
          {V330_FEATURES.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 border cursor-pointer ${activeTab === tab.id
                ? "bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-500/25 scale-[1.02]"
                : "bg-card/80 text-muted-foreground border-border/60 hover:border-violet-500/40 hover:text-foreground hover:bg-card"
                }`}
            >
              {tab.icon}
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Display Card */}
        <div className="bg-card/90 dark:bg-slate-900/90 border border-border/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Descriptions */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block px-3.5 py-1 rounded-full bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300 text-xs font-bold uppercase tracking-wider border border-violet-500/30">
                {activeFeature.badge}
              </span>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
                  {activeFeature.title}
                </h3>
                <p className="text-violet-600 dark:text-violet-400 font-semibold text-sm sm:text-base">
                  {activeFeature.tagline}
                </p>
              </div>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {activeFeature.description}
              </p>

              {/* Highlights Checklist */}
              <div className="space-y-3 pt-2">
                {activeFeature.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 text-foreground text-sm font-medium">
                    <div className="w-5 h-5 rounded-full bg-violet-500/10 dark:bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Live Mock UI Preview */}
            <div className="lg:col-span-6">
              <div className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-inner">

                {/* Mock Recovery Key View */}
                {activeTab === "recovery-key" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Key className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                        <span className="text-slate-900 dark:text-white font-bold text-sm">Emergency Recovery Key</span>
                      </div>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold">100% Offline</span>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
                      <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold">Master Recovery Code</span>
                        <span className="text-violet-600 dark:text-violet-400 font-bold">PBKDF2 Hashed</span>
                      </div>
                      <div className="p-3 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-violet-600 dark:text-violet-400 font-mono text-center font-bold tracking-widest text-sm select-all">
                        LOCKSY-7K9P-M4W2-8X1Q
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 text-xs">
                        <button className="flex-1 py-2 px-3 rounded-lg bg-violet-600 text-white font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:bg-violet-700 transition-colors">
                          <Key className="w-3.5 h-3.5" /> Copy Key
                        </button>
                        <button className="flex-1 py-2 px-3 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold flex items-center justify-center gap-1.5 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                          <Download className="w-3.5 h-3.5" /> Download .txt
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-violet-500/10 dark:bg-violet-500/15 border border-violet-500/20 text-xs text-violet-900 dark:text-violet-300 leading-relaxed font-medium">
                      💡 <strong>Forgot Password?</strong> Click &quot;Forgot Password?&quot; on the unlock screen to enter your recovery key and safely initiate an emergency account reset.
                    </div>
                  </div>
                )}

                {/* Mock Smart Sessions View */}
                {activeTab === "smart-sessions" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-slate-900 dark:text-white font-bold text-sm">Re-Authentication Timing</span>
                      </div>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/30 font-bold">PRO Feature</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      {["Strict (0m)", "2 Minutes", "5 Minutes", "10m (Default)", "15 Minutes", "Custom (60m)"].map((tm, idx) => (
                        <div key={idx} className={`p-2.5 rounded-lg border text-center font-bold transition-all ${idx === 3 ? 'bg-violet-600 border-violet-500 text-white shadow-md' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}>
                          {tm}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 pt-1 text-xs">
                      <div className="flex justify-between items-center p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <Lock className="w-3.5 h-3.5 text-violet-500" />
                          <span className="font-semibold text-slate-700 dark:text-slate-300">Sensitive Actions Re-Auth</span>
                        </div>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">ALWAYS ENFORCED</span>
                      </div>
                      <div className="flex justify-between items-center p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-violet-500" />
                          <span className="font-semibold text-slate-700 dark:text-slate-300">Biometric Re-Auth Prompt</span>
                        </div>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">ENABLED</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
