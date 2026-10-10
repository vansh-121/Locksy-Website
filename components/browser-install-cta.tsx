'use client'

import React, { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

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
            className="my-10 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card/75 to-secondary/10 p-6 md:p-8 shadow-lg backdrop-blur-sm not-prose"
        >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-xs font-semibold text-primary">
                        <Sparkles className="h-3.5 w-3.5" />
                        Instant Tab Protection
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">
                        Lock Sensitive Browser Tabs with Locksy
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
                        Never leak open sessions or private tabs again. Protect your browsing with on-device PBKDF2 encryption, title-masking, and automated idle lock.
                    </p>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto flex-shrink-0 items-start md:items-end">
                    <a
                        href={detected.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm shadow-md hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all w-full md:w-auto text-center"
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
                                    className="font-medium text-primary hover:underline underline-offset-2 transition-colors"
                                >
                                    {other.shortName}
                                </a>
                                {idx < others.length - 1 && <span className="text-border">·</span>}
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
        <div className="mt-5 pt-4 border-t border-border/50">
            <div className="rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 border border-primary/20 p-3.5 text-center">
                <p className="text-xs font-semibold text-foreground mb-1">
                    🔒 Lock Active Tabs
                </p>
                <p className="text-[11px] text-muted-foreground mb-3 leading-snug">
                    Free on-device encryption for Chrome, Edge &amp; Firefox.
                </p>
                <a
                    href={detected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 px-3 rounded-lg bg-primary text-primary-foreground font-medium text-xs shadow hover:bg-primary/90 transition-all hover:scale-[1.01]"
                >
                    {detected.buttonLabel}
                </a>
                <div className="mt-2.5 flex justify-center items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span>Also for:</span>
                    {others.map((other, idx) => (
                        <React.Fragment key={other.key}>
                            <a
                                href={other.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-primary hover:underline transition-colors"
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
