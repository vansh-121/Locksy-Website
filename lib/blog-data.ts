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

// Tags are multi-word and inconsistently phrased across the corpus ("Browser
// Security" / "Advanced Security" / "Tab Security"), so exact tag equality
// alone finds nothing for several posts. Splitting into words recovers the
// obvious pairings. Words of 1-2 characters ("to", "a") carry no signal.
function tagWords(tags: string[]): Set<string> {
    return new Set(
        tags.flatMap(tag => tag.toLowerCase().split(/[\s/&-]+/)).filter(word => word.length > 2)
    )
}

// Similarity, normalized on both halves so tag *count* doesn't decide the
// ranking. This matters concretely: best-tab-locking-extensions-2026 carries 9
// tags while every other post has 3-5, so raw overlap counting made it the top
// match for almost the whole corpus — it was pulling 33 of a possible 34
// related-post links while the post that actually ranks in search,
// how-to-password-protect-browser-tabs, pulled 1. Dividing by the smaller tag
// set removes that advantage without penalising genuinely broad posts.
function similarity(a: BlogPost, b: BlogPost): number {
    const tagsA = new Set(a.tags)
    const exact = b.tags.filter(tag => tagsA.has(tag)).length / Math.max(1, Math.min(a.tags.length, b.tags.length))

    const wordsA = tagWords(a.tags)
    const wordsB = tagWords(b.tags)
    const union = new Set([...wordsA, ...wordsB]).size
    const shared = [...wordsB].filter(word => wordsA.has(word)).length

    // Exact tag agreement outweighs loose word overlap; the word term only
    // separates candidates that are otherwise tied.
    return exact * 10 + shared / Math.max(1, union)
}

// How much each additional inbound link costs a candidate. Purely a spreading
// term: relevance is unchanged by it (the same 80% of picks still share a real
// tag either way), but it stops a handful of hub posts absorbing every slot and
// leaves six posts with no inbound related links at all. Tuned by sweep — 0.15
// is the smallest value that brings every post to at least one inbound link.
const CROWDING_PENALTY = 0.15

// The penalty depends on links already handed out, so the assignment has to be
// computed in one deterministic pass rather than per call. getRelatedPosts runs
// once per page during static generation; if it mutated a shared counter, each
// page's results would depend on the order Next.js happened to render in.
// Building the whole map lazily once keeps output identical no matter who asks
// first, and costs one O(n^2) pass over ~34 posts.
let relatedPostsMap: Map<string, BlogPost[]> | null = null

function buildRelatedPostsMap(limit: number): Map<string, BlogPost[]> {
    const map = new Map<string, BlogPost[]>()
    const inboundCount = new Map<string, number>()

    // filteredBlogPosts is sorted newest-first and Array#sort is stable, so
    // equal scores fall back to recency.
    for (const post of filteredBlogPosts) {
        const ranked = filteredBlogPosts
            .filter(candidate => candidate.slug !== post.slug)
            .map(candidate => ({
                post: candidate,
                score: similarity(post, candidate) - CROWDING_PENALTY * (inboundCount.get(candidate.slug) ?? 0),
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(item => item.post)

        // Taking the top `limit` unconditionally means a post with no tag
        // overlap anywhere still gets a full block rather than an empty one.
        // Four posts (sandbox escapes, tab sync, passkeys, referrer policy) have
        // tag vocabulary nothing else uses; without this they rendered no
        // Related Articles section, which left them with no internal links out.
        for (const related of ranked) {
            inboundCount.set(related.slug, (inboundCount.get(related.slug) ?? 0) + 1)
        }
        map.set(post.slug, ranked)
    }

    return map
}

// Helper function to get related posts (only from visible posts)
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
    const currentPost = getBlogPost(currentSlug)
    if (!currentPost) return []

    // The precomputed map is built for the default limit against the visible
    // set. A noindexed post (present in blogPosts, absent from
    // filteredBlogPosts) or a non-default limit falls through to a direct
    // ranking — no crowding term, since there is no shared budget to balance.
    if (limit === 3 && filteredBlogPosts.some(post => post.slug === currentSlug)) {
        if (!relatedPostsMap) relatedPostsMap = buildRelatedPostsMap(3)
        return relatedPostsMap.get(currentSlug) ?? []
    }

    return filteredBlogPosts
        .filter(post => post.slug !== currentSlug)
        .map(post => ({ post, score: similarity(currentPost, post) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.post)
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
