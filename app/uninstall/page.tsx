import { Metadata } from "next"
import { generateBreadcrumbSchema } from "@/lib/metadata"
import UninstallClient from "./uninstall-client"

export const metadata: Metadata = {
    title: 'Uninstall Locksy - We\'re Sorry to See You Go | Browser Tab Security',
    description: 'Uninstalling Locksy? We\'d love to hear your feedback to help us improve. Learn how to uninstall the extension and explore alternatives if needed.',
    keywords: 'uninstall locksy, remove locksy extension, locksy feedback, browser extension uninstall',
    alternates: {
        canonical: 'https://locksy.dev/uninstall',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://locksy.dev/uninstall',
        siteName: 'Locksy',
        title: 'Uninstall Locksy - We\'re Sorry to See You Go',
        description: 'Uninstalling Locksy? We\'d love to hear your feedback to help us improve our browser tab security extension.',
        images: [
            {
                url: 'https://locksy.dev/web-app-manifest-512x512.png',
                width: 512,
                height: 512,
                alt: 'Uninstall Locksy',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Uninstall Locksy - We\'re Sorry to See You Go',
        description: 'Uninstalling Locksy? We\'d love to hear your feedback to help us improve.',
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
    { name: 'Uninstall', url: '/uninstall' }
])

export default function UninstallPage() {
    return (
        <>
            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <UninstallClient />
        </>
    )
}
