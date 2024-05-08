<template>
  <div class="kilo">
    <!-- {
      "id": 8535752199279,
      "room_num": "123",
      "room_name": null,
      "camera_name": "long",
      "nvr_ip": "192.168.1.101",
      "camera_ip": "192.168.1.10",
      "camera_mac": "::",
      "sn_num": "123456",
      "manufacturer": "HK",
      "activate_pwd": null,
      "camera_type": null,
      "dev_version": "v1.0",
      "channel_type": null,
      "harmony_auth": "v1.2",
      "nvr_url": "/lele",
      "is_harmony": 1,
      "gb_code": "gbCode",
      "gb_pwd": "gb_pwd",
      "station_code": null,
      "station_ip": "192.168.1.2",
      "station_port": 8080,
      "station_auth_type": null,
      "station_heartbeat": null,
      "station_protocol_version": null,
      "station_sip_trans_type": null,
      "station_register_rs_time": null,
      "station_enable": null,
      "harmony_platform_ip": null,
      "harmony_platform_port": 0,
      "harmony_platform_username": null,
      "harmony_platform_pwd": null,
      "state": null,
      "create_time": null,
      "create_by": "",
      "update_by": "",
      "update_time": null,
      "camera_username": null,
      "camera_pwd": "123123"
    } -->
    <el-form :model="form" inline ref="kiloForm">
      <el-form-item label="电房编码" prop="room_num">
        <el-input v-model="form.room_num"></el-input>
      </el-form-item>
      <el-form-item label="电房名称" prop="room_name">
        <el-input v-model="form.room_name"></el-input>
      </el-form-item>
      <el-form-item label="摄像头名称" prop="camera_name">
        <el-input v-model="form.camera_name"></el-input>
      </el-form-item>
      <el-form-item label="NVR-IP" prop="nvr_ip">
        <el-input v-model="form.nvr_ip"></el-input>
      </el-form-item>
      <el-form-item label="摄像头IP" prop="camera_ip">
        <el-input v-model="form.camera_ip"></el-input>
      </el-form-item>
      <el-form-item label="摄像头MAC" prop="camera_mac">
        <el-input v-model="form.camera_mac"></el-input>
      </el-form-item>
      <el-form-item label="SN号" prop="sn_num">
        <el-input v-model="form.sn_num"></el-input>
      </el-form-item>
      <el-form-item label="厂商" prop="manufacturer">
        <el-input v-model="form.manufacturer"></el-input>
      </el-form-item>
      <el-form-item label="摄像头类型" prop="camera_type">
        <el-input v-model="form.camera_type"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="handleReset">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleExport">导出</el-button>
      </el-form-item>
    </el-form>
    <!-- 上面对象为列表数据，下面对象为表单数据 -->
    <el-table :data="listData" style="width: 100%" border>
      <!-- <el-table-column prop="id" label="ID" width="180" fixed="left" />
      <el-table-column prop="room_num" label="room_num" width="120" />
      <el-table-column prop="room_name" label="room_name" width="120" />
      <el-table-column prop="camera_name" label="camera_name" width="120" />
      <el-table-column prop="nvr_ip" label="nvr_ip" width="110" />
      <el-table-column prop="camera_ip" label="camera_ip" width="110" />
      <el-table-column prop="camera_mac" label="camera_mac" width="140" />
      <el-table-column prop="sn_num" label="sn_num" width="100" />
      <el-table-column prop="manufacturer" label="manufacturer" width="100" />
      <el-table-column prop="activate_pwd" label="activate_pwd" width="100" />
      <el-table-column prop="camera_type" label="camera_type" width="95" />
      <el-table-column prop="dev_version" label="dev_version" width="95" />
      <el-table-column prop="channel_type" label="channel_type" width="100" />
      <el-table-column prop="harmony_auth" label="harmony_auth" width="110" />
      <el-table-column prop="nvr_url" label="nvr_url" width="120" />
      <el-table-column prop="is_harmony" label="is_harmony" width="90" />
      <el-table-column prop="gb_code" label="gb_code" width="130" />
      <el-table-column prop="gb_pwd" label="gb_pwd" width="100" />
      <el-table-column prop="station_code" label="station_code" width="100" />
      <el-table-column prop="station_ip" label="station_ip" width="110" />
      <el-table-column prop="station_port" label="station_port" width="90" />
      <el-table-column prop="station_auth_type" label="station_auth_type" width="130" />
      <el-table-column prop="station_heartbeat" label="station_heartbeat" width="130" />
      <el-table-column prop="station_protocol_version" label="station_protocol_version" width="180" />
      <el-table-column prop="station_sip_trans_type" label="station_sip_trans_type" width="170" />
      <el-table-column prop="station_register_rs_time" label="station_register_rs_time" width="180" />
      <el-table-column prop="station_enable" label="station_enable" width="110" />
      <el-table-column prop="harmony_platform_ip" label="harmony_platform_ip" width="150" />
      <el-table-column prop="harmony_platform_port" label="harmony_platform_port" width="170" />
      <el-table-column prop="harmony_platform_username" label="harmony_platform_username" width="210" />
      <el-table-column prop="harmony_platform_pwd" label="harmony_platform_pwd" width="180" />
      <el-table-column prop="state" label="state" width="80" />
      <el-table-column prop="create_time" label="create_time" width="110" />
      <el-table-column prop="create_by" label="create_by" width="100" />
      <el-table-column prop="update_by" label="update_by" width="100" />
      <el-table-column prop="update_time" label="update_time" width="110" />
      <el-table-column prop="camera_username" label="camera_username" width="130" />
      <el-table-column prop="camera_pwd" label="camera_pwd" width="110" /> -->
      <el-table-column v-for="col in columns" :key="col.key" :prop="col.key" :label="col.title" :width="col.width" :fixed="col.fixed">
        <template #default="{ row, column }">
          <template v-if="currentEditableRow === row.id">
            <el-input v-model="row[column.property]" :disabled="col.editable === false"></el-input>
          </template>
          <template v-else>
            {{ row[column.property] }}
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #header>
          <el-button type="primary" plain size="small" @click="handleAdd">添加</el-button>
        </template>
        <template #default="{ row }">
          <el-button type="primary" plain size="small" v-if="currentEditableRow !== row.id" @click="handleEdit(row)">编辑</el-button>
          <el-button type="info" plain size="small" v-if="currentEditableRow === row.id && actionType" @click="canncelEdit(row)">取消</el-button>
          <el-button type="primary" plain size="small" v-if="currentEditableRow === row.id && actionType" @click="handleSubmit(row)">保存</el-button>
          <el-button type="danger" plain size="small" @click="handleDelete(row)">删除</el-button>
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
  </div>
