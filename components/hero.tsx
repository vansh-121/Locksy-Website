"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const PRIMARY_BROWSERS = [
  { name: "Google Chrome", icon: "/browsers/chrome.png", url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim" },
  { name: "Microsoft Edge", icon: "/browsers/edge.png", url: "https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn" },
  { name: "Mozilla Firefox", icon: "/browsers/firefox.png", url: "https://addons.mozilla.org/en-US/firefox/addon/locksy/" },
]

const SECONDARY_BROWSERS = [
  { name: "Brave", icon: "/browsers/brave.png", url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim" },
  { name: "Opera", icon: "/browsers/opera.png", url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim" },
  { name: "Vivaldi", icon: "/browsers/vivaldi.png", url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim" },
  { name: "Comet", icon: "/browsers/comet.png", url: "https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim" },
]

const VIDEO_ID = "6uyd4sN5WiA"

declare global { interface Window { YT: any; onYouTubeIframeAPIReady?: () => void } }

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)
  const [hasActivated, setHasActivated] = useState(false)
  const [showBrowsers, setShowBrowsers] = useState(false)

  useEffect(() => {
    if (!hasActivated) return
    let cancelled = false
    const createPlayer = () => {
      if (cancelled || !window.YT?.Player || !document.getElementById("youtube-player")) return
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: VIDEO_ID,
        host: "https://www.youtube-nocookie.com",
        playerVars: { autoplay: 1, mute: 1, controls: 0, modestbranding: 1, rel: 0, iv_load_policy: 3, disablekb: 1, enablejsapi: 1, playsinline: 1 },
        events: {
          onReady: (event: any) => { playerRef.current = event.target; setPlayerReady(true); event.target.mute(); event.target.playVideo(); const frame = event.target.getIframe?.(); if (frame && !frame.title) frame.title = "Locksy demo video" },
          onStateChange: (event: any) => { if (event.data === window.YT.PlayerState.PLAYING) setIsPlaying(true); if (event.data === window.YT.PlayerState.PAUSED) setIsPlaying(false) },
        },
      })
    }
    if (window.YT?.Player) createPlayer()
    else {
      window.onYouTubeIframeAPIReady = createPlayer
      const src = "https://www.youtube.com/iframe_api"
      if (!document.querySelector(`script[src="${src}"]`)) { const tag = document.createElement("script"); tag.src = src; tag.async = true; document.head.appendChild(tag) }
    }
    return () => { cancelled = true; if (window.onYouTubeIframeAPIReady === createPlayer) window.onYouTubeIframeAPIReady = undefined; if (typeof playerRef.current?.destroy === "function") playerRef.current.destroy(); playerRef.current = null; setPlayerReady(false); setIsPlaying(false) }
  }, [hasActivated])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setIsVideoVisible(true); else if (playerReady && typeof playerRef.current?.pauseVideo === "function") playerRef.current.pauseVideo() }), { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [playerReady])

  const withPlayer = (method: string, fn: (player: any) => void) => { const player = playerRef.current; if (playerReady && typeof player?.[method] === "function") fn(player) }
  const togglePlayPause = () => { if (!hasActivated) return setHasActivated(true); withPlayer(isPlaying ? "pauseVideo" : "playVideo", (p) => isPlaying ? p.pauseVideo() : p.playVideo()) }
  const toggleMute = () => { withPlayer(isMuted ? "unMute" : "mute", (p) => { if (isMuted) { p.unMute(); setIsMuted(false) } else { p.mute(); setIsMuted(true) } }) }
  const openFullscreen = () => document.getElementById("youtube-player")?.requestFullscreen?.()

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-br from-accent via-background to-accent">
      <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl animate-pulse" /><div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700" /></div>
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-primary" /></span>All Major Browsers</div>
            <div className="space-y-5">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-foreground"><span className="bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary dark:from-primary dark:via-[oklch(0.82_0.22_282)] dark:to-secondary bg-clip-text text-transparent">Keep your private tabs private.</span></h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">Locksy password-protects any browser tab — or a whole website — in one click. Free, works offline, and no account is needed.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">{PRIMARY_BROWSERS.map((browser) => <a key={browser.name} href={browser.url} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center justify-center gap-2 px-4 py-3.5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 group"><img src={browser.icon} alt={browser.name} className="w-7 h-7 object-contain" /><span className="font-semibold text-sm text-foreground group-hover:text-white transition-colors">{browser.name}</span></a>)}</div>
            <div className="relative"><button type="button" onClick={() => setShowBrowsers(!showBrowsers)} className="btn-secondary inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold">More browsers<svg className={`w-4 h-4 transition-transform ${showBrowsers ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" /></svg></button>{showBrowsers && <div className="absolute left-0 mt-2 z-20 w-full sm:w-80 grid grid-cols-2 gap-2 p-3 bg-card border border-border rounded-xl shadow-2xl">{SECONDARY_BROWSERS.map((browser) => <a key={browser.name} href={browser.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors"><img src={browser.icon} alt={browser.name} className="w-6 h-6 object-contain" /><span className="text-sm font-semibold">{browser.name}</span></a>)}</div>}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2"><div className="p-4 bg-card/60 rounded-xl border border-primary/10"><div className="text-xl mb-1">⭐</div><div className="font-bold text-foreground text-sm">5-Star Rating</div><div className="text-xs text-muted-foreground">User Verified</div></div><div className="p-4 bg-card/60 rounded-xl border border-primary/10"><div className="text-xl mb-1">🔒</div><div className="font-bold text-foreground text-sm">Encrypted</div><div className="text-xs text-muted-foreground">Strong protection</div></div><div className="p-4 bg-card/60 rounded-xl border border-primary/10"><div className="text-xl mb-1">📴</div><div className="font-bold text-foreground text-sm">100% Offline</div><div className="text-xs text-muted-foreground">No tracking</div></div><div className="p-4 bg-card/60 rounded-xl border border-primary/10"><div className="text-xl mb-1">✓</div><div className="font-bold text-foreground text-sm">Free Forever</div><div className="text-xs text-muted-foreground">No hidden fees</div></div></div>
          </div>
          <div className="flex justify-center md:justify-end relative z-10"><div className="relative flex items-center justify-center"><div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-3xl opacity-30 dark:opacity-50 animate-pulse" /><Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/locksy_-_new_logo-removebg-preview-A7nNuNJNkO21eb9DgcS0wIKSIINL9U.png" alt="Locksy Extension" width={384} height={384} priority className="relative h-56 sm:h-72 md:h-80 lg:h-96 w-auto drop-shadow-2xl" /></div></div>
        </div>
        <div className="mt-16 md:mt-20 z-10 relative"><div className="text-center mb-8"><h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">See Locksy in Action</h2><p className="text-lg text-muted-foreground">Watch how easy it is to protect your browser tabs</p></div><div ref={containerRef} className="max-w-4xl mx-auto"><div className={`relative aspect-video rounded-2xl overflow-hidden bg-black transition-all duration-1000 ${isVideoVisible ? "opacity-100 scale-100 shadow-[0_0_60px_rgba(139,92,246,0.4)]" : "opacity-0 scale-95"}`} onMouseEnter={() => setShowControls(true)} onMouseLeave={() => setShowControls(false)}>{hasActivated ? <div id="youtube-player" className="absolute inset-0 w-full h-full" /> : <button type="button" onClick={() => setHasActivated(true)} className="absolute inset-0 w-full h-full cursor-pointer group/facade"><img src="/video-poster.jpg" alt="" aria-hidden="true" width={1280} height={720} className="absolute inset-0 w-full h-full object-cover" /><span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" /><span className="absolute inset-0 flex items-center justify-center"><span className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center shadow-2xl transition-transform group-hover/facade:scale-110"><svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span></span><span className="absolute bottom-4 left-0 right-0 text-center text-sm font-semibold text-white/90">Watch the demo</span></button>}{hasActivated && <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity ${showControls || !isPlaying ? "opacity-100" : "opacity-0"}`}>{!isPlaying && <div className="absolute inset-0 flex items-center justify-center"><button onClick={togglePlayPause} className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center shadow-2xl pointer-events-auto" aria-label="Play video"><span className="text-3xl">▶</span></button></div>}<div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between"><div className="flex items-center gap-3"><button onClick={togglePlayPause} className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center pointer-events-auto" aria-label={isPlaying ? "Pause" : "Play"}>{isPlaying ? "Ⅱ" : "▶"}</button><button onClick={toggleMute} className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center pointer-events-auto" aria-label={isMuted ? "Unmute" : "Mute"}>{isMuted ? "🔇" : "🔊"}</button></div><button onClick={openFullscreen} className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center pointer-events-auto" aria-label="Fullscreen">⛶</button></div></div>}</div></div></div>
      </div>
    </section>
  )
}
