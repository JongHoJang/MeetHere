const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: isProd
          ? 'https://manchunggrouproom.duckdns.org/api/:path*'
          : 'https://manchunggrouproom.duckdns.org/dev/api/:path*',
      },
    ]
  },
}
