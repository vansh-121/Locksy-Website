import { Suspense } from "react"
import type { Metadata } from "next"
import SuccessClient from "./success-client"

export const metadata: Metadata = {
    title: "Payment Successful - Welcome to Locksy Pro",
    description: "Thank you for upgrading to Locksy Pro lifetime. Follow the quick instructions to activate your license.",
    robots: {
        index: false,
        follow: false,
    },
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="text-sm text-muted-foreground font-medium">Verifying order details...</p>
                </div>
            </div>
        }>
            <SuccessClient />
        </Suspense>
    )
}
