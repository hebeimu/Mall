// 1.导入 Vue 和 Vuex 包
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 2.安装插件
Vue.use(Vuex)

const state = {
  cartList: []
}

// 3.创建 store 状态管理对象
const store = new Vuex.Store({
  state,      // 状态（存储数据）
  mutations,  // 改变状态（改变数据）
  actions,    // 异步操作
  getters    // 计算属性
})


// 4.导出对象
export default store