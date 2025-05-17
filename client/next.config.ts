const isDev = process.env.NODE_ENV !== 'production'

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: isDev
          ? 'https://manchunggrouproom.duckdns.org/dev/api/:path*' // 개발용
          : 'https://manchunggrouproom.duckdns.org/api/:path*', // 배포용
      },
    ]
  },
}

module.exports = nextConfig
