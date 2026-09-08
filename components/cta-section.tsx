import Link from "next/dist/client/link";

export default function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-primary via-secondary to-primary">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Protect Your Tabs?</h2>
        <p className="text-xl opacity-95 mb-8">Join thousands of users securing their browsing privacy with Locksy. Start protecting your sensitive tabs in 30 seconds.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center mb-8 max-w-3xl mx-auto">
          <a href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim" target="_blank" rel="noopener noreferrer" className="w-full px-5 py-3 bg-white text-primary-on-light font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"><img src="/browsers/chrome.png" alt="Chrome" className="w-5 h-5 flex-shrink-0" />Get for Chrome</a>
          <a href="https://addons.mozilla.org/en-US/firefox/addon/locksy/" target="_blank" rel="noopener noreferrer" className="w-full px-5 py-3 bg-white text-primary-on-light font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"><img src="/browsers/firefox.png" alt="Firefox" className="w-5 h-5 flex-shrink-0" />Get for Firefox</a>
          <a href="https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn" target="_blank" rel="noopener noreferrer" className="w-full px-5 py-3 bg-white text-primary-on-light font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"><img src="/browsers/edge.png" alt="Edge" className="w-5 h-5 flex-shrink-0" />Get for Edge</a>
          <Link href="/contact" className="w-full px-5 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition text-center">Contact Support</Link>
          <a href="https://github.com/sponsors/vansh-121" target="_blank" rel="noopener noreferrer" className="w-full px-5 py-3 bg-white text-primary-on-light font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 text-center inline-flex items-center justify-center gap-2"><span aria-hidden="true">♥</span>Sponsor Project</a>
          <Link href="/privacy-policy" className="w-full px-5 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition text-center">Privacy Policy</Link>
        </div>
        <div className="max-w-3xl mx-auto mb-8 rounded-xl border border-white/20 bg-white/10 p-4 text-sm opacity-95">
          <p className="font-semibold mb-1">Help bring Locksy to Apple Safari</p>
          <p>Support the project to help cover the $99/year Apple fee for Safari distribution.</p>
        </div>
        <p className="text-sm opacity-80 mb-8">Works on Firefox, Chrome, Edge, Brave, Opera, Comet, Vivaldi, Arc & more</p>
        <div className="grid md:grid-cols-4 gap-4 text-sm"><div>✓ Install in 30 seconds</div><div>✓ No credit card needed</div><div>✓ No account required</div><div>✓ 100% privacy guaranteed</div></div>
      </div>
    </section>
  )
}
