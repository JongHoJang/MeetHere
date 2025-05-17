const apiStage = process.env.API_STAGE

const baseApiUrl =
  apiStage === 'prod'
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
