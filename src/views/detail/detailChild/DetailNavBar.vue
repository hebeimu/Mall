<template>
  <div>
     <nav-bar>
       <div slot="left" class="back" @click="backClick">
         <img src="~assets/images/common/back.svg" alt="">
       </div>
       <div slot="center" class="title">
         <div v-for="(item,index) in title" :class="{active: currentIndex === index}" @click="activeIndex(index)">{{ item }}</div>
       </div>
     </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'DetailNavBar',
    components: {
      NavBar
    },
    data () {
      return {
        title: ['商品','参数','评论','推荐'],
         currentIndex: 0
      }
    },
   

    methods: {
      activeIndex (index) {
        this.currentIndex = index
        this.$emit("activeClick", index)
      },

      backClick () {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .back img {
    width: 20px;
    margin-top: 13px;
  }
  .title {
    display: flex;
    justify-content: space-around;
    font-size: 14px;
  }
  .active {
    color: var(--color-height-text);
  }

 
</style>
