<template>
  <div class="home">
    <!-- 顶部导航 -->
    <nav-bar class="nav-bar"><div slot="center">蘑菇街</div></nav-bar>
    <tab-control v-show="isFixed" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControls"/>
    <scroll class="wrapper" ref="scroll" @scroll="scroll" @loadMore="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @imageLoad="imageLoad"/>
      <!-- 商品导航 -->
      <recommend :recommends="recommends"/>
      <!-- 流行推荐 -->
      <home-fashion/>
      <!-- 商品类别标题 -->
      <tab-control v-show="!isFixed" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl"/>
      <!-- 商品展示 -->
      <goods-list :goods="showGoods"/>
    </scroll>
    <!-- 返货顶部 -->
    <back-top v-show="isShow" @click.native="scrollTop"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './homechild/HomeSwiper'
  import Recommend from './homechild/Recommend'
  import HomeFashion from './homechild/HomeFashion'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backtop/BackTop'

  //  滚动组件
  import Scroll from 'components/common/scroll/Scroll'

  // 引入获取数据的方法 
  import {getHomeData,getHomeGoods} from 'network/home'

  // 引入工具函数
  import {debounce} from 'common/utils'

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      Recommend,
      HomeFashion,
      TabControl,
      GoodsList,
      BackTop,
      Scroll
    },
    data () {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {page: 0, list: []},
          new: {page: 0, list: []},
          sell: {page: 0, list: []}
        },
        currentType: 'pop',
        isShow: false,
        isFixed: false,
        tabControlTop: 0
      }
    },

    created () {
      // 网络请求获取商品数据
      this.getHomeData()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },

    mounted () {
      // 使用防抖函数，根据goods图片加载完成，更新滚动的高度
      this.refresh = debounce(this.$refs.scroll.refresh, 100)
      this.$bus.$on('imageLoad', this.refresh)
    },

    deactivated () {
      this.$bus.$off('imageLoad', this.refresh)
    },

    computed: {
      showGoods () {
        return this.goods[this.currentType].list
      }
    },

    methods: {
      /**
       * 获取数据
       */
      // 获取轮播图和推荐数据
      getHomeData () {
        getHomeData().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },

      // 获取展示的商品数据
      getHomeGoods (type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // 完成上拉加载更多
          this.$refs.scroll.scroll.finishPullUp()
        })
      },

      /**
       * 事件处理
       */
      // 处理点击切换商品展示
      tabClick (index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }

        this.$refs.tabControl.currentIndex = index
        this.$refs.tabControls.currentIndex = index
      },

      // 监听页面滚动的实时坐标
      scroll (position) {
        this.isShow = Math.abs(position) >= 1000

        this.isFixed = Math.abs(position) >= this.tabControlTop - 44
      },

      // 上拉加载更多
      loadMore () {
        this.getHomeGoods(this.currentType)
      },

      // 监听轮播图加载完成
      imageLoad () {
        this.tabControlTop = this.$refs.tabControl.$el.offsetTop
      },

      // 点击返回顶部
      scrollTop () {
        this.$refs.scroll.scrollTop(0,500)
      }

    }
  }

</script>

<style scoped>
  .home {
    height: 100vh;
    padding: 44px 0 49px;
    position: relative;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .wrapper {
    height: calc(100%);
    overflow: hidden;
  }
</style>
