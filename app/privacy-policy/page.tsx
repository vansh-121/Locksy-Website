import { Metadata } from "next"
import { generateBreadcrumbSchema } from "@/lib/metadata"
import PrivacyPolicyClient from "./privacy-client"

export const metadata: Metadata = {
    // No "| Locksy" suffix here — app/layout.tsx applies `template: '%s | Locksy'`
    // to this field, so writing the brand in produces "... | Locksy | Locksy".
    // openGraph/twitter titles below are NOT templated, so they keep the brand.
    title: 'Privacy Policy - Your Data is 100% Private',
    description: 'Read Locksy\'s privacy policy. We collect ZERO personal data. Your master password is never stored — only a PBKDF2-derived hash. 100% offline, completely private browser tab security.',
    keywords: 'locksy privacy policy, browser extension privacy, zero data collection, offline password hashing, PBKDF2 password hashing, privacy-first, no tracking',
    alternates: {
        canonical: 'https://www.locksy.dev/privacy-policy',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.locksy.dev/privacy-policy',
        siteName: 'Locksy',
        title: 'Privacy Policy - Your Data is 100% Private | Locksy',
        description: 'Read Locksy\'s privacy policy. We collect ZERO personal data. Your master password is never stored — only a PBKDF2-derived hash.',
        images: [
            {
                url: 'https://www.locksy.dev/web-app-manifest-512x512.png',
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
    { name: 'Privacy Policy', url: '/privacy-policy' }
])

export default function PrivacyPolicyPage() {
    // Pinned date of the last change to the policy wording; keep it in step with
    // the privacy-policy entry in app/sitemap.ts. (It used to read the file's
    // mtime, which moved on every restyle or fresh deploy even when the policy
    // didn't.)
    const lastUpdated = 'July 31, 2026'

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
