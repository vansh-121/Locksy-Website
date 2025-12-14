export default function HowItWorks() {
  const steps = [
    {
      num: 1,
      title: "Install & Set Password",
      desc: "Add Locksy to your browser and create your master password in 30 seconds.",
      icon: "🚀",
    },
    {
      num: 2,
      title: "Click & Lock",
      desc: 'Click the Locksy icon and hit "Lock Current Tab". Your tab is instantly secured.',
      icon: "🔒",
    },
    {
      num: 3,
      title: "Password-Protected",
      desc: "Enter your master password to regain access. Only you can unlock your tabs.",
      icon: "🔓",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="section-title">Get Started in 3 Simple Steps</h2>
        <p className="section-subtitle">Start protecting your sensitive tabs right now.</p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="bg-gradient-to-br from-primary to-secondary text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-neutral-600">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            Get for Chrome
          </a>
          <a
            href="https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            Get for Edge
          </a>
          <a
            href="https://www.youtube.com/watch?v=6uyd4sN5WiA"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Watch Tutorial
          </a>
        </div>
      </div>
    </section>
  )
}
