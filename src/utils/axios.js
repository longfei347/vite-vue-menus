/**
 * 配置axios的拦截器
 */
import { commonStore } from '@/store'
import { router } from '../router'
import axios from 'axios'

function getBaseUrl() {
  let env = commonStore().env // dev开发, test测试,local生产本地, prod生产远程
  let envs = {
    dev: '/api',
    local: '/api',
    test: 'http://localhost:9000', // 本地docker部署地址
    prod: '/prod-api' // 远程地址
  }
  return envs[env]
}
const service = axios.create({
  timeout: 30000
})

// 配置请求拦截
service.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) {
      config.headers.authorization = sessionStorage.getItem('token')
    }
    config.baseURL = getBaseUrl()
    return config
  },
  error => {
    alert('发送请求失败')
  }
)

// 配置响应拦截
service.interceptors.response.use(
  res => {
    if (res.data.code == 666) {
      return res.data
    } else if (res.data.code == 10000) {
      return res.data
    } else {
      return res.data
    }
  },
  error => {
    console.error('网络异常,请稍后再试')
    if (error.response.status === 401 && location.pathname !== '/login') {
      // location.href = '/login'
      sessionStorage.setItem('token', '')
      commonStore().setToken('')
      router.push('/login')
      return error.response.data
    }
  }
)

export const get = (url, data) => {
  return service.get(url, { params: data })
}

export default service
