<template>
  <div class="bottom-bar">
    <div class="bar-left bar-item">
      <div>
        <i class="icon service"></i>
        <p>客服</p>
      </div>
      <div>
        <i class="icon shop"></i>
        <p>店铺</p>
      </div>
      <div>
        <i class="icon select"></i>
        <p>收藏</p>
      </div>
    </div>
    <div class="bar-right bar-item">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBottomBar',
    methods: {
      addToCart () {
        this.$emit("addToCart")
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    height: 58px;
    background-color: #fff;
    z-index: 10;
    display: flex;
    text-align: center;
  }
  .bar-item {
    flex: 1;
  }

  .bar-left {
    display: flex;
  }
  .bar-left div {
    flex: 1;
  }
  .bar-left .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin: 9px auto 4px;
  }
  .bar-left .service {
    background: url("~assets/images/detail/detail_bottom.png")0 -52px/22px;
  }
  .bar-left .shop {
    background: url("~assets/images/detail/detail_bottom.png")0 -98px/22px;
  }
  .bar-left .select {
    background: url("~assets/images/detail/detail_bottom.png")0 0/22px;
  }
  .bar-left p {
    font-size: 13px;
  }

  .bar-right {
    display: flex;
  }

  .cart,
  .buy {
    flex: 1;
    line-height: 58px;
    font-size: 17px;
  }
  .cart {
    background-color: #FFE817;
  }
  .buy {
    background-color: #FF6699;
    color: #fff;
  }
</style>
