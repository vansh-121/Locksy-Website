// Static "see the difference" section: the same browser tab without Locksy
// (readable by anyone nearby) and with Locksy (a password lock screen).
// Server-rendered, so every word is in the initial HTML.

import { Lock, Fingerprint, Search, ArrowRight } from "lucide-react"
import SectionHeading from "@/components/section-heading"

function InboxRow({ initials, sender, subject, time }: { initials: string; sender: string; subject: string; time: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-foreground">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-foreground">{sender}</p>
        <p className="truncate text-xs text-muted-foreground">{subject}</p>
      </div>
      <span className="flex-shrink-0 text-[10px] text-muted-foreground">{time}</span>
    </div>
  )
}

function BrowserChrome({ url, locked }: { url: string; locked: boolean }) {
  return (
    <div className="flex items-center gap-3 border-b border-border px-4 py-3">
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
      </div>
      <div className="flex flex-1 items-center gap-1.5 truncate rounded-full bg-muted px-3 py-1 text-[11px] text-muted-foreground">
        {locked && <Lock className="h-3 w-3 text-highlight" aria-hidden="true" />}
        {url}
      </div>
    </div>
  )
}

export default function SeeItInAction() {
  return (
    <section id="see-it-in-action" className="relative scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="See the difference"
          title="Here's what a locked tab looks like"
          description="Without Locksy, whatever is on your screen is one glance away. With Locksy, it takes your password or fingerprint to see it."
        />

        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
          {/* Without */}
          <figure className="surface flex flex-col overflow-hidden">
            <figcaption className="flex items-center justify-between px-5 pt-5 pb-4">
              <span className="text-sm font-medium text-foreground">Without Locksy</span>
              <span className="rounded-full border border-red-500/25 bg-red-500/10 px-2.5 py-0.5 text-[11px] font-medium text-red-600 dark:text-red-400">
                Visible to anyone
              </span>
            </figcaption>
            <div className="mx-5 mb-5 flex h-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-background">
              <BrowserChrome url="mail.example.com" locked={false} />
              <div className="flex items-center gap-2 border-b border-border px-4 py-2 text-[11px] text-muted-foreground">
                <Search className="h-3.5 w-3.5" aria-hidden="true" />
                Search private mail…
              </div>
              <div className="flex-1 divide-y divide-border overflow-hidden">
                <InboxRow initials="BA" sender="Bank of America" subject="Your April e-statement is ready" time="9:24 AM" />
                <InboxRow initials="CH" sender="City Health Clinic" subject="Your recent test results" time="8:10 AM" />
                <InboxRow initials="PR" sender="Payroll & HR" subject="Your latest salary slip & bonus" time="Yesterday" />
                <InboxRow initials="RE" sender="Realtor" subject="Signed mortgage & wire details" time="Mon" />
                <InboxRow initials="TX" sender="IRS Tax Center" subject="Tax refund deposit scheduled" time="Sun" />
                <InboxRow initials="PW" sender="Account Security" subject="New 2FA backup codes generated" time="Oct 12" />
              </div>
            </div>
            <p className="px-5 pb-6 text-sm text-muted-foreground">
              Anyone who walks by, or sees your shared screen, can read all of it.
            </p>
          </figure>

          {/* Divider */}
          <div className="flex items-center justify-center lg:flex-col" aria-hidden="true">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground">
              <ArrowRight className="h-4 w-4 rotate-90 lg:rotate-0" />
            </span>
          </div>

          {/* With */}
          <figure className="surface flex flex-col overflow-hidden">
            <figcaption className="flex items-center justify-between px-5 pt-5 pb-4">
              <span className="text-sm font-medium text-foreground">With Locksy</span>
              <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                Locked in one click
              </span>
            </figcaption>
            <div className="mx-5 mb-5 flex h-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-background">
              <BrowserChrome url="mail.example.com" locked={true} />
              <div
                className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center"
                style={{ background: "radial-gradient(70% 60% at 50% 40%, var(--glow), transparent 70%)" }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card">
                  <Lock className="h-6 w-6 text-highlight" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-foreground">This tab is locked</p>
                  <p className="mt-1 text-sm text-muted-foreground">Enter your master password to unlock it.</p>
                </div>
                <div className="w-full max-w-[260px] space-y-2.5" aria-hidden="true">
                  <div className="flex h-10 items-center justify-center rounded-full border border-border bg-card text-lg tracking-[0.3em] text-muted-foreground">
                    ••••••••
                  </div>
                  <div className="flex gap-2">
                    <div className="flex h-10 flex-1 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background">
                      Unlock
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card">
                      <Fingerprint className="h-4 w-4 text-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="px-5 pb-6 text-sm text-muted-foreground">
              The page is unloaded and hidden. Only your password or fingerprint brings it back.
            </p>
          </figure>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground md:text-base">
          It isn&apos;t a cover you can delete in DevTools. The tab&apos;s contents stay locked until you
          unlock them, even if you close the browser or restart your computer.
        </p>
      </div>
    </section>
  )
}
