const SecurityRisk = ({ icon, title, description, color, delay }: any) => (
  <div 
    className="group relative"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Glow effect on hover */}
    <div className={`absolute inset-0 ${color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-700 rounded-3xl`} />
    
    <div className="relative h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 transition-all duration-500 hover:border-destructive/30 hover:shadow-xl hover:shadow-destructive/5 hover:-translate-y-2">
      {/* Icon container with custom design */}
      <div className="relative mb-6">
        <div className={`absolute inset-0 ${color} blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${color} p-0.5 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
          <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>

      <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-destructive transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed text-[15px]">
        {description}
      </p>
      
      {/* Corner accent */}
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-destructive/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  </div>
)

export default function ProblemStatement() {
  const securityRisks = [
    { 
      icon: (
        <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: "Banking", 
      description: "Financial accounts and transactions exposed on shared computers", 
      color: "from-emerald-500 to-teal-500",
      delay: 0
    },
    { 
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email", 
      description: "Private conversations and confidential messages at risk", 
      color: "from-blue-500 to-cyan-500",
      delay: 100
    },
    { 
      icon: (
        <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Work", 
      description: "Sensitive documents and company data vulnerable to exposure", 
      color: "from-purple-500 to-pink-500",
      delay: 200
    },
    { 
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      title: "Shopping", 
      description: "Payment methods and purchase history visible to others", 
      color: "from-orange-500 to-red-500",
      delay: 300
    },
    { 
      icon: (
        <svg className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Privacy", 
      description: "Personal browsing activities you'd prefer to keep private", 
      color: "from-indigo-500 to-purple-500",
      delay: 400
    },
    { 
      icon: (
        <svg className="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Family", 
      description: "Shared devices compromise everyone's digital privacy", 
      color: "from-rose-500 to-pink-500",
      delay: 500
    },
  ]

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background via-accent/30 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-destructive/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* PROBLEM SECTION */}
        <div className="mb-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-destructive/5 border border-destructive/20 rounded-full text-sm font-semibold text-destructive backdrop-blur-sm mb-6 shadow-lg shadow-destructive/5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              The Problem
            </div>
            <h2 className="section-title mb-6">
              Ever Worry About Someone<br />Seeing Your Sensitive Tabs?
            </h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              You're not alone. Millions of people share devices and work in public spaces.
              <span className="block mt-2 text-destructive font-medium">Your private information is just one glance away from being exposed.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityRisks.map((risk, idx) => (
              <SecurityRisk key={idx} {...risk} />
            ))}
          </div>
        </div>

        {/* VISUAL DIVIDER - Problem to Solution */}
        <div className="relative flex items-center justify-center my-20">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50"></div>
          </div>
          <div className="relative flex flex-col items-center gap-4 bg-background px-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-[oklch(0.50_0.23_282)] to-secondary flex items-center justify-center shadow-lg shadow-primary/20 animate-bounce">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">The Solution</span>
          </div>
        </div>

        {/* SOLUTION SECTION */}
        <div className="relative group max-w-5xl mx-auto">
          {/* Outer glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
          
          {/* Main card */}
          <div className="relative bg-gradient-to-br from-primary/95 via-[oklch(0.50_0.23_282)] to-secondary/95 rounded-3xl overflow-hidden shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
            
            <div className="relative p-12 md:p-16 text-center">
              {/* Icon with shield */}
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
                  <div className="relative w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
              </div>

              <h3 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
                Locksy Protects Your Privacy
              </h3>
              <p className="text-xl md:text-2xl text-white/95 mb-10 max-w-2xl mx-auto leading-relaxed">
                Lock any tab with a password in seconds. 
                <span className="block mt-2 font-semibold">Simple. Secure. Private.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center flex-wrap">
                <a
                  href="https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden w-full sm:w-auto"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.894 13.185l-1.63 7.394c-.12.543-.435.674-.882.42l-2.433-1.794-1.173 1.13c-.13.13-.238.238-.489.238l.174-2.474 4.498-4.064c.195-.174-.043-.27-.303-.096l-5.56 3.502-2.397-.749c-.52-.163-.532-.52.11-.772l9.38-3.617c.435-.163.815.105.673.772z"/>
                  </svg>
                  <span className="flex-1 text-center sm:flex-initial">Get for Chrome</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="https://addons.mozilla.org/en-US/firefox/addon/locksy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden w-full sm:w-auto"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.824 7.287c.008 0 .004 0 0 0zm-2.8-1.4c.006 0 .003 0 0 0zm16.754 2.161c-.505-1.215-1.53-2.528-2.333-2.943.654 1.283 1.033 2.57 1.177 3.53l.002.02c-1.314-3.278-3.544-4.6-5.366-7.477-.091-.147-.184-.292-.273-.446a3.545 3.545 0 01-.13-.24 2.118 2.118 0 01-.172-.46.03.03 0 00-.027-.03.038.038 0 00-.021 0l-.006.001a.037.037 0 00-.01.005L15.624 0c-2.585 1.515-3.657 4.168-3.932 5.856a6.197 6.197 0 00-2.305.587.297.297 0 00-.147.37c.057.162.24.24.396.17a5.364 5.364 0 012.305-.586c0 .778-.096 1.524-.281 2.224a6.262 6.262 0 00-2.046.087.288.288 0 00-.153.37.265.265 0 00.337.164 5.91 5.91 0 011.996-.076c-.245.566-.539 1.1-.879 1.595a5.19 5.19 0 00-1.77.36.273.273 0 00-.033.508.25.25 0 00.27-.015 4.617 4.617 0 011.77-.36c-2.075 2.716-5.338 3.68-7.674 1.073.496 1.993 2.216 4.23 5.735 4.632.683.078 1.343.07 1.962-.022a8.712 8.712 0 002.861-.81c1.547-.71 2.883-1.79 3.876-3.03a9.177 9.177 0 002.048-5.433 6.61 6.61 0 00-.041-.82c.368.023.744.043 1.127.062L21.778 8a.03.03 0 00.011-.024c0-.007-.002-.01-.005-.014l-.748-.087z"/>
                  </svg>
                  <span className="flex-1 text-center sm:flex-initial">Get for Firefox</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden w-full sm:w-auto"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-.004 17.877a5.882 5.882 0 1 1 0-11.764 5.882 5.882 0 0 1 0 11.764z"/>
                  </svg>
                  <span className="flex-1 text-center sm:flex-initial">Get for Edge</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-10 pt-8 border-t border-white/20">
                <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-medium">4.8/5 Rating</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-white/20" />
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="font-medium">10,000+ Users</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-white/20" />
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="font-medium">100% Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
