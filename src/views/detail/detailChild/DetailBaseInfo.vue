<template> 
  <div class="base-info" v-if="Object.keys(goods).length">
     <div class="info-title">{{ goods.title }}</div>
     <div class="indo-price">
       <span class="n-price">{{ goods.newPrice }}</span>
       <span class="o-price">{{ goods.oldPrice }}</span>
       <span class="discount" v-if="goods.discount">{{ goods.discount }}</span>
     </div>
     <div class="info-other">
       <span>{{ goods.columns[0] }}</span>
       <span>{{ goods.columns[1] }}</span>
       <span>{{ goods.services[goods.services.length-1].name }}</span>
     </div>
     <div class="info-service"> 
       <span class="info-service-item" v-for="index in goods.services.length-1" :key="index" v-if="goods.services[index-1].icon">
         <img :src="goods.services[index-1].icon" alt="">
         <span>{{ goods.services[index-1].name }}</span>
       </span>
     </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBaseInfo',
    props: {
      goods: {
        type: Object,
        defailt () {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    padding: 10px;
  }

  .info-title {
    color: #333;
  }

  .indo-price {
    margin: 15px 0;
  }

  .n-price {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-height-text);
  }

  .o-price {
    font-size: 12px;
    margin: 0 3px;
    text-decoration: line-through;
  }

  .discount {
    font-size: 12px;
    padding: 2px 3px;
    background-color: var(--color-height-text);
    color: #fff;
    border-radius: 10px;
    position: relative;
    top: -8px;
  }

  .info-other {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    font-size: 12px;
    color: #bbb;
    display: flex;
    justify-content: space-between;;
  }
  
  .info-service {
    padding: 25px 0;
    font-size: 14px;
    color: #666;
    display: flex;
    flex-wrap: wrap;
  }
  .info-service-item {
    width: 33%;
    text-align: center;
  }
  .info-service-item img{
    width: 15px;
    vertical-align: -2px;
    margin-right: 2px;
  }
</style>
