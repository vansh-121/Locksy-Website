import { Metadata } from 'next'
import { faqData } from './faq-data'

const siteUrl = 'https://locksy.dev' // Update with your actual domain
const siteName = 'Locksy'
const siteDescription = 'Lock any browser tab with a password. Military-grade AES-256 encryption, 100% offline, free forever. Protect sensitive tabs on shared computers. Available for Chrome and Microsoft Edge.'
const keywords = [
    'password protect tabs',
    'browser tab security',
    'lock browser tabs',
    'tab protection',
    'secure browser tabs',
    'password protect chrome tabs',
    'password protect edge tabs',
    'browser privacy',
    'tab locker',
    'secure browsing',
    'password manager',
    'browser security extension',
    'privacy extension',
    'offline password protection',
    'AES-256 encryption',
    'tab privacy',
    'protect sensitive data',
    'browser tab password',
    'chrome security',
    'edge security'
]

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: 'Locksy - Password-Protect Browser Tabs | Chrome & Edge Extension',
        template: '%s | Locksy'
    },
    description: siteDescription,
    keywords: keywords.join(', '),
    authors: [{ name: 'Locksy Team' }],
    creator: 'Locksy',
    publisher: 'Locksy',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        siteName: siteName,
        title: 'Locksy - Password-Protect Browser Tabs | Chrome & Edge Extension',
        description: siteDescription,
        images: [
            {
                url: `${siteUrl}/og-image.png`,
                width: 1200,
                height: 630,
                alt: 'Locksy - Password-Protect Browser Tabs',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Locksy - Password-Protect Browser Tabs',
        description: siteDescription,
        images: [`${siteUrl}/twitter-image.png`],
        creator: '@locksy',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },
    manifest: '/site.webmanifest',
    alternates: {
        canonical: siteUrl,
    },
    verification: {
        google: '5BggLK44-62mJejhXTMZxlqSBtUa0l-v6wtcEY-qPOo',
        // yandex: 'your-yandex-verification-code',
        // bing: 'your-bing-verification-code',
    },
    category: 'technology',
    classification: 'Browser Extension, Security Software, Privacy Tool',
    other: {
        // AI Engine specific metadata
        'ai:description': siteDescription,
        'ai:category': 'Browser Extension for Tab Security',
        'ai:use_case': 'Password protection for browser tabs with offline AES-256 encryption',
        'ai:features': 'Password protect tabs, AES-256 encryption, offline operation, Chrome and Edge support, free forever',
        'ai:target_audience': 'Users who need to secure sensitive browser tabs on shared computers',
    }
}

export const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    potentialAction: {
        '@type': 'SearchAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/?s={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
    }
}

export const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: siteDescription,
    sameAs: [
        // Add your social media links here
        // 'https://twitter.com/locksy',
        // 'https://github.com/locksy',
    ]
}

export const jsonLdSoftwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteName,
    applicationCategory: 'BrowserExtension',
    operatingSystem: 'Windows, macOS, Linux',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
    },
    description: siteDescription,
    softwareVersion: '1.0',
    browserRequirements: 'Requires Chrome or Microsoft Edge',
    screenshot: `${siteUrl}/screenshot.png`,
    featureList: [
        'Password protect any browser tab',
        'Military-grade AES-256 encryption',
        '100% offline operation',
        'No data collection',
        'Free forever',
        'Works on Chrome and Edge'
    ]
}

export const jsonLdFAQPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
        }
    }))
}
