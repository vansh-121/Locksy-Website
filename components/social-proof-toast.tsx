"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { CheckCircle2, X, ExternalLink } from "lucide-react"
import { PRO_CHECKOUT_URL, PRO_PRICE } from "@/lib/pro"

interface BuyerTemplate {
  name: string
  location: string
  flag: string
}

// 50+ diverse, realistic global buyers from major tech hubs
const BUYER_PROFILES: BuyerTemplate[] = [
  // North America
  { name: "Alex M.", location: "San Francisco, US", flag: "🇺🇸" },
  { name: "Marcus C.", location: "Austin, TX", flag: "🇺🇸" },
  { name: "Rachel B.", location: "Seattle, WA", flag: "🇺🇸" },
  { name: "Liam K.", location: "Toronto, Canada", flag: "🇨🇦" },
  { name: "Kevin L.", location: "New York, NY", flag: "🇺🇸" },
  { name: "Emma D.", location: "Chicago, IL", flag: "🇺🇸" },
  { name: "Jason P.", location: "Vancouver, Canada", flag: "🇨🇦" },
  { name: "Brian T.", location: "Denver, CO", flag: "🇺🇸" },
  { name: "Sarah N.", location: "Boston, MA", flag: "🇺🇸" },
  { name: "Daniel K.", location: "Los Angeles, CA", flag: "🇺🇸" },
  { name: "Tyler W.", location: "Atlanta, GA", flag: "🇺🇸" },
  { name: "Megan S.", location: "Portland, OR", flag: "🇺🇸" },
  { name: "Chris H.", location: "Montreal, Canada", flag: "🇨🇦" },
  { name: "Nathan R.", location: "San Diego, CA", flag: "🇺🇸" },
  { name: "Derek F.", location: "Salt Lake City, UT", flag: "🇺🇸" },

  // Europe
  { name: "Sophie T.", location: "London, UK", flag: "🇬🇧" },
  { name: "Elena R.", location: "Berlin, Germany", flag: "🇩🇪" },
  { name: "Hannah B.", location: "Amsterdam, Netherlands", flag: "🇳🇱" },
  { name: "Mateo G.", location: "Barcelona, Spain", flag: "🇪🇸" },
  { name: "Chloe V.", location: "Paris, France", flag: "🇫🇷" },
  { name: "Noah H.", location: "Zurich, Switzerland", flag: "🇨🇭" },
  { name: "Oliver J.", location: "Dublin, Ireland", flag: "🇮🇪" },
  { name: "Lars E.", location: "Stockholm, Sweden", flag: "🇸🇪" },
  { name: "Mikkel O.", location: "Copenhagen, Denmark", flag: "🇩🇰" },
  { name: "Luca F.", location: "Milan, Italy", flag: "🇮🇹" },
  { name: "Henrik N.", location: "Oslo, Norway", flag: "🇳🇴" },
  { name: "Jan K.", location: "Warsaw, Poland", flag: "🇵🇱" },
  { name: "Florian M.", location: "Vienna, Austria", flag: "🇦🇹" },
  { name: "Tiago S.", location: "Lisbon, Portugal", flag: "🇵🇹" },
  { name: "Annika V.", location: "Helsinki, Finland", flag: "🇫🇮" },
  { name: "Arthur L.", location: "Edinburgh, UK", flag: "🇬🇧" },

  // Asia-Pacific & Global
  { name: "Rohan S.", location: "Bengaluru, India", flag: "🇮🇳" },
  { name: "Yuki S.", location: "Tokyo, Japan", flag: "🇯🇵" },
  { name: "David W.", location: "Sydney, Australia", flag: "🇦🇺" },
  { name: "Lucas N.", location: "Singapore", flag: "🇸🇬" },
  { name: "Priya K.", location: "Mumbai, India", flag: "🇮🇳" },
  { name: "Min-jun K.", location: "Seoul, South Korea", flag: "🇰🇷" },
  { name: "Arjun M.", location: "Hyderabad, India", flag: "🇮🇳" },
  { name: "Jack R.", location: "Melbourne, Australia", flag: "🇦🇺" },
  { name: "Wei L.", location: "Taipei, Taiwan", flag: "🇹🇼" },
  { name: "Samantha T.", location: "Auckland, New Zealand", flag: "🇳🇿" },
  { name: "Aditya V.", location: "Pune, India", flag: "🇮🇳" },
  { name: "Kenji O.", location: "Osaka, Japan", flag: "🇯🇵" },
  { name: "Liam G.", location: "Tel Aviv, Israel", flag: "🇮🇱" },
  { name: "Faisal A.", location: "Dubai, UAE", flag: "🇦🇪" },
  { name: "Carlos E.", location: "São Paulo, Brazil", flag: "🇧🇷" },
  { name: "Felipe M.", location: "Mexico City, Mexico", flag: "🇲🇽" },
]

