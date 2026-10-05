import { MetadataRoute } from 'next'
import { blogPosts, NOINDEX_SLUGS } from '@/lib/blog-data'

const siteUrl = 'https://www.locksy.dev'

// Stable last-modified date for the evergreen marketing/content pages. Using a
// fixed date instead of `new Date()` keeps <lastmod> truthful and stable across
// builds — "everything changed today, every crawl" trains Google to distrust the
// signal. Bump this when the home / security / guide / pricing / tools pages get a
// meaningful content update. Legal pages carry their own explicit dates below.
const LAST_UPDATED = '2026-09-15'

export default function sitemap(): MetadataRoute.Sitemap {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: `${siteUrl}/`,
            lastModified: new Date(LAST_UPDATED),
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
            url: `${siteUrl}/security`,
            lastModified: new Date(LAST_UPDATED),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${siteUrl}/guide`,
            lastModified: new Date(LAST_UPDATED),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${siteUrl}/pricing`,
            lastModified: new Date(LAST_UPDATED),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${siteUrl}/tools`,
            lastModified: new Date(LAST_UPDATED),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${siteUrl}/tools/password-strength-checker`,
            lastModified: new Date(LAST_UPDATED),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${siteUrl}/tools/password-generator`,
            lastModified: new Date(LAST_UPDATED),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${siteUrl}/tools/browser-privacy-score`,
            lastModified: new Date(LAST_UPDATED),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${siteUrl}/tools/email-breach-checker`,
            lastModified: new Date(LAST_UPDATED),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${siteUrl}/privacy-policy`,
            lastModified: new Date('2026-07-31'),
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
            lastModified: new Date(LAST_UPDATED),
            changeFrequency: 'weekly',
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
