export const columns = [
  { title: 'ID', key: 'id', width: 160, editable: false, fixed: 'left' },
  { title: '电房编号', key: 'roomNum', width: 120 },
  { title: '电房名称', key: 'roomName', width: 120 },
  { title: '摄像头名称', key: 'cameraName', width: 120 },
  {
    title: '摄像头类型',
    key: 'cameraType',
    width: 95,
    isSelect: true,
    options: [
      { value: 1, label: '枪机' },
      { value: 2, label: '球机' },
      { value: 3, label: '半球' }
    ]
  },
  { title: '摄像头IP', key: 'cameraIp', width: 110 },
  { title: '摄像头MAC', key: 'cameraMac', width: 140 },
  { title: 'SN号', key: 'snNum', width: 100 },
  { title: '厂商', key: 'manufacturer', width: 100 },
  { title: '网关设备IP', key: 'gatewayDevIp', width: 110 },
  { title: '网关设备端口', key: 'gatewayDevPort', width: 100 },
  { title: '激活密码', key: 'activatePwd', width: 100 },
  { title: '设备版本号', key: 'devVersion', width: 95 },
  {
    title: '是否多通道',
    key: 'channelType',
    isSelect: true,
    options: [
      { value: 0, label: '否' },
      { value: 1, label: '是' }
    ],
    width: 100
  },
  { title: 'NVR-IP', key: 'nvrIp', width: 110 },
  { title: 'NVR回调地址', key: 'nvrUrl', width: 120 },
  { title: '操作系统', key: 'harmonyAuth', width: 110 },
  {
    title: '是否鸿蒙',
    key: 'isHarmony',
    isSelect: true,
    options: [
      { value: 0, label: '否' },
      { value: 1, label: '是' }
    ],
    width: 90
  },
  { title: '鸿蒙平台IP', key: 'harmonyPlatformIp', width: 150 },
  { title: '鸿蒙平台端口', key: 'harmonyPlatformPort', width: 170 },
  { title: '鸿蒙用户名', key: 'harmonyPlatformUsername', width: 150 },
  { title: '鸿蒙密码', key: 'harmonyPlatformPwd', width: 180 },
  { title: '国标编码', key: 'gbCode', width: 170 },
  { title: '国标密码', key: 'gbPwd', width: 100 },
  { title: '视频平台编码', key: 'stationCode', width: 100 },
  { title: '视频主站', key: 'stationIp', width: 110 },
  { title: '主站端口', key: 'stationPort', width: 90 },
  {
    title: '认证方式',
    key: 'stationAuthType',
    isSelect: true,
    options: [
      { value: 0, label: 'MD5/SHA256' },
      { value: 1, label: 'SHA256' }
    ],
    width: 130
  },
  { title: '心跳周期(秒)', key: 'stationHeartbeat', width: 130 },
  {
    title: '协议版本',
    key: 'stationProtocolVersion',
    width: 180,
    isSelect: true,
    options: [
      { value: 0, label: 'T.28181-2011' },
      { value: 1, label: 'T.28181-2016' },
      { value: 2, label: 'T.28181-2022' }
    ]
  },
  { title: '传输类型(tcp/udp)', key: 'stationSipTransType', width: 170 },
  { title: '注册刷新时长', key: 'stationRegisterRsTime', width: 100 },
  {
    title: '主站启用',
    key: 'stationEnable',
    isSelect: true,
    options: [
      { value: 0, label: '否' },
      { value: 1, label: '是' }
    ],
    width: 110
  },

  {
    title: '状态',
    key: 'state',
    editable: false,
    width: 100,
    isSelect: true,
    options: [
      { value: 0, label: '初始状态' },
      { value: 1, label: '主站完成' },
      { value: 2, label: '鸿蒙完成' },
      { value: 3, label: '主站鸿蒙完成' },
      { value: 4, label: '已同步至nvr' },
      { value: 5, label: '名称已回流' }
    ],
    editable: false
  },
  // { title: '创建者', key: 'createBy', width: 100 },
  { title: '创建时间', key: 'createTime', editable: false, width: 150 },
  // { title: '更新者', key: 'updateBy', width: 100 },
  { title: '更新时间', key: 'updateTime', editable: false, width: 150 },
  { title: '摄像头用户名', key: 'cameraUsername', width: 130 },
  { title: '摄像头密码', key: 'cameraPwd', width: 110 }
]
