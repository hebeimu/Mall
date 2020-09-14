<template>
  <div class="cart-list">
    <scroll class="wrapper" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :itemInfo="item"/>
    </scroll>  
  </div>
</template>

<script>
  import CartListItem from './CartListItem'
  import Scroll from 'components/common/scroll/Scroll'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CartList',
    components: {
      CartListItem,
      Scroll
    },


    computed: {
      ...mapGetters(['cartList'])
    },

    activated() {
      // 因为路由界面都被 keep-aline 包裹了，所有使用activated声明周期函数
      // 每次进入页面的时候刷新一次scroll的滚动范围
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100%);
  }
  .wrapper {
    height: calc(100%);
  }
</style>
