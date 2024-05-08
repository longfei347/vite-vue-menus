<template>
  <div>
    <!-- 列表展示 -->
    <ul>
      <li v-for="item in list" :key="item.id">{{ item.name }}</li>
    </ul>

    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    fetchData: Function // 用于获取数据的函数
  },
  data() {
    return {
      list: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      // 调用父组件传递的 fetchData 函数获取数据
      const { list, total } = await this.fetchData(this.currentPage, this.pageSize)
      this.list = list
      this.total = total
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.fetchData()
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.fetchData()
    }
  }
}
</script>
