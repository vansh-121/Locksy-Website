import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header Skeleton - Matches actual header layout */}
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

            {/* Hero Section Skeleton - Matches actual hero layout */}
            <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden bg-gradient-to-br from-accent via-background to-accent">
                <div className="relative max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* Left: Content */}
                        <div className="space-y-10">
                            {/* Badges */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Skeleton className="h-9 w-56 rounded-full" />
                                <Skeleton className="h-9 w-48 rounded-full" />
                            </div>
                            {/* Title */}
                            <div className="space-y-4">
                                <Skeleton className="h-14 md:h-20 w-full" />
                                <Skeleton className="h-14 md:h-20 w-4/5" />
                                <Skeleton className="h-6 md:h-8 w-full" />
                                <Skeleton className="h-6 md:h-8 w-3/4" />
                            </div>
                            {/* Browser Buttons */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {[...Array(3)].map((_, i) => (
                                        <Skeleton key={i} className="h-16 rounded-xl" />
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                                    {[...Array(4)].map((_, i) => (
                                        <Skeleton key={i} className="h-12 sm:h-14 rounded-xl" />
                                    ))}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <Skeleton className="h-12 sm:h-14 rounded-xl" />
                                    <Skeleton className="h-12 sm:h-14 rounded-xl" />
                                </div>
                            </div>
                            {/* Product Hunt Badge */}
                            <Skeleton className="h-14 w-56 mx-auto sm:mx-0 rounded-xl" />
                            {/* Compatibility Note */}
                            <Skeleton className="h-12 w-full rounded-lg" />
                        </div>
                        {/* Right: Logo */}
                        <div className="flex justify-center md:justify-end items-start">
                            <Skeleton className="h-64 md:h-80 lg:h-96 w-64 md:w-80 lg:w-96" />
                        </div>
                    </div>

                    {/* Video Demo Section */}
                    <div className="mt-16">
                        <div className="text-center mb-8 space-y-3">
                            <Skeleton className="h-10 md:h-12 w-72 mx-auto" />
                            <Skeleton className="h-6 w-96 mx-auto" />
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <Skeleton className="aspect-video rounded-2xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section Skeleton - 12 feature cards in grid */}
            <section className="py-20 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-4 mb-12">
                        <Skeleton className="h-12 w-80 mx-auto" />
                        <Skeleton className="h-6 w-[600px] mx-auto" />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="border-2 rounded-2xl p-6 space-y-4">
                                <Skeleton className="h-12 w-12 rounded-xl" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Other Sections Skeleton */}
            {[...Array(3)].map((_, sectionIndex) => (
                <section key={sectionIndex} className="py-20 px-4 md:px-6 bg-accent/20">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center space-y-4 mb-12">
                            <Skeleton className="h-12 w-96 mx-auto" />
                            <Skeleton className="h-6 w-[500px] mx-auto" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="space-y-4">
                                    <Skeleton className="h-48 rounded-xl" />
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            {/* Footer Skeleton */}
            <footer className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 py-20 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
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
                        <Skeleton className="h-5 w-64 mx-auto bg-neutral-800" />
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
                                <Skeleton className="h-4 w-80 bg-neutral-800" />
                                <Skeleton className="h-3 w-60 bg-neutral-800" />
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
