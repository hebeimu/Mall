<template>
  <div>
     <div class="info-desc" v-if="Object.keys(detailInfo).length">
       <div>{{ detailInfo.desc }}</div>
       <div>{{ detailInfo.detailImage[0].key }}</div>
       <div class="info-list">
         <img v-for="(item,index) in detailInfo.detailImage[0].list" :src="item" alt="" @load="imageLoad">
       </div>
     </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailGoodsInfo',
    props: {
      detailInfo: {
        type: Object,
        default () {
          return []
        }
      }
    },
    methods: {
      imageLoad () {
        this.$emit('imageLoad')
      }
    }
  }
</script>

<style scoped>
  .info-desc {
    margin-top: 20px;
  }
  img {
    width: 100%;
  }
 
</style>
