const { i18n } = require('./next-i18next.config')

module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  i18n,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    // iconSizes: [],
    domains: ['127.0.0.1', 'dropgala.com', 'media.dropgala.shop'],
    path: '/_next/image',
    loader: 'default'
  }
}
