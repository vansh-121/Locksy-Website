"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Play, Star, Check } from "lucide-react"
import { ALL_BROWSERS, PRIMARY_BROWSERS } from "@/lib/browsers"
import { useVisitorBrowser, StoreNote } from "@/components/install-buttons"

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady?: () => void
  }
}

const VIDEO_ID = "mZxIBLo9ezY"

const TRUST_POINTS = ["Free plan, no card", "No account needed", "Works 100% offline"]

function DemoVideo() {
  const playerRef = useRef<any>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)
  // Click-to-play facade: nothing is requested from YouTube until the visitor
  // asks for the video, so a cold page view sets no third-party cookies and
  // skips the ~1 MB player bundle.
  const [hasActivated, setHasActivated] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasActivated) return
    // Cancel a late onYouTubeIframeAPIReady if the visitor leaves first.
    let cancelled = false

    const createPlayer = () => {
      if (cancelled || !window.YT?.Player || !document.getElementById("youtube-player")) return
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: VIDEO_ID,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          autoplay: 1,
          mute: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          disablekb: 1,
          enablejsapi: 1,
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            playerRef.current = event.target
            setPlayerReady(true)
            event.target.unMute()
            event.target.setVolume(100)
            event.target.playVideo()
            const frame = event.target.getIframe?.()
            if (frame && !frame.title) frame.title = "Locksy demo video"
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) setIsPlaying(true)
            else if (event.data === window.YT.PlayerState.PAUSED) setIsPlaying(false)
          },
        },
      })
    }

    if (window.YT?.Player) {
      createPlayer()
    } else {
      window.onYouTubeIframeAPIReady = createPlayer
      const API_SRC = "https://www.youtube.com/iframe_api"
      if (!document.querySelector(`script[src="${API_SRC}"]`)) {
        const tag = document.createElement("script")
        tag.src = API_SRC
        tag.async = true
        document.head.appendChild(tag)
      }
    }

    return () => {
      cancelled = true
      if (window.onYouTubeIframeAPIReady === createPlayer) window.onYouTubeIframeAPIReady = undefined
      if (typeof playerRef.current?.destroy === "function") playerRef.current.destroy()
      playerRef.current = null
      setPlayerReady(false)
      setIsPlaying(false)
    }
  }, [hasActivated])

  // Player methods only exist after onReady; calling earlier throws.
  const withPlayer = (method: string, fn: (p: any) => void) => {
    const p = playerRef.current
    if (playerReady && typeof p?.[method] === "function") fn(p)
  }

  // Pause (never auto-start) when scrolled out of view.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            const p = playerRef.current
            if (playerReady && typeof p?.pauseVideo === "function") p.pauseVideo()
          }
        })
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [playerReady])

  const toggleMute = () =>
    withPlayer(isMuted ? "unMute" : "mute", (p) => {
      if (isMuted) p.unMute()
      else p.mute()
      setIsMuted(!isMuted)
    })

  const togglePlayPause = () => {
    if (!hasActivated) {
      setHasActivated(true)
      return
    }
    withPlayer(isPlaying ? "pauseVideo" : "playVideo", (p) => (isPlaying ? p.pauseVideo() : p.playVideo()))
  }

  const openFullscreen = () => document.getElementById("youtube-player")?.requestFullscreen?.()

  const ctrl =
    "pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70"

  return (
    <div ref={containerRef} id="demo" className="relative mx-auto mt-16 max-w-5xl scroll-mt-28 md:mt-20">
      {/* Brand glow behind the frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 rounded-[3rem] blur-3xl"
        style={{ background: "radial-gradient(60% 60% at 50% 30%, var(--glow), transparent 70%)" }}
      />
      <div className="surface relative p-2 md:p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
        <div
          className="relative aspect-video overflow-hidden rounded-[1.25rem] bg-black"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {hasActivated ? (
            <div id="youtube-player" className="absolute inset-0 h-full w-full" />
          ) : (
            <button
              type="button"
              onClick={() => setHasActivated(true)}
              className="group/facade absolute inset-0 h-full w-full cursor-pointer"
            >
              <img
                src="/video-poster.jpg"
                alt=""
                aria-hidden="true"
                width={1280}
                height={720}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 text-sm font-medium text-black shadow-2xl transition-transform duration-300 group-hover/facade:scale-105">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
                    <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true" />
                  </span>
                  Watch the demo
                </span>
              </span>
              <span className="sr-only">Play the Locksy demo video</span>
            </button>
          )}

          {hasActivated && (
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-300 ${
                showControls || !isPlaying ? "opacity-100" : "opacity-0"
              }`}
            >
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button onClick={togglePlayPause} className={`${ctrl} h-16 w-16`} aria-label="Play video">
                    <Play className="ml-0.5 h-6 w-6 fill-current" />
                  </button>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-2">
                  <button onClick={togglePlayPause} className={ctrl} aria-label={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
                    ) : (
                      <Play className="ml-0.5 h-4 w-4 fill-current" />
                    )}
                  </button>
                  <button onClick={toggleMute} className={ctrl} aria-label={isMuted ? "Unmute" : "Mute"}>
                    {isMuted ? (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
                    ) : (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                    )}
                  </button>
                </div>
                <button onClick={openFullscreen} className={ctrl} aria-label="Fullscreen">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  // Chrome on the server and first render; the visitor's browser after mount.
  const visitor = useVisitorBrowser()
  const browser = visitor.browser
  // Other browsers, minus any that share this visitor's store page.
  const others = ALL_BROWSERS.filter((b) => b.id !== browser.id)

  return (
    <section id="hero-section" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background: dotted grid fading out + top brand glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
        <div
          className="absolute left-1/2 top-0 h-[520px] w-[1100px] -translate-x-1/2 -translate-y-1/3"
          style={{ background: "radial-gradient(50% 50% at 50% 50%, var(--glow), transparent 70%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Social proof pill: real store numbers only */}
          <a
            href="#testimonials"
            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/70 py-1.5 pl-2 pr-4 text-xs text-muted-foreground backdrop-blur transition-colors hover:text-foreground sm:text-sm"
          >
            <span className="flex -space-x-1.5">
              {PRIMARY_BROWSERS.map((b) => (
                <span key={b.id} className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background">
                  <img src={b.icon} alt="" className="h-4 w-4 object-contain" />
                </span>
              ))}
            </span>
            <span className="flex items-center gap-1 text-foreground">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
              4.4
            </span>
            <span className="h-3 w-px bg-border" />
            Trusted by 5,000+ people
          </a>

          <h1 className="mt-7 text-[2.6rem] font-semibold leading-[1.05] text-foreground sm:text-6xl md:text-7xl text-balance">
            Password protect &amp; lock your <span className="text-highlight">browser tabs</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg text-pretty">
            Locksy locks any tab, or a whole website, behind your password or fingerprint in one click.
            It runs entirely on your device and needs no account.
          </p>

          {/* CTAs */}
          <div id="download" className="mt-9 flex scroll-mt-32 flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={browser.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-glow btn-lg w-full sm:w-auto"
              data-browser={browser.id}
            >
              <img src={browser.icon} alt="" className="h-5 w-5 object-contain" />
              Add to {browser.name}, it&apos;s free
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#demo" className="btn-secondary btn-lg w-full sm:w-auto">
              <Play className="h-4 w-4 fill-current" />
              Watch demo
            </a>
          </div>

          <StoreNote visitor={visitor} className="mx-auto mt-4 max-w-md text-center" />

          {/* Other browsers */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-xs text-muted-foreground">
            <span className="mr-1">Also on</span>
            {others.map((b) => (
              <a
                key={b.id}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Install for ${b.name} (${b.store})`}
                className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 hover:bg-muted hover:text-foreground transition-colors"
              >
                <img src={b.icon} alt="" className="h-4 w-4 object-contain" />
                {b.name}
              </a>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {TRUST_POINTS.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-highlight" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>

          <a
            href="#how-it-works"
            className="mt-5 inline-flex items-center gap-1.5 text-sm text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            New to Locksy? Follow the six-step setup
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <DemoVideo />
      </div>
    </section>
  )
}
