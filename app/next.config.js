const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching
})

const LOCALES = ['en-US', 'fr', 'nl-NL'] // max 100
const DEFAULT_LOCALE = 'en-US'

// const isProd = process.env.NODE_ENV === 'production'

const moduleExports = {
  output: 'standalone',
  // assetPrefix: isProd ? 'http://cdn1.dropgala.com/' : undefined,
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
  i18n: {
    // These are all the locales you want to support in your application
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE
  },
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

module.exports = withPWA(moduleExports)
