<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
       <slot name="item-icon"></slot>
    </div>
    <div v-else-if="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>    
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    data () {
      return {
        
      }
    },
    props: {
      path: {
        type: String,
        default: '/home'
      },
      color: {
        type: String,
        default: 'red'
      }
    },
    methods: {
      itemClick () {
        this.$router.push(this.path)
      }
    },
    computed: {
      isActive () {
        return this.$route.path.includes(this.path)
      },
      activeStyle () {
        return this.isActive ? {color: this.color} : {}
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  img {
    width: 25px;
    margin: 4px 0;
    vertical-align: middle;
  }
</style>
