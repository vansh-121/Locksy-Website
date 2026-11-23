import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, ArrowUpRight, Wrench, Sparkles, Compass, HelpCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist or has been moved. Explore Locksy tab protection and privacy tools.",
  robots: { index: false, follow: true },
}

const QUICK_LINKS = [
  { icon: Wrench, title: "Free security tools", description: "Password generator, strength checker and breach scanner.", href: "/tools" },
  { icon: Sparkles, title: "Pricing", description: "Free plan, or Pro as a one-time $4.99 lifetime licence.", href: "/pricing" },
  { icon: Compass, title: "User guide", description: "Locking, shortcuts and biometric unlock, step by step.", href: "/guide" },
  { icon: HelpCircle, title: "Contact support", description: "Get help directly from the developer.", href: "/contact" },
]

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col" suppressHydrationWarning>
      <Header />

      <main className="page-top-offset relative flex-1 overflow-hidden pb-20 md:pb-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_10%,black,transparent)]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center">
            <p className="font-mono text-sm text-muted-foreground">Error 404</p>
            <p
              aria-hidden="true"
              className="mt-4 select-none font-display text-[7rem] font-semibold leading-none tracking-tighter text-foreground/10 sm:text-[10rem]"
            >
              404
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground md:text-5xl text-balance">This page doesn&apos;t exist</h1>
            <p className="mx-auto mt-5 max-w-lg text-muted-foreground md:text-lg">
              The link may be broken, or the page may have moved. Try one of these instead.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/" className="btn-primary w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4" />
                Back to homepage
              </Link>
              <Link href="/blog" className="btn-secondary w-full sm:w-auto">
                Read the blog
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
            {QUICK_LINKS.map(({ icon: Icon, title, description, href }) => (
              <Link key={href} href={href} className="surface group flex flex-col p-6 transition-colors hover:border-foreground/20">
                <span className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-highlight" aria-hidden="true" />
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </span>
                <span className="mt-6 text-[15px] font-medium text-foreground">{title}</span>
                <span className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
