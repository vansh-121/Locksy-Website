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

    // Use the 10 most-recent posts for the Blog schema (keeps payload small)
    const recentPosts = [...posts]
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
        .slice(0, 10)

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
        blogPost: recentPosts.map(post => ({
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
