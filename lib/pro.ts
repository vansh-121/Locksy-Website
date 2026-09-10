/**
 * Locksy Pro checkout.
 *
 * The Polar link is the single point of failure for revenue — if it goes stale
 * in one file and not another, some pages quietly stop taking payments. It
 * lives here so every "Get Pro" button on the site resolves to one string.
 */

/** Polar.sh checkout for the $2.99 one-time lifetime license. */
export const PRO_CHECKOUT_URL =
    "https://buy.polar.sh/polar_cl_h8dabKldTUY7gf2g9MfFicCSIn0Ghc34SadGc3xl1cI"

/** One-time price, as displayed. */
export const PRO_PRICE = "$2.99"
