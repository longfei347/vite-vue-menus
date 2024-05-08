<template>
  <h3>{{ page }}</h3>
  <button @click="toHome">返回主页</button>
  <ul class="news">
    <li>总新闻条数:{{ data.total }}</li>
    <li v-for="itm in data.list" :key="itm.url">
      <a :href="itm.url" target="_blank">{{ itm.title }}</a>
      <p>{{ itm.content }}</p>
    </li>
  </ul>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'news',
  setup() {
    /* const router = useRouter()
    const toHome = (() => {
      router.push({
        name: 'home'
      })
    })
    return {
      toHome
    } */
  },
  data() {
    return {
      page: '新闻列表:',
      data: {
        list: []
      }
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    window._a = this
    console.log('created')
    this.$http.get('/demo/news_list?mobile=18289454846&theme_news=国际新闻&page=1&pageSize=20').then(r => {
      console.log(r)
      this.data = r.data
      // this.list = r.data.list;
    })
    // this.$http.get('/typi/todos/1').then(r => console.log(r));
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  // 初始化	beforeCreate	created
  // 挂载	beforeMount	mounted
  // 更新	beforeUpdate	updated
  // 销毁	beforeDestroy	destroyed
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  destroyed() {
    console.log('destroyed')
  },
  methods: {
    toHome() {
      this.$emit('openTab', {
        label: '主页',
        name: 'home',
        path: '/home'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.news {
  text-align: left;
  li {
    list-style: none;
  }
}
</style>
