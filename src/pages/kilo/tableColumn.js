export const columns = [
  { title: 'ID', key: 'id', width: 180, editable: false, fixed: 'left' },
  { title: '电房编码', key: 'room_num', width: 120 },
  { title: '电房名称', key: 'room_name', width: 120 },
  { title: '摄像头名称', key: 'camera_name', width: 120 },
  { title: 'NVR-IP', key: 'nvr_ip', width: 110 },
  { title: '摄像头IP', key: 'camera_ip', width: 110 },
  { title: '摄像头MAC', key: 'camera_mac', width: 140 },
  { title: 'SN号', key: 'sn_num', width: 100 },
  { title: '厂商', key: 'manufacturer', width: 100 },
  { title: '激活密码', key: 'activate_pwd', width: 100 },
  { title: '摄像头类型', key: 'camera_type', width: 95 },
  { title: '设备版本号', key: 'dev_version', width: 95 },
  { title: '是否多通道', key: 'channel_type', width: 100 },
  { title: '操作系统', key: 'harmony_auth', width: 110 },
  { title: 'NVR回调地址', key: 'nvr_url', width: 120 },
  { title: '是否鸿蒙', key: 'is_harmony', width: 90 },
  { title: '国标编码', key: 'gb_code', width: 130 },
  { title: '国标密码', key: 'gb_pwd', width: 100 },
  { title: '视频平台编码', key: 'station_code', width: 100 },
  { title: '视频主站', key: 'station_ip', width: 110 },
  { title: '主站端口', key: 'station_port', width: 90 },
  { title: '认证方式', key: 'station_auth_type', width: 130 },
  { title: '心跳周期(秒)', key: 'station_heartbeat', width: 130 },
  { title: '协议版本', key: 'station_protocol_version', width: 180 },
  { title: '传输类型(tcp/udp)', key: 'station_sip_trans_type', width: 170 },
  { title: '注册刷新时长', key: 'station_register_rs_time', width: 180 },
  { title: '是否启用', key: 'station_enable', width: 110 },
  { title: '鸿蒙平台IP', key: 'harmony_platform_ip', width: 150 },
  { title: '鸿蒙平台端口', key: 'harmony_platform_port', width: 170 },
  { title: '鸿蒙用户名', key: 'harmony_platform_username', width: 210 },
  { title: '鸿蒙密码', key: 'harmony_platform_pwd', width: 180 },
  { title: '状态', key: 'state', width: 80 },
  { title: '创建者', key: 'create_by', width: 100 },
  { title: '创建时间', key: 'create_time', width: 110 },
  { title: '更新者', key: 'update_by', width: 100 },
  { title: '更新时间', key: 'update_time', width: 110 },
  { title: '摄像头用户名', key: 'camera_username', width: 130 },
  { title: '摄像头密码', key: 'camera_pwd', width: 110 }
]

export function downloadFile(url, filename) {
  // 创建一个a标签用于下载
  var anchorElement = document.createElement('a')
  anchorElement.style.display = 'none' // 使其不在文档中显示
  document.body.appendChild(anchorElement) // 添加到DOM中
  // 设置下载文件的链接
  anchorElement.href = url

  anchorElement.download = filename || 'download' // 如果没有提供文件名，则默认为 'download'
  anchorElement.click()
  document.body.removeChild(anchorElement)
}

// 使用示例
// 假设有一个指向文件的URL
// var fileUrl = 'https://example.com/path/to/file.pdf';
// // 调用函数下载文件
// downloadFile(fileUrl, 'myFile.pdf');
// 客户端导出csv
export function exportCsv(title = `姓名,电话,邮箱\n`, jsonData, fileName = '导出.csv') {
  // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
  // let title = `姓名,电话,邮箱\n`;
  // 增加\t为了不让表格显示科学计数法或者其他格式
  /* for (let i = 0; i < jsonData.length; i++) {
    for (const key in jsonData[i]) {
      title += `${jsonData[i][key]},`;
    }
    title += '\n';
  } */
  // 合并标题
  if (Array.isArray(title)) {
    title = title.join(',')
    title += '\n'
  }
  title += jsonData.map(itm => Object.values(itm).join(',')).join('\n')
  // encodeURIComponent解决中文乱码
  const uri = 'data:text/csv;charset=gb2312,\ufeff' + encodeURIComponent(title)
  // const uri = 'data:application/msword;charset=utf-8,\ufeff' + encodeURIComponent(title);
  // 通过创建a标签实现
  const link = document.createElement('a')
  link.href = uri
  // 对下载的文件命名
  link.download = fileName + '.csv'
  link.click()
}
