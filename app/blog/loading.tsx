import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="page-top-offset pb-14 md:pb-20">
                <div className="mx-auto max-w-3xl space-y-5 px-4 text-center md:px-6">
                    <Skeleton className="mx-auto h-7 w-20 rounded-full" />
                    <Skeleton className="mx-auto h-12 w-3/4" />
                    <Skeleton className="mx-auto h-6 w-full max-w-2xl" />
                </div>
            </section>

            <div className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
                {/* Search + filters */}
                <div className="mx-auto mb-12 max-w-4xl space-y-6">
                    <Skeleton className="h-11 w-full rounded-full" />
                    <div className="flex flex-wrap gap-2">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-9 w-24 rounded-full" />
                        ))}
                    </div>
                </div>

                {/* Featured post */}
                <Skeleton className="mb-4 h-80 w-full rounded-3xl" />

                {/* Post grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="h-80 w-full rounded-3xl" />
                    ))}
                </div>
            </div>
        </div>
    )
}
