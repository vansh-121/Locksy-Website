import Link from "next/link"
import {
    Blend,
    Camera,
    Clock,
    EyeOff,
    Fingerprint,
    Globe,
    KeyRound,
    LayoutDashboard,
    ShieldAlert,
    ShieldCheck,
    Sparkles,
    Zap,
} from "lucide-react"

import { PRO_CHECKOUT_URL, PRO_PRICE } from "@/lib/pro"

/**
 * Every Pro unlock that maps onto a free-tier limit someone can actually feel,
 * ordered so the `was` column tells its own story: the caps that disappear
 * first, then the caps that get raised, then what free never had at all.
 *
 * Both label and `was` trace to the two lists in components/pricing.tsx — if a
 * free limit changes there, it has to change here. The only Pro entry
 * deliberately left out is Master Recovery Key Backup, because the free tier
 * gets a recovery key too and it isn't an honest differentiator.
 */
const PRO_UNLOCKS = [
    { icon: Globe, label: "Unlimited domain locks", was: "3 on free" },
    { icon: Fingerprint, label: "Unlimited biometric unlocks", was: "5 a day on free" },
    { icon: Camera, label: "Unlimited intruder snapshots", was: "3 on free" },
    { icon: KeyRound, label: "1-click lock & unlock all", was: "3 total uses on free" },
    { icon: Clock, label: "Custom auto-lock timers", was: "10 minutes on free" },
    { icon: Blend, label: "Full privacy blur manager", was: "Basic blur on free" },
    { icon: EyeOff, label: "Stealth-mode disguise", was: "Not on free" },
    { icon: Zap, label: "Startup session lock", was: "Not on free" },
    { icon: ShieldAlert, label: "Custom lock-screen messages", was: "Not on free" },
    { icon: LayoutDashboard, label: "Weekly privacy reports", was: "Not on free" },
]

interface ProUpgradeCardProps {
    /** Small badge above the heading. Override it to answer the page's own context. */
    eyebrow?: string
    /** Adds the lit ring — use when the page has evidence this person wants Pro. */
    highlighted?: boolean
    /** Extra classes on the outer <section> (spacing, borders, background). */
    className?: string
}

/**
 * The $2.99 lifetime offer as a drop-in section.
 *
 * Kept as a server component so /guide (a server page) renders it with zero
 * client JS; the /tools pages import it from inside their client boundary,
 * where it rides along with the CTASection they already ship. The full
 * free-vs-Pro table stays on the homepage (components/pricing.tsx) — this is
 * the short version for pages where the reader is already deep in the product.
 */
export default function ProUpgradeCard({
    eyebrow = "Locksy Pro",
    highlighted = false,
    className = "relative overflow-hidden py-16 md:py-20",
}: ProUpgradeCardProps) {
    return (
        <section className={className}>
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-5xl px-4 md:px-6">
                <div
                    className={`overflow-hidden rounded-[2rem] border bg-card/60 shadow-2xl backdrop-blur-xl transition-all duration-500 ${
                        highlighted
                            ? "border-violet-500/50 shadow-[0_0_60px_rgba(139,92,246,0.2)]"
                            : "border-violet-500/25"
                    }`}
                >
                    <div className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />

                    <div className="grid gap-10 p-8 md:p-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 px-4 py-2 text-sm font-bold text-violet-600 backdrop-blur-md dark:text-violet-400">
                                <Sparkles className="h-4 w-4" />
                                {eyebrow}
                            </div>

                            <h2 className="max-w-md text-3xl font-black tracking-tight md:text-4xl">
                                Everything unlimited, for{" "}
                                <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                                    {PRO_PRICE} once
                                </span>
                            </h2>
                            <p className="max-w-xl text-muted-foreground">
                                Not a subscription. Not a trial. One payment, every limit gone, yours
                                for good.
                            </p>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {PRO_UNLOCKS.map(({ icon: Icon, label, was }) => (
                                    <div key={label} className="flex items-start gap-3">
                                        <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400">
                                            <Icon className="h-3.5 w-3.5" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold leading-snug">{label}</p>
                                            <p className="text-xs text-muted-foreground line-through">{was}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-4 lg:min-w-[240px]">
                            <div className="text-center">
                                <div className="text-6xl font-black tracking-tighter">{PRO_PRICE}</div>
                                <p className="mt-1 text-sm font-bold text-violet-600 dark:text-violet-400">
                                    One-time · Lifetime
                                </p>
                            </div>
                            <a
                                href={PRO_CHECKOUT_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn relative block w-full overflow-hidden rounded-2xl bg-foreground py-4 text-center font-black text-background transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/20 active:scale-[0.98]"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
                                <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover/btn:text-white">
                                    Get Pro
                                    <Zap className="h-5 w-5 animate-pulse" />
                                </span>
                            </a>
                            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <ShieldCheck className="h-4 w-4 flex-shrink-0 text-green-500" />
                                Secure payment via Polar.sh
                            </p>
                            <Link
                                href="/#pricing"
                                className="text-xs font-semibold text-muted-foreground hover:text-primary hover:underline"
                            >
                                Compare free vs Pro
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
