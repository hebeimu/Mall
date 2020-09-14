<template>
  <div class="root-comment">
    <div class="comment-info" v-if="Object.keys(commentInfo).length">
      <div class="comment-title">
        <span>用户评价</span>
        <span class="more">更多</span>
      </div>

      <div class="info-user">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{ commentInfo.user.uname }}</span>
      </div>

      <div class="comment">
        <p>{{ commentInfo.content }}</p>
        <span>{{ commentInfo.created | showDate }}</span>
        <span>{{ commentInfo.style }}</span>
        <div class="info-imgs">
          <img v-for="(item,index) in commentInfo.images" :src="item" alt="" :key="index">
        </div>
      </div>
    </div>
    <div class="comment-info" style="color: red;" v-else>
         暂无用户评论
    </div>
  </div>
   

   
</template>

<script>
  import {formatDate} from 'common/utils'
  export default {
    name: 'DetailCommentInfo',
    props: {
      commentInfo: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    filters: {
      showDate (msg) {
        const date = new Date (msg * 1000)
        return formatDate(date)
      }
    }
  }
</script>

<style scoped>
  .root-comment {
    margin-bottom: 5px;
  }
  .comment-info{
    padding: 10px 10px;
    color: #333;
    border-bottom: 5px solid #eee;
  }

  .comment-title {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }

  .comment-title .more {
    font-size: 12px;
  }
  
  .info-user {
    padding: 10px 0;
  }

  .info-user img {
    width: 45px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
  }

  .comment {
    padding: 0 5px;
  }
  .comment p{
    color: #777;
    font-size: 14px;
    margin-bottom: 8px;
    line-height: 1.5;
  }
  .comment span {
    font-size: 12px;
    color: #999;
    margin-right: 5px;
  }
  .info-imgs {
    margin-top: 10px;
  }
  .info-imgs img {
    width: 80px;
    height: 100px;
  }
</style>
