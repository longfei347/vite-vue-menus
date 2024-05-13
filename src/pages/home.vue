<template>
  <h1>欢迎来到安全管理平台主页</h1>
  <h3>欢迎您:{{ name }}</h3>
  <router-link :to="{ path: '/todo' }">待办列表</router-link>
  <el-button @click="toNews">摄像头列表</el-button>
  <div class="detail">
    <p>{{ content }}</p>
  </div>
</template>
<script>
import { computed } from 'vue'
export default {
  name: 'home',
  label: '主页',
  icon: 'HomeFilled',
  data() {
    return {
      name: '',
      content: ''
    }
  },
  inject: ['openTab'],
  mounted() {
    window._h = this
    const my = this.$commonStore()
    // // const name = computed(() => my.name)
    this.name = my.getUsername
    // this.$http.get('/user').then(r => (this.detail = r.data))
  },
  methods: {
    toNews() {
      this.openTab({
        label: '摄像头列表',
        name: 'kilo',
        path: '/kilo'
      }) // 两种都行
      /* this.$emit('openTab', {
        label: '新闻列表',
        name: 'todo',
        path: '/todo'
      }) */
    }
  }
}
</script>
<style scoped>
.b {
  font-weight: bold;
}
.detail {
  text-align: left;
}
</style>
