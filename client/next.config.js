const apiStage = process.env.API_STAGE

const baseApiUrl =
  apiStage === 'dev'
    ? 'https://manchunggrouproom.duckdns.org/dev'
    : 'https://manchunggrouproom.duckdns.org'

console.log('baseApiUrl →', baseApiUrl)
console.log('개발용(프리뷰)?', process.env.VERCEL_ENV === 'preview')
console.log('Loaded next.config.js with API_STAGE!:', apiStage)

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
