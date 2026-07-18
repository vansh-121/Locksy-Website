"use client"

import { useState, useEffect } from "react"
import { Sparkles, Layout, ShieldCheck, Rocket, Camera, Lock, Shield, Clock, Settings, EyeOff, CheckCircle2, AlertTriangle, MonitorPlay } from "lucide-react"

interface TabFeature {
  id: string
  badge: string
  title: string
  tagline: string
  description: string
  icon: React.ReactNode
}

const V300_FEATURES: TabFeature[] = [
  {
    id: "ui-redesign",
    badge: "v3.0.0 Redesign",
    title: "Sleek Tabbed App Shell",
    tagline: "Fluid glassmorphism dashboard in your browser",
    description: "Enjoy a complete visual overhaul. Locksy now features structured tab navigation, glowing card frames, smooth layout transitions, and fluid hover states that keep your settings organized without clutter.",
    icon: <Layout className="w-6 h-6" />
  },
  {
    id: "privacy-reports",
    badge: "v3.0.0 Pro Exclusive",
    title: "Weekly Privacy Reports",
    tagline: "Track security score, blocked snoopers & locks history",
    description: "Access a detailed, offline analytics dashboard. Evaluates your local password strength, traces tab security logs, calculates a Security Health Score, and charts locked/unlocked events over the last 7 days.",
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    id: "startup-lock",
    badge: "v2.7.0 Pro Exclusive",
    title: "Startup Session Lock",
    tagline: "Lock restored tabs instantly on browser launch",
    description: "All tabs from your previous session lock immediately when you launch your browser, with a 15-second catch-up gate for delayed pages. Stops snoopers from accessing open session restorations.",
    icon: <Rocket className="w-6 h-6" />
  },
  {
    id: "intruder-capture",
    badge: "v2.6.0 Pro Exclusive",
    title: "Webcam Intruder Detection",
    tagline: "Capture local-only webcam photos on failed unlock attempts",
    description: "Locksy automatically logs and captures webcam snaps on the 3rd failed password entry onwards. Includes a dedicated offline Intruder Log viewer. 100% local storage.",
    icon: <Camera className="w-6 h-6" />
  }
]

