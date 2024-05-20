<template>
  <div class="user">
    <!-- 列表展示 -->
    <el-table :data="listData" border style="width: 630px">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
      <el-table-column prop="username" label="用户名" width="150"></el-table-column>
      <el-table-column prop="password" label="密码" width="200"></el-table-column>
      <!-- 根据实际情况添加更多列 -->
      <el-table-column fixed="right" label="操作" width="200">
        <template #header>
          <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
        </template>
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
      :current-page="page.current"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next"
      :total="page.total"
    >
    </el-pagination>

    <!-- 模态框（用于添加或编辑） -->
    <el-dialog v-model="dialogVisible" :title="dialogType === 'add' ? '添加用户' : '编辑用户'">
      <el-form :model="currentItem" label-width="180px">
        <el-form-item label="用户名">
          <el-input v-model="currentItem.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="currentItem.password" @keyup.enter="handleSubmit" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="info" @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import request from '@/utils/axios'

export default {
  label: '用户管理',
  icon: 'Setting',
  name: 'User',
  setup() {
    // 分页数据
    const page = reactive({
      current: 1,
      pageSize: 10,
      pageSizes: [5, 10, 20, 50],
      total: 0
    })

    // 列表数据
    const listData = ref([])
    const dialogVisible = ref(false)
    const dialogType = ref('add')
    const currentItem = reactive({ id: '', username: '', password: '' })

    // 获取列表数据
    const fetchList = async (pageNo = 1) => {
      const response = await request.get(`/user?page=${pageNo}&pageSize=${page.pageSize}`)
      if (response.code === 200) {
        const { total, list: data } = response.data
        listData.value = data
        page.total = total
      } else {
        ElMessage.error('获取数据失败')
      }
    }

    // 页码改变事件
    const handlePageChange = newPage => {
      page.current = newPage
      fetchList(newPage)
    }
    // 每页数量改变事件
    const handleSizeChange = newPageSize => {
      page.pageSize = newPageSize
      fetchList(1)
    }
    // 编辑项
    const handleEdit = item => {
      dialogType.value = 'edit'
      currentItem.id = item.id
      currentItem.username = item.username
      currentItem.password = item.password
      dialogVisible.value = true
    }
    // 添加项
    const handleAdd = () => {
      dialogType.value = 'add'
      currentItem.id = ''
      currentItem.username = ''
      currentItem.password = ''
      dialogVisible.value = true
    }
    // 删除项
    const handleDelete = async item => {
      try {
        let res = await request.delete(`/user`, { data: { id: item.id } })
        if (res.code === 200) {
          ElMessage.success('删除成功')
          fetchList(page.current)
        } else {
          ElMessage.error('删除失败:' + res.msg)
        }
      } catch (error) {
        ElMessage.error('删除失败')
      }
    }

    // 处理添加或编辑
    const handleSubmit = async () => {
      try {
        const method = currentItem.id ? 'PUT' : 'POST'
        let res = await request({
          url: '/user',
          method,
          data: currentItem
        })
        if (res.code === 200) {
          ElMessage.success(dialogType.value === 'add' ? '添加成功' : '更新成功')
          dialogVisible.value = false
          fetchList()
        } else {
          ElMessage.error('操作失败: ' + res.msg)
        }
      } catch (error) {
        ElMessage.error('操作失败: ' + error.msg)
      }
    }

    onMounted(() => {
      fetchList()
    })

    return {
      listData,
      page,
      handlePageChange,
      handleSizeChange,
      handleEdit,
      handleAdd,
      handleDelete,
      dialogVisible,
      dialogType,
      currentItem,
      handleSubmit
    }
  },
  mounted() {
    window._u = this
  }
}
</script>

<style lang="less" scoped>
.user {
  .el-pagination {
    margin-top: 12px;
  }
}
</style>
