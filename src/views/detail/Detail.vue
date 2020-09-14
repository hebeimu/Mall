<template>
  <div class="detail">
     <detail-nav-bar class="detail-nav-bar" ref="navbar" @activeClick="activeClick"/>
     <scroll class="wrapper" ref="scroll" @scroll="scroll">
       <detail-swiper :top-images="topImages"/>
       <detail-base-info :goods="goods"/>
       <detail-shop-info :shop="shop"/>
       <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
       <detail-param-info :param-info="paramInfo" ref="param"/>
       <detail-comment-info :comment-info="commentInfo" ref="comment"/>
       <goods-list :goods="recommend" ref="recommend"/>
     </scroll>  
     <detail-bottom-bar @addToCart="addToCart"/>
     <back-top v-show="isShow" @click.native="backTopClick"/>
     <div class="eject-info" v-show="isEject">{{ejectInfo}}</div>
  </div>
</template>

<script>
  import DetailNavBar from './detailChild/DetailNavBar'          // 顶部导航
  import DetailSwiper from './detailChild/DetailSwiper'          // 轮播图
  import DetailBaseInfo from './detailChild/DetailBaseInfo'      // 商品价格基本信息
  import DetailShopInfo from './detailChild/DetailShopInfo'      // 店铺信息
  import DetailGoodsInfo from './detailChild/DetailGoodsInfo'    // 商品展示效果图
  import DetailParamInfo from './detailChild/DetailParamInfo'    // 商品参数信息 
  import DetailCommentInfo from './detailChild/DetailCommentInfo'// 商品评论信息
  import GoodsList from 'components/content/goods/GoodsList'     // 推荐商品信息
  import DetailBottomBar from './detailChild/DetailBottomBar'    // 底部购买操作栏
  import BackTop from 'components/content/backtop/BackTop'       // 点击回到顶部

  import Scroll from 'components/common/scroll/Scroll'
  import {getDetail, Goods, Shop, GoddsParam, getRecommend} from 'network/detail'
  import {debounce} from 'common/utils'
  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop,
      Scroll
    },
    data () {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommend: [],
        isShow: false,
        themeTopYs: [],
        ejectInfo: null,
        isEject: false
      }
    },

    created () {
      // 1. 保存传入的 iid
      this.iid = this.$route.params.iid
      
      // 2. 根据 iid 请求详情数据
      getDetail(this.iid).then(res => {
        // 2.1 将网络请求到的数据取出来存入一个变量中，方便使用
        const data = res.result
 
        // 2.2 获取顶部轮播图数据
        this.topImages = data.itemInfo.topImages

        // 2.3 获取商品信息
        this.goods = new Goods (data.itemInfo,data.columns,data.shopInfo.services)

        // 2.4 获取店铺信息
        this.shop = new Shop (data.shopInfo)

        // 2.5 获取商品详情数据
        this.detailInfo = data.detailInfo

        // 2.6 获取商品的参数信息
        this.paramInfo = new GoddsParam (data.itemParams.info, data.itemParams.rule)
        
        // 2.7 获取商品评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0]
        }
        
        // 2.8 获取推荐展示的商品信息
        getRecommend().then(res => {
          this.recommend = res.data.list
        }) 

      }) 
    },

    mounted () {
      this.refresh = debounce(this.$refs.scroll.refresh, 50)

      // 使用事件总成和防抖节流函数，来刷新 refresh
      this.$bus.$on("imageLoad", this.refresh)


      // 商品图片展示图片加载完，刷新 refresh，并且获取商品详情页锚点坐标
      this.imgLoadDebounce = debounce( () => {
          this.$refs.scroll.refresh()
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop-44)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
      }, 100)
    },

    destroyed() {
      // 页面销毁的时候，注销事件总成
      this.$bus.$off("imageLoad", this.refresh)
    },

    methods: {
      // 图片加载完毕刷新滚动范围
      imageLoad () {
        this.imgLoadDebounce()
      },


      // 监听滚动坐标
      scroll (position) {
          // 把监听到的滚动坐标转成正数
          var position = Math.abs(position)

          // 当滚动的坐标值超过 1000 变显示，点击回到顶部的图标
          this.isShow = position >= 1000

          // 动态获取商品详情页的导航页的 index
          if (position < this.themeTopYs[1]) {
            this.$refs.navbar.currentIndex = 0
          } else if (position >= this.themeTopYs[1] && position < this.themeTopYs[2]) {
            this.$refs.navbar.currentIndex = 1
          } else if (position >= this.themeTopYs[2] && position < this.themeTopYs[3]) {
            this.$refs.navbar.currentIndex = 2
          } else if (position >= this.themeTopYs[3]) {
            this.$refs.navbar.currentIndex = 3
          }
      },

      activeClick (index) {
        // 根据商品详情页导航的 index 动态定位到锚点位置
        this.$refs.scroll.scrollTop(-this.themeTopYs[index])
      },


      // 点击回到顶部
      backTopClick () {
        this.$refs.scroll.scrollTop(0,500)
      },

      // 将加入购物车的商品的信息存储起来，放进状态管理中 
      addToCart () {
        // 1. 获取购物车需要展示的商品信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.detailInfo.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        
        // 2. 将商品添加到购物车
        this.$store.dispatch('addCart', product).then(res => {
          this.ejectInfo = res
          this.isEject = true
          window.setTimeout(() => {
            this.isEject = false
          }, 1500)
        })
      } 
    }
  }
</script>

<style scoped>
  .detail {
    padding: 44px 0 58px;
    height: 100vh;
    position: relative;
    z-index: 999;
    background-color: #fff;
    overflow: hidden;
  }
  .detail-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: #fff;
  }
  .detail .wrapper {
    height: calc(100%);
  }

  .eject-info {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0, 0, 0, .8);
    color: #fff;
    padding: 5px 10px;
    border-radius: 10px;
  }
 
</style>


