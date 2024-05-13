const exportFile = async () => {
  if (!exportRequestFn) {
    throw new Error('当前没有提供exportRequestFn函数')
  }
  if (typeof exportRequestFn !== 'function') {
    throw new Error('exportRequestFn必须是一个函数')
  }
  try {
    const {
      data: { link }
    } = await exportRequestFn(filterOption.value)
    window.open(link)
    // 显示信息
    options?.message?.EXPORT_DATA_IF_SUCCEED && message(options.message.EXPORT_DATA_IF_SUCCEED)
    // 执行成功钩子
    options?.exportSuccess?.()
  } catch (error) {
    // 显示信息
    options?.message?.EXPORT_DATA_IF_FAILED && errorMessage(options.message.EXPORT_DATA_IF_FAILED)
    // 执行失败钩子
    options?.exportError?.()
  }
}
const loadData = async (page = curPage.value) => {
  loading.value = true
  try {
    const {
      data,
      meta: { total: count }
    } = await listRequestFn(pageSize.value, page, filterOption.value)
    list.value = data
    total.value = count
    // 执行成功钩子
    options?.message?.GET_DATA_IF_SUCCEED && message(options.message.GET_DATA_IF_SUCCEED)
    options?.requestSuccess?.()
  } catch (error) {
    options?.message?.GET_DATA_IF_FAILED && errorMessage(options.message.GET_DATA_IF_FAILED)
    // 执行失败钩子
    options?.requestError?.()
  } finally {
    loading.value = false
  }
}
// 服务端导出xls
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

// 客户端导出csv
export function exportCsv(title = `姓名,电话,邮箱\n`, jsonData, fileName = '导出.csv') {
  // 增加\t为了不让表格显示科学计数法或者其他格式
  /* for (let i = 0; i < jsonData.length; i++) {
    for (const key in jsonData[i]) {
      title += `${jsonData[i][key]},`;
    }
    title += '\n';
  } */
  // 数组标题转string
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
