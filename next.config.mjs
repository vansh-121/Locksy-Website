/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
}

export default nextConfig
