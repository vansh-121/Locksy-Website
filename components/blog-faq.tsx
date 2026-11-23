import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Plus } from 'lucide-react'

interface BlogFaqItem {
    question: string
    answer: string
}

interface BlogFaqProps {
    items?: BlogFaqItem[]
}

// Per-post FAQ accordion.
//
// Built on native <details>/<summary> rather than a JS accordion on purpose:
// the HTML spec keeps the answer content in the DOM even while collapsed, so
// every answer is present in the statically-prerendered HTML. That matters
// twice over — crawlers and AI answer engines can read the answers (AEO), and
// the rendered words count toward the per-route word count AdSense reviews
// (see the adsense-low-value-content remediation). A shared `name` makes the
// group behave like a single-open accordion, and it all works with zero
// JavaScript. Answers render through react-markdown so the few that contain
// internal links or inline code display correctly instead of as raw markup.
export default function BlogFaq({ items }: BlogFaqProps) {
    if (!items || items.length === 0) return null

    return (
        <div className="divide-y divide-border border-y border-border">
            {items.map((item, i) => (
                <details
                    key={i}
                    name="post-faq"
                    className="group"
                >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-medium text-foreground md:text-[17px] [&::-webkit-details-marker]:hidden">
                        <span>{item.question}</span>
                        <span
                            aria-hidden="true"
                            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform duration-200 group-open:rotate-45"
                        >
                            <Plus className="h-3.5 w-3.5" />
                        </span>
                    </summary>
                    <div className="overflow-hidden group-open:animate-in group-open:fade-in-0 group-open:slide-in-from-top-1 group-open:duration-200">
                        <div className="pb-6 pr-12 text-[15px] leading-relaxed text-muted-foreground">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    p: ({ children }) => (
                                        <p className="mb-3 last:mb-0">{children}</p>
                                    ),
                                    a: ({ children, href }) => {
                                        const safeHref =
                                            href && /^(https?:|mailto:|tel:|\/|#)/.test(href) ? href : undefined
                                        const external = safeHref?.startsWith('http')
                                        return (
                                            <a
                                                href={safeHref}
                                                className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
                                                target={external ? '_blank' : undefined}
                                                rel={external ? 'noopener noreferrer' : undefined}
                                            >
                                                {children}
                                            </a>
                                        )
                                    },
                                    code: ({ children }) => (
                                        <code className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
                                            {children}
                                        </code>
                                    ),
                                    strong: ({ children }) => (
                                        <strong className="font-semibold text-foreground">{children}</strong>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="my-2 ml-5 list-disc space-y-1 marker:text-highlight">{children}</ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="my-2 ml-5 list-decimal space-y-1 marker:text-highlight">{children}</ol>
                                    ),
                                    li: ({ children }) => <li>{children}</li>,
                                }}
                            >
                                {item.answer}
                            </ReactMarkdown>
                        </div>
                    </div>
                </details>
            ))}
        </div>
    )
}
