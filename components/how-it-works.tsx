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
        </div>
      </div>
    </section>
  )
}
