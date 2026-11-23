import SectionHeading from "@/components/section-heading"

const STEPS = [
  {
    num: "01",
    title: "Install and set a password",
    desc: "Add Locksy to your browser and create a master password. It takes about 30 seconds.",
  },
  {
    num: "02",
    title: "Lock a tab",
    desc: "Click the Locksy icon and choose Lock Current Tab, or press Alt+Shift+9. The tab locks instantly.",
  },
  {
    num: "03",
    title: "Unlock when you're back",
    desc: "Enter your password or use your fingerprint. Nobody else can open the tab.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="Set up in under a minute"
          description="No account to create and nothing to configure before your first lock."
        />

        <ol className="relative mt-14 grid gap-4 md:grid-cols-3">
          {/* Connecting line on desktop */}
          <div aria-hidden="true" className="absolute left-0 right-0 top-[2.6rem] hidden h-px bg-border md:block" />
          {STEPS.map((s) => (
            <li key={s.num} className="surface relative p-7">
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background font-mono text-xs text-foreground">
                {s.num}
              </span>
              <h3 className="mt-6 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
