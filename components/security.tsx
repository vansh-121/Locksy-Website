import Link from "next/link"
import { Check, KeyRound, FileX2, Hourglass, ServerOff, ArrowRight } from "lucide-react"
import SectionHeading from "@/components/section-heading"

const GUARANTEES = [
  "No account, email or login",
  "We never see, store or send your browsing data",
  "All password checks happen inside your browser",
  "No master override or admin backdoor",
]

const SPECS = [
  {
    icon: KeyRound,
    title: "PBKDF2-HMAC-SHA256",
    value: "600,000 rounds",
    desc: "Your master password is hashed above OWASP's recommendation, with timing-attack-safe comparison.",
  },
  {
    icon: FileX2,
    title: "Page unloaded on lock",
    value: "Nothing to delete",
    desc: "Locksy navigates the tab away instead of drawing a CSS overlay, so there's no element to remove in DevTools.",
  },
  {
    icon: Hourglass,
    title: "Escalating lockouts",
    value: "Rate limited",
    desc: "Each wrong guess adds a longer delay, which stops automated guessing.",
  },
  {
    icon: ServerOff,
    title: "Local-only storage",
    value: "Works offline",
    desc: "Passwords, settings and intruder photos never leave your device.",
  },
]

export default function Security() {
  return (
    <section id="security" className="relative scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Security"
          title="Privacy you can check for yourself"
          description="Locksy is built so there's nothing to trust but your own browser. Here is exactly how it works."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          {/* Main statement card */}
          <div className="surface relative overflow-hidden p-8 md:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
              style={{ background: "var(--glow)" }}
            />
            <h3 className="relative text-2xl font-semibold leading-snug text-foreground md:text-3xl text-balance">
              Your password never leaves your browser
            </h3>
            <p className="relative mt-4 text-muted-foreground leading-relaxed">
              Locking, unlocking and password checks all run locally. There is no Locksy server holding your data, so there is
              nothing to breach.
            </p>
            <ul className="relative mt-8 space-y-3.5">
              {GUARANTEES.map((g) => (
                <li key={g} className="flex items-start gap-3 text-[15px] text-foreground">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-highlight/15">
                    <Check className="h-3 w-3 text-highlight" aria-hidden="true" />
                  </span>
                  {g}
                </li>
              ))}
            </ul>
            <div className="relative mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/security" className="btn-primary">
                Read the security deep dive <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/privacy-policy" className="btn-secondary">
                Privacy policy
              </Link>
            </div>
          </div>

          {/* Spec cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {SPECS.map(({ icon: Icon, title, value, desc }) => (
              <div key={title} className="surface flex flex-col p-6">
                <Icon className="h-5 w-5 text-highlight" aria-hidden="true" />
                <p className="mt-6 font-display text-xl font-semibold text-foreground">{value}</p>
                <p className="mt-1 text-sm font-medium text-foreground/80">{title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
