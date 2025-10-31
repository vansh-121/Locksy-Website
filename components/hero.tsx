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
              Now Available on Chrome Web Store
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

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] p-2 border border-primary/10"
              >
                <img
                  src="https://developer.chrome.com/static/docs/webstore/branding/image/YT2Grfi9vEBa2wAPzhWa.png"
                  alt="Available in the Chrome Web Store"
                  className="h-14 w-auto"
                />
              </a>
              <a
                href="https://github.com/vansh-121/Secure-Tab-Extension"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-center group flex items-center justify-center"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  View on GitHub
                </span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4 pt-10 border-t border-border/50">
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

          {/* Right: Logo/Image */}
          <div className="flex justify-center md:justify-end items-start relative md:-mt-80 z-10">
            <div className="relative flex items-center justify-center">
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-3xl opacity-30 animate-pulse" />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/locksy_-_new_logo-removebg-preview-A7nNuNJNkO21eb9DgcS0wIKSIINL9U.png"
                alt="Locksy Extension"
                className="relative h-96 w-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
