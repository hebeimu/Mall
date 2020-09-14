<template>
  <div class="check-button" :class="{check: isChecked}">
     <img src="~assets/images/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .check-button img {
    width: 14px;
    height: 14px;
  }

  .check {
    background-color: red;
    border-color: red;
  }
 
</style>