</template>
<script>
import { ref, reactive, onMounted } from 'vue'
import { columns, exportCsv } from './tableColumn'
import request from '@/utils/axios'
import { ElMessage } from 'element-plus'

export default {
  setup() {
    // 分页数据
    const page = reactive({
      current: 1,
      pageSize: 10,
      pageSizes: [5, 10, 20, 50],
      total: 0
    })
    // 查询表单form
    const form = reactive({
      room_num: '',
      room_name: '',
      camera_name: '',
      nvr_ip: '',
      camera_ip: '',
      camera_mac: '',
      sn_num: '',
      manufacturer: '',
      camera_type: ''
    })
    // 查询
    const handleSearch = () => {
      console.log('🚀 ~ handleSearch ~ form:', form)
      fetchList()
    }
    // 重置
    let kiloForm = ref(null)
    const handleReset = () => {
      kiloForm.value.resetFields()
      fetchList()
    }
    // 导出
    const handleExport = () => {
      fetchList(1).then(data => {
        exportCsv(
          columns.map(itm => itm.title),
          data,
          /* data.map(itm => {
            return {
              ...itm,
              camera_type: itm.camera_type === 1 ? '枪机' : '球机'
            }
          }), */
          '摄像头列表'
        )
      })
    }

    // 列表数据
    const listData = ref([])
    const actionType = ref('')
    const currentItem = reactive({ id: '' })

    // 获取列表数据
    const fetchList = async exports => {
      const response = await request.get(`/kilo/cameras`, {
        params: {
          page: exports ? 1 : page.current,
          pageSize: exports ? 10000 : page.pageSize,
          ...form
        }
      })
      if (response.code === 200) {
        let { total, list } = response.data
        list = list.map(itm => {
          return {
            ...itm,
            update_time: itm.update_time && itm.update_time.slice(0, 19).replace('T', ' '),
            create_time: itm.create_time && itm.create_time.slice(0, 19).replace('T', ' ')
          }
        })
        if (exports) {
          return list
        }
        listData.value = list
        page.total = total
      } else {
        ElMessage.error('获取数据失败')
      }
    }
    const currentEditableRow = ref('')
    // 编辑
    const handleEdit = row => {
      currentEditableRow.value = row.id // 假设每行数据有一个唯一的 id
      actionType.value = 'edit'
    }

    // 页码改变事件
    const handlePageChange = newPage => {
      page.current = newPage
      fetchList()
    }

    // 添加项
    const handleAdd = () => {
      actionType.value = 'add'
      currentEditableRow.value = ''
      listData.value.push({ id: '' })
    }
    // 删除项
    const handleDelete = async item => {
      try {
        let res = await request.delete(`/kilo/camera/${item.id}`)
        if (res.code === 200) {
          ElMessage.success('删除成功')
          fetchList()
        } else {
          ElMessage.error('删除失败:' + res.msg)
        }
      } catch (error) {
        ElMessage.error('删除失败')
      }
    }

    // 处理添加或编辑
    const handleSubmit = async row => {
      try {
        const method = actionType.value === 'edit' ? 'PUT' : 'POST'
        let res = await request({
          url: '/kilo/camera',
          method,
          data: row
        })
        if (res.code === 200) {
          ElMessage.success(actionType.value === 'add' ? '添加成功' : '更新成功')
          fetchList()
        } else {
          ElMessage.error('操作失败: ' + res.msg)
        }
      } catch (error) {
        ElMessage.error('操作失败: ' + error.msg)
      }
      currentEditableRow.value = ''
      actionType.value = ''
    }

    onMounted(() => {
      fetchList()
    })

    return {
      form,
      kiloForm,
      columns,
      handleReset,
      handleSearch,
      handleExport,
      currentEditableRow,
      handleEdit,
      canncelEdit() {
        currentEditableRow.value = ''
        actionType.value = ''
      },
      listData,
      page,
      handlePageChange,
      // 每页数量改变事件
      handleSizeChange: newPageSize => {
        page.pageSize = newPageSize
        page.current = 1
        fetchList()
      },
      handleAdd,
      handleDelete,
      actionType,
      currentItem,
      handleSubmit
    }
  },
  mounted() {
    window._k = this
  }
}
</script>
<style lang="less" scoped>
.kilo {
  text-align: left;
  :deep(.el-table) {
    .cell {
      padding: 0 2px;
    }
  }
}
</style>
