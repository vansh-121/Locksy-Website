// A dead-simple, fully static "see the difference" section: the SAME browser tab
// shown Without Locksy (everything on screen is readable by anyone nearby) and
// With Locksy (a password lock screen). Rendered entirely on the server — no client
// state — so every word is in the initial HTML (good for readers and for the
// rendered-word-count requirement). Its whole job is to let a first-time,
// non-technical visitor understand "locking a tab" at a glance.

// One row of the fake, exposed inbox shown in the "Without Locksy" mock.
function InboxRow({
  initials,
  color,
  sender,
  subject,
  time,
}: {
  initials: string
  color: string
  sender: string
  subject: string
  time: string
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 border-b border-border/60 last:border-b-0">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 ${color}`}
      >
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-foreground truncate">{sender}</p>
        <p className="text-xs text-muted-foreground truncate">{subject}</p>
      </div>
      <span className="text-[10px] text-muted-foreground flex-shrink-0">{time}</span>
    </div>
  )
}

// The Mac-style window chrome (traffic lights + address bar) both mocks share.
function BrowserChrome({ url, locked }: { url: string; locked: boolean }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-muted/80 border-b border-border">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>
      <div className="flex-1 mx-2 bg-background rounded-md px-3 py-1 text-xs text-muted-foreground border border-border truncate">
        <span aria-hidden="true">{locked ? "🔒" : "🔓"}</span> {url}
      </div>
    </div>
  )
}

export default function SeeItInAction() {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Soft background glow to match the rest of the page */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-80 h-80 bg-primary/6 dark:bg-primary/12 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/5 w-72 h-72 bg-secondary/6 dark:bg-secondary/12 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
            <span aria-hidden="true">👀</span>
            See the difference
          </div>
          <h2 className="section-title">Here's What a Locked Tab Looks Like</h2>
          <p className="section-subtitle">
            Without Locksy, whatever's on your screen is one glance away. With Locksy, it takes
            your password to see — that's the whole idea.
          </p>
        </div>

        {/* Before / arrow / After */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-5 items-center">

          {/* ── WITHOUT LOCKSY ─────────────────────────────────────── */}
          <div className="flex flex-col items-center gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
              <span aria-hidden="true">✕</span> Without Locksy
            </span>

            <div className="w-full max-w-sm rounded-2xl border border-red-500/20 bg-card shadow-xl overflow-hidden">
              <BrowserChrome url="mail.example.com" locked={false} />
              <div className="p-2">
                <InboxRow initials="BA" color="bg-blue-600" sender="Bank of America" subject="Your April e-statement is ready" time="9:24 AM" />
                <InboxRow initials="CH" color="bg-emerald-600" sender="City Health Clinic" subject="Your recent test results" time="8:10 AM" />
                <InboxRow initials="PR" color="bg-violet-600" sender="Payroll" subject="Your latest salary slip" time="Yesterday" />
                <InboxRow initials="RE" color="bg-orange-500" sender="Realtor" subject="Signed mortgage documents" time="Mon" />
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center max-w-xs">
              Anyone who walks by — or sees your shared screen — can read all of it.
            </p>
          </div>

          {/* ── Arrow (points down on mobile, right on desktop) ─────── */}
          <div className="flex lg:flex-col items-center justify-center gap-2">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <svg
                className="w-6 h-6 text-white rotate-90 lg:rotate-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
              One click
            </span>
          </div>

          {/* ── WITH LOCKSY ────────────────────────────────────────── */}
          <div className="flex flex-col items-center gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span aria-hidden="true">✓</span> With Locksy
            </span>

            <div className="w-full max-w-sm rounded-2xl border border-primary/30 bg-card shadow-xl overflow-hidden">
              <BrowserChrome url="mail.example.com · locked" locked={true} />
              <div className="px-6 py-10 flex flex-col items-center gap-5 text-center min-h-[236px] justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                {/* Lock icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>

                <div>
                  <p className="font-bold text-lg text-foreground">This Tab Is Locked</p>
                  <p className="text-sm text-muted-foreground mt-1">Enter your master password to unlock it.</p>
                </div>

                {/* Mock password field + button (visual only) */}
                <div className="w-full space-y-2.5">
                  <div className="w-full flex items-center px-3 py-2.5 rounded-lg border border-border bg-background text-muted-foreground text-lg tracking-[0.3em]">
                    ••••••••
                  </div>
                  <div className="w-full py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold">
                    Unlock
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground">
                  <span aria-hidden="true">🔒</span> Protected by Locksy
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center max-w-xs">
              The page is hidden and encrypted — only your master password brings it back.
            </p>
          </div>
        </div>

        {/* Reassurance footer */}
        <p className="text-center text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mt-14">
          It's not just a cover-up. The tab's contents are locked away until you type your password —
          and they stay locked even if you close the browser or restart your computer.
        </p>
      </div>
    </section>
  )
}
