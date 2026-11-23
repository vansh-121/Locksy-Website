import { Skeleton } from "@/components/ui/skeleton"

/** Homepage loading state: mirrors the floating header, centred hero and video frame. */
export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
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

      <section className="mx-auto max-w-6xl px-4 pt-32 pb-20 md:px-6 md:pt-40">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Skeleton className="h-8 w-64 rounded-full" />
          <Skeleton className="mt-8 h-14 w-full max-w-2xl md:h-20" />
          <Skeleton className="mt-3 h-14 w-4/5 max-w-xl md:h-20" />
          <Skeleton className="mt-8 h-5 w-full max-w-lg" />
          <Skeleton className="mt-2 h-5 w-3/4 max-w-md" />
          <div className="mt-10 flex gap-3">
            <Skeleton className="h-14 w-56 rounded-full" />
            <Skeleton className="h-14 w-40 rounded-full" />
          </div>
        </div>
        <Skeleton className="mx-auto mt-16 aspect-video max-w-5xl rounded-3xl md:mt-20" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3 bg-background p-8">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
