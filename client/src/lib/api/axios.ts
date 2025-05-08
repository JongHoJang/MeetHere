import axios from 'axios'
// import { refreshAccessToken } from '@/lib/api/auth'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // 쿠키 기반 인증 시 true 설정
})

// 요청마다 accessToken 자동 삽입 > 로컬스토리지 저장용
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('accessToken')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// 요청마다 accessToken 자동 삽입 > 쿠키 저장용(js 전용)
// api.interceptors.request.use(config => {
//   const token = getCookie('accessToken') // 쿠키에서 accessToken 가져옴
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// refreshToken Api 자동화 코드 > 로컬스토리지 저장용
// api.interceptors.response.use(
//   res => res,
//   async error => {
//     const originalRequest = error.config
//
//     // console.log('응답 인터셉터 진입')
//
//     if (
//       error.response?.status === 401 &&
//       error.response?.data?.errorCode === 10001 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true
//
//       try {
//         const newAccessToken = await refreshAccessToken()
//         localStorage.setItem('accessToken', newAccessToken)
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
//         // console.log('accessToken 재발급 완료')
//
//         return api(originalRequest)
//       } catch (refreshError) {
//         console.error('refresh 실패', refreshError)
//         alert('시간이 지나 로그아웃되었습니다. 다시 로그인 해주세요')
//         // localStorage.clear()
//         window.location.href = '/login'
//         return Promise.reject(refreshError)
//       }
//     }
//
//     return Promise.reject(error)
//   }
// )

// refreshToken Api 자동화 코드 > 쿠키 저장용
// api.interceptors.response.use(
//   res => res,
//   async error => {
//     const originalRequest = error.config
//     // console.log('응답 인터셉터 진입')
//     if (
//       error.response?.status === 401 &&
//       error.response?.data?.errorCode === 10001 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true
//       try {
//         // const newAccessToken = await refreshAccessToken()
//         // setCookie('accessToken', newAccessToken, {
//         //   path: '/',
//         // })
//         // const newAccessToken = await refreshAccessToken()
//         // originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
//         // console.log('accessToken 재발급 완료')
//         return api(originalRequest)
//       } catch (refreshError) {
//         console.error('refresh 실패', refreshError)
//         alert('시간이 지나 로그아웃되었습니다. 다시 로그인 해주세요')
//         localStorage.clear()
//         window.location.href = '/login'
//         return Promise.reject(refreshError)
//       }
//     }
//     return Promise.reject(error)
//   }
// )
export default api
