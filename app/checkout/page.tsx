import { redirect } from "next/navigation"
import { POLAR_CHECKOUT_URL } from "@/lib/pro"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Redirecting to Secure Checkout - Locksy Pro",
    description: "Forwarding you to our secure payment gateway powered by Polar.sh and Stripe.",
    robots: {
        index: false,
        follow: false,
    },
}

export default function CheckoutPage() {
    redirect(POLAR_CHECKOUT_URL)
}
