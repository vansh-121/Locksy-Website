/**
 * Locksy Pro checkout and pricing configuration.
 *
 * The Polar link is the single point of failure for revenue — if it goes stale
 * in one file and not another, some pages quietly stop taking payments. It
 * lives here so every "Get Pro" button on the site resolves to one string.
 */

/** Direct Polar.sh checkout URL for the one-time lifetime license. */
export const POLAR_CHECKOUT_URL =
    "https://buy.polar.sh/polar_cl_h8dabKldTUY7gf2g9MfFicCSIn0Ghc34SadGc3xl1cI"

/**
 * Public branded checkout route for Locksy Pro.
 * All on-site buttons link to this clean URL, which automatically redirects to Polar.
 */
export const PRO_CHECKOUT_URL = "/checkout"

/** Early-bird sale deadline: Oct 1, 2026 at 12:00 AM UTC (00:00:00 UTC). */
export const SALE_DEADLINE_UTC = Date.UTC(2026, 9, 1, 0, 0, 0)

/** Helper to check whether the early-bird discount is currently running. */
export function isEarlyBirdSaleActive(): boolean {
    return Date.now() < SALE_DEADLINE_UTC
}

/** Early bird promotional price. */
export const PRO_EARLY_BIRD_PRICE = "$2.99"

/** Regular price after early bird sale expires. */
export const PRO_REGULAR_PRICE = "$4.99"

/** Active price for Locksy Pro lifetime license. */
export const PRO_PRICE = "$4.99"
