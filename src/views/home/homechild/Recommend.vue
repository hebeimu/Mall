<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends"> 
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Recommend',
    props: {
      recommends: {
        type: Array,
        default () {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 15px 0;
    border-bottom: 8px solid #ddd;
    font-size: 12px;
    text-align: center;
  }
  .recommend-item a{
    color: #333;
  }
  .recommend-item img {
    width: 70px;
    height: 70px;
    vertical-align: middle;
    margin-bottom: 8px;
  }
 
</style>
