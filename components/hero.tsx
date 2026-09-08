"use client"

import ProductHuntBadge from "@/components/product-hunt-badge"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady?: () => void
  }
}

const PRIMARY_BROWSERS = [
  {
    name: "Google Chrome",
    icon: "/browsers/chrome.png",
    url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim",
    storeName: "Chrome Web Store",
  },
  {
    name: "Microsoft Edge",
    icon: "/browsers/edge.png",
    url: "https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn",
    storeName: "Edge Add-ons",
  },
  {
    name: "Mozilla Firefox",
    icon: "/browsers/firefox.png",
    url: "https://addons.mozilla.org/en-US/firefox/addon/locksy/",
    storeName: "Firefox Add-ons",
  },
]

const SECONDARY_BROWSERS = [
  {
    name: "Brave",
    icon: "/browsers/brave.png",
    url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim",
  },
  {
    name: "Opera",
    icon: "/browsers/opera.png",
    url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim",
  },
  {
    name: "Comet",
    icon: "/browsers/comet.png",
    url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim",
  },
  {
    name: "Vivaldi",
    icon: "/browsers/vivaldi.png",
    url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim",
  },
]

const VIDEO_ID = '6uyd4sN5WiA'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)
  // Click-to-play facade. Nothing is requested from YouTube until the visitor
  // actually asks for the video, so a cold page view writes zero third-party
  // cookies and downloads none of the ~1 MB YouTube player bundle.
  const [hasActivated, setHasActivated] = useState(false)

  useEffect(() => {
    if (!hasActivated) return

    // If the visitor activates the video and then leaves before
    // youtube.com/iframe_api has finished loading, YouTube still fires
    // onYouTubeIframeAPIReady afterwards. Today `new YT.Player()` against a
    // missing element is a silent no-op, but that is undocumented behaviour we
    // do not control, and a future throw would land in Lighthouse's
    // errors-in-console audit. So the late callback is cancelled explicitly.
    let cancelled = false

    const createPlayer = () => {
      if (cancelled) return
      if (!window.YT?.Player) return
      if (!document.getElementById('youtube-player')) return
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: VIDEO_ID,
        // Serve the player itself from youtube-nocookie.com so playback does not
        // write advertising/tracking cookies for the visitor.
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          autoplay: 1,
          mute: 1,
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
          // Use event.target, not playerRef.current: onReady can fire before the
          // `new YT.Player(...)` assignment below has completed, and event.target
          // is the fully-initialised player either way.
          onReady: (event: any) => {
            playerRef.current = event.target
            setPlayerReady(true)
            event.target.mute()
            // Honour the click that mounted us.
            event.target.playVideo()
            const frame = event.target.getIframe?.()
            if (frame && !frame.title) frame.title = 'Locksy demo video'
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true)
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false)
            }
          },
        },
      })
    }

    // The API may already be present (e.g. the player was destroyed and remounted).
    if (window.YT?.Player) {
      createPlayer()
    } else {
      window.onYouTubeIframeAPIReady = createPlayer
      const API_SRC = 'https://www.youtube.com/iframe_api'
      if (!document.querySelector(`script[src="${API_SRC}"]`)) {
        const tag = document.createElement('script')
        tag.src = API_SRC
        tag.async = true
        document.head.appendChild(tag)
      }
    }

    return () => {
      cancelled = true
      // Drop our closure off the global so a late API load cannot revive it.
      // Identity-checked so we never clear a newer mount's callback.
      if (window.onYouTubeIframeAPIReady === createPlayer) {
        window.onYouTubeIframeAPIReady = undefined
      }
      if (typeof playerRef.current?.destroy === 'function') playerRef.current.destroy()
      playerRef.current = null
      setPlayerReady(false)
      setIsPlaying(false)
    }
  }, [hasActivated])

  // The object returned by `new YT.Player()` only gains its API methods once
  // onReady has fired. Calling them before that throws
  // ("unMute is not a function"), which would show up in Lighthouse's
  // errors-in-console audit, so every call site goes through this.
  const withPlayer = (method: string, fn: (p: any) => void) => {
    const p = playerRef.current
    if (playerReady && typeof p?.[method] === 'function') fn(p)
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVideoVisible(true)
          } else {
            // Only ever pause here. Auto-*starting* on scroll is what pulled the
            // YouTube player into every page view in the first place.
            const p = playerRef.current
            if (playerReady && typeof p?.pauseVideo === 'function') p.pauseVideo()
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [playerReady])

  const toggleMute = () => {
    withPlayer(isMuted ? 'unMute' : 'mute', (p) => {
      if (isMuted) {
        p.unMute()
        setIsMuted(false)
      } else {
        p.mute()
        setIsMuted(true)
      }
    })
  }

  const togglePlayPause = () => {
    // First interaction mounts the player, which autoplays on ready.
    if (!hasActivated) {
      setHasActivated(true)
      return
    }
    withPlayer(isPlaying ? 'pauseVideo' : 'playVideo', (p) => {
      if (isPlaying) p.pauseVideo()
      else p.playVideo()
    })
  }

  const openFullscreen = () => {
    const playerElement = document.getElementById('youtube-player')
    if (playerElement) {
      playerElement.requestFullscreen?.()
    }
  }

  return (
    <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-gradient-to-br from-accent via-background to-accent">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Content */}
          <div className="space-y-10 z-10">
            {/* Badge */}
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Works on all major browsers
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-black leading-tight text-foreground">
                Password Protect &amp; Lock Your{" "}
                <span className="block bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary dark:from-primary dark:via-[oklch(0.82_0.22_282)] dark:to-secondary bg-clip-text text-transparent">
                  Browser Tabs
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Locksy password-protects any browser tab — or a whole website — with a single click.
                It's free, works offline, and needs no account.
              </p>
            </div>

            {/* Browser Download Buttons */}
            <div className="space-y-4">
              {/* Primary Browsers - Chrome, Edge & Firefox */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                {PRIMARY_BROWSERS.map((browser) => (
                  <a
                    key={browser.name}
                    href={browser.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] group px-4 py-3.5"
                  >
                    <span className="flex items-center gap-2.5">
                      <img
                        src={browser.icon}
                        alt={browser.name}
                        className="w-7 h-7 object-contain flex-shrink-0"
                      />
                      <span className="flex flex-col items-start">
                        <span className="text-xs text-muted-foreground group-hover:text-white/80 transition-colors">Get it for</span>
                        <span className="font-semibold text-sm text-foreground group-hover:text-white transition-colors whitespace-nowrap">{browser.name}</span>
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              {/* Other browsers, tucked away so the choice stays simple. All links
                  remain in the page (open by default until toggled off). */}
              <details className="group/more">
                <summary className="list-none cursor-pointer inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-4 h-4 transition-transform group-open/more:rotate-180" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  Using Brave, Opera, Vivaldi or another browser?
                </summary>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 w-full mt-3">
                  {SECONDARY_BROWSERS.map((browser) => (
                    <a
                      key={browser.name}
                      href={browser.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary inline-flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] group py-2 sm:py-3"
                      title="Install from Chrome Web Store"
                    >
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        <img
                          src={browser.icon}
                          alt={browser.name}
                          className="w-7 h-7 sm:w-8 sm:h-8 object-contain flex-shrink-0"
                        />
                        <span className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-white transition-colors">{browser.name}</span>
                      </span>
                    </a>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  These all install straight from the Chrome Web Store.
                </p>
              </details>
            </div>
          </div>

          {/* Right: Logo/Image */}
          <div className="flex justify-center md:justify-end items-start relative z-10 md:mt-12">
            <div className="relative flex items-center justify-center">
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-3xl opacity-30 dark:opacity-50 animate-pulse" />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/locksy_-_new_logo-removebg-preview-A7nNuNJNkO21eb9DgcS0wIKSIINL9U.png"
                alt="Locksy Extension"
                width={384}
                height={384}
                priority
                className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Video Demo Section */}
        <div className="mt-16 z-10 relative">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              See Locksy in Action
            </h2>
            <p className="text-lg text-muted-foreground">
              Watch how easy it is to protect your browser tabs
            </p>
          </div>
          <div
            ref={containerRef}
            className="max-w-4xl mx-auto"
          >
            <div
              className={`relative aspect-video rounded-2xl overflow-hidden bg-black transition-all duration-1000 group/video ${isVideoVisible
                ? 'opacity-100 scale-100 shadow-[0_0_60px_rgba(139,92,246,0.4)]'
                : 'opacity-0 scale-95 shadow-2xl'
                }`}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              {hasActivated ? (
                <div
                  id="youtube-player"
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                /* Facade: self-hosted 1280x720 poster (exact 16:9, so it matches the
                   aspect-video box) plus a play button. No youtube.com request at all
                   until this is clicked. */
                <button
                  type="button"
                  onClick={() => setHasActivated(true)}
                  className="absolute inset-0 w-full h-full cursor-pointer group/facade"
                >
                  <img
                    src="/video-poster.jpg"
                    alt=""
                    aria-hidden="true"
                    width={1280}
                    height={720}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover/facade:scale-110">
                      <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                  <span className="absolute bottom-4 left-0 right-0 text-center text-sm font-semibold text-white/90">
                    Watch the demo
                  </span>
                  <span className="sr-only">Play the Locksy demo video</span>
                </button>
              )}

              {/* Custom Video Controls Overlay — only once the real player exists,
                  otherwise its centre play button would sit on top of the facade's. */}
              {hasActivated && (
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
                    }`}
                >


                  {/* Center Play/Pause Button */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={togglePlayPause}
                        className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-2xl pointer-events-auto"
                        aria-label="Play video"
                      >
                        <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Bottom Control Bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* Play/Pause Button */}
                      <button
                        onClick={togglePlayPause}
                        className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 hover:scale-110 pointer-events-auto"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>

                      {/* Volume Button */}
                      <button
                        onClick={toggleMute}
                        className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 hover:scale-110 pointer-events-auto"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Right Side - Fullscreen */}
                    <button
                      onClick={openFullscreen}
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 hover:scale-110 pointer-events-auto"
                      aria-label="Fullscreen"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust Indicators - Full Width */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 mt-10 border-t border-border/50 z-10 relative">
          <div className="flex items-center gap-3 p-4 bg-card/50 dark:bg-card/70 backdrop-blur-sm rounded-xl border border-primary/10 dark:border-primary/20">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl">
              ⭐
            </div>
            <div>
              <div className="font-bold text-foreground">5-Star Rating</div>
              <div className="text-sm text-muted-foreground dark:text-foreground/60">User Verified</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-card/50 dark:bg-card/70 backdrop-blur-sm rounded-xl border border-primary/10 dark:border-primary/20">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-2xl">
              🔒
            </div>
            <div>
              <div className="font-bold text-foreground">Encrypted</div>
              <div className="text-sm text-muted-foreground dark:text-foreground/60">Password-Protected</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-card/50 dark:bg-card/70 backdrop-blur-sm rounded-xl border border-primary/10 dark:border-primary/20">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-2xl">
              📴
            </div>
            <div>
              <div className="font-bold text-foreground">100% Offline</div>
              <div className="text-sm text-muted-foreground dark:text-foreground/60">No Tracking</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-card/50 dark:bg-card/70 backdrop-blur-sm rounded-xl border border-primary/10 dark:border-primary/20">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center text-2xl">
              ✓
            </div>
            <div>
              <div className="font-bold text-foreground">Free Forever</div>
              <div className="text-sm text-muted-foreground dark:text-foreground/60">No Hidden Fees</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
