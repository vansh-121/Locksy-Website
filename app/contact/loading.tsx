import { Skeleton } from "@/components/ui/skeleton"

export default function ContactLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-accent/30 to-background relative overflow-hidden">
            {/* Background decoration - matches actual page */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />

            {/* Header Skeleton - Matches actual header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex items-center justify-between gap-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                        <Skeleton className="h-10 md:h-12 w-10 md:w-12" />
                        <Skeleton className="h-6 md:h-7 w-20 md:w-24" />
                    </div>
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-10">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-4 w-16 xl:w-20" />
                        ))}
                    </div>
                    {/* CTA Button */}
                    <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
                        <Skeleton className="h-10 xl:h-12 w-28 xl:w-32 rounded-xl" />
                        <Skeleton className="h-10 xl:h-12 w-32 xl:w-40 rounded-xl" />
                    </div>
                    {/* Mobile Menu Toggle */}
                    <Skeleton className="lg:hidden h-10 w-10 rounded-lg flex-shrink-0" />
                </div>
            </header>

            <main className="relative max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 pt-32">
                {/* Hero Section Skeleton */}
                <div className="text-center space-y-6 mb-16">
                    <Skeleton className="h-10 w-48 mx-auto rounded-full" />
                    <Skeleton className="h-16 md:h-20 w-full max-w-3xl mx-auto" />
                    <Skeleton className="h-7 md:h-8 w-full max-w-2xl mx-auto" />
                </div>

                {/* Social Media Links Skeleton - 4 cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="border-2 border-border rounded-xl bg-card/50 backdrop-blur-sm">
                            <div className="pt-6 pb-6 space-y-4 px-6">
                                <Skeleton className="h-14 w-14 rounded-2xl" />
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-6 w-24" />
                                        <Skeleton className="h-4 w-4" />
                                    </div>
                                    <Skeleton className="h-4 w-40" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions Skeleton - 3 cards */}
                <div className="mb-16">
                    <Skeleton className="h-10 md:h-12 w-56 mx-auto mb-8" />
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="border-2 border-border rounded-xl bg-card/50 backdrop-blur-sm">
                                <div className="pt-6 pb-6 text-center space-y-3 px-6">
                                    <Skeleton className="h-12 w-12 rounded-xl mx-auto" />
                                    <Skeleton className="h-6 w-32 mx-auto" />
                                    <Skeleton className="h-4 w-40 mx-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Form Skeleton */}
                <div className="max-w-3xl mx-auto">
                    <div className="text-center space-y-4 mb-8">
                        <Skeleton className="h-10 md:h-12 w-64 mx-auto" />
                        <Skeleton className="h-6 w-96 mx-auto" />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-xl opacity-50" />
                        <div className="relative border-2 border-primary/20 bg-card/50 backdrop-blur-sm shadow-xl rounded-xl">
                            <div className="pt-8 pb-8 px-8">
                                <div className="space-y-6">
                                    {/* Name and Email fields */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {[...Array(2)].map((_, i) => (
                                            <div key={i} className="space-y-2">
                                                <Skeleton className="h-5 w-20" />
                                                <Skeleton className="h-12 w-full rounded-lg border-2" />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Subject field */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-24" />
                                        <Skeleton className="h-12 w-full rounded-lg border-2" />
                                    </div>

                                    {/* Message field */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-24" />
                                        <Skeleton className="h-36 w-full rounded-lg border-2" />
                                    </div>

                                    {/* Submit button */}
                                    <Skeleton className="h-14 w-full rounded-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info Skeleton */}
                <div className="mt-16 text-center space-y-4">
                    <Skeleton className="h-10 w-80 mx-auto rounded-full" />
                    <Skeleton className="h-4 w-64 mx-auto" />
                </div>
            </main>

            {/* Footer Skeleton */}
            <footer className="relative bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 py-20 px-4 md:px-6">
                <div className="relative max-w-7xl mx-auto">
                    {/* Logo and Description */}
                    <div className="text-center mb-16 space-y-4">
                        <div className="flex items-center justify-center gap-3">
                            <Skeleton className="h-12 w-12 bg-neutral-800" />
                            <Skeleton className="h-8 w-24 bg-neutral-800" />
                        </div>
                        <Skeleton className="h-6 w-[600px] mx-auto bg-neutral-800" />
                    </div>
                    {/* Footer Links */}
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="h-6 w-32 bg-neutral-800" />
                                {[...Array(5)].map((_, j) => (
                                    <Skeleton key={j} className="h-4 w-full bg-neutral-800" />
                                ))}
                            </div>
                        ))}
                    </div>
                    {/* Browser Compatibility */}
                    <div className="text-center space-y-4 mb-12">
                        <Skeleton className="h-5 w-80 mx-auto bg-neutral-800" />
                        <div className="flex justify-center gap-8">
                            {[...Array(6)].map((_, i) => (
                                <Skeleton key={i} className="h-8 w-20 bg-neutral-800" />
                            ))}
                        </div>
                    </div>
                    {/* Bottom Section */}
                    <div className="border-t border-neutral-800/50 pt-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-96 bg-neutral-800" />
                                <Skeleton className="h-3 w-64 bg-neutral-800" />
                            </div>
                            <div className="flex gap-6">
                                {[...Array(3)].map((_, i) => (
                                    <Skeleton key={i} className="h-10 w-10 rounded-lg bg-neutral-800" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
