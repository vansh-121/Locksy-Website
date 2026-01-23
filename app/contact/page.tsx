import { Metadata } from "next"
import { generateBreadcrumbSchema } from "@/lib/metadata"
import ContactClient from "./contact-client"

export const metadata: Metadata = {
    title: 'Contact Us - Get Support for Locksy | Browser Tab Security',
    description: 'Contact the Locksy team for support, report bugs, request features, or ask questions about our browser tab security extension. We\'re here to help!',
    keywords: 'contact locksy, locksy support, browser extension help, report bug, feature request, customer support',
    alternates: {
        canonical: 'https://locksy.dev/contact',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://locksy.dev/contact',
        siteName: 'Locksy',
        title: 'Contact Us - Get Support for Locksy | Browser Tab Security',
        description: 'Contact the Locksy team for support, report bugs, request features, or ask questions about our browser tab security extension.',
        images: [
            {
                url: 'https://locksy.dev/web-app-manifest-512x512.png',
                width: 512,
                height: 512,
                alt: 'Contact Locksy - Browser Tab Security Support',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Us - Get Support for Locksy',
        description: 'Contact the Locksy team for support, report bugs, request features, or ask questions.',
        images: ['https://locksy.dev/web-app-manifest-512x512.png'],
        creator: '@locksy',
    },
    robots: {
        index: true,
        follow: true,
    },
}

const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' }
])

export default function ContactPage() {
    return (
        <>
            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ContactClient />
        </>
    )
}
