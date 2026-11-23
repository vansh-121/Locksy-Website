import { Skeleton } from "@/components/ui/skeleton"

/** Contact page loading state: floating header, centred hero, link cards and the message form. */
export default function ContactLoading() {
    return (
        <div className="min-h-screen bg-background">
            {/* Floating pill header */}
            <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
                <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2">
                    <div className="flex items-center gap-2.5">
                        <Skeleton className="h-8 w-8 rounded-lg" />
                        <Skeleton className="h-5 w-16" />
                    </div>
                    <div className="hidden items-center gap-6 lg:flex">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-3.5 w-14" />
                        ))}
                    </div>
                    <Skeleton className="h-10 w-36 rounded-full" />
                </div>
            </div>

            {/* Hero */}
            <section className="mx-auto max-w-6xl px-4 pt-[6.5rem] pb-14 md:px-6 md:pt-32 md:pb-20">
                <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                    <Skeleton className="h-7 w-32 rounded-full" />
                    <Skeleton className="mt-6 h-12 w-full max-w-lg md:h-16" />
                    <Skeleton className="mt-6 h-5 w-full max-w-xl" />
                    <Skeleton className="mt-2 h-5 w-2/3 max-w-md" />
                </div>
            </section>

            {/* Social link cards */}
            <section className="mx-auto max-w-6xl px-4 pb-12 md:px-6 md:pb-16">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="surface space-y-3 p-6">
                            <Skeleton className="h-10 w-10 rounded-xl" />
                            <Skeleton className="mt-2 h-5 w-24" />
                            <Skeleton className="h-4 w-36" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Quick actions */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <Skeleton className="mx-auto h-10 w-56 md:h-12" />
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="surface flex flex-col items-center space-y-3 p-6">
                            <Skeleton className="h-10 w-10 rounded-xl" />
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact form */}
            <section className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
                <div className="flex flex-col items-center">
                    <Skeleton className="h-10 w-64 md:h-12" />
                    <Skeleton className="mt-5 h-5 w-full max-w-md" />
                </div>
                <div className="surface mt-10 space-y-6 p-6 md:p-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-11 w-full rounded-xl" />
                            </div>
                        ))}
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-11 w-full rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-36 w-full rounded-xl" />
                    </div>
                    <Skeleton className="h-12 w-full rounded-full" />
                </div>
                <div className="mt-14 flex flex-col items-center gap-3">
                    <Skeleton className="h-7 w-64 rounded-full" />
                    <Skeleton className="h-4 w-56" />
                </div>
            </section>
        </div>
    )
}
