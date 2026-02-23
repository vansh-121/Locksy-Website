"use client"

import { useState, useEffect } from "react"

export default function AutomationFeatures() {
  const [timeRemaining, setTimeRemaining] = useState(900) // 15 minutes in seconds
  const [activeActivity, setActiveActivity] = useState(0)
  
  const activities = ['🖱️ Mouse', '⌨️ Keyboard', '📜 Scroll', '▶️ Video']

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => (prev > 1 ? prev - 1 : 900));
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  // Simulate activity detection
  useEffect(() => {
    const activityInterval = setInterval(() => {
      setActiveActivity((prev) => (prev + 1) % activities.length)
    }, 2000)

    return () => clearInterval(activityInterval)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Compute progress from timeRemaining to keep them in sync
  const progress = (timeRemaining / 900) * 40

  const automationFeatures = [
    {
      icon: "⏱️",
      title: "Auto-Lock Timer",
      desc: "Set a timeout duration (1-480 min) and Locksy automatically locks tabs after inactivity",
    },
    {
      icon: "🎯",
      title: "Smart Activity Detection",
      desc: "Monitors mouse, keyboard, scrolling, and video playback—won't lock during active use",
    },
    {
      icon: "📅",
      title: "Scheduled Locking",
      desc: "Lock tabs during specific hours and days—perfect for work hours (9-5) or sleep time",
    },
    {
      icon: "🗓️",
      title: "Day-of-Week Selection",
      desc: "Choose which days to apply schedules (Mon-Sun). Overnight schedules supported (e.g., 10 PM - 6 AM)",
    },
    {
      icon: "🔔",
      title: "Desktop Notifications",
      desc: "Get notified when auto-lock activates or when schedules start/end",
    },
    {
      icon: "🎚️",
      title: "Flexible Scope Options",
      desc: "Lock all tabs or just the active tab for both auto-lock and scheduled features",
    },
  ]

  return (
    <section id="automation" className="py-24 md:py-32 bg-gradient-to-br from-indigo-500/5 via-violet-500/5 to-emerald-500/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent px-4">
            Set It and Forget It
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Introducing Auto-Lock Timer & Scheduled Locking—your tabs stay protected automatically, even when you forget.
          </p>
        </div>

        {/* Main demo visuals - Side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20 max-w-6xl mx-auto">
          {/* Auto-Lock Timer */}
          <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl md:rounded-3xl shadow-2xl border-2 border-indigo-500/20 p-6 md:p-8">
            <div className="text-center mb-4 md:mb-6">
              <div className="text-4xl md:text-5xl mb-2 md:mb-3">⏱️</div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1 md:mb-2">Auto-Lock Timer</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Lock after inactivity</p>
            </div>
            
            {/* Timer visualization */}
            <div className="space-y-3 md:space-y-4">
              <div className="bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 rounded-xl p-4 md:p-6 border-2 border-indigo-300 dark:border-indigo-700">
                <div className="text-center mb-3 md:mb-4">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">{formatTime(timeRemaining)}</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">minutes until auto-lock</div>
                </div>
                <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground mb-2">
                  <span>Inactive</span>
                  <span>Active</span>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 md:h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-1000 ease-linear" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs md:text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-muted-foreground">Monitoring activity...</span>
                </div>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {activities.map((activity, idx) => (
                    <span 
                      key={idx} 
                      className={`px-2 md:px-3 py-1 border rounded-full text-[10px] sm:text-xs font-medium transition-all duration-300 ${
                        idx === activeActivity 
                          ? 'bg-indigo-500 text-white border-indigo-500 shadow-md' 
                          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-xl font-bold text-xs rotate-6">
              1-480 min
            </div>
          </div>

          {/* Scheduled Locking */}
          <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl md:rounded-3xl shadow-2xl border-2 border-emerald-500/20 p-6 md:p-8">
            <div className="text-center mb-4 md:mb-6">
              <div className="text-4xl md:text-5xl mb-2 md:mb-3">📅</div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1 md:mb-2">Scheduled Locking</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Time-based protection</p>
            </div>
            
            {/* Schedule visualization */}
            <div className="space-y-3 md:space-y-4">
              <div className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl p-4 md:p-6 border-2 border-emerald-300 dark:border-emerald-700">
                <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="text-center">
                    <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-1">Start Time</div>
                    <div className="text-lg sm:text-xl md:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">09:00</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-1">End Time</div>
                    <div className="text-lg sm:text-xl md:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">17:00</div>
                  </div>
                </div>
                <div className="text-center text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">Work Hours Schedule</div>
                <div className="flex justify-center gap-0.5 sm:gap-1">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                    <div
                      key={idx}
                      className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold ${
                        idx < 5
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-300 dark:bg-gray-700 text-gray-500'
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs md:text-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-muted-foreground">Schedule active</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                  {['Work Hours', 'Night Time', 'All Day'].map((preset, idx) => (
                    <span key={idx} className="px-1.5 md:px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-[10px] sm:text-xs font-medium text-center">
                      {preset}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-xl font-bold text-xs rotate-6">
              24/7 Custom
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {automationFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 border-2 border-indigo-500/10 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg md:text-xl mb-2 md:mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
