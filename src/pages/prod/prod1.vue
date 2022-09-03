<template>
  <div>
    <p>产品1</p>
    <p>{{ pro1 }}</p>
    <hello-world msg="Hello Vue 3 + Vite" />
    <ul>
      <li v-for="i in arr" :key="i">{{ i }}</li>
    </ul>
  </div>
</template>
<script setup>
import HelloWorld from '@/components/HelloWorld.vue';
let pro1 = 'long';
let arr = [1, 2, 3];
</script>
<style scoped>
ul {
  list-style: none;
}
</style>
