<template>
  <div id="cart">
    <!-- 导航 -->
     <nav-bar class="nav-bar">
       <div slot="center">购物车({{cartLength}})</div>
     </nav-bar>

     <!-- 购物车商品列表 -->
     <cart-list/>

    <!-- 底部结算 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'   // 顶部导航栏
  import CartList from './cartChild/CartList'            // 商品列表
  import CartBottomBar from './cartChild/CartBottomBar'  // 底部结算

  import {mapGetters} from 'vuex'
  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },

    computed: {
      ...mapGetters(['cartLength'])
    }

   
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
    padding: 44px 0 89px;
    position: relative;
    overflow: hidden;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
 
</style>
