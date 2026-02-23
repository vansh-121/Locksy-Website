import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { blogPosts, getAllCategories, getAllTags } from '@/lib/blog-data'
import { BlogClient } from './blog-client'

const siteUrl = 'https://www.locksy.dev'

export const metadata: Metadata = generatePageMetadata(
    'Blog - Browser Security & Tab Protection Tips',
    'Expert guides on browser tab security, password protection, PBKDF2 encryption, and privacy best practices. Learn how to secure Chrome, Firefox, and Edge tabs.',
    '/blog',
    ['browser security blog', 'tab security tips', 'password protection guide', 'PBKDF2 tutorial', 'browser privacy']
)

export default function BlogPage() {
    const posts = blogPosts
    const categories = getAllCategories()
    const tags = getAllTags()

    // Score each post by engagement potential using available metadata signals:
    //   keywords.length  → broader search surface = more organic entry points
    //   tags.length      → topical coverage breadth
    //   readTime minutes → longer content tends to rank + hold attention better
    // Then deduplicate by category (max 2 per category) to show variety to Google,
    // and cap at 10 posts to keep payload lean.
    const scoredPosts = [...posts]
        .map(post => {
            const mins = parseInt(post.readTime, 10) || 0
            const score = post.keywords.length * 2 + post.tags.length + mins
            return { post, score }
        })
        .sort((a, b) => b.score - a.score)

    const categoryCounts: Record<string, number> = {}
    const featuredPosts = scoredPosts
        .filter(({ post }) => {
            const count = categoryCounts[post.category] ?? 0
            if (count >= 2) return false
            categoryCounts[post.category] = count + 1
            return true
        })
        .slice(0, 10)
        .map(({ post }) => post)

    const blogJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Locksy Blog',
        url: `${siteUrl}/blog`,
        description: 'Expert guides on browser tab security, password protection, and privacy best practices.',
        inLanguage: 'en-US',
        publisher: {
            '@type': 'Organization',
            name: 'Locksy',
            url: siteUrl,
            logo: { '@type': 'ImageObject', url: `${siteUrl}/web-app-manifest-512x512.png` },
        },
        blogPost: featuredPosts.map(post => ({
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            url: `${siteUrl}/blog/${post.slug}`,
            datePublished: post.publishDate,
            dateModified: post.lastModified,
            image: post.image,
            keywords: post.keywords.join(', '),
            author: { '@type': 'Organization', name: post.author, url: siteUrl },
        })),
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd).replace(/</g, '\\u003c') }}
            />
            <BlogClient posts={posts} categories={categories} tags={tags} />
        </>
    )
}
