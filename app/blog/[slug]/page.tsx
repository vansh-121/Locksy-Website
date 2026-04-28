import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogPost, getRelatedPosts } from '@/lib/blog-data'
import { BlogPostClient } from './blog-post-client'

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }))
}

// Duplicate/variant blog posts that should be noindexed to avoid
// Google's "thin content" / "low value content" penalty.
// These are near-duplicates of other posts with minor variations.
const NOINDEX_SLUGS = new Set([
    // Variant duplicates — each has a "main" version plus extras
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

    // Ultra-thin/stub posts — too short for AdSense quality standards
    'why-your-open-browser-tabs-are-a-security-risk-in-2026',         // 113 words (stub)
    'how-to-create-an-unbreakable-master-password-for-tab-security',  // 305 words (stub)

    // Short legacy posts — below modern content depth threshold
    'keyboard-shortcuts-for-tab-security',                            // 1,005 words
    'how-to-password-protect-browser-tabs',                           // 1,095 words
    'protect-banking-tabs-from-prying-eyes',                          // 1,243 words
])

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = getBlogPost(slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    const siteUrl = 'https://www.locksy.dev'
    const postUrl = `${siteUrl}/blog/${post.slug}`

    // Noindex duplicate/variant posts to avoid thin content penalties
    const shouldNoindex = NOINDEX_SLUGS.has(slug)

    return {
        title: post.title,
        description: post.description,
        keywords: post.keywords.join(', '),
        authors: [{ name: post.author }],
        openGraph: {
            type: 'article',
            url: postUrl,
            title: post.title,
            description: post.description,
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.imageAlt,
                },
            ],
            publishedTime: post.publishDate,
            modifiedTime: post.lastModified,
            authors: [post.author],
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: [post.image],
            creator: '@locksy',
        },
        alternates: {
            canonical: postUrl,
        },
        robots: shouldNoindex ? {
            index: false,
            follow: true,
        } : {
            index: true,
            follow: true,
        },
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = getBlogPost(slug)

    if (!post) {
        notFound()
    }

    const siteUrl = 'https://www.locksy.dev'
    const postUrl = `${siteUrl}/blog/${post.slug}`

    // Structured data for the blog post
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: post.image,
        datePublished: post.publishDate,
        dateModified: post.lastModified,
        author: {
            '@type': 'Organization',
            name: post.author,
            url: siteUrl,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Locksy',
            logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/web-app-manifest-512x512.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': postUrl,
        },
        keywords: post.keywords.join(', '),
        articleSection: post.category,
        wordCount: post.content.split(/\s+/).length,
    }

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
            { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
        ],
    }

    // Add inLanguage to the article schema
    const fullJsonLd = { ...jsonLd, inLanguage: 'en-US' }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(fullJsonLd).replace(/</g, '\\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c') }}
            />
            <BlogPostClient post={post} relatedPosts={getRelatedPosts(post.slug, 3)} />
        </>
    )
}
