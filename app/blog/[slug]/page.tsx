import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogPost, getRelatedPosts, NOINDEX_SLUGS } from '@/lib/blog-data'
import { jsonLdItemList, generateFAQSchema } from '@/lib/metadata'
import { BlogPostClient } from './blog-post-client'

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }))
}

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
        // Person author (not Organization) is a stronger E-E-A-T signal: it ties
        // the article to a named, verifiable individual with an external profile.
        author: {
            '@type': 'Person',
            name: post.author,
            url: `${siteUrl}/about`,
            sameAs: ['https://github.com/vansh-121'],
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
        // speakable marks the answer-first summary for voice assistants (AEO).
        // The TL;DR renders inside .blog-tldr; description is the fallback target.
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['.blog-tldr', '.blog-description'],
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

    // FAQPage schema — only when the post actually has FAQs, so the rendered
    // page and the structured data always agree (Google penalises FAQ markup
    // with no matching on-page content).
    const faqJsonLd = post.faq && post.faq.length > 0 ? generateFAQSchema(post.faq) : null

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
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
                />
            )}
            {slug === 'best-tab-locking-extensions-2026' && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList).replace(/</g, '\\u003c') }}
                />
            )}
            <BlogPostClient post={post} relatedPosts={getRelatedPosts(post.slug, 3)} />
        </>
    )
}
