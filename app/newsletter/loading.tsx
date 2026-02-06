import { Skeleton } from "@/components/ui/skeleton"

export default function NewsletterLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-accent/30 to-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />

            {/* Header Skeleton */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-10 w-32" />
                </div>
            </header>

            <main className="relative max-w-7xl mx-auto px-4 md:px-6 pt-32 pb-12 md:pt-40 md:pb-20">
                {/* Hero Section Skeleton */}
                <div className="text-center space-y-6 mb-16">
                    <Skeleton className="h-8 w-48 mx-auto rounded-full" />
                    <Skeleton className="h-16 w-3/4 max-w-4xl mx-auto" />
                    <Skeleton className="h-8 w-2/3 max-w-3xl mx-auto" />
                </div>

                {/* Subscription Form Skeleton */}
                <div className="max-w-2xl mx-auto mb-16">
                    <div className="p-8 bg-card/50 backdrop-blur-sm rounded-xl border-2 border-primary/20 shadow-xl">
                        <div className="text-center space-y-2 mb-8">
                            <Skeleton className="h-10 w-64 mx-auto" />
                            <Skeleton className="h-5 w-80 mx-auto" />
                        </div>
                        <div className="space-y-6">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-12 w-full rounded-lg" />
                            </div>
                            {/* Checkbox */}
                            <div className="p-4 bg-accent/30 border border-border rounded-lg">
                                <Skeleton className="h-16 w-full" />
                            </div>
                            {/* Error placeholder */}
                            {/* Submit Button */}
                            <Skeleton className="h-12 w-full rounded-lg" />
                        </div>
                    </div>
                </div>

                {/* What You'll Receive Section Skeleton */}
                <div className="mt-20 mb-16">
                    <Skeleton className="h-10 w-80 mx-auto mb-12" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border-2 border-border">
                                <Skeleton className="h-12 w-12 mb-4 rounded-xl" />
                                <Skeleton className="h-6 w-40 mb-3" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Privacy Note Section Skeleton */}
                <div className="mt-16 max-w-3xl mx-auto">
                    <div className="p-6 bg-accent/20 backdrop-blur-sm rounded-xl border-2 border-border/50">
                        <div className="flex items-start gap-4">
                            <Skeleton className="h-6 w-6 flex-shrink-0 rounded" />
                            <div className="flex-1 space-y-3">
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section Skeleton */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-12 w-32 mx-auto" />
                            <Skeleton className="h-4 w-40 mx-auto" />
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer Skeleton */}
            <footer className="relative bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <Skeleton className="h-12 w-40 mx-auto mb-4 bg-neutral-800" />
                        <Skeleton className="h-6 w-96 mx-auto bg-neutral-800" />
                    </div>
                </div>
            </footer>
        </div>
    )
}

