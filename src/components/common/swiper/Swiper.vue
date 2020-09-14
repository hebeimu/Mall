<template>
  <div class="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <div class="indicator">
      <div class="indi-item" v-for="(item,index) in slideCount" :class="{active: index === slideIndex - 1}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Swiper',
    data () {
      return {
        slideCount: 0,  // 记录 slide 的个数
        swiperStyle: {},// swiper 的 Style 对象
        swiperWidth: 0, // swiper 的宽度
        slideIndex: 1,  // 现在所显示的slide索引
        scrolling: false// 是否正在滚动
      }
    },
    props: {
      animateTime: {
        type: Number,
        default: 300
      },
      interval: {
        type: Number,
        default: 3000
      },
      moveRatio: {
        type: Number,
        default: 0.25
      }
    },
    mounted () {
      this.$bus.$on('imgLoad', () => {
        if (this.slideCount == 0) {
          this.handleDom()
        } 
        this.startTimer()
      })
      
    },
    methods:{
      /**
       * 操作 DOM
       */
      handleDom () {
        // 1. 获取要操作的 DOM 
        var swiper = document.querySelector('.swiper')
        var slide = swiper.querySelectorAll('.slide')

        // 2. 记录 slide  的个数
        this.slideCount = slide.length

        // 3. 克隆要添加的 slide
        var firstNode = slide[0].cloneNode(true)
        var lastNode = slide[slide.length-1].cloneNode(true)

        // 4. 在前后各添加一个 slide
        swiper.appendChild(firstNode)
        swiper.insertBefore(lastNode, slide[0])

        // 5. 获取 swiper 的 Style 对象
        this.swiperStyle = swiper.style

        // 6. 获取 swiper 的宽度
        this.swiperWidth = swiper.offsetWidth

        // 7. 显示第一个slide 
        this.moveTransform(-this.swiperWidth)
      },

      /**
       * 移动到指定的位置
       */
      moveTransform (position) {
        this.swiperStyle.transform = `translate(${position}px)`
      },
      
      /**
       * 滚动到正确的位置
       */
      scrollContent (currentPosition) {
        // 1. 记录开始滚动状态
        this.scrolling = true

        // 2. 开始滚动动画
        this.swiperStyle.transition = 'transform ' + this.animateTime + 'ms'
        this.moveTransform(currentPosition)

        // 3. 判断滚动到的位置
        this.checkPosition()

        // 4. 记录结束滚动状态
        this.scrolling = false
      },

      /**
       * 定时器
       */
      startTimer () { // 开启定时器
        this.playTime = window.setInterval(() => {
          this.slideIndex++
          this.scrollContent(-this.swiperWidth * this.slideIndex)
        }, this.interval)
      },
      stopTimer () {  // 停止定时器
        window.clearInterval(this.playTime)
      },

      /**
       * 效验正确的位置
       */
      checkPosition () {
        window.setTimeout(() => {
          this.swiperStyle.transition = '0ms'
          if (this.slideIndex >= this.slideCount + 1) {
            this.slideIndex = 1
            this.moveTransform(-this.swiperWidth)
          } else if (this.slideIndex <= 0) {
            this.slideIndex = this.slideCount
            this.moveTransform(-this.swiperWidth * this.slideIndex)
          }
        }, this.animateTime)
      },

      /**
       * 滑动事件处理
       */
      touchStart (e) { // 手指按下触发
        // 1. 如果正在滚动，则不可以拖动
        if (this.scrolling) return

        // 2. 停止定时器
        this.stopTimer()

        // 3. 保存开始滚动的位置
        this.startX = e.touches[0].pageX
      },

      touchMove (e) {  // 手中滑动触发
        // 1. 计算出用户拖动的距离
        this.currentX = e.touches[0].pageX 
        this.distance = this.currentX - this.startX

        // 2. 计算出当前的 slide 的坐标值
        let currentPosition = -this.swiperWidth * this.slideIndex

        // 3. 计算出当前应该滑到到了哪个位置
        let movePosition = currentPosition + this.distance

        // 4. 设置当前的位置
        this.moveTransform(movePosition)

      },

      touchEnd (e) {   // 手指离开触发
        // 1. 获取移动的距离
        let currentMove = Math.abs(this.distance)

        // 2. 判断最终的距离
        if (this.distance === 0) {
          return
        } else if (this.distance > 0 && currentMove >= this.swiperWidth * this.moveRatio) {
          this.slideIndex--
        } else if (this.distance < 0 && currentMove >= this.swiperWidth * this.moveRatio) {
          this.slideIndex++
        }

        // 3. 移动到正确的位置
        this.scrollContent(-this.swiperWidth * this.slideIndex)

        // 4. 开启定时器
        this.startTimer()
      }

    },
  }
</script>

<style scoped>
  .hy-swiper {
    width: 100%;
    position: relative;
  }
  .swiper {
    display: flex;
  }
  .indicator {
    display: flex;
    justify-content: center;
    width: 100%;
    position: absolute;
    bottom: 10px;
  }
  .indicator .indi-item {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #fff;
    margin: 0 5px;
  }
  .indi-item.active {
    background-color: #D43E2E;
  }
</style>
