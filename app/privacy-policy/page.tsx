import { Metadata } from "next"
import { generateBreadcrumbSchema } from "@/lib/metadata"
import PrivacyPolicyClient from "./privacy-client"
import fs from "fs"
import path from "path"

export const metadata: Metadata = {
    title: 'Privacy Policy - Your Data is 100% Private | Locksy',
    description: 'Read Locksy\'s privacy policy. We collect ZERO personal data. All passwords are encrypted locally with AES-256. 100% offline, completely private browser tab security.',
    keywords: 'locksy privacy policy, browser extension privacy, zero data collection, offline encryption, AES-256 encryption, privacy-first, no tracking',
    alternates: {
        canonical: 'https://locksy.dev/privacy-policy',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://locksy.dev/privacy-policy',
        siteName: 'Locksy',
        title: 'Privacy Policy - Your Data is 100% Private | Locksy',
        description: 'Read Locksy\'s privacy policy. We collect ZERO personal data. All passwords are encrypted locally with AES-256.',
        images: [
            {
                url: 'https://locksy.dev/web-app-manifest-512x512.png',
                width: 512,
                height: 512,
                alt: 'Locksy Privacy Policy - 100% Private',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Privacy Policy - Your Data is 100% Private | Locksy',
        description: 'Read Locksy\'s privacy policy. We collect ZERO personal data. 100% offline and completely private.',
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
    { name: 'Privacy Policy', url: '/privacy-policy' }
])

export default function PrivacyPolicyPage() {
    // Get the last modified date of this file
    const filePath = path.join(process.cwd(), 'app', 'privacy-policy', 'privacy-client.tsx')
    let lastUpdated = 'January 24, 2026'
    
    try {
        const stats = fs.statSync(filePath)
        const date = new Date(stats.mtime)
        lastUpdated = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
    } catch (error) {
        console.error('Error reading file stats:', error)
    }

    return (
        <>
            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <PrivacyPolicyClient lastUpdated={lastUpdated} />
        </>
    )
}
