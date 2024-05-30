<template>
  <h1>欢迎来到安全管理平台主页</h1>
  <h3>欢迎您:{{ name }}</h3>
  <router-link :to="{ name: 'user' }">用户管理</router-link>
  <el-button @click="toNews">摄像头列表</el-button>
  <router-link to="/todo">待办列表</router-link>
</template>
<script>
export default {
  name: 'home',
  label: '主页',
  icon: 'HomeFilled',
  data() {
    return {
      name: ''
    }
  },
  inject: ['openTab'],
  mounted() {
    const my = this.$commonStore()
    this.name = my.getUsername
  },
  methods: {
    toNews() {
      this.openTab({
        label: '摄像头列表',
        name: 'camera',
        path: '/camera'
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
