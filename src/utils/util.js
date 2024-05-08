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
