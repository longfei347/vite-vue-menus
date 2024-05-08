// test.ts
import pkg from 'mockjs'
const { mock, Random } = pkg
export default [
  {
    url: '/mockApi/get',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 0,
        data: {
          name: 'vben'
        }
      }
    }
  },
  {
    url: '/mockApi/getList',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 0,
        data: mock({
          'list|1-10': [
            {
              'id|+1': 1,
              name1: '@cname', // 中国：姓名，一起
              name2: () => Random.cname(), // 中国：姓名，一起
              name3: '@name', // 西方：名+姓，空格分开
              name4: '@first @last', // 西方：名+姓，空格分开
              url: '@url', //
              cid: '@cid', // 身份证
              phone: '@phone', // 手机号
              ip: '@ip', // IP地址
              news: '@news', // 新闻标题
              date: '@date', // 日期
              time: '@time', // 时间
              region: '@region', // 地区
              province: '@province', // 省份
              city: '@city', // 城市
              county: '@county', // 区县
              county_short: '@county(true)', // 区县，简写
              email: '@email', //
              string: /^[A-Za-z0-9]{5,10}$/, // 正则，随机5~10位：字母或数字
              'age|1-150': 16 // 随机范围【1,150】
            }
          ]
        })
      }
    }
  },
  {
    url: '/mockApi/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'vben'
      }
    }
  },
  {
    url: '/mockApi/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = ''
      await new Promise(resolve => {
        req.on('data', chunk => {
          reqbody += chunk
        })
        req.on('end', () => resolve(undefined))
      })
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 200
      res.end(`hello, ${reqbody}`)
    }
  }
]
/* 
export default function (config: MockConfig) {
  return [
    {
      url: '/api/text',
      method: 'post',
      rawResponse: async (req, res) => {
        let reqbody = ''
        await new Promise((resolve) => {
          req.on('data', (chunk) => {
            reqbody += chunk
          })
          req.on('end', () => resolve(undefined))
        })
        res.setHeader('Content-Type', 'text/plain')
        res.statusCode = 200
        res.end(`hello, ${reqbody}`)
      },
    },
  ]
} */
