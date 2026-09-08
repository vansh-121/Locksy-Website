import { Key, Clock, EyeOff, MousePointer2, Shield, Camera, BarChart3, Rocket, Palette, Fingerprint } from "lucide-react"

const updates = [
  {
    version: "v3.4.0",
    icon: <Key className="w-4 h-4" />,
    title: "Master Recovery Key",
    description: "Create a 16-character offline emergency recovery key, copy it or export it as a text file, and use it from Forgot Password to start an emergency reset.",
  },
  {
    version: "v3.4.0 Pro",
    icon: <Clock className="w-4 h-4" />,
    title: "Smart Sessions",
    description: "Stay signed in between popup opens while sensitive actions still ask for your password or biometric. Choose Strict through 60 minutes, including a 10-minute default.",
  },
  {
    version: "v3.1.0",
    icon: <EyeOff className="w-4 h-4" />,
    title: "Privacy Blur Manager",
    description: "Choose Light, Medium, High, or Solid blur, target sensitive fields, automatically protect banking, webmail, and password-manager sites, and whitelist trusted domains.",
  },
  {
    version: "v3.0.0",
    icon: <Palette className="w-4 h-4" />,
    title: "Redesigned Locksy Experience",
    description: "A refreshed dashboard and interface makes Locksy easier to navigate while keeping its existing protection tools in one place.",
  },
  {
    version: "v2.5.0",
    icon: <MousePointer2 className="w-4 h-4" />,
    title: "Right-Click Controls",
    description: "Lock a tab, a whole domain, all tabs, or toggle Stealth Mode from the right-click menu. It works on pages, links, images, and selected text.",
  },
  {
    version: "v2.5.0",
    icon: <Shield className="w-4 h-4" />,
    title: "Stealth Mode",
    description: "Hide the lock badge and notifications and disguise locked tabs as a browser error page. Toggle from the popup, Alt+Shift+7, or right-click; the preference survives restarts and updates.",
  },
  {
    version: "v2.5.0",
    icon: <Fingerprint className="w-4 h-4" />,
    title: "Biometric & Security-Key Unlock",
    description: "Unlock with Windows Hello, Touch ID, Face ID, Android biometrics, or USB security keys. Biometric data stays on your device, with your master password as a fallback.",
  },
  {
    version: "v3.0.0",
    icon: <Camera className="w-4 h-4" />,
    title: "Intruder Alerts & Webcam Capture",
    description: "Failed unlock attempts can trigger browser warnings and local webcam snapshots from the third failed attempt onward, with an offline log for reviewing and deleting captures.",
  },
  {
    version: "v3.0.0",
    icon: <BarChart3 className="w-4 h-4" />,
    title: "Weekly Privacy Reports",
    description: "Review local locks, failed snooper attempts, password strength, and a security health score over the last 7 days in an offline dashboard.",
  },
  {
    version: "v3.0.0",
    icon: <Rocket className="w-4 h-4" />,
    title: "Startup Lock",
    description: "Automatically protect tabs restored when your browser starts, including pages that finish restoring shortly after launch. Requires Locksy Pro.",
  },
  {
    version: "v2.5.0",
    icon: <Palette className="w-4 h-4" />,
    title: "Light & Dark Themes",
    description: "Switch between light and dark themes from the popup header. The choice stays in sync across Locksy pages and the lock screen.",
  },
]

export default function WhatsNew() {
  return (
    <section id="whats-new" className="py-20 md:py-24 bg-gradient-to-b from-background via-accent/20 to-background border-y border-border/40">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">Recently added to Locksy</h2>
          <p className="section-subtitle">A quick look at recent improvements, with the details kept right here on the page.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {updates.map((update, index) => (
            <article key={`${update.version}-${update.title}-${index}`} className="feature-card h-full p-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                  {update.icon}
                  {update.version}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{update.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{update.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
