/**
 * 配置axios的拦截器
 */
import { commonStore } from '@/store'
let env = 'prod' //dev开发, test测试, prod生产
let baseURL = import.meta.env.DEV ? '/api' : 'http://localhost:3000'
/*  if(env === 'dev') {
     baseURL = 'http://localhost:3003';
 } else if (env === 'test') {
     baseURL = 'http://test.huruqing.cn:3003';
 } else {
     baseURL = 'http://huruqing.cn:3003';
 }  */

import axios from 'axios'
const service = axios.create({
  baseURL,
  timeout: 30000
})

// 配置请求拦截
service.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) {
      config.headers.authorization = sessionStorage.getItem('token')
    }
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
      // console.log(res.data.msg);
      return res.data
    } else {
      return res.data
    }
  },
  error => {
    console.error('网络异常,请稍后再试')
    if (error.response.status === 401 && location.pathname !== '/login') {
      // console.log(error.response.data.msg);
      location.href = '/login'
      sessionStorage.setItem('token', '')
      commonStore().setToken('')
      return error.response.data
    }
  }
)

export const get = (url, data) => {
  return service.get(url, { params: data })
}

export default service
