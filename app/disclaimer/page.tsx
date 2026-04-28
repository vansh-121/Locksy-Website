import { Metadata } from "next"
import { generateBreadcrumbSchema } from "@/lib/metadata"
import DisclaimerClient from "./disclaimer-client"

export const metadata: Metadata = {
    title: 'Disclaimer - Important Legal Information | Locksy',
    description: 'Read the disclaimer for the Locksy browser extension and website. Understand the limitations of liability, accuracy of information, and third-party links policy.',
    keywords: 'locksy disclaimer, legal disclaimer, browser extension disclaimer, liability limitations, third-party links',
    alternates: {
        canonical: 'https://www.locksy.dev/disclaimer',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.locksy.dev/disclaimer',
        siteName: 'Locksy',
        title: 'Disclaimer - Important Legal Information | Locksy',
        description: 'Read the disclaimer for the Locksy browser extension and website.',
        images: [
            {
                url: 'https://www.locksy.dev/web-app-manifest-512x512.png',
                width: 512,
                height: 512,
                alt: 'Locksy Disclaimer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Disclaimer - Important Legal Information | Locksy',
        description: 'Read the disclaimer for the Locksy browser extension and website.',
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
    { name: 'Disclaimer', url: '/disclaimer' }
])

export default function DisclaimerPage() {
    return (
        <>
            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <DisclaimerClient />
        </>
    )
}
