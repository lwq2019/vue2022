<template>
  <layout class="limiter">
    <RouterLink :to="{name:'signCommon',query:{type:'signup',title:'登录'}}">手机号/邮箱登录</RouterLink>
    <RouterLink to="/pictureSearch">生成图像</RouterLink>
    <RouterLink to="/interlocution">问答</RouterLink>
    <div id="app" style="margin-top:10px">
      <RouterView></RouterView>
    </div>
  </layout>
  
</template>

<script>
import { RouterView } from 'vue-router';

export default {
  name: 'App',
  components: {
    RouterView
  },
  mounted:function(){
    this.$router.push({name:"signCommon",query:{type:'signup',title:'登录'}})
  }
}
</script>

<style scoped>
  #app {
    margin:0;
    padding:0;
    display:flex;
   }
   a{
    margin-right:10px;
   }
</style>
