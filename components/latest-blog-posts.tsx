"use client"

import Link from "next/link"
import type { BlogPost } from "@/lib/blog-data"
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react"

interface LatestBlogPostsProps {
    posts: BlogPost[]
}

export default function LatestBlogPosts({ posts }: LatestBlogPostsProps) {
    // Take the 3 most recent posts
    const latestPosts = [...posts]
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
        .slice(0, 3)

    if (latestPosts.length === 0) return null

    return (
        <section className="py-20 md:py-32 bg-gradient-to-b from-accent/30 to-background relative overflow-hidden">
            {/* Animated background blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/8 dark:bg-primary/15 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-secondary/8 dark:bg-secondary/15 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm mb-6">
                        <BookOpen className="h-4 w-4" />
                        Security Insights
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-4">
                        Latest from the{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Blog
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Expert guides on browser security, privacy best practices, and tab protection strategies to keep your digital life secure.
                    </p>
                </div>

                {/* Posts Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {latestPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group relative bg-card rounded-3xl overflow-hidden shadow-lg border border-border hover:shadow-2xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.imageAlt}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                                <span className="absolute bottom-3 left-3 px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-full">
                                    {post.category}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(post.publishDate.replace(/-/g, '/')).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {post.readTime}
                                    </span>
                                </div>

                                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">
                                    {post.description}
                                </p>

                                <div className="mt-4 pt-4 border-t border-border/50">
                                    <span className="text-sm font-semibold text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Read Article
                                        <ArrowRight className="h-4 w-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All CTA */}
                <div className="text-center mt-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-xl hover:shadow-primary/20 transition-all hover:scale-105 font-bold text-lg"
                    >
                        View All Articles
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
