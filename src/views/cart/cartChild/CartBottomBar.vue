<template>
  <div class="bottom-bar">
    <div class="check">
      <check-button @click.native="checkClick" :is-checked="isSelectAll"/>
      <span>全选</span>
    </div>
    
    <div class="total-price">
      合计：￥{{totalPrice}}
    </div>

    <div class="calculate"> 
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),

      totalPrice () {
        return this.cartList.reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },

      checkLength () {
        return this.cartList.reduce((preValue, item) => {
          return preValue + item.count
        }, 0)
      },

      isSelectAll () {
        if (this.cartList.length) {
          return !this.cartList.some(item => !item.check)
        }
      }
    },

    methods: {
      checkClick () {
        if (this.isSelectAll) {
          this.cartList.forEach(item => item.check = false)
        } else {
          this.cartList.forEach(item => item.check = true)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    position: fixed;
    bottom: 49px;
    left: 0;
    right: 0;
    background-color: #eee;
    display: flex;
    align-items: cente;
    font-size: 14px;
    padding-left: 10px;
  }
  .check {
    display: flex;
    align-items: center;
  }
  .check span {
    margin-left: 5px;
  }
  
  .total-price {
    flex: 1;
    line-height: 40px;
    margin-left: 30px;
  }

  .calculate {
    width: 90px;
    text-align: center;
    line-height: 40px;
    background-color: red;
    color: #fff;
  }
</style>
