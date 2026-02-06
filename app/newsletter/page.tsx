import { Metadata } from "next"
import { generateBreadcrumbSchema } from "@/lib/metadata"
import NewsletterClient from "./newsletter-client"

export const metadata: Metadata = {
    title: 'Newsletter - Stay Updated with Locksy | Security Updates & Announcements',
    description: 'Subscribe to Locksy newsletter for the latest security updates, feature announcements, tips, and exclusive insights about browser tab protection.',
    keywords: 'locksy newsletter, security updates, browser extension updates, locksy announcements, subscribe locksy, newsletter signup',
    alternates: {
        canonical: 'https://www.locksy.dev/newsletter',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.locksy.dev/newsletter',
        siteName: 'Locksy',
        title: 'Newsletter - Stay Updated with Locksy | Security Updates & Announcements',
        description: 'Subscribe to Locksy newsletter for security updates, feature announcements, and exclusive insights.',
        images: [
            {
                url: 'https://www.locksy.dev/web-app-manifest-512x512.png',
                width: 512,
                height: 512,
                alt: 'Locksy Newsletter - Browser Tab Security Updates',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Newsletter - Stay Updated with Locksy',
        description: 'Subscribe to Locksy newsletter for security updates, feature announcements, and exclusive insights.',
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
    { name: 'Newsletter', url: '/newsletter' }
])

export default function NewsletterPage() {
    return (
        <>
            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <NewsletterClient />
        </>
    )
}
