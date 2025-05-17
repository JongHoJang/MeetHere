const apiStage = process.env.API_STAGE

const baseApiUrl =
  apiStage === 'dev'
    ? 'https://manchunggrouproom.duckdns.org/dev'
    : 'https://manchunggrouproom.duckdns.org'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    console.log('API_STAGE:', apiStage) // 로그로 실제 적용 확인 가능
    return [
      {
        source: '/api/:path*',
        destination: `${baseApiUrl}/api/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
