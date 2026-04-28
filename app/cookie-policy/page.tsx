import { Metadata } from "next"
import { generateBreadcrumbSchema } from "@/lib/metadata"
import CookiePolicyClient from "./cookie-policy-client"

export const metadata: Metadata = {
    title: 'Cookie Policy - How We Use Cookies | Locksy',
    description: 'Read Locksy\'s cookie policy. Understand what cookies and similar technologies our website uses, why we use them, and how you can control them.',
    keywords: 'locksy cookie policy, cookies, website cookies, tracking technologies, cookie consent, privacy',
    alternates: {
        canonical: 'https://www.locksy.dev/cookie-policy',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.locksy.dev/cookie-policy',
        siteName: 'Locksy',
        title: 'Cookie Policy - How We Use Cookies | Locksy',
        description: 'Understand what cookies and similar technologies the Locksy website uses.',
        images: [
            {
                url: 'https://www.locksy.dev/web-app-manifest-512x512.png',
                width: 512,
                height: 512,
                alt: 'Locksy Cookie Policy',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Cookie Policy - How We Use Cookies | Locksy',
        description: 'Read Locksy\'s cookie policy and learn how we use cookies.',
        images: ['https://www.locksy.dev/web-app-manifest-512x512.png'],
        creator: '@locksy',
    },
    robots: {
        index: true,
        follow: true,
    },
}

const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Cookie Policy', url: '/cookie-policy' }
])

export default function CookiePolicyPage() {
    return (
        <>
            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <CookiePolicyClient />
        </>
    )
}
