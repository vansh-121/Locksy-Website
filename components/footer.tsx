export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-neutral-300 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

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

        <div className="grid md:grid-cols-4 gap-12 mb-16">
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
                  href="https://github.com/vansh-121/Secure-Tab-Extension"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-primary transition-colors flex items-center gap-2 group">
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
                <a href="#faq" className="hover:text-primary transition-colors flex items-center gap-2 group">
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
                <a href="mailto:vansh.sethi98760@gmail.com" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Contact Developer
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
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/vansh-121/Secure-Tab-Extension/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  MIT License
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
              Community
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://github.com/vansh-121/Secure-Tab-Extension"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/vansh-121/Secure-Tab-Extension/stargazers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Star on GitHub ⭐
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-hover:bg-primary transition-colors" />
                  Follow Updates
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Browser Compatibility Section */}
        <div className="mt-16 mb-12 text-center">
          <h4 className="text-sm font-semibold text-neutral-400 mb-4">Compatible with All Chromium Browsers</h4>
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
              <span className="text-lg">🦁</span>
              <span className="text-sm">Brave</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 hover:text-primary transition-colors">
              <span className="text-lg">🎭</span>
              <span className="text-sm">Opera</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 hover:text-primary transition-colors">
              <span className="text-lg">🌊</span>
              <span className="text-sm">Vivaldi</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 hover:text-primary transition-colors">
              <span className="text-lg">🎯</span>
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
              <p className="text-sm text-neutral-400 mb-1">© 2025 Locksy - Tab Protection Extension</p>
              <p className="text-xs text-neutral-500">Made with ❤️ for Privacy & Security</p>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/vansh-121/Secure-Tab-Extension"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-800/50 hover:bg-gradient-to-r hover:from-primary hover:to-secondary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
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
