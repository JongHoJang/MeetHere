// lib/axios.ts
import axios from 'axios'
import { API_BASE_URL } from './constants'
import { attachInterceptors } from './apiInterceptor'

console.log('🧩 axios.ts1 실행됨')

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false, // 쿠키 방식 안 쓰면 false
})

attachInterceptors(api)
console.log('🧩 axios.ts2 실행됨')
