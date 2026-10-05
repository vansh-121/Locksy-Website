import { Metadata } from "next"
import { generateBreadcrumbSchema } from "@/lib/metadata"
import { filteredBlogPosts } from "@/lib/blog-data"
import AboutClient from "./about-client"

export const metadata: Metadata = {
    // Trailing "| Browser Tab Security" dropped: with the layout's " | Locksy"
    // template this ran to 70 chars and Google truncated it. Matches the
    // openGraph title below, which was already the shorter form.
    title: 'About Locksy - Our Mission & Story',
    description: 'Learn about Locksy, the browser extension that protects your tabs with military-grade encryption. Discover our mission, values, and the developer behind the project.',
    keywords: 'about locksy, locksy story, browser extension developer, locksy mission, tab locker creator, vansh sethi, tab security, locksy team',
    alternates: {
        canonical: 'https://www.locksy.dev/about',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.locksy.dev/about',
        siteName: 'Locksy',
        title: 'About Locksy - Our Mission & Story',
        description: 'Learn about Locksy — the secure browser extension that protects your tabs with military-grade encryption.',
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

// Person / author entity for E-E-A-T. Gives the blog's "Vansh Sethi" byline a
// real, crawlable identity (with a verifiable GitHub profile) that Google and AI
// answer engines can attribute expertise to. The @id lets BlogPosting authors
// reference this same entity.
const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://www.locksy.dev/about#vansh-sethi',
    name: 'Vansh Sethi',
    url: 'https://www.locksy.dev/about',
    jobTitle: 'Developer',
    description: 'Creator and developer of Locksy, the zero-knowledge browser extension for password-protecting and auto-locking browser tabs.',
    worksFor: {
        '@type': 'Organization',
        name: 'Locksy',
        url: 'https://www.locksy.dev',
    },
    sameAs: [
        'https://github.com/vansh-121',
    ],
}

export default function AboutPage() {
    return (
        <>
            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {/* Person / author schema (E-E-A-T) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <AboutClient guideCount={filteredBlogPosts.length} />
        </>
    )
}
