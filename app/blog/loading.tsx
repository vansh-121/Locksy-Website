import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <section className="border-b bg-gradient-to-b from-background to-muted/20 py-12 lg:py-16">
                <div className="container px-4 md:px-6">
                    <div className="mx-auto max-w-3xl text-center space-y-4">
                        <Skeleton className="h-12 w-3/4 mx-auto" />
                        <Skeleton className="h-6 w-full mx-auto" />
                    </div>
                </div>
            </section>

            <div className="container px-4 py-12 md:px-6">
                <div className="mx-auto max-w-7xl">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        {/* Sidebar */}
                        <aside className="mb-8 lg:col-span-3 lg:mb-0">
                            <div className="space-y-6">
                                <Skeleton className="h-10 w-full" />
                                <div className="space-y-2">
                                    {[...Array(4)].map((_, i) => (
                                        <Skeleton key={i} className="h-10 w-full" />
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Blog Posts Grid */}
                        <div className="lg:col-span-9">
                            <div className="grid gap-6 sm:grid-cols-2">
                                {[...Array(6)].map((_, i) => (
                                    <Skeleton key={i} className="h-96 w-full rounded-lg" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
