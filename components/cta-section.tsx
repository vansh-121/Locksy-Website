import Link from "next/dist/client/link";

export default function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-primary via-secondary to-primary">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Protect Your Tabs?</h2>
        <p className="text-xl opacity-95 mb-8">
          Join thousands of users securing their browsing privacy with Locksy. Start protecting your sensitive tabs in
          30 seconds.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center mb-8 max-w-3xl mx-auto">
          <a
            href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-5 py-3 bg-white text-primary font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 text-center"
          >
            Get for Chrome
          </a>
          <a
            href="https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-5 py-3 bg-white text-primary font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 text-center"
          >
            Get for Edge
          </a>
          <a
            href="https://www.youtube.com/watch?v=6uyd4sN5WiA"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-5 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition inline-flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Watch Demo
          </a>
          <a
            href="https://github.com/vansh-121/Secure-Tab-Extension"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-5 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition text-center"
          >
            View on GitHub
          </a>
          <a
            href="https://github.com/vansh-121/Locksy/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-5 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition text-center"
          >
            Report Issue
          </a>
          <Link
            href="/privacy-policy"
            className="w-full px-5 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition text-center"
          >
            Privacy Policy
          </Link>
        </div>

        <p className="text-sm opacity-80 mb-8">
          Works on Firefox, Chrome, Edge, Brave, Opera, Comet, Vivaldi, Arc & more
        </p>

        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div>✓ Install in 30 seconds</div>
          <div>✓ No credit card needed</div>
          <div>✓ No account required</div>
          <div>✓ 100% privacy guaranteed</div>
        </div>
      </div>
    </section>
  )
}
