import {
  Globe,
  Fingerprint,
  Timer,
  EyeOff,
  ScreenShare,
  Camera,
  Keyboard,
  MousePointerClick,
  Rocket,
  BarChart3,
  MessageSquareText,
  Unlock,
  BellRing,
  ShieldAlert,
  VenetianMask,
  WifiOff,
  Palette,
  UserX,
  ScanEye,
  CalendarClock,
  Lock,
  KeyRound,
  TimerReset,
  AppWindow,
} from "lucide-react"
import SectionHeading from "@/components/section-heading"

const MORE_FEATURES = [
  { icon: ScanEye, title: "Privacy Blur Shield", desc: "Masks passwords, card numbers, emails and OTPs on pages, and blurs the screen when you switch windows." },
  { icon: MousePointerClick, title: "Right-click menus", desc: "Lock a tab, a domain or every tab straight from the context menu, no popup needed." },
  { icon: Rocket, title: "Startup session lock", desc: "Locks restored tabs the moment the browser launches, including ones that load a second later. Pro." },
  { icon: BarChart3, title: "Weekly privacy reports", desc: "A local dashboard of lock history, failed attempts and your security score. Generated offline." },
  { icon: MessageSquareText, title: "Custom lock messages", desc: "Show a personal note, reminder or warning on the lock screen." },
  { icon: Unlock, title: "Unlock all in one go", desc: "Enter your master password once to unlock every protected tab." },
  { icon: BellRing, title: "Intruder alerts", desc: "Browser notifications and on-screen warnings when someone tries to open a locked tab." },
  { icon: ShieldAlert, title: "Brute-force protection", desc: "Repeated wrong guesses trigger escalating delays that stop automated cracking tools." },
  { icon: VenetianMask, title: "Incognito support", desc: "Works in private windows with the same protection." },
  { icon: WifiOff, title: "100% offline", desc: "Your password and settings are stored on your device. Nothing is sent to a server." },
  { icon: Palette, title: "Six themes", desc: "Classic Light and Dark, Ocean, Forest, Ember and Rose, rendered without flicker." },
  { icon: UserX, title: "No account required", desc: "Install, set a password and start locking tabs in about 30 seconds." },
  { icon: KeyRound, title: "Master Recovery Key", desc: "A 16-character key resets a forgotten password, fully offline. Save it when you set up." },
  { icon: TimerReset, title: "Smart Sessions", desc: "Choose how long the popup stays unlocked, up to 60 minutes. Sensitive actions still ask again. Pro." },
  { icon: AppWindow, title: "Window Scope Control", desc: "Make Lock All and Unlock All apply to this window only, or to every open window." },
]

function Card({ className = "", children, id }: { className?: string; children: React.ReactNode; id?: string }) {
  return (
    <div id={id} className={`surface flex flex-col overflow-hidden p-6 md:p-7 scroll-mt-28 ${className}`}>
      {children}
    </div>
  )
}

function CardIcon({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
      <Icon className="h-5 w-5 text-highlight" />
    </span>
  )
}

function CardText({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  )
}

export default function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to keep tabs private"
          description="Lock one tab, a whole website, or every tab at once. Unlock with your password, fingerprint or face."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          {/* Domain lock: wide card with URL rule mock */}
          <Card id="domain-lock" className="md:col-span-4">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-sm">
                <CardIcon icon={Globe} />
                <CardText title="Lock whole websites">
                  Lock entire domains or specific paths like <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">notion.so/work/*</code>.
                  Every new tab that matches a rule locks itself automatically.
                </CardText>
              </div>
              <ul className="w-full space-y-2 md:max-w-[260px]" aria-label="Example lock rules">
                {["mail.google.com", "*.bankofamerica.com", "notion.so/work/*", "web.whatsapp.com"].map((r) => (
                  <li key={r} className="flex items-center justify-between rounded-xl border border-border bg-background px-3 py-2 text-xs">
                    <span className="truncate font-mono text-foreground">{r}</span>
                    <Lock className="h-3.5 w-3.5 flex-shrink-0 text-highlight" aria-hidden="true" />
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Biometrics */}
          <Card id="biometric" className="md:col-span-2">
            <CardIcon icon={Fingerprint} />
            <CardText title="Unlock with your fingerprint">
              Touch ID, Windows Hello, Face ID, Android biometrics or a USB security key. Biometric data never leaves your device.
            </CardText>
          </Card>

          {/* Auto-lock + schedule */}
          <Card className="md:col-span-2">
            <CardIcon icon={Timer} />
            <CardText title="Auto-lock and schedules">
              Lock tabs after 1 to 480 minutes of inactivity, or on a schedule such as work hours or overnight. Video playback
              doesn&apos;t count as idle.
            </CardText>
            <div className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-muted-foreground">
              <CalendarClock className="h-4 w-4 text-highlight" aria-hidden="true" />
              Mon–Fri · 09:00–18:00
            </div>
          </Card>

          {/* Stealth */}
          <Card className="md:col-span-2">
            <CardIcon icon={EyeOff} />
            <CardText title="Stealth mode">
              Hides every sign of Locksy. The badge disappears, notifications go quiet, and locked tabs show a fake error page.
            </CardText>
            <div className="mt-6 rounded-xl border border-border bg-background px-3 py-2.5 font-mono text-[11px] text-muted-foreground">
              This site can&apos;t be reached
              <span className="block text-foreground/70">ERR_CONNECTION_REFUSED</span>
            </div>
          </Card>

          {/* Screen share */}
          <Card className="md:col-span-2">
            <CardIcon icon={ScreenShare} />
            <CardText title="Screen Share Shield">
              Presenting on Meet, Zoom or Teams? Locked tabs, banking, webmail and tab titles get covered so nothing leaks on
              screen.
            </CardText>
          </Card>

          {/* Shortcuts */}
          <Card className="md:col-span-3">
            <CardIcon icon={Keyboard} />
            <CardText title="Keyboard shortcuts">
              Every shortcut can be changed in your browser&apos;s settings. Locked tabs show a lock icon and a live badge count.
            </CardText>
            <dl className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                { keys: ["Alt", "Shift", "9"], label: "Lock this tab" },
                { keys: ["Alt", "Shift", "0"], label: "Open the manager" },
                { keys: ["Alt", "Shift", "8"], label: "Lock all tabs" },
                { keys: ["Alt", "Shift", "7"], label: "Toggle stealth" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2">
                  <dt className="text-xs text-muted-foreground">{s.label}</dt>
                  <dd className="flex gap-1">
                    {s.keys.map((k) => (
                      <kbd key={k} className="kbd">{k}</kbd>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>

          {/* Webcam */}
          <Card className="md:col-span-3">
            <CardIcon icon={Camera} />
            <CardText title="Webcam intruder capture">
              When someone guesses your password wrong, Locksy can take a webcam snapshot. Photos stay on your device, and you can
              review or delete them from the intruder log.
            </CardText>
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5">
              <span className="h-2 w-2 rounded-full bg-red-500" aria-hidden="true" />
              <span className="text-xs text-foreground">3 failed attempts</span>
              <span className="ml-auto text-xs text-muted-foreground">Today, 14:32</span>
            </div>
          </Card>
        </div>

        {/* Everything else */}
        <div className="mt-16">
          <h3 className="text-center text-sm font-medium text-muted-foreground">And a lot more built in</h3>
          <ul className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {MORE_FEATURES.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex gap-4">
                <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-highlight" aria-hidden="true" />
                <div>
                  <p className="text-[15px] font-medium text-foreground">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </li>
            ))}

          </ul>
        </div>
      </div>
    </section>
  )
}
