import axios, { AxiosInstance } from 'axios'
import { API_BASE_URL } from './constants'

export const attachInterceptors = (api: AxiosInstance) => {
  //
  api.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  //
  api.interceptors.response.use(
    res => res,
    async error => {
      const originalRequest = error.config
      const code = error.response?.data?.code
      const status = error.response?.status

      console.log('응답 에러 인터셉터 진입')
      // console.log('응답 코드:', code)
      // console.log('HTTP 상태 코드:', status)

      const isTokenExpired = code === 10001 || status === 401
      const isRefreshExpired = code === 10004 || status === 401

      if (
        isTokenExpired &&
        !originalRequest._retry &&
        !originalRequest.url.includes('/api/refresh-token')
      ) {
        originalRequest._retry = true

        const refreshToken = localStorage.getItem('refreshToken')
        const userId = localStorage.getItem('userId')

        // refreshToken과 userId 유효성 체크
        if (!refreshToken || !userId) {
          console.warn('리프레시 토큰 또는 유저 ID 없음 → 로그인 페이지 이동')
          localStorage.clear()
          // console.log('refreshToken:', refreshToken)
          // console.log('userId:', userId)
          alert('로그인화면으로 돌아갑니다')
          window.location.href = '/login'
          return
        }

        try {
          const refreshToken = localStorage.getItem('refreshToken')
          const userId = localStorage.getItem('userId')

          console.log('refresh-token 요청 보냄')
          const res = await axios.post(
            `${API_BASE_URL}/api/refresh-token`,
            { refreshToken },
            {
              headers: {
                'User-ID': userId,
              },
            }
          )

          const newAccessToken = res.data.accessToken
          localStorage.setItem('accessToken', newAccessToken)

          console.log('🔁 AccessToken 재발급 성공. 요청 재시도 중...')

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return api(originalRequest)
        } catch (err) {
          console.error('토큰 갱신 실패', err)
          localStorage.clear()
          alert('로그인화면으로 돌아갑니다')

          window.location.href = '/login'
          return
        }
      }

      if (isRefreshExpired) {
        localStorage.clear()
        alert('로그인화면으로 돌아갑니다')

        window.location.href = '/login'
      }

      return Promise.reject(error)
    }
  )
}
