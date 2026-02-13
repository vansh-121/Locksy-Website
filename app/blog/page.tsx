import { Metadata } from 'next'
import { generatePageMetadata, jsonLdWebsite } from '@/lib/metadata'
import { blogPosts, getAllCategories, getAllTags } from '@/lib/blog-data'
import { BlogClient } from './blog-client'

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

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        ...jsonLdWebsite,
                        '@type': 'Blog',
                        blogPost: [],
                    })
                }}
            />
            <BlogClient posts={posts} categories={categories} tags={tags} />
        </>
    )
}
