import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b bg-gradient-to-b from-background to-muted/20">
                <div className="container px-4 py-8 md:px-6">
                    <Skeleton className="h-8 w-32 mb-4" />

                    <article className="mx-auto max-w-4xl space-y-6">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-24" />
                        </div>

                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-12 w-3/4" />

                        <div className="flex flex-wrap gap-2">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="h-6 w-20" />
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="h-9 w-28" />
                            ))}
                        </div>
                    </article>
                </div>
            </div>

            {/* Content */}
            <div className="container px-4 py-12 md:px-6">
                <article className="mx-auto max-w-4xl space-y-4">
                    {[...Array(12)].map((_, i) => (
                        <Skeleton key={i} className="h-6 w-full" />
                    ))}
                </article>
            </div>
        </div>
    )
}
