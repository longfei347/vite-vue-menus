const fs = require('fs')
const path = require('path')

const srcDir = path.join(__dirname, 'dist') // 打包后的文件夹路径
const dstDir = path.join(__dirname, '../smp/client/dist') // 目标文件夹路径

// 删除指定目录
fs.rm(dstDir, { recursive: true }, err => {
  if (err) {
    console.error(`删除dist失败: ${err}`)
  } else {
    console.log('删除dist成功')
  }
  // 复制文件夹到指定目录
  fs.cp(srcDir, dstDir, { recursive: true }, err => {
    if (err) {
      console.error(`复制dist失败: ${err}`)
    } else {
      console.log('复制dist成功')
    }
  })
})
