<template>
  <h3>新闻标题:{{ detail.title }}</h3>
  <router-link :to="{ path: 'about' }" @click="toNews">新闻列表</router-link>
  <div class="detail">
    <h4>新闻详情</h4>
    <p>
      {{ detail.title }} <span class="b">作者: {{ detail.author }}</span>
    </p>
    <p>{{ detail.content }}</p>
  </div>
  <el-form-item>
    <textarea name="" id="" cols="30" rows="10" v-model="content"> </textarea>
    <p>
      <button @click="comment">评价</button>
    </p>
  </el-form-item>
  <el-form-item>
    <el-button @click="delConmment">删除评价</el-button>
  </el-form-item>
</template>
<script>
import { computed } from 'vue';
export default {
  name: 'news-detail',
  data() {
    return {
      title: '',
      detail: {},
      content: ''
    };
  },
  mounted() {
    window._h = this;
    const my = this.$commonStore();
    // _h._my = my;
    // const name = computed(() => my.name)
    console.log('name:', my.getUsername, my.username);
    this.name = my.getUsername;
    this.$http.get('/api/demo/news_details?id=20&status=1').then(r => (this.detail = r.data));
  },
  methods: {
    toNews() {
      this.$emit('openTab', {
        label: '新闻列表',
        name: 'news',
        path: '/news'
      });
    },
    comment() {
      this.$http.post(`/api/demo/news_comment?content=${this.content}&id=${this.detail.id}`).then(r => console.log(r));
    },
    delConmment() {
      let id = this.detail.id;
      this.$http.delete(`/api/demo/delete_comment`, { data: { id, comment_id: '98' } }).then(r => console.log(r));
    }
  }
};
</script>
<style scoped>
.b {
  font-weight: bold;
}
.detail {
  text-align: left;
}
</style>
