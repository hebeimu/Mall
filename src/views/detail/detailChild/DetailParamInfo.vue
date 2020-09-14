<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length">
     <p>参数信息</p>
     <table>
       <tr v-for="items in paramInfo.sizes[0]">
         <td v-for="item in items">{{ item }}</td>
       </tr>
     </table>

     <table>
       <tr v-for="items in paramInfo.infos">
         <td class="items-key">{{ items.key }}</td>
         <td class="items-value">{{ items.value }}</td>
       </tr>
     </table>

     <div class="info-img" v-if="paramInfo.image">
       <img :src="paramInfo.image" alt="">
     </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailParamInfo',
    props: {
      paramInfo: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .param-info {
    padding: 20px 10px;
    font-size: 14px;
    border-bottom: 5px solid #eee;
  }
  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .param-info table tr {
    height: 42px;
  }

  .param-info table tr td{
    border-bottom: 1px solid #eee;
  }

  .items-key {
    width: 95px;
  }

  .items-value {
    color: #eb4868;
  }

  .info-img img {
    width: 100%;
    vertical-align: middle;
  }
</style>
