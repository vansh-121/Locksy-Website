'use client'

import React, { useEffect, useState } from 'react'
import { Lock } from 'lucide-react'

export interface BrowserStore {
    key: 'chrome' | 'edge' | 'firefox' | 'brave'
    name: string
    buttonLabel: string
    shortName: string
    url: string
}

export const BROWSER_STORES: Record<'chrome' | 'edge' | 'firefox' | 'brave', BrowserStore> = {
    chrome: {
        key: 'chrome',
        name: 'Google Chrome',
        buttonLabel: 'Add to Chrome Free',
        shortName: 'Chrome',
        url: 'https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim',
    },
    edge: {
        key: 'edge',
        name: 'Microsoft Edge',
        buttonLabel: 'Add to Edge Free',
        shortName: 'Edge',
        url: 'https://microsoftedge.microsoft.com/addons/detail/locksy/igobelagfjckjogmmmgcngpdcccnohmn',
    },
    firefox: {
        key: 'firefox',
        name: 'Mozilla Firefox',
        buttonLabel: 'Add to Firefox Free',
        shortName: 'Firefox',
        url: 'https://addons.mozilla.org/en-US/firefox/addon/locksy/',
    },
    brave: {
        key: 'brave',
        name: 'Brave Browser',
        buttonLabel: 'Add to Brave Free',
        shortName: 'Brave',
        url: 'https://chromewebstore.google.com/detail/kiediieibclgkcnkkmjlhmdainpoidim',
    },
}

export function useDetectedBrowser(): BrowserStore {
    const [store, setStore] = useState<BrowserStore>(BROWSER_STORES.chrome)

    useEffect(() => {
        if (typeof navigator === 'undefined') return
        const ua = navigator.userAgent
        if (/Edg\//i.test(ua)) {
            setStore(BROWSER_STORES.edge)
        } else if (/Firefox\//i.test(ua)) {
            setStore(BROWSER_STORES.firefox)
        } else if ((navigator as any).brave && typeof (navigator as any).brave.isBrave === 'function') {
            setStore(BROWSER_STORES.brave)
        } else {
            setStore(BROWSER_STORES.chrome)
        }
    }, [])

    return store
}

/**
 * Mid-article Callout Box: Displays a primary 1-click button tailored to the visitor's browser,
 * with subtle links to the other 2 stores below it.
 */
export function MidArticleInstallCta() {
    const detected = useDetectedBrowser()

    // Get the other two primary browser stores for alternative links
    const others = [BROWSER_STORES.chrome, BROWSER_STORES.edge, BROWSER_STORES.firefox].filter(
        (b) => b.key !== (detected.key === 'brave' ? 'chrome' : detected.key)
    )

    return (
        <aside
            aria-label="Locksy Extension Download"
            className="surface my-12 p-6 md:p-8 not-prose"
        >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                    <span className="eyebrow">
                        <span className="eyebrow-dot" aria-hidden="true" />
                        Instant Tab Protection
                    </span>
                    <h3 className="mt-4 text-xl font-semibold leading-snug text-foreground md:text-2xl text-balance">
                        Lock Sensitive Browser Tabs with Locksy
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                        Never leak open sessions or private tabs again. Protect your browsing with on-device PBKDF2 encryption, title-masking, and automated idle lock.
                    </p>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto flex-shrink-0 items-start md:items-end">
                    <a
                        href={detected.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary h-11 w-full md:w-auto"
                    >
                        {detected.buttonLabel}
                    </a>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span>Also for:</span>
                        {others.map((other, idx) => (
                            <React.Fragment key={other.key}>
                                <a
                                    href={other.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
                                >
                                    {other.shortName}
                                </a>
                                {idx < others.length - 1 && <span aria-hidden="true">·</span>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    )
}

/**
 * Desktop sticky TOC install widget
 */
export function TocInstallWidget() {
    const detected = useDetectedBrowser()
    const others = [BROWSER_STORES.chrome, BROWSER_STORES.edge, BROWSER_STORES.firefox].filter(
        (b) => b.key !== (detected.key === 'brave' ? 'chrome' : detected.key)
    )

    return (
        <div className="mt-8">
            <div className="rounded-2xl border border-border bg-card p-4">
                <p className="mb-1 flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <Lock className="h-3.5 w-3.5 text-highlight" aria-hidden="true" />
                    Lock Active Tabs
                </p>
                <p className="mb-4 text-xs leading-snug text-muted-foreground">
                    Free on-device encryption for Chrome, Edge &amp; Firefox.
                </p>
                <a
                    href={detected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-sm w-full"
                >
                    {detected.buttonLabel}
                </a>
                <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                    <span>Also for:</span>
                    {others.map((other, idx) => (
                        <React.Fragment key={other.key}>
                            <a
                                href={other.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
                            >
                                {other.shortName}
                            </a>
                            {idx < others.length - 1 && <span>·</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}
