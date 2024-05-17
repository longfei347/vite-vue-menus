<template>
  <div class="todo">
    <!-- 列表展示 -->
    <el-form inline style="display: flex">
      <el-form-item label="标题">
        <el-input v-model="formData.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formData.status" placeholder="请选择" clearable>
          <el-option label="全部" :value="''"></el-option>
          <el-option label="未完成" :value="0"></el-option>
          <el-option label="已完成" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="listData" border style="width: 630px">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="title" label="标题" width="150"></el-table-column>
      <el-table-column prop="status" label="状态" width="200">
        <template #default="{ row }">
          <span :class="[row.status === 1 ? 'success' : 'todo']">{{ row.status === 1 ? '已完成' : '未完成' }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #header>
          <el-button type="text" size="small" @click="handleAdd">添加</el-button>
        </template>
        <template #default="{ row }">
          <el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(row)">删除</el-button>
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
    <el-dialog v-model="dialogVisible" :title="dialogType === 'add' ? '添加' : '编辑'">
      <el-form :model="currentItem" label-width="180px">
        <el-form-item label="标题">
          <el-input v-model="currentItem.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="currentItem.status" placeholder="请选择状态">
            <el-option label="已完成" :value="1"></el-option>
            <el-option label="未完成" :value="0"></el-option>
          </el-select>
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
  name: 'todo',
  label: '待办列表',
  icon: 'Document',
  setup() {
    // 查询
    const formData = reactive({
      title: '',
      status: ''
    })
    const search = () => {
      fetchList(1, formData)
    }

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
    const currentItem = reactive({ id: '', title: '', status: 0 })

    // 获取列表数据
    const fetchList = async (pageNo = 1, opt) => {
      const response = await request.get(`/todo?page=${pageNo}&pageSize=${page.pageSize}`, { params: opt })
      if (response.code === 200) {
        const { total, data } = response
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
      currentItem.title = item.title
      currentItem.status = item.status
      dialogVisible.value = true
    }
    // 添加项
    const handleAdd = () => {
      dialogType.value = 'add'
      currentItem.id = ''
      currentItem.title = ''
      currentItem.status = 0
      dialogVisible.value = true
    }
    // 删除项
    const handleDelete = async item => {
      try {
        let res = await request.delete(`/todo`, { data: { id: item.id } })
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
          url: '/todo',
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
      window._t = this
    })

    return {
      formData,
      search,
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
  }
}
</script>

<style lang="less" scoped>
.todo {
  .success {
    color: green;
  }
  .todo {
    color: orange;
  }
}
</style>
