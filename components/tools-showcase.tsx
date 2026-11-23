import Link from "next/link"
import { ArrowUpRight, KeyRound, Shuffle, ScanSearch, MailWarning } from "lucide-react"
import SectionHeading from "@/components/section-heading"

const TOOLS = [
  {
    title: "Password strength checker",
    description: "See how strong a password is and roughly how long it would take to crack.",
    icon: KeyRound,
    url: "/tools/password-strength-checker",
  },
  {
    title: "Password generator",
    description: "Create strong, random passwords with the length and characters you choose.",
    icon: Shuffle,
    url: "/tools/password-generator",
  },
  {
    title: "Browser privacy score",
    description: "Check your browser for common privacy leaks and how easily you can be tracked.",
    icon: ScanSearch,
    url: "/tools/browser-privacy-score",
  },
  {
    title: "Email breach checker",
    description: "Find out whether your email address appears in known data breaches.",
    icon: MailWarning,
    url: "/tools/email-breach-checker",
  },
]

export default function ToolsShowcase() {
  return (
    <section className="relative py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Free tools"
            title="Free security tools"
            description="No sign-up. Everything runs in your browser and nothing you type is stored."
          />
          <Link href="/tools" className="btn-secondary h-10 flex-shrink-0 px-5">
            All tools <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map(({ title, description, icon: Icon, url }) => (
            <Link key={url} href={url} className="surface group flex flex-col p-6 transition-colors hover:border-foreground/20">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                  <Icon className="h-5 w-5 text-highlight" aria-hidden="true" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <h3 className="mt-6 text-base font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
