"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, X, ArrowUpRight } from "lucide-react"
import { PRO_CHECKOUT_URL, PRO_PRICE } from "@/lib/pro"
import { LOCKSY_LOGO_URL } from "@/lib/browsers"

interface BuyerProfile {
  name: string
  location: string
  flag: string
}

// Global buyers from tech & business hubs
const BUYER_PROFILES: BuyerProfile[] = [
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
  { name: "Tyler W.", location: "Atlanta, GA", flag: "🇺🇸" },
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
  { name: "Henrik N.", location: "Oslo, Norway", flag: "🇳🇴" },
  { name: "Jan K.", location: "Warsaw, Poland", flag: "🇵🇱" },
  { name: "Tiago S.", location: "Lisbon, Portugal", flag: "🇵🇹" },

  // Asia-Pacific & Global
  { name: "Rohan S.", location: "Bengaluru, India", flag: "🇮🇳" },
  { name: "Yuki S.", location: "Tokyo, Japan", flag: "🇯🇵" },
  { name: "David W.", location: "Sydney, Australia", flag: "🇦🇺" },
  { name: "Lucas N.", location: "Singapore", flag: "🇸🇬" },
  { name: "Priya K.", location: "Mumbai, India", flag: "🇮🇳" },
  { name: "Min-jun K.", location: "Seoul, South Korea", flag: "🇰🇷" },
  { name: "Jack R.", location: "Melbourne, Australia", flag: "🇦🇺" },
  { name: "Liam G.", location: "Tel Aviv, Israel", flag: "🇮🇱" },
  { name: "Faisal A.", location: "Dubai, UAE", flag: "🇦🇪" },
]

const PURCHASE_ACTIONS = [
  "Purchased Locksy Pro Lifetime",
  `Unlocked Locksy Pro (${PRO_PRICE})`,
  "Claimed Lifetime Pro License",
  "Purchased Locksy Pro (5 Devices)",
  "Upgraded to Lifetime Pro",
  "Unlocked Locksy Pro Lifetime Access",
]

interface PurchaseEvent {
  name: string
  location: string
  flag: string
  action: string
  timeAgo: string
}

// Display Settings
const SHOW_DURATION = 7500 // 7.5 seconds
const EXIT_DURATION = 500 // 500ms slide-out
const INITIAL_DELAY_DEFAULT = 9500 // 9.5s on landing/tool pages
const INITIAL_DELAY_READING = 25000 // 25s on deep reading pages (blogs/guide)
const MIN_GAP = 30000 // 30s min quiet gap between toasts
const MAX_GAP = 48000 // 48s max gap
const MAX_SESSION_TOASTS = 4 // Max 4 alerts per session

const SESSION_STORAGE_SEEN_NAMES = "locksy_sales_seen_names"
const SESSION_STORAGE_COUNT = "locksy_sales_toast_count"
const SESSION_STORAGE_DISMISSED = "locksy_sales_toast_dismissed"

// Persistent Web Audio context for pleasant, non-intrusive notification chime
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
 * Plays a gentle, pleasant two-tone chime (E5 -> B5 sine waves) when a notification appears.
 */
function playNotificationChime() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {})
    }

    const now = ctx.currentTime

    // Master volume: soft, pleasant level
    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.07, now)
    masterGain.connect(ctx.destination)

    // Primary Tone: E5 (659.25 Hz)
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.type = "sine"
    osc1.frequency.setValueAtTime(659.25, now)
    gain1.gain.setValueAtTime(0, now)
    gain1.gain.linearRampToValueAtTime(0.7, now + 0.02)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.32)
    osc1.connect(gain1)
    gain1.connect(masterGain)
    osc1.start(now)
    osc1.stop(now + 0.33)

    // Secondary Tone: B5 (987.77 Hz) - cheerful upward bell
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = "sine"
    osc2.frequency.setValueAtTime(987.77, now + 0.05)
    gain2.gain.setValueAtTime(0, now + 0.05)
    gain2.gain.linearRampToValueAtTime(0.8, now + 0.07)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.42)
    osc2.connect(gain2)
    gain2.connect(masterGain)
    osc2.start(now + 0.05)
    osc2.stop(now + 0.43)
  } catch {
    // Graceful fallback if audio is blocked by user policy
  }
}

