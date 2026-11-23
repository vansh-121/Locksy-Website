'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { BlogPost, BlogPostSummary } from '@/lib/blog-data'
import { Filter, Search, BookOpen, ArrowUpRight, Eye, X, ChevronDown } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { PageHero } from '@/components/page-shell'

interface BlogClientProps {
    posts: (BlogPost | BlogPostSummary)[]
    categories: string[]
    tags: string[]
}

const formatDate = (date: string) =>
    new Date(date.replace(/-/g, '/')).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })

export function BlogClient({ posts, categories, tags }: BlogClientProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const [showTags, setShowTags] = useState(false)
    // Real view counts, batch-fetched once for all posts (read-only — the listing
    // never increments). Empty until loaded, or if Upstash isn't configured.
    const [views, setViews] = useState<Record<string, number>>({})

    useEffect(() => {
        if (posts.length === 0) return
        const slugs = posts.map(p => p.slug).join(',')
        let cancelled = false
        fetch(`/api/views?slugs=${encodeURIComponent(slugs)}`)
            .then(res => (res.ok ? res.json() : null))
            .then(data => {
                if (!cancelled && data && data.views) setViews(data.views)
            })
            .catch(() => { /* counts are optional; ignore */ })
        return () => { cancelled = true }
    }, [posts])

    const formatViews = (n: number): string => {
        if (n < 1000) return String(n)
        if (n < 1_000_000) return `${(n / 1000).toFixed(n % 1000 >= 100 ? 1 : 0).replace(/\.0$/, '')}K`
        return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
    }

    const filteredPosts = posts.filter(post => {
        const matchesSearch = searchQuery === '' ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesCategory = !selectedCategory || post.category === selectedCategory
        const matchesTag = !selectedTag || post.tags.includes(selectedTag)

        return matchesSearch && matchesCategory && matchesTag
    })

    const sortedPosts = [...filteredPosts].sort((a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )

    const handleClearFilters = () => {
        setSelectedCategory(null)
        setSelectedTag(null)
        setSearchQuery('')
    }

    const hasFilters = Boolean(selectedCategory || selectedTag || searchQuery)
    // The newest post is featured only on the unfiltered listing; once the
    // reader filters, every match goes into the grid.
    const featuredPost = !hasFilters ? sortedPosts[0] : undefined
    const gridPosts = featuredPost ? sortedPosts.slice(1) : sortedPosts

    const pill = (active: boolean) =>
        `inline-flex h-9 items-center rounded-full border px-4 text-sm transition-colors ${active
            ? 'bg-foreground text-background border-foreground'
            : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'
        }`

    const viewsBadge = (slug: string) =>
        views[slug] != null && (
            <>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1" title={`${views[slug].toLocaleString('en-US')} views`}>
                    <Eye className="h-3 w-3" aria-hidden="true" />
                    {formatViews(views[slug])}
                </span>
            </>
        )

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main>
                <PageHero
                    eyebrow="Blog"
                    title="Locksy Security Insights"
                    description="Expert guides, tutorials, and best practices for securing your browser tabs and protecting your online privacy"
                />

                <div className="mx-auto max-w-6xl px-4 pb-16 md:px-6 md:pb-24">
                    {/* Search & Filters */}
                    <div className="mx-auto mb-12 max-w-4xl space-y-6">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                            <input
                                type="search"
                                aria-label="Search articles"
                                placeholder="Search articles by title, topic, or tag..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-11 w-full rounded-full border border-border bg-card pl-12 pr-5 text-[15px] text-foreground placeholder:text-muted-foreground outline-none transition-colors focus-visible:border-foreground/30 focus-visible:ring-2 focus-visible:ring-highlight/40"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <span className="mr-1 text-sm text-muted-foreground">Categories:</span>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    aria-pressed={selectedCategory === category}
                                    onClick={() => setSelectedCategory(
                                        selectedCategory === category ? null : category
                                    )}
                                    className={pill(selectedCategory === category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* The full tag list is long, so it stays collapsed until asked for. */}
                        <button
                            type="button"
                            onClick={() => setShowTags((v) => !v)}
                            aria-expanded={showTags}
                            aria-controls="blog-tag-list"
                            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showTags ? 'Hide tags' : `Browse all ${tags.length} tags`}
                            <ChevronDown className={`h-4 w-4 transition-transform ${showTags ? 'rotate-180' : ''}`} aria-hidden="true" />
                        </button>

                        {showTags && (
                        <div id="blog-tag-list" className="flex flex-wrap items-center gap-1.5">
                            {tags.map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    aria-pressed={selectedTag === tag}
                                    onClick={() => setSelectedTag(
                                        selectedTag === tag ? null : tag
                                    )}
                                    className={`inline-flex h-7 items-center rounded-full border px-3 text-xs transition-colors ${selectedTag === tag
                                        ? 'bg-foreground text-background border-foreground'
                                        : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                        )}

                        {/* Active Filters */}
                        {hasFilters && (
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm text-muted-foreground">Active filters:</span>
                                {selectedCategory && (
                                    <span className="inline-flex h-7 items-center gap-1 rounded-full border border-border bg-muted px-3 text-xs text-foreground">
                                        {selectedCategory} <X className="h-3 w-3" aria-hidden="true" />
                                    </span>
                                )}
                                {selectedTag && (
                                    <span className="inline-flex h-7 items-center gap-1 rounded-full border border-border bg-muted px-3 text-xs text-foreground">
                                        {selectedTag} <X className="h-3 w-3" aria-hidden="true" />
                                    </span>
                                )}
                                <button
                                    type="button"
                                    onClick={handleClearFilters}
                                    className="inline-flex h-7 items-center gap-1 px-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <Filter className="h-3 w-3" aria-hidden="true" />
                                    Clear all
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Results Count */}
                    <p className="mb-6 text-sm text-muted-foreground">
                        {sortedPosts.length} {sortedPosts.length === 1 ? 'article' : 'articles'} found
                    </p>

                    {sortedPosts.length === 0 ? (
                        <div className="surface mx-auto max-w-2xl px-6 py-16 text-center">
                            <BookOpen className="mx-auto mb-4 h-10 w-10 text-muted-foreground/60" aria-hidden="true" />
                            <p className="mb-2 text-lg font-semibold text-foreground">No articles found</p>
                            <p className="mb-6 text-muted-foreground">
                                Try adjusting your search or clearing filters
                            </p>
                            <button type="button" onClick={handleClearFilters} className="btn-secondary btn-sm">
                                <Filter className="h-4 w-4" aria-hidden="true" />
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Featured post */}
                            {featuredPost && (
                                <Link
                                    href={`/blog/${featuredPost.slug}`}
                                    className="surface group mb-4 grid overflow-hidden transition-colors hover:border-foreground/20 md:grid-cols-2"
                                >
                                    <div className="m-2 aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-muted md:mr-0 md:aspect-auto md:min-h-[320px]">
                                        <img
                                            src={featuredPost.image}
                                            alt={featuredPost.imageAlt}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center p-6 md:p-10">
                                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                            <span className="text-foreground/80">{featuredPost.category}</span>
                                            <span aria-hidden="true">·</span>
                                            <time dateTime={featuredPost.publishDate}>{formatDate(featuredPost.publishDate)}</time>
                                            <span aria-hidden="true">·</span>
                                            <span>{featuredPost.readTime}</span>
                                            {viewsBadge(featuredPost.slug)}
                                        </div>
                                        <h2 className="mt-4 text-2xl font-semibold leading-tight text-foreground md:text-3xl text-balance">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="mt-4 line-clamp-3 leading-relaxed text-muted-foreground">
                                            {featuredPost.description}
                                        </p>
                                        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                                            Read
                                            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden="true" />
                                        </span>
                                    </div>
                                </Link>
                            )}

                            {/* Blog Posts Grid */}
                            {gridPosts.length > 0 && (
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {gridPosts.map((post) => (
                                        <Link
                                            key={post.slug}
                                            href={`/blog/${post.slug}`}
                                            className="surface group flex flex-col overflow-hidden transition-colors hover:border-foreground/20"
                                        >
                                            <div className="m-2 mb-0 aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-muted">
                                                <img
                                                    src={post.image}
                                                    alt={post.imageAlt}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col p-6">
                                                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                                    <span className="text-foreground/80">{post.category}</span>
                                                    <span aria-hidden="true">·</span>
                                                    <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
                                                    <span aria-hidden="true">·</span>
                                                    <span>{post.readTime}</span>
                                                    {viewsBadge(post.slug)}
                                                </div>
                                                <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug text-foreground">{post.title}</h3>
                                                <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* Newsletter CTA Section */}
                    <div className="surface relative mx-auto mt-20 max-w-3xl overflow-hidden px-6 py-12 text-center md:px-10">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 top-0 h-48"
                            style={{ background: 'radial-gradient(50% 60% at 50% 0%, var(--glow), transparent 70%)' }}
                        />
                        <div className="relative">
                            <h2 className="text-2xl font-semibold text-foreground md:text-3xl text-balance">Stay Updated on Browser Security</h2>
                            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
                                Get the latest security guides, tips, and Locksy updates delivered to your inbox
                            </p>
                            <div className="mt-8 flex justify-center">
                                <Link href="/" className="btn-primary">
                                    Install Locksy Free
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
