import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogPost } from '@/lib/blog-data'
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

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\u003c') }}
            />
            <BlogPostClient post={post} />
        </>
    )
}