export default function SocialProofToast() {
  const pathname = usePathname()
  const isReadingPage = Boolean(
    pathname && (pathname.startsWith("/blog") || pathname.startsWith("/guide"))
  )
  const maxAlerts = isReadingPage ? 2 : MAX_SESSION_TOASTS

  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<PurchaseEvent | null>(null)
  const [progress, setProgress] = useState(100)

  const showTimerRef = useRef<NodeJS.Timeout | null>(null)
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const remainingTimeRef = useRef(SHOW_DURATION)
  const lastStartTimeRef = useRef(Date.now())
  const seenNamesRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    setMounted(true)

    // Unlock AudioContext on first user gesture to comply with browser autoplay policies
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
      if (sessionStorage.getItem(SESSION_STORAGE_DISMISSED) === "true") {
        setIsDismissed(true)
        return
      }

      const count = parseInt(sessionStorage.getItem(SESSION_STORAGE_COUNT) || "0", 10)
      if (count >= maxAlerts) {
        setIsDismissed(true)
        return
      }

      const storedSeen = sessionStorage.getItem(SESSION_STORAGE_SEEN_NAMES)
      if (storedSeen) {
        const parsed: string[] = JSON.parse(storedSeen)
        parsed.forEach((n) => seenNamesRef.current.add(n))
      }
    } catch {}

    const initialDelay = isReadingPage ? INITIAL_DELAY_READING : INITIAL_DELAY_DEFAULT

    const timer = setTimeout(() => {
      triggerNotification()
    }, initialDelay)

    return () => {
      clearTimeout(timer)
      clearAllTimers()
      window.removeEventListener("click", unlockAudio)
      window.removeEventListener("keydown", unlockAudio)
      window.removeEventListener("touchstart", unlockAudio)
      window.removeEventListener("pointerdown", unlockAudio)
    }
  }, [isReadingPage, maxAlerts])

  const clearAllTimers = () => {
    if (showTimerRef.current) clearTimeout(showTimerRef.current)
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
  }

  const getNextBuyer = (): BuyerProfile => {
    let available = BUYER_PROFILES.filter((b) => !seenNamesRef.current.has(b.name))

    if (available.length === 0) {
      seenNamesRef.current.clear()
      try {
        sessionStorage.removeItem(SESSION_STORAGE_SEEN_NAMES)
      } catch {}
      available = [...BUYER_PROFILES]
    }

    const randomIndex = Math.floor(Math.random() * available.length)
    const selected = available[randomIndex]

    seenNamesRef.current.add(selected.name)
    try {
      sessionStorage.setItem(
        SESSION_STORAGE_SEEN_NAMES,
        JSON.stringify(Array.from(seenNamesRef.current))
      )
    } catch {}

    return selected
  }

  const getRealisticTimeAgo = (): string => {
    const minutes = [1, 2, 3, 5, 7, 9, 12, 16, 21, 28]
    const chosen = minutes[Math.floor(Math.random() * minutes.length)]
    return chosen === 1 ? "Just now" : `${chosen}m ago`
  }

  const triggerNotification = () => {
    try {
      if (sessionStorage.getItem(SESSION_STORAGE_DISMISSED) === "true") return
      const count = parseInt(sessionStorage.getItem(SESSION_STORAGE_COUNT) || "0", 10)
      if (count >= maxAlerts) return
      sessionStorage.setItem(SESSION_STORAGE_COUNT, String(count + 1))
    } catch {}

    const buyer = getNextBuyer()
    const action = PURCHASE_ACTIONS[Math.floor(Math.random() * PURCHASE_ACTIONS.length)]
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

    // Play subtle notification chime
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

    setTimeout(() => {
      setIsVisible(false)
      setIsLeaving(false)

      let count = 0
      try {
        count = parseInt(sessionStorage.getItem(SESSION_STORAGE_COUNT) || "0", 10)
        if (count >= maxAlerts) return
      } catch {}

      const nextWait = Math.floor(Math.random() * (MAX_GAP - MIN_GAP + 1)) + MIN_GAP
      showTimerRef.current = setTimeout(() => {
        triggerNotification()
      }, nextWait)
    }, EXIT_DURATION)
  }

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
      sessionStorage.setItem(SESSION_STORAGE_DISMISSED, "true")
    } catch {}
  }

  const handleMouseEnter = () => {
    if (!isVisible || isLeaving) return
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)

    const elapsed = Date.now() - lastStartTimeRef.current
    remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed)
  }

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
      className={`fixed bottom-20 left-4 sm:left-6 z-40 max-w-[calc(100vw-2rem)] sm:max-w-[340px] w-full print:hidden select-none transition-all duration-500 ease-out transform ${
        isLeaving
          ? "opacity-0 translate-y-3 scale-95 pointer-events-none"
          : "opacity-100 translate-y-0 scale-100 animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
      }`}
    >
      <Link
        href={PRO_CHECKOUT_URL}
        className="group relative block surface rounded-2xl p-3.5 shadow-xl shadow-black/5 dark:shadow-black/25 border border-border hover:border-foreground/20 transition-all duration-200 overflow-hidden"
      >
        <div className="flex items-start gap-3">
          {/* Locksy App Icon with subtle verified live indicator */}
          <div className="relative flex-shrink-0 mt-0.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted/80 p-1.5 shadow-xs">
              <Image
                src={LOCKSY_LOGO_URL}
                alt="Locksy Pro"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 border border-card" />
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 pr-5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-foreground truncate">
                {currentEvent.name}
              </span>
              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <span>in {currentEvent.location}</span>
                <span className="text-xs">{currentEvent.flag}</span>
              </span>
            </div>

            <p className="mt-0.5 text-xs font-medium text-foreground leading-snug">
              {currentEvent.action}
            </p>

            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-muted-foreground">
                <span className="font-mono text-[10px]">{currentEvent.timeAgo}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-medium text-[10px]">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                </span>
              </span>

              <span className="inline-flex items-center gap-0.5 font-medium text-highlight group-hover:text-primary transition-colors">
                Get Pro
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={handleUserDismiss}
          aria-label="Dismiss purchase notification"
          className="absolute top-2 right-2 p-1 rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-muted active:scale-90 transition-all z-10 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Subtle Countdown Progress Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-muted/40 overflow-hidden">
          <div
            className="h-full bg-highlight/80 transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </Link>
    </div>
  )
}
