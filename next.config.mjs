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
    ]
  },
}

export default nextConfig
