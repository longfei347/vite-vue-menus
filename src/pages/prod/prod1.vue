<template>
  <div>
    <p>产品1</p>
    <p>{{ pro1 }}</p>
    <p>{{ bb }}</p>
    <hello-world msg="Hello Vue 3 + Vite" />
    <ul>
      <li v-for="i in arr" :key="i">{{ i }}</li>
    </ul>
    <div>
      <!-- <img v-lazy="" src="" alt=""> -->
      <el-button type="primary">按钮</el-button>
    </div>
  </div>
</template>
<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
let pro1 = 'long'
let arr = [1, 2, 3]
let aa = reactive({})
let bb = ref(111)
// 懒加载方法
let vLazy = async (el, bingding) => {
  // const def = await import('@/assets/vue.svg')
  // el.src = def.default
  const observer = new IntersectionObserver(entries => {
    if (entries[0].intersectionRatio > 0) {
      el.src = bingding.value
      observer.unobserve(el)
    }
  })
  observer.observe(el)
}
</script>
<style scoped>
ul {
  list-style: none;
}
</style>
