import { Metadata } from "next"
import { generateBreadcrumbSchema } from "@/lib/metadata"
import TermsOfServiceClient from "./terms-client"

export const metadata: Metadata = {
    title: 'Terms of Service - Usage Guidelines | Locksy',
    description: 'Read the Terms of Service for the Locksy browser extension and website. Understand your rights, responsibilities, and our commitment to a fair, free, and transparent service.',
    keywords: 'locksy terms of service, browser extension terms, locksy terms and conditions, usage policy, free extension terms, locksy EULA',
    alternates: {
        canonical: 'https://www.locksy.dev/terms-of-service',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.locksy.dev/terms-of-service',
        siteName: 'Locksy',
        title: 'Terms of Service - Usage Guidelines | Locksy',
        description: 'Read the Terms of Service for the Locksy browser extension. Understand your rights and our commitment to transparency.',
        images: [
            {
                url: 'https://www.locksy.dev/web-app-manifest-512x512.png',
                width: 512,
                height: 512,
                alt: 'Locksy Terms of Service',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Terms of Service - Usage Guidelines | Locksy',
        description: 'Read the Terms of Service for the Locksy browser extension and website.',
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
    { name: 'Terms of Service', url: '/terms-of-service' }
])

export default function TermsOfServicePage() {
    return (
        <>
            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <TermsOfServiceClient />
        </>
    )
}
