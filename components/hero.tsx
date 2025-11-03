export default function Hero() {
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
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for All Chromium Browsers
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
                Password-protect any browser tab in one click. Ultimate privacy, zero compromise.
              </p>
            </div>

            {/* CTAs - All 4 buttons in one container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
              <a
                href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] group"
              >
                <span className="flex items-center gap-2 sm:gap-3">
                  <img
                    src="/browsers/chrome.png"
                    alt="Google Chrome"
                    className="w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
                  />
                  <span className="flex flex-col items-start">
                    <span className="text-xs text-muted-foreground group-hover:text-white/80 transition-colors">Get it for</span>
                    <span className="font-semibold text-sm sm:text-base text-foreground group-hover:text-white transition-colors">Google Chrome</span>
                  </span>
                </span>
              </a>
              <a
                href="https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] group"
              >
                <span className="flex items-center gap-2 sm:gap-3">
                  <img
                    src="/browsers/edge.png"
                    alt="Microsoft Edge"
                    className="w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
                  />
                  <span className="flex flex-col items-start">
                    <span className="text-xs text-muted-foreground group-hover:text-white/80 transition-colors">Get it for</span>
                    <span className="font-semibold text-sm sm:text-base text-foreground group-hover:text-white transition-colors">Microsoft Edge</span>
                  </span>
                </span>
              </a>
              <a
                href="https://www.youtube.com/watch?v=C99yuKTqEFA"
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

            {/* Browser Compatibility Note */}
            <div className="flex items-center justify-center sm:justify-start gap-2 p-3 bg-white/70 backdrop-blur-sm rounded-lg border border-primary/10">
              <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-foreground/80 font-medium">
                Also compatible with Brave, Opera, Comet, Arc & all Chromium-based browsers
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
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20 bg-black">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/C99yuKTqEFA"
                title="Locksy Extension Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
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
