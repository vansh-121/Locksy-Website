import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data'

// Duplicate/variant posts excluded from sitemap (noindexed)
const NOINDEX_SLUGS = new Set([
    // Variant duplicates
    'essential-browser-security-checklist-for-small-businesses-common-mistakes',
    'how-browser-extensions-defend-against-brute-force-password-attacks-beginners-guide',
    'how-browser-extensions-defend-against-brute-force-password-attacks-real-world-cases',
    'how-ai-powered-browser-security-is-changing-tab-protection-intermediate-tips',
    'how-remote-workers-can-protect-sensitive-browser-tabs-faq',
    'gdpr-compliance-and-browser-tab-data-what-you-need-to-know-real-world-cases',
    'screen-recording-protection-hiding-tabs-from-screen-captures-common-mistakes',
    'social-engineering-attacks-through-browser-tabs-how-to-defend-vs-alternatives',
    'how-webauthn-and-fido2-biometrics-are-changing-browser-security-common-mistakes',
    'what-happens-when-someone-accesses-your-unlocked-browser-tabs-common-mistakes',
    'what-happens-when-someone-accesses-your-unlocked-browser-tabs-how-to-guide',
    'tab-overload-how-too-many-open-tabs-compromise-your-security-common-mistakes',
    'the-future-of-browser-security-predictions-for-2027-beginners-guide',
    'why-smart-people-use-domain-rules-instead-of-manually-locking-tabs-beginners-guide',
    'remote-access-software-security-locking-sensitive-tabs-during-screen-sharing-beginners-guide',
    'the-psychology-of-digital-privacy-why-people-ignore-tab-security-top-benefits',
    // Ultra-thin/stub posts
    'why-your-open-browser-tabs-are-a-security-risk-in-2026',
    'how-to-create-an-unbreakable-master-password-for-tab-security',
    // Short legacy posts
    'keyboard-shortcuts-for-tab-security',
    'how-to-password-protect-browser-tabs',
    'protect-banking-tabs-from-prying-eyes',
])

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = 'https://www.locksy.dev'

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: `${siteUrl}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${siteUrl}/contact`,
            lastModified: new Date('2026-02-04'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${siteUrl}/newsletter`,
            lastModified: new Date('2026-02-07'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${siteUrl}/privacy-policy`,
            lastModified: new Date('2026-02-04'),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${siteUrl}/terms-of-service`,
            lastModified: new Date('2026-04-20'),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${siteUrl}/about`,
            lastModified: new Date('2026-04-20'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${siteUrl}/disclaimer`,
            lastModified: new Date('2026-04-28'),
            changeFrequency: 'yearly',
            priority: 0.6,
        },
        {
            url: `${siteUrl}/cookie-policy`,
            lastModified: new Date('2026-04-28'),
            changeFrequency: 'yearly',
            priority: 0.6,
        },
        {
            url: `${siteUrl}/uninstall`,
            lastModified: new Date('2026-02-04'),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${siteUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
    ]

    // Blog post pages — exclude noindexed duplicates
    const blogPages: MetadataRoute.Sitemap = blogPosts
        .filter((post) => !NOINDEX_SLUGS.has(post.slug))
        .map((post) => ({
            url: `${siteUrl}/blog/${post.slug}`,
            lastModified: new Date(post.lastModified),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))

    return [...staticPages, ...blogPages]
}
