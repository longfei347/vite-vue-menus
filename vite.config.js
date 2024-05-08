import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
// import visualizer from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'
import process from 'process'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(process.env.NODE_ENV, process.cwd())
  console.log('🚀 ~ env:', mode, process.env.NODE_ENV, env, import.meta.env)
  return defineConfig({
    // base: env.VITE_BASE_URL,
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        // dts: 'src/auto-imports.d.ts',
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      // visualizer({ open: true }),
      viteMockServe({
        mockPath: 'mock',
        enable: true
      }),
      VitePWA({
        workbox: {
          cacheId: 'my-pwa-cache',
          runtimeCaching: [
            {
              urlPattern: /\.(png|jpg|jpeg|svg|ico|webp|js|css)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'my-cache-name',
                expiration: {
                  maxEntries: 100, //缓存文件数量LRU算法
                  maxAgeSeconds: 30 * 24 * 60 * 60 // 缓存有效期
                }
              }
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    build: {
      chunkSizeWarningLimit: 1500,
      minify: 'terser',
      sourcemap: false,
      assetsInlineLimit: 4000
    },
    server: {
      proxy: {
        // 字符串简写写法
        // '/foo': 'http://localhost:4567',
        // 选项写法
        '^/api': {
          // target: 'https://console-api.apipost.cn/',
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
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
    }
  })
}
