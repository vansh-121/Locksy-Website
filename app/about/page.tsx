import { Metadata } from "next"
import { generateBreadcrumbSchema } from "@/lib/metadata"
import AboutClient from "./about-client"

export const metadata: Metadata = {
    title: 'About Locksy - Our Mission & Story | Browser Tab Security',
    description: 'Learn about Locksy, the free open-source browser extension that protects your tabs with military-grade encryption. Discover our mission, values, and the developer behind the project.',
    keywords: 'about locksy, locksy story, browser extension developer, locksy mission, tab locker creator, vansh sethi, open source security, locksy team',
    alternates: {
        canonical: 'https://www.locksy.dev/about',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.locksy.dev/about',
        siteName: 'Locksy',
        title: 'About Locksy - Our Mission & Story',
        description: 'Learn about Locksy — the free, open-source browser extension that protects your tabs with military-grade encryption.',
        images: [
            {
                url: 'https://www.locksy.dev/web-app-manifest-512x512.png',
                width: 512,
                height: 512,
                alt: 'About Locksy - Browser Tab Security',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Locksy - Our Mission & Story',
        description: 'Learn about Locksy and the developer behind the project.',
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
    { name: 'About', url: '/about' }
])

export default function AboutPage() {
    return (
        <>
            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <AboutClient />
        </>
    )
}
