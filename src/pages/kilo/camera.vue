<template>
  <div class="kilo">
    <el-form :model="form" inline ref="kiloForm" label-width="90px" class="cameraForm">
      <el-form-item label="电房编号" prop="roomNum">
        <el-input v-model="form.roomNum"></el-input>
      </el-form-item>
      <el-form-item label="电房名称" prop="roomName">
        <el-input v-model="form.roomName"></el-input>
      </el-form-item>
      <el-form-item label="摄像头名称" prop="cameraName">
        <el-input v-model="form.cameraName"></el-input>
      </el-form-item>
      <el-form-item label="NVR-IP" prop="nvrIp">
        <el-input v-model="form.nvrIp"></el-input>
      </el-form-item>
      <el-form-item label="摄像头IP" prop="cameraIp">
        <el-input v-model="form.cameraIp"></el-input>
      </el-form-item>
      <el-form-item label="摄像头MAC" prop="cameraMac">
        <el-input v-model="form.cameraMac"></el-input>
      </el-form-item>
      <el-form-item label="摄像头类型" prop="cameraType">
        <el-select v-model="form.cameraType" class="w80" placeholder="摄像头类型" clearable>
          <el-option :value="1" label="枪机"></el-option>
          <el-option :value="2" label="球机"></el-option>
          <el-option :value="3" label="半球"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否多通道" prop="channelType">
        <el-select v-model="form.channelType" class="w80" placeholder="是否多通道" clearable>
          <el-option :value="1" label="是"></el-option>
          <el-option :value="0" label="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否鸿蒙" prop="isHarmony">
        <el-select v-model="form.isHarmony" class="w80" placeholder="是否鸿蒙" clearable>
          <el-option :value="1" label="是"></el-option>
          <el-option :value="0" label="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SN号" prop="snNum">
        <el-input v-model="form.snNum"></el-input>
      </el-form-item>
      <el-form-item label="厂商" prop="manufacturer">
        <el-input v-model="form.manufacturer"></el-input>
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
      <el-table-column v-for="col in columns" :key="col.key" :prop="col.key" :label="col.title" :width="col.width" :fixed="col.fixed" show-overflow-tooltip="true">
        <template #default="{ row, column }">
          <template v-if="currentEditableRow === row.id">
            <template v-if="col.isSelect">
              <el-select v-model="row[column.property]" :disabled="col.editable === false" placeholder="请选择">
                <el-option v-for="itm in col.options" :value="itm.value" :label="itm.label"></el-option>
              </el-select>
            </template>
            <el-input v-else v-model="row[column.property]" :disabled="col.editable === false"></el-input>
          </template>
          <template v-else>
            {{ col.isSelect ? col.options.find(im => im.value === row[column.property])?.label : row[column.property] }}
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #header>
          <el-button type="primary" plain size="small" @click="handleAdd">添加</el-button>
        </template>
        <template #default="{ row }">
          <el-button type="primary" plain size="small" v-if="currentEditableRow !== row.id" @click="handleEdit(row)">编辑</el-button>
          <el-button type="info" plain size="small" v-if="currentEditableRow === row.id && actionType" @click="handleCanncel(row)">取消</el-button>
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
import { columns } from './tableColumn'
import { exportCsv } from '@/utils/util'
import request from '@/utils/axios'
import { ElMessage } from 'element-plus'

export default {
  name: 'camera',
  label: '摄像头列表',
  icon: 'List',
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
      roomNum: '',
      roomName: '',
      cameraName: '',
      nvrIp: '',
      cameraIp: '',
      cameraMac: '',
      cameraType: '',
      channelType: '',
      snNum: '',
      manufacturer: ''
    })
    // 查询
    const handleSearch = () => {
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
      /* data = [{
        id: 8535752199279,
        room_num: '123',
        room_name: null,
        camera_name: 'long',
        nvr_ip: '192.168.1.101',
        camera_ip: '192.168.1.10',
        camera_mac: '::',
        sn_num: '123456',
        manufacturer: 'HK',
        activate_pwd: null,
        camera_type: null,
        dev_version: 'v1.0',
        channel_type: null,
        harmony_auth: 'v1.2',
        nvr_url: '/lele',
        is_harmony: 1,
        gb_code: 'gbCode',
        gb_pwd: 'gb_pwd',
        station_code: null,
        station_ip: '192.168.1.2',
        station_port: 8080,
        station_auth_type: null,
        station_heartbeat: null,
        station_protocol_version: null,
        station_sip_trans_type: null,
        station_register_rs_time: null,
        station_enable: null,
        harmony_platform_ip: null,
        harmony_platform_port: 0,
        harmony_platform_username: null,
        harmony_platform_pwd: null,
        state: null,
        create_time: null,
        create_by: '',
        update_by: '',
        update_time: null,
        camera_username: null,
        camera_pwd: '123123'
      }] */
      // 过滤form非空值
      let curForm = Object.fromEntries(
        Object.entries(form).filter(([key, value]) => {
          // 这里可以添加更多检查，例如 `value.length === 0` 对于数组或 `{}.toString.call(value) === '[object Object]'` 对于对象
          return value !== ''
        })
      )
      const res = await request.get(`/kilo/camera/list`, {
        params: {
          pageNum: exports ? 1 : page.current,
          pageSize: exports ? 10000 : page.pageSize,
          ...curForm
        }
      })
      if (res.code === 200) {
        let { total, list, rows } = res.data || res
        list = list || rows
        list = list.map(itm => {
          return {
            ...itm,
            // stationAuthType: ['MD5/SHA256', 'SHA256'][itm.stationAuthType],
            // stationEnable: ['否', '是'][itm.stationEnable],
            // stationProtocolVersion: { 0: 'T.28181-2011', 1: 'T.28181-2016', 2: 'T.28181-2022' }[itm.stationProtocolVersion],
            // state: { 0: '初始状态', 1: '主站完成', 2: '鸿蒙完成', 3: '主站鸿蒙完成', 4: '已同步至nvr', 5: '名称已回流' }[itm.state],
            // isHarmony: ['否', '是'][itm.isHarmony],
            // channelType: ['否', '是'][itm.channelType],
            // cameraType: ['', '枪机', '球机', '半球'][itm.cameraType],
            updateTime: itm.updateTime && itm.updateTime.slice(0, 19).replace('T', ' '),
            createTime: itm.createTime && itm.createTime.slice(0, 19).replace('T', ' ')
          }
        })
        if (exports) {
          return list
        }
        // console.log('🚀 ~ fetchList ~ list:', list)
        listData.value = list || rows
        page.total = total
      } else {
        ElMessage.error('获取数据失败')
      }
    }
    const currentEditableRow = ref('')
    // 编辑
    let editRow = {}
    const handleEdit = row => {
      currentEditableRow.value = row.id
      editRow = { ...row }
      actionType.value = 'edit'
    }
    // 取消
    const handleCanncel = row => {
      if (actionType.value === 'add') {
        listData.value.pop()
      } else {
        Object.assign(row, editRow)
      }
      currentEditableRow.value = ''
      actionType.value = ''
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
      handleCanncel,
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
  .cameraForm {
    .el-form-item {
      margin-right: 10px;
    }
    .el-input,
    .el-select {
      width: 130px;
    }
  }
  :deep(.el-table) {
    .cell {
      padding: 0 2px;
    }
  }
}
</style>
