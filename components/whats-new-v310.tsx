"use client"

import { useState } from "react"
import { Sparkles, EyeOff, SlidersHorizontal, Check } from "lucide-react"

interface FeatureItem {
  id: string
  badge: string
  title: string
  tagline: string
  description: string
  icon: React.ReactNode
  highlights: string[]
}

const V310_FEATURES: FeatureItem[] = [
  {
    id: "privacy-blur",
    badge: "v3.1.0 New Feature",
    title: "Privacy Blur Shield",
    tagline: "Dynamic page masking & automatic focus-loss blur",
    description: "Keep confidential data hidden from shoulder-surfers. Privacy Blur Shield automatically detects and blurs sensitive text (passwords, credit cards, OTPs, emails, phone numbers) on web pages, plus instantly blurs the active page when you switch windows or step away.",
    icon: <EyeOff className="w-5 h-5" />,
    highlights: [
      "Auto-mask passwords, credit cards & sensitive fields",
      "Full-page blur overlay on window focus loss or lock",
      "Instant dismissal on user return with zero lag",
      "Runs 100% offline & client-side on your device"
    ]
  },
  {
    id: "blur-manager",
    badge: "v3.1.0 Pro Exclusive",
    title: "Privacy Blur Manager",
    tagline: "Custom blur rules, site categories & whitelists",
    description: "Take total control of page privacy. Choose your preferred blur intensity (Light, Medium, High, Solid), toggle specific targets, auto-blur entire site categories (Banking, Webmail, Password Managers), or whitelist trusted domains.",
    icon: <SlidersHorizontal className="w-5 h-5" />,
    highlights: [
      "4 Custom blur levels (Light to Solid)",
      "Auto-blur rules for Banking & Password Managers",
      "Custom domain whitelisting & exclusions",
      "Right-click context menu shortcuts"
    ]
  }
]

export default function WhatsNewV310() {
  const [activeTab, setActiveTab] = useState<string>("privacy-blur")
  const activeFeature = V310_FEATURES.find(f => f.id === activeTab) || V310_FEATURES[0]

  return (
    <section id="whats-new-v310" className="py-20 md:py-32 bg-gradient-to-b from-background via-indigo-500/5 to-background border-y border-border/40 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>NEW IN VERSION 3.1.0</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Privacy Blur <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 dark:from-indigo-400 dark:via-purple-400 dark:to-emerald-400 bg-clip-text text-transparent">Shield & Manager</span>
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Real-time sensitive data masking, automatic focus-loss page blurring, and custom category privacy controls.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5 mb-10">
          {V310_FEATURES.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 border cursor-pointer ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/25 scale-[1.02]"
                  : "bg-card/80 text-muted-foreground border-border/60 hover:border-indigo-500/40 hover:text-foreground hover:bg-card"
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
              <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
                {activeFeature.badge}
              </span>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
                  {activeFeature.title}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm sm:text-base">
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
                    <div className="w-5 h-5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Live Mock UI Preview */}
            <div className="lg:col-span-6">
              <div className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-inner">
                
                {/* Mock Privacy Blur View */}
                {activeTab === "privacy-blur" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <EyeOff className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-slate-900 dark:text-white font-bold text-sm">Privacy Shield Live Preview</span>
                      </div>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold">Shield Active</span>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-sm">
                      <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold">Sensitive Card / Password Field</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">Auto-Masked</span>
                      </div>
                      <div className="p-3 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-400 text-sm font-mono blur-sm hover:blur-none transition-all cursor-pointer select-none">
                        •••• •••• •••• 4920 (CVV 891)
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-xs text-indigo-900 dark:text-indigo-300 leading-relaxed font-medium">
                      💡 <strong>Alt-Tab Focus Protection:</strong> Switching windows or walking away instantly triggers a full-screen Privacy Shield overlay until you click to return.
                    </div>
                  </div>
                )}

                {/* Mock Blur Manager View */}
                {activeTab === "blur-manager" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <span className="text-slate-900 dark:text-white font-bold text-sm">Blur Settings Manager</span>
                      </div>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/30 font-bold">PRO Feature</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {["Light (4px)", "Medium (8px)", "High (12px)", "Solid Black"].map((lvl, idx) => (
                        <div key={idx} className={`p-2.5 rounded-lg border text-center font-bold transition-all ${idx === 1 ? 'bg-indigo-600 border-indigo-500 text-white shadow-md' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'}`}>
                          {lvl}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 pt-1 text-xs">
                      <div className="flex justify-between items-center p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Auto-Blur Banking Domains</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">ON</span>
                      </div>
                      <div className="flex justify-between items-center p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Auto-Blur Webmail & Passwords</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">ON</span>
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
