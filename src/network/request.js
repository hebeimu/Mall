// 网络请求主模块

// 1. 引入 axios 包
import axios from 'axios'

// 2. 导出 axios 请求函数
export function request (config) {
  // 3.1 创建 axios 实例，并定义公共配置
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout: 5000
  })

  // 3.2 定义请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })

  // 3.3 定义响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {

  })

  // 3.4 发送请求 
  return instance(config)
}