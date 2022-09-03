import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    proxy: {
      // 字符串简写写法
      // '/foo': 'http://localhost:4567',
      // 选项写法
      '^/api/': {
        target: 'https://console-api.apipost.cn/',
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      // 正则表达式写法
      /* '^/fallback/.*': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fallback/, '')
        }, */
      // 使用 proxy 实例
      '^/typi': {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/typi/, '')
        // configure: (proxy, options) => {  // proxy 是 'http-proxy' 的实例 }
      },
      '^/apifox': {
        target: 'http://127.0.0.1:4523/m1/801837-0-default/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/apifox/, '')
        // configure: (proxy, options) => {  // proxy 是 'http-proxy' 的实例 }
      }
    }
  },
  plugins: [vue()]
});
