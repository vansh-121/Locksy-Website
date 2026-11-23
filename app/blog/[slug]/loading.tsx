import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <div className="min-h-screen bg-background">
            {/* Article header */}
            <div className="page-top-offset mx-auto max-w-[720px] space-y-6 px-4 pb-10 md:px-6">
                <Skeleton className="h-4 w-40" />
                <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-full" />
            </div>

            {/* Cover image */}
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <Skeleton className="h-64 w-full rounded-3xl md:h-[420px]" />
            </div>

            {/* Body */}
            <article className="mx-auto max-w-[720px] space-y-4 px-4 py-12 md:px-6">
                {[...Array(12)].map((_, i) => (
                    <Skeleton key={i} className="h-5 w-full" />
                ))}
            </article>
        </div>
    )
}
