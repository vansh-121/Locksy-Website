import Link from "next/link"
import { Check, X } from "lucide-react"
import SectionHeading from "@/components/section-heading"

const DEVICE_LOCK = [
  { device: "Locks the whole computer to hide one tab", locksy: "Locks only the tabs you choose" },
  { device: "Everything is visible while you're logged in", locksy: "Protects tabs while you keep working" },
  { device: "Interrupts screen sharing, calls and music", locksy: "Everything else keeps running" },
  { device: "Takes 5–10 seconds to lock and unlock", locksy: "One click or one shortcut" },
]

const ROWS = [
  "Lock individual tabs",
  "Auto-lock whole websites",
  "Fingerprint / face unlock",
  "Strong password hashing",
  "Auto-blur sensitive info",
  "Re-lock tabs on browser startup",
  "Hide that tabs are locked",
  "Webcam photo of snoopers",
  "Custom lock screen messages",
  "Weekly privacy reports",
]

function Yes() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-highlight/15" aria-label="Yes">
      <Check className="h-3.5 w-3.5 text-highlight" />
    </span>
  )
}

function No() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted" aria-label="No">
      <X className="h-3.5 w-3.5 text-muted-foreground" />
    </span>
  )
}

export default function Comparison() {
  return (
    <section id="comparison" className="relative scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Why Locksy"
          title="Built for tab-level privacy"
          description="Your operating system's lock screen protects the whole computer. Locksy protects exactly the tabs you need, while you keep working."
        />
        <p className="mt-5 text-center text-sm">
          <Link href="/compare" className="text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground">
            Detailed comparisons, including when you don&apos;t need Locksy
          </Link>
        </p>

        <div className="mt-14 grid items-start gap-4 lg:grid-cols-2">
          {/* Device lock vs Locksy */}
          <div className="surface overflow-hidden">
            <div className="grid grid-cols-2 border-b border-border text-sm">
              <div className="px-5 py-4 text-muted-foreground">Device lock</div>
              <div className="border-l border-border px-5 py-4 font-medium text-foreground">Locksy</div>
            </div>
            {DEVICE_LOCK.map((r) => (
              <div key={r.device} className="grid grid-cols-2 border-b border-border text-sm last:border-b-0">
                <div className="flex gap-2.5 px-5 py-4 text-muted-foreground">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  {r.device}
                </div>
                <div className="flex gap-2.5 border-l border-border px-5 py-4 text-foreground">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-highlight" aria-hidden="true" />
                  {r.locksy}
                </div>
              </div>
            ))}
          </div>

          {/* Feature table */}
          <div className="surface overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="px-5 py-4 text-left font-normal text-muted-foreground">Feature</th>
                  <th scope="col" className="px-3 py-4 text-center font-medium text-foreground">Locksy</th>
                  <th scope="col" className="px-3 py-4 text-center font-normal text-muted-foreground">Browser profiles</th>
                  <th scope="col" className="px-3 py-4 text-center font-normal text-muted-foreground">Tab managers</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row} className="border-b border-border last:border-b-0">
                    <td className="px-5 py-3 text-foreground">{row}</td>
                    <td className="px-3 py-3 text-center"><Yes /></td>
                    <td className="px-3 py-3 text-center"><No /></td>
                    <td className="px-3 py-3 text-center"><No /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
