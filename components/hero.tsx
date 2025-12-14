"use client"

import ProductHuntBadge from "@/components/product-hunt-badge"
import { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
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

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: '6uyd4sN5WiA',
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          disablekb: 1,
          enablejsapi: 1,
        },
        events: {
          onReady: () => {
            setPlayerReady(true)
            playerRef.current.mute()
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

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVideoVisible(true)
            if (playerReady && playerRef.current) {
              playerRef.current.playVideo()
            }
          } else {
            // Pause video when scrolled out of view
            if (playerReady && playerRef.current) {
              playerRef.current.pauseVideo()
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [playerReady])

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute()
        setIsMuted(false)
      } else {
        playerRef.current.mute()
        setIsMuted(true)
      }
    }
  }

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
      }
    }
  }

  const openFullscreen = () => {
    const playerElement = document.getElementById('youtube-player')
    if (playerElement) {
      playerElement.requestFullscreen?.()
    }
  }

  return (
    <section className="relative py-24 md:py-40 overflow-hidden bg-gradient-to-br from-accent via-background to-accent">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-10 z-10">
            {/* Badges */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#keyboard-shortcuts"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm font-bold shadow-lg animate-pulse hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span>⌨️</span>
                NEW: Keyboard Shortcuts
              </a>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                All Chromium Browsers
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-black leading-tight text-foreground">
                Secure Your Tabs with{" "}
                <span className="bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary bg-clip-text text-transparent">
                  Military-Grade
                </span>{" "}
                Protection
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Password-protect any browser tab or lock entire domains with persistent protection. Now with keyboard shortcuts, visual lock indicators, and real-time badge counters. Ultimate privacy, zero compromise.
              </p>
            </div>

            {/* Browser Download Buttons */}
            <div className="space-y-4">
              {/* Primary Browsers - Chrome & Edge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
                {PRIMARY_BROWSERS.map((browser) => (
                  <a
                    key={browser.name}
                    href={browser.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] group"
                  >
                    <span className="flex items-center gap-2 sm:gap-3">
                      <img
                        src={browser.icon}
                        alt={browser.name}
                        className="w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
                      />
                      <span className="flex flex-col items-start">
                        <span className="text-xs text-muted-foreground group-hover:text-white/80 transition-colors">Get it for</span>
                        <span className="font-semibold text-sm sm:text-base text-foreground group-hover:text-white transition-colors">{browser.name}</span>
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              {/* Other Chromium Browsers - All link to Chrome Web Store */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 w-full">
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

              {/* Additional Links - Watch & GitHub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
                <a
                  href="https://www.youtube.com/watch?v=6uyd4sN5WiA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center group flex items-center justify-center"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span className="text-sm sm:text-base">Watch Tutorial</span>
                  </span>
                </a>
                <a
                  href="https://github.com/vansh-121/Secure-Tab-Extension"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center group flex items-center justify-center"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm sm:text-base">View on GitHub</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Product Hunt Badge - Centered */}
            <div className="flex justify-center -mt-2">
              <ProductHuntBadge />
            </div>

            {/* Browser Compatibility Note */}
            <div className="flex items-center justify-center sm:justify-start gap-2 p-3 bg-white/70 backdrop-blur-sm rounded-lg border border-primary/10">
              <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-foreground/80 font-medium">
                Works on all Chromium-based browsers including Arc, Kiwi, Yandex & more
              </p>
            </div>
          </div>

          {/* Right: Logo/Image */}
          <div className="flex justify-center md:justify-end items-start relative md:-mt-80 z-10">
            <div className="relative flex items-center justify-center">
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-3xl opacity-30 animate-pulse" />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/locksy_-_new_logo-removebg-preview-A7nNuNJNkO21eb9DgcS0wIKSIINL9U.png"
                alt="Locksy Extension"
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
              <div
                id="youtube-player"
                className="absolute inset-0 w-full h-full"
              />

              {/* Custom Video Controls Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
              >
                {/* Top Bar - Live Badge */}
                <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
                  {isPlaying && (
                    <div className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      LIVE DEMO
                    </div>
                  )}
                </div>

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
            </div>
          </div>
        </div>

        {/* Trust Indicators - Full Width */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 mt-10 border-t border-border/50 z-10 relative">
          <div className="flex items-center gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-primary/10">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl">
              ⭐
            </div>
            <div>
              <div className="font-bold text-foreground">5-Star Rating</div>
              <div className="text-sm text-muted-foreground">User Verified</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-primary/10">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-2xl">
              🔒
            </div>
            <div>
              <div className="font-bold text-foreground">SHA-256</div>
              <div className="text-sm text-muted-foreground">Encrypted</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-primary/10">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-2xl">
              📴
            </div>
            <div>
              <div className="font-bold text-foreground">100% Offline</div>
              <div className="text-sm text-muted-foreground">No Tracking</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-primary/10">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center text-2xl">
              ✓
            </div>
            <div>
              <div className="font-bold text-foreground">Free Forever</div>
              <div className="text-sm text-muted-foreground">No Hidden Fees</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
