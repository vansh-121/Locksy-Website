'use client'

import { Lock } from 'lucide-react'
import { useVisitorBrowser, OtherStoreLinks, StoreNote } from '@/components/install-buttons'
import { getBrowser, type BrowserLink } from '@/lib/browsers'

/**
 * Blog install helpers. Detection and store links come from lib/browsers.ts via
 * useVisitorBrowser, the same source as every other install button on the site.
 */

export interface BrowserStore {
    key: BrowserLink['id']
    name: string
    buttonLabel: string
    shortName: string
    url: string
}

const toStore = (b: BrowserLink): BrowserStore => ({
    key: b.id,
    name: b.name,
    buttonLabel: `Add to ${b.name}, it's free`,
    shortName: b.name,
    url: b.url,
})

/** Kept for existing imports; prefer `getBrowser` from lib/browsers. */
export const BROWSER_STORES = {
    chrome: toStore(getBrowser('chrome')),
    edge: toStore(getBrowser('edge')),
    firefox: toStore(getBrowser('firefox')),
    brave: toStore(getBrowser('brave')),
}

/** The visitor's store as a BrowserStore (Brave, Opera, Vivaldi… resolve to the Chrome Web Store). */
export function useDetectedBrowser(): BrowserStore {
    return toStore(useVisitorBrowser().browser)
}

/** Mid-article callout: one button for the visitor's browser, text links to the other stores. */
export function MidArticleInstallCta() {
    const visitor = useVisitorBrowser()
    const b = visitor.browser

    return (
        <aside aria-label="Locksy Extension Download" className="surface my-12 p-6 md:p-8 not-prose">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
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

                <div className="flex w-full flex-shrink-0 flex-col items-start gap-3 md:w-auto md:items-end">
                    <a
                        href={b.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary btn-glow h-11 w-full md:w-auto"
                        data-browser={b.id}
                    >
                        <img src={b.icon} alt="" className="h-5 w-5 object-contain" />
                        Add to {b.name}, it&apos;s free
                    </a>
                    <OtherStoreLinks className="text-xs text-muted-foreground" />
                    <StoreNote visitor={visitor} className="max-w-xs md:text-right" />
                </div>
            </div>
        </aside>
    )
}

/** Desktop sticky TOC install widget. */
export function TocInstallWidget() {
    const visitor = useVisitorBrowser()
    const b = visitor.browser

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
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-glow btn-sm w-full"
                    data-browser={b.id}
                >
                    <img src={b.icon} alt="" className="h-4 w-4 object-contain" />
                    Add to {b.name}
                </a>
                <OtherStoreLinks className="mt-3 w-full justify-center text-[11px] text-muted-foreground" />
            </div>
        </div>
    )
}
