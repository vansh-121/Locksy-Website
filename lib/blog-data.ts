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

// Posts that are noindexed due to thin content or duplication.
// These should NOT appear in listing pages, homepage, or category filters.
export const NOINDEX_SLUGS = new Set([
    // Variant duplicates
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
    // Ultra-thin/stub posts
    'why-your-open-browser-tabs-are-a-security-risk-in-2026',
    'how-to-create-an-unbreakable-master-password-for-tab-security',
    // Short legacy posts
    'keyboard-shortcuts-for-tab-security',
    'how-to-password-protect-browser-tabs',
    'protect-banking-tabs-from-prying-eyes',
])

// Filtered posts — used for blog listing, homepage, categories, tags, etc.
export const filteredBlogPosts: BlogPost[] = blogPosts.filter(
    post => !NOINDEX_SLUGS.has(post.slug)
)

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
