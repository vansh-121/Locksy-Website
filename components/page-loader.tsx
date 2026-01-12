"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function PageLoader({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate minimum loading time for better UX
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                {/* Header Skeleton */}
                <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                            <Skeleton className="h-10 md:h-12 w-10 md:w-12" />
                            <Skeleton className="h-6 md:h-7 w-20 md:w-24" />
                        </div>
                        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="h-4 w-16 xl:w-20" />
                            ))}
                        </div>
                        <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
                            <Skeleton className="h-10 xl:h-12 w-28 xl:w-32 rounded-xl" />
                            <Skeleton className="h-10 xl:h-12 w-32 xl:w-40 rounded-xl" />
                        </div>
                        <Skeleton className="lg:hidden h-10 w-10 rounded-lg flex-shrink-0" />
                    </div>
                </header>

                {/* Hero Section Skeleton */}
                <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden bg-gradient-to-br from-accent via-background to-accent">
                    <div className="relative max-w-7xl mx-auto px-4 md:px-6">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-10">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Skeleton className="h-9 w-56 rounded-full" />
                                    <Skeleton className="h-9 w-48 rounded-full" />
                                </div>
                                <div className="space-y-4">
                                    <Skeleton className="h-14 md:h-20 w-full" />
                                    <Skeleton className="h-14 md:h-20 w-4/5" />
                                    <Skeleton className="h-6 md:h-8 w-full" />
                                    <Skeleton className="h-6 md:h-8 w-3/4" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {[...Array(3)].map((_, i) => (
                                        <Skeleton key={i} className="h-14 w-full rounded-xl" />
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <Skeleton className="w-full aspect-square rounded-3xl" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Additional sections skeleton */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 space-y-24">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-8">
                            <div className="text-center space-y-4">
                                <Skeleton className="h-12 w-64 mx-auto" />
                                <Skeleton className="h-6 w-96 mx-auto" />
                            </div>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[...Array(3)].map((_, j) => (
                                    <Skeleton key={j} className="h-64 rounded-xl" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return <>{children}</>
}
