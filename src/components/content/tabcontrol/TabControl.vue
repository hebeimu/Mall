<template>
  <div class="tab-control">
     <div class="tab-control-item" v-for="(item,index) in titles" @click="activeClick(index)">
       <span :class="{active: index === currentIndex}">{{ item }}</span>
     </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    data () {
      return {
        currentIndex: 0
      }
    },
    props: {
      titles: {
        typr: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      activeClick (index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    line-height: 40px;
  }
  .tab-control-item {
    flex: 1;
    text-align: center;
  }
  .tab-control-item span {
    padding: 5px;
  }
  .active {
    color: var(--color-height-text);
    border-bottom: 2px solid var(--color-height-text);
  }
</style>
