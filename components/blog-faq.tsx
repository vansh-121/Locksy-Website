import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ChevronDown, HelpCircle } from 'lucide-react'

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
        <div className="rounded-2xl border border-border/30 bg-card/60 backdrop-blur-sm p-2 md:p-4">
            {items.map((item, i) => (
                <details
                    key={i}
                    name="post-faq"
                    className="group border-b border-border/40 px-4 last:border-b-0"
                >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-left text-base font-semibold text-foreground md:text-lg [&::-webkit-details-marker]:hidden">
                        <span className="flex items-start gap-3">
                            <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                            {item.question}
                        </span>
                        <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <div className="overflow-hidden group-open:animate-in group-open:fade-in-0 group-open:slide-in-from-top-1 group-open:duration-200">
                        <div className="pb-4 pl-8 text-base leading-7 text-foreground/90">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    p: ({ children }) => (
                                        <p className="mb-3 leading-7 last:mb-0">{children}</p>
                                    ),
                                    a: ({ children, href }) => {
                                        const safeHref =
                                            href && /^(https?:|mailto:|tel:|\/|#)/.test(href) ? href : undefined
                                        const external = safeHref?.startsWith('http')
                                        return (
                                            <a
                                                href={safeHref}
                                                className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
                                                target={external ? '_blank' : undefined}
                                                rel={external ? 'noopener noreferrer' : undefined}
                                            >
                                                {children}
                                            </a>
                                        )
                                    },
                                    code: ({ children }) => (
                                        <code className="rounded-md border border-primary/20 bg-primary/10 px-1.5 py-0.5 font-mono text-sm text-primary">
                                            {children}
                                        </code>
                                    ),
                                    strong: ({ children }) => (
                                        <strong className="font-bold text-foreground">{children}</strong>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="my-2 ml-5 list-disc space-y-1">{children}</ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="my-2 ml-5 list-decimal space-y-1">{children}</ol>
                                    ),
                                    li: ({ children }) => <li className="leading-7">{children}</li>,
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
