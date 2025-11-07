"use client"

import Link from "next/link"
import { Shield, Lock, CheckCircle, XCircle, Github, ArrowLeft, Database, Eye, AlertTriangle, FileText, Globe, Trash2 } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/locksy_-_new_logo-removebg-preview-A7nNuNJNkO21eb9DgcS0wIKSIINL9U.png"
                alt="Locksy"
                className="relative h-10 md:h-12 w-auto"
              />
            </div>
            <span className="hidden sm:block font-black text-xl md:text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Locksy
            </span>
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </header>
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-accent via-background to-accent">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Last Updated: October 20, 2025  Version 6.1.0
            </div>
            <div>
              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                Privacy <span className="bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary bg-clip-text text-transparent">Policy</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Complete transparency on how we handle your data. Your privacy is our top priority.
              </p>
            </div>
            
            {/* TL;DR Summary */}
            <div className="max-w-4xl mx-auto mt-12">
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl p-8 md:p-10 backdrop-blur-sm shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-500/20 p-3 rounded-2xl">
                    <Lock className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black">The Bottom Line</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "All data stays on YOUR device only",
                    "Passwords hashed with SHA-256",
                    "Zero tracking or analytics",
                    "No third-party services",
                    "Open source & verifiable"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-4">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="font-semibold text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background via-accent/30 to-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-20">

          {/* Overview */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                <FileText className="h-4 w-4" />
                Overview
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Our Commitment to{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Your Privacy
                </span>
              </h2>
            </div>
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-border">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Locksy (&quot;the Extension&quot;) is built with privacy at its core. This policy explains exactly what data we collect (spoiler: almost nothing), where it&apos;s stored (on your device only), and how you maintain complete control. We believe in radical transparency and your right to privacy.
              </p>
            </div>
          </div>

          {/* Data Collection */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                <Database className="h-4 w-4" />
                Data Collection
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                What We{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Collect
                </span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Stored <strong>locally on your device only</strong>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: "🔐",
                  title: "Master Password (Hashed)",
                  desc: "Your password is hashed using SHA-256 before storage. We never see or store your actual password.",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: "⚙️",
                  title: "Extension State",
                  desc: "Whether the extension is currently active or inactive. That's it.",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: "📑",
                  title: "Locked Tab IDs",
                  desc: "Temporary list of which tabs are locked. Automatically cleared when tabs close.",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  icon: "🔒",
                  title: "Session Data",
                  desc: "Failed login attempts and lockout timestamps for brute-force protection.",
                  gradient: "from-yellow-500 to-orange-500"
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg border border-border hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-3xl`} />
                  <div className="relative">
                    <div className={`inline-flex w-16 h-16 items-center justify-center text-4xl mb-4 bg-gradient-to-br ${item.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-br from-red-500/10 to-rose-500/10 border-2 border-red-500/20 rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-500/20 p-3 rounded-2xl">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black">What We DO NOT Collect</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  "Browsing history",
                  "Website URLs",
                  "Personal information",
                  "Payment data",
                  "Cookies",
                  "Page content",
                  "Analytics",
                  "Device info"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/50 rounded-xl p-3">
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="font-semibold text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Storage & Security */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                <Shield className="h-4 w-4" />
                Security
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Storage &{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Security
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-3xl p-8">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <Database className="h-7 w-7 text-blue-600" />
                  Local Storage Only
                </h3>
                <ul className="space-y-3">
                  {[
                    "All data on YOUR device",
                    "No cloud uploads",
                    "No external servers",
                    "Works 100% offline"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-8">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <Lock className="h-7 w-7 text-purple-600" />
                  Security Measures
                </h3>
                <ul className="space-y-3">
                  {[
                    "SHA-256 encryption",
                    "No plain text storage",
                    "Chrome secure APIs",
                    "Brute-force protection"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                <Eye className="h-4 w-4" />
                Transparency
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Permissions{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Explained
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "storage",
                  purpose: "Store your hashed password and settings locally",
                  note: "Never leaves your device"
                },
                {
                  name: "tabs",
                  purpose: "Identify which tabs you want to lock",
                  note: "We don't read page content"
                },
                {
                  name: "scripting",
                  purpose: "Show the lock overlay on locked tabs",
                  note: "Only when you lock a tab"
                },
                {
                  name: "activeTab",
                  purpose: "Lock the current tab with one click",
                  note: "Only tab ID, no content"
                },
                {
                  name: "notifications",
                  purpose: "Confirm lock/unlock actions",
                  note: "Just visual feedback"
                },
                {
                  name: "webNavigation",
                  purpose: "Keep lock active when tab refreshes",
                  note: "Prevents bypass attempts"
                }
              ].map((perm, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <code className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-mono text-sm font-bold inline-block">
                      {perm.name}
                    </code>
                    <div className="flex-1">
                      <p className="text-sm mb-1">
                        <strong>Purpose:</strong> <span className="text-muted-foreground">{perm.purpose}</span>
                      </p>
                      <p className="text-sm">
                        <strong>Note:</strong> <span className="text-muted-foreground">{perm.note}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <code className="bg-orange-500/20 text-orange-700 px-3 py-1 rounded-lg font-mono text-sm font-bold">
                      &lt;all_urls&gt;
                    </code>
                    <p className="mt-3 text-sm text-muted-foreground">
                      <strong>Host Permissions:</strong> Allows locking any tab. Only activates on tabs YOU explicitly lock. No automatic monitoring.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* No Data Sharing */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/20 rounded-3xl p-10 md:p-12 text-center">
            <div className="inline-flex p-4 bg-green-500/20 rounded-3xl mb-6">
              <Globe className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              Zero Data Sharing
            </h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[
                "✓ We do NOT sell your data",
                "✓ We do NOT share with anyone",
                "✓ We do NOT transmit online",
                "✓ We do NOT use analytics"
              ].map((item, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
                  <span className="font-bold text-green-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Data Deletion */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                <Trash2 className="h-4 w-4" />
                Your Control
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Delete Your{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Data Anytime
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🗑️",
                  title: "Uninstall Extension",
                  steps: ["Right-click icon", "Remove from Chrome", "Data auto-deleted"]
                },
                {
                  icon: "🧹",
                  title: "Clear Storage",
                  steps: ["chrome://extensions/", "Find Locksy", "Clear storage"]
                },
                {
                  icon: "💾",
                  title: "Clear Browser Data",
                  steps: ["Settings", "Clear browsing data", "Hosted app data"]
                }
              ].map((method, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 shadow-lg border border-border">
                  <div className="text-5xl mb-4">{method.icon}</div>
                  <h3 className="font-bold text-lg mb-4">{method.title}</h3>
                  <ul className="space-y-2">
                    {method.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Legal{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Compliance
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-border">
                <h3 className="text-2xl font-black mb-4">🇪🇺 GDPR Compliant</h3>
                <p className="text-muted-foreground mb-4">For users in the European Union:</p>
                <ul className="space-y-2">
                  {[
                    "Local processing only",
                    "Minimal data collection",
                    "Easy data deletion",
                    "Complete transparency"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-border">
                <h3 className="text-2xl font-black mb-4">🇺🇸 CCPA Compliant</h3>
                <p className="text-muted-foreground mb-4">For California residents:</p>
                <ul className="space-y-2">
                  {[
                    "No selling of data",
                    "No third-party sharing",
                    "Instant deletion",
                    "Full disclosure"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Open Source */}
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-purple-500/20 rounded-3xl p-10 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Github className="h-24 w-24 text-foreground flex-shrink-0" />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-black mb-4">
                  Open Source & Verifiable
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Don't take our word for it. Review our source code, audit our security, and verify every claim we make.
                </p>
                <a 
                  href="https://github.com/vansh-121/Secure-Tab-Extension" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all hover:scale-105 font-bold text-lg"
                >
                  <Github className="h-6 w-6" />
                  View Source Code
                </a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Questions?{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Contact Us
                </span>
              </h2>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-border">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">GitHub Issues</h3>
                  <a 
                    href="https://github.com/vansh-121/Secure-Tab-Extension/issues" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    github.com/vansh-121/Secure-Tab-Extension/issues
                  </a>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Developer</h3>
                  <p className="text-muted-foreground">vansh-121</p>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-red-600 mb-1">Security Vulnerabilities</h4>
                      <p className="text-sm text-muted-foreground">
                        Report privately via GitHub Security Advisories. Do not disclose publicly until patched.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Final Notice */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-3xl p-10 md:p-14 text-center">
            <div className="inline-flex p-4 bg-primary/20 rounded-3xl mb-6">
              <Shield className="h-16 w-16 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              By installing and using Locksy, you acknowledge that you have read and understood this Privacy Policy.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Effective as of October 20, 2025
            </p>
            <div className="pt-8 border-t border-border/50">
              <p className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                We built this to protect your privacy, not invade it. ❤️
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-neutral-300 py-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/locksy_-_new_logo-removebg-preview-A7nNuNJNkO21eb9DgcS0wIKSIINL9U.png"
                alt="Locksy"
                className="h-10 w-auto"
              />
              <span className="font-black text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Locksy
              </span>
              <span className="text-neutral-400">• Privacy-First Security</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <a 
                href="https://github.com/vansh-121/Secure-Tab-Extension" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-neutral-500">
            <p>© 2025 Locksy. Open source and privacy-focused.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
