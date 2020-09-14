<template>
  <div>
     <swiper>
       <swiper-item v-for="item in banners">
         <a :href="item.link"><img :src="item.image" alt="" @load="imageLoad"></a>
       </swiper-item>
     </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: 'HomeSwiper',
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
      banners: {
        type: Array,
        defaule () {
          return []
        }
      }
    },
    methods: {
      imageLoad () {
        if (++this.imgCount === this.banners.length) {
          this.$bus.$emit('imgLoad')
          this.$emit('imageLoad')
        }
      }

    }
  }
</script>

<style scoped>

 
</style>
