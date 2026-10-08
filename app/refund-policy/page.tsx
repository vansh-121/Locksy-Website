import { Metadata } from "next"
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/metadata"
import RefundPolicyClient from "./refund-client"

export const metadata: Metadata = {
    title: "Refund & Cancellation Policy - All Sales Final",
    description: "Read Locksy's refund and cancellation policy. As an instantly delivered digital license key, all sales of Locksy Pro are final. Evaluate Locksy 100% free before purchasing.",
    keywords: "locksy refund policy, all sales final, digital goods refund, cancellation policy, lifetime license, polar refund policy",
    alternates: {
        canonical: "https://www.locksy.dev/refund-policy",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://www.locksy.dev/refund-policy",
        siteName: "Locksy",
        title: "Refund & Cancellation Policy | Locksy",
        description: "Read Locksy's refund and cancellation policy. As an instantly delivered digital license key, all sales of Locksy Pro are final.",
        images: [
            {
                url: "https://www.locksy.dev/web-app-manifest-512x512.png",
                width: 512,
                height: 512,
                alt: "Locksy Refund Policy",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Refund & Cancellation Policy | Locksy",
        description: "Read Locksy's refund and cancellation policy. Digital software licenses are non-refundable. Free trial available.",
        images: ["https://www.locksy.dev/web-app-manifest-512x512.png"],
        creator: "@locksy",
    },
    robots: {
        index: true,
        follow: true,
    },
}

const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Refund Policy", url: "/refund-policy" },
])

const refundFaqSchema = generateFAQSchema([
    {
        question: "Can I get a refund after purchasing Locksy Pro?",
        answer: "No. All purchases of Locksy Pro are final and non-refundable. Because the product is an instantly delivered digital license, we do not issue refunds after delivery.",
    },
    {
        question: "Why does Locksy have an all-sales-final policy?",
        answer: "Locksy is a local-first browser extension with zero cloud tracking. To protect against unauthorized distribution, digital keys are non-returnable. A generous Free Core tier is available to test before purchasing.",
    },
    {
        question: "How do I cancel my subscription so I'm not charged again?",
        answer: "Locksy Pro is NOT a subscription. It is a one-time purchase with lifetime access. There are no monthly or annual renewals to cancel.",
    },
    {
        question: "What if I was charged twice by accident?",
        answer: "Accidental duplicate charges from checkout timeouts are gladly investigated and refunded upon contacting vanshsethi.me@gmail.com with your receipt.",
    },
])

// Merchant Return Policy Schema for Google & Payment Processors
const merchantReturnPolicySchema = {
    "@context": "https://schema.org",
    "@type": "MerchantReturnPolicy",
    name: "Locksy Digital Products Return Policy",
    applicableCountry: "US",
    returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
    merchantReturnDays: 0,
    url: "https://www.locksy.dev/refund-policy",
}

export default function RefundPolicyPage() {
    return (
        <>
            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(refundFaqSchema) }}
            />
            {/* Merchant Return Policy Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(merchantReturnPolicySchema) }}
            />
            <RefundPolicyClient />
        </>
    )
}
