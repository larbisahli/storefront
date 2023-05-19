const { i18n } = require('./next-i18next.config')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  assetPrefix: isProd ? 'https://drqcrgn4lwawk.cloudfront.net' : undefined,
  output: 'standalone',
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  i18n,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    // iconSizes: [],
    domains: [
      '127.0.0.1',
      'dropgala.com',
      'media.dropgala.com',
      'api.dropgala.com'
    ],
    path: '/_next/image',
    loader: 'default'
  }
}
