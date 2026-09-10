import { Metadata } from "next"
import { generateBreadcrumbSchema } from "@/lib/metadata"
import { guide, GUIDE_PDF_PATH } from "@/lib/guide-data"
import UninstallClient from "./uninstall-client"

export const metadata: Metadata = {
    title: 'Locksy Removed — Your Tabs Are Unprotected | Reinstall Locksy',
    description: 'Locksy has been removed from your browser and your tabs are no longer protected. Tell us what went wrong, or put the locks back in thirty seconds.',
    keywords: 'uninstall locksy, remove locksy extension, reinstall locksy, locksy feedback, browser extension uninstall',
    alternates: {
        canonical: 'https://www.locksy.dev/uninstall',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.locksy.dev/uninstall',
        siteName: 'Locksy',
        title: 'Locksy Removed — Your Tabs Are Unprotected',
        description: 'Locksy has been removed from your browser. Tell us what went wrong, or put the locks back in thirty seconds.',
        images: [
            {
                url: 'https://www.locksy.dev/web-app-manifest-512x512.png',
                width: 512,
                height: 512,
                alt: 'Reinstall Locksy',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Locksy Removed — Your Tabs Are Unprotected',
        description: 'Tell us what went wrong, or put the locks back in thirty seconds.',
        images: ['https://www.locksy.dev/web-app-manifest-512x512.png'],
        creator: '@locksy',
    },
    // This page is listed in app/sitemap.ts, so it must not be noindexed — a
    // sitemap entry marked noindex is reported as an error in Search Console.
    // The extension redirects here after removal, so most traffic arrives
    // directly rather than from search; indexing simply keeps the sitemap and
    // the robots directives consistent.
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
            {/* Chapter count and PDF path are read here, on the server, so the
                whole guide JSON stays out of the client bundle. */}
            <UninstallClient
                chapterCount={guide.chapters.length}
                guidePdfPath={GUIDE_PDF_PATH}
            />
        </>
    )
}
