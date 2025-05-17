const apiStage = process.env.API_STAGE // 서버 환경변수로 분기

const baseApiUrl =
  apiStage === 'dev'
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
