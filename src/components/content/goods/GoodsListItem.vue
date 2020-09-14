<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default () {
          return {}
          }
        }
    },

    computed: {
      showImage () {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },

    methods: {
      // 页面展示的图片加载完成事件
      imageLoad () {
        this.$bus.$emit('imageLoad')
      },

      // 点击页面商品跳转详情页事件
      itemClick () {
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    width: 48%;
    font-size: 12px;
    text-align: center;
  }
  .goods-item img {
    width: 100%;
    border-radius: 4px;
    vertical-align: middle;
  }
  .goods-info {
    margin: 5px 0;
  }
  .goods-info p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-height-text);
    margin-right: 20px;
  }
   .goods-info .collect {
     position: relative;
     color: #ccc;
   }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    top: 2px;
    left: -13px;
    width: 12px;
    height: 12px;
    background: url('~assets/images/common/collect.svg')0 0/12px;
  }
 
</style>
