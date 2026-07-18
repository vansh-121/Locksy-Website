"use client"

import { useState } from "react"
import { CheckCircle2, Zap, Shield, Sparkles, LayoutDashboard, Camera, ShieldAlert, Key, Globe, EyeOff, Clock, Fingerprint, ShieldCheck } from "lucide-react"

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"lifetime">("lifetime")

  const proFeatures = [
    { title: "Unlimited Domain Auto-Locks", desc: "Lock any number of websites & subdomains", icon: <Globe className="w-4 h-4" /> },
    { title: "Unlimited Biometric Unlocks", desc: "Windows Hello, Touch ID, or Face ID access", icon: <Fingerprint className="w-4 h-4" /> },
    { title: "Startup Session Lock", desc: "Instantly lock all session-restored tabs on launch", icon: <Zap className="w-4 h-4" /> },
    { title: "Stealth Mode disguise", desc: "Disguise locked tabs as fake browser error pages", icon: <EyeOff className="w-4 h-4" /> },
    { title: "Weekly Privacy Reports", desc: "Personalized offline dashboard & security score", icon: <LayoutDashboard className="w-4 h-4" /> },
    { title: "Custom Lock Screen Messages", desc: "Display personal notes or warnings on lock overlays", icon: <ShieldAlert className="w-4 h-4" /> },
    { title: "Webcam Intruder captures", desc: "Log up to 50 local snapshots of failed access attempts", icon: <Camera className="w-4 h-4" /> },
    { title: "1-Click Unlock All Tabs", desc: "Unlock all protected tabs simultaneously", icon: <Key className="w-4 h-4" /> },
    { title: "Custom Auto-Lock Timers", desc: "Configure custom duration settings up to 8 hours", icon: <Clock className="w-4 h-4" /> },
  ]

  const freeLimits = [
    { title: "Basic Password Locking", desc: "Standard master password overlay protection", icon: <Shield className="w-4 h-4" /> },
    { title: "Max 3 Domain Locks", desc: "Limit of 3 auto-locked websites", icon: <Globe className="w-4 h-4" /> },
    { title: "Max 5 Biometric prompts", desc: "Up to 5 fingerprint or face unlocks per day", icon: <Fingerprint className="w-4 h-4" /> },
    { title: "Max 3 Webcam captures", desc: "Store up to 3 local snooper snapshots", icon: <Camera className="w-4 h-4" /> },
    { title: "Preset Timers Only", desc: "Choose from 5, 15, 30, or 60 minute presets", icon: <Clock className="w-4 h-4" /> },
    { title: "No Stealth or Reports", desc: "No connection-error disguise or weekly reports dashboard", icon: <EyeOff className="w-4 h-4" /> },
  ]

  return (
    <section
      id="pricing"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] bg-gradient-to-tr from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,1)_100%)] opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 border border-violet-500/20 rounded-full text-sm font-bold text-violet-600 dark:text-violet-400 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
            <Sparkles className="w-4 h-4" />
            Simple Transparent Pricing
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent tracking-tight">
            Choose Your Level of <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">Protection</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Start with our powerful open-source core for free, or unlock the ultimate privacy suite with a one-time lifetime license.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
          {/* FREE PLAN */}
          <div className="group relative flex flex-col justify-between bg-card/20 backdrop-blur-xl rounded-[2.5rem] border border-border/50 p-8 md:p-10 shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-border hover:shadow-3xl hover:bg-card/40">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-black text-foreground tracking-tight">Free Core</span>
                <span className="text-xs px-3 py-1.5 bg-muted text-muted-foreground rounded-full font-bold uppercase tracking-wider">Open Source</span>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-black text-foreground">$0</span>
                </div>
                <p className="text-muted-foreground mt-2 font-medium">Free forever, no credit card required.</p>
              </div>
              
              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

              {/* Checklist */}
              <ul className="space-y-5">
                {freeLimits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="mt-0.5 p-1 rounded-full bg-muted/50 border border-border/50 text-muted-foreground group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <strong className="text-sm font-bold text-foreground block mb-0.5">{item.title}</strong>
                      <span className="text-sm text-muted-foreground">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <a
                href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-muted text-foreground hover:bg-foreground hover:text-background font-bold rounded-2xl text-center block transition-all duration-300 transform active:scale-[0.98]"
              >
                Download Free Version
              </a>
            </div>
          </div>

          {/* PRO PLAN */}
          <div className="group relative flex flex-col justify-between bg-card/60 backdrop-blur-2xl rounded-[2.5rem] border border-violet-500/30 p-8 md:p-10 shadow-[0_0_40px_rgba(139,92,246,0.1)] hover:shadow-[0_0_60px_rgba(139,92,246,0.2)] transition-all duration-500 transform lg:scale-105 hover:-translate-y-2 z-10 overflow-hidden">
            
            {/* Animated Glow Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-cyan-500/5 pointer-events-none" />

            {/* Ribbon */}
            <div className="absolute top-8 right-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)] font-bold text-xs uppercase tracking-wider animate-pulse">
              Most Popular
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-black bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent tracking-tight">Locksy Pro</span>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-7xl font-black text-foreground tracking-tighter">$4.99</span>
                </div>
                <p className="text-violet-600 dark:text-violet-400 mt-2 font-bold">One-time payment. Yours forever.</p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-transparent mb-8" />

              {/* Checklist */}
              <ul className="space-y-5">
                {proFeatures.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="mt-0.5 p-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-fuchsia-500 group-hover:text-white transition-all duration-300 shadow-sm shadow-violet-500/10">
                      {item.icon}
                    </div>
                    <div>
                      <strong className="text-sm font-bold text-foreground block mb-0.5">{item.title}</strong>
                      <span className="text-sm text-muted-foreground">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 space-y-4 relative z-10">
              <a
                href="https://polar.sh/checkout/polar_c_ZdeCgbSo8tHsDZdh1AuiZ7jsmDI1CltQcE3PC1KOXG7"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full py-4 bg-foreground text-background font-black rounded-2xl text-center block overflow-hidden transform transition-all duration-300 active:scale-[0.98] group/btn hover:shadow-xl hover:shadow-violet-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-white transition-colors duration-300">
                  Upgrade to Pro Now <Zap className="w-5 h-5 animate-pulse" />
                </span>
              </a>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Secure payment via Polar.sh
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