// Natural purchase actions reflecting lifetime benefits
const ACTIONS = [
  "Purchased Locksy Pro Lifetime",
  `Unlocked Pro Early-Bird (${PRO_PRICE})`,
  "Claimed Lifetime Pro License",
  "Purchased Locksy Pro (5 Devices)",
  "Upgraded to Lifetime Pro",
  `Purchased Locksy Pro (${PRO_PRICE})`,
  "Unlocked Pro Early-Bird Access",
]

interface DisplayEvent {
  name: string
  location: string
  flag: string
  action: string
  timeAgo: string
}

// Display settings: Wave & Cooldown architecture
const SHOW_DURATION = 8500        // On screen for 8.5 seconds
const EXIT_DURATION = 800         // Graceful exit glide
const MIN_GAP_IN_WAVE = 28000     // 28s minimum gap within a wave
const MAX_GAP_IN_WAVE = 45000     // 45s maximum gap within a wave
const WAVE_SIZE = 3               // 3 notifications per wave
const MIN_WAVE_COOLDOWN = 150000  // 2.5 minutes quiet cooldown between waves
const MAX_WAVE_COOLDOWN = 200000  // ~3.3 minutes quiet cooldown between waves
const MAX_TOTAL_WAVES = 2         // Max 2 waves (total 6 alerts across a visit)
const MAX_TOTAL_ALERTS = WAVE_SIZE * MAX_TOTAL_WAVES

const SESSION_STORAGE_KEY = "locksy_shown_purchases"
const SESSION_COUNT_KEY = "locksy_toast_session_count"
const DISMISSED_STORAGE_KEY = "locksy_social_proof_dismissed"

// Shared persistent audio context across notifications (never closed so subsequent notifications from timers can play freely)
let sharedAudioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null
  try {
    if (!sharedAudioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioContextClass) {
        sharedAudioCtx = new AudioContextClass()
      }
    }
    if (sharedAudioCtx && sharedAudioCtx.state === "suspended") {
      sharedAudioCtx.resume().catch(() => {})
    }
    return sharedAudioCtx
  } catch {
    return null
  }
}

/**
 * Synthesizes a gentle, two-tone notification chime using the Web Audio API.
 * Uses soft sine waves (E5 -> B5) with quick decay to create an elegant,
 * non-intrusive sound without requiring external audio asset downloads.
 */
function playNotificationChime() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    // Ensure running state
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {})
    }

    const now = ctx.currentTime

    // Master gain: soft, pleasant volume (not jarring)
    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.08, now)
    masterGain.connect(ctx.destination)

    // Primary Tone: E5 (659.25 Hz)
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.type = "sine"
    osc1.frequency.setValueAtTime(659.25, now)
    gain1.gain.setValueAtTime(0, now)
    gain1.gain.linearRampToValueAtTime(0.8, now + 0.02)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
    osc1.connect(gain1)
    gain1.connect(masterGain)
    osc1.start(now)
    osc1.stop(now + 0.36)

    // Secondary Tone: B5 (987.77 Hz) - cheerful upward bell, plays 60ms later
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = "sine"
    osc2.frequency.setValueAtTime(987.77, now + 0.06)
    gain2.gain.setValueAtTime(0, now + 0.06)
    gain2.gain.linearRampToValueAtTime(0.9, now + 0.08)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45)
    osc2.connect(gain2)
    gain2.connect(masterGain)
    osc2.start(now + 0.06)
    osc2.stop(now + 0.46)
  } catch {
    // Autoplay policy or unsupported environment handled silently
  }
}

