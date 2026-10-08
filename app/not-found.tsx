import Link from "next/link"
import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
    Home,
    ArrowLeft,
    FileQuestion,
    Wrench,
    Sparkles,
    FileText,
    HelpCircle,
    Compass,
    Search
} from "lucide-react"

export const metadata: Metadata = {
    title: "404 - Page Not Found",
    description: "The page you are looking for does not exist or has been moved. Explore Locksy tab protection and privacy tools.",
    robots: {
        index: false,
        follow: true,
    },
}

const QUICK_LINKS = [
    {
        icon: Wrench,
        title: "Free Security Tools",
        description: "Password generators, entropy checkers & breach scanners.",
        href: "/tools",
        badge: "Free Utilities",
    },
    {
        icon: Sparkles,
        title: "Locksy Pro Pricing",
        description: "One-time $4.99 lifetime upgrade for up to 5 devices.",
        href: "/pricing",
        badge: "Lifetime Access",
    },
    {
        icon: Compass,
        title: "User Guide & Shortcuts",
        description: "Master quick locking, shortcuts, and biometric unlock.",
        href: "/guide",
        badge: "Documentation",
    },
    {
        icon: HelpCircle,
        title: "Contact & Support",
        description: "Direct assistance from the development team.",
        href: "/contact",
        badge: "Get Help",
    },
]

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-accent/30 to-background relative overflow-hidden flex flex-col justify-between">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700 pointer-events-none" />

            <Header />

            <main className="relative flex-1 page-top-offset pb-20 md:pb-28">
                <div className="max-w-5xl mx-auto px-4 md:px-6">
                    {/* Hero Error Section */}
                    <div className="text-center space-y-6 pt-4 md:pt-10">
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 via-purple-500/10 to-secondary/10 border border-primary/20 rounded-full text-sm font-semibold text-primary backdrop-blur-sm shadow-sm">
                            <FileQuestion className="h-4 w-4" />
                            <span>Error 404 • Page Not Found</span>
                        </div>

                        {/* Large 404 Visual Display */}
                        <div className="relative my-6 flex items-center justify-center">
                            <div className="absolute inset-0 max-w-md mx-auto bg-gradient-to-r from-primary/15 via-purple-500/10 to-secondary/15 rounded-full blur-3xl pointer-events-none" />
                            <div className="relative text-[7rem] sm:text-[10rem] md:text-[13rem] font-black leading-none tracking-tight bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary bg-clip-text text-transparent select-none drop-shadow-sm">
                                404
                            </div>
                        </div>

                        {/* Main Headings */}
                        <div className="space-y-3">
                            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
                                This Page Could Not Be{" "}
                                <span className="bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary bg-clip-text text-transparent">
                                    Found
                                </span>
                            </h1>
                            <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
                                The link you clicked may be broken, or the page may have been removed or renamed. Let&apos;s get you back on track.
                            </p>
                        </div>

                        {/* Primary Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary text-white font-bold shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 text-base w-full sm:w-auto"
                            >
                                <Home className="h-5 w-5" />
                                <span>Return to Homepage</span>
                            </Link>
                            <Link
                                href="/tools"
                                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-card border border-border hover:border-primary/40 hover:bg-accent font-bold text-foreground transition-all duration-300 hover:-translate-y-0.5 shadow-sm text-base w-full sm:w-auto"
                            >
                                <Search className="h-5 w-5" />
                                <span>Browse Security Tools</span>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Jump / Popular Destinations */}
                    <div className="mt-16 md:mt-24">
                        <div className="text-center mb-8 space-y-2">
                            <h2 className="text-xl md:text-2xl font-black text-foreground">
                                Popular{" "}
                                <span className="bg-gradient-to-r from-primary via-[oklch(0.50_0.23_282)] to-secondary bg-clip-text text-transparent">
                                    Destinations
                                </span>
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Here are a few places you might have been looking for:
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {QUICK_LINKS.map((link, idx) => {
                                const Icon = link.icon
                                return (
                                    <Link
                                        key={idx}
                                        href={link.href}
                                        className="group rounded-2xl p-5 bg-card/80 backdrop-blur-sm border border-border hover:border-primary/40 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all">
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                                                    {link.badge}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-foreground text-base mb-1 group-hover:text-primary transition-colors">
                                                {link.title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                {link.description}
                                            </p>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-border/50 flex items-center text-xs font-semibold text-primary gap-1">
                                            <span>Visit page</span>
                                            <ArrowLeft className="h-3 w-3 rotate-180 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
