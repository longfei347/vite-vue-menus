/**
 * 配置axios的拦截器
 */
let env = 'prod'; //dev开发, test测试, prod生产
let baseURL = '/';
/*  if(env === 'dev') {
     baseURL = 'http://localhost:3003';
 } else if (env === 'test') {
     baseURL = 'http://test.huruqing.cn:3003';
 } else {
     baseURL = 'http://huruqing.cn:3003';
 }  */

import axios from 'axios';
const service = axios.create({
  baseURL,
  timeout: 30000
});

// 配置请求拦截
service.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) {
      config.headers.token = sessionStorage.getItem('token');
    }
    // console.log(config);
    // 添加token
    // config.headers["token"] = "gg12j3h4ghj2g134kj1g234gh12jh34k12h34g12kjh34kh1g";
    return config;
  },
  error => {
    alert('发送请求失败');
  }
);

// 配置响应拦截
service.interceptors.response.use(
  res => {
    if (res.data.code == 666) {
      return res.data;
    } else if (res.data.code == 10000) {
      // console.log(res.data.msg);
      return res.data;
    } else {
      return res.data;
    }
  },
  error => {
    console.error('网络异常,请稍后再试');
  }
);

export const get = (url, data) => {
  return service.get(url, { params: data });
};

export default service;
