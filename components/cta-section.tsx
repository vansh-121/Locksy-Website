export default function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-primary via-secondary to-primary">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Protect Your Tabs?</h2>
        <p className="text-xl opacity-95 mb-8">
          Join thousands of users securing their browsing privacy with Locksy. Start protecting your sensitive tabs in
          30 seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Add to Chrome - Free Forever
          </a>
          <a
            href="https://github.com/vansh-121/Secure-Tab-Extension"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition"
          >
            View on GitHub
          </a>
          <a
            href="https://github.com/vansh-121/Locksy/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition"
          >
            Report Issue
          </a>
        </div>

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
