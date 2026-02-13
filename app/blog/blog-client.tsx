'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blog-data'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Clock, Calendar, Filter, Search, BookOpen, ArrowRight } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'

interface BlogClientProps {
    posts: BlogPost[]
    categories: string[]
    tags: string[]
}

export function BlogClient({ posts, categories, tags }: BlogClientProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

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

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-accent/30 to-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />

            <Header />

            <main className="relative max-w-7xl mx-auto px-4 md:px-6 pt-32 pb-12 md:pt-40 md:pb-20">
                {/* Hero Section */}
                <div className="text-center space-y-6 mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm">
                        <BookOpen className="h-4 w-4" />
                        Browser Security Blog
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Security Insights
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        Expert guides, tutorials, and best practices for securing your browser tabs and protecting your online privacy
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="max-w-4xl mx-auto mb-12 space-y-6">
                    {/* Search */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity rounded-2xl" />
                        <div className="relative bg-card/80 backdrop-blur-sm border-2 border-primary/10 rounded-2xl p-4 shadow-lg">
                            <div className="relative">
                                <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search articles by title, topic, or tag..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 h-12 text-base border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Category & Tag Filters */}
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Categories:</span>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(
                                    selectedCategory === category ? null : category
                                )}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20'
                                    : 'bg-card/80 border border-border/50 hover:border-primary/30 hover:bg-primary/5'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mr-1">Tags:</span>
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(
                                    selectedTag === tag ? null : tag
                                )}
                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 cursor-pointer ${selectedTag === tag
                                    ? 'bg-gradient-to-r from-primary to-secondary text-white border-0'
                                    : 'border-border/50 hover:border-primary/30'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    {/* Active Filters */}
                    {(selectedCategory || selectedTag || searchQuery) && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Active filters:</span>
                            {selectedCategory && (
                                <Badge className="bg-primary/10 text-primary border border-primary/20">
                                    {selectedCategory} ×
                                </Badge>
                            )}
                            {selectedTag && (
                                <Badge className="bg-secondary/10 text-secondary border border-secondary/20">
                                    {selectedTag} ×
                                </Badge>
                            )}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleClearFilters}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <Filter className="mr-1 h-3 w-3" />
                                Clear all
                            </Button>
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="max-w-7xl mx-auto mb-8">
                    <p className="text-sm text-muted-foreground">
                        {sortedPosts.length} {sortedPosts.length === 1 ? 'article' : 'articles'} found
                    </p>
                </div>

                {/* Blog Posts Grid */}
                {sortedPosts.length === 0 ? (
                    <div className="max-w-2xl mx-auto">
                        <Card className="border-2 border-dashed border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardContent className="py-16 text-center">
                                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                                <p className="text-xl font-semibold mb-2">No articles found</p>
                                <p className="text-muted-foreground mb-6">
                                    Try adjusting your search or clearing filters
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={handleClearFilters}
                                    className="gap-2"
                                >
                                    <Filter className="h-4 w-4" />
                                    Clear Filters
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {sortedPosts.map((post) => (
                            <div key={post.slug} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity rounded-2xl" />
                                <Card className="relative border-2 border-border/50 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 hover:border-primary/20 hover:-translate-y-1 h-full flex flex-col overflow-hidden">
                                    {/* Cover Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.imageAlt}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                                    </div>

                                    <CardHeader className="pb-3">
                                        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                                            <Badge
                                                variant="secondary"
                                                className="bg-gradient-to-r from-primary to-secondary border-0 text-white"
                                            >
                                                {post.category}
                                            </Badge>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <CardTitle className="line-clamp-2 text-lg leading-snug">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="hover:text-primary transition-colors"
                                            >
                                                {post.title}
                                            </Link>
                                        </CardTitle>
                                        <CardDescription className="line-clamp-3 mt-2">
                                            {post.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="flex-1 pb-3">
                                        <div className="flex flex-wrap gap-1.5">
                                            {post.tags.slice(0, 3).map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {post.tags.length > 3 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{post.tags.length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                    </CardContent>

                                    <CardFooter className="flex items-center justify-between pt-3 border-t border-border/30">
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(post.publishDate.replace(/-/g, '/')).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                        <Link href={`/blog/${post.slug}`}>
                                            <Button variant="ghost" size="sm" className="gap-1 group-hover:text-primary transition-colors">
                                                Read
                                                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}

                {/* Newsletter CTA Section */}
                <div className="max-w-3xl mx-auto mt-20">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                        <Card className="relative border-2 border-primary/20 bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
                            <CardHeader className="text-center pt-10">
                                <CardTitle className="text-3xl font-bold">Stay Updated on Browser Security</CardTitle>
                                <CardDescription className="text-base max-w-xl mx-auto">
                                    Get the latest security guides, tips, and Locksy updates delivered to your inbox
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col sm:flex-row justify-center gap-4 pb-10 px-8">
                                <Link href="/">
                                    <Button
                                        size="lg"
                                        className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/20"
                                    >
                                        Install Locksy Free
                                    </Button>
                                </Link>
                                <Link href="/newsletter">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                        Subscribe to Newsletter
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
