import { Metadata } from 'next'
import { generatePageMetadata, jsonLdWebsite } from '@/lib/metadata'
import { BlogClient } from './blog-client'

export const metadata: Metadata = generatePageMetadata(
    'Blog - Browser Security & Tab Protection Tips',
    'Expert guides on browser tab security, password protection, PBKDF2 encryption, and privacy best practices. Learn how to secure Chrome, Firefox, and Edge tabs.',
    '/blog',
    ['browser security blog', 'tab security tips', 'password protection guide', 'PBKDF2 tutorial', 'browser privacy']
)

export default function BlogPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        ...jsonLdWebsite,
                        '@type': 'Blog',
                        blogPost: [], // Will be populated by client
                    })
                }}
            />
            <BlogClient />
        </>
    )
}
