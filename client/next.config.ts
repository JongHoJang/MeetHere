// next.config.js
require('dotenv').config()

const baseApiUrl =
  process.env.NODE_ENV === 'development'
    ? 'https://manchunggrouproom.duckdns.org/dev'
    : 'https://manchunggrouproom.duckdns.org'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${baseApiUrl}/api/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
