export interface BlogPost {
    slug: string
    title: string
    description: string
    content: string
    author: string
    publishDate: string
    lastModified: string
    readTime: string
    category: string
    tags: string[]
    keywords: string[]
    image: string
    imageAlt: string
}

import { allPosts } from './posts/index'

// All posts — used for individual page routing (so noindexed pages still render)
export const blogPosts: BlogPost[] = allPosts as BlogPost[]

// Posts that are noindexed due to thin or shorter content.
// These still render if visited (they exist in legacy.ts) but should NOT
// appear in listing pages, homepage, category filters, or the sitemap.
export const NOINDEX_SLUGS = new Set<string>([])

// Filtered posts — sorted by publishDate descending (latest first)
export const filteredBlogPosts: BlogPost[] = blogPosts
    .filter(post => !NOINDEX_SLUGS.has(post.slug))
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

// Helper function to get a single blog post by slug
export function getBlogPost(slug: string): BlogPost | undefined {
    return blogPosts.find(post => post.slug === slug)
}

// Helper function to get related posts (only from visible posts)
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
    const currentPost = getBlogPost(currentSlug)
    if (!currentPost) return []

    const scoredPosts = filteredBlogPosts
        .filter(post => post.slug !== currentSlug)
        .map(post => {
            const commonTags = post.tags.filter(tag => currentPost.tags.includes(tag))
            return { post, score: commonTags.length }
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)

    return scoredPosts.map(item => item.post)
}

export function getPostsByCategory(category: string): BlogPost[] {
    return filteredBlogPosts.filter(post => post.category === category)
}

export function getPostsByTag(tag: string): BlogPost[] {
    return filteredBlogPosts.filter(post => post.tags.includes(tag))
}

export function getAllCategories(): string[] {
    const categories = new Set(filteredBlogPosts.map(post => post.category))
    return Array.from(categories).sort()
}

export function getAllTags(): string[] {
    const tags = new Set(filteredBlogPosts.flatMap(post => post.tags))
    return Array.from(tags).sort()
}
