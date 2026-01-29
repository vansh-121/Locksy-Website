import { Metadata } from 'next'
import { faqData } from './faq-data'

const siteUrl = 'https://locksy.dev' // Update with your actual domain
const siteName = 'Locksy'
const siteDescription = 'Password-protect your tabs with military-grade PBKDF2 encryption. Instant locking, offline security, 100% private. Works on Chrome, Edge, Firefox, Brave, Opera & all Chromium browsers.'
const keywords = [
    'password protect tabs',
    'lock browser tabs',
    'tab locker',
    'password protect chrome tabs',
    'password protect edge tabs',
    'password protect firefox tabs',
    'password protect brave tabs',
    'chrome extension tab security',
    'edge extension tab security',
    'firefox tab security',
    'brave tab security',
    'chromium extension tab lock',
    'opera tab security',
    'vivaldi tab security',
    'tab protection extension',
    'PBKDF2 encryption browser',
    'offline tab security',
    'browser privacy extension',
    'free tab locker extension',
    'locksy tab locker'
]

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: 'Locksy - Tab Locker & Password Protection | Chrome, Edge, Firefox, Brave Extension',
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
        title: 'Locksy - Tab Locker & Password Protection | Chrome, Edge, Firefox, Brave Extension',
        description: siteDescription,
        images: [
            {
                url: `${siteUrl}/web-app-manifest-512x512.png`,
                width: 512,
                height: 512,
                alt: 'Locksy - Password-Protect Browser Tabs',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Locksy - Password-Protect Browser Tabs',
        description: siteDescription,
        images: [`${siteUrl}/web-app-manifest-512x512.png`],
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
        'ai:use_case': 'Password protection for browser tabs with PBKDF2 (600k iterations) and AES-256 encryption',
        'ai:features': 'Password protect tabs, PBKDF2 600k iterations, rate limiting, domain lock, keyboard shortcuts, visual indicators, incognito support, 8+ security layers, offline operation, free forever',
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
    logo: `${siteUrl}/web-app-manifest-512x512.png`,
    description: siteDescription,
    sameAs: [
        'https://github.com/vansh-121/Locksy',
        // 'https://twitter.com/locksy',
        'https://www.producthunt.com/products/locksy-tab-locker-password-protection',
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
    browserRequirements: 'Works on Chrome, Edge, Firefox, Brave, Opera, Vivaldi, Comet, Arc, and all Chromium-based browsers',
    screenshot: `${siteUrl}/web-app-manifest-512x512.png`,
    featureList: [
        'Password protect any browser tab',
        'PBKDF2 with 600k iterations',
        'Rate limiting & brute-force protection',
        'Domain lock with wildcard patterns',
        'Keyboard shortcuts (customizable)',
        'Visual lock indicators',
        'Incognito mode support',
        '8+ security layers',
        '100% offline operation',
        'No data collection',
        'Smart unlock preferences',
        'Free forever'
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

// Helper function to generate page-specific metadata
export const generatePageMetadata = (
    title: string,
    description: string,
    path: string,
    additionalKeywords: string[] = []
): Metadata => {
    const url = `${siteUrl}${path}`
    const allKeywords = [...keywords, ...additionalKeywords]

    return {
        title,
        description,
        keywords: allKeywords.join(', '),
        alternates: {
            canonical: url,
        },
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url,
            siteName: siteName,
            title,
            description,
            images: [
                {
                    url: `${siteUrl}/web-app-manifest-512x512.png`,
                    width: 512,
                    height: 512,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${siteUrl}/web-app-manifest-512x512.png`],
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
    }
}

// Generate BreadcrumbList schema
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${siteUrl}${item.url}`
        }))
    }
}

// HowTo Schema for Installation Guide
export const jsonLdHowToInstall = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Install Locksy Browser Extension',
    description: 'Step-by-step guide to install and set up Locksy tab protection extension',
    totalTime: 'PT1M',
    tool: [
        {
            '@type': 'HowToTool',
            name: 'Chrome, Firefox, or Edge browser'
        }
    ],
    step: [
        {
            '@type': 'HowToStep',
            position: 1,
            name: 'Visit Extension Store',
            text: 'Go to Chrome Web Store, Firefox Add-ons, or Microsoft Edge Add-ons store',
            url: `${siteUrl}#download`
        },
        {
            '@type': 'HowToStep',
            position: 2,
            name: 'Add to Browser',
            text: 'Click the "Add to Browser" or "Add to Chrome/Firefox/Edge" button and confirm installation',
            url: `${siteUrl}#download`
        },
        {
            '@type': 'HowToStep',
            position: 3,
            name: 'Set Master Password',
            text: 'Click the Locksy icon in your browser toolbar and create your secure master password',
            url: `${siteUrl}#how-it-works`
        },
        {
            '@type': 'HowToStep',
            position: 4,
            name: 'Start Locking Tabs',
            text: 'Click the lock button or use keyboard shortcut Alt+Shift+9 to protect any tab',
            url: `${siteUrl}#features`
        }
    ]
}

