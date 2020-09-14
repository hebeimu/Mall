<template>
  <div class="shop-item">
    <div class="item-selector">
      <check-button :is-checked="itemInfo.check" @click.native="checkClick"/>
    </div>

    <div class="item-img"> 
      <img :src="itemInfo.image" alt="">
    </div>

    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <span class="item-price">￥{{itemInfo.price}}</span>
        <span class="item-count">x{{itemInfo.count}}</span>
      </div>
    </div>
     
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  export default {
    name: 'CartListItem',
    components: {
      CheckButton,
    },
    props: {
      itemInfo: {
        type: Object,
        default () {
          return {}
        }
      }
    },

    methods: {
      checkClick () {
        this.itemInfo.check = !this.itemInfo.check
      }
    }
  }
</script>

<style scoped>
  .shop-item {
    border-bottom: 1px solid #ccc;
    display: flex;
    padding: 5px;
    width: 100%;
  }
  
  .shop-item .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .shop-item .item-img {
    padding: 5px;
  }
  .shop-item .item-img  img{
    width: 88px;
    height: 100px;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    overflow: hidden;
    position: relative;
  }

  .item-title,
  .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-desc {
    font-size: 14px;
    color: #999;
    margin-top: 15px;
  }

  .info-bottom {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    display: flex;
  }

  .info-bottom span {
    flex: 1;
  }
  .item-price {
    color: red;
  }
  .item-count {
    text-align: right;
  }
</style>