export default function WhatsNewV300() {
  const [activeTab, setActiveTab] = useState<string>("ui-redesign")
  const [mockActiveNav, setMockActiveNav] = useState<string>("lock")
  const [showFlash, setShowFlash] = useState<boolean>(false)

  // Auto-switch tabs to show dynamic features if user is idle
  useEffect(() => {
    const timer = setInterval(() => {
      // Auto cycle tabs if needed, left manual for now
    }, 10000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="whats-new-v300"
      className="py-24 md:py-32 relative overflow-hidden bg-background"
    >
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-violet-600/10 to-fuchsia-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-600/10 to-blue-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
        
        {/* Modern Dot Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* ── Section Header ──────────────────────────────────────── */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600/10 via-fuchsia-600/10 to-cyan-600/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 rounded-full text-sm font-bold mb-8 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
            <Sparkles className="w-4 h-4" />
            WHAT'S NEW IN LOCKSY v3.0.0
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-foreground">
            Next-Gen Security & Design.<br />
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              Uncompromising Privacy.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the new sleek dashboard visual shell, secure Weekly Privacy Reports, Startup Session guarding, and automated webcam intruder alerts.
          </p>
        </div>

        {/* ── Main Content Area ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: Feature Tabs Selector */}
          <div className="lg:col-span-5 space-y-4">
            {V300_FEATURES.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`w-full text-left p-6 rounded-3xl border transition-all duration-500 relative overflow-hidden group outline-none ${
                  activeTab === feature.id
                    ? "bg-card border-violet-500/30 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(139,92,246,0.1)] translate-x-2"
                    : "bg-card/30 border-border/40 hover:bg-card/60 hover:border-border hover:translate-x-1"
                }`}
              >
                {/* Selection indicator line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 ${
                  activeTab === feature.id ? "bg-gradient-to-b from-violet-500 to-fuchsia-500" : "bg-transparent group-hover:bg-border"
                }`} />

                <div className="flex gap-5 items-start relative z-10 ml-2">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    activeTab === feature.id
                      ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25 scale-110"
                      : "bg-muted text-muted-foreground group-hover:scale-105 group-hover:bg-muted/80"
                  }`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3 transition-colors duration-300 ${
                      activeTab === feature.id
                        ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {feature.badge}
                    </span>
                    <h3 className={`font-bold text-lg md:text-xl mb-2 transition-colors duration-300 ${
                      activeTab === feature.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-all duration-300 ${
                      activeTab === feature.id ? "text-muted-foreground" : "text-muted-foreground/70 line-clamp-2"
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* RIGHT: Dynamic Premium Mockup Display */}
          <div className="lg:col-span-7 relative flex justify-center perspective-[2000px]">
            <div className="relative w-full max-w-2xl transform transition-transform duration-700 hover:rotate-y-[-2deg] hover:rotate-x-[2deg]">
              
              {/* Massive Glow Behind Mockup */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 rounded-[2.5rem] blur-3xl" />
              
              {/* Premium Mac-like Browser Shell */}
              <div className="relative bg-[#f8f9fa] dark:bg-[#0c0c0e] rounded-[2rem] border border-[#e5e7eb] dark:border-[#27272a] shadow-2xl overflow-hidden min-h-[540px] flex flex-col z-10">
                
                {/* Browser Header Bar */}
                <div className="flex items-center px-4 py-3 bg-white/50 dark:bg-black/50 backdrop-blur-md border-b border-[#e5e7eb] dark:border-[#27272a]">
                  <div className="flex gap-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                  </div>
                  <div className="flex-1 bg-black/5 dark:bg-white/5 rounded-lg px-4 py-1.5 text-xs text-muted-foreground font-medium flex items-center justify-center gap-2 border border-black/5 dark:border-white/5">
                    <Lock className="w-3 h-3 text-emerald-500" />
                    <span>{activeTab === "startup-lock" ? "chrome://newtab" : "my-private-account.com/banking"}</span>
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
                      <Lock className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Mockup Display Body */}
                <div className="flex-1 relative bg-gradient-to-b from-transparent to-muted/20">
                  
                  {/* FEATURE 1: UI REDESIGN MOCKUP */}
                  {activeTab === "ui-redesign" && (
                    <div className="absolute inset-0 p-8 flex flex-col animate-in fade-in zoom-in-95 duration-500">
                      
                      {/* Extension Header */}
                      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/50">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg">
                            <Lock className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-black text-lg text-foreground tracking-tight">Locksy Premium</h4>
                            <p className="text-xs text-muted-foreground font-medium">Version 3.0.0 • Lifetime Pro</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Protected
                        </div>
                      </div>

                      {/* Tab Navigation */}
                      <div className="bg-card border border-border/50 p-1.5 rounded-2xl flex gap-1 mb-6 shadow-sm">
                        {[
                          { id: "lock", icon: <Lock className="w-4 h-4" />, label: "Lock" },
                          { id: "security", icon: <Shield className="w-4 h-4" />, label: "Security" },
                          { id: "timers", icon: <Clock className="w-4 h-4" />, label: "Timers" },
                          { id: "more", icon: <Settings className="w-4 h-4" />, label: "More" }
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setMockActiveNav(tab.id)}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                              mockActiveNav === tab.id
                                ? "bg-muted text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            }`}
                          >
                            {tab.icon}
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      {/* Tab Content Area */}
                      <div className="flex-1 bg-card/50 border border-border/50 rounded-2xl p-4 shadow-inner relative overflow-hidden">
                        
                        {mockActiveNav === "lock" && (
                          <div className="space-y-3 animate-in slide-in-from-right-4 fade-in duration-300">
                            <div className="group flex items-center justify-between p-4 bg-background border border-border/50 rounded-xl hover:border-violet-500/30 transition-all cursor-pointer shadow-sm hover:shadow-md">
                              <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-lg group-hover:bg-violet-500 group-hover:text-white transition-colors">
                                  <Lock className="w-5 h-5" />
                                </div>
                                <div>
                                  <h5 className="font-bold text-sm text-foreground">Lock Current Tab</h5>
                                  <p className="text-xs text-muted-foreground mt-0.5">Alt+Shift+9 shortcut</p>
                                </div>
                              </div>
                              <div className="w-10 h-6 bg-violet-500 rounded-full relative flex items-center px-1 shadow-inner">
                                <div className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm" />
                              </div>
                            </div>
                            
                            <div className="group flex items-center justify-between p-4 bg-background border border-border/50 rounded-xl hover:border-violet-500/30 transition-all cursor-pointer shadow-sm hover:shadow-md">
                              <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 rounded-lg group-hover:bg-fuchsia-500 group-hover:text-white transition-colors">
                                  <Layout className="w-5 h-5" />
                                </div>
                                <div>
                                  <h5 className="font-bold text-sm text-foreground">Domain Manager</h5>
                                  <p className="text-xs text-muted-foreground mt-0.5">Auto-lock wildcard domains</p>
                                </div>
                              </div>
                              <span className="px-2 py-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[9px] font-black uppercase tracking-wider rounded">Pro</span>
                            </div>
                          </div>
                        )}

                        {mockActiveNav === "security" && (
                          <div className="space-y-3 animate-in slide-in-from-right-4 fade-in duration-300">
                            <div className="p-4 bg-background border border-border/50 rounded-xl flex items-center justify-between">
                              <span className="text-sm font-semibold text-foreground">Biometric Unlock</span>
                              <span className="text-xs font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">Enabled</span>
                            </div>
                            <div className="p-4 bg-background border border-border/50 rounded-xl flex items-center justify-between">
                              <span className="text-sm font-semibold text-foreground">PBKDF2 Iterations</span>
                              <span className="text-xs font-mono font-bold text-muted-foreground bg-muted px-2 py-1 rounded">600,000</span>
                            </div>
                          </div>
                        )}
                        
                        {mockActiveNav === "timers" && (
                          <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300 p-2">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Inactivity Auto-Lock</p>
                            <div className="grid grid-cols-3 gap-3">
                              {["5 Mins", "15 Mins", "Custom"].map((t, idx) => (
                                <div key={idx} className={`p-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                                  idx === 2 ? "border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400 ring-2 ring-violet-500/20" : "border-border bg-background text-muted-foreground hover:border-foreground/30"
                                }`}>
                                  {t}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {mockActiveNav === "more" && (
                          <div className="space-y-3 animate-in slide-in-from-right-4 fade-in duration-300">
                             <div className="flex items-center justify-between p-4 bg-background border border-border/50 rounded-xl">
                              <div className="flex items-center gap-3">
                                <EyeOff className="w-5 h-5 text-muted-foreground" />
                                <span className="text-sm font-semibold text-foreground">Stealth Mode</span>
                              </div>
                              <div className="w-10 h-6 bg-muted rounded-full relative flex items-center px-1 border border-border">
                                <div className="w-4 h-4 bg-background rounded-full absolute left-1 shadow-sm border border-border/50" />
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-background border border-border/50 rounded-xl">
                              <div className="flex items-center gap-3">
                                <Rocket className="w-5 h-5 text-muted-foreground" />
                                <span className="text-sm font-semibold text-foreground">Startup Lock</span>
                              </div>
                              <div className="w-10 h-6 bg-violet-500 rounded-full relative flex items-center px-1 shadow-inner">
                                <div className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm" />
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  )}

                  {/* FEATURE 2: PRIVACY REPORTS MOCKUP */}
                  {activeTab === "privacy-reports" && (
                    <div className="absolute inset-0 p-8 flex flex-col animate-in fade-in zoom-in-95 duration-500">
                      
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h4 className="font-black text-xl text-foreground">Privacy Report</h4>
                          <p className="text-sm text-muted-foreground font-medium mt-1">Past 7 Days Overview</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Health Score</span>
                          <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                            <ShieldCheck className="w-5 h-5 text-emerald-500" />
                            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">98</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-card border border-border/60 p-5 rounded-2xl shadow-sm">
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                            Blocked Attempts
                          </span>
                          <span className="text-3xl font-black text-foreground block mb-2">12</span>
                          <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Secure
                          </span>
                        </div>
                        <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 p-5 rounded-2xl shadow-md text-white">
                          <span className="text-xs font-bold text-white/80 uppercase tracking-wider block mb-2">
                            Hours Protected
                          </span>
                          <span className="text-3xl font-black block mb-2">168</span>
                          <span className="text-xs font-medium text-white/80">
                            100% offline
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 bg-card border border-border/60 rounded-2xl p-5 shadow-sm overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-bold text-foreground">Recent Activity</span>
                          <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded">Today</span>
                        </div>
                        <div className="space-y-4">
                          {[
                            { time: "14:32", icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, action: "Unlocked via Biometrics" },
                            { time: "12:15", icon: <Lock className="w-4 h-4 text-amber-500" />, action: "Auto-locked (Inactivity)" },
                            { time: "09:41", icon: <AlertTriangle className="w-4 h-4 text-red-500" />, action: "Failed password attempt" }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                              <span className="text-xs font-mono text-muted-foreground w-10">{item.time}</span>
                              <div className="p-2 bg-muted/50 rounded-lg">{item.icon}</div>
                              <span className="text-xs font-semibold text-foreground">{item.action}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FEATURE 3: STARTUP LOCK MOCKUP */}
                  {activeTab === "startup-lock" && (
                    <div className="absolute inset-0 p-8 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
                      
                      <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-2xl mb-8 animate-bounce shadow-violet-500/20">
                        <Rocket className="w-10 h-10 text-white" />
                      </div>
                      
                      <h4 className="font-black text-2xl text-foreground mb-3">Session Guard Active</h4>
                      <p className="text-sm text-muted-foreground text-center max-w-[250px] mb-8 font-medium leading-relaxed">
                        Locksy intercepted and locked your restored session tabs instantly.
                      </p>

                      <div className="w-full bg-card border border-border/60 p-1.5 rounded-2xl shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(139,92,246,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[shimmer_1s_linear_infinite]" />
                        
                        <div className="relative bg-background border border-border/50 rounded-xl p-4 flex items-center justify-between z-10">
                          <div className="flex items-center gap-3">
                            <MonitorPlay className="w-5 h-5 text-violet-500" />
                            <span className="text-sm font-bold">5 Tabs Locked on Startup</span>
                          </div>
                          <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                          </span>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* FEATURE 4: INTRUDER CAPTURE MOCKUP */}
                  {activeTab === "intruder-capture" && (
                    <div className="absolute inset-0 p-8 flex flex-col animate-in fade-in zoom-in-95 duration-500">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="font-black text-xl text-foreground">Intruder Log</h4>
                          <p className="text-sm text-muted-foreground font-medium mt-1">100% Local Storage</p>
                        </div>
                        <button
                          onClick={() => {
                            setShowFlash(true)
                            setTimeout(() => setShowFlash(false), 200)
                          }}
                          className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 rounded-xl text-xs font-bold transition-colors shadow-sm"
                        >
                          Simulate Failed Unlock
                        </button>
                      </div>

                      {/* Screen capture simulation */}
                      <div className="relative flex-1 rounded-2xl border-2 border-border overflow-hidden bg-black flex items-center justify-center shadow-inner group">
                        
                        {/* Intruder Mock Silhouette */}
                        <div className="absolute bottom-0 w-48 h-48 opacity-40 bg-gradient-to-t from-zinc-700 to-transparent rounded-t-full blur-sm" />
                        <div className="relative text-center z-10 flex flex-col items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full absolute top-4 right-4 animate-ping" />
                          <div className="w-3 h-3 bg-red-500 rounded-full absolute top-4 right-4" />
                          
                          <AlertTriangle className="w-12 h-12 text-red-500 mb-4 opacity-80" />
                          <p className="text-sm font-bold font-mono text-white tracking-widest bg-black/50 px-3 py-1 rounded backdrop-blur-sm border border-white/10">INTRUDER SNAPPED</p>
                          <p className="text-[10px] text-zinc-400 font-mono mt-2">Failed Attempt #3 • {new Date().toLocaleTimeString()}</p>
                        </div>

                        {/* Camera Frame UI overlay */}
                        <div className="absolute inset-4 border border-white/10 rounded-lg pointer-events-none" />
                        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/30" />
                        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/30" />
                        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/30" />
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/30" />

                        {/* Flash overlay */}
                        <div className={`absolute inset-0 bg-white transition-opacity duration-150 z-30 pointer-events-none ${
                          showFlash ? "opacity-100" : "opacity-0"
                        }`} />
                      </div>
                    </div>
                  )}
                  
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
