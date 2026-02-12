'use client'

import Link from 'next/link'
import { BlogPost, getRelatedPosts } from '@/lib/blog-data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Facebook, Linkedin, BookOpen } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'

interface BlogPostClientProps {
    post: BlogPost
}

export function BlogPostClient({ post }: BlogPostClientProps) {
    const relatedPosts = getRelatedPosts(post.slug, 3)
    const [currentUrl, setCurrentUrl] = useState('')

    useEffect(() => {
        setCurrentUrl(window.location.href)
    }, [])

    const shareToTwitter = () => {
        const text = `${post.title}`
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`,
            '_blank'
        )
    }

    const shareToFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
            '_blank'
        )
    }

    const shareToLinkedIn = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
            '_blank'
        )
    }

    const copyLink = () => {
        navigator.clipboard.writeText(currentUrl)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-accent/30 to-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />

            <Header />

            <main className="relative max-w-7xl mx-auto px-4 md:px-6 pt-32 pb-12 md:pt-40 md:pb-20">
                {/* Breadcrumb */}
                <div className="max-w-4xl mx-auto mb-8">
                    <Link href="/blog">
                        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Blog
                        </Button>
                    </Link>
                </div>

                {/* Article Header */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <Badge
                                variant="secondary"
                                className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary"
                            >
                                {post.category}
                            </Badge>
                            <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(post.publishDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {post.readTime}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            {post.title}
                        </h1>

                        <p className="text-xl text-muted-foreground">
                            {post.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="hover:border-primary/30 transition-colors">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {/* Share Bar */}
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                            <span className="text-sm font-medium text-muted-foreground">Share:</span>
                            <Button variant="outline" size="sm" onClick={shareToTwitter} className="gap-2 hover:border-primary/30">
                                <Twitter className="h-4 w-4" />
                                <span className="hidden sm:inline">Twitter</span>
                            </Button>
                            <Button variant="outline" size="sm" onClick={shareToFacebook} className="gap-2 hover:border-primary/30">
                                <Facebook className="h-4 w-4" />
                                <span className="hidden sm:inline">Facebook</span>
                            </Button>
                            <Button variant="outline" size="sm" onClick={shareToLinkedIn} className="gap-2 hover:border-primary/30">
                                <Linkedin className="h-4 w-4" />
                                <span className="hidden sm:inline">LinkedIn</span>
                            </Button>
                            <Button variant="outline" size="sm" onClick={copyLink} className="gap-2 hover:border-primary/30">
                                <Share2 className="h-4 w-4" />
                                <span className="hidden sm:inline">Copy</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="max-w-4xl mx-auto">
                    <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-12" />
                </div>

                {/* Article Content */}
                <article className="max-w-4xl mx-auto">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-secondary/5 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity rounded-3xl" />
                        <div className="relative bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-6 md:p-10 lg:p-12 shadow-lg">
                            <ReactMarkdown
                                components={{
                                    h1: ({ children }) => (
                                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mt-10 mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                            {children}
                                        </h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mt-10 mb-4 text-foreground flex items-center gap-3">
                                            <span className="w-1 h-7 bg-gradient-to-b from-primary to-secondary rounded-full flex-shrink-0" />
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl mt-8 mb-3 text-foreground">
                                            {children}
                                        </h3>
                                    ),
                                    h4: ({ children }) => (
                                        <h4 className="text-lg font-semibold tracking-tight mt-6 mb-2 text-foreground">
                                            {children}
                                        </h4>
                                    ),
                                    p: ({ children }) => (
                                        <p className="mb-4 leading-8 text-foreground/90 text-base md:text-lg">
                                            {children}
                                        </p>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="my-4 ml-6 list-disc space-y-2 text-foreground/90">
                                            {children}
                                        </ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="my-4 ml-6 list-decimal space-y-2 text-foreground/90">
                                            {children}
                                        </ol>
                                    ),
                                    li: ({ children }) => (
                                        <li className="leading-7 text-base md:text-lg">
                                            {children}
                                        </li>
                                    ),
                                    code: ({ children, className }) => {
                                        const isInline = !className
                                        return isInline ? (
                                            <code className="rounded-md bg-primary/10 text-primary px-2 py-0.5 font-mono text-sm border border-primary/20">
                                                {children}
                                            </code>
                                        ) : (
                                            <code className={`block rounded-lg bg-neutral-900 text-neutral-100 p-4 font-mono text-sm overflow-x-auto ${className}`}>
                                                {children}
                                            </code>
                                        )
                                    },
                                    pre: ({ children }) => (
                                        <pre className="my-6 overflow-x-auto rounded-xl bg-neutral-900 text-neutral-100 p-5 shadow-lg border border-neutral-800">
                                            {children}
                                        </pre>
                                    ),
                                    blockquote: ({ children }) => (
                                        <blockquote className="border-l-4 border-primary bg-primary/5 pl-6 pr-4 py-3 italic my-6 rounded-r-lg">
                                            {children}
                                        </blockquote>
                                    ),
                                    table: ({ children }) => (
                                        <div className="my-6 overflow-x-auto rounded-xl border border-border/50 shadow-sm">
                                            <table className="w-full border-collapse">
                                                {children}
                                            </table>
                                        </div>
                                    ),
                                    th: ({ children }) => (
                                        <th className="border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5 px-4 py-3 text-left font-semibold text-foreground">
                                            {children}
                                        </th>
                                    ),
                                    td: ({ children }) => (
                                        <td className="border-b border-border/30 px-4 py-3 text-foreground/90">
                                            {children}
                                        </td>
                                    ),
                                    a: ({ children, href }) => (
                                        <a
                                            href={href}
                                            className="text-primary font-medium underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-colors"
                                            target={href?.startsWith('http') ? '_blank' : undefined}
                                            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        >
                                            {children}
                                        </a>
                                    ),
                                    hr: () => (
                                        <div className="my-10 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                                    ),
                                    strong: ({ children }) => (
                                        <strong className="font-bold text-foreground">{children}</strong>
                                    ),
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </article>

                {/* Author & Updated Info */}
                <div className="max-w-4xl mx-auto mt-10">
                    <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                                <BookOpen className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">{post.author}</p>
                                <p className="text-sm text-muted-foreground">
                                    Updated {new Date(post.lastModified).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={shareToTwitter} className="gap-2">
                                <Twitter className="h-4 w-4" /> Share
                            </Button>
                            <Button variant="outline" size="sm" onClick={copyLink} className="gap-2">
                                <Share2 className="h-4 w-4" /> Copy Link
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="max-w-4xl mx-auto mt-16">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
                            <span className="w-1 h-7 bg-gradient-to-b from-primary to-secondary rounded-full" />
                            Related Articles
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {relatedPosts.map((relatedPost) => (
                                <div key={relatedPost.slug} className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity rounded-2xl" />
                                    <Card className="relative border-2 border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                                        <div className="h-1 bg-gradient-to-r from-primary to-secondary rounded-t-lg" />
                                        <CardHeader>
                                            <Badge variant="secondary" className="w-fit mb-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary">
                                                {relatedPost.category}
                                            </Badge>
                                            <CardTitle className="line-clamp-2 text-lg">
                                                <Link
                                                    href={`/blog/${relatedPost.slug}`}
                                                    className="hover:text-primary transition-colors"
                                                >
                                                    {relatedPost.title}
                                                </Link>
                                            </CardTitle>
                                            <CardDescription className="line-clamp-2">
                                                {relatedPost.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardFooter className="mt-auto">
                                            <Link href={`/blog/${relatedPost.slug}`} className="w-full">
                                                <Button variant="outline" size="sm" className="w-full gap-2">
                                                    Read More
                                                    <ArrowLeft className="h-3 w-3 rotate-180" />
                                                </Button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="max-w-3xl mx-auto mt-16">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                        <Card className="relative border-2 border-primary/20 bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
                            <CardHeader className="text-center pt-10">
                                <CardTitle className="text-3xl font-bold">Ready to Secure Your Browser Tabs?</CardTitle>
                                <CardDescription className="text-base max-w-xl mx-auto">
                                    Get started with Locksy today — free, open-source, and trusted by thousands
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
                                <Link href="/contact">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                        Contact Support
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
