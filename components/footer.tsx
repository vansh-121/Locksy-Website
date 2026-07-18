export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-neutral-300 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      {/* Animated glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Logo and Description */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/locksy_-_new_logo-removebg-preview-A7nNuNJNkO21eb9DgcS0wIKSIINL9U.png"
              alt="Locksy"
              className="h-12 w-auto"
            />
            <span className="font-black text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Locksy
            </span>
          </div>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Military-grade tab protection for everyone. Secure your sensitive information with just one click.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Product */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
              Product
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Chrome Web Store
                </a>
              </li>
              <li>
                <a
                  href="https://addons.mozilla.org/en-US/firefox/addon/locksy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Firefox Add-ons
                </a>
              </li>
              <li>
                <a
                  href="https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Edge Add-ons
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=6uyd4sN5WiA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Watch Demo Video
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  About Locksy
                </a>
              </li>
              <li>
                <a href="/#features" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
              Help & Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/#faq" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/vansh-121/Locksy/issues/new?template=bug_report.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Report Issue
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/vansh-121/Locksy/issues/new?template=feature_request.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Request Feature
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/vansh-121/Locksy/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Discussions
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Support Form
                </a>
              </li>
              <li>
                <a href="mailto:vansh.sethi98760@gmail.com" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Contact Developer
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/terms-of-service" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/disclaimer" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="/cookie-policy" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/vansh-121/Locksy/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Browser Compatibility Section */}
        <div className="mt-16 mb-12 text-center">
          <h4 className="text-sm font-semibold text-neutral-400 mb-4">Compatible with All Major Browsers</h4>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-neutral-400 hover:text-primary transition-colors">
              <img src="/browsers/chrome.png" alt="Chrome" className="w-6 h-6 opacity-70" />
              <span className="text-sm">Chrome</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 hover:text-primary transition-colors">
              <img src="/browsers/edge.png" alt="Edge" className="w-6 h-6 opacity-70" />
              <span className="text-sm">Edge</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 hover:text-primary transition-colors">
              <img src="/browsers/brave.png" alt="Brave" className="w-6 h-6 opacity-70" />
              <span className="text-sm">Brave</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 hover:text-primary transition-colors">
              <img src="/browsers/opera.png" alt="Opera" className="w-6 h-6 opacity-70" />
              <span className="text-sm">Opera</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 hover:text-primary transition-colors">
              <img src="/browsers/vivaldi.png" alt="Vivaldi" className="w-6 h-6 opacity-70" />
              <span className="text-sm">Vivaldi</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 hover:text-primary transition-colors">
              <img src="/browsers/arc.png" alt="Arc" className="w-6 h-6 opacity-70" />
              <span className="text-sm">Arc</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400">
              <span className="text-sm">+ More</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-800/50 pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm text-neutral-400 mb-1">© 2025–2026 Locksy - Tab Protection Extension</p>
              <p className="text-xs text-neutral-500">Made with ❤️ for Privacy & Security</p>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://www.youtube.com/watch?v=6uyd4sN5WiA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-800/50 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                title="Watch Demo Video"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-neutral-800/30">
            <p className="text-sm text-neutral-500 italic">"Security is not a feature, it's a necessity."</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
