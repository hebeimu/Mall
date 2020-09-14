// 防抖节流函数
export function debounce (callback, wait=100) {
  let timer = null
  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      callback()
    },wait)
  }
}


// 时间格式化
export function formatDate(date) {
  
  const year = date.getFullYear()  // 获取年

  const month = date.getMonth() + 1    // 获取月
  const day = date.getDate()       // 获取天
  const hour = date.getHours()      // 获取实
  const minute = date.getMinutes() // 获取分

  return year + "-" + month + "-" + day +" " + hour + ":" + minute
}