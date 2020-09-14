<template>
  <div class="wrapper" ref="wrapper">
     <div class="content">  
       <slot></slot>
     </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'Scroll',
    data () {
      return {
        scroll: null
      }
    },
    props: {

    },
    mounted () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: 3,
        pullUpLoad: true
      })

      // 监听页面滚动
      this.scroll.on('scroll', position => {
        this.$emit('scroll', position.y)
      })

      // 上拉加载事件
      this.scroll.on('pullingUp', () => {
        this.$emit('loadMore')
      })
    },

    methods: {
      refresh () {
        this.scroll.refresh()
      },

      scrollTop (positionY,time=300) {
        this.scroll.scrollTo(0,positionY, time)
      }
    }
  }
</script>

<style scoped>

 
</style>