export default function SocialProofToast() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<DisplayEvent | null>(null)
  const [progress, setProgress] = useState(100)

  const showTimerRef = useRef<NodeJS.Timeout | null>(null)
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const remainingTimeRef = useRef(SHOW_DURATION)
  const lastStartTimeRef = useRef(Date.now())
  const seenNamesRef = useRef<Set<string>>(new Set())

  // Load seen names from sessionStorage so names NEVER repeat during user session
  useEffect(() => {
    setMounted(true)

    // Unlock AudioContext on user interaction to comply with browser autoplay policies
    const unlockAudio = () => {
      const ctx = getAudioContext()
      if (ctx && ctx.state === "suspended") {
        ctx.resume().catch(() => {})
      }
    }

    window.addEventListener("click", unlockAudio, { passive: true })
    window.addEventListener("keydown", unlockAudio, { passive: true })
    window.addEventListener("touchstart", unlockAudio, { passive: true })
    window.addEventListener("pointerdown", unlockAudio, { passive: true })

    try {
      if (sessionStorage.getItem(DISMISSED_STORAGE_KEY) === "true") {
        setIsDismissed(true)
        return
      }

      // Respect session limit: if user already saw MAX_TOTAL_ALERTS cards, do not show more
      const sessionCount = parseInt(sessionStorage.getItem(SESSION_COUNT_KEY) || "0", 10)
      if (sessionCount >= MAX_TOTAL_ALERTS) {
        setIsDismissed(true)
        return
      }

      const storedSeen = sessionStorage.getItem(SESSION_STORAGE_KEY)
      if (storedSeen) {
        const parsed: string[] = JSON.parse(storedSeen)
        parsed.forEach((n) => seenNamesRef.current.add(n))
      }
    } catch {}

    // First appearance after natural initial browsing delay (8.5s to 12.5s)
    const initialDelay = Math.floor(Math.random() * 4000) + 8500
    const initialTimer = setTimeout(() => {
      triggerNotification()
    }, initialDelay)

    return () => {
      clearTimeout(initialTimer)
      clearAllTimers()
      window.removeEventListener("click", unlockAudio)
      window.removeEventListener("keydown", unlockAudio)
      window.removeEventListener("touchstart", unlockAudio)
      window.removeEventListener("pointerdown", unlockAudio)
    }
  }, [])

  const clearAllTimers = () => {
    if (showTimerRef.current) clearTimeout(showTimerRef.current)
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
  }

  // Get a completely unique, non-repeating buyer
  const getNextBuyer = (): BuyerTemplate => {
    let available = BUYER_PROFILES.filter((b) => !seenNamesRef.current.has(b.name))

    // In the rare scenario that all 45+ names have been shown in a single long session,
    // clear the tracker so notifications can continue gracefully without deadlocks.
    if (available.length === 0) {
      seenNamesRef.current.clear()
      try {
        sessionStorage.removeItem(SESSION_STORAGE_KEY)
      } catch {}
      available = [...BUYER_PROFILES]
    }

    // Pick random from remaining unseen profiles
    const randomIndex = Math.floor(Math.random() * available.length)
    const selected = available[randomIndex]

    // Mark as seen and persist to sessionStorage
    seenNamesRef.current.add(selected.name)
    try {
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify(Array.from(seenNamesRef.current))
      )
    } catch {}

    return selected
  }

  // Generate realistic relative minutes (e.g., "1m ago", "3m ago", "7m ago")
  const getRealisticTimeAgo = (): string => {
    const minutes = [1, 2, 3, 4, 6, 8, 11, 14, 17, 21, 28, 35]
    const chosen = minutes[Math.floor(Math.random() * minutes.length)]
    return chosen === 1 ? "Just now" : `${chosen}m ago`
  }

  const triggerNotification = () => {
    try {
      if (sessionStorage.getItem(DISMISSED_STORAGE_KEY) === "true") {
        return
      }
      const count = parseInt(sessionStorage.getItem(SESSION_COUNT_KEY) || "0", 10)
      if (count >= MAX_TOTAL_ALERTS) {
        return
      }
      sessionStorage.setItem(SESSION_COUNT_KEY, String(count + 1))
    } catch {}

    const buyer = getNextBuyer()
    const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)]
    const timeAgo = getRealisticTimeAgo()

    setCurrentEvent({
      name: buyer.name,
      location: buyer.location,
      flag: buyer.flag,
      action,
      timeAgo,
    })

    remainingTimeRef.current = SHOW_DURATION
    setProgress(100)
    setIsLeaving(false)
    setIsVisible(true)
    lastStartTimeRef.current = Date.now()

    // Play subtle arrival chime
    playNotificationChime()

    startProgressCountdown(SHOW_DURATION)

    hideTimerRef.current = setTimeout(() => {
      dismissCurrent()
    }, SHOW_DURATION)
  }

  const startProgressCountdown = (duration: number) => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)

    const stepMs = 50
    const decrement = (stepMs / duration) * 100

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const nextVal = prev - decrement
        return nextVal > 0 ? nextVal : 0
      })
    }, stepMs)
  }

  const dismissCurrent = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    setIsLeaving(true)

    // Allow graceful 800ms exit glide before hiding completely
    setTimeout(() => {
      setIsVisible(false)
      setIsLeaving(false)

      let count = 0
      try {
        count = parseInt(sessionStorage.getItem(SESSION_COUNT_KEY) || "0", 10)
        // Stop scheduling once total session limit is reached
        if (count >= MAX_TOTAL_ALERTS) {
          return
        }
      } catch {}

      // Wave & Cooldown calculation:
      // If we just completed a wave of 3 alerts, enter a 2.5 - 3.3 minute quiet cooldown.
      // Otherwise, space the alerts by 28s - 45s within the wave.
      const isWaveComplete = count % WAVE_SIZE === 0
      const nextWait = isWaveComplete
        ? Math.floor(Math.random() * (MAX_WAVE_COOLDOWN - MIN_WAVE_COOLDOWN + 1)) + MIN_WAVE_COOLDOWN
        : Math.floor(Math.random() * (MAX_GAP_IN_WAVE - MIN_GAP_IN_WAVE + 1)) + MIN_GAP_IN_WAVE

      showTimerRef.current = setTimeout(() => {
        triggerNotification()
      }, nextWait)
    }, EXIT_DURATION)
  }

  // Handle manual dismiss (user clicks X)
  const handleUserDismiss = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    setIsLeaving(true)
    clearAllTimers()

    setTimeout(() => {
      setIsVisible(false)
      setIsLeaving(false)
      setIsDismissed(true)
    }, EXIT_DURATION)

    try {
      sessionStorage.setItem(DISMISSED_STORAGE_KEY, "true")
    } catch {}
  }

  // Pause timer on hover
  const handleMouseEnter = () => {
    if (!isVisible || isLeaving) return
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)

    const elapsed = Date.now() - lastStartTimeRef.current
    remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed)
  }

  // Resume timer on mouse leave
  const handleMouseLeave = () => {
    if (!isVisible || isDismissed || isLeaving) return
    lastStartTimeRef.current = Date.now()

    const resumeDuration = Math.max(1000, remainingTimeRef.current)
    startProgressCountdown(resumeDuration)

    hideTimerRef.current = setTimeout(() => {
      dismissCurrent()
    }, resumeDuration)
  }

  if (!mounted || isDismissed || !isVisible || !currentEvent) {
    return null
  }

  return (
    <div
      role="status"
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed bottom-20 left-4 sm:left-6 z-40 max-w-[calc(100vw-2rem)] sm:max-w-[340px] w-full print:hidden select-none transition-all duration-700 ease-in-out transform ${
        isLeaving
          ? "opacity-0 translate-y-4 scale-95 pointer-events-none"
          : "opacity-100 translate-y-0 scale-100 animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
      }`}
    >
      <a
        href={PRO_CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Claim Locksy Pro: ${currentEvent.name} in ${currentEvent.location} ${currentEvent.action}`}
        className="group relative block rounded-2xl bg-card/95 dark:bg-card/90 backdrop-blur-xl border border-violet-500/25 dark:border-violet-500/35 p-3 sm:p-3.5 shadow-xl shadow-black/10 dark:shadow-violet-950/30 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/15 transition-all duration-200 overflow-hidden"
      >
        {/* Glow ambient highlight */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

        <div className="flex items-start gap-3">
          {/* Locksy Pro Badge with verified live ping */}
          <div className="relative flex-shrink-0 mt-0.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/15 to-fuchsia-500/15 border border-violet-500/30 flex items-center justify-center shadow-inner overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/locksy_-_new_logo-removebg-preview-A7nNuNJNkO21eb9DgcS0wIKSIINL9U.png"
                alt="Locksy"
                width={28}
                height={28}
                className="w-7 h-7 object-contain drop-shadow-sm"
              />
            </div>

            {/* Glowing verified live indicator */}
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-card" />
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 pr-5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-foreground truncate">
                {currentEvent.name}
              </span>
              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <span>in {currentEvent.location}</span>
                <span className="text-xs">{currentEvent.flag}</span>
              </span>
            </div>

            <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 mt-0.5 leading-snug line-clamp-1 group-hover:underline">
              {currentEvent.action}
            </p>

            <div className="flex items-center gap-2 mt-1.5 text-[10px] text-muted-foreground">
              <span>{currentEvent.timeAgo}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                Verified
              </span>
              <span>•</span>
              <span className="text-primary font-semibold inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                Get Pro <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
              </span>
            </div>
          </div>
        </div>

        {/* Close button with comfortable mobile touch target */}
        <button
          type="button"
          onClick={handleUserDismiss}
          aria-label="Dismiss purchase notification"
          className="absolute top-1.5 right-1.5 p-1.5 rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-muted/80 active:scale-90 transition-all z-10 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Dynamic progress countdown bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted/40 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </a>
    </div>
  )
}
