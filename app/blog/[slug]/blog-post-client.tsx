'use client'

import Link from 'next/link'
import type { BlogPost, BlogPostSummary } from '@/lib/blog-data'
import BlogFaq from '@/components/blog-faq'
import { Share2, Twitter, Facebook, Linkedin, Check, ArrowUpRight } from 'lucide-react'
import React, { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect, useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import BlogViewCounter from '@/components/blog-view-counter'
import BlogToc, { extractHeadings } from '@/components/blog-toc'
import { Breadcrumbs } from '@/components/page-shell'
import { slugify } from '@/lib/utils'
import { MidArticleInstallCta, useDetectedBrowser } from '@/components/browser-install-cta'
import InstallButtons from '@/components/install-buttons'

interface BlogPostClientProps {
    post: BlogPost
    relatedPosts: (BlogPost | BlogPostSummary)[]
}

// Flatten ReactMarkdown heading children to plain text so we can derive the
// same id the TOC computed from the raw markdown. Handles strings, arrays, and
// nested React elements (e.g. `**bold**` inside a heading).
function nodeToText(node: React.ReactNode): string {
    if (node == null || typeof node === 'boolean') return ''
    if (typeof node === 'string' || typeof node === 'number') return String(node)
    if (Array.isArray(node)) return node.map(nodeToText).join('')
    if (React.isValidElement(node)) return nodeToText((node.props as { children?: React.ReactNode }).children)
    return ''
}

const shareBtn =
    'inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
    const [currentUrl, setCurrentUrl] = useState('')

    // Parse headings once for the TOC. The heading renderers below slugify their
    // own text the same way, and a shared counter keeps duplicate headings in
    // sync with extractHeadings' de-duping.
    const headings = useMemo(() => extractHeadings(post.content), [post.content])
    const midH2Id = useMemo(() => {
        const h2s = headings.filter((h) => h.level === 2)
        if (h2s.length < 2) return null
        return h2s[Math.floor(h2s.length / 2)]?.id ?? null
    }, [headings])

    // In-article store links are rewritten to the visitor's own store.
    const detected = useDetectedBrowser()

    useEffect(() => {
        setCurrentUrl(window.location.href)
    }, [])

    // Heading ids come from extractHeadings (the same list the TOC uses), keyed
    // by the heading's line in the markdown. A render-time counter gave
    // duplicated ids ("foo-1") whenever React rendered the tree twice, which
    // broke hydration and TOC links.
    const idsByLine = useMemo(() => new Map(headings.map((h) => [h.line, h.id])), [headings])
    const idForHeading = (text: string, node?: { position?: { start?: { line?: number } } }): string => {
        const line = node?.position?.start?.line
        const known = line !== undefined ? idsByLine.get(line) : undefined
        return known ?? slugify(text)
    }

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

    const copyLink = async () => {
        if (!navigator.clipboard) {
            console.error('Clipboard API is not available in this browser.')
            return
        }
        try {
            await navigator.clipboard.writeText(currentUrl)
        } catch (error) {
            console.error('Failed to copy link to clipboard:', error)
        }
    }

    const bodyText = 'text-[17px] leading-[1.8] text-foreground/85'

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="page-top-offset pb-16 md:pb-24">
                <div className="mx-auto max-w-[1280px] px-4 md:px-6">
                    {/* Article Header */}
                    <header className="mx-auto max-w-[720px]">
                        <Breadcrumbs
                            centered={false}
                            items={[
                                { label: 'Home', href: '/' },
                                { label: 'Blog', href: '/blog' },
                                { label: post.title },
                            ]}
                        />

                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                            <span className="text-foreground/80">{post.category}</span>
                            <span aria-hidden="true">·</span>
                            <time dateTime={post.publishDate}>
                                {new Date(post.publishDate.replace(/-/g, '/')).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                            <span aria-hidden="true">·</span>
                            <span>{post.readTime}</span>
                            <span aria-hidden="true">·</span>
                            <Link href="/about" className="transition-colors hover:text-foreground">
                                By {post.author}
                            </Link>
                            <BlogViewCounter slug={post.slug} className="ml-1" />
                        </div>

                        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] text-foreground md:text-5xl text-balance">
                            {post.title}
                        </h1>

                        <p className="blog-description mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl text-pretty">
                            {post.description}
                        </p>

                        {/* TL;DR — answer-first summary. Rendered synchronously from
                            props so it's in the server HTML: quotable by AI answer
                            engines (GEO) and adds rendered words. The .blog-tldr class
                            is the speakable target declared in page.tsx. */}
                        {post.tldr && (
                            <div className="surface mt-8 p-6">
                                <span className="eyebrow">
                                    <span className="eyebrow-dot" aria-hidden="true" />
                                    TL;DR
                                </span>
                                <p className="blog-tldr mt-4 text-base leading-relaxed text-foreground/90 md:text-[17px]">
                                    {post.tldr}
                                </p>
                            </div>
                        )}

                        <div className="mt-6 flex flex-wrap gap-1.5">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex h-7 items-center rounded-full border border-border px-3 text-xs text-muted-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Share Bar */}
                        <div className="mt-6 flex flex-wrap items-center gap-2">
                            <span className="mr-1 text-sm text-muted-foreground">Share:</span>
                            <button type="button" onClick={shareToTwitter} className={shareBtn} aria-label="Share on Twitter" title="Twitter">
                                <Twitter className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <button type="button" onClick={shareToFacebook} className={shareBtn} aria-label="Share on Facebook" title="Facebook">
                                <Facebook className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <button type="button" onClick={shareToLinkedIn} className={shareBtn} aria-label="Share on LinkedIn" title="LinkedIn">
                                <Linkedin className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <button type="button" onClick={copyLink} className={shareBtn} aria-label="Copy link" title="Copy">
                                <Share2 className="h-4 w-4" aria-hidden="true" />
                            </button>
                        </div>
                    </header>

                    {/* Hero Image */}
                    <div className="mx-auto mt-10 max-w-[720px] overflow-hidden rounded-3xl border border-border bg-muted">
                        <img
                            src={post.image}
                            alt={post.imageAlt}
                            width={1200}
                            height={630}
                            fetchPriority="high"
                            decoding="async"
                            className="block h-auto w-full"
                        />
                    </div>

                    {/* Body column + sticky Table of Contents. The TOC renders its
                        full list in the server HTML (never null) so it survives
                        before hydration. On desktop it sits in the right column; on
                        smaller screens BlogToc's collapsible panel renders in-flow
                        above the article. */}
                    <div className="mx-auto mt-12 grid max-w-[720px] gap-10 xl:max-w-none xl:grid-cols-[minmax(0,1fr)_minmax(0,720px)_minmax(0,1fr)] xl:gap-12">
                        {headings.length > 0 && (
                            <aside className="xl:col-start-3 xl:row-start-1 xl:max-w-[240px]">
                                <BlogToc headings={headings} />
                            </aside>
                        )}

                        <div className="min-w-0 xl:col-start-2 xl:row-start-1">
                            {/* Key Takeaways — scannable bullets for answer engines (AEO).
                                Rendered from props, present in server HTML. */}
                            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                                <div className="surface mb-10 p-6 md:p-8">
                                    <h2 className="eyebrow font-sans tracking-normal">
                                        <span className="eyebrow-dot" aria-hidden="true" />
                                        Key Takeaways
                                    </h2>
                                    <ul className="mt-5 space-y-3">
                                        {post.keyTakeaways.map((point, i) => (
                                            <li key={i} className="flex items-start gap-3 text-foreground/85">
                                                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-highlight" aria-hidden="true" />
                                                <span className="text-base leading-relaxed">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <article className="min-w-0">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        h1: ({ children }) => (
                                            <h1 className="mt-14 mb-5 text-3xl font-semibold leading-tight text-foreground md:text-4xl text-balance">
                                                {children}
                                            </h1>
                                        ),
                                        h2: ({ children, node }) => {
                                            const headingId = idForHeading(nodeToText(children), node)
                                            const isMidArticle = midH2Id && headingId === midH2Id

                                            return (
                                                <>
                                                    {isMidArticle && <MidArticleInstallCta />}
                                                    <h2 id={headingId} className="mt-14 mb-4 scroll-mt-28 text-2xl font-semibold leading-tight text-foreground md:text-3xl text-balance">
                                                        {children}
                                                    </h2>
                                                </>
                                            )
                                        },
                                        h3: ({ children, node }) => (
                                            <h3 id={idForHeading(nodeToText(children), node)} className="mt-10 mb-3 scroll-mt-28 text-xl font-semibold leading-snug text-foreground">
                                                {children}
                                            </h3>
                                        ),
                                        h4: ({ children }) => (
                                            <h4 className="mt-8 mb-2 text-lg font-semibold text-foreground">
                                                {children}
                                            </h4>
                                        ),
                                        p: ({ children, node }) => {
                                            // If paragraph contains an image, render as div to avoid invalid <figure> inside <p>
                                            const hasImage = node?.children?.some(
                                                (child: any) => child.tagName === 'img' || child.type === 'element' && child.tagName === 'img'
                                            )
                                            if (hasImage) {
                                                return (
                                                    <div className={`my-5 ${bodyText}`}>
                                                        {children}
                                                    </div>
                                                )
                                            }
                                            return (
                                                <p className={`my-5 ${bodyText}`}>
                                                    {children}
                                                </p>
                                            )
                                        },
                                        ul: ({ children }) => (
                                            <ul className={`my-5 ml-6 list-disc space-y-2 marker:text-highlight ${bodyText}`}>
                                                {children}
                                            </ul>
                                        ),
                                        ol: ({ children }) => (
                                            <ol className={`my-5 ml-6 list-decimal space-y-2 marker:text-highlight ${bodyText}`}>
                                                {children}
                                            </ol>
                                        ),
                                        li: ({ children }) => (
                                            <li className="pl-1">
                                                {children}
                                            </li>
                                        ),
                                        code: ({ children, className }) => {
                                            const isInline = !className
                                            return isInline ? (
                                                <code className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
                                                    {children}
                                                </code>
                                            ) : (
                                                <code className={`block font-mono text-sm leading-relaxed text-foreground ${className}`}>
                                                    {children}
                                                </code>
                                            )
                                        },
                                        pre: ({ children }) => (
                                            // Fenced blocks without a language reach the inline `code`
                                            // renderer; the child resets strip its pill styling here.
                                            <pre className="my-8 overflow-x-auto rounded-2xl border border-border bg-muted/40 p-5 text-sm text-foreground [&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-sm">
                                                {children}
                                            </pre>
                                        ),
                                        blockquote: ({ children }) => (
                                            <blockquote className="my-8 border-l-2 border-highlight pl-5 italic text-foreground/80 [&>p]:text-foreground/80">
                                                {children}
                                            </blockquote>
                                        ),
                                        table: ({ children }) => (
                                            <div className="my-8 overflow-x-auto rounded-2xl border border-border">
                                                <table className="w-full border-collapse text-[15px] [&_tbody_tr:last-child>td]:border-b-0">
                                                    {children}
                                                </table>
                                            </div>
                                        ),
                                        th: ({ children }) => (
                                            <th className="border-b border-border bg-muted/50 px-4 py-3 text-left font-semibold text-foreground">
                                                {children}
                                            </th>
                                        ),
                                        td: ({ children }) => (
                                            <td className="border-b border-border px-4 py-3 align-top leading-relaxed text-foreground/85">
                                                {children}
                                            </td>
                                        ),
                                        a: ({ children, href }) => {
                                            const textContent = nodeToText(children)
                                            const isExplicitStoreLabel = /Firefox Add-ons|Edge Add-ons|Chrome Web Store/i.test(textContent)

                                            const isLocksyStoreLink = href && (
                                                href.includes('chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim') ||
                                                href.includes('microsoftedge.microsoft.com/addons/detail/locksy') ||
                                                href.includes('addons.mozilla.org/en-US/firefox/addon/locksy') ||
                                                href === '/install' ||
                                                href === 'https://www.locksy.dev/install'
                                            )

                                            // Route in-article Locksy store links to the visitor's detected browser store
                                            const targetHref = (isLocksyStoreLink && !isExplicitStoreLabel) ? detected.url : href
                                            const safeHref = targetHref && /^(https?:|mailto:|tel:|\/|#)/.test(targetHref) ? targetHref : undefined

                                            return (
                                                <a
                                                    href={safeHref}
                                                    className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
                                                    target={safeHref?.startsWith('http') ? '_blank' : undefined}
                                                    rel={safeHref?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                >
                                                    {children}
                                                </a>
                                            )
                                        },
                                        hr: () => (
                                            <hr className="my-12 border-border" />
                                        ),
                                        img: ({ src, alt }) => {
                                            const safeSrc = typeof src === 'string' && (/^https?:\/\//.test(src) || src.startsWith('/')) ? src : undefined
                                            if (!safeSrc) return null
                                            return (
                                                <figure className="my-8">
                                                    <div className="overflow-hidden rounded-2xl border border-border">
                                                        <img
                                                            src={safeSrc}
                                                            alt={alt || ''}
                                                            className="h-auto w-full object-cover"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                    {alt && (
                                                        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                                                            {alt}
                                                        </figcaption>
                                                    )}
                                                </figure>
                                            )
                                        },
                                        strong: ({ children }) => (
                                            <strong className="font-semibold text-foreground">{children}</strong>
                                        ),
                                    }}
                                >
                                    {post.content}
                                </ReactMarkdown>
                            </article>

                            {/* FAQ — per-post Q&A. Rendered when present; also emitted as
                                FAQPage JSON-LD from page.tsx for rich results (AEO). */}
                            {post.faq && post.faq.length > 0 && (
                                <section className="mt-16" aria-labelledby="faq-heading">
                                    <h2 id="faq-heading" className="mb-6 scroll-mt-28 text-2xl font-semibold text-foreground md:text-3xl">
                                        Frequently Asked Questions
                                    </h2>
                                    <BlogFaq items={post.faq} />
                                </section>
                            )}

                            {/* Author Bio Card — E-E-A-T signal for AdSense & Google */}
                            <div className="surface mt-12 p-6 md:p-8">
                                <div className="flex flex-col gap-5 sm:flex-row">
                                    {/* Avatar */}
                                    <div className="flex-shrink-0">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-muted">
                                            <span className="text-base font-semibold text-foreground">VS</span>
                                        </div>
                                    </div>
                                    {/* Bio */}
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-1 flex flex-wrap items-center gap-2">
                                            <Link href="/about" className="text-lg font-semibold text-foreground transition-colors hover:text-foreground/80">
                                                {post.author}
                                            </Link>
                                            <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">Author</span>
                                        </div>
                                        <p className="mb-2 text-sm text-muted-foreground">Developer &amp; Founder of Locksy</p>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            Vansh is the developer and founder of Locksy — a privacy-first browser tab security extension trusted by 5,000+ users across Chrome, Edge, Firefox, and Brave. He writes about browser security, privacy, and developer tools.
                                        </p>
                                        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                                            <Link href="/about" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">About Locksy</Link>
                                            <a href="https://github.com/vansh-121" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">GitHub</a>
                                            <span className="text-muted-foreground">
                                                Last updated {new Date(post.lastModified.replace(/-/g, '/')).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Share buttons */}
                                    <div className="flex flex-shrink-0 gap-2 sm:flex-col">
                                        <button type="button" onClick={shareToTwitter} className={shareBtn} aria-label="Share on Twitter" title="Share">
                                            <Twitter className="h-4 w-4" aria-hidden="true" />
                                        </button>
                                        <button type="button" onClick={copyLink} className={shareBtn} aria-label="Copy link" title="Copy">
                                            <Share2 className="h-4 w-4" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="surface relative mt-12 overflow-hidden px-6 py-12 text-center md:px-10">
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-x-0 top-0 h-48"
                                    style={{ background: 'radial-gradient(50% 60% at 50% 0%, var(--glow), transparent 70%)' }}
                                />
                                <div className="relative">
                                    <h2 className="text-2xl font-semibold text-foreground md:text-3xl text-balance">Ready to Secure Your Browser Tabs?</h2>
                                    <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
                                        Get started with Locksy today — free core version, trusted by thousands
                                    </p>
                                    {/* Visitor's browser first (with glow), other stores beside it */}
                                    <InstallButtons className="mt-8" primaryLabel="Add to {name}, it's free" />
                                    <Link
                                        href="/pricing"
                                        className="mt-5 inline-block text-sm text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground"
                                    >
                                        View Pro features
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <section className="mx-auto mt-20 max-w-[1000px] border-t border-border pt-14">
                            <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                                Related Articles
                            </h2>
                            <div className="mt-8 grid gap-4 md:grid-cols-3">
                                {relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost.slug}
                                        href={`/blog/${relatedPost.slug}`}
                                        className="surface group flex flex-col overflow-hidden transition-colors hover:border-foreground/20"
                                    >
                                        <div className="m-2 mb-0 aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-muted">
                                            <img
                                                src={relatedPost.image}
                                                alt={relatedPost.imageAlt}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col p-6">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span className="text-foreground/80">{relatedPost.category}</span>
                                                <span aria-hidden="true">·</span>
                                                <span>{relatedPost.readTime}</span>
                                            </div>
                                            <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug text-foreground">{relatedPost.title}</h3>
                                            <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{relatedPost.description}</p>
                                            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                                                Read More
                                                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden="true" />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
