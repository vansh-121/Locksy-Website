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

export const blogPosts: BlogPost[] = allPosts as BlogPost[]

// Helper function to get a single blog post by slug
export function getBlogPost(slug: string): BlogPost | undefined {
    return blogPosts.find(post => post.slug === slug)
}

// Helper function to get related posts
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
    const currentPost = getBlogPost(currentSlug)
    if (!currentPost) return []

    const scoredPosts = blogPosts
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
    return blogPosts.filter(post => post.category === category)
}

export function getPostsByTag(tag: string): BlogPost[] {
    return blogPosts.filter(post => post.tags.includes(tag))
}

export function getAllCategories(): string[] {
    const categories = new Set(blogPosts.map(post => post.category))
    return Array.from(categories).sort()
}

export function getAllTags(): string[] {
    const tags = new Set(blogPosts.flatMap(post => post.tags))
    return Array.from(tags).sort()
}
