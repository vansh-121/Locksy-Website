/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'locksy.dev',
          },
        ],
        destination: 'https://www.locksy.dev/:path*',
        permanent: true,
      },
      // /tools/security-checker duplicated the password-entropy calculator and was
      // orphaned (sitemap-only, no inbound links). Its unique "Workstation Privacy
      // Audit" widget now lives on the strength checker page.
      {
        source: '/tools/security-checker',
        destination: '/tools/password-strength-checker',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Force HTTPS for two years on locksy.dev and every subdomain.
          // `preload` is deliberately omitted: submitting to the browser preload
          // list is effectively irreversible, and we want the option of serving a
          // subdomain over plain HTTP later.
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains',
          },
          // Clickjacking: X-Frame-Options for legacy parsers, CSP frame-ancestors
          // below for modern ones. Nothing legitimately frames locksy.dev.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Origin isolation. `same-origin-allow-popups` (not bare `same-origin`)
          // so windows we open with target="_blank" — web store listings, GitHub —
          // keep working, while cross-origin openers are still severed.
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Deliberately scoped to directives that do NOT gate resource loading.
          // Adding script-src/default-src would require either 'unsafe-inline'
          // (which buys nothing) or per-request nonces — and nonces force every
          // route to render dynamically, losing the static prerendering the SEO
          // work depends on. So: no default-src, no script-src, no connect-src.
          // Lighthouse's "CSP effective against XSS" and "Trusted Types" audits
          // stay flagged as a result; both are informative and do not affect the
          // Best Practices score.
          {
            key: 'Content-Security-Policy',
            value: [
              "frame-ancestors 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
