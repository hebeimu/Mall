<template>
  <div class="shop-info">
     <div class="shop-top">
       <img :src="shop.logo" alt="">
       <span class="title">{{ shop.name }}</span>
     </div>
     <div class="shop-middle">
       <div class="shop-middle-item">
         <div class="info-sells">
           <div class="sells-count">{{ shop.sells | sellCountFilter }}</div>
           <div class="sells-text">总销量</div>
         </div>
         <div class="info-goods"> 
           <div class="goods-count">{{ shop.goodsCount }}</div>
           <div class="goods-text">全部宝贝</div>
         </div>
       </div>
       <div class="shop-middle-item">
         <table>
           <tr v-for="(item,index) in shop.score">
             <td>{{ item.name }}</td>
             <td class="item-score">{{ item.score }}</td>
             <td class="item-title">{{ item.isBetter ? '高' : '低' }}</td>
           </tr>
         </table>
       </div>
     </div>
     <div class="shop-bottom">
       <span class="enter-shop">进店逛逛</span>
     </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailShopInfo',
    props: {
      shop: {
        type: Object,
        default () {
          return {}
        }
      }
    },

    filters: {
      sellCountFilter (msg) {
        return msg < 10000 ? msg : (msg / 10000).toFixed(1) + '万'
      }
    }
  }
</script>

<style scoped>
  .shop-info {
    border-top: 5px solid #eee;
    border-bottom: 5px solid #eee;
  }

  .shop-top {
    margin: 20px;
  }

  .shop-top img {
    width: 45px;
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
  }

  .shop-middle {
    display: flex;
  }
  .shop-middle-item {
    flex: 1;
    color: #333;
  }
  .shop-middle-item:first-child {
    border-right: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    padding-top: 15px;
  }
  .sells-text,
  .goods-text {
    font-size: 13px;
    margin-top: 5px;
  }
  
  .shop-middle-item table {
    margin: 0 auto;
    text-align: center;
    font-size: 13px;
    line-height: 1.5;
  }
  .shop-middle-item table .item-score {
    padding: 0 5px;
    color: #f13e3a;
  }
  .shop-middle-item table .item-title {
    background-color: #f13e3a;
    color: #fff;
  }
  .shop-bottom {
    text-align: center;
    margin: 20px 0; 
  }
  .enter-shop {
    padding: 5px 35px;
    background-color: #eee;
    border-radius: 10px;
    font-size: 13px;
    color: #666;
  }
</style>
