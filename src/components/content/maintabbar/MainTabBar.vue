<template>
  <div>
    <keep-alive exclude="Detail">
      <router-view/>
  </keep-alive>
  <tab-bar>
      <tab-bar-item path="/home" color="red">
        <div slot="item-icon"><img src="~assets/images/tabbar/首页.png" alt=""></div>
        <div slot="item-icon-active"><img src="~assets/images/tabbar/首页-选中.png" alt=""></div>
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/sort" color="red">
        <div slot="item-icon"><img src="~assets/images/tabbar/分类.png" alt=""></div>
        <div slot="item-icon-active"><img src="~assets/images/tabbar/分类-选中.png" alt=""></div>
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" color="red">
        <div slot="item-icon"><img src="~assets/images/tabbar/购物车.png" alt=""></div>
        <div slot="item-icon-active"><img src="~assets/images/tabbar/购物车-选中.png" alt=""></div>
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/user" color="red">
        <div slot="item-icon"><img src="~assets/images/tabbar/用户.png" alt=""></div>
        <div slot="item-icon-active"><img src="~assets/images/tabbar/用户-选中.png" alt=""></div>
        <div slot="item-text">用户</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'
  export default {
    name: 'MainTabBar',
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

 
</style>
