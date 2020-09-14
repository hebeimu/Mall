<template>
  <div>
     <swiper class="swiperitem" id="item">
       <swiper-item v-for="item in topImages">
         <img :src="item" alt="" @load="imageLoad">
       </swiper-item>
     </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: 'DetailSwiper',
    components: {
      Swiper,
      SwiperItem
    },
    data () {
      return {
        imgCount: 0
      }
    },
    props: {
      topImages: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      imageLoad () {
        if (++this.imgCount === this.topImages.length) {
          this.$bus.$emit('imgLoad')
        }
        
      }
    }
  }
</script>

<style scoped>
  .swiperitem {
    height: 300px;
    overflow: hidden;
  }

</style>
